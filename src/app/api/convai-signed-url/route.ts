import { NextRequest, NextResponse } from "next/server";
import { checkRateLimit } from "@/lib/rate-limiter";

const AGENT_ID = process.env.ELEVENLABS_CONVAI_AGENT_ID || "agent_5501m19k5ehaebpsrddszem6m7bf";
const ELEVENLABS_API_KEY =
  process.env.ELEVENLABS_API_KEY || "sk_a32451dacc8a3b79a71f57eba3cfe59607d4b3ea0231343a";

export async function GET(req: NextRequest) {
  // Rate limit: 10 signed URL tokens per minute per IP
  const rateLimit = checkRateLimit(req, {
    max: 10,
    windowMs: 60_000,
    keyPrefix: "convai-token",
  });

  if (!rateLimit.allowed) {
    return NextResponse.json(
      { error: "Rate limit exceeded. Please try again in a minute." },
      {
        status: 429,
        headers: {
          "Retry-After": "60",
          "X-RateLimit-Limit": "10",
          "X-RateLimit-Remaining": "0",
        },
      }
    );
  }

  try {
    const res = await fetch(
      `https://api.elevenlabs.io/v1/convai/conversation/get_signed_url?agent_id=${AGENT_ID}`,
      {
        headers: {
          "xi-api-key": ELEVENLABS_API_KEY,
        },
      }
    );

    if (!res.ok) {
      console.warn("ElevenLabs ConvAI Signed URL returned non-200 status:", res.status);
      return NextResponse.json(
        { error: "Voice service temporarily unavailable. Please try again shortly." },
        { status: res.status }
      );
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Signed URL exception:", error);
    return NextResponse.json({ error: "Failed to generate signed url" }, { status: 500 });
  }
}
