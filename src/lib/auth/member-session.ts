import "server-only";
import { cookies } from "next/headers";
import { randomBytes, createHash } from "crypto";
import { getSupabaseAdmin } from "@/lib/supabase/server";

const COOKIE_NAME = "member_session";
const SESSION_HOURS = 12;

function hashToken(token: string): string {
  return createHash("sha256").update(token).digest("hex");
}

export async function createMemberSession(memberId: string): Promise<void> {
  const token = randomBytes(32).toString("hex");
  const tokenHash = hashToken(token);
  const expiresAt = new Date(Date.now() + SESSION_HOURS * 60 * 60_000).toISOString();

  const supabase = getSupabaseAdmin();
  const { error } = await supabase.from("member_sessions").insert({
    member_id: memberId,
    session_token_hash: tokenHash,
    expires_at: expiresAt,
  });
  if (error) throw new Error(`Failed to create member session: ${error.message}`);

  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_HOURS * 60 * 60,
  });
}

export async function getMemberSession(): Promise<{ memberId: string; slug: string } | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token) return null;

  const tokenHash = hashToken(token);
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("member_sessions")
    .select("member_id, expires_at, revoked_at, team_members(slug)")
    .eq("session_token_hash", tokenHash)
    .maybeSingle();

  if (error || !data || data.revoked_at) return null;
  if (new Date(data.expires_at).getTime() <= Date.now()) return null;

  const memberRow = data.team_members as unknown as { slug: string } | null;
  if (!memberRow) return null;

  return { memberId: data.member_id, slug: memberRow.slug };
}

export async function destroyMemberSession(): Promise<void> {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (token) {
    const tokenHash = hashToken(token);
    const supabase = getSupabaseAdmin();
    await supabase
      .from("member_sessions")
      .update({ revoked_at: new Date().toISOString() })
      .eq("session_token_hash", tokenHash);
  }
  cookieStore.delete(COOKIE_NAME);
}
