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
    focus: "Shopify & Frontend Engineering",
    categorySlug: "web",
    bio: "Web & Shopify Developer crafting high-performance luxury storefronts, custom Liquid themes, and modern Next.js web applications.",
    longBio:
      "Passionate and results-driven Web & Shopify Developer specializing in building, customizing, and scaling high-performance e-commerce storefronts and custom web applications. Successfully delivered 14+ live stores across global markets including the US, UK, Austria, and India with 98% client satisfaction.\n\nSpecialized in bespoke Shopify Liquid theme development, fullstack Next.js/React engineering, Tailwind CSS, Core Web Vitals optimization (sub-1s page load speeds), and cutting-edge digital e-commerce architectures.",
    highlights: [
      "Frontend & E-Commerce Developer at Flaneur Global Fine Jewels & E-Commerce Store",
      "Shopify Developer at Digital Heroes — Custom Liquid Templates & Checkout Flows",
      "Web Development & Digital Optimization at Qudrat Studio, Jaipur",
      "Sub-1s Page Load Speed & 90+ Lighthouse Core Web Vitals Optimization",
      "Modern Next.js & React Web Applications with AI-Augmented Workflows",
    ],
    skills: [
      "Shopify & Liquid Themes",
      "Next.js / React / TypeScript",
      "Tailwind CSS & Motion",
      "Speed & CRO Optimization",
      "HTML5, CSS3, JavaScript",
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
];
