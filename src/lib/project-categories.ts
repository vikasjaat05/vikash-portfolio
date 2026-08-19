export const PROJECT_CATEGORIES = [
  "general",
  "logo",
  "branding",
  "social",
  "packaging",
  "print",
  "uiux",
  "seo",
  "paidads",
  "content",
] as const;

export type ProjectCategory = (typeof PROJECT_CATEGORIES)[number];

export const PROJECT_CATEGORY_LABELS: Record<ProjectCategory, string> = {
  general: "General",
  logo: "Logo Folio",
  branding: "Branding",
  social: "Social Media",
  packaging: "Package Design",
  print: "Print Media",
  uiux: "UI/UX",
  seo: "SEO Campaigns",
  paidads: "Paid Ads",
  content: "Content & Email Marketing",
};
