import { NextRequest, NextResponse } from "next/server";
import { checkRateLimit } from "@/lib/rate-limiter";
import { validateCors, handleCorsPreflight } from "@/lib/cors";
import { getOrderByLicenseKey } from "@/lib/orders";

export async function OPTIONS(req: NextRequest) {
  return handleCorsPreflight(req);
}

export async function GET(req: NextRequest) {
  const { isAllowed, responseHeaders } = validateCors(req);
  if (!isAllowed) {
    return NextResponse.json({ error: "Unauthorized origin" }, { status: 403, headers: responseHeaders });
  }

  // Rate limit: 20 license verifications per minute per IP
  const rateLimit = checkRateLimit(req, {
    max: 20,
    windowMs: 60_000,
    keyPrefix: "license-verify",
  });

  if (!rateLimit.allowed) {
    return NextResponse.json(
      { error: "Too many verification attempts. Please wait a minute." },
      { status: 429, headers: responseHeaders }
    );
  }

  const { searchParams } = new URL(req.url);
  const lic = searchParams.get("lic")?.trim() || "";

  if (!lic) {
    return NextResponse.json(
      { error: "License key parameter 'lic' is required." },
      { status: 400, headers: responseHeaders }
    );
  }

  // Check in database
  const order = getOrderByLicenseKey(lic);

  if (!order || order.status !== "PAID") {
    return NextResponse.json(
      {
        valid: false,
        message: "License certificate could not be verified or is not active.",
      },
      { status: 404, headers: responseHeaders }
    );
  }

  return NextResponse.json(
    {
      valid: true,
      licenseKey: order.licenseKey,
      orderNumber: order.orderNumber,
      buyerName: order.customer.name,
      company: order.customer.company || "Individual Founder / Creator",
      issuedAt: order.paidAt || order.createdAt,
      commercialRights: "Full Perpetual Commercial License Granted",
      items: order.items.map((i) => ({
        id: i.id,
        title: i.title,
        categoryLabel: i.categoryLabel,
      })),
    },
    { status: 200, headers: responseHeaders }
  );
}
