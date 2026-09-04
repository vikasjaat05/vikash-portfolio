import { NextRequest } from "next/server";

type RateLimitOptions = {
  max: number;
  windowMs: number;
  keyPrefix?: string;
};

type RateLimitRecord = {
  count: number;
  windowStart: number;
};

// Global in-memory storage for sliding window rate limiting
const store = new Map<string, RateLimitRecord>();

// Periodic cleanup to avoid memory leaks
const CLEANUP_INTERVAL = 5 * 60 * 1000;
let lastCleanup = Date.now();

function cleanupStaleEntries() {
  const now = Date.now();
  if (now - lastCleanup < CLEANUP_INTERVAL) return;
  lastCleanup = now;

  for (const [key, record] of store.entries()) {
    if (now - record.windowStart > 10 * 60 * 1000) {
      store.delete(key);
    }
  }
}

export function getClientIp(req: NextRequest): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0].trim();
  }
  const realIp = req.headers.get("x-real-ip");
  if (realIp) {
    return realIp.trim();
  }
  return "127.0.0.1";
}

export function checkRateLimit(
  req: NextRequest,
  options: RateLimitOptions
): { allowed: boolean; remaining: number; resetTime: number } {
  cleanupStaleEntries();

  const ip = getClientIp(req);
  const prefix = options.keyPrefix || "default";
  const key = `${prefix}:${ip}`;
  const now = Date.now();

  const record = store.get(key);

  if (!record || now - record.windowStart > options.windowMs) {
    store.set(key, { count: 1, windowStart: now });
    return {
      allowed: true,
      remaining: options.max - 1,
      resetTime: now + options.windowMs,
    };
  }

  record.count += 1;

  if (record.count > options.max) {
    return {
      allowed: false,
      remaining: 0,
      resetTime: record.windowStart + options.windowMs,
    };
  }

  return {
    allowed: true,
    remaining: options.max - record.count,
    resetTime: record.windowStart + options.windowMs,
  };
}
