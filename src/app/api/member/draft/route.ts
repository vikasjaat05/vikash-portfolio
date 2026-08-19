import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getSupabaseAdmin } from "@/lib/supabase/server";
import { getMemberSession } from "@/lib/auth/member-session";

const statSchema = z.object({
  value: z.number().finite(),
  suffix: z.string().trim().max(10),
  label: z.string().trim().min(1).max(60),
});

function stableStringify(value: unknown): string {
  if (Array.isArray(value)) {
    return `[${value.map(stableStringify).join(",")}]`;
  }
  if (value !== null && typeof value === "object") {
    const keys = Object.keys(value as Record<string, unknown>).sort();
    return `{${keys
      .map((key) => `${JSON.stringify(key)}:${stableStringify((value as Record<string, unknown>)[key])}`)
      .join(",")}}`;
  }
  return JSON.stringify(value);
}

const draftSchema = z.object({
  name: z.string().trim().min(1).max(120),
  role: z.string().trim().min(1).max(120),
  avatar: z.string().trim().url("Avatar must be a valid image URL"),
  bio: z.string().trim().min(1).max(500),
  longBio: z.string().trim().min(1).max(5000),
  highlights: z.array(z.string().trim().min(1).max(200)).max(10),
  skills: z.array(z.string().trim().min(1).max(60)).max(20),
  stats: z.array(statSchema).max(6),
});

export async function GET() {
  const session = await getMemberSession();
  if (!session) {
    return NextResponse.json({ error: "Not authenticated." }, { status: 401 });
  }

  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("team_members")
    .select("published_data, draft_data")
    .eq("id", session.memberId)
    .single();

  if (error || !data) {
    return NextResponse.json({ error: "Member not found." }, { status: 404 });
  }

  // Draft is what the member sees/edits — falls back to published if no draft exists yet.
  return NextResponse.json({
    current: data.draft_data ?? data.published_data,
    hasDraft: data.draft_data !== null,
  });
}

export async function PATCH(req: NextRequest) {
  const session = await getMemberSession();
  if (!session) {
    return NextResponse.json({ error: "Not authenticated." }, { status: 401 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const parsed = draftSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed.", issues: parsed.error.flatten().fieldErrors },
      { status: 400 }
    );
  }

  const supabase = getSupabaseAdmin();

  const { data: existing, error: fetchError } = await supabase
    .from("team_members")
    .select("published_data, draft_data")
    .eq("id", session.memberId)
    .single();

  if (fetchError || !existing) {
    return NextResponse.json({ error: "Member not found." }, { status: 404 });
  }

  const base = (existing.draft_data ?? existing.published_data) as Record<string, unknown>;
  const nextDraft = { ...base, ...parsed.data };

  // If the resulting draft is identical to what's already published, there's
  // nothing unpublished — clear draft_data instead of storing a redundant
  // duplicate, so "has unpublished changes" stays accurate. Keys are sorted
  // before comparing since JSONB round-trips don't preserve key order, and a
  // plain JSON.stringify comparison would treat reordered-but-equal objects
  // as different.
  const isSameAsPublished =
    stableStringify(nextDraft) === stableStringify(existing.published_data as Record<string, unknown>);

  const { error: updateError } = await supabase
    .from("team_members")
    .update({
      draft_data: isSameAsPublished ? null : nextDraft,
      draft_updated_at: new Date().toISOString(),
    })
    .eq("id", session.memberId);

  if (updateError) {
    return NextResponse.json({ error: "Failed to save draft." }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
