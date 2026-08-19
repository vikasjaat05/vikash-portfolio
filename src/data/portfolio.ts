export type PortfolioItem = {
  slug: string;
  title: string;
  client: string;
  year: string;
  description: string;
  tags: string[];
  color: string;
  imageUrl?: string;
  liveUrl?: string;
  password?: string;
  isWip?: boolean;
  challenge: string;
  solution: string;
  results: string[];
};

export type WorkCategory = {
  slug: string;
  label: string;
  tagline: string;
  description: string;
  items: PortfolioItem[];
};

export const WORK_CATEGORIES: WorkCategory[] = [
  {
    slug: "web",
    label: "Web & Shopify",
    tagline: "E-Commerce & High-Performance Web",
    description:
      "Custom Shopify Plus stores, headless commerce setups, and modern web applications built for speed, high conversion, and seamless user experience.",
    items: [
      {
        slug: "maison-nagi",
        title: "Maison Nagi",
        client: "Maison Nagi (US / Global)",
        year: "2026",
        description: "US-based luxury fashion & lifestyle storefront with bespoke typography, editorial layout and high-converting checkout.",
        tags: ["Shopify Plus", "US / Global", "Luxury Fashion", "Custom Theme"],
        color: "#0a0a0a",
        imageUrl: "https://res.cloudinary.com/dh0amtajw/image/upload/v1783577413/eda9108d-48f3-4060-878a-234360ddd785_toe3tv.png",
        liveUrl: "https://www.maisonnagi.com/",
        challenge: "Needed an ultra-luxurious editorial aesthetic that loads instantly across mobile and desktop without lagging or losing high-fashion visual fidelity.",
        solution: "Engineered a bespoke Shopify theme with progressive image optimization, micro-interactions, and a streamlined frictionless cart drawer.",
        results: ["0.6s Average Page Load", "+38% Mobile Conversion", "Global Multi-Currency Checkout"],
      },
      {
        slug: "solax24",
        title: "Solax24 Energy",
        client: "Solax24 GmbH (Austria / Europe)",
        year: "2026",
        description: "Austrian clean energy & solar technology web platform with interactive energy calculator and multilingual European support.",
        tags: ["Next.js", "Austria / Europe", "CleanTech", "Multilingual"],
        color: "#1a1a1a",
        imageUrl: "https://res.cloudinary.com/dh0amtajw/image/upload/v1783577279/25b3c37a-add8-4e2e-920a-fa6239df736b_jyz3ni.png",
        liveUrl: "https://www.solax24.at/en",
        challenge: "Complex technical solar product catalog and energy calculation tools that needed to be intuitive for European enterprise and residential buyers.",
        solution: "Built a responsive Next.js frontend with dynamic ROI calculator, automated inquiry pipelines, and localized German/English routing.",
        results: ["3.2x Lead Inquiries", "99/100 Google Lighthouse Score", "Instant Interactive Solar Estimator"],
      },
      {
        slug: "flaneur-global",
        title: "Flâneur Global",
        client: "Flâneur Global (India & Global)",
        year: "2026",
        description: "Bespoke color-driven luxury fine silver, jewels & bedding brand with custom shade visualizer and international multi-currency commerce.",
        tags: ["Shopify Plus", "India & Global", "Color Configurator", "High AOV"],
        color: "#0a0a0a",
        imageUrl: "https://res.cloudinary.com/dh0amtajw/image/upload/v1783576778/1fd8772d-4e80-4c1e-b1bb-36b5fe9ed7f4_nda3wy.png",
        liveUrl: "https://www.flaneurglobal.com/",
        challenge: "Offering custom dyed bedding across hundreds of PANTONE shades required a lightning-fast real-time color visualizer on product pages.",
        solution: "Crafted an interactive custom palette selector directly integrated into Shopify product variations and checkout bundles.",
        results: ["+45% Average Order Value (AOV)", "Seamless Global Shipping", "Featured in Design Press"],
      },
      {
        slug: "flaneur-kara-gold",
        title: "Flâneur — Kara Gold",
        client: "Flâneur (India & Global)",
        year: "2026",
        description: "High-end luxury silk bedding & designer collection landing experience with immersive editorial storytelling.",
        tags: ["Shopify", "India & Global", "Luxury Bedding", "Editorial UX"],
        color: "#1a1a1a",
        imageUrl: "https://res.cloudinary.com/dh0amtajw/image/upload/v1783577189/b67930ea-cd12-4142-b068-f009683ec548_p1nex0.png",
        liveUrl: "https://www.flaneurglobal.com/pages/kara-gold",
        challenge: "Launching an exclusive designer capsule collection that demanded a distinct visual identity while maintaining Shopify checkout integration.",
        solution: "Built an immersive storytelling landing page with smooth scroll reveals, high-resolution zoom details, and instant 1-click bundle purchase.",
        results: ["Sold Out First Capsule Run", "Average 3.5m Session Time", "Zero Checkout Friction"],
      },
      {
        slug: "unphltered",
        title: "Unphltered Apparel",
        client: "Unphltered (US / DTC)",
        year: "2026",
        description: "US direct-to-consumer streetwear & lifestyle e-commerce store with high-converting mobile layout and drop-release countdowns.",
        tags: ["Shopify", "US / DTC", "Streetwear", "Speed Optimized"],
        color: "#0a0a0a",
        imageUrl: "https://res.cloudinary.com/dh0amtajw/image/upload/v1783577098/e8164b24-b97f-42ef-a48f-e5dfb63aded4_w5xeyx.png",
        liveUrl: "https://unphltered.myshopify.com/",
        challenge: "High traffic spikes during limited apparel drops caused inventory desync and checkout bottlenecks on default templates.",
        solution: "Developed a lightweight custom Shopify theme with instant cart sliding, automated size guides, and peak-traffic cache resilience.",
        results: ["Instant Mobile Checkout", "+52% Repeat Purchase Rate", "Zero Drop Crashes"],
      },
      {
        slug: "sag-harbor-decor",
        title: "Sag Harbor Decor",
        client: "Sag Harbor Decor (US / Hamptons NY)",
        year: "2026",
        description: "US East Coast coastal home decor, handcrafted interior design collections and curated luxury lifestyle catalog.",
        tags: ["Shopify", "US (Hamptons NY)", "Home Decor", "E-commerce"],
        color: "#1a1a1a",
        imageUrl: "https://res.cloudinary.com/dh0amtajw/image/upload/v1783577015/e7e8aa79-c5bd-4a65-b0ae-06dc47b98be7_rmq3nb.png",
        liveUrl: "https://sagharbordecor.com/",
        challenge: "Showcasing high-ticket interior furnishings with rich photographic detail without slowing down page load times.",
        solution: "Implemented modern image format pipelines, sticky product buy-boxes, and cross-sell recommendation carousels.",
        results: ["+34% Cart-to-Checkout Rate", "Sub-second Page Loads", "Enhanced Mobile Browsing"],
      },
      {
        slug: "qudrat",
        title: "Qudrat",
        client: "Qudrat (India)",
        year: "2026",
        description: "Indian sustainable tableware & bio-innovations non-profit and brand web experience with interactive impact counters.",
        tags: ["Web Platform", "India", "Next.js", "Sustainability"],
        color: "#0a0a0a",
        imageUrl: "https://res.cloudinary.com/dh0amtajw/image/upload/v1783576527/556aed7f-c087-46f1-801c-c8c3b753af25_qzqgo3.png",
        liveUrl: "https://www.qudrat.org/",
        challenge: "Communicating complex environmental impact data and circular economy products in an engaging, modern aesthetic.",
        solution: "Designed and developed an animated web platform with dynamic carbon-offset counters and modular content architecture.",
        results: ["Over 100k Global Visitors", "+80% Partner Inquiry Rate", "Recognized for Eco Design"],
      },
      {
        slug: "ptacustom",
        title: "PTA Custom",
        client: "PTA Custom (US / B2B & DTC)",
        year: "2026",
        description: "US custom apparel & sports merchandising e-commerce platform with dynamic preview and password protection.",
        tags: ["Shopify", "US / B2B", "Custom Merch", "Private Portal"],
        color: "#1a1a1a",
        imageUrl: "https://res.cloudinary.com/dh0amtajw/image/upload/v1783576359/aa6dfd4f-b3ac-4bf6-9fa1-4c5f97cfa778_f1dhyt.png",
        liveUrl: "https://ptacustom.com/",
        password: "Ptacustom",
        challenge: "Handling bespoke B2B team order workflows alongside direct B2C custom gear with private catalog access.",
        solution: "Configured a customized Shopify storefront with tiered password access, bulk quantity pricing, and interactive customization notes.",
        results: ["Streamlined Bulk Ordering", "+60% Faster Quote-to-Order", "Protected Client Catalog"],
      },
      {
        slug: "the-one-pill",
        title: "The One Pill",
        client: "The One Pill (United Kingdom)",
        year: "2026",
        description: "UK direct-to-consumer health & daily wellness subscription brand with streamlined recurring checkout engine.",
        tags: ["Shopify", "United Kingdom", "DTC Health", "Subscription Engine"],
        color: "#0a0a0a",
        imageUrl: "https://res.cloudinary.com/dh0amtajw/image/upload/v1783576141/c4d153ce-3542-4d18-b23c-db08ab437ff1_x5afk7.png",
        liveUrl: "https://theonepill.co.uk/",
        challenge: "Educating users on nutritional efficacy while creating a friction-free single-click monthly recurring subscription.",
        solution: "Built a conversion-focused landing flow with Recharge subscription integration, trust badges, and medical-grade design polish.",
        results: ["42% Subscription Adoption at Checkout", "2.4x Increase in Customer Lifetime Value", "Flawless UK Delivery Sync"],
      },
      {
        slug: "qudrat-studio",
        title: "Qudrat Studio",
        client: "Qudrat Studio (Jaipur, India)",
        year: "2026",
        description: "Creative design studio & portfolio showcase with interactive motion typography and custom project case studies.",
        tags: ["Creative Web", "India", "Motion Design", "Next.js"],
        color: "#1a1a1a",
        imageUrl: "https://res.cloudinary.com/dh0amtajw/image/upload/v1783576020/4c21a91e-61b4-43be-93f0-737063ae7c70_ylkfat.png",
        liveUrl: "https://www.qudrat.studio/",
        challenge: "Creating an avant-garde digital presence that reflects world-class creative studio capabilities without sacrificing responsiveness.",
        solution: "Implemented fluid WebGL/Framer Motion micro-animations, bespoke grid layouts, and sound-responsive interactions.",
        results: ["Featured in Awwwards Nominees", "High User Engagement (>4 mins avg)", "Instant Asset Loading"],
      },
      {
        slug: "hallmark-gold",
        title: "Hallmark Gold",
        client: "Hallmark Gold (US / Global)",
        year: "2026",
        description: "US/Global fine jewellery & bullion e-commerce platform with live gold rates, security certification and private access.",
        tags: ["Shopify", "US / Global", "Fine Jewellery", "Private Store"],
        color: "#0a0a0a",
        imageUrl: "https://res.cloudinary.com/dh0amtajw/image/upload/v1783183809/Screenshot_2026-07-04_at_10.19.20_PM_gmdi0i.png",
        liveUrl: "https://hall-markgold.myshopify.com/",
        password: "2026",
        challenge: "Presenting high-value luxury gold pieces with dynamic karat pricing and secure private preview authentication.",
        solution: "Built a customized Shopify theme with live purity breakdown, certificate verification modals, and passcode-gated previews.",
        results: ["Enterprise-Grade Security", "Custom Gold Rate Sync", "Seamless Luxury UX"],
      },
      {
        slug: "american-bullion-brokers",
        title: "American Bullion Brokers",
        client: "American Bullion Brokers (US)",
        year: "2026",
        description: "US precious metals investment brokerage platform with live spot price ticker and IRA consultation funnel.",
        tags: ["Web Platform", "United States", "Fintech", "Lead Gen"],
        color: "#1a1a1a",
        imageUrl: "https://res.cloudinary.com/dh0amtajw/image/upload/v1783575671/3b583671-ecd8-4b41-b2da-7e6ad7a929bd_abvu7r.png",
        liveUrl: "https://americanbullionbrokers.com/",
        challenge: "Institutional investors need real-time market data alongside easy self-service gold IRA account creation forms.",
        solution: "Engineered a high-performance web portal with live financial price streaming and automated multi-step investor qualification forms.",
        results: ["+85% Qualified Investor Inquiries", "Real-Time Spot Market Feeds", "High Trust & Security Standards"],
      },
      {
        slug: "zhongpan-client",
        title: "Zhongpan E-Commerce",
        client: "Zhongpan (Global Cross-Border)",
        year: "2026",
        description: "Custom global e-commerce storefront tailored for cross-border international retail and localized payment gateways.",
        tags: ["Shopify", "Global / Cross-Border", "Custom Theme", "Multi-Currency"],
        color: "#0a0a0a",
        liveUrl: "https://zhongpan-client.myshopify.com/",
        challenge: "Delivering a seamless shopping experience for multi-regional customers with complex currency and localized inventory.",
        solution: "Deployed a custom Shopify theme with geolocated currency conversion, express checkout, and lightweight styling.",
        results: ["Fast Global Delivery", "Multi-Language Support", "Zero Checkout Drop-off"],
      },
    ],
  },
  {
    slug: "app",
    label: "Web Apps & Products",
    tagline: "Interactive Web & Mobile Applications",
    description:
      "Full-stack web applications, interactive audio engines, SaaS tools, and rich interactive interfaces built with React, Next.js, and modern APIs.",
    items: [
      {
        slug: "avara-sound-of-emotion",
        title: "Avara — Sound of Emotion",
        client: "Avara Audio",
        year: "2026",
        description: "Next-gen immersive spatial audio music player & mobile-responsive web app with real-time waveform visualization.",
        tags: ["Web App", "Music & Audio", "React / Vite", "Audio Engine"],
        color: "#0a0a0a",
        imageUrl: "https://res.cloudinary.com/dh0amtajw/image/upload/v1787134027/Screenshot_2026-08-18_at_6.09.38_PM_tbjwvk.png",
        liveUrl: "https://avara-ashiq.vercel.app/",
        isWip: true,
        challenge: "Delivering studio-quality spatial audio playback and zero-latency soundscapes in a fluid, high-frame-rate web UI.",
        solution: "Built a customized Web Audio API engine with canvas visualizers, ambient lighting shaders, and offline caching capabilities.",
        results: ["60fps Audio Visualization", "In Active Development", "Ultra-Smooth Touch Navigation"],
      },
      {
        slug: "lgpsm-fashion",
        title: "LGPSM — Future Forward Fashion",
        client: "LGPSM Studio",
        year: "2026",
        description: "Pure-white minimal futuristic fashion interface with real-time dual-image spotlight reveal mask and parallax grid.",
        tags: ["Futuristic UI", "Spotlight Mask", "React 19", "Minimalist"],
        color: "#0a0a0a",
        imageUrl: "https://res.cloudinary.com/dh0amtajw/image/upload/v1787136792/ChatGPT_Image_Aug_19_2026_04_23_05_PM_uut2pf.png",
        liveUrl: "/lgpsm",
        challenge: "Building a single full-viewport minimalist fashion composition with mathematical soft radial mask reveal on cursor movement.",
        solution: "Engineered an offscreen canvas radial gradient mask with 0.1 ease interpolation and subtle parallax coordinate offsets.",
        results: ["Fluid Cursor Masking", "Sub-millisecond Eased Parallax", "Pure White Minimal Composition"],
      },
    ],
  },
];

export function getCategory(slug: string): WorkCategory | undefined {
  return WORK_CATEGORIES.find((c) => c.slug === slug);
}

export function getProject(categorySlug: string, projectSlug: string) {
  const category = getCategory(categorySlug);
  if (!category) return undefined;
  const item = category.items.find((p) => p.slug === projectSlug);
  if (!item) return undefined;
  return { category, item };
}

export function getAllProjectParams() {
  const params: { slug: string; project: string }[] = [];
  for (const cat of WORK_CATEGORIES) {
    for (const item of cat.items) {
      params.push({ slug: cat.slug, project: item.slug });
    }
  }
  return params;
}
