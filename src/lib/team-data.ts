import "server-only";
import { FOUNDERS, type Founder, type FounderStat } from "@/data/founders";

export type { Founder, FounderStat };

/** All active team members / founders — instant return from local verified data */
export async function getFounders(): Promise<Founder[]> {
  return FOUNDERS;
}

/** A single founder by slug */
export async function getFounder(slug: string): Promise<Founder | undefined> {
  return FOUNDERS.find((f) => f.slug === slug);
}

/** All known slugs, for generateStaticParams */
export async function getAllFounderSlugs(): Promise<string[]> {
  return FOUNDERS.map((f) => f.slug);
}
