"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Article } from "@/data/journal";
import { useInViewHover } from "./useInViewHover";

export default function ArticleRow({ article }: { article: Article }) {
  const { ref, inView } = useInViewHover<HTMLAnchorElement>();

  return (
    <Link
      ref={ref}
      data-inview={inView}
      href={`/journal/${article.slug}`}
      data-cursor-hover
      className="group flex flex-col md:flex-row md:items-center gap-4 md:gap-8 py-8 md:py-10"
    >
      <span className="text-xs font-semibold uppercase tracking-widest text-red md:w-40 flex-shrink-0">
        {article.category}
      </span>
      <div className="flex-1">
        <h3 className="font-display text-xl md:text-2xl font-bold transition-colors duration-300 group-hover:text-red group-data-[inview=true]:text-red mb-2">
          {article.title}
        </h3>
        <p className="text-black/60 text-sm leading-relaxed max-w-lg">{article.excerpt}</p>
      </div>
      <div className="flex items-center gap-4 md:flex-col md:items-end flex-shrink-0">
        <span className="text-xs text-black/40">{article.readTime}</span>
        <div className="w-10 h-10 rounded-full border border-black/15 flex items-center justify-center transition-colors duration-300 group-hover:bg-red group-hover:border-red group-data-[inview=true]:bg-red group-data-[inview=true]:border-red">
          <ArrowUpRight
            size={16}
            className="text-black/60 transition-all duration-300 group-hover:text-white group-hover:rotate-45 group-data-[inview=true]:text-white group-data-[inview=true]:rotate-45"
          />
        </div>
      </div>
    </Link>
  );
}
