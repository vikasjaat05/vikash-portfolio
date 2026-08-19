import { z } from "zod";

// Members naturally paste URLs without a protocol (e.g. "www.site.com" or
// "site.com") — treat those as https:// instead of rejecting them outright.
function normalizeUrl(value: string): string {
  const trimmed = value.trim();
  if (!trimmed) return trimmed;
  return /^[a-zA-Z][a-zA-Z\d+.-]*:\/\//.test(trimmed) ? trimmed : `https://${trimmed}`;
}

export const urlField = z
  .string()
  .trim()
  .transform((value) => (value ? normalizeUrl(value) : value))
  .pipe(z.union([z.literal(""), z.string().url("Must be a valid URL")]));
