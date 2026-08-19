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

export const FOUNDERS: Founder[] = [
  {
    slug: "vikash-choudhary",
    name: "Vikash Choudhary",
    role: "Web & Shopify Developer",
    initials: "VC",
    focus: "Shopify & Frontend",
    categorySlug: "web",
    bio: "Passionate Web & Shopify Developer crafting high-speed e-commerce stores, custom Liquid themes, and modern Next.js web applications.",
    longBio:
      "Passionate and results-driven Web & Shopify Developer with 1+ years of hands-on experience building, customizing, and scaling high-performance e-commerce storefronts and custom web applications. Successfully delivered 14+ live stores across global markets including the US, UK, Austria, and India with 98% client satisfaction.\n\nSpecialized in bespoke Shopify Liquid theme development, fullstack Next.js/React engineering, Tailwind CSS, Core Web Vitals optimization (sub-1s page load), and cutting-edge AI prompt workflows.",
    highlights: [
      "14+ Global & Indian Stores Delivered (Solax24, The One Pill, PTA Custom, Qudrat Studio, Flaneur Global)",
      "Sub-1s Page Load Speed & 90+ Lighthouse Core Web Vitals Optimization",
      "Custom Shopify Liquid / Hydrogen Theme Architecture & Checkout Conversion Engineering",
      "Modern Next.js & React Web Applications with AI-Augmented Workflows",
    ],
    skills: [
      "Shopify & Liquid Themes",
      "Next.js / React / TypeScript",
      "Tailwind CSS & Motion",
      "Speed & CRO Optimization",
      "AI Prompt Engineering",
      "Figma to Code",
      "REST APIs & Integration",
      "Git & GitHub",
    ],
    stats: [
      { value: 14, suffix: "+", label: "Live Stores Built" },
      { value: 1, suffix: "+", label: "Years Experience" },
      { value: 98, suffix: "%", label: "Client Satisfaction" },
    ],
    gradient: "linear-gradient(160deg, #1a1a1a 0%, #e10600 140%)",
    avatar: "https://res.cloudinary.com/dh0amtajw/image/upload/v1783076813/ChatGPT_Image_Jul_3_2026_12_25_31_PM_t7giml.png",
  },
  {
    slug: "yunus-ali",
    name: "Yunus Ali",
    role: "Digital Marketing Specialist",
    initials: "YA",
    focus: "Digital Marketing",
    categorySlug: "marketing",
    bio: "Runs performance and growth campaigns across paid ads, SEO and social funnels.",
    longBio:
      "Planning and executing paid, SEO and social campaigns that turn ad spend into pipeline. Every campaign ships with clear tracking from click to conversion, ensuring advertising spend delivers maximum return on investment.",
    highlights: [
      "Plans and runs paid, SEO and social campaigns across high-growth channels",
      "Specializes in conversion rate optimization and performance funnels",
      "Ties every campaign to measurable revenue and pipeline growth",
    ],
    skills: ["SEO", "Paid Ads", "Analytics", "CRO"],
    stats: [
      { value: 6, suffix: "+", label: "Years Experience" },
      { value: 55, suffix: "+", label: "Campaigns Run" },
      { value: 3, suffix: "x", label: "Avg. ROAS" },
    ],
    gradient: "linear-gradient(160deg, #1a1a1a 0%, #f4a300 140%)",
    avatar: "https://res.cloudinary.com/dh0amtajw/image/upload/v1783090235/ChatGPT_Image_Jul_3_2026_08_20_17_PM_ex1ovd.png",
  },
  {
    slug: "chandra-prakash",
    name: "Chandra Prakash",
    role: "Graphic & UI Designer",
    initials: "CP",
    focus: "Graphic Design",
    categorySlug: "graphics",
    bio: "Crafts brand identities, visual systems, and UI assets that make businesses stand out.",
    longBio:
      "Crafts brand identities and visual systems — building logo design, packaging, and digital assets that make client brands instantly recognizable. Every project starts with a documented system so brands stay consistent across every touchpoint.",
    highlights: [
      "Leads brand identity, packaging and digital asset design",
      "Delivers full documented brand systems and style guides",
      "Designs consistently across web, print, and social formats",
    ],
    skills: ["Branding", "UI/UX", "Print", "Motion"],
    stats: [
      { value: 7, suffix: "+", label: "Years Experience" },
      { value: 65, suffix: "+", label: "Brands Designed" },
      { value: 12, suffix: "", label: "Design Awards" },
    ],
    gradient: "linear-gradient(160deg, #1a1a1a 0%, #7a3ee0 140%)",
    avatar: "https://res.cloudinary.com/dh0amtajw/image/upload/v1783076814/ChatGPT_Image_Jul_3_2026_01_07_48_PM_bykrat.png",
  },
];

export function getFounder(slug: string) {
  return FOUNDERS.find((f) => f.slug === slug);
}
