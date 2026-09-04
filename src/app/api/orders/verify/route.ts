import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { checkRateLimit } from "@/lib/rate-limiter";
import { validateCors, handleCorsPreflight } from "@/lib/cors";
import { getOrderById, generateSignedDownloadToken, verifyAndMarkOrderPaid } from "@/lib/orders";

const verifySchema = z.object({
  orderId: z.string().trim().min(5).max(100),
  transactionId: z.string().trim().max(100).optional(),
  paidAmount: z.number().positive().optional(),
  paidCurrency: z.string().trim().max(10).optional(),
  gateway: z.string().trim().max(50).optional().default("direct_verification"),
  signature: z.string().trim().max(200).optional(),
});

export async function OPTIONS(req: NextRequest) {
  return handleCorsPreflight(req);
}

export async function POST(req: NextRequest) {
  const { isAllowed, responseHeaders } = validateCors(req);
  if (!isAllowed) {
    return NextResponse.json(
      { error: "Unauthorized cross-origin request" },
      { status: 403, headers: responseHeaders }
    );
  }

  // Rate limit: 15 verification queries per minute per IP
  const rateLimit = checkRateLimit(req, {
    max: 15,
    windowMs: 60_000,
    keyPrefix: "orders-verify",
  });

  if (!rateLimit.allowed) {
    return NextResponse.json(
      { error: "Too many verification requests. Please wait a minute." },
      {
        status: 429,
        headers: {
          ...responseHeaders,
          "Retry-After": "60",
        },
      }
    );
  }

  try {
    const rawBody = await req.json();
    const parsed = verifySchema.safeParse(rawBody);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid verification parameters" },
        { status: 400, headers: responseHeaders }
      );
    }

    const { orderId, transactionId, paidAmount, paidCurrency, gateway, signature } = parsed.data;

    let order = getOrderById(orderId);
    if (!order) {
      return NextResponse.json(
        { error: "Order not found" },
        { status: 404, headers: responseHeaders }
      );
    }

    // If transaction parameters are provided, attempt server verification
    if (transactionId && paidAmount && paidCurrency) {
      const result = verifyAndMarkOrderPaid({
        orderId,
        transactionId,
        paidAmount,
        paidCurrency,
        gateway,
        signature,
      });

      if (!result.success) {
        return NextResponse.json(
          { error: result.error || "Payment verification failed" },
          { status: 400, headers: responseHeaders }
        );
      }

      if (result.order) {
        order = result.order;
      }
    }

    // Check payment status on server
    if (order.status !== "PAID") {
      return NextResponse.json(
        {
          success: false,
          status: order.status,
          message: "Order is pending verification or payment confirmation.",
          downloads: [],
        },
        { status: 200, headers: responseHeaders }
      );
    }

    // Server-verified: Generate 15-minute cryptographically signed download tokens for each item
    const downloads = order.items.map((item) => {
      const token = generateSignedDownloadToken(order.orderId, item.id, 15);
      return {
        productId: item.id,
        title: item.title,
        downloadUrl: `/api/downloads/${token}`,
        expiresInMinutes: 15,
      };
    });

    return NextResponse.json(
      {
        success: true,
        status: "PAID",
        orderNumber: order.orderNumber,
        licenseKey: order.licenseKey,
        paidAt: order.paidAt,
        downloads,
      },
      { status: 200, headers: responseHeaders }
    );
  } catch (err) {
    console.error("Order verification exception:", err);
    return NextResponse.json(
      { error: "Verification processing failed" },
      { status: 500, headers: responseHeaders }
    );
  }
}
