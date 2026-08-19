export type PricingTier = {
  name: string;
  price: string;
  unit: string;
  description: string;
  features: string[];
  featured?: boolean;
};

export type PricingCategory = {
  slug: string;
  label: string;
  tiers: PricingTier[];
};

export const PRICING: PricingCategory[] = [
  {
    slug: "web",
    label: "Web & Shopify",
    tiers: [
      {
        name: "Launch",
        price: "$2,900",
        unit: "one-time",
        description: "A focused marketing site to get you live fast.",
        features: ["Up to 5 pages", "Mobile-responsive design", "Basic SEO setup", "2-week delivery"],
      },
      {
        name: "Growth",
        price: "$7,500",
        unit: "one-time",
        description: "Full custom site or Shopify store built to convert.",
        features: [
          "Up to 12 pages / full Shopify store",
          "Custom design system",
          "CMS integration",
          "Analytics & CRO setup",
          "4–6 week delivery",
        ],
        featured: true,
      },
      {
        name: "Platform",
        price: "Custom",
        unit: "quote",
        description: "Complex web apps, dashboards, or multi-store builds.",
        features: ["Custom web application", "Third-party integrations", "Dedicated engineer", "Ongoing support retainer"],
      },
    ],
  },
  {
    slug: "app",
    label: "App Development",
    tiers: [
      {
        name: "MVP",
        price: "$9,000",
        unit: "one-time",
        description: "Validate your idea with a lean, cross-platform build.",
        features: ["iOS + Android (React Native)", "Core feature set", "App Store submission", "6–8 week delivery"],
      },
      {
        name: "Full Product",
        price: "$22,000",
        unit: "one-time",
        description: "A polished, feature-complete app ready to scale.",
        features: [
          "Native-feeling cross-platform build",
          "Backend & API integration",
          "Push notifications & analytics",
          "10–14 week delivery",
        ],
        featured: true,
      },
      {
        name: "Enterprise",
        price: "Custom",
        unit: "quote",
        description: "Complex apps with custom infrastructure needs.",
        features: ["Native iOS & Android", "Custom backend architecture", "Dedicated team", "SLA-backed support"],
      },
    ],
  },
  {
    slug: "marketing",
    label: "Digital Marketing",
    tiers: [
      {
        name: "Starter",
        price: "$1,500",
        unit: "/ month",
        description: "Get consistent, focused momentum on one channel.",
        features: ["1 channel (SEO, paid, or social)", "Monthly reporting", "Basic content calendar"],
      },
      {
        name: "Growth Engine",
        price: "$4,200",
        unit: "/ month",
        description: "Full-funnel marketing across paid, organic and content.",
        features: [
          "Paid + organic + content",
          "Weekly optimization",
          "Landing page testing",
          "Dedicated strategist",
        ],
        featured: true,
      },
      {
        name: "Scale",
        price: "Custom",
        unit: "quote",
        description: "Multi-market or multi-brand always-on retainers.",
        features: ["Multi-channel, multi-market", "Custom attribution setup", "Embedded team"],
      },
    ],
  },
  {
    slug: "graphics",
    label: "Graphic Design",
    tiers: [
      {
        name: "Essentials",
        price: "$1,200",
        unit: "one-time",
        description: "A clean logo and starter brand kit.",
        features: ["Logo suite", "Color & type system", "Basic brand guide"],
      },
      {
        name: "Full Identity",
        price: "$3,800",
        unit: "one-time",
        description: "A complete, documented brand system.",
        features: [
          "Full identity system",
          "60+ page brand guidelines",
          "Social & marketing templates",
          "Packaging or print-ready files",
        ],
        featured: true,
      },
      {
        name: "Brand Partner",
        price: "$1,800",
        unit: "/ month",
        description: "Ongoing design support as an extension of your team.",
        features: ["Unlimited design requests", "Motion graphics on request", "Dedicated designer"],
      },
    ],
  },
];
