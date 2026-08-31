import { MetadataRoute } from "next";

const BASE_URL = "https://vikash.website";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastMod = new Date();

  // Core High-Priority Pages
  const coreRoutes: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}/`,
      lastModified: lastMod,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/work`,
      lastModified: lastMod,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/services`,
      lastModified: lastMod,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: lastMod,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/about/vikash-choudhary`,
      lastModified: lastMod,
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: lastMod,
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${BASE_URL}/pricing`,
      lastModified: lastMod,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/resume`,
      lastModified: lastMod,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/journal`,
      lastModified: lastMod,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/careers`,
      lastModified: lastMod,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/who-we-are`,
      lastModified: lastMod,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/fashion`,
      lastModified: lastMod,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/vanguard`,
      lastModified: lastMod,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/lgpsm`,
      lastModified: lastMod,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/privacy`,
      lastModified: lastMod,
      changeFrequency: "yearly",
      priority: 0.4,
    },
    {
      url: `${BASE_URL}/terms`,
      lastModified: lastMod,
      changeFrequency: "yearly",
      priority: 0.4,
    },
  ];

  // Work Categories
  const categoryRoutes: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}/work/web`,
      lastModified: lastMod,
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: `${BASE_URL}/work/app`,
      lastModified: lastMod,
      changeFrequency: "weekly",
      priority: 0.85,
    },
  ];

  // Work Projects
  const projectSlugs = [
    { cat: "web", project: "maison-nagi" },
    { cat: "web", project: "solax24" },
    { cat: "web", project: "flaneur-global" },
    { cat: "web", project: "flaneur-kara-gold" },
    { cat: "web", project: "unphltered" },
    { cat: "web", project: "sag-harbor-decor" },
    { cat: "web", project: "qudrat" },
    { cat: "web", project: "ptacustom" },
    { cat: "web", project: "the-one-pill" },
    { cat: "web", project: "qudrat-studio" },
    { cat: "web", project: "hallmark-gold" },
    { cat: "web", project: "american-bullion-brokers" },
    { cat: "web", project: "zhongpan-client" },
    { cat: "app", project: "avara-sound-of-emotion" },
    { cat: "app", project: "lgpsm-fashion" },
  ];

  const projectRoutes: MetadataRoute.Sitemap = projectSlugs.map((p) => ({
    url: `${BASE_URL}/work/${p.cat}/${p.project}`,
    lastModified: lastMod,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  // Journal Articles
  const journalSlugs = [
    "why-slow-websites-lose-customers",
    "app-launch-checklist",
    "brand-identity-vs-logo",
    "paid-ads-vs-seo-2026",
  ];

  const journalRoutes: MetadataRoute.Sitemap = journalSlugs.map((slug) => ({
    url: `${BASE_URL}/journal/${slug}`,
    lastModified: lastMod,
    changeFrequency: "monthly",
    priority: 0.75,
  }));

  return [...coreRoutes, ...categoryRoutes, ...projectRoutes, ...journalRoutes];
}
