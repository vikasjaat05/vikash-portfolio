"use client";

import { motion } from "framer-motion";
import { Sparkles, Code2, ShieldCheck, Zap, ArrowUpRight, CheckCircle2, Crown, Globe2, Clock } from "lucide-react";

const REAL_CLIENTS = [
  { name: "Maison Nagi", location: "New York, USA", tag: "Luxury Fashion" },
  { name: "Solax24 GmbH", location: "Vienna, Austria", tag: "CleanTech SaaS" },
  { name: "Flâneur Global", location: "Global / India", tag: "High-AOV Commerce" },
  { name: "Qudrat Studio", location: "Bangalore, India", tag: "Bio-Innovations" },
  { name: "Sag Harborhamptons", location: "Hamptons, USA", tag: "DTC Lifestyle" },
];

export default function StoreValueSection() {
  return (
    <section id="why-us" className="relative bg-[#ffffff] py-20 sm:py-28 px-4 sm:px-6 md:px-12 border-t border-black/[0.06]">
      <div className="max-w-[1360px] mx-auto">
        {/* Editorial Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 mb-16 sm:mb-20 items-end">
          <div className="lg:col-span-4">
            <div className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-red mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-red animate-pulse" />
              <span>Digital Craftsmanship</span>
            </div>
            <h3 className="text-xs font-mono text-black/40 uppercase tracking-wider block">
              Architectural Standards
            </h3>
          </div>

          <div className="lg:col-span-8">
            <h2 className="font-display text-3xl sm:text-5xl md:text-6xl font-extrabold text-[#0a0a0a] tracking-tight leading-[1.12]">
              Engineered for founders &amp; creators who refuse to look{" "}
              <span className="inline-flex items-center align-baseline">
                <span className="inline-flex items-center justify-center w-8 h-8 sm:w-11 sm:h-11 rounded-full bg-red text-white shadow-xs mx-1 sm:mx-2 align-middle">
                  <Sparkles size={18} strokeWidth={2.4} />
                </span>
                ordinary
              </span>{" "}
              or settle for{" "}
              <span className="inline-flex items-center align-baseline">
                <span className="inline-flex items-center justify-center w-8 h-8 sm:w-11 sm:h-11 rounded-full bg-[#0a0a0a] text-white shadow-xs mx-1 sm:mx-2 align-middle">
                  <Code2 size={18} strokeWidth={2.4} />
                </span>
                generic templates.
              </span>
            </h2>
          </div>
        </div>

        {/* High-End Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-5 sm:gap-6 mb-16 sm:mb-20">
          {/* Bento 1: Tech Standard (Span 7) */}
          <motion.div
            whileHover={{ y: -4 }}
            transition={{ duration: 0.25 }}
            className="lg:col-span-7 p-8 sm:p-9 rounded-3xl bg-[#0a0a0a] text-white flex flex-col justify-between min-h-[320px] shadow-[0_20px_50px_rgba(0,0,0,0.12)] relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-red/15 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono uppercase tracking-widest text-white/50">
                  Zero Technical Debt
                </span>
                <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-400 font-bold border border-emerald-500/30">
                  ● 99 Google Lighthouse
                </span>
              </div>

              <div className="font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-2">
                Production-Tested Next.js 16 &amp; React 19
              </div>

              <p className="text-xs sm:text-sm text-white/70 leading-relaxed max-w-xl">
                Every line of code is structured with strict TypeScript, Tailwind CSS v4, and 60fps Lenis physics. No jQuery, no abandoned npm plugins, and zero unnecessary bundle weight.
              </p>
            </div>

            <div className="relative z-10 pt-6 border-t border-white/10 flex flex-wrap items-center gap-2">
              {["TypeScript Strict", "Tailwind v4", "Next.js 16", "React 19 Concurrent", "Supabase PIN CMS", "Lenis 60fps"].map((tag) => (
                <span
                  key={tag}
                  className="text-[11px] font-mono px-3 py-1 rounded-full bg-white/10 text-white/90 border border-white/10"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Bento 2: Commercial License (Span 5) */}
          <motion.div
            whileHover={{ y: -4 }}
            transition={{ duration: 0.25 }}
            className="lg:col-span-5 p-8 sm:p-9 rounded-3xl bg-white border border-black/[0.08] shadow-[0_12px_40px_rgba(0,0,0,0.04)] flex flex-col justify-between min-h-[320px]"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono uppercase tracking-widest text-black/40">
                  License Guarantee
                </span>
                <ShieldCheck size={20} className="text-emerald-600" />
              </div>

              <div className="font-display text-4xl sm:text-5xl font-black text-[#0a0a0a] tracking-tight mb-2">
                100% Commercial
              </div>

              <p className="text-xs sm:text-sm text-black/60 leading-relaxed">
                Full perpetual deployment freedom. Build for your personal startup or client contracts with zero royalties and a verifiable signed certificate.
              </p>
            </div>

            <div className="pt-4 border-t border-black/[0.06] flex items-center justify-between text-xs text-black/70">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 size={14} className="text-emerald-600" />
                <span>Unlimited Client Builds</span>
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 size={14} className="text-emerald-600" />
                <span>Signed PDF/PNG</span>
              </span>
            </div>
          </motion.div>

          {/* Bento 3: Turnkey 48-Hour Delivery (Span 6) */}
          <motion.div
            whileHover={{ y: -4 }}
            transition={{ duration: 0.25 }}
            className="lg:col-span-6 p-8 sm:p-9 rounded-3xl bg-white border border-black/[0.08] shadow-[0_12px_40px_rgba(0,0,0,0.04)] flex flex-col justify-between min-h-[260px]"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono uppercase tracking-widest text-black/40">
                  Rapid Deployment
                </span>
                <Clock size={18} className="text-red" />
              </div>

              <div className="font-display text-3xl sm:text-4xl font-extrabold text-[#0a0a0a] tracking-tight mb-2">
                Turnkey 48-Hour Setup
              </div>

              <p className="text-xs sm:text-sm text-black/65 leading-relaxed">
                Need it live immediately? Vikash personally configures custom DNS on Vercel/Cloudflare, connects your Supabase environment, and uploads your project assets.
              </p>
            </div>

            <div className="pt-4 border-t border-black/[0.06] flex items-center gap-2 text-xs font-mono text-black/50">
              <span>Included with Turnkey Option:</span>
              <span className="text-red font-bold">DNS • Domain • Vercel • CMS</span>
            </div>
          </motion.div>

          {/* Bento 4: Global Shipped Portfolio (Span 6) */}
          <motion.div
            whileHover={{ y: -4 }}
            transition={{ duration: 0.25 }}
            className="lg:col-span-6 p-8 sm:p-9 rounded-3xl bg-red text-white shadow-[0_15px_40px_rgba(225,6,0,0.25)] flex flex-col justify-between min-h-[260px]"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono uppercase tracking-widest text-white/80">
                  Track Record
                </span>
                <Globe2 size={18} className="text-white" />
              </div>

              <div className="font-display text-4xl sm:text-5xl font-black text-white tracking-tight mb-2">
                50+ Shipped Brands
              </div>

              <p className="text-xs sm:text-sm text-white/90 leading-relaxed font-medium">
                Engineered for luxury fashion houses, clean technology companies, and venture-backed founders across the United States, Austria, and India.
              </p>
            </div>

            <div className="pt-4 border-t border-white/20 flex items-center justify-between text-xs text-white/90 font-mono">
              <span>Lighthouse Score: 98-100</span>
              <span>Avg Load: 0.4s</span>
            </div>
          </motion.div>
        </div>

        {/* Real Production Client Showcase */}
        <div className="pt-10 border-t border-black/[0.06]">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6">
            <span className="text-xs font-mono uppercase tracking-widest text-black/40">
              Verified Production Codebases Built By Vikash:
            </span>
            <span className="text-xs font-mono text-emerald-600 font-bold flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>All 100% Live In Production</span>
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3.5">
            {REAL_CLIENTS.map((client, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-white border border-black/[0.08] hover:border-black/30 transition-all text-left shadow-2xs group cursor-default"
              >
                <div className="font-display text-sm font-bold text-[#0a0a0a] group-hover:text-red transition-colors">
                  {client.name}
                </div>
                <div className="text-[10px] text-black/40 font-mono mt-0.5">
                  {client.location}
                </div>
                <span className="inline-block text-[9px] font-mono uppercase font-semibold text-black/60 bg-black/[0.04] px-2 py-0.5 rounded-md mt-2">
                  {client.tag}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
