"use client";

import { motion } from "framer-motion";
import { 
  Code2, 
  Layers, 
  Volume2, 
  Lock, 
  Sparkles, 
  Smartphone, 
  Gauge, 
  CheckCircle2, 
  Cpu, 
  Zap, 
  Palette 
} from "lucide-react";

const FEATURES = [
  {
    icon: <Code2 className="text-red" size={24} />,
    title: "Next.js 16 & React 19 Core",
    description:
      "Engineered on the cutting-edge Next.js App Router with React 19 Server Components, zero layout shift, fast streaming, and clean modular code architecture.",
    tag: "Architecture",
  },
  {
    icon: <Layers className="text-amber-400" size={24} />,
    title: "Liquid Glass Bento Dock",
    description:
      "Interactive floating dock inspired by macOS with spring physics, magnification gestures, and frosted glass backdrop-blur shaders on both desktop and mobile.",
    tag: "Interactive UI",
  },
  {
    icon: <Volume2 className="text-emerald-400" size={24} />,
    title: "Ambient Audio & Soundscapes",
    description:
      "Full background audio player with sound toggles, bouncy music equalizer visualization, and interactive UI clicks for high sensory immersion.",
    tag: "Audio Engine",
  },
  {
    icon: <Lock className="text-blue-400" size={24} />,
    title: "PIN-Protected Live CMS",
    description:
      "Unique member management system powered by Supabase with draft-to-published state safety, bcrypt hashing, and rate-limited member logins.",
    tag: "Supabase CMS",
  },
  {
    icon: <Sparkles className="text-purple-400" size={24} />,
    title: "60 FPS Fluid Kinetic Motion",
    description:
      "Lenis smooth scroll synced with Framer Motion, magnetic button pull effects, and bespoke cursor liquid trails that delight visitors.",
    tag: "Animations",
  },
  {
    icon: <Smartphone className="text-pink-400" size={24} />,
    title: "PWA & Mobile First Experience",
    description:
      "Progressive Web App support with mobile install prompts, tactile touch feedback, and responsive layout across all smartphones, tablets, and ultrawide displays.",
    tag: "Responsiveness",
  },
];

export default function BuyPortfolioFeatures() {
  return (
    <section id="features" className="relative bg-[#0a0a0a] text-white py-24 sm:py-32 px-4 sm:px-6 md:px-12">
      <div className="max-w-[1280px] mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-red mb-3">
            <Zap size={14} />
            <span>Under The Hood</span>
          </div>
          <h2 className="font-display text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white leading-tight">
            Engineered Like An{" "}
            <span className="text-red font-serif italic" style={{ fontFamily: "'Instrument Serif', serif" }}>
              Award Winner.
            </span>
          </h2>
          <p className="text-white/60 text-sm sm:text-base mt-4 leading-relaxed">
            Every file, animation frame, and database query has been tuned for peak elegance and speed. 
            No clumsy templates or bloated page builders.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map((feat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              whileHover={{ y: -4 }}
              className="p-7 sm:p-8 rounded-3xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/10 hover:border-white/20 backdrop-blur-xl transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shadow-inner">
                    {feat.icon}
                  </div>
                  <span className="text-[11px] font-mono uppercase tracking-wider text-white/50 px-2.5 py-1 rounded-lg bg-white/5">
                    {feat.tag}
                  </span>
                </div>

                <h3 className="font-display text-xl sm:text-2xl font-bold text-white mb-3">
                  {feat.title}
                </h3>
                <p className="text-white/60 text-xs sm:text-sm leading-relaxed">
                  {feat.description}
                </p>
              </div>

              <div className="mt-6 pt-5 border-t border-white/5 flex items-center gap-2 text-xs text-white/40 font-mono">
                <CheckCircle2 size={13} className="text-red" />
                <span>Production tested</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Technical Architecture Specs Bar */}
        <div className="mt-12 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-red/[0.08] via-white/[0.02] to-red/[0.08] border border-white/10">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-2xl sm:text-3xl font-black font-display text-white">0 kb</div>
              <div className="text-xs text-white/50 font-mono uppercase mt-1">JQuery / Bloat</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-black font-display text-white">100%</div>
              <div className="text-xs text-white/50 font-mono uppercase mt-1">TypeScript Strict</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-black font-display text-white">Lenis v1</div>
              <div className="text-xs text-white/50 font-mono uppercase mt-1">Kinetic Scrolling</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-black font-display text-white">Vercel</div>
              <div className="text-xs text-white/50 font-mono uppercase mt-1">Ready in 2 clicks</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
