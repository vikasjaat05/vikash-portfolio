import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { revalidatePath } from "next/cache";
import { getSupabaseAdmin } from "@/lib/supabase/server";
import { getMemberSession } from "@/lib/auth/member-session";
import { urlField } from "@/lib/url-field";
import { PROJECT_CATEGORIES } from "@/lib/project-categories";

const updateProjectSchema = z.object({
  title: z.string().trim().min(1, "Title is required").max(120),
  description: z.string().trim().min(1, "Description is required").max(1000),
  category: z.enum(PROJECT_CATEGORIES).default("general"),
  imageUrl: urlField.optional(),
  linkUrl: urlField.optional(),
});

async function assertOwnedProject(memberId: string, projectId: string) {
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("projects")
    .select("id, member_id, slug")
    .eq("id", projectId)
    .eq("member_id", memberId)
    .is("deleted_at", null)
    .maybeSingle();
  if (error || !data) return null;
  return data;
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getMemberSession();
  if (!session) {
    return NextResponse.json({ error: "Not authenticated." }, { status: 401 });
  }

  const { id } = await params;
  const owned = await assertOwnedProject(session.memberId, id);
  if (!owned) {
    return NextResponse.json({ error: "Project not found." }, { status: 404 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const parsed = updateProjectSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed.", issues: parsed.error.flatten().fieldErrors },
      { status: 400 }
    );
  }

  const { title, description, category, imageUrl, linkUrl } = parsed.data;
  const supabase = getSupabaseAdmin();
  const { error } = await supabase
    .from("projects")
    .update({
      draft_category: category,
      draft_title: title,
      draft_description: description,
      draft_image_path: imageUrl || null,
      draft_link_url: linkUrl || null,
    })
    .eq("id", id);

  if (error) {
    return NextResponse.json({ error: "Failed to save project draft." }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getMemberSession();
  if (!session) {
    return NextResponse.json({ error: "Not authenticated." }, { status: 401 });
  }

  const { id } = await params;
  const owned = await assertOwnedProject(session.memberId, id);
  if (!owned) {
    return NextResponse.json({ error: "Project not found." }, { status: 404 });
  }

  const supabase = getSupabaseAdmin();
  const { error } = await supabase
    .from("projects")
    .update({ deleted_at: new Date().toISOString() })
    .eq("id", id);

  if (error) {
    return NextResponse.json({ error: "Failed to delete project." }, { status: 500 });
  }

  revalidatePath(`/about/${session.slug}`);
  revalidatePath(`/work/${session.slug}/${owned.slug}`);

  return NextResponse.json({ ok: true });
}
