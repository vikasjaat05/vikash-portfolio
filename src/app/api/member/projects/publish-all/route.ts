import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { getSupabaseAdmin } from "@/lib/supabase/server";
import { getMemberSession } from "@/lib/auth/member-session";

/**
 * Publishes every one of the member's projects that has draft content
 * differing from what's live — used by the top-level "Publish (Go Live)"
 * button so one click ships profile changes AND any pending project
 * additions/edits together, instead of requiring a separate publish per
 * project.
 */
export async function POST() {
  const session = await getMemberSession();
  if (!session) {
    return NextResponse.json({ error: "Not authenticated." }, { status: 401 });
  }

  const supabase = getSupabaseAdmin();

  const { data: projects, error: fetchError } = await supabase
    .from("projects")
    .select(
      "id, slug, status, draft_title, draft_description, draft_image_path, draft_link_url, draft_category, published_title, published_description, published_image_path, published_link_url, published_category"
    )
    .eq("member_id", session.memberId)
    .is("deleted_at", null);

  if (fetchError) {
    return NextResponse.json({ error: "Failed to load projects." }, { status: 500 });
  }

  const pending = (projects ?? []).filter(
    (p) =>
      p.status === "draft" ||
      p.draft_title !== p.published_title ||
      p.draft_description !== p.published_description ||
      p.draft_image_path !== p.published_image_path ||
      p.draft_link_url !== p.published_link_url ||
      p.draft_category !== p.published_category
  );

  if (pending.length === 0) {
    return NextResponse.json({ ok: true, publishedCount: 0 });
  }

  const publishedAt = new Date().toISOString();
  const results = await Promise.all(
    pending.map((p) =>
      supabase
        .from("projects")
        .update({
          status: "published",
          published_title: p.draft_title,
          published_description: p.draft_description,
          published_image_path: p.draft_image_path,
          published_link_url: p.draft_link_url,
          published_category: p.draft_category,
          published_at: publishedAt,
        })
        .eq("id", p.id)
    )
  );

  const failed = results.find((r) => r.error);
  if (failed) {
    return NextResponse.json({ error: "Failed to publish some projects." }, { status: 500 });
  }

  revalidatePath(`/about/${session.slug}`);
  pending.forEach((p) => revalidatePath(`/work/${session.slug}/${p.slug}`));
  revalidatePath("/");

  return NextResponse.json({ ok: true, publishedCount: pending.length });
}
