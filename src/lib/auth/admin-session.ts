import "server-only";
import { cookies } from "next/headers";
import { randomBytes, createHash } from "crypto";
import { getSupabaseAdmin } from "@/lib/supabase/server";

const COOKIE_NAME = "admin_session";
const SESSION_HOURS = 4;

function hashToken(token: string): string {
  return createHash("sha256").update(token).digest("hex");
}

export async function createAdminSession(adminId: string): Promise<void> {
  const token = randomBytes(32).toString("hex");
  const tokenHash = hashToken(token);
  const expiresAt = new Date(Date.now() + SESSION_HOURS * 60 * 60_000).toISOString();

  const supabase = getSupabaseAdmin();
  const { error } = await supabase.from("admin_sessions").insert({
    admin_id: adminId,
    session_token_hash: tokenHash,
    expires_at: expiresAt,
  });
  if (error) throw new Error(`Failed to create admin session: ${error.message}`);

  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: SESSION_HOURS * 60 * 60,
  });
}

export async function getAdminSession(): Promise<{ adminId: string } | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token) return null;

  const tokenHash = hashToken(token);
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("admin_sessions")
    .select("admin_id, expires_at, revoked_at")
    .eq("session_token_hash", tokenHash)
    .maybeSingle();

  if (error || !data || data.revoked_at) return null;
  if (new Date(data.expires_at).getTime() <= Date.now()) return null;

  return { adminId: data.admin_id };
}

export async function destroyAdminSession(): Promise<void> {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (token) {
    const tokenHash = hashToken(token);
    const supabase = getSupabaseAdmin();
    await supabase
      .from("admin_sessions")
      .update({ revoked_at: new Date().toISOString() })
      .eq("session_token_hash", tokenHash);
  }
  cookieStore.delete(COOKIE_NAME);
}
