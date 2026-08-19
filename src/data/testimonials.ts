export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  company: string;
  country: string;
  rating: number;
  color: string;
  projectTag: string;
};

export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "Vikash transformed our Shopify storefront and custom color shade visualizer. Our mobile conversion rate jumped by 45% and the luxury shopping experience is unmatched.",
    name: "Alexandre Laurent",
    role: "Brand Director",
    company: "Flâneur Global",
    country: "India & Global",
    rating: 5,
    color: "#0a0a0a",
    projectTag: "Shopify Plus & Custom Configurator",
  },
  {
    quote:
      "The bespoke editorial theme Vikash built for Maison Nagi loads in under 0.6 seconds. His mastery of Shopify Liquid, speed optimization, and high-fashion aesthetics is world-class.",
    name: "Elena Rostova",
    role: "Creative Director",
    company: "Maison Nagi",
    country: "United States",
    rating: 5,
    color: "#e10600",
    projectTag: "Luxury E-Commerce",
  },
  {
    quote:
      "Our European clean-tech web platform required multi-lingual routing and interactive solar calculation algorithms. Vikash delivered flawlessly with a 99/100 Lighthouse score.",
    name: "Markus Gruber",
    role: "Technical Operations",
    company: "Solax24 Energy",
    country: "Austria / Europe",
    rating: 5,
    color: "#1a1a1a",
    projectTag: "Next.js Web Platform",
  },
  {
    quote:
      "Our direct-to-consumer wellness subscription funnel converted 42% on launch week. Vikash integrated Recharge subscriptions and custom cart upsells seamlessly.",
    name: "Oliver Sterling",
    role: "Co-Founder & CEO",
    company: "The One Pill UK",
    country: "United Kingdom",
    rating: 5,
    color: "#0a0a0a",
    projectTag: "DTC Subscription Engine",
  },
  {
    quote:
      "The custom B2B team portal and password-gated storefront Vikash built saved our team hundreds of hours in custom apparel order processing. Fast, reliable, and sharp execution.",
    name: "David Vance",
    role: "Managing Director",
    company: "PTA Custom",
    country: "United States",
    rating: 5,
    color: "#e10600",
    projectTag: "Shopify B2B Portal",
  },
  {
    quote:
      "Exceptional attention to security and luxury polish on our fine jewellery store. The dynamic pricing sync and mobile layout gave our buyers immense trust.",
    name: "Siddharth Mehta",
    role: "Head of E-Commerce",
    company: "Hallmark Gold",
    country: "US / Global",
    rating: 5,
    color: "#1a1a1a",
    projectTag: "Luxury Precious Metals",
  },
];
