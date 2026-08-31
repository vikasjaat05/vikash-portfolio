import { NextResponse } from "next/server";

const AGENT_ID = "agent_5501m19k5ehaebpsrddszem6m7bf";
const ELEVENLABS_API_KEY =
  process.env.ELEVENLABS_API_KEY || "sk_a32451dacc8a3b79a71f57eba3cfe59607d4b3ea0231343a";

export async function GET() {
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
      const errorText = await res.text();
      console.error("ElevenLabs ConvAI Signed URL error:", errorText);
      return NextResponse.json({ error: errorText }, { status: res.status });
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Signed URL exception:", error);
    return NextResponse.json({ error: "Failed to generate signed url" }, { status: 500 });
  }
}
