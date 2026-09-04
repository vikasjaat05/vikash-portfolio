import { NextRequest, NextResponse } from "next/server";
import { exec } from "child_process";
import { promisify } from "util";
import fs from "fs";
import path from "path";
import os from "os";
import { checkRateLimit } from "@/lib/rate-limiter";

const execAsync = promisify(exec);

const ELEVENLABS_API_KEY = process.env.ELEVENLABS_API_KEY || "";

export async function POST(req: NextRequest) {
  // Rate limit: 10 audio synthesis requests per minute per IP
  const rateLimit = checkRateLimit(req, {
    max: 10,
    windowMs: 60_000,
    keyPrefix: "voice-tts",
  });

  if (!rateLimit.allowed) {
    return NextResponse.json(
      { error: "Audio synthesis rate limit exceeded. Please wait a minute." },
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
    const { text, voiceId = "cgSgspJ2msm6clMCkdW9" } = await req.json();

    if (!text || typeof text !== "string") {
      return NextResponse.json({ error: "Text string is required" }, { status: 400 });
    }

    // Limit text length to prevent credit depletion and buffer strain
    const trimmedText = text.slice(0, 500);

    // 1. Attempt ElevenLabs Cloud TTS API if key is provided
    if (ELEVENLABS_API_KEY) {
      try {
        const response = await fetch(
          `https://api.elevenlabs.io/v1/text-to-speech/${encodeURIComponent(voiceId)}?output_format=mp3_44100_128`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "xi-api-key": ELEVENLABS_API_KEY,
            },
            body: JSON.stringify({
              text: trimmedText,
              model_id: "eleven_multilingual_v2",
              voice_settings: {
                stability: 0.85,
                similarity_boost: 0.85,
                style: 0.0,
                use_speaker_boost: true,
              },
            }),
          }
        );

        if (response.ok) {
          const audioBuffer = await response.arrayBuffer();
          return new NextResponse(audioBuffer, {
            status: 200,
            headers: {
              "Content-Type": "audio/mpeg",
              "Content-Length": audioBuffer.byteLength.toString(),
              "Cache-Control": "public, max-age=3600, s-maxage=86400",
            },
          });
        }
      } catch (elevenErr) {
        console.warn("ElevenLabs cloud notice, checking local engine:", elevenErr);
      }
    }

    // 2. Local Fallback (Strictly sanitized for macOS local dev environments)
    if (process.platform === "darwin") {
      try {
        const isHindi =
          /[\u0900-\u097F]/.test(trimmedText) ||
          /kya|hai|kaise|kaun|mujhe|bana|kitna|paisa|kharcha|baat|dikhao|batao|shubh|naam|namaste/i.test(trimmedText);

        const voiceName = isHindi ? "Lekha" : "Samantha";
        const tempAiff = path.join(os.tmpdir(), `eva_${Date.now()}.aiff`);
        const tempMp3 = path.join(os.tmpdir(), `eva_${Date.now()}.mp3`);

        // Strictly allow only alphanumeric, basic punctuation and unicode
        const safeText = trimmedText.replace(/[^a-zA-Z0-9\s\u0900-\u097F.,!?-]/g, "").slice(0, 300);

        await execAsync(`say -v "${voiceName}" "${safeText}" -o "${tempAiff}"`);
        await execAsync(`ffmpeg -y -i "${tempAiff}" -codec:a libmp3lame -b:a 128k "${tempMp3}"`);

        const audioData = await fs.promises.readFile(tempMp3);

        try {
          await fs.promises.unlink(tempAiff);
          await fs.promises.unlink(tempMp3);
        } catch {}

        return new NextResponse(audioData, {
          status: 200,
          headers: {
            "Content-Type": "audio/mpeg",
            "Content-Length": audioData.byteLength.toString(),
          },
        });
      } catch (localErr) {
        console.warn("Local TTS engine unavailable:", localErr);
      }
    }

    return NextResponse.json({ error: "Audio engine unavailable" }, { status: 503 });
  } catch (error) {
    console.error("Audio generation exception:", error);
    return NextResponse.json({ error: "Audio processing failed" }, { status: 500 });
  }
}
