import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase/server";
import { getMemberSession } from "@/lib/auth/member-session";
import { revalidatePath } from "next/cache";

export async function POST() {
  const session = await getMemberSession();
  if (!session) {
    return NextResponse.json({ error: "Not authenticated." }, { status: 401 });
  }

  const supabase = getSupabaseAdmin();

  const { data: existing, error: fetchError } = await supabase
    .from("team_members")
    .select("draft_data, published_data")
    .eq("id", session.memberId)
    .single();

  if (fetchError || !existing) {
    return NextResponse.json({ error: "Member not found." }, { status: 404 });
  }

  // The editor always saves the current form as the draft immediately before
  // calling publish. If draft_data is null here, that means the form's
  // content is already identical to what's published — so there's nothing
  // new to push live, but that's not a failure, just a no-op.
  if (!existing.draft_data) {
    return NextResponse.json({ ok: true, unchanged: true });
  }

  const { error: updateError } = await supabase
    .from("team_members")
    .update({
      published_data: existing.draft_data,
      published_at: new Date().toISOString(),
      draft_data: null,
    })
    .eq("id", session.memberId);

  if (updateError) {
    return NextResponse.json({ error: "Failed to publish." }, { status: 500 });
  }

  revalidatePath(`/about/${session.slug}`);
  revalidatePath("/about");
  revalidatePath("/");

  return NextResponse.json({ ok: true });
}
