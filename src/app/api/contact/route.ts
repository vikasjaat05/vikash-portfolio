import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(120),
  email: z.string().trim().email("Invalid email address").max(254),
  company: z.string().trim().max(120).optional().default(""),
  budget: z.string().trim().max(40).optional().default(""),
  service: z.string().trim().max(60).optional().default(""),
  message: z.string().trim().min(1, "Project details are required").max(5000),
  website: z.string().optional().default(""),
});

const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX_REQUESTS = 5;
const rateLimitStore = new Map<string, { count: number; windowStart: number }>();

function isRateLimited(key: string): boolean {
  const now = Date.now();
  const entry = rateLimitStore.get(key);

  if (!entry || now - entry.windowStart > RATE_LIMIT_WINDOW_MS) {
    rateLimitStore.set(key, { count: 1, windowStart: now });
    return false;
  }

  entry.count += 1;
  return entry.count > RATE_LIMIT_MAX_REQUESTS;
}

function getClientIp(req: NextRequest): string {
  const forwardedFor = req.headers.get("x-forwarded-for");
  if (forwardedFor) return forwardedFor.split(",")[0].trim();
  return req.headers.get("x-real-ip") ?? "unknown";
}

export async function POST(req: NextRequest) {
  const ip = getClientIp(req);

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many requests. Please try again in a minute." },
      { status: 429 }
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed.", issues: parsed.error.flatten().fieldErrors },
      { status: 400 }
    );
  }

  const { name, email, company, budget, service, message, website } = parsed.data;

  // Honeypot tripped
  if (website.length > 0) {
    return NextResponse.json({ ok: true });
  }

  const resendApiKey = process.env.RESEND_API_KEY;
  const contactInbox = process.env.CONTACT_INBOX_EMAIL || "vikkijaat800@gmail.com";

  if (resendApiKey) {
    try {
      const resend = new Resend(resendApiKey);
      const escapeHtml = (value: string) =>
        value
          .replace(/&/g, "&amp;")
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;")
          .replace(/"/g, "&quot;")
          .replace(/'/g, "&#39;");

      await resend.emails.send({
        from: "Vikash Choudhary Portfolio <onboarding@resend.dev>",
        to: contactInbox,
        replyTo: email,
        subject: `New project inquiry from ${name}`,
        html: `
          <h2>New project inquiry</h2>
          <p><strong>Name:</strong> ${escapeHtml(name)}</p>
          <p><strong>Email:</strong> ${escapeHtml(email)}</p>
          <p><strong>Company:</strong> ${escapeHtml(company || "—")}</p>
          <p><strong>Budget:</strong> ${escapeHtml(budget || "—")}</p>
          <p><strong>Service:</strong> ${escapeHtml(service || "—")}</p>
          <p><strong>Message:</strong></p>
          <p>${escapeHtml(message).replace(/\n/g, "<br />")}</p>
        `,
      });
    } catch (err) {
      console.warn("Resend email delivery skipped or failed:", err);
    }
  } else {
    console.log(`[Contact Form Received] From: ${name} (${email}) | Service: ${service} | Message: ${message}`);
  }

  return NextResponse.json({ ok: true });
}
