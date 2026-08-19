import {
  Globe,
  ShoppingBag,
  Code2,
  Palette,
  Sparkles,
  Bot,
  type LucideIcon,
} from "lucide-react";

export type ExpertiseItem = {
  label: string;
  icon: LucideIcon;
  href: string;
};

export const EXPERTISE: ExpertiseItem[] = [
  { label: "Shopify Plus & Liquid", icon: ShoppingBag, href: "/work/web" },
  { label: "Web Applications", icon: Globe, href: "/work/app" },
  { label: "AI Prompting & LLMs", icon: Bot, href: "/about" },
  { label: "Next.js & React", icon: Code2, href: "/work/web" },
  { label: "UI / UX & Frontend", icon: Palette, href: "/work/web" },
  { label: "Speed Optimization", icon: Sparkles, href: "/work/web" },
];
