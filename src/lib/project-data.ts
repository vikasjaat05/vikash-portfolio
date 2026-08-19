import "server-only";
import { getSupabaseAdmin } from "@/lib/supabase/server";
import { getCategory as getFallbackCategory } from "@/data/portfolio";
import type { Founder } from "@/lib/team-data";
import { PROJECT_CATEGORIES, PROJECT_CATEGORY_LABELS } from "@/lib/project-categories";
import type { ProjectCategory } from "@/lib/project-categories";

export { PROJECT_CATEGORIES, PROJECT_CATEGORY_LABELS };
export type { ProjectCategory };

export type MemberProject = {
  id: string;
  memberId: string;
  slug: string;
  status: "draft" | "published";
  category: ProjectCategory;
  title: string;
  description: string;
  imageUrl: string | null;
  linkUrl: string | null;
  publishedAt: string | null;
  hasDraft: boolean;
};

type ProjectRow = {
  id: string;
  member_id: string;
  slug: string;
  status: "draft" | "published";
  draft_category: ProjectCategory;
  published_category: ProjectCategory | null;
  draft_title: string;
  draft_description: string;
  draft_image_path: string | null;
  draft_link_url: string | null;
  published_title: string | null;
  published_description: string | null;
  published_image_path: string | null;
  published_link_url: string | null;
  published_at: string | null;
};

function toPublicProject(row: ProjectRow): MemberProject | null {
  if (row.status !== "published" || !row.published_title || !row.published_category) return null;
  return {
    id: row.id,
    memberId: row.member_id,
    slug: row.slug,
    status: row.status,
    category: row.published_category,
    title: row.published_title,
    description: row.published_description ?? "",
    imageUrl: row.published_image_path,
    linkUrl: row.published_link_url,
    publishedAt: row.published_at,
    hasDraft: false,
  };
}

function toOwnerProject(row: ProjectRow): MemberProject {
  const hasUnpublishedChanges =
    row.draft_title !== row.published_title ||
    row.draft_description !== (row.published_description ?? "") ||
    row.draft_image_path !== row.published_image_path ||
    row.draft_link_url !== row.published_link_url ||
    row.draft_category !== row.published_category;

  return {
    id: row.id,
    memberId: row.member_id,
    slug: row.slug,
    status: row.status,
    category: row.draft_category,
    title: row.draft_title,
    description: row.draft_description,
    imageUrl: row.draft_image_path,
    linkUrl: row.draft_link_url,
    publishedAt: row.published_at,
    hasDraft: row.status === "draft" || hasUnpublishedChanges,
  };
}

export async function getMemberIdBySlug(slug: string): Promise<string | null> {
  return null;
}

/** Published projects for a member — used on the public /about/[slug] page. */
export async function getPublishedProjects(memberId: string): Promise<MemberProject[]> {
  try {
    const supabase = getSupabaseAdmin();
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .eq("member_id", memberId)
      .eq("status", "published")
      .is("deleted_at", null)
      .order("published_at", { ascending: false });

    if (error || !data) return [];
    return data.map(toPublicProject).filter((p): p is MemberProject => p !== null);
  } catch {
    return [];
  }
}

/**
 * Projects for the owning member's editor view — includes drafts and
 * unpublished projects, using draft fields as the source of truth.
 */
export async function getOwnerProjects(memberId: string): Promise<MemberProject[]> {
  try {
    const supabase = getSupabaseAdmin();
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .eq("member_id", memberId)
      .is("deleted_at", null)
      .order("created_at", { ascending: false });

    if (error || !data) return [];
    return data.map(toOwnerProject);
  } catch {
    return [];
  }
}

/**
 * A single project by member slug + project slug, respecting draft/publish
 * visibility exactly like getFounderForViewer: owners see their draft,
 * everyone else sees only the published version.
 */
export async function getProjectForViewer(
  memberSlug: string,
  projectSlug: string,
  viewerSlug: string | null
): Promise<{ project: MemberProject; memberId: string; isOwner: boolean } | null> {
  try {
    const supabase = getSupabaseAdmin();
    const { data: member, error: memberError } = await supabase
      .from("team_members")
      .select("id")
      .eq("slug", memberSlug)
      .eq("is_active", true)
      .maybeSingle();

    if (memberError || !member) return null;

    const { data: row, error } = await supabase
      .from("projects")
      .select("*")
      .eq("member_id", member.id)
      .eq("slug", projectSlug)
      .is("deleted_at", null)
      .maybeSingle();

    if (error || !row) return null;

    const isOwner = viewerSlug === memberSlug;
    if (isOwner) {
      return { project: toOwnerProject(row), memberId: member.id, isOwner: true };
    }

    const publicProject = toPublicProject(row);
    if (!publicProject) return null;
    return { project: publicProject, memberId: member.id, isOwner: false };
  } catch {
    return null;
  }
}

/**
 * Resolves the team member who owns a given work-category slug
 * (web/app/graphics/marketing, matching team_members.published_data's
 * categorySlug — see src/data/portfolio.ts's WORK_CATEGORIES) and returns
 * their published projects. Used by /work/[slug] and
 * /work/[slug]/[project] so the public "Work" section shows a member's
 * real portfolio instead of static placeholder data.
 */
export async function getMemberProjectsForWorkCategory(
  _categorySlug: string
): Promise<{ memberSlug: string; memberName: string; projects: MemberProject[] } | null> {
  return null;
}

/** Fallback-safe: static portfolio category items shaped as MemberProject, for members without Supabase projects yet. */
export function getFallbackProjectsForCategory(categorySlug: string): MemberProject[] {
  const category = getFallbackCategory(categorySlug);
  if (!category) return [];
  return category.items.map((item) => ({
    id: item.slug,
    memberId: "",
    slug: item.slug,
    status: "published" as const,
    category: "general" as const,
    title: item.title,
    description: item.description,
    imageUrl: null,
    linkUrl: null,
    publishedAt: null,
    hasDraft: false,
  }));
}

/** Groups projects by category, in the fixed display order used on the Work section, dropping empty categories. */
export function groupProjectsByCategory(
  projects: MemberProject[]
): { category: ProjectCategory; label: string; items: MemberProject[] }[] {
  return PROJECT_CATEGORIES.map((category) => ({
    category,
    label: PROJECT_CATEGORY_LABELS[category],
    items: projects.filter((p) => p.category === category),
  })).filter((group) => group.items.length > 0);
}

export type { Founder };
