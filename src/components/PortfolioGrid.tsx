"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight, ExternalLink, KeyRound, Sparkles } from "lucide-react";
import { PortfolioItem } from "@/data/portfolio";
import { useInViewHover } from "./useInViewHover";

export default function PortfolioGrid({
  items,
  categorySlug,
}: {
  items: PortfolioItem[];
  categorySlug: string;
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
      {items.map((item, i) => (
        <PortfolioCard key={item.slug} item={item} index={i} categorySlug={categorySlug} />
      ))}
    </div>
  );
}

function PortfolioCard({
  item,
  index,
  categorySlug,
}: {
  item: PortfolioItem;
  index: number;
  categorySlug: string;
}) {
  const { ref, inView } = useInViewHover<HTMLDivElement>();

  return (
    <motion.div
      ref={ref}
      data-inview={inView}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: (index % 4) * 0.08, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -6 }}
      animate={inView ? { y: -6 } : undefined}
      className="group rounded-3xl overflow-hidden border border-black/[0.08] bg-white flex flex-col justify-between transition-all duration-300 hover:shadow-2xl hover:border-red/30 data-[inview=true]:shadow-2xl"
    >
      {/* Project Thumbnail Image */}
      <div className="relative w-full aspect-[16/10] overflow-hidden bg-[#121212]">
        {item.imageUrl ? (
          <Image
            src={item.imageUrl}
            alt={item.title}
            fill
            className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105 group-data-[inview=true]:scale-105"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center p-8 bg-gradient-to-br from-neutral-900 to-neutral-800 text-white">
            <span className="font-display text-2xl font-bold">{item.title}</span>
          </div>
        )}

        {/* Status badges */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none gap-2">
          <div className="flex flex-wrap items-center gap-2">
            {item.isWip && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-red text-white shadow-lg backdrop-blur">
                <Sparkles size={13} />
                In Active Development
              </span>
            )}
            {item.password && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-black/80 text-white border border-white/20 shadow-lg backdrop-blur">
                <KeyRound size={13} className="text-yellow-400" />
                Password: {item.password}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Content Body */}
      <div className="p-7 md:p-8 flex flex-col justify-between flex-grow">
        <div>
          <div className="flex items-center justify-between gap-4 mb-2">
            <span className="text-xs font-semibold uppercase tracking-widest text-black/50">
              {item.client}
            </span>
          </div>

          <h3 className="font-display text-2xl md:text-3xl font-bold leading-tight mb-3 text-black group-hover:text-red transition-colors duration-200">
            {item.title}
          </h3>

          <p className="text-sm text-black/60 leading-relaxed mb-6">
            {item.description}
          </p>

          <div className="flex flex-wrap gap-2 mb-6">
            {item.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs font-medium px-3 py-1 rounded-full border border-black/10 bg-[#f7f5f0] text-black/70"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Actions bar */}
        <div className="pt-4 border-t border-black/10 flex items-center justify-between gap-3">
          <Link
            href={`/work/${categorySlug}/${item.slug}`}
            data-cursor-hover
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-black hover:text-red transition-colors underline-swipe"
          >
            <span>Case Study Details</span>
            <ArrowUpRight size={16} />
          </Link>

          {item.liveUrl && (
            <a
              href={item.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor-hover
              className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider px-4 py-2 rounded-full bg-[#0a0a0a] text-white hover:bg-red transition-colors shadow-2xs"
            >
              <span>Live Website</span>
              <ExternalLink size={13} />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}
