"use client";

import { motion } from "framer-motion";
import { Sparkles, Code2, ShieldCheck, Zap, ArrowUpRight, CheckCircle2, Crown } from "lucide-react";

const REAL_CLIENTS = [
  { name: "Maison Nagi", desc: "US Luxury Fashion" },
  { name: "Solax24 GmbH", desc: "Austrian CleanTech" },
  { name: "Flaneur Global", desc: "Headless E-Commerce" },
  { name: "Qudrat Studio", desc: "Creative Production" },
  { name: "Arix Team", desc: "Full-Stack Agency" },
];

export default function StoreValueSection() {
  return (
    <section id="why-us" className="relative bg-[#faf8f5] py-16 sm:py-24 px-4 sm:px-6 md:px-12">
      <div className="max-w-[1320px] mx-auto">
        {/* Header & Decorated Heading */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 mb-14 sm:mb-20">
          <div className="lg:col-span-3">
            <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-red">
              <span className="w-1.5 h-1.5 rounded-full bg-red animate-pulse" />
              <span>Digital Craftsmanship</span>
            </div>
          </div>

          <div className="lg:col-span-9">
            <h2 className="font-display text-3xl sm:text-5xl md:text-6xl font-bold text-[#0a0a0a] tracking-tight leading-[1.12]">
              Engineered for developers, designers and founders who refuse to look{" "}
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

        {/* 4-Card Bento Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 mb-16 sm:mb-20">
          {/* Card 1: Zero Bloat Tech */}
          <motion.div
            whileHover={{ y: -4 }}
            className="p-6 sm:p-7 rounded-[2rem] bg-white border border-black/[0.08] shadow-xs flex flex-col justify-between min-h-[280px]"
          >
            <div className="flex flex-wrap gap-1.5">
              {["TypeScript Strict", "Tailwind v4", "Next.js 16", "Zero jQuery", "App Router"].map((tag) => (
                <span
                  key={tag}
                  className="text-[10px] sm:text-xs font-medium px-2.5 py-1 rounded-full bg-black/[0.04] text-black/75"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="pt-6 border-t border-black/[0.05]">
              <span className="text-xs font-mono uppercase text-black/50 block mb-1">
                Average Load
              </span>
              <span className="font-display text-4xl sm:text-5xl font-black text-[#0a0a0a]">
                0.4s
              </span>
              <p className="text-[11px] text-black/60 mt-1">
                Zero bloated libraries or legacy dependencies.
              </p>
            </div>
          </motion.div>

          {/* Card 2: Signature Red Accent Card (100% Commercial Rights) */}
          <motion.div
            whileHover={{ y: -4 }}
            className="p-6 sm:p-7 rounded-[2rem] bg-red text-white shadow-md flex flex-col justify-between min-h-[280px]"
          >
            <div className="text-xs font-bold uppercase tracking-wider text-white/80">
              Commercial License Included
            </div>

            <div className="font-display text-5xl sm:text-6xl font-black tracking-tight text-white my-4">
              100%
            </div>

            <p className="text-xs sm:text-sm font-medium text-white/90 leading-relaxed">
              Full commercial freedom. Deploy for your own personal brand or paying client projects without royalties.
            </p>
          </motion.div>

          {/* Card 3: Real Shipped Work Card */}
          <motion.div
            whileHover={{ y: -4 }}
            className="relative rounded-[2rem] overflow-hidden shadow-md flex flex-col justify-end p-6 sm:p-7 min-h-[280px] text-white"
          >
            <img
              src="/images/leaf-card.jpg"
              alt="Digital Growth"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

            <div className="relative z-10">
              <div className="font-display text-4xl sm:text-5xl font-black text-white mb-2">
                50+
              </div>
              <p className="text-xs sm:text-sm text-white/90 leading-relaxed font-medium">
                Production projects built and maintained across US, Europe, and India.
              </p>
            </div>
          </motion.div>

          {/* Card 4: Turnkey 48h Setup */}
          <motion.div
            whileHover={{ y: -4 }}
            className="p-6 sm:p-7 rounded-[2rem] bg-white border border-black/[0.08] shadow-xs flex flex-col justify-between min-h-[280px]"
          >
            <div>
              <span className="text-xs font-mono uppercase text-black/50 block mb-1">
                Turnkey Launch
              </span>
              <div className="font-display text-4xl sm:text-5xl font-black text-[#0a0a0a]">
                48 Hours
              </div>
            </div>

            <p className="text-xs sm:text-sm text-black/65 leading-relaxed">
              Vikash personally configures your Vercel DNS, domain routing, and project case studies.
            </p>
          </motion.div>
        </div>

        {/* Real Client Showcase Strip */}
        <div className="pt-8 pb-4 border-t border-black/[0.06]">
          <span className="text-[10px] font-mono uppercase tracking-widest text-black/40 block mb-5">
            Production Stores &amp; Web Apps Built By Vikash:
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {REAL_CLIENTS.map((client, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-2xl bg-white border border-black/[0.06] hover:border-black/20 transition-all text-left shadow-2xs"
              >
                <div className="font-display text-sm font-bold text-[#0a0a0a]">
                  {client.name}
                </div>
                <div className="text-[10px] text-black/50 font-mono mt-0.5">
                  {client.desc}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
