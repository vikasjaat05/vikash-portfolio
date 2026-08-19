export const HERO_VIDEO =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260314_131748_f2ca2a28-fed7-44c8-b9a9-bd9acdd5ec31.mp4";

export const ROLES = ["Web Developer", "Shopify Expert", "Builder", "Problem Solver"];

export const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "Work", href: "#work" },
  { label: "Resume", href: "#explorations" },
];

export type WorkItem = {
  title: string;
  category: string;
  color: string;
  href: string;
};

export const WORKS: WorkItem[] = [
  {
    title: "Lumen Finance",
    category: "Fintech Web Platform",
    color: "#e10600",
    href: "/work/web/lumen-finance",
  },
  {
    title: "Vertex Cloud",
    category: "SaaS Web App",
    color: "#1a1a1a",
    href: "/work/web/vertex-saas-platform",
  },
  {
    title: "Kindred Foods",
    category: "Shopify Storefront",
    color: "#0f9d58",
    href: "/work/web/kindred-foods-store",
  },
  {
    title: "Halo Health",
    category: "Booking Portal",
    color: "#4e85bf",
    href: "/work/web/halo-health-portal",
  },
];

export const EXPLORATIONS = [
  { title: "Component Systems", color: "#1a1a1a" },
  { title: "Checkout Flows", color: "#e10600" },
  { title: "Dashboard UI", color: "#4e85bf" },
  { title: "Theme Customization", color: "#0f9d58" },
  { title: "API Integrations", color: "#89aacc" },
  { title: "Performance Audits", color: "#7a3ee0" },
];

export const STATS = [
  { value: "8+", label: "Years Experience" },
  { value: "40+", label: "Sites Shipped" },
  { value: "97%", label: "Client Retention" },
];
