"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Code2, Smartphone, Palette, TrendingUp } from "lucide-react";
import { WORK_CATEGORIES } from "@/data/portfolio";
import { useInViewHover } from "./useInViewHover";

const ICONS: Record<string, typeof Code2> = {
  web: Code2,
  app: Smartphone,
  graphics: Palette,
  marketing: TrendingUp,
};

export default function WorkCategoryGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
      {WORK_CATEGORIES.map((cat, i) => (
        <CategoryCard key={cat.slug} cat={cat} index={i} />
      ))}
    </div>
  );
}

function CategoryCard({
  cat,
  index,
}: {
  cat: (typeof WORK_CATEGORIES)[number];
  index: number;
}) {
  const Icon = ICONS[cat.slug] ?? Code2;
  const { ref, inView } = useInViewHover<HTMLAnchorElement>();

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
    >
      <Link
        ref={ref}
        data-inview={inView}
        href={`/work/${cat.slug}`}
        data-cursor-hover
        className="group relative block rounded-2xl md:rounded-3xl bg-[#f0ebe2] border border-black/[0.06] p-8 md:p-10 min-h-[260px] overflow-hidden"
      >
        <div className="absolute inset-0 bg-red translate-y-full transition-transform duration-500 ease-[cubic-bezier(0.65,0,0.35,1)] group-hover:translate-y-0 group-data-[inview=true]:translate-y-0" />

        <div className="relative z-10 flex flex-col justify-between h-full">
          <div className="flex items-center justify-between">
            <div className="w-14 h-14 rounded-full bg-black/5 transition-colors duration-500 group-hover:bg-white/15 group-data-[inview=true]:bg-white/15 flex items-center justify-center">
              <Icon
                size={24}
                className="text-black/70 transition-colors duration-500 group-hover:text-white group-data-[inview=true]:text-white"
              />
            </div>
            <div className="w-11 h-11 rounded-full border border-black/15 transition-colors duration-400 group-hover:border-white/30 group-hover:bg-white group-data-[inview=true]:border-white/30 group-data-[inview=true]:bg-white flex items-center justify-center">
              <ArrowUpRight
                size={18}
                className="text-black/60 transition-all duration-400 group-hover:text-red group-hover:rotate-45 group-data-[inview=true]:text-red group-data-[inview=true]:rotate-45"
              />
            </div>
          </div>

          <div className="mt-10">
            <span className="text-xs font-semibold uppercase tracking-widest text-black/50 transition-colors duration-500 group-hover:text-white/60 group-data-[inview=true]:text-white/60 mb-2 block">
              {cat.tagline}
            </span>
            <h3 className="font-display text-2xl md:text-4xl font-bold text-black transition-colors duration-500 group-hover:text-white group-data-[inview=true]:text-white">
              {cat.label}
            </h3>
            <p className="text-black/60 transition-colors duration-500 group-hover:text-white/80 group-data-[inview=true]:text-white/80 text-sm mt-3 max-w-sm leading-relaxed">
              {cat.description}
            </p>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
