import "server-only";
import { createClient } from "@supabase/supabase-js";

/**
 * Server-only Supabase client using the secret key — full database access,
 * bypassing RLS. Never import this from a "use client" component or expose
 * its responses without scoping queries by the authenticated session's own
 * member_id/admin_id first.
 */
export function getSupabaseAdmin() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const secretKey = process.env.SUPABASE_SECRET_KEY;

  if (!url || !secretKey) {
    throw new Error(
      "Supabase is not configured: missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SECRET_KEY."
    );
  }

  return createClient(url, secretKey, {
    auth: { persistSession: false },
  });
}
