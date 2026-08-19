import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getSupabaseAdmin } from "@/lib/supabase/server";
import { verifyPin } from "@/lib/auth/pin";
import { isLockedOut, recordFailedAttempt, resetAttempts } from "@/lib/auth/rate-limit";
import { createAdminSession } from "@/lib/auth/admin-session";
import { createMemberSession } from "@/lib/auth/member-session";

const loginSchema = z.object({
  pin: z.string().trim().min(1).max(20),
});

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const parsed = loginSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "PIN is required." }, { status: 400 });
  }

  const pin = parsed.data.pin;
  const supabase = getSupabaseAdmin();

  // ---- Try admin first ----
  const { data: admin } = await supabase.from("admins").select("id, pin_hash").limit(1).maybeSingle();

  if (admin) {
    const lockStatus = await isLockedOut(supabase, "admin_attempts", admin.id);
    if (lockStatus.locked) {
      return NextResponse.json(
        { error: "Too many failed attempts. Please try again later.", retryAfterSeconds: lockStatus.retryAfterSeconds },
        { status: 429 }
      );
    }

    if (verifyPin(pin, admin.pin_hash)) {
      await resetAttempts(supabase, "admin_attempts", admin.id);
      await createAdminSession(admin.id);
      return NextResponse.json({ ok: true, role: "admin", redirectTo: "/admin" });
    }
  }

  // ---- Try team members ----
  const { data: members } = await supabase
    .from("team_members")
    .select("id, slug, pin_hash")
    .eq("is_active", true);

  const candidates = members ?? [];

  // Check lockout status for every member up front, so a locked-out member's
  // PIN is never compared (avoids wasted bcrypt work and a timing signal),
  // while unlocked members still get checked normally.
  const lockStatuses = await Promise.all(
    candidates.map((m) => isLockedOut(supabase, "pin_attempts", m.id))
  );

  for (let i = 0; i < candidates.length; i++) {
    const member = candidates[i];
    if (lockStatuses[i].locked) continue;

    if (verifyPin(pin, member.pin_hash)) {
      await resetAttempts(supabase, "pin_attempts", member.id);
      await createMemberSession(member.id);
      return NextResponse.json({
        ok: true,
        role: "member",
        redirectTo: `/about/${member.slug}`,
      });
    }
  }

  // ---- No match anywhere: record a failed attempt against every account that
  // was actually checked (admin + every non-locked member) so each has its
  // own independent lockout counter, without requiring the caller to identify
  // themselves first. ----
  const failureTargets: Promise<void>[] = [];
  if (admin) failureTargets.push(recordFailedAttempt(supabase, "admin_attempts", admin.id));
  candidates.forEach((member, i) => {
    if (!lockStatuses[i].locked) {
      failureTargets.push(recordFailedAttempt(supabase, "pin_attempts", member.id));
    }
  });
  await Promise.all(failureTargets);

  return NextResponse.json({ error: "Incorrect PIN." }, { status: 401 });
}
