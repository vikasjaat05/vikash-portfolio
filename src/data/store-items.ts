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
    id: "cyber-ronin-portfolio",
    title: "Cyber Ronin 2026 Developer Portfolio",
    category: "theme",
    categoryLabel: "Portfolio Theme",
    badge: "Official Portfolio",
    popular: true,
    tagline: "The exact Next.js 16 + React 19 flagship portfolio theme used by Vikash Choudhary.",
    description:
      "Includes the complete source code: 60fps liquid glass floating dock, interactive ambient audio system, voice navigation, and PIN-protected Supabase CMS with draft/publish workflows.",
    priceUsd: "$129",
    priceInr: "₹9,999",
    image: "https://res.cloudinary.com/dh0amtajw/image/upload/v1783577279/25b3c37a-add8-4e2e-920a-fa6239df736b_jyz3ni.png",
    techStack: ["Next.js 16", "React 19", "Tailwind CSS v4", "Framer Motion", "Supabase CMS"],
    features: [
      "Full Next.js 16 App Router repository",
      "Liquid Glass floating dock (Desktop + Mobile Bento)",
      "Ambient background audio player & equalizers",
      "Supabase PIN-protected CMS & migrations",
      "1-Click Vercel deployment with zero setup bugs",
      "Full commercial license for personal & client use",
    ],
    liveDemoUrl: "/",
    downloadOrRepoNote: "Instant GitHub repository access + documentation zip.",
  },
  {
    id: "maison-luxury-shopify",
    title: "Maison Luxury E-Commerce Theme",
    category: "shopify",
    categoryLabel: "Shopify & E-Commerce",
    badge: "Best Seller",
    popular: true,
    tagline: "High-fashion, editorial luxury Shopify storefront engineered for 0.6s loads and higher conversions.",
    description:
      "Engineered for high-ticket DTC apparel and lifestyle brands. Features an ultra-fast ajax cart drawer, predictive search modal, currency switcher, and modern lookbook sections.",
    priceUsd: "$149",
    priceInr: "₹11,999",
    image: "https://res.cloudinary.com/dh0amtajw/image/upload/v1783577413/eda9108d-48f3-4060-878a-234360ddd785_toe3tv.png",
    techStack: ["Shopify Liquid", "Tailwind CSS", "Alpine.js", "Cart Drawer", "Predictive Search"],
    features: [
      "Ready-to-install Shopify Theme (.zip file)",
      "Sub-second page load speed & 98+ Lighthouse score",
      "Frictionless slide-out cart drawer & upsells",
      "Editorial product grid with sticky details",
      "Fully responsive on iOS, Android & Desktop",
      "Step-by-step video installation guide",
    ],
    liveDemoUrl: "https://www.maisonnagi.com/",
    downloadOrRepoNote: "Downloadable Shopify Theme zip + setup tutorial included.",
  },
  {
    id: "minimalist-bento-portfolio",
    title: "Minimalist Bento Creative Portfolio",
    category: "theme",
    categoryLabel: "Portfolio Theme",
    badge: "Minimal & Fast",
    tagline: "Ultra-clean Apple-inspired bento grid portfolio for designers, developers, and founders.",
    description:
      "A distraction-free, hyper-clean portfolio template focused on project showcases, smooth micro-interactions, resume timelines, and contact workflows.",
    priceUsd: "$79",
    priceInr: "₹5,999",
    image: "https://res.cloudinary.com/dh0amtajw/image/upload/v1783577413/eda9108d-48f3-4060-878a-234360ddd785_toe3tv.png",
    techStack: ["Next.js 15+", "Tailwind CSS", "Framer Motion", "Lenis Scroll", "Lucide Icons"],
    features: [
      "Modular Bento Grid layout for projects & skills",
      "Light & Dark mode auto-detection",
      "Interactive resume and timeline components",
      "Optimized SEO & OpenGraph meta tags",
      "Vercel, Netlify, or Cloudflare Pages 1-click deploy",
    ],
    liveDemoUrl: "/work",
    downloadOrRepoNote: "Full GitHub repository access + clean README.",
  },
  {
    id: "futuristic-figma-ui-kit",
    title: "Cyber & Luxury Figma UI Kit & Design System",
    category: "design",
    categoryLabel: "UI/UX & Figma Designs",
    badge: "Design Resource",
    tagline: "80+ responsive screens, auto-layout 5.0, dark & light tokens, and 120+ modern web components.",
    description:
      "Created for designers and developers building modern web apps, portfolios, and agency sites. Complete with style guides, typography scales, liquid glass variants, and interactive prototypes.",
    priceUsd: "$49",
    priceInr: "₹3,999",
    image: "https://res.cloudinary.com/dh0amtajw/image/upload/v1783577279/25b3c37a-add8-4e2e-920a-fa6239df736b_jyz3ni.png",
    techStack: ["Figma", "Auto-Layout v5", "Design Tokens", "Typography Scale", "Component Library"],
    features: [
      "Complete editable Figma (.fig) file",
      "80+ Desktop, Tablet & Mobile layout frames",
      "120+ Auto-Layout components with variant states",
      "Modern dark aesthetic & minimalist light styles",
      "Lifetime updates to new Figma component additions",
    ],
    downloadOrRepoNote: "Instant Figma community file copy link + .fig backup.",
  },
  {
    id: "liquid-glass-components",
    title: "Liquid Glass & Motion Component Library",
    category: "components",
    categoryLabel: "Web Kits & Components",
    badge: "Component Pack",
    tagline: "25+ copy-paste React & Tailwind CSS micro-interaction components.",
    description:
      "Everything you need to make your website feel alive: magnetic cursor pull effects, floating apple-style dock, animated logo SVG animations, glowing ambient blur cards, and audio equalizers.",
    priceUsd: "$39",
    priceInr: "₹2,999",
    image: "https://res.cloudinary.com/dh0amtajw/image/upload/v1783577279/25b3c37a-add8-4e2e-920a-fa6239df736b_jyz3ni.png",
    techStack: ["React 19", "Tailwind CSS v4", "TypeScript", "Framer Motion", "Web Audio API"],
    features: [
      "25+ drop-in React components with TypeScript types",
      "Interactive Liquid Glass Dock component",
      "Magnetic buttons with spring physics",
      "Ambient audio player and visualizer",
      "Custom liquid trail cursor effects",
    ],
    downloadOrRepoNote: "Direct source folder + interactive playground demo.",
  },
  {
    id: "solax-cleantech-web-app",
    title: "Solax CleanTech & SaaS Web Platform",
    category: "theme",
    categoryLabel: "Web App / Platform",
    badge: "Enterprise Ready",
    tagline: "Complete SaaS marketing & technical product platform with interactive ROI calculator.",
    description:
      "Engineered for technology startups, green energy companies, and enterprise services. Includes interactive calculation widgets, multilingual support, and inquiry lead capture.",
    priceUsd: "$99",
    priceInr: "₹7,999",
    image: "https://res.cloudinary.com/dh0amtajw/image/upload/v1783577279/25b3c37a-add8-4e2e-920a-fa6239df736b_jyz3ni.png",
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Interactive Widgets", "i18n Ready"],
    features: [
      "Interactive ROI calculation tool",
      "Multi-page architecture with services & case studies",
      "Lead generation forms with email dispatch",
      "Super responsive and accessible design",
      "Clean TypeScript code with zero dependencies bloat",
    ],
    liveDemoUrl: "https://www.solax24.at/en",
    downloadOrRepoNote: "Full GitHub repository code + documentation.",
  },
];
