"use client";

import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, Sparkles } from "lucide-react";
import Link from "next/link";
import Magnetic from "./Magnetic";
import { useBackgroundAudio } from "./BackgroundAudioContext";
import MusicCursorToggle from "./MusicCursorToggle";

const BG_IMAGE_1 = "/images/model_1.png";
const BG_IMAGE_2 = "/images/model_aligned_2.png";

const WORDS = ["Shopify Plus", "Next.js Web Apps", "AI Prompting", "Speed Optimization", "Liquid Themes", "UI/UX Engineering"];
const START = 0.6;

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const revealLayerRef = useRef<HTMLDivElement>(null);
  const patternRef = useRef<SVGPatternElement>(null);

  const { playing, toggle, trackTitle } = useBackgroundAudio();

  const mouseRef = useRef({ x: -1000, y: -1000 });
  const smoothRef = useRef({ x: -1000, y: -1000 });
  const gridOffsetRef = useRef({ x: 0, y: 0 });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const contentY = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  useEffect(() => {
    let animId: number;
    let isRunning = true;

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
      if (smoothRef.current.x < -500) {
        smoothRef.current.x = e.clientX;
        smoothRef.current.y = e.clientY;
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        mouseRef.current.x = e.touches[0].clientX;
        mouseRef.current.y = e.touches[0].clientY;
        if (smoothRef.current.x < -500) {
          smoothRef.current.x = e.touches[0].clientX;
          smoothRef.current.y = e.touches[0].clientY;
        }
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("touchstart", handleTouchMove, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });

    const render = () => {
      if (!isRunning) return;

      const mouse = mouseRef.current;
      const smooth = smoothRef.current;

      smooth.x += (mouse.x - smooth.x) * 0.1;
      smooth.y += (mouse.y - smooth.y) * 0.1;

      const w = window.innerWidth;
      const h = window.innerHeight;
      const radius = Math.round(Math.min(440, Math.max(140, w * (w < 768 ? 0.35 : 0.16))));

      // GPU hardware-accelerated CSS radial mask
      if (revealLayerRef.current && smooth.x > -500) {
        const maskGradient = `radial-gradient(circle ${radius}px at ${smooth.x.toFixed(1)}px ${smooth.y.toFixed(1)}px, #000 0%, #000 35%, rgba(0,0,0,0.85) 55%, rgba(0,0,0,0.5) 72%, rgba(0,0,0,0.18) 88%, transparent 100%)`;
        revealLayerRef.current.style.maskImage = maskGradient;
        revealLayerRef.current.style.webkitMaskImage = maskGradient;
      }

      // Parallax Grid GPU ease
      if (patternRef.current && w > 0 && h > 0) {
        const normX = smooth.x / w - 0.5;
        const normY = smooth.y / h - 0.5;

        const targetOffsetX = normX * 16;
        const targetOffsetY = normY * 16;

        gridOffsetRef.current.x += (targetOffsetX - gridOffsetRef.current.x) * 0.06;
        gridOffsetRef.current.y += (targetOffsetY - gridOffsetRef.current.y) * 0.06;

        patternRef.current.setAttribute("x", gridOffsetRef.current.x.toFixed(2));
        patternRef.current.setAttribute("y", gridOffsetRef.current.y.toFixed(2));
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      isRunning = false;
      cancelAnimationFrame(animId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchstart", handleTouchMove);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="top"
      className="relative min-h-[92vh] sm:min-h-screen flex flex-col justify-between pt-24 sm:pt-28 pb-6 sm:pb-8 px-5 sm:px-8 md:px-12 overflow-hidden bg-white cursor-pointer"
    >
      {/* Cursor-Following Floating Audio Player Badge */}
      <MusicCursorToggle targetRef={sectionRef} />

      {/* 1. Dual-Image Interactive Spotlight Reveal Background (Mobile + Desktop Visible) */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden transform-gpu" aria-hidden="true">
        {/* Base Layer: Image 1 */}
        <div
          className="absolute inset-0 bg-cover bg-center sm:bg-center bg-no-repeat opacity-100 will-change-transform"
          style={{ backgroundImage: `url(${BG_IMAGE_1})` }}
        />

        {/* Reveal Layer: Aligned Image 2 */}
        <div
          ref={revealLayerRef}
          className="absolute inset-0 bg-cover bg-center sm:bg-center bg-no-repeat opacity-100 will-change-[mask-image,transform]"
          style={{ backgroundImage: `url(${BG_IMAGE_2})` }}
        />

        {/* Mobile Subtle Readability Gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/60 to-transparent md:from-white/50 md:via-transparent md:to-transparent pointer-events-none" />

        {/* Parallax SVG Grid */}
        <svg className="absolute inset-0 w-full h-full opacity-10 pointer-events-none">
          <defs>
            <pattern
              id="hero-grid"
              ref={patternRef}
              width="48"
              height="48"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 48 0 L 0 0 0 48"
                fill="none"
                stroke="#64748b"
                strokeWidth="0.6"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hero-grid)" />
        </svg>
      </div>

      {/* 2. Refined Typography Layout */}
      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="max-w-[1400px] mx-auto w-full relative z-10 my-auto py-2 sm:py-4"
      >
        <div className="max-w-md sm:max-w-lg bg-white/70 md:bg-transparent backdrop-blur-xs md:backdrop-blur-none p-4 sm:p-6 md:p-0 rounded-2xl border border-black/5 md:border-none shadow-xs md:shadow-none">
          {/* Top L-Corner Bracket */}
          <div className="mb-2 text-black/60">
            <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-3 h-3">
              <path d="M0 11.5V0.5H11.5" />
            </svg>
          </div>

          {/* Micro Category Tag */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/80 backdrop-blur-md border border-black/10 text-[10px] sm:text-xs font-mono font-semibold uppercase tracking-widest text-black/80 mb-3">
            <Sparkles size={11} className="text-red" />
            <span>Web &amp; Shopify Developer</span>
          </div>

          {/* Headline */}
          <h1 className="font-display font-bold leading-[1.12] tracking-tight text-2xl sm:text-3xl md:text-4xl text-black">
            Crafting high-speed web apps &amp; Shopify storefronts.
          </h1>

          {/* Bottom L-Corner Bracket */}
          <div className="mt-2 mb-2 text-black/60">
            <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-3 h-3">
              <path d="M0 0.5V11.5H11.5" />
            </svg>
          </div>

          {/* Subtext */}
          <p className="text-xs sm:text-sm text-black/80 leading-relaxed max-w-sm sm:max-w-md font-normal">
            Hi, I&apos;m <strong className="text-black font-semibold">Vikash Choudhary</strong>. I help modern brands scale with lightning-fast e-commerce stores, custom Next.js web applications, and precision UI engineering &mdash; built for speed, designed to convert.
          </p>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: START + 0.3, duration: 0.5 }}
            className="mt-5 flex flex-wrap items-center gap-3"
          >
            <Magnetic>
              <Link
                href="/contact"
                data-cursor-hover
                className="group inline-flex items-center gap-1.5 bg-[#0a0a0a] text-white font-semibold text-xs px-5 py-2.5 rounded-full hover:bg-red transition-colors duration-300 shadow-sm"
              >
                <span>Start a Project</span>
                <ArrowUpRight size={14} className="group-hover:rotate-45 transition-transform duration-300" />
              </Link>
            </Magnetic>

            <Link
              href="/work"
              data-cursor-hover
              className="inline-flex items-center gap-1.5 border border-black/15 bg-white/90 backdrop-blur-md text-black px-4 py-2.5 rounded-full text-xs font-semibold hover:border-black transition-colors"
            >
              <span>Explore Work (14)</span>
            </Link>
          </motion.div>
        </div>
      </motion.div>

      {/* 3. Infinite Marquee Ticker */}
      <div className="relative mt-3 sm:mt-4 border-t border-b border-black/10 py-2.5 sm:py-3 bg-white/85 backdrop-blur-md overflow-hidden z-10">
        <div className="flex whitespace-nowrap animate-marquee">
          {[...WORDS, ...WORDS, ...WORDS].map((w, i) => (
            <span
              key={i}
              className="font-display text-lg sm:text-2xl font-bold px-4 sm:px-6 flex items-center gap-3 sm:gap-4 text-black/25"
            >
              {w} <span className="w-1.5 h-1.5 rounded-full bg-red inline-block" />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
