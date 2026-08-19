import "server-only";
import { FOUNDERS as FOUNDERS_FALLBACK } from "@/data/founders.fallback";

export type FounderStat = {
  value: number;
  suffix: string;
  label: string;
};

export type Founder = {
  slug: string;
  name: string;
  role: string;
  initials: string;
  focus: string;
  categorySlug: string;
  bio: string;
  longBio: string;
  highlights: string[];
  skills: string[];
  stats: FounderStat[];
  gradient: string;
  avatar: string;
};

function fallbackFounder(slug: string): Founder | undefined {
  return FOUNDERS_FALLBACK.find((f) => f.slug === slug);
}

/** All active team members / founders — instant return from local verified data */
export async function getFounders(): Promise<Founder[]> {
  return FOUNDERS_FALLBACK;
}

/** A single founder by slug */
export async function getFounder(slug: string): Promise<Founder | undefined> {
  return fallbackFounder(slug);
}

/** Get founder for viewer */
export async function getFounderForViewer(
  slug: string,
  _viewerSlug: string | null
): Promise<{ founder: Founder; hasDraft: boolean } | undefined> {
  const fallback = fallbackFounder(slug);
  return fallback ? { founder: fallback, hasDraft: false } : undefined;
}

/** All known slugs, for generateStaticParams */
export async function getAllFounderSlugs(): Promise<string[]> {
  return FOUNDERS_FALLBACK.map((f) => f.slug);
}
