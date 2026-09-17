"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Sparkles,
  Globe2,
  CheckCircle2,
  FileText,
  ShoppingBag,
  Gem,
  Zap,
  Code2,
  Award,
  Star,
  Gauge,
  Send,
} from "lucide-react";
import Reveal from "./Reveal";
import Counter from "./Counter";
import { TechBadge } from "./TechIcons";
import { FOUNDERS, type Founder } from "@/data/founders";

// Curated icons for career milestones
const MILESTONE_ICONS = [Gem, ShoppingBag, Code2, Gauge, Sparkles];

export default function About({ founder }: { founder?: Founder }) {
  const data = founder ?? FOUNDERS[0];

  return (
    <section id="about" className="relative py-24 md:py-32 px-6 md:px-10 bg-white overflow-hidden select-none">
      {/* Ambient background glow */}
      <div className="absolute top-0 right-0 w-[45vw] h-[45vw] bg-red/5 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[35vw] h-[35vw] bg-black/[0.02] blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-[1400px] mx-auto relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-12 md:mb-16">
          <Reveal>
            <div className="flex items-center gap-3 mb-6">
              <span className="w-2.5 h-2.5 rounded-full bg-red" />
              <span className="text-xs font-semibold uppercase tracking-widest text-black/50">
                About me
              </span>
            </div>
          </Reveal>

          <Reveal delay={0.05}>
            <h2 className="font-display font-extrabold text-3xl sm:text-5xl lg:text-6xl leading-[1.06] tracking-tight text-black">
              A developer obsessed with{" "}
              <span className="text-red">craft, speed &amp; results.</span>
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="text-black/70 text-base sm:text-lg leading-relaxed mt-4">
              The developer behind every pixel &mdash; merging bespoke Shopify Liquid engineering,
              high-converting e-commerce experiences, and scalable Next.js web applications built for speed.
            </p>
          </Reveal>
        </div>

        {/* Unified Comprehensive Showcase Card */}
        <div className="bg-[#f7f4ee] border border-black/[0.08] rounded-3xl p-6 sm:p-8 md:p-12 shadow-sm relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            
            {/* Left Column: Portrait Card & Stats Counters */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              {/* Portrait Image Card */}
              <div className="group relative aspect-[4/5] rounded-2xl bg-[#ebe5da] overflow-hidden border border-black/[0.08] shadow-sm">
                <Image
                  src={data.avatar}
                  alt={data.name}
                  fill
                  priority
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                />
                
                {/* Subtle dark gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90" />

                {/* Top Status Pill: Live Availability */}
                <div className="absolute top-4 right-4 z-10">
                  <span className="inline-flex items-center gap-1.5 bg-black/70 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-mono font-bold text-white border border-white/20 shadow-md">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                    </span>
                    Available for Projects
                  </span>
                </div>

                {/* Bottom Card Identity & Global Location */}
                <div className="absolute bottom-5 left-5 right-5 z-10 text-white flex flex-col gap-1.5">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-display text-2xl font-bold tracking-tight">{data.name}</p>
                      <p className="text-xs text-white/80 font-mono uppercase tracking-wider mt-0.5">
                        {data.role}
                      </p>
                    </div>
                    <span className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center">
                      <Sparkles size={14} className="text-red" />
                    </span>
                  </div>

                  <div className="pt-2 border-t border-white/15 flex items-center gap-2 text-xs text-white/70">
                    <Globe2 size={13} className="text-red shrink-0" />
                    <span className="truncate">Jaipur, India &bull; Global Clients (US, UK, EU)</span>
                  </div>
                </div>
              </div>

              {/* 4 Interactive Live Stats Counters */}
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                <div className="bg-white border border-black/10 rounded-2xl p-4 shadow-2xs transition-all duration-300 hover:shadow-xs hover:border-red/30">
                  <div className="flex items-center gap-2.5 mb-1.5">
                    <div className="w-8 h-8 rounded-xl bg-red/10 text-red flex items-center justify-center shrink-0">
                      <ShoppingBag size={16} />
                    </div>
                    <div className="font-display text-2xl sm:text-3xl font-extrabold text-black">
                      <Counter to={14} suffix="+" />
                    </div>
                  </div>
                  <p className="text-[11px] font-mono font-semibold uppercase tracking-wider text-black/55">
                    Live Stores Built
                  </p>
                </div>

                <div className="bg-white border border-black/10 rounded-2xl p-4 shadow-2xs transition-all duration-300 hover:shadow-xs hover:border-red/30">
                  <div className="flex items-center gap-2.5 mb-1.5">
                    <div className="w-8 h-8 rounded-xl bg-red/10 text-red flex items-center justify-center shrink-0">
                      <Award size={16} />
                    </div>
                    <div className="font-display text-2xl sm:text-3xl font-extrabold text-black">
                      <Counter to={1} suffix="+" />
                    </div>
                  </div>
                  <p className="text-[11px] font-mono font-semibold uppercase tracking-wider text-black/55">
                    Years Experience
                  </p>
                </div>

                <div className="bg-white border border-black/10 rounded-2xl p-4 shadow-2xs transition-all duration-300 hover:shadow-xs hover:border-red/30">
                  <div className="flex items-center gap-2.5 mb-1.5">
                    <div className="w-8 h-8 rounded-xl bg-red/10 text-red flex items-center justify-center shrink-0">
                      <Star size={16} />
                    </div>
                    <div className="font-display text-2xl sm:text-3xl font-extrabold text-black">
                      <Counter to={98} suffix="%" />
                    </div>
                  </div>
                  <p className="text-[11px] font-mono font-semibold uppercase tracking-wider text-black/55">
                    Client Satisfaction
                  </p>
                </div>

                <div className="bg-white border border-black/10 rounded-2xl p-4 shadow-2xs transition-all duration-300 hover:shadow-xs hover:border-red/30">
                  <div className="flex items-center gap-2.5 mb-1.5">
                    <div className="w-8 h-8 rounded-xl bg-red/10 text-red flex items-center justify-center shrink-0">
                      <Gauge size={16} />
                    </div>
                    <div className="font-display text-2xl sm:text-3xl font-extrabold text-black">
                      &lt; 1s
                    </div>
                  </div>
                  <p className="text-[11px] font-mono font-semibold uppercase tracking-wider text-black/55">
                    Core Web Vitals
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column: Bio, Milestones with Icons, Tech Stack & CTAs */}
            <div className="lg:col-span-7 flex flex-col justify-between h-full gap-7">
              <div>
                {/* Verified Role Capsule */}
                <div className="inline-flex items-center gap-2 border border-black/10 bg-white px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider text-black/75 mb-5 shadow-2xs">
                  <CheckCircle2 size={15} className="text-red" />
                  <span>Verified Web &amp; Shopify Developer</span>
                </div>

                <h3 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight mb-4 text-black">
                  Hi, I&apos;m <span className="text-red">{data.name}</span>.
                </h3>

                <p className="text-black/75 text-base sm:text-lg leading-relaxed mb-6 font-normal">
                  Passionate and results-driven Web &amp; Shopify Developer specializing in building,
                  customizing, and scaling high-performance e-commerce storefronts and custom Next.js web applications.
                  I pair clean code architecture with pixel-level attention so sites feel as lightning-fast as they look.
                </p>

                {/* Proven Career Milestones with Dedicated Icons */}
                <div className="flex flex-col gap-3 mb-6">
                  <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-black/50">
                    Experience &amp; Track Record
                  </h4>
                  <div className="flex flex-col gap-2.5">
                    {data.highlights.map((point, idx) => {
                      const IconComponent = MILESTONE_ICONS[idx % MILESTONE_ICONS.length];
                      return (
                        <div
                          key={point}
                          className="flex items-start gap-3.5 p-3 sm:p-3.5 rounded-xl bg-white border border-black/[0.07] transition-all duration-300 hover:border-black/20 hover:shadow-xs"
                        >
                          <div className="w-7 h-7 rounded-lg bg-red/10 text-red flex items-center justify-center shrink-0 mt-0.5">
                            <IconComponent size={14} />
                          </div>
                          <span className="text-black/85 text-xs sm:text-sm font-medium leading-relaxed">
                            {point}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Core Technical Stack with Authentic Color Logos */}
                <div className="flex flex-col gap-3">
                  <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-black/50">
                    Core Technologies &amp; Tooling
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    <TechBadge icon="shopify" label="Shopify Plus" />
                    <TechBadge icon="liquid" label="Liquid Themes" />
                    <TechBadge icon="nextjs" label="Next.js 15" />
                    <TechBadge icon="react" label="React 19" />
                    <TechBadge icon="typescript" label="TypeScript" />
                    <TechBadge icon="tailwind" label="Tailwind CSS" />
                    <TechBadge icon="html5" label="HTML5 Semantic" />
                    <TechBadge icon="css3" label="Modern CSS3" />
                    <TechBadge icon="javascript" label="JavaScript ES6+" />
                    <TechBadge icon="figma" label="Figma to Code" />
                    <TechBadge icon="speed" label="Core Web Vitals" />
                    <TechBadge icon="openai" label="AI Prompting" />
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-6 border-t border-black/10 flex flex-wrap items-center gap-3">
                <Link
                  href="/resume"
                  data-cursor-hover
                  className="group liquid-btn-red !text-xs sm:!text-sm !font-semibold !px-6 !py-3 gap-2 shadow-sm"
                >
                  <FileText size={15} />
                  <span>View Resume (CV)</span>
                  <ArrowUpRight size={15} className="group-hover:rotate-45 transition-transform duration-300" />
                </Link>

                <Link
                  href="/contact"
                  data-cursor-hover
                  className="group liquid-btn-dark !text-xs sm:!text-sm !font-semibold !px-6 !py-3 gap-2 shadow-sm"
                >
                  <Send size={15} />
                  <span>Start a Project</span>
                  <ArrowUpRight size={15} className="group-hover:rotate-45 transition-transform duration-300" />
                </Link>

                <Link
                  href="/work"
                  data-cursor-hover
                  className="liquid-nav px-5 py-3 rounded-full text-xs sm:text-sm font-semibold text-black/80 hover:text-black hover:scale-105 transition-all duration-300 border border-black/10 bg-white shadow-2xs"
                >
                  Explore Work (14)
                </Link>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
