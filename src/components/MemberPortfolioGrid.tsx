"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { MemberProject } from "@/lib/project-data";
import { useInViewHover } from "./useInViewHover";

const PALETTE = ["#e10600", "#f4f4f4"];

export default function MemberPortfolioGrid({
  items,
  memberSlug,
}: {
  items: MemberProject[];
  memberSlug: string;
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
      {items.map((item, i) => (
        <MemberPortfolioCard key={item.id} item={item} index={i} memberSlug={memberSlug} />
      ))}
    </div>
  );
}

function MemberPortfolioCard({
  item,
  index,
  memberSlug,
}: {
  item: MemberProject;
  index: number;
  memberSlug: string;
}) {
  const color = PALETTE[index % PALETTE.length];
  const isLight = color !== "#e10600";
  const { ref, inView } = useInViewHover<HTMLAnchorElement>();

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: (index % 4) * 0.08, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -6 }}
      animate={inView ? { y: -6 } : undefined}
    >
      <Link
        ref={ref}
        data-inview={inView}
        href={`/about/${memberSlug}/work/${item.slug}`}
        data-cursor-hover
        className={`group relative rounded-2xl md:rounded-3xl overflow-hidden p-7 md:p-9 flex flex-col justify-between min-h-[280px] transition-shadow duration-300 hover:shadow-2xl data-[inview=true]:shadow-2xl block h-full ${
          isLight ? "border border-black/[0.06]" : ""
        }`}
        style={{ background: item.imageUrl ? undefined : color }}
      >
        {item.imageUrl && (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={item.imageUrl}
              alt={item.title}
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-black/0" />
          </>
        )}

        <div className="relative z-10 flex items-center justify-between">
          {item.hasDraft && (
            <span className="text-xs font-semibold uppercase tracking-widest px-2.5 py-1 rounded-full bg-red text-white">
              Draft
            </span>
          )}
          <div
            className={`ml-auto w-11 h-11 rounded-full backdrop-blur flex items-center justify-center transition-colors duration-400 ${
              isLight && !item.imageUrl
                ? "bg-black/5 group-hover:bg-red group-data-[inview=true]:bg-red"
                : "bg-white/10 group-hover:bg-white group-data-[inview=true]:bg-white"
            }`}
          >
            <ArrowUpRight
              size={18}
              className={`transition-all duration-400 group-hover:rotate-45 group-data-[inview=true]:rotate-45 ${
                isLight && !item.imageUrl
                  ? "text-black/60 group-hover:text-white group-data-[inview=true]:text-white"
                  : "text-white group-hover:text-red group-data-[inview=true]:text-red"
              }`}
            />
          </div>
        </div>

        <div className="relative z-10">
          <h3
            className={`font-display text-2xl md:text-3xl font-bold leading-tight mb-3 ${
              isLight && !item.imageUrl ? "text-black" : "text-white"
            }`}
          >
            {item.title}
          </h3>
          <p
            className={`text-sm leading-relaxed max-w-sm ${
              isLight && !item.imageUrl ? "text-black/60" : "text-white/80"
            }`}
          >
            {item.description}
          </p>
        </div>
      </Link>
    </motion.div>
  );
}
