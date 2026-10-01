"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowUpRight,
  CheckCircle2,
  ChevronDown,
  Clock,
  Sparkles,
  ExternalLink,
  ShieldCheck,
  Send,
  Zap,
} from "lucide-react";
import { Service } from "@/data/services";
import { ServiceCategoryIcon, TechBadge } from "./TechIcons";

const SERVICE_LINKS: Record<string, string> = {
  "Shopify & E-Commerce": "/work/web",
  "Web Applications": "/work/app",
  "AI Prompting & Workflows": "/about",
  "UI/UX & Frontend Optimization": "/work/web",
  "Web Development": "/work/web",
  "App Development": "/work/app",
  "Digital Marketing": "/contact",
  "Graphic Design": "/contact",
};

type PreviewData = {
  title: string;
  client: string;
  tag: string;
  imageUrl: string;
  slug: string;
  metric: string;
  turnaround: string;
  idealFor: string;
};

const SERVICE_PREVIEWS: Record<string, PreviewData> = {
  "Shopify & E-Commerce": {
    title: "Maison Nagi",
    client: "Maison Nagi (US / Global)",
    tag: "Shopify Plus / Custom Liquid",
    imageUrl:
      "https://res.cloudinary.com/dh0amtajw/image/upload/v1783577413/eda9108d-48f3-4060-878a-234360ddd785_toe3tv.png",
    slug: "/work/web/maison-nagi",
    metric: "0.6s Load Time • +38% Mobile Conversion",
    turnaround: "2 – 4 Weeks",
    idealFor: "Luxury brands, high-growth DTC stores & global merchants",
  },
  "Web Applications": {
    title: "Solax24 Energy",
    client: "Solax24 GmbH (Austria / Europe)",
    tag: "Next.js 15 / CleanTech Platform",
    imageUrl:
      "https://res.cloudinary.com/dh0amtajw/image/upload/v1783577279/25b3c37a-add8-4e2e-920a-fa6239df736b_jyz3ni.png",
    slug: "/work/web/solax24",
    metric: "99/100 Lighthouse • 3.2x Inquiries",
    turnaround: "3 – 6 Weeks",
    idealFor: "SaaS startups, enterprise tools, portals & complex web apps",
  },
  "AI Prompting & Workflows": {
    title: "Avara Spatial Audio",
    client: "Avara Audio (Global)",
    tag: "AI & Audio Engineering",
    imageUrl:
      "https://res.cloudinary.com/dh0amtajw/image/upload/v1787134027/Screenshot_2026-08-18_at_6.09.38_PM_tbjwvk.png",
    slug: "/work/app/avara-sound-of-emotion",
    metric: "60 FPS Fluid Waveform • Fast Generation",
    turnaround: "1 – 2 Weeks",
    idealFor: "Agencies, creators & teams wanting rapid AI automation",
  },
  "UI/UX & Frontend Optimization": {
    title: "Flâneur Global",
    client: "Flâneur Global (India & Global)",
    tag: "High-AOV Luxury Commerce",
    imageUrl:
      "https://res.cloudinary.com/dh0amtajw/image/upload/v1783576778/1fd8772d-4e80-4c1e-b1bb-36b5fe9ed7f4_nda3wy.png",
    slug: "/work/web/flaneur-global",
    metric: "+45% AOV • Bespoke Color Visualizer",
    turnaround: "1 – 3 Weeks",
    idealFor: "Existing stores & apps with sluggish speed or low conversion",
  },
};

export default function ServicesPageRow({ service }: { service: Service }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const preview = SERVICE_PREVIEWS[service.title] || {
    title: service.title,
    client: "Curated Client Project",
    tag: service.subtitle ?? "Engineered Solution",
    imageUrl:
      "https://res.cloudinary.com/dh0amtajw/image/upload/v1783577413/eda9108d-48f3-4060-878a-234360ddd785_toe3tv.png",
    slug: SERVICE_LINKS[service.title] ?? "/work",
    metric: "Engineered for Speed & Conversion",
    turnaround: "2 – 4 Weeks",
    idealFor: "Ambitious businesses & forward-thinking teams",
  };

  const primaryTargetUrl = SERVICE_LINKS[service.title] ?? "/work";

  return (
    <article
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`group relative my-4 rounded-3xl border transition-all duration-500 overflow-visible ${
        isExpanded
          ? "bg-white/95 border-black/15 shadow-[0_20px_50px_rgba(0,0,0,0.08)] ring-1 ring-black/5"
          : "bg-transparent border-transparent hover:bg-white/80 hover:border-black/10 hover:shadow-[0_12px_36px_rgba(0,0,0,0.05)]"
      }`}
    >
      {/* Sleek Left Accent Indicator Bar (Glows Red on hover) */}
      <div
        className={`absolute left-0 top-1/2 -translate-y-1/2 w-1.5 rounded-r-full transition-all duration-500 pointer-events-none z-20 ${
          isHovered || isExpanded
            ? "h-20 bg-red shadow-[0_0_16px_rgba(225,6,0,0.5)]"
            : "h-0 bg-transparent"
        }`}
        aria-hidden="true"
      />

      {/* Main Interactive Row Header */}
      <div className="relative z-10 px-5 sm:px-8 py-8 sm:py-10 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
        {/* 1. Index Number */}
        <div className="lg:col-span-1 flex items-center justify-between lg:block">
          <span className="font-mono text-sm font-bold text-black/40 group-hover:text-red transition-colors duration-300">
            /{service.index}
          </span>
          {/* Mobile Badge */}
          <span className="lg:hidden text-[11px] font-mono font-semibold uppercase tracking-wider text-black/50 bg-black/5 px-2.5 py-1 rounded-full">
            {preview.turnaround}
          </span>
        </div>

        {/* 2. Title & Hero Category Icon */}
        <div className="lg:col-span-4 flex items-start gap-4">
          <div className="relative w-12 h-12 rounded-2xl bg-white border border-black/10 shadow-xs flex items-center justify-center shrink-0 transition-transform duration-500 group-hover:scale-105 group-hover:border-red/30">
            <ServiceCategoryIcon
              type={
                service.primaryIcon ??
                (service.index === "01"
                  ? "shopify"
                  : service.index === "02"
                  ? "web"
                  : service.index === "03"
                  ? "ai"
                  : "uiux")
              }
              className="w-6 h-6 transition-transform duration-300 group-hover:scale-110"
            />
          </div>
          <div>
            <Link
              href={primaryTargetUrl}
              data-cursor-hover
              className="inline-block"
            >
              <h3 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-black group-hover:text-black transition-colors duration-300 flex items-center gap-2">
                <span>{service.title}</span>
                <ArrowUpRight
                  size={18}
                  className="opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all duration-300 text-red shrink-0"
                />
              </h3>
            </Link>
            {service.subtitle && (
              <p className="mt-1 text-xs font-mono font-bold uppercase tracking-wider text-red">
                {service.subtitle}
              </p>
            )}
          </div>
        </div>

        {/* 3. Description, Key Deliverables & Tech Stack Badges */}
        <div className="lg:col-span-5 space-y-3.5">
          <p className="text-black/70 text-sm sm:text-base leading-relaxed">
            {service.description}
          </p>

          {/* Key Deliverables Row (Highlighted with micro checkmarks) */}
          <div className="flex flex-wrap gap-2 pt-1">
            {service.points.slice(0, 3).map((point) => (
              <span
                key={point}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-black/[0.03] border border-black/8 text-black/75 transition-colors group-hover:border-black/15 group-hover:bg-white"
              >
                <CheckCircle2 size={12} className="text-red shrink-0" />
                <span>{point}</span>
              </span>
            ))}
          </div>

          {/* Tech Badges Row */}
          {service.techTags && service.techTags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 pt-0.5">
              {service.techTags.slice(0, 4).map((tech) => (
                <TechBadge
                  key={tech.name}
                  icon={tech.icon}
                  label={tech.name}
                />
              ))}
              {service.techTags.length > 4 && (
                <span className="inline-flex items-center px-2 py-1 rounded-full text-[11px] font-mono text-black/50 bg-black/5">
                  +{service.techTags.length - 4} more
                </span>
              )}
            </div>
          )}
        </div>

        {/* 4. Controls: View Project & Scope Drawer Toggle */}
        <div className="lg:col-span-2 flex items-center lg:justify-end gap-3 pt-2 lg:pt-0">
          {/* Accordion Scope Toggle Button */}
          <button
            type="button"
            onClick={() => setIsExpanded((prev) => !prev)}
            data-cursor-hover
            aria-expanded={isExpanded}
            className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-semibold transition-all duration-300 ${
              isExpanded
                ? "bg-red text-white shadow-xs"
                : "bg-black/5 text-black/70 hover:bg-black/10 hover:text-black"
            }`}
          >
            <span>{isExpanded ? "Close" : "Scope"}</span>
            <ChevronDown
              size={14}
              className={`transition-transform duration-300 ${
                isExpanded ? "rotate-180" : ""
              }`}
            />
          </button>

          {/* Direct Link Circular Button */}
          <Link
            href={primaryTargetUrl}
            data-cursor-hover
            aria-label={`View ${service.title} projects`}
            className="w-11 h-11 rounded-full border border-black/15 bg-white/80 backdrop-blur-xs flex items-center justify-center transition-all duration-300 group-hover:bg-red group-hover:border-red group-hover:text-white group-hover:scale-105 shadow-2xs"
          >
            <ArrowUpRight
              size={18}
              className="text-black/70 transition-all duration-300 group-hover:text-white group-hover:rotate-45"
            />
          </Link>
        </div>
      </div>

      {/* 5. Desktop Floating Project Mockup Preview (Reveals smoothly on hover when not expanded) */}
      <AnimatePresence>
        {isHovered && !isExpanded && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 6 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="hidden xl:block absolute right-8 -top-16 z-30 pointer-events-none w-72 rounded-2xl overflow-hidden bg-white/95 backdrop-blur-xl border border-black/12 shadow-[0_20px_45px_rgba(0,0,0,0.18)]"
          >
            <div className="relative h-40 w-full bg-[#151b1f] overflow-hidden">
              <Image
                src={preview.imageUrl}
                alt={preview.title}
                fill
                sizes="288px"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-[10px] font-mono font-semibold uppercase tracking-widest text-white/90 border border-white/20">
                {preview.tag}
              </div>
              <div className="absolute bottom-2.5 left-3 right-3 text-white">
                <p className="text-[11px] font-mono text-white/70">Flagship Project</p>
                <p className="font-display text-sm font-bold truncate">{preview.title}</p>
              </div>
            </div>
            <div className="p-3 bg-white">
              <div className="flex items-center gap-1.5 text-[11px] font-medium text-black/70">
                <Sparkles size={12} className="text-red shrink-0" />
                <span className="truncate">{preview.metric}</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 6. Expandable Scope & Deliverables Accordion Drawer */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden border-t border-black/10 bg-[#faf8f4]/60 backdrop-blur-sm rounded-b-3xl"
          >
            <div className="px-5 sm:px-8 py-8 grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
              {/* Left Column: Full Deliverables Checklist */}
              <div className="md:col-span-7 space-y-4">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-red animate-pulse" />
                  <h4 className="font-display text-sm font-bold uppercase tracking-wider text-black/80">
                    What&apos;s Included In This Service
                  </h4>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  {service.points.map((point, index) => (
                    <div
                      key={point}
                      className="p-3.5 rounded-xl bg-white border border-black/8 shadow-2xs flex items-start gap-2.5"
                    >
                      <span className="font-mono text-[11px] font-bold text-red mt-0.5">
                        0{index + 1}.
                      </span>
                      <div>
                        <p className="text-sm font-semibold text-black">{point}</p>
                        <p className="text-xs text-black/60 mt-0.5 leading-relaxed">
                          Tailored specification, test-driven execution &amp; production deployment.
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Turnaround & Ideal For Badges */}
                <div className="pt-2 flex flex-wrap gap-4 text-xs text-black/70">
                  <div className="flex items-center gap-1.5 font-medium">
                    <Clock size={14} className="text-red" />
                    <span>Turnaround: <strong>{preview.turnaround}</strong></span>
                  </div>
                  <div className="flex items-center gap-1.5 font-medium">
                    <ShieldCheck size={14} className="text-red" />
                    <span>Guarantee: <strong>Sub-1s Speed &amp; Clean Code</strong></span>
                  </div>
                </div>
              </div>

              {/* Right Column: Featured Project Card & Quick Action CTAs */}
              <div className="md:col-span-5 flex flex-col gap-4">
                <div className="relative rounded-2xl overflow-hidden border border-black/10 bg-white shadow-xs p-4">
                  <div className="flex items-center justify-between pb-3 border-b border-black/8">
                    <div>
                      <p className="text-[10px] font-mono uppercase tracking-widest text-black/50">
                        Featured Case Study
                      </p>
                      <h5 className="font-display font-bold text-base text-black mt-0.5">
                        {preview.title}
                      </h5>
                    </div>
                    <span className="text-[11px] font-semibold text-red bg-red/10 px-2 py-0.5 rounded-md">
                      {preview.tag.split("/")[0]}
                    </span>
                  </div>

                  <div className="relative h-32 w-full mt-3 rounded-xl overflow-hidden bg-[#151b1f]">
                    <Image
                      src={preview.imageUrl}
                      alt={preview.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 400px"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                    <div className="absolute bottom-2.5 left-3 text-white text-xs font-medium">
                      {preview.metric}
                    </div>
                  </div>

                  <p className="text-xs text-black/65 mt-3 leading-relaxed">
                    <strong>Ideal for:</strong> {preview.idealFor}
                  </p>
                </div>

                {/* CTAs */}
                <div className="flex items-center gap-3">
                  <Link
                    href={`/contact?service=${encodeURIComponent(service.title)}`}
                    data-cursor-hover
                    className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-red text-white text-xs font-semibold shadow-xs hover:bg-[#b30500] transition-colors"
                  >
                    <Send size={13} />
                    <span>Inquire About This</span>
                  </Link>

                  <Link
                    href={preview.slug}
                    data-cursor-hover
                    className="inline-flex items-center justify-center gap-1.5 px-4 py-3 rounded-full bg-white border border-black/12 text-black text-xs font-semibold hover:border-black/30 transition-colors shadow-2xs"
                  >
                    <span>View Project</span>
                    <ExternalLink size={13} />
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </article>
  );
}
