import { NextRequest, NextResponse } from "next/server";
import { checkRateLimit } from "@/lib/rate-limiter";
import { verifyAndMarkOrderPaid, createHmacSignature, timingSafeCompare } from "@/lib/orders";

export async function POST(req: NextRequest) {
  // Rate limit: 30 webhook events per minute per gateway IP
  const rateLimit = checkRateLimit(req, {
    max: 30,
    windowMs: 60_000,
    keyPrefix: "webhook-payment",
  });

  if (!rateLimit.allowed) {
    return NextResponse.json({ error: "Too many webhook requests" }, { status: 429 });
  }

  const signature =
    req.headers.get("x-signature") ||
    req.headers.get("x-razorpay-signature") ||
    req.headers.get("stripe-signature") ||
    "";

  if (!signature) {
    return NextResponse.json({ error: "Missing webhook authorization signature" }, { status: 401 });
  }

  let bodyText = "";
  try {
    bodyText = await req.text();
  } catch {
    return NextResponse.json({ error: "Unable to read webhook payload" }, { status: 400 });
  }

  // 1. Verify HMAC Signature of Raw Body
  const expectedSig = createHmacSignature(bodyText);
  const isValidSignature = timingSafeCompare(signature, expectedSig);

  if (!isValidSignature) {
    console.warn("Security Alert: Invalid webhook signature received!");
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  }

  // 2. Parse Validated Payload
  try {
    const data = JSON.parse(bodyText);
    const { event, orderId, transactionId, amount, currency, gateway = "payment_gateway" } = data;

    if (event !== "payment.success" && event !== "charge.successful") {
      // Acknowledge non-payment events gracefully without mutating state
      return NextResponse.json({ received: true, ignored: true });
    }

    if (!orderId || !transactionId || typeof amount !== "number" || !currency) {
      return NextResponse.json({ error: "Missing required transaction fields" }, { status: 400 });
    }

    // 3. Mark Order Paid with Idempotency & Amount Matching
    const result = verifyAndMarkOrderPaid({
      orderId,
      transactionId,
      paidAmount: amount,
      paidCurrency: currency,
      gateway,
    });

    if (!result.success) {
      console.warn(`Webhook fulfillment warning for order ${orderId}:`, result.error);
      return NextResponse.json({ error: result.error }, { status: 400 });
    }

    return NextResponse.json({
      success: true,
      orderId: result.order?.orderId,
      status: "PAID",
      timestamp: new Date().toISOString(),
    });
  } catch (err) {
    console.error("Webhook processing error:", err);
    return NextResponse.json({ error: "Internal webhook processing error" }, { status: 500 });
  }
}
