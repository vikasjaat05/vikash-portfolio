import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { getSupabaseAdmin } from "@/lib/supabase/server";
import { getMemberSession } from "@/lib/auth/member-session";

export async function POST(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getMemberSession();
  if (!session) {
    return NextResponse.json({ error: "Not authenticated." }, { status: 401 });
  }

  const { id } = await params;
  const supabase = getSupabaseAdmin();

  const { data: existing, error: fetchError } = await supabase
    .from("projects")
    .select("id, slug, draft_title, draft_description, draft_image_path, draft_link_url, draft_category")
    .eq("id", id)
    .eq("member_id", session.memberId)
    .is("deleted_at", null)
    .maybeSingle();

  if (fetchError || !existing) {
    return NextResponse.json({ error: "Project not found." }, { status: 404 });
  }

  const { error: updateError } = await supabase
    .from("projects")
    .update({
      status: "published",
      published_title: existing.draft_title,
      published_description: existing.draft_description,
      published_image_path: existing.draft_image_path,
      published_link_url: existing.draft_link_url,
      published_category: existing.draft_category,
      published_at: new Date().toISOString(),
    })
    .eq("id", id);

  if (updateError) {
    return NextResponse.json({ error: "Failed to publish project." }, { status: 500 });
  }

  revalidatePath(`/about/${session.slug}`);
  revalidatePath(`/work/${session.slug}/${existing.slug}`);
  revalidatePath("/");

  return NextResponse.json({ ok: true });
}
