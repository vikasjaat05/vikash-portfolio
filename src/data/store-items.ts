export type StoreCategory = "all" | "theme" | "design" | "shopify" | "components";

export type StoreItem = {
  id: string;
  title: string;
  category: StoreCategory;
  categoryLabel: string;
  badge?: string;
  popular?: boolean;
  tagline: string;
  description: string;
  priceUsd: string;
  priceInr: string;
  image: string;
  techStack: string[];
  features: string[];
  liveDemoUrl?: string;
  downloadOrRepoNote?: string;
};

export const STORE_CATEGORIES: { key: StoreCategory; label: string }[] = [
  { key: "all", label: "All Items" },
  { key: "theme", label: "Portfolio Themes" },
  { key: "design", label: "UI/UX & Figma Designs" },
  { key: "shopify", label: "Shopify & E-Commerce" },
  { key: "components", label: "Web Kits & Components" },
];

export const STORE_ITEMS: StoreItem[] = [
  {
    id: "victor-graphic-designer-portfolio",
    title: "Victor — Graphic Designer & Art Director Portfolio",
    category: "theme",
    categoryLabel: "Portfolio Theme",
    badge: "Official Theme",
    popular: true,
    tagline: "High-impact editorial portfolio engineered for visual designers, 3D artists, and creative art directors.",
    description:
      "Features an ultra-refined typography layout, smooth scroll physics, interactive project case studies, client deliverables breakdown, and seamless 1-click Vercel deployment.",
    priceUsd: "$24",
    priceInr: "₹1,999",
    image: "https://res.cloudinary.com/dh0amtajw/image/upload/v1788412466/Screenshot_2026-09-03_at_10.42.40_AM_niv6kt.png",
    techStack: ["React 19", "Vite", "Tailwind CSS", "Inter & Orbitron", "Vercel"],
    features: [
      "Full React + Vite source code repository",
      "Ultra-fast sub-second load speed & 100 Lighthouse score",
      "Editorial typography with custom Orbitron & Inter font pairing",
      "Interactive project case studies & showcase cards",
      "Perpetual commercial license for personal & client projects",
    ],
    liveDemoUrl: "https://tech1-six.vercel.app/",
    downloadOrRepoNote: "Instant GitHub repository access + documentation zip.",
  },
  {
    id: "jack-3d-creator-portfolio",
    title: "Jack — 3D Creator & Visual Designer Portfolio",
    category: "theme",
    categoryLabel: "Normal Portfolio",
    badge: "Normal Theme",
    popular: false,
    tagline: "Clean, striking personal portfolio engineered for 3D creators, digital artists, and motion designers.",
    description:
      "Crafted with Google Kanit bold typography, clean project showcases, fluid animations, and ultra-lightweight architecture for instant sub-second page loads.",
    priceUsd: "$9",
    priceInr: "₹699",
    image: "https://res.cloudinary.com/dh0amtajw/image/upload/v1788414501/Screenshot_2026-09-03_at_11.18.10_AM_vqjn70.png",
    techStack: ["React 19", "Vite", "Tailwind CSS", "Kanit Font", "Vercel"],
    features: [
      "Full React 19 + Vite clean codebase",
      "Custom Google Kanit bold typography layout",
      "3D project gallery & showcase cards",
      "Ultra-fast sub-second load speed & 100 Lighthouse score",
      "Perpetual commercial license for personal & client projects",
    ],
    liveDemoUrl: "https://jack-3d-creator-smoky.vercel.app/",
    downloadOrRepoNote: "Instant GitHub repository access + clean setup instructions.",
  },
  {
    id: "lgpsm-fashion-portfolio",
    title: "LGPSM — Future Forward Fashion",
    category: "theme",
    categoryLabel: "Futuristic Theme",
    badge: "Spotlight Mask",
    popular: true,
    tagline: "Pure-white minimal futuristic fashion interface with real-time dual-image spotlight reveal mask and parallax grid.",
    description:
      "Features mathematical soft radial spotlight mask reveals on cursor movement, offscreen canvas dual-image blending, fluid eased parallax, and clean minimalist editorial typography.",
    priceUsd: "$99",
    priceInr: "₹99",
    image: "https://res.cloudinary.com/dh0amtajw/image/upload/v1787136792/ChatGPT_Image_Aug_19_2026_04_23_05_PM_uut2pf.png",
    techStack: ["React 19", "Next.js", "Tailwind CSS", "HTML5 Canvas", "Spotlight Mask"],
    features: [
      "Full Next.js / React 19 interactive source code",
      "Real-time dual-image cursor spotlight reveal mask",
      "Minimalist pure-white futuristic fashion typography",
      "Fluid 60fps eased cursor tracking physics",
      "Perpetual commercial license for personal & client projects",
    ],
    liveDemoUrl: "/lgpsm",
    downloadOrRepoNote: "Instant GitHub repository access + clean setup instructions.",
  },
];
