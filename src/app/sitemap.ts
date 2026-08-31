import { MetadataRoute } from "next";

const BASE_URL = "https://vikash-portfolio-sandy.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const currentDate = new Date().toISOString();

  // Core High-Priority Pages
  const coreRoutes: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}/`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/work`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/services`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/about/vikash-choudhary`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${BASE_URL}/pricing`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/resume`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/journal`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/careers`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/who-we-are`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/fashion`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/vanguard`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/lgpsm`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/privacy`,
      lastModified: currentDate,
      changeFrequency: "yearly",
      priority: 0.4,
    },
    {
      url: `${BASE_URL}/terms`,
      lastModified: currentDate,
      changeFrequency: "yearly",
      priority: 0.4,
    },
  ];

  // Work Categories
  const categoryRoutes: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}/work/web`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: `${BASE_URL}/work/app`,
      lastModified: currentDate,
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
    lastModified: currentDate,
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
    lastModified: currentDate,
    changeFrequency: "monthly",
    priority: 0.75,
  }));

  return [...coreRoutes, ...categoryRoutes, ...projectRoutes, ...journalRoutes];
}
