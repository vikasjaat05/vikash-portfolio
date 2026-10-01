"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  ExternalLink,
  Zap,
  TrendingUp,
  Sparkles,
  ArrowRight,
  MoveRight,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useInViewHover } from "./useInViewHover";
import { getLenisInstance } from "./lenisInstance";

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
  themeColor: string;
  glowAccent: string;
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
    themeColor: "rgba(224, 184, 133, 0.22)",
    glowAccent: "rgba(224, 184, 133, 0.45)",
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
    themeColor: "rgba(16, 185, 129, 0.22)",
    glowAccent: "rgba(16, 185, 129, 0.45)",
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
    themeColor: "rgba(139, 92, 246, 0.24)",
    glowAccent: "rgba(139, 92, 246, 0.5)",
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
    themeColor: "rgba(6, 182, 212, 0.24)",
    glowAccent: "rgba(6, 182, 212, 0.5)",
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
    themeColor: "rgba(244, 63, 94, 0.24)",
    glowAccent: "rgba(244, 63, 94, 0.5)",
  },
];

const TOTAL_CARDS = FEATURED_PROJECTS.length + 1; // 5 projects + 1 Explore More card

const CARD_THEMES = [
  ...FEATURED_PROJECTS.map((p) => p.themeColor),
  "rgba(255, 30, 0, 0.25)",
];

export default function Work() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const auraRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const [activeIndex, setActiveIndex] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Smooth scroll jump to a specific card
  const scrollToCard = useCallback((targetIdx: number) => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    const scrollTop = window.scrollY + rect.top;
    const totalScrollable = sectionRef.current.offsetHeight - window.innerHeight;
    if (totalScrollable <= 0) return;

    const clampedIdx = Math.max(0, Math.min(TOTAL_CARDS - 1, targetIdx));
    const targetRatio = clampedIdx / (TOTAL_CARDS - 1);
    const targetY = scrollTop + targetRatio * totalScrollable;

    const lenis = getLenisInstance();
    if (lenis) {
      lenis.scrollTo(targetY, { duration: 1.2 });
    } else {
      window.scrollTo({ top: targetY, behavior: "smooth" });
    }
  }, []);

  // 3D Orbit Carousel calculation with Pure Inertia & Zero Blur (Ultra Crisp 4K Rendering)
  useEffect(() => {
    let animationFrameId: number;
    let targetProgress = 0;
    let currentProgress = 0;

    const renderLoop = () => {
      const section = sectionRef.current;
      const stage = stageRef.current;
      if (!section || !stage) {
        animationFrameId = requestAnimationFrame(renderLoop);
        return;
      }

      const rect = section.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const viewportWidth = window.innerWidth;
      const totalScrollable = section.offsetHeight - viewportHeight;

      if (totalScrollable > 0) {
        targetProgress = Math.min(1, Math.max(0, -rect.top / totalScrollable));
      }

      // Smooth inertia lerp (GSAP scrub feel)
      const lerpFactor = 0.11;
      currentProgress += (targetProgress - currentProgress) * lerpFactor;

      if (Math.abs(targetProgress - currentProgress) < 0.0001) {
        currentProgress = targetProgress;
      }

      setScrollProgress(currentProgress);

      // Card geometry parameters
      const isMobile = viewportWidth < 640;
      const isTablet = viewportWidth >= 640 && viewportWidth < 1024;

      const cardWidth = isMobile
        ? Math.min(viewportWidth * 0.9, 390)
        : isTablet
        ? 600
        : Math.min(viewportWidth * 0.54, 760);

      // Calibrated orbit parameters (subtle, high-end, zero distortion)
      const orbitPx = Math.max(isMobile ? 200 : 280, cardWidth * 0.58);
      const perspPx = Math.max(1000, cardWidth * 2.6);
      const gapPx = isMobile ? 36 : Math.min(120, Math.max(48, cardWidth * 0.14));
      const pitchPx = cardWidth + gapPx;
      const totalSpan = (TOTAL_CARDS - 1) * pitchPx;

      stage.style.perspective = `${perspPx}px`;

      // Current head position along the track
      const head = currentProgress * totalSpan;

      // Identify active index closest to center
      const currentActive = Math.min(
        TOTAL_CARDS - 1,
        Math.max(0, Math.round(head / pitchPx))
      );
      setActiveIndex(currentActive);

      // Update ambient background backlight
      if (auraRef.current) {
        const auraColor = CARD_THEMES[currentActive] || CARD_THEMES[0];
        auraRef.current.style.backgroundColor = auraColor;
      }

      // Controlled luxury rotation angles (smooth, legible, NOT distorted)
      const rotSpan = cardWidth * 1.1;
      const maxRotX = isMobile ? 18 : 22; // Controlled tilt
      const maxRotY = isMobile ? 6 : 8;   // Subtle amphitheatre curve

      const cardDistances: { idx: number; absDist: number }[] = [];

      for (let i = 0; i < TOTAL_CARDS; i++) {
        const el = cardRefs.current[i];
        if (!el) continue;

        // Position relative to center screen (u == 0 at center)
        const u = i * pitchPx - head;
        const absDist = Math.abs(u);
        cardDistances.push({ idx: i, absDist });

        // Normalized factor from -1 (left) to +1 (right)
        const rawT = Math.max(-1, Math.min(1, u / rotSpan));

        // Power1 easeInOut curve
        const pNorm = (rawT + 1) / 2;
        const easedP =
          pNorm < 0.5
            ? 2 * pNorm * pNorm
            : 1 - Math.pow(-2 * pNorm + 2, 2) / 2;
        const easedT = (easedP - 0.5) * 2;

        // 3D Rotations
        const rotX = -easedT * maxRotX;
        const rotY = -easedT * maxRotY;

        // Distance ratio from center
        const distRatio = absDist / (cardWidth * 1.1);

        // Scale factor: subtle scale down as cards recede
        const scale = Math.max(0.86, Math.min(1.0, 1 - distRatio * 0.14));

        // Z-axis displacement into distance
        const zTranslate = -Math.abs(easedT) * (isMobile ? 80 : 120);

        // Opacity falloff without blur (keeps cards 100% razor sharp!)
        const opacity =
          distRatio > 2.4
            ? 0
            : Math.max(0.35, Math.min(1, 1 - Math.pow(distRatio / 2.2, 2) * 0.65));

        // Card corner radius
        const cornerRadius = Math.round(
          Math.max(isMobile ? 24 : 32, 40 - distRatio * 12)
        );

        // Apply hardware-accelerated 3D transform (CRITICAL: ZERO FILTER / ZERO BLUR)
        el.style.transformOrigin = `50% 50% -${orbitPx}px`;
        el.style.transform = `translate3d(calc(-50% + ${u}px), -50%, ${zTranslate}px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale(${scale})`;
        el.style.opacity = `${opacity}`;
        el.style.borderRadius = `${cornerRadius}px`;
        el.style.filter = "none"; // ZERO BLUR — 100% Crisp Images!
        el.style.pointerEvents = absDist < cardWidth * 0.85 ? "auto" : "none";
      }

      // Restack: center card has highest z-index
      cardDistances.sort((a, b) => b.absDist - a.absDist);
      cardDistances.forEach((item, rank) => {
        const el = cardRefs.current[item.idx];
        if (el) {
          el.style.zIndex = `${rank + 2}`;
        }
      });

      animationFrameId = requestAnimationFrame(renderLoop);
    };

    animationFrameId = requestAnimationFrame(renderLoop);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // Keyboard navigation support (ArrowLeft / ArrowRight)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const inView = rect.top < window.innerHeight * 0.8 && rect.bottom > window.innerHeight * 0.2;
      if (!inView) return;

      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        if (activeIndex < TOTAL_CARDS - 1) {
          e.preventDefault();
          scrollToCard(activeIndex + 1);
        }
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        if (activeIndex > 0) {
          e.preventDefault();
          scrollToCard(activeIndex - 1);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeIndex, scrollToCard]);

  const activeProjectTitle =
    activeIndex < FEATURED_PROJECTS.length
      ? FEATURED_PROJECTS[activeIndex].title
      : "Full Archive & Live Projects";

  return (
    <section
      id="work"
      ref={sectionRef}
      className="relative h-[390vh] bg-transparent"
    >
      {/* Sticky Fullscreen Pinned Viewport */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between pt-24 pb-6 sm:pb-8">
        
        {/* Dynamic Ambient Backlight Aura */}
        <div
          ref={auraRef}
          style={{
            transition: "background-color 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
          className="absolute inset-x-0 top-1/2 -translate-y-1/2 mx-auto w-[90vw] max-w-[850px] h-[55vh] max-h-[520px] rounded-full blur-[130px] pointer-events-none z-0 opacity-75"
        />

        {/* Top Header Bar inside the Pinned Viewport */}
        <div className="max-w-[1400px] w-full mx-auto px-6 md:px-10 flex flex-col sm:flex-row sm:items-end justify-between gap-4 z-30 pointer-events-auto">
          <div>
            <div className="flex items-center gap-2.5 mb-2.5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red" />
              </span>
              <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#0a0a0a]/60">
                Selected Work • Horizontal Showcase
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight leading-[1.05] text-[#0a0a0a] font-normal">
              Work that speaks{" "}
              <span className="font-instrument italic font-normal text-red">
                for itself.
              </span>
            </h2>
          </div>

          <div className="flex items-center gap-3 sm:gap-5">
            {/* Scroll Indicator Prompt */}
            <div className="hidden sm:flex items-center gap-2 text-xs font-medium text-[#0a0a0a]/70 bg-white/80 backdrop-blur-md px-4 py-2 rounded-full border border-black/8 shadow-2xs">
              <span>Scroll down to slide</span>
              <MoveRight size={14} className="text-red animate-pulse" />
            </div>

            {/* View All Button */}
            <Link
              href="/work"
              data-cursor-hover
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold bg-[#0a0a0a] text-white px-5 py-2.5 rounded-full hover:bg-red transition-all duration-300 shadow-sm group whitespace-nowrap"
            >
              <span>All 14 Works</span>
              <ArrowUpRight
                size={16}
                className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </Link>
          </div>
        </div>

        {/* 3D Orbit Stage */}
        <div
          ref={stageRef}
          style={{
            transformStyle: "preserve-3d",
          }}
          className="relative w-full flex-grow flex items-center justify-center my-auto overflow-visible py-2 select-none z-10"
        >
          {/* Floating Navigation Controls (Prev / Next) */}
          <button
            type="button"
            onClick={() => scrollToCard(activeIndex - 1)}
            disabled={activeIndex === 0}
            aria-label="Previous Project"
            className="hidden lg:flex absolute left-8 top-1/2 -translate-y-1/2 z-40 w-12 h-12 rounded-full items-center justify-center bg-white/90 backdrop-blur-md border border-black/10 text-[#0a0a0a] shadow-xl hover:bg-black hover:text-white hover:border-black transition-all duration-300 disabled:opacity-0 disabled:pointer-events-none active:scale-95 group"
          >
            <ChevronLeft size={20} className="transition-transform group-hover:-translate-x-0.5" />
          </button>

          <button
            type="button"
            onClick={() => scrollToCard(activeIndex + 1)}
            disabled={activeIndex === TOTAL_CARDS - 1}
            aria-label="Next Project"
            className="hidden lg:flex absolute right-8 top-1/2 -translate-y-1/2 z-40 w-12 h-12 rounded-full items-center justify-center bg-white/90 backdrop-blur-md border border-black/10 text-[#0a0a0a] shadow-xl hover:bg-black hover:text-white hover:border-black transition-all duration-300 disabled:opacity-0 disabled:pointer-events-none active:scale-95 group"
          >
            <ChevronRight size={20} className="transition-transform group-hover:translate-x-0.5" />
          </button>

          {/* Card 0 to 4: Featured Projects */}
          {FEATURED_PROJECTS.map((project, idx) => (
            <div
              key={project.id}
              ref={(el) => {
                cardRefs.current[idx] = el;
              }}
              onClick={() => {
                if (activeIndex !== idx) {
                  scrollToCard(idx);
                }
              }}
              style={{
                position: "absolute",
                left: "50%",
                top: "50%",
                transformStyle: "preserve-3d",
                backfaceVisibility: "hidden",
                WebkitBackfaceVisibility: "hidden",
                willChange: "transform, opacity",
                margin: 0,
              }}
              className="cursor-pointer group/card"
            >
              <HorizontalProjectCard
                project={project}
                index={idx}
                total={FEATURED_PROJECTS.length}
                isActive={activeIndex === idx}
              />
            </div>
          ))}

          {/* Card 5: End Finisher "Explore More" Card */}
          <div
            ref={(el) => {
              cardRefs.current[FEATURED_PROJECTS.length] = el;
            }}
            onClick={() => {
              if (activeIndex !== FEATURED_PROJECTS.length) {
                scrollToCard(FEATURED_PROJECTS.length);
              }
            }}
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              transformStyle: "preserve-3d",
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
              willChange: "transform, opacity",
              margin: 0,
            }}
            className="cursor-pointer group/card"
          >
            <ExploreMoreCard isActive={activeIndex === FEATURED_PROJECTS.length} />
          </div>
        </div>

        {/* Bottom Pinned Footer Bar with Interactive Progress Track & Dots */}
        <div className="max-w-[1400px] w-full mx-auto px-6 md:px-10 flex items-center justify-between gap-6 z-30 pointer-events-auto">
          <div className="flex items-center gap-3 text-xs font-mono text-black/60 bg-white/80 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-black/8 shadow-2xs">
            <span className="font-bold text-[#0a0a0a] min-w-[20px]">
              0{activeIndex + 1}
            </span>

            {/* Dynamic Progress Line */}
            <div className="w-24 sm:w-40 h-1.5 bg-black/10 rounded-full overflow-hidden">
              <div
                style={{ width: `${Math.round(scrollProgress * 100)}%` }}
                className="h-full bg-red rounded-full transition-all duration-75"
              />
            </div>

            <span className="font-bold text-[#0a0a0a]">0{TOTAL_CARDS}</span>

            {/* Clickable Quick Jump Dots */}
            <div className="hidden md:flex items-center gap-1.5 ml-1">
              {Array.from({ length: TOTAL_CARDS }).map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => scrollToCard(i)}
                  aria-label={`Jump to slide ${i + 1}`}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    activeIndex === i
                      ? "w-5 bg-red"
                      : "w-2 bg-black/20 hover:bg-black/40"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Active Project Title Pill */}
          <div className="hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 backdrop-blur-md border border-black/8 text-xs font-medium text-[#0a0a0a] shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-red animate-pulse" />
            <span className="font-semibold">{activeProjectTitle}</span>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/work/web"
              className="text-[11px] font-semibold px-3 py-1 rounded-full bg-white/80 backdrop-blur-md border border-black/8 text-[#0a0a0a]/80 hover:text-[#0a0a0a] transition-all shadow-2xs"
            >
              Shopify (12)
            </Link>
            <Link
              href="/work/app"
              className="text-[11px] font-semibold px-3 py-1 rounded-full bg-white/80 backdrop-blur-md border border-black/8 text-[#0a0a0a]/80 hover:text-[#0a0a0a] transition-all shadow-2xs"
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
// ULTRA-PREMIUM PRODUCT CARD (Crystal-Clear 4K Razor Sharp Rendering)
// ---------------------------------------------------------------------------
function HorizontalProjectCard({
  project,
  index,
  total,
  isActive,
}: {
  project: FeaturedProject;
  index: number;
  total: number;
  isActive: boolean;
}) {
  const { ref, inView } = useInViewHover<HTMLDivElement>();
  const MetricIcon = project.metricIcon;

  // Interactive micro-tilt on mouse move
  const [mouseTilt, setMouseTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isActive) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const xPct = (e.clientX - rect.left) / rect.width - 0.5;
    const yPct = (e.clientY - rect.top) / rect.height - 0.5;

    setMouseTilt({
      x: -yPct * 5,
      y: xPct * 5,
    });
  };

  const handleMouseLeave = () => {
    setMouseTilt({ x: 0, y: 0 });
  };

  return (
    <div
      ref={ref}
      data-inview={inView}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`group relative w-[90vw] sm:w-[580px] md:w-[660px] lg:w-[760px] h-[56vh] sm:h-[60vh] max-h-[520px] bg-white rounded-[2rem] sm:rounded-[2.4rem] overflow-hidden flex flex-col justify-between select-none ${
        isActive ? "shadow-2xl" : "shadow-lg hover:shadow-xl"
      }`}
      style={{
        border: isActive
          ? "1.5px solid rgba(0, 0, 0, 0.12)"
          : "1.5px solid rgba(0, 0, 0, 0.08)",
        boxShadow: isActive
          ? `0 35px 80px -20px rgba(0, 0, 0, 0.22), 0 0 0 1px rgba(0, 0, 0, 0.05), 0 0 50px ${project.glowAccent}`
          : `0 20px 50px -15px rgba(0, 0, 0, 0.12), 0 0 0 1px rgba(0, 0, 0, 0.04)`,
        transform: isActive
          ? `perspective(1000px) rotateX(${mouseTilt.x}deg) rotateY(${mouseTilt.y}deg)`
          : undefined,
        transition: "transform 0.22s ease-out, box-shadow 0.4s ease, border-color 0.3s ease",
        WebkitFontSmoothing: "antialiased",
      }}
    >
      {/* Top macOS Browser Chrome Bar */}
      <div className="px-5 sm:px-6 py-3 bg-[#f8f7f4] border-b border-black/[0.07] flex items-center justify-between gap-3 flex-shrink-0 z-20">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56] shadow-xs" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e] shadow-xs" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f] shadow-xs" />
        </div>

        {/* Clean URL Bar */}
        <div className="flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white border border-black/[0.08] text-[11px] text-black/75 font-mono max-w-[200px] sm:max-w-xs truncate shadow-2xs">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse flex-shrink-0" />
          <span className="truncate font-medium">{project.liveLabel}</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="font-mono text-[10px] font-bold text-black/50">
            {project.number} / 0{total}
          </span>
          <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-black/5 text-black/70 border border-black/[0.05] hidden sm:inline">
            {project.categoryBadge}
          </span>
        </div>
      </div>

      {/* Main Image Viewport (100% Razor Sharp, No Margins, No Blur) */}
      <Link
        href={project.caseStudyUrl}
        data-cursor-hover
        className="relative flex-grow w-full overflow-hidden bg-[#121214] block"
        style={{
          isolation: "isolate",
          transform: "translateZ(0)",
          WebkitBackfaceVisibility: "hidden",
        }}
      >
        <Image
          src={project.imageUrl}
          alt={project.title}
          fill
          priority={index <= 1}
          className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-103"
          sizes="(max-width: 768px) 90vw, 760px"
          style={{
            imageRendering: "-webkit-optimize-contrast",
          }}
        />

        {/* Subtle shadow vignette on image edge */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

        {/* Floating Metric Highlight Chip */}
        <div className="absolute bottom-3.5 left-4 z-10 pointer-events-none">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-black/85 backdrop-blur-md border border-white/20 text-xs font-semibold text-white shadow-xl">
            <MetricIcon size={14} className="text-red flex-shrink-0" />
            <span>{project.metric}</span>
          </div>
        </div>
      </Link>

      {/* Bottom Editorial Content & Action Buttons */}
      <div className="p-4 sm:p-5 bg-white border-t border-black/[0.07] flex flex-col justify-between gap-2 flex-shrink-0 z-20">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <span className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-black/45 block mb-0.5">
              {project.client}
            </span>
            <h3 className="font-display text-lg sm:text-xl md:text-2xl font-extrabold text-black group-hover:text-red transition-colors duration-200">
              <Link href={project.caseStudyUrl} data-cursor-hover>
                {project.title}
              </Link>
            </h3>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2.5 pt-1 sm:pt-0">
            <Link
              href={project.caseStudyUrl}
              data-cursor-hover
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-black/75 hover:text-black bg-black/[0.04] hover:bg-black/10 border border-black/8 px-4 py-2 rounded-full transition-all duration-200 shadow-2xs hover:scale-105"
            >
              <span>Case Study</span>
              <ArrowUpRight size={14} />
            </Link>

            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor-hover
              className="inline-flex items-center gap-1.5 bg-red hover:bg-[#b30500] text-white text-xs font-semibold px-4.5 py-2 rounded-full transition-all duration-300 shadow-md shadow-red/25 hover:shadow-lg hover:scale-105"
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
// ULTRA-PREMIUM OBSIDIAN FINISHER CARD
// ---------------------------------------------------------------------------
function ExploreMoreCard({ isActive }: { isActive: boolean }) {
  const [mouseTilt, setMouseTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isActive) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const xPct = (e.clientX - rect.left) / rect.width - 0.5;
    const yPct = (e.clientY - rect.top) / rect.height - 0.5;

    setMouseTilt({
      x: -yPct * 5,
      y: xPct * 5,
    });
  };

  const handleMouseLeave = () => {
    setMouseTilt({ x: 0, y: 0 });
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`group relative w-[90vw] sm:w-[420px] md:w-[480px] h-[56vh] sm:h-[60vh] max-h-[520px] bg-[#0c0c0e] text-white rounded-[2rem] sm:rounded-[2.4rem] p-6 sm:p-8 flex flex-col justify-between overflow-hidden select-none ${
        isActive ? "shadow-2xl" : "shadow-lg"
      }`}
      style={{
        border: isActive
          ? "1.5px solid rgba(255, 255, 255, 0.2)"
          : "1.5px solid rgba(255, 255, 255, 0.1)",
        boxShadow: isActive
          ? "0 35px 80px -20px rgba(0, 0, 0, 0.5), 0 0 50px rgba(225, 6, 0, 0.35)"
          : "0 20px 50px -15px rgba(0, 0, 0, 0.4)",
        transform: isActive
          ? `perspective(1000px) rotateX(${mouseTilt.x}deg) rotateY(${mouseTilt.y}deg)`
          : undefined,
        transition: "transform 0.22s ease-out, box-shadow 0.4s ease, border-color 0.3s ease",
      }}
    >
      {/* Glowing Ambient Crimson Background */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-red/25 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20 group-hover:bg-red/35 transition-all duration-700" />

      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-3">
          <span className="w-2 h-2 rounded-full bg-red animate-ping" />
          <span className="text-[11px] font-mono tracking-widest text-white/60 uppercase">
            Full Portfolio Archive
          </span>
        </div>

        <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-white leading-tight mb-3">
          Ready to see all <span className="text-red">14+ live builds?</span>
        </h3>

        <p className="text-white/70 text-xs sm:text-sm leading-relaxed mb-4">
          Explore our complete archive of bespoke Shopify Plus themes, Next.js web applications,
          and interactive digital platforms.
        </p>

        <div className="flex flex-wrap gap-2 mb-4">
          <span className="text-xs font-medium px-3 py-1 rounded-full bg-white/10 text-white/90 border border-white/10">
            Shopify Plus
          </span>
          <span className="text-xs font-medium px-3 py-1 rounded-full bg-white/10 text-white/90 border border-white/10">
            Next.js 15
          </span>
          <span className="text-xs font-medium px-3 py-1 rounded-full bg-white/10 text-white/90 border border-white/10">
            Liquid Theme
          </span>
          <span className="text-xs font-medium px-3 py-1 rounded-full bg-white/10 text-white/90 border border-white/10">
            Web Audio API
          </span>
        </div>
      </div>

      <div className="space-y-3 z-10 relative">
        <Link
          href="/work"
          data-cursor-hover
          className="w-full inline-flex items-center justify-center gap-2 bg-red hover:bg-[#b30500] text-white text-sm font-semibold py-3.5 px-5 rounded-full shadow-xl shadow-red/30 transition-all duration-300 group/btn"
        >
          <span>Explore All 14 Projects</span>
          <ArrowRight
            size={16}
            className="transition-transform duration-300 group-hover/btn:translate-x-1"
          />
        </Link>

        <div className="flex items-center justify-center gap-3 pt-1 text-xs text-white/50">
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
