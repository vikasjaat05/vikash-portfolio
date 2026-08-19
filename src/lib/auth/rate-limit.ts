import "server-only";
import { SupabaseClient } from "@supabase/supabase-js";

const MAX_FAILED_ATTEMPTS = 5;
const LOCKOUT_MINUTES = 15;

type AttemptsTable = "admin_attempts" | "pin_attempts";

function idColumn(table: AttemptsTable): "admin_id" | "member_id" {
  return table === "admin_attempts" ? "admin_id" : "member_id";
}

export async function isLockedOut(
  supabase: SupabaseClient,
  table: AttemptsTable,
  id: string
): Promise<{ locked: boolean; retryAfterSeconds?: number }> {
  const { data } = await supabase
    .from(table)
    .select("locked_until")
    .eq(idColumn(table), id)
    .maybeSingle();

  if (!data?.locked_until) return { locked: false };

  const lockedUntil = new Date(data.locked_until).getTime();
  const now = Date.now();
  if (lockedUntil <= now) return { locked: false };

  return { locked: true, retryAfterSeconds: Math.ceil((lockedUntil - now) / 1000) };
}

export async function recordFailedAttempt(
  supabase: SupabaseClient,
  table: AttemptsTable,
  id: string
): Promise<void> {
  const column = idColumn(table);
  const { data: existing } = await supabase
    .from(table)
    .select("failed_count")
    .eq(column, id)
    .maybeSingle();

  const nextCount = (existing?.failed_count ?? 0) + 1;
  const lockedUntil =
    nextCount >= MAX_FAILED_ATTEMPTS
      ? new Date(Date.now() + LOCKOUT_MINUTES * 60_000).toISOString()
      : null;

  await supabase
    .from(table)
    .upsert(
      {
        [column]: id,
        failed_count: nextCount,
        locked_until: lockedUntil,
        last_attempt_at: new Date().toISOString(),
      },
      { onConflict: column }
    );
}

export async function resetAttempts(
  supabase: SupabaseClient,
  table: AttemptsTable,
  id: string
): Promise<void> {
  const column = idColumn(table);
  await supabase
    .from(table)
    .upsert(
      { [column]: id, failed_count: 0, locked_until: null, last_attempt_at: new Date().toISOString() },
      { onConflict: column }
    );
}
