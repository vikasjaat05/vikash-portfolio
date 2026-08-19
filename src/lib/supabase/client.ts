import { createClient } from "@supabase/supabase-js";

/**
 * Browser-safe Supabase client using the publishable key — used only for
 * direct-to-Storage uploads via signed URLs. Never used for reading/writing
 * database rows directly; all data access goes through our own API routes
 * so we can enforce session-scoped authorization server-side.
 */
export function getSupabaseBrowserClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const publishableKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  if (!url || !publishableKey) {
    throw new Error(
      "Supabase is not configured: missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY."
    );
  }

  return createClient(url, publishableKey);
}
