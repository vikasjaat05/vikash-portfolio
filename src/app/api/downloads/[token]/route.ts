import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { checkRateLimit } from "@/lib/rate-limiter";
import { verifyDownloadToken } from "@/lib/orders";

const STORAGE_ROOT = path.resolve(process.cwd(), "private_storage", "templates");

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ token: string }> }
) {
  // Rate limit: 10 download requests per minute per IP
  const rateLimit = checkRateLimit(req, {
    max: 10,
    windowMs: 60_000,
    keyPrefix: "download-token",
  });

  if (!rateLimit.allowed) {
    return NextResponse.json(
      { error: "Too many download attempts. Please wait a minute." },
      { status: 429 }
    );
  }

  const { token } = await params;

  if (!token) {
    return NextResponse.json({ error: "Missing download authorization token" }, { status: 400 });
  }

  // 1. Verify Cryptographic Token & Ownership Server-Side
  const verification = verifyDownloadToken(token);
  if (!verification.valid || !verification.productId) {
    const errorMsg = verification.error || "Invalid or unauthorized download token.";
    const status = errorMsg.includes("expired") ? 410 : 403;
    return NextResponse.json({ error: errorMsg }, { status });
  }

  // 2. Strict Path Traversal Prevention
  // Sanitize filename to strict basename only (rejects ../, /etc/passwd, null-bytes, etc.)
  const rawFilename = `${verification.productId}.zip`;
  const sanitizedFilename = path.basename(rawFilename).replace(/[^a-zA-Z0-9._-]/g, "");
  const targetFilePath = path.resolve(STORAGE_ROOT, sanitizedFilename);

  // Security Check: Guarantee path stays inside STORAGE_ROOT
  if (!targetFilePath.startsWith(STORAGE_ROOT)) {
    console.warn("Security Alert: Path traversal attempt detected!", targetFilePath);
    return NextResponse.json({ error: "Invalid resource path" }, { status: 400 });
  }

  // 3. Verify File Exists
  try {
    const stats = await fs.promises.stat(targetFilePath);
    if (!stats.isFile()) {
      return NextResponse.json({ error: "Package not found on secure server" }, { status: 404 });
    }

    const fileBuffer = await fs.promises.readFile(targetFilePath);

    // 4. Stream Protected File with Anti-Clobbering Headers
    return new NextResponse(fileBuffer, {
      status: 200,
      headers: {
        "Content-Type": "application/zip",
        "Content-Length": stats.size.toString(),
        "Content-Disposition": `attachment; filename="${sanitizedFilename}"`,
        "Cache-Control": "no-store, no-cache, must-revalidate, private",
        "Pragma": "no-cache",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch (fileErr) {
    console.error("Download delivery error:", fileErr);
    return NextResponse.json(
      { error: "Template distribution archive is temporarily unavailable. Please contact support." },
      { status: 404 }
    );
  }
}
