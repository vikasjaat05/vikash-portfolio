import { NextRequest, NextResponse } from "next/server";
import { exec } from "child_process";
import { promisify } from "util";
import fs from "fs";
import path from "path";
import os from "os";

const execAsync = promisify(exec);

const ELEVENLABS_API_KEY =
  process.env.ELEVENLABS_API_KEY || "sk_a32451dacc8a3b79a71f57eba3cfe59607d4b3ea0231343a";

export async function POST(req: NextRequest) {
  try {
    const { text, voiceId = "cgSgspJ2msm6clMCkdW9" } = await req.json();

    if (!text) {
      return NextResponse.json({ error: "Text is required" }, { status: 400 });
    }

    // 1. Attempt ElevenLabs Cloud TTS API
    try {
      const response = await fetch(
        `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}?output_format=mp3_44100_128`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "xi-api-key": ELEVENLABS_API_KEY,
          },
          body: JSON.stringify({
            text,
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
          },
        });
      }
    } catch (elevenErr) {
      console.warn("ElevenLabs cloud notice, falling back to local HD engine:", elevenErr);
    }

    // 2. High-Quality Local Neural TTS Fallback (Zero-Quota Limit, 100% Reliable Audio)
    const isHindi =
      /[\u0900-\u097F]/.test(text) ||
      /kya|hai|kaise|kaun|mujhe|bana|kitna|paisa|kharcha|baat|dikhao|batao|shubh|naam|namaste/i.test(text);

    const voiceName = isHindi ? "Lekha" : "Samantha";
    const tempAiff = path.join(os.tmpdir(), `eva_${Date.now()}.aiff`);
    const tempMp3 = path.join(os.tmpdir(), `eva_${Date.now()}.mp3`);

    // Clean text of quotes and special characters for shell safety
    const safeText = text.replace(/["'$`\\]/g, "");

    await execAsync(`say -v "${voiceName}" "${safeText}" -o "${tempAiff}"`);
    await execAsync(`ffmpeg -y -i "${tempAiff}" -codec:a libmp3lame -b:a 128k "${tempMp3}"`);

    const audioData = await fs.promises.readFile(tempMp3);

    // Clean up temporary files
    try {
      await fs.promises.unlink(tempAiff);
      await fs.promises.unlink(tempMp3);
    } catch {
      // ignore
    }

    return new NextResponse(audioData, {
      status: 200,
      headers: {
        "Content-Type": "audio/mpeg",
        "Content-Length": audioData.byteLength.toString(),
      },
    });
  } catch (error) {
    console.error("Audio generation exception:", error);
    return NextResponse.json({ error: "Failed to generate audio" }, { status: 500 });
  }
}
