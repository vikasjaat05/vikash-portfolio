"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShoppingBag,
  ExternalLink,
  Sparkles,
  ArrowUpRight,
  CheckCircle2,
  Zap,
  ShieldCheck,
  Package,
  Layers,
  Flame,
} from "lucide-react";
import { STORE_ITEMS, StoreItem } from "@/data/store-items";
import Reveal from "./Reveal";
import { TechBadge } from "./TechIcons";
import DualDevicePreviewModal from "./DualDevicePreviewModal";

export default function HomeStoreSection() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [previewItem, setPreviewItem] = useState<StoreItem | null>(null);

  const filteredItems = STORE_ITEMS.filter((item) => {
    if (selectedCategory === "all") return true;
    if (selectedCategory === "theme") return item.category === "theme" && item.id !== "lgpsm-fashion-portfolio";
    if (selectedCategory === "shopify") return item.category === "shopify";
    if (selectedCategory === "futuristic") return item.id === "lgpsm-fashion-portfolio";
    return true;
  });

  return (
    <section id="store" className="relative py-24 md:py-32 px-6 md:px-10 bg-[#faf8f5] border-t border-b border-black/[0.08] overflow-hidden select-none">
      {/* Ambient background glow */}
      <div className="absolute top-0 right-1/4 w-[40vw] h-[40vw] bg-red/5 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[35vw] h-[35vw] bg-black/[0.02] blur-[110px] rounded-full pointer-events-none" />

      <div className="max-w-[1400px] mx-auto relative z-10">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-14 md:mb-16">
          <div className="max-w-2xl">
            <Reveal>
              <div className="flex items-center gap-3 mb-5">
                <span className="w-2.5 h-2.5 rounded-full bg-red animate-pulse" />
                <span className="text-xs font-semibold uppercase tracking-widest text-black/50">
                  Digital Products &amp; Store
                </span>
              </div>
            </Reveal>

            <Reveal delay={0.05}>
              <h2 className="font-display font-extrabold text-3xl sm:text-5xl lg:text-6xl leading-[1.06] tracking-tight text-black">
                Production-ready code. <span className="text-red">Instant deployment.</span>
              </h2>
            </Reveal>

            <Reveal delay={0.1}>
              <p className="text-black/70 text-base sm:text-lg leading-relaxed mt-4">
                Acquire battle-tested portfolio themes, custom Shopify Liquid storefronts, and full-stack source code built for sub-second speeds and perpetual commercial use.
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.15}>
            <Link
              href="/buy-portfolio"
              data-cursor-hover
              className="inline-flex items-center gap-2 group text-sm font-bold text-black hover:text-red transition-colors pb-1 border-b-2 border-black hover:border-red"
            >
              <span>Explore All 5 Products &amp; Licenses</span>
              <ArrowUpRight size={16} className="group-hover:rotate-45 transition-transform duration-300" />
            </Link>
          </Reveal>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center gap-2.5 mb-10">
          {[
            { id: "all", label: "All Products (5)" },
            { id: "theme", label: "Portfolio Themes (3)" },
            { id: "shopify", label: "Shopify Storefronts (1)" },
            { id: "futuristic", label: "Futuristic & Canvas (1)" },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-all duration-300 cursor-pointer ${
                selectedCategory === cat.id
                  ? "bg-black text-white shadow-sm"
                  : "bg-white text-black/70 border border-black/10 hover:border-black/30 hover:text-black"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, index) => (
              <ProductCard
                key={item.id}
                item={item}
                index={index}
                onPreview={() => setPreviewItem(item)}
              />
            ))}
          </AnimatePresence>
        </div>

        {/* Bottom Trust Assurance Bar */}
        <div className="mt-16 sm:mt-20 pt-10 border-t border-black/[0.08] grid grid-cols-1 sm:grid-cols-3 gap-6 text-center sm:text-left">
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-2xl bg-red/10 text-red flex items-center justify-center shrink-0">
              <Zap size={18} />
            </div>
            <div>
              <h4 className="font-display text-sm font-bold text-black">Sub-Second Speed</h4>
              <p className="text-xs text-black/60 leading-relaxed mt-0.5">
                Engineered for 95+ Core Web Vitals and instant page load speeds.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-2xl bg-red/10 text-red flex items-center justify-center shrink-0">
              <ShieldCheck size={18} />
            </div>
            <div>
              <h4 className="font-display text-sm font-bold text-black">Commercial License</h4>
              <p className="text-xs text-black/60 leading-relaxed mt-0.5">
                Perpetual license for personal, freelance, and client project deployments.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-2xl bg-red/10 text-red flex items-center justify-center shrink-0">
              <Package size={18} />
            </div>
            <div>
              <h4 className="font-display text-sm font-bold text-black">Instant GitHub Access</h4>
              <p className="text-xs text-black/60 leading-relaxed mt-0.5">
                Full production source code repository access delivered immediately.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Dual Device Preview Modal */}
      {previewItem && (
        <DualDevicePreviewModal
          item={previewItem}
          onClose={() => setPreviewItem(null)}
          onAddToCart={() => {
            window.location.href = `/buy-portfolio?item=${previewItem.id}`;
          }}
          onBuyNow={() => {
            window.location.href = `/buy-portfolio?item=${previewItem.id}`;
          }}
          formatPrice={(usd, inr) => `${inr ?? "₹1,999"} (${usd})`}
          isAdded={false}
        />
      )}
    </section>
  );
}

function ProductCard({
  item,
  index,
  onPreview,
}: {
  item: StoreItem;
  index: number;
  onPreview: () => void;
}) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.5, delay: index * 0.06 }}
      className="group relative flex flex-col justify-between rounded-3xl bg-white border border-black/10 overflow-hidden shadow-xs hover:shadow-xl hover:border-black/20 transition-all duration-500"
    >
      <div>
        {/* Product Image Container */}
        <div className="relative aspect-[16/10] bg-neutral-100 overflow-hidden border-b border-black/[0.08]">
          <Image
            src={item.image}
            alt={item.title}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
            className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Badges Overlaid on Image */}
          <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
            {item.badge ? (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono font-bold tracking-wide uppercase bg-black/80 text-white backdrop-blur-md shadow-xs border border-white/20">
                {item.popular ? <Flame size={12} className="text-red" /> : <Sparkles size={12} className="text-red" />}
                <span>{item.badge}</span>
              </span>
            ) : (
              <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-mono font-semibold uppercase bg-white/90 text-black backdrop-blur-md">
                {item.categoryLabel}
              </span>
            )}

            {/* Price Badge */}
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-mono font-extrabold bg-white/95 text-black backdrop-blur-md shadow-xs border border-black/10">
              <span>{item.priceInr}</span>
              <span className="text-black/50 font-normal">({item.priceUsd})</span>
            </span>
          </div>

          {/* Quick Preview Hover Action Button */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onPreview();
              }}
              className="pointer-events-auto inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/95 backdrop-blur-md text-xs font-bold text-black shadow-lg hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
            >
              <span>Live Preview</span>
              <ExternalLink size={13} className="text-red" />
            </button>
          </div>
        </div>

        {/* Product Details */}
        <div className="p-5 sm:p-6 flex flex-col gap-3.5">
          <div>
            <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-red">
              {item.categoryLabel}
            </span>
            <h3 className="font-display text-lg sm:text-xl font-bold text-black mt-1 leading-snug group-hover:text-red transition-colors duration-300">
              {item.title}
            </h3>
            <p className="text-xs sm:text-sm text-black/65 mt-2 line-clamp-2 leading-relaxed">
              {item.tagline}
            </p>
          </div>

          {/* Tech Stack Pills */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            {item.techStack.slice(0, 4).map((tech) => (
              <span
                key={tech}
                className="text-[10px] font-mono font-medium px-2.5 py-1 rounded-md bg-neutral-100 text-black/75 border border-black/[0.06]"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Bullet Highlights */}
          <ul className="flex flex-col gap-1.5 pt-2 border-t border-black/[0.06]">
            {item.features.slice(0, 2).map((feature) => (
              <li key={feature} className="flex items-start gap-2 text-xs text-black/75">
                <CheckCircle2 size={13} className="text-red shrink-0 mt-0.5" />
                <span className="line-clamp-1">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Card Action Footer */}
      <div className="px-5 pb-5 sm:px-6 sm:pb-6 pt-2 flex items-center gap-2.5 border-t border-black/[0.06]">
        {item.liveDemoUrl && (
          <a
            href={item.liveDemoUrl}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor-hover
            className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl border border-black/15 bg-white text-xs font-semibold text-black hover:bg-neutral-50 transition-colors"
          >
            <span>Live Demo</span>
            <ExternalLink size={12} className="text-black/60" />
          </a>
        )}

        <Link
          href={`/buy-portfolio?item=${item.id}`}
          data-cursor-hover
          className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-black text-white hover:bg-red text-xs font-semibold transition-colors duration-300 shadow-xs"
        >
          <ShoppingBag size={13} />
          <span>Get Code</span>
        </Link>
      </div>
    </motion.div>
  );
}
