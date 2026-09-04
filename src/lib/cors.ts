import { NextRequest, NextResponse } from "next/server";

// Allowed production and development origins
const ALLOWED_ORIGINS = new Set([
  "https://vikash.website",
  "https://www.vikash.website",
  "https://vikash-portfolio.vercel.app",
  "http://localhost:3000",
  "http://localhost:4000",
  "http://localhost:5173",
]);

export function validateCors(req: NextRequest): {
  isAllowed: boolean;
  origin: string;
  responseHeaders: Record<string, string>;
} {
  const origin = req.headers.get("origin") || "";
  const host = req.headers.get("host") || "";

  // Same-origin requests without an Origin header (e.g. standard browser same-site GET/POST)
  if (!origin) {
    return {
      isAllowed: true,
      origin: "",
      responseHeaders: {
        "Vary": "Origin",
      },
    };
  }

  // Check if origin matches allowed list
  const isAllowed = ALLOWED_ORIGINS.has(origin) || origin.endsWith(".vercel.app");

  return {
    isAllowed,
    origin,
    responseHeaders: {
      "Access-Control-Allow-Origin": isAllowed ? origin : "https://vikash.website",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Requested-With, X-Signature",
      "Access-Control-Max-Age": "86400",
      "Vary": "Origin",
    },
  };
}

export function handleCorsPreflight(req: NextRequest): NextResponse {
  const { isAllowed, responseHeaders } = validateCors(req);
  if (!isAllowed) {
    return new NextResponse(null, { status: 403, headers: responseHeaders });
  }
  return new NextResponse(null, { status: 204, headers: responseHeaders });
}
