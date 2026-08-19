export type FAQItem = {
  question: string;
  answer: string;
  category?: string;
};

export const FAQS: FAQItem[] = [
  {
    question: "What core services do you provide?",
    answer:
      "I specialize in custom Shopify theme development, Shopify Liquid coding, headless commerce setups, Next.js & React web applications, conversion rate optimization (CRO), and Core Web Vitals speed optimization.",
    category: "Services",
  },
  {
    question: "Do you work with international clients across different time zones?",
    answer:
      "Yes. Most of my client projects are based in the United States, United Kingdom, and Europe (such as Maison Nagi, The One Pill, Solax24, PTA Custom). I ensure smooth asynchronous communication with daily updates via Slack, WhatsApp, and email.",
    category: "Collaboration",
  },
  {
    question: "Can you build custom Shopify Liquid sections without slow apps?",
    answer:
      "Absolutely. I believe in clean, bespoke Liquid coding with minimal third-party apps to keep stores lightweight, fast-loading, and secure. Everything from custom bundle builders and color swatches to interactive cart drawers can be coded natively.",
    category: "Shopify",
  },
  {
    question: "How fast can you deliver a typical project?",
    answer:
      "A tailored Shopify theme or landing page build typically takes 2–3 weeks. Larger custom platforms or multi-feature web apps usually take 4–6 weeks. I provide a clear milestone breakdown before starting.",
    category: "Timeline",
  },
  {
    question: "Do you offer post-launch support and ongoing optimization?",
    answer:
      "Yes. After launching, I provide continuous support retainers covering new promotional sections, conversion improvements, speed maintenance, and catalog management.",
    category: "Support",
  },
  {
    question: "What is your process to start a new project?",
    answer:
      "You can send an inquiry via the Contact page or email me directly at vikkijaat800@gmail.com (or WhatsApp at +91 8000165311). We'll review your goals and wireframes, agree on scope, and begin development with real-time preview links.",
    category: "Getting Started",
  },
];
