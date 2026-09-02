"use client";

import { motion } from "framer-motion";
import { Sparkles, ShoppingBag, ShieldCheck, Zap, ArrowDown, Search } from "lucide-react";
import AnimatedHeading from "./AnimatedHeading";

type HeroProps = {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  currency: "USD" | "INR";
  onCurrencyChange: (c: "USD" | "INR") => void;
  totalItems: number;
};

export default function BuyPortfolioHero({
  searchQuery,
  onSearchChange,
  currency,
  onCurrencyChange,
  totalItems,
}: HeroProps) {
  return (
    <section className="relative overflow-hidden bg-[#faf8f5] pt-32 sm:pt-36 pb-16 px-4 sm:px-6 md:px-12 border-b border-black/[0.06]">
      {/* Subtle Ambient Background Gradients */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[800px] h-[450px] bg-gradient-to-b from-red/10 via-amber-500/5 to-transparent blur-[120px] rounded-full" />
        <div className="absolute top-1/2 right-[-100px] w-96 h-96 bg-black/[0.02] blur-[100px] rounded-full" />
        
        {/* Subtle dot pattern */}
        <div
          className="absolute inset-0 opacity-[0.4]"
          style={{
            backgroundImage: `radial-gradient(rgba(0, 0, 0, 0.08) 1px, transparent 1px)`,
            backgroundSize: "24px 24px",
          }}
        />
      </div>

      <div className="relative z-10 max-w-[1280px] mx-auto text-center flex flex-col items-center">
        {/* Top Release Badge */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-black/[0.08] shadow-2xs mb-6 text-xs sm:text-sm text-black/80"
        >
          <span className="flex h-2 w-2 rounded-full bg-red animate-pulse" />
          <span className="font-mono uppercase tracking-widest text-[11px] sm:text-xs text-black/60">
            Digital Store &amp; Showcase
          </span>
          <span className="text-black/20">|</span>
          <span className="inline-flex items-center gap-1 font-semibold text-black/90">
            <Sparkles size={13} className="text-red" />
            Themes, Designs &amp; Kits
          </span>
        </motion.div>

        {/* Main Title */}
        <AnimatedHeading
          mode="load"
          delay={0.1}
          className="font-display text-4xl sm:text-6xl md:text-7xl font-extrabold text-[#0a0a0a] tracking-tight leading-[1.08] max-w-4xl mb-6"
        >
          Buy Portfolio Themes, <br className="hidden sm:inline" />
          Designs &amp;{" "}
          <span
            className="text-red italic font-serif"
            style={{ fontFamily: "'Instrument Serif', serif" }}
          >
            Digital Assets.
          </span>
        </AnimatedHeading>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="text-black/60 text-base sm:text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-10 px-4"
        >
          Explore production-ready Next.js portfolio themes, Shopify storefronts,
          Figma UI design kits, and web components created and maintained by Vikash Choudhary.
        </motion.p>

        {/* Search & Currency Control Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="w-full max-w-2xl flex flex-col sm:flex-row items-center gap-3 p-2 sm:p-2.5 rounded-2xl sm:rounded-full bg-white border border-black/[0.08] shadow-[0_8px_30px_rgba(0,0,0,0.06)] mb-10"
        >
          {/* Search Input */}
          <div className="flex-1 flex items-center gap-2.5 px-3.5 w-full">
            <Search size={18} className="text-black/40 shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search portfolio themes, Figma designs, Shopify..."
              className="w-full bg-transparent text-sm sm:text-base text-[#0a0a0a] placeholder:text-black/40 outline-none font-medium"
            />
          </div>

          {/* Currency Toggle */}
          <div className="flex items-center p-1 rounded-full bg-black/[0.04] border border-black/[0.06] shrink-0 self-end sm:self-auto">
            <button
              type="button"
              onClick={() => onCurrencyChange("USD")}
              data-cursor-hover
              className={`px-3.5 py-1 rounded-full text-xs font-semibold tracking-wider transition-all ${
                currency === "USD"
                  ? "bg-white text-black shadow-xs"
                  : "text-black/60 hover:text-black"
              }`}
            >
              USD ($)
            </button>
            <button
              type="button"
              onClick={() => onCurrencyChange("INR")}
              data-cursor-hover
              className={`px-3.5 py-1 rounded-full text-xs font-semibold tracking-wider transition-all ${
                currency === "INR"
                  ? "bg-red text-white shadow-xs"
                  : "text-black/60 hover:text-black"
              }`}
            >
              INR (₹)
            </button>
          </div>
        </motion.div>

        {/* Quick Highlights Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs font-mono text-black/60"
        >
          <div className="flex items-center gap-2">
            <Zap size={14} className="text-red" />
            <span>Instant Digital Delivery</span>
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck size={14} className="text-emerald-600" />
            <span>100% Commercial Rights</span>
          </div>
          <div className="flex items-center gap-2">
            <ShoppingBag size={14} className="text-amber-600" />
            <span>{totalItems} Available Products</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
