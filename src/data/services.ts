export type Service = {
  index: string;
  title: string;
  description: string;
  points: string[];
};

export const SERVICES: Service[] = [
  {
    index: "01",
    title: "Shopify & E-Commerce",
    description:
      "Custom Shopify Liquid theme development, headless storefronts, speed optimization, and high-converting checkout flows built for scale.",
    points: ["Custom Shopify Themes", "Liquid Architecture", "Store Speed Optimization", "Multi-Currency & Apps"],
  },
  {
    index: "02",
    title: "Web Applications",
    description:
      "Modern, responsive full-stack web applications and interactive platforms built with Next.js, React, TailwindCSS, and fluid motion.",
    points: ["Next.js & React Apps", "Interactive Dashboards", "Progressive Web Apps", "API & Database Sync"],
  },
  {
    index: "03",
    title: "AI Prompting & Workflows",
    description:
      "Leveraging generative AI, prompt engineering, and intelligent automation to accelerate web development, rapid prototyping, and smart features.",
    points: ["AI Prompt Engineering", "LLM Integration", "Rapid Code Prototyping", "AI-Powered Features"],
  },
  {
    index: "04",
    title: "UI/UX & Frontend Optimization",
    description:
      "Pixel-perfect responsive design, sub-second load speeds, Core Web Vitals optimization, and conversion-focused customer experiences.",
    points: ["Responsive Mobile UI", "Core Web Vitals", "Canva & UI Assets", "Conversion Optimization"],
  },
];
