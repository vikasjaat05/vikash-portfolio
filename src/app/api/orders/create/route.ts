import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { checkRateLimit } from "@/lib/rate-limiter";
import { validateCors, handleCorsPreflight } from "@/lib/cors";
import { createAuthoritativeOrder } from "@/lib/orders";

const orderCreateSchema = z.object({
  items: z
    .array(
      z.object({
        id: z.string().trim().min(1).max(80),
        quantity: z.number().int().min(1).max(10).default(1),
      })
    )
    .min(1, "Order must contain at least 1 item")
    .max(20),
  customer: z.object({
    name: z.string().trim().min(1, "Name is required").max(100),
    email: z.string().trim().email("Invalid email").max(200),
    phone: z.string().trim().min(5, "Phone is required").max(30),
    company: z.string().trim().max(100).optional().default(""),
    notes: z.string().trim().max(1000).optional().default(""),
  }),
  discountCode: z.string().trim().max(30).optional(),
  currency: z.enum(["INR", "USD", "EUR", "GBP", "AED", "CAD", "AUD", "JPY"]).default("INR"),
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

  // Rate limit: 10 order creations per minute per IP
  const rateLimit = checkRateLimit(req, {
    max: 10,
    windowMs: 60_000,
    keyPrefix: "orders-create",
  });

  if (!rateLimit.allowed) {
    return NextResponse.json(
      { error: "Too many checkout requests. Please wait a minute." },
      {
        status: 429,
        headers: {
          ...responseHeaders,
          "Retry-After": "60",
        },
      }
    );
  }

  // Payload size cap
  const contentLength = req.headers.get("content-length");
  if (contentLength && parseInt(contentLength, 10) > 30_000) {
    return NextResponse.json({ error: "Payload too large" }, { status: 413, headers: responseHeaders });
  }

  try {
    const rawBody = await req.json();
    const parsed = orderCreateSchema.safeParse(rawBody);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", issues: parsed.error.flatten().fieldErrors },
        { status: 400, headers: responseHeaders }
      );
    }

    const { items, customer, discountCode, currency } = parsed.data;

    // Server-side authoritative calculation
    const order = createAuthoritativeOrder({
      itemRequests: items,
      customer,
      discountCode,
      currency,
    });

    return NextResponse.json(
      {
        success: true,
        order: {
          orderId: order.orderId,
          orderNumber: order.orderNumber,
          status: order.status,
          currency: order.currency,
          subtotal: order.subtotal,
          discountAmount: order.discountAmount,
          totalAmount: order.totalAmount,
          formattedTotal: order.formattedTotal,
          licenseKey: order.licenseKey,
          items: order.items.map((i) => ({
            id: i.id,
            title: i.title,
            categoryLabel: i.categoryLabel,
            quantity: i.quantity,
            subtotal: i.subtotal,
          })),
        },
      },
      { status: 201, headers: responseHeaders }
    );
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Internal order calculation error";
    console.error("Order creation exception:", err);
    return NextResponse.json(
      { error: message },
      { status: 400, headers: responseHeaders }
    );
  }
}
