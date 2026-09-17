export type TechTag = {
  name: string;
  icon: string;
};

export type Service = {
  index: string;
  title: string;
  subtitle?: string;
  description: string;
  primaryIcon?: string;
  points: string[];
  techTags?: TechTag[];
};

export const SERVICES: Service[] = [
  {
    index: "01",
    title: "Shopify & E-Commerce",
    subtitle: "Liquid & Headless Storefronts",
    description:
      "Custom Shopify Liquid theme development, headless storefronts, speed optimization, and high-converting checkout flows built for scale.",
    primaryIcon: "shopify",
    points: ["Custom Shopify Themes", "Liquid Architecture", "Store Speed Optimization", "Multi-Currency & Apps"],
    techTags: [
      { name: "Shopify Plus", icon: "shopify" },
      { name: "Liquid Themes", icon: "liquid" },
      { name: "HTML5", icon: "html5" },
      { name: "CSS3", icon: "css3" },
      { name: "JavaScript", icon: "javascript" },
      { name: "Sub-1s Speed", icon: "speed" },
    ],
  },
  {
    index: "02",
    title: "Web Applications",
    subtitle: "Fullstack Modern Engineering",
    description:
      "Modern, responsive full-stack web applications and interactive platforms built with Next.js, React, TailwindCSS, and fluid motion.",
    primaryIcon: "web",
    points: ["Next.js & React Apps", "Interactive Dashboards", "Progressive Web Apps", "API & Database Sync"],
    techTags: [
      { name: "Next.js", icon: "nextjs" },
      { name: "React", icon: "react" },
      { name: "TypeScript", icon: "typescript" },
      { name: "Tailwind CSS", icon: "tailwind" },
      { name: "Node.js APIs", icon: "nodejs" },
    ],
  },
  {
    index: "03",
    title: "AI Prompting & Workflows",
    subtitle: "LLM & Generative Automation",
    description:
      "Leveraging generative AI, prompt engineering, and intelligent automation to accelerate web development, rapid prototyping, and smart features.",
    primaryIcon: "ai",
    points: ["AI Prompt Engineering", "LLM Integration", "Rapid Code Prototyping", "AI-Powered Features"],
    techTags: [
      { name: "ChatGPT / OpenAI", icon: "openai" },
      { name: "Claude 3.5 Sonnet", icon: "claude" },
      { name: "Prompt Engineering", icon: "openai" },
      { name: "Python Workflows", icon: "python" },
    ],
  },
  {
    index: "04",
    title: "UI/UX & Frontend Optimization",
    subtitle: "Design Systems & Performance",
    description:
      "Pixel-perfect responsive design, sub-second load speeds, Core Web Vitals optimization, and conversion-focused customer experiences.",
    primaryIcon: "uiux",
    points: ["Responsive Mobile UI", "Core Web Vitals", "Canva & UI Assets", "Conversion Optimization"],
    techTags: [
      { name: "Figma to Code", icon: "figma" },
      { name: "HTML5 Semantic", icon: "html5" },
      { name: "Modern CSS3", icon: "css3" },
      { name: "Core Web Vitals (95+)", icon: "speed" },
      { name: "Tailwind Motion", icon: "tailwind" },
    ],
  },
];
