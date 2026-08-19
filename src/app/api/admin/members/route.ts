import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getSupabaseAdmin } from "@/lib/supabase/server";
import { getAdminSession } from "@/lib/auth/admin-session";
import { hashPin } from "@/lib/auth/pin";

const CATEGORY_OPTIONS = ["web", "app", "graphics", "marketing"] as const;

const CATEGORY_LABELS: Record<(typeof CATEGORY_OPTIONS)[number], string> = {
  web: "Web & Shopify",
  app: "App Development",
  graphics: "Graphic Design",
  marketing: "Digital Marketing",
};

const CATEGORY_GRADIENTS: Record<(typeof CATEGORY_OPTIONS)[number], string> = {
  web: "linear-gradient(160deg, #1a1a1a 0%, #e10600 140%)",
  app: "linear-gradient(160deg, #1a1a1a 0%, #2b6cb0 140%)",
  graphics: "linear-gradient(160deg, #1a1a1a 0%, #7a3ee0 140%)",
  marketing: "linear-gradient(160deg, #1a1a1a 0%, #f4a300 140%)",
};

const createMemberSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(120),
  role: z.string().trim().min(1, "Role is required").max(120),
  categorySlug: z.enum(CATEGORY_OPTIONS),
  avatar: z.string().trim().url("Avatar must be a valid image URL"),
  pin: z.string().trim().regex(/^\d{4,6}$/, "PIN must be 4-6 digits"),
});

function slugify(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function initialsOf(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .slice(0, 2)
    .join("");
}

export async function GET() {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Not authenticated." }, { status: 401 });
  }

  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("team_members")
    .select("id, slug, is_active, published_data, draft_data, created_at")
    .order("created_at", { ascending: true });

  if (error) {
    return NextResponse.json({ error: "Failed to load members." }, { status: 500 });
  }

  return NextResponse.json({ members: data });
}

export async function POST(req: NextRequest) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Not authenticated." }, { status: 401 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const parsed = createMemberSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed.", issues: parsed.error.flatten().fieldErrors },
      { status: 400 }
    );
  }

  const { name, role, categorySlug, avatar, pin } = parsed.data;
  const baseSlug = slugify(name);
  if (!baseSlug) {
    return NextResponse.json({ error: "Name must contain letters." }, { status: 400 });
  }

  const supabase = getSupabaseAdmin();

  // Ensure slug uniqueness — append -2, -3, etc. if needed.
  let slug = baseSlug;
  let suffix = 1;
  let slugTaken = true;
  while (slugTaken) {
    const { data: existing } = await supabase
      .from("team_members")
      .select("id")
      .eq("slug", slug)
      .maybeSingle();
    slugTaken = Boolean(existing);
    if (!slugTaken) break;
    suffix += 1;
    slug = `${baseSlug}-${suffix}`;
  }

  const publishedData = {
    name,
    role,
    initials: initialsOf(name),
    focus: CATEGORY_LABELS[categorySlug],
    categorySlug,
    bio: "New team member — bio coming soon.",
    longBio: "This team member hasn't added their story yet.",
    highlights: [] as string[],
    skills: [] as string[],
    stats: [] as { value: number; suffix: string; label: string }[],
    gradient: CATEGORY_GRADIENTS[categorySlug],
    avatar,
  };

  const pinHash = hashPin(pin);

  const { data: created, error } = await supabase
    .from("team_members")
    .insert({
      slug,
      pin_hash: pinHash,
      published_data: publishedData,
      published_at: new Date().toISOString(),
    })
    .select("id, slug")
    .single();

  if (error || !created) {
    return NextResponse.json({ error: "Failed to create member." }, { status: 500 });
  }

  return NextResponse.json({ ok: true, member: created });
}
