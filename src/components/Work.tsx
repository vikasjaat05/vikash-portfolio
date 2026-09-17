"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  ArrowUpRight,
  ExternalLink,
  Zap,
  TrendingUp,
  Sparkles,
  ArrowRight,
  MoveRight,
  Layers,
} from "lucide-react";
import Reveal from "./Reveal";
import { useInViewHover } from "./useInViewHover";

type FeaturedProject = {
  id: string;
  number: string;
  title: string;
  client: string;
  type: "shopify" | "web";
  categoryBadge: string;
  description: string;
  tags: string[];
  metric: string;
  metricIcon: typeof Zap;
  imageUrl: string;
  liveUrl: string;
  caseStudyUrl: string;
  liveLabel: string;
};

const FEATURED_PROJECTS: FeaturedProject[] = [
  {
    id: "maison-nagi",
    number: "01",
    title: "Maison Nagi",
    client: "Maison Nagi (US / Global)",
    type: "shopify",
    categoryBadge: "Shopify Plus / Luxury Fashion",
    description:
      "US-based luxury fashion & lifestyle storefront with bespoke typography, editorial layout, and sub-second global checkout.",
    tags: ["Shopify Plus", "Liquid Engine", "US / Global", "Luxury Fashion"],
    metric: "0.6s Load • +38% Mobile CRO",
    metricIcon: Zap,
    imageUrl:
      "https://res.cloudinary.com/dh0amtajw/image/upload/v1783577413/eda9108d-48f3-4060-878a-234360ddd785_toe3tv.png",
    liveUrl: "https://www.maisonnagi.com/",
    caseStudyUrl: "/work/web/maison-nagi",
    liveLabel: "maisonnagi.com",
  },
  {
    id: "solax24",
    number: "02",
    title: "Solax24 Energy",
    client: "Solax24 GmbH (Austria / Europe)",
    type: "web",
    categoryBadge: "Next.js 15 / CleanTech Platform",
    description:
      "Austrian clean energy enterprise web portal with an interactive real-time solar ROI calculator and bilingual European routing.",
    tags: ["Next.js 15", "Austria / Europe", "CleanTech", "Solar Estimator"],
    metric: "99/100 Lighthouse • 3.2x Inquiries",
    metricIcon: TrendingUp,
    imageUrl:
      "https://res.cloudinary.com/dh0amtajw/image/upload/v1783577279/25b3c37a-add8-4e2e-920a-fa6239df736b_jyz3ni.png",
    liveUrl: "https://www.solax24.at/en",
    caseStudyUrl: "/work/web/solax24",
    liveLabel: "solax24.at/en",
  },
  {
    id: "flaneur-global",
    number: "03",
    title: "Flâneur Global",
    client: "Flâneur (India & Global)",
    type: "shopify",
    categoryBadge: "Shopify Plus / Custom Configurator",
    description:
      "Bespoke color-driven luxury bedding & fine jewels brand with custom shade visualizer and international multi-currency commerce.",
    tags: ["Shopify Plus", "Color Swatches", "Multi-Currency", "High AOV"],
    metric: "+45% AOV with Live Palette Tool",
    metricIcon: TrendingUp,
    imageUrl:
      "https://res.cloudinary.com/dh0amtajw/image/upload/v1783576778/1fd8772d-4e80-4c1e-b1bb-36b5fe9ed7f4_nda3wy.png",
    liveUrl: "https://www.flaneurglobal.com/",
    caseStudyUrl: "/work/web/flaneur-global",
    liveLabel: "flaneurglobal.com",
  },
  {
    id: "avara-sound",
    number: "04",
    title: "Avara — Sound of Emotion",
    client: "Avara Audio (Global)",
    type: "web",
    categoryBadge: "React / Spatial Audio Web App",
    description:
      "Next-generation spatial audio player & responsive web app featuring real-time Web Audio API waveform canvas and 60 FPS fluid motion.",
    tags: ["React / Vite", "Spatial Audio", "Web Audio API", "PWA"],
    metric: "60 FPS Fluid Waveform Engine",
    metricIcon: Sparkles,
    imageUrl:
      "https://res.cloudinary.com/dh0amtajw/image/upload/v1787134027/Screenshot_2026-08-18_at_6.09.38_PM_tbjwvk.png",
    liveUrl: "https://avara-ashiq.vercel.app/",
    caseStudyUrl: "/work/app/avara-sound-of-emotion",
    liveLabel: "avara-ashiq.vercel.app",
  },
  {
    id: "unphltered",
    number: "05",
    title: "Unphltered Apparel",
    client: "Unphltered (US / DTC)",
    type: "shopify",
    categoryBadge: "Shopify / High-AOV Streetwear",
    description:
      "US direct-to-consumer streetwear store with high-converting mobile layout, instant cart slide-in drawer, and peak-traffic drop resilience.",
    tags: ["Shopify", "US / DTC", "Sub-1s Checkout", "Streetwear"],
    metric: "Zero Drop Bottlenecks • Peak Traffic Ready",
    metricIcon: Zap,
    imageUrl:
      "https://res.cloudinary.com/dh0amtajw/image/upload/v1783577098/e8164b24-b97f-42ef-a48f-e5dfb63aded4_w5xeyx.png",
    liveUrl: "https://unphltered.myshopify.com/",
    caseStudyUrl: "/work/web/unphltered",
    liveLabel: "unphltered.myshopify.com",
  },
];

export default function Work() {
  const targetRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [scrollDistance, setScrollDistance] = useState(0);

  // Measure the total horizontal scroll width relative to screen width
  useEffect(() => {
    const updateScrollDistance = () => {
      if (trackRef.current) {
        const totalWidth = trackRef.current.scrollWidth;
        const viewportWidth = window.innerWidth;
        // Scroll distance is the overflow distance plus safety margin
        setScrollDistance(Math.max(0, totalWidth - viewportWidth + 96));
      }
    };

    updateScrollDistance();
    window.addEventListener("resize", updateScrollDistance);
    const timer = setTimeout(updateScrollDistance, 500);

    return () => {
      window.removeEventListener("resize", updateScrollDistance);
      clearTimeout(timer);
    };
  }, []);

  // Track vertical scroll progress within the 320vh container
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"],
  });

  // Smooth horizontal sliding transform
  const x = useTransform(scrollYProgress, [0, 1], [0, -scrollDistance]);

  // Visual scroll progress bar percentage
  const progressPercent = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section
      id="work"
      ref={targetRef}
      className="relative h-[320vh] bg-transparent"
    >
      {/* Sticky Fullscreen Pinned Viewport */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between py-6 sm:py-8 md:py-10">
        
        {/* Top Header Bar inside the Pinned Viewport */}
        <div className="max-w-[1400px] w-full mx-auto px-6 md:px-10 flex flex-col sm:flex-row sm:items-end justify-between gap-4 z-20">
          <div>
            <div className="flex items-center gap-2.5 mb-2 sm:mb-3">
              <span className="w-2.5 h-2.5 rounded-full bg-red animate-ping" />
              <span className="text-xs font-semibold uppercase tracking-widest text-black/50">
                Selected Work • Horizontal Showcase
              </span>
            </div>
            <h2 className="font-display font-extrabold text-2xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight leading-[1.05] text-black">
              Work that speaks <span className="text-red">for itself.</span>
            </h2>
          </div>

          <div className="flex items-center gap-4 sm:gap-6">
            {/* Scroll Indicator Prompt */}
            <div className="flex items-center gap-2 text-xs font-medium text-black/50 bg-white/80 backdrop-blur-md px-4 py-2 rounded-full border border-black/8 shadow-2xs">
              <span>Scroll down to slide</span>
              <MoveRight size={14} className="text-red animate-pulse" />
            </div>

            {/* View All Button */}
            <Link
              href="/work"
              data-cursor-hover
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold bg-[#0a0a0a] text-white px-5 py-2.5 rounded-full hover:bg-red transition-colors shadow-xs group whitespace-nowrap"
            >
              <span>All 14 Works</span>
              <ArrowUpRight
                size={16}
                className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </Link>
          </div>
        </div>

        {/* Horizontal Sliding Cards Track */}
        <div className="relative w-full flex-grow flex items-center my-auto overflow-visible">
          <motion.div
            ref={trackRef}
            style={{ x }}
            className="flex items-center gap-6 sm:gap-8 md:gap-10 pl-6 sm:pl-10 md:pl-16 pr-16"
          >
            {FEATURED_PROJECTS.map((project, idx) => (
              <HorizontalProjectCard
                key={project.id}
                project={project}
                index={idx}
                total={FEATURED_PROJECTS.length}
              />
            ))}

            {/* End Finisher Card: "View All Projects" */}
            <ExploreMoreCard />
          </motion.div>
        </div>

        {/* Bottom Pinned Footer Bar with Interactive Progress Track */}
        <div className="max-w-[1400px] w-full mx-auto px-6 md:px-10 flex items-center justify-between gap-6 z-20">
          <div className="flex items-center gap-3 text-xs font-mono text-black/50">
            <span className="font-bold text-black">01</span>
            {/* Dynamic Progress Line */}
            <div className="w-24 sm:w-44 h-1.5 bg-black/10 rounded-full overflow-hidden">
              <motion.div
                style={{ width: progressPercent }}
                className="h-full bg-red rounded-full"
              />
            </div>
            <span className="font-bold text-black">05</span>
          </div>

          <div className="flex items-center gap-3 text-xs text-black/50 hidden sm:flex">
            <span>5 Featured Builds</span>
            <span className="w-1 h-1 rounded-full bg-black/30" />
            <span>US • Europe • Global Clients</span>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/work/web"
              className="text-[11px] font-semibold px-3 py-1 rounded-full bg-white border border-black/8 hover:border-black/20 text-black/70 hover:text-black transition-colors"
            >
              Shopify (12)
            </Link>
            <Link
              href="/work/app"
              className="text-[11px] font-semibold px-3 py-1 rounded-full bg-white border border-black/8 hover:border-black/20 text-black/70 hover:text-black transition-colors"
            >
              Web Apps (2)
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Individual Horizontal Project Card (Apple / Awwwards Style)
// ---------------------------------------------------------------------------
function HorizontalProjectCard({
  project,
  index,
  total,
}: {
  project: FeaturedProject;
  index: number;
  total: number;
}) {
  const { ref, inView } = useInViewHover<HTMLDivElement>();
  const MetricIcon = project.metricIcon;

  return (
    <div
      ref={ref}
      data-inview={inView}
      className="group relative w-[86vw] sm:w-[560px] md:w-[640px] lg:w-[720px] h-[64vh] sm:h-[66vh] max-h-[560px] rounded-[2rem] md:rounded-[2.5rem] bg-white border-2 border-black/10 overflow-hidden flex flex-col justify-between shadow-xl hover:shadow-2xl hover:border-red/40 transition-all duration-500 flex-shrink-0"
    >
      {/* Top macOS Browser Chrome Bar */}
      <div className="px-5 py-3.5 bg-[#f6f4ef] border-b border-black/[0.08] flex items-center justify-between gap-3 flex-shrink-0">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
        </div>

        {/* Clean URL Bar */}
        <div className="flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white border border-black/[0.08] text-[11px] text-black/60 font-mono max-w-[200px] sm:max-w-xs truncate">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse flex-shrink-0" />
          <span className="truncate">{project.liveLabel}</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="font-mono text-[10px] font-bold text-black/50">
            {project.number} / 0{total}
          </span>
          <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-black/5 text-black/60 hidden sm:inline">
            {project.type === "shopify" ? "Shopify Plus" : "Next.js"}
          </span>
        </div>
      </div>

      {/* Main Image Viewport with Hover Zoom */}
      <Link
        href={project.caseStudyUrl}
        data-cursor-hover
        className="relative flex-grow w-full overflow-hidden bg-[#111] block"
      >
        <Image
          src={project.imageUrl}
          alt={project.title}
          fill
          priority={index === 0}
          className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
          sizes="(max-width: 768px) 85vw, 720px"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

        {/* Floating Category Pill */}
        <div className="absolute top-4 left-4 z-10 pointer-events-none">
          <span className="px-3.5 py-1 rounded-full text-xs font-semibold bg-white/90 backdrop-blur-md text-black shadow-md border border-white/40">
            {project.categoryBadge}
          </span>
        </div>

        {/* Floating Metric Highlight Chip */}
        <div className="absolute bottom-4 left-4 z-10 pointer-events-none">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-black/80 backdrop-blur-md border border-white/15 text-xs font-semibold text-white shadow-lg">
            <MetricIcon size={14} className="text-red flex-shrink-0" />
            <span>{project.metric}</span>
          </div>
        </div>
      </Link>

      {/* Bottom Content & CTAs */}
      <div className="p-5 sm:p-6 bg-white flex flex-col justify-between gap-3 flex-shrink-0 border-t border-black/[0.06]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <span className="text-[11px] font-semibold uppercase tracking-wider text-black/40 block mb-0.5">
              {project.client}
            </span>
            <h3 className="font-display text-xl sm:text-2xl font-extrabold text-black group-hover:text-red transition-colors duration-200">
              <Link href={project.caseStudyUrl} data-cursor-hover>
                {project.title}
              </Link>
            </h3>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2.5 pt-2 sm:pt-0">
            <Link
              href={project.caseStudyUrl}
              data-cursor-hover
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-black hover:text-red transition-colors underline-swipe"
            >
              <span>Case Study</span>
              <ArrowUpRight size={14} />
            </Link>

            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor-hover
              className="inline-flex items-center gap-1.5 bg-[#0a0a0a] text-white text-xs font-semibold px-4 py-2 rounded-full hover:bg-red transition-colors shadow-2xs"
            >
              <span>Live Site</span>
              <ExternalLink size={12} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Final Card at the end of Horizontal Track
// ---------------------------------------------------------------------------
function ExploreMoreCard() {
  return (
    <div className="relative w-[80vw] sm:w-[400px] md:w-[460px] h-[64vh] sm:h-[66vh] max-h-[560px] rounded-[2rem] md:rounded-[2.5rem] bg-[#0a0a0a] text-white border-2 border-white/10 p-8 sm:p-10 flex flex-col justify-between shadow-2xl flex-shrink-0 overflow-hidden group">
      {/* Glowing Ambient Background */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-red/20 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20 group-hover:bg-red/30 transition-all duration-700" />

      <div>
        <div className="flex items-center gap-2 mb-4">
          <span className="w-2 h-2 rounded-full bg-red animate-ping" />
          <span className="text-[11px] font-mono tracking-widest text-white/50 uppercase">
            Full Portfolio Archive
          </span>
        </div>

        <h3 className="font-display text-3xl sm:text-4xl font-extrabold text-white leading-tight mb-4">
          Ready to see all <span className="text-red">14+ live builds?</span>
        </h3>

        <p className="text-white/60 text-sm leading-relaxed mb-6">
          Explore our complete archive of bespoke Shopify Plus themes, Next.js web applications,
          and interactive digital platforms.
        </p>

        <div className="flex flex-wrap gap-2 mb-6">
          <span className="text-xs font-medium px-3 py-1 rounded-full bg-white/10 text-white/80 border border-white/10">
            Shopify Plus
          </span>
          <span className="text-xs font-medium px-3 py-1 rounded-full bg-white/10 text-white/80 border border-white/10">
            Next.js 15
          </span>
          <span className="text-xs font-medium px-3 py-1 rounded-full bg-white/10 text-white/80 border border-white/10">
            Liquid Theme
          </span>
          <span className="text-xs font-medium px-3 py-1 rounded-full bg-white/10 text-white/80 border border-white/10">
            Web Audio API
          </span>
        </div>
      </div>

      <div className="space-y-3 z-10">
        <Link
          href="/work"
          data-cursor-hover
          className="w-full inline-flex items-center justify-center gap-2 bg-red text-white text-sm font-semibold py-3.5 px-6 rounded-full hover:bg-white hover:text-black transition-all duration-300 shadow-lg shadow-red/20 group/btn"
        >
          <span>Explore All 14 Projects</span>
          <ArrowRight
            size={16}
            className="transition-transform duration-300 group-hover/btn:translate-x-1"
          />
        </Link>

        <div className="flex items-center justify-center gap-3 pt-2 text-xs text-white/40">
          <Link href="/work/web" className="hover:text-white transition-colors">
            Web (12)
          </Link>
          <span>•</span>
          <Link href="/work/app" className="hover:text-white transition-colors">
            Apps (2)
          </Link>
          <span>•</span>
          <Link href="/contact" className="hover:text-white transition-colors">
            Hire Me →
          </Link>
        </div>
      </div>
    </div>
  );
}
