"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, ArrowUpRight, Search, KeyRound, Sparkles, CheckCircle2 } from "lucide-react";
import { WORK_CATEGORIES, PortfolioItem } from "@/data/portfolio";
import { useInViewHover } from "./useInViewHover";

const FILTER_TABS = [
  { id: "all", label: "All Projects" },
  { id: "shopify", label: "Shopify & E-Commerce" },
  { id: "web", label: "Web Platforms & Next.js" },
  { id: "app", label: "Web Apps & Audio" },
];

export default function WorkProjectGallery() {
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Flatten all projects
  const allProjects = useMemo(() => {
    const list: (PortfolioItem & { categorySlug: string })[] = [];
    for (const cat of WORK_CATEGORIES) {
      for (const item of cat.items) {
        list.push({ ...item, categorySlug: cat.slug });
      }
    }
    return list;
  }, []);

  // Filter projects by active tab and search query
  const filteredProjects = useMemo(() => {
    return allProjects.filter((item) => {
      // Tab filter
      if (activeTab === "shopify") {
        const isShopify =
          item.tags.some((t) => t.toLowerCase().includes("shopify") || t.toLowerCase().includes("e-commerce")) ||
          item.liveUrl?.includes("shopify.com");
        if (!isShopify) return false;
      } else if (activeTab === "web") {
        const isWeb =
          item.tags.some((t) => t.toLowerCase().includes("next.js") || t.toLowerCase().includes("react") || t.toLowerCase().includes("web platform") || t.toLowerCase().includes("cleantech"));
        if (!isWeb) return false;
      } else if (activeTab === "app") {
        const isApp = item.categorySlug === "app" || item.tags.some((t) => t.toLowerCase().includes("app") || t.toLowerCase().includes("audio"));
        if (!isApp) return false;
      }

      // Search query filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = item.title.toLowerCase().includes(q);
        const matchesClient = item.client.toLowerCase().includes(q);
        const matchesDesc = item.description.toLowerCase().includes(q);
        const matchesTags = item.tags.some((t) => t.toLowerCase().includes(q));
        if (!matchesTitle && !matchesClient && !matchesDesc && !matchesTags) return false;
      }

      return true;
    });
  }, [allProjects, activeTab, searchQuery]);

  return (
    <section id="gallery" className="relative py-16 md:py-24 px-6 md:px-10">
      <div className="max-w-[1400px] mx-auto">
        {/* Section Header & Controls */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12 md:mb-16">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="w-2.5 h-2.5 rounded-full bg-red" />
              <span className="text-xs font-semibold uppercase tracking-widest text-black/50">
                Selected Portfolio
              </span>
            </div>
            <h2 className="font-display font-extrabold text-3xl sm:text-5xl md:text-6xl leading-[1.05] tracking-tight">
              Crafted with <span className="text-red">precision.</span>
            </h2>
          </div>

          {/* Search bar */}
          <div className="relative max-w-md w-full">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-black/40 pointer-events-none"
            />
            <input
              type="text"
              placeholder="Search by brand, tech (Shopify, Next.js)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3.5 rounded-full bg-white border border-black/15 text-sm text-black placeholder:text-black/40 focus:outline-none focus:border-red transition-colors shadow-2xs"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-black/40 hover:text-black"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-12 border-b border-black/10 pb-6">
          {FILTER_TABS.map((tab) => {
            const count =
              tab.id === "all"
                ? allProjects.length
                : tab.id === "shopify"
                ? allProjects.filter((p) => p.tags.some((t) => t.toLowerCase().includes("shopify") || t.toLowerCase().includes("e-commerce")) || p.liveUrl?.includes("shopify.com")).length
                : tab.id === "web"
                ? allProjects.filter((p) => p.tags.some((t) => t.toLowerCase().includes("next.js") || t.toLowerCase().includes("react") || t.toLowerCase().includes("web platform") || t.toLowerCase().includes("cleantech"))).length
                : allProjects.filter((p) => p.categorySlug === "app" || p.tags.some((t) => t.toLowerCase().includes("app") || t.toLowerCase().includes("audio"))).length;

            const active = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                data-cursor-hover
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 ${
                  active
                    ? "bg-[#0a0a0a] text-white shadow-md"
                    : "bg-white text-black/70 hover:text-black border border-black/10 hover:border-black/30"
                }`}
              >
                <span>{tab.label}</span>
                <span
                  className={`text-[11px] px-2 py-0.5 rounded-full font-mono ${
                    active ? "bg-white/20 text-white" : "bg-black/5 text-black/50"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Project Grid Showcase */}
        {filteredProjects.length === 0 ? (
          <div className="py-20 text-center rounded-3xl bg-[#f5f1ea] border border-black/10">
            <p className="text-black/60 text-lg mb-4">No projects match your search.</p>
            <button
              onClick={() => {
                setSearchQuery("");
                setActiveTab("all");
              }}
              className="bg-black text-white px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-red transition-colors"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((item, index) => (
                <ProjectCard key={item.slug} item={item} index={index} />
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </section>
  );
}

function ProjectCard({
  item,
  index,
}: {
  item: PortfolioItem & { categorySlug: string };
  index: number;
}) {
  const { ref, inView } = useInViewHover<HTMLDivElement>();

  return (
    <motion.div
      layout
      ref={ref}
      data-inview={inView}
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.5, delay: Math.min(index * 0.05, 0.3) }}
      className="group rounded-3xl md:rounded-[2rem] border border-black/10 bg-white overflow-hidden flex flex-col justify-between shadow-xs hover:shadow-2xl hover:border-red/30 transition-all duration-400"
    >
      {/* Top Browser Chrome Bar */}
      <div className="px-5 py-3.5 bg-[#f5f3ef] border-b border-black/[0.08] flex items-center justify-between gap-3">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
        </div>

        {/* Clean domain display */}
        <div className="flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white border border-black/[0.08] text-[11px] text-black/60 font-mono max-w-[220px] sm:max-w-xs truncate">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
          <span className="truncate">
            {item.liveUrl ? item.liveUrl.replace(/^https?:\/\//, "").replace(/\/$/, "") : item.slug}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {item.isWip && (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-red text-white">
              <Sparkles size={11} />
              In Dev
            </span>
          )}
          {item.password && (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-[#0a0a0a] text-yellow-400 border border-black/10">
              <KeyRound size={11} />
              Pass: {item.password}
            </span>
          )}
        </div>
      </div>

      {/* Project Image Frame */}
      <Link
        href={`/work/${item.categorySlug}/${item.slug}`}
        data-cursor-hover
        className="relative aspect-[16/10] w-full overflow-hidden bg-[#141414] block"
      >
        {item.imageUrl ? (
          <Image
            src={item.imageUrl}
            alt={item.title}
            fill
            className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105 group-data-[inview=true]:scale-105"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center p-8 bg-neutral-900 text-white">
            <span className="font-display text-2xl font-bold">{item.title}</span>
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      </Link>

      {/* Project Content */}
      <div className="p-7 sm:p-8 flex flex-col justify-between flex-grow">
        <div>
          <div className="flex items-center justify-between gap-4 mb-2.5">
            <span className="text-xs font-semibold uppercase tracking-widest text-black/50">
              {item.client}
            </span>
          </div>

          <h3 className="font-display text-2xl sm:text-3xl font-bold text-black group-hover:text-red transition-colors duration-200 mb-3 leading-snug">
            <Link href={`/work/${item.categorySlug}/${item.slug}`} data-cursor-hover>
              {item.title}
            </Link>
          </h3>

          <p className="text-sm text-black/70 leading-relaxed mb-5">
            {item.description}
          </p>

          {/* Key Impact highlight pill if available */}
          {item.results && item.results[0] && (
            <div className="mb-5 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-emerald-50 border border-emerald-200 text-xs font-medium text-emerald-800">
              <CheckCircle2 size={14} className="text-emerald-600 flex-shrink-0" />
              <span>{item.results[0]}</span>
            </div>
          )}

          {/* Tech stack pills */}
          <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-6">
            {item.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs font-medium px-3 py-1 rounded-full border border-black/10 bg-[#f8f6f2] text-black/80"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-5 border-t border-black/10 flex flex-wrap items-center justify-between gap-3">
          <Link
            href={`/work/${item.categorySlug}/${item.slug}`}
            data-cursor-hover
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-black hover:text-red transition-colors underline-swipe"
          >
            <span>Read Case Study</span>
            <ArrowUpRight size={16} />
          </Link>

          {item.liveUrl && (
            <a
              href={item.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor-hover
              className="inline-flex items-center gap-2 bg-[#0a0a0a] text-white text-xs sm:text-sm font-semibold px-5 py-2.5 rounded-full hover:bg-red transition-colors shadow-xs"
            >
              <span>Visit Live Store</span>
              <ExternalLink size={14} />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}
