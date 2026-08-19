import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getSupabaseAdmin } from "@/lib/supabase/server";
import { getMemberSession } from "@/lib/auth/member-session";
import { getOwnerProjects } from "@/lib/project-data";
import { PROJECT_CATEGORIES } from "@/lib/project-categories";
import { urlField } from "@/lib/url-field";

const createProjectSchema = z.object({
  title: z.string().trim().min(1, "Title is required").max(120),
  description: z.string().trim().min(1, "Description is required").max(1000),
  category: z.enum(PROJECT_CATEGORIES).default("general"),
  imageUrl: urlField.optional(),
  linkUrl: urlField.optional(),
});

function slugify(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export async function GET() {
  const session = await getMemberSession();
  if (!session) {
    return NextResponse.json({ error: "Not authenticated." }, { status: 401 });
  }

  const projects = await getOwnerProjects(session.memberId);
  return NextResponse.json({ projects });
}

export async function POST(req: NextRequest) {
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

  const parsed = createProjectSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed.", issues: parsed.error.flatten().fieldErrors },
      { status: 400 }
    );
  }

  const { title, description, category, imageUrl, linkUrl } = parsed.data;
  const baseSlug = slugify(title);
  if (!baseSlug) {
    return NextResponse.json({ error: "Title must contain letters." }, { status: 400 });
  }

  const supabase = getSupabaseAdmin();

  let slug = baseSlug;
  let suffix = 1;
  let slugTaken = true;
  while (slugTaken) {
    const { data: existing } = await supabase
      .from("projects")
      .select("id")
      .eq("member_id", session.memberId)
      .eq("slug", slug)
      .maybeSingle();
    slugTaken = Boolean(existing);
    if (!slugTaken) break;
    suffix += 1;
    slug = `${baseSlug}-${suffix}`;
  }

  const { data: created, error } = await supabase
    .from("projects")
    .insert({
      member_id: session.memberId,
      slug,
      status: "draft",
      draft_category: category,
      draft_title: title,
      draft_description: description,
      draft_image_path: imageUrl || null,
      draft_link_url: linkUrl || null,
    })
    .select("id, slug")
    .single();

  if (error || !created) {
    return NextResponse.json({ error: "Failed to create project." }, { status: 500 });
  }

  return NextResponse.json({ ok: true, project: created });
}
