"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useSpring, useMotionValue } from "framer-motion";

const PRELOAD_DURATION = 1500; // 1.5s snappy, energetic countdown
const EXIT_DURATION = 750;     // 0.75s curtain slide
const EASE = [0.76, 0, 0.24, 1] as const;

export default function Preloader({ onComplete }: { onComplete?: () => void }) {
  const [progress, setProgress] = useState(0);
  const [exiting, setExiting] = useState(false);
  const [done, setDone] = useState(false);
  const [dimension, setDimension] = useState({ width: 0, height: 0 });
  const reduceMotion = useReducedMotion();
  const skipped = useRef(false);
  const previousBodyOverflow = useRef("");
  const previousHtmlOverflow = useRef("");

  // 3D Parallax Tilt on Cursor
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const tiltX = useSpring(useMotionValue(0), { damping: 20, stiffness: 120 });
  const tiltY = useSpring(useMotionValue(0), { damping: 20, stiffness: 120 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX - innerWidth / 2) / (innerWidth / 2);
      const y = (e.clientY - innerHeight / 2) / (innerHeight / 2);
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      tiltX.set(y * -10);
      tiltY.set(x * 10);
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY, tiltX, tiltY]);

  // Window Dimension
  useEffect(() => {
    setDimension({
      width: window.innerWidth,
      height: window.innerHeight,
    });
    const handleResize = () => {
      setDimension({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Lock scroll
  useEffect(() => {
    previousBodyOverflow.current = document.body.style.overflow;
    previousHtmlOverflow.current = document.documentElement.style.overflow;
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousBodyOverflow.current;
      document.documentElement.style.overflow = previousHtmlOverflow.current;
    };
  }, []);

  // Smooth numeric counter 0 -> 100%
  useEffect(() => {
    if (reduceMotion) {
      setProgress(100);
      setExiting(true);
      return;
    }

    const start = performance.now();
    let frame = 0;

    const tick = (now: number) => {
      if (skipped.current) return;
      const elapsed = Math.min((now - start) / PRELOAD_DURATION, 1);
      // easeOutCubic
      const eased = 1 - Math.pow(1 - elapsed, 3);
      setProgress(Math.round(eased * 100));

      if (elapsed < 1) {
        frame = requestAnimationFrame(tick);
      } else {
        setProgress(100);
        setTimeout(() => {
          if (!skipped.current) setExiting(true);
        }, 120);
      }
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [reduceMotion]);

  // Clean exit finish
  useEffect(() => {
    if (!exiting) return;
    const timer = setTimeout(() => {
      document.body.style.overflow = previousBodyOverflow.current;
      document.documentElement.style.overflow = previousHtmlOverflow.current;
      setDone(true);
      onComplete?.();
    }, reduceMotion ? 0 : EXIT_DURATION + 100);

    return () => clearTimeout(timer);
  }, [exiting, onComplete, reduceMotion]);

  // Skip handler
  const skip = useCallback(() => {
    if (exiting) return;
    skipped.current = true;
    setProgress(100);
    setExiting(true);
  }, [exiting]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") skip();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [skip]);

  if (done) return null;

  // Solid SSR fallback
  if (dimension.width === 0 || dimension.height === 0) {
    return (
      <div
        className="fixed top-0 left-0 w-full h-screen bg-[#faf8f5] z-[99999]"
        role="dialog"
        aria-modal="true"
        aria-label="Loading portfolio"
      />
    );
  }

  // Liquid SVG curve geometry in warm cream
  const curveExtra = Math.min(280, Math.max(140, dimension.height * 0.28));
  const initialPath = `M0 0 L${dimension.width} 0 L${dimension.width} ${dimension.height} Q${dimension.width / 2} ${dimension.height + curveExtra} 0 ${dimension.height} L0 0 Z`;
  const targetPath = `M0 0 L${dimension.width} 0 L${dimension.width} ${dimension.height} Q${dimension.width / 2} ${dimension.height} 0 ${dimension.height} L0 0 Z`;

  return (
    <div
      className={`fixed inset-0 z-[99999] select-none ${
        exiting ? "pointer-events-none" : "cursor-pointer"
      }`}
      role="dialog"
      aria-modal="true"
      aria-label="Loading portfolio"
      onClick={skip}
    >
      {/* LAYER 1: WARM LUXURY CREAM EDITORIAL CANVAS (#faf8f5) */}
      <motion.div
        initial={{ y: 0 }}
        animate={exiting ? { y: "-100%" } : { y: 0 }}
        transition={{ duration: EXIT_DURATION / 1000, ease: EASE }}
        className="absolute inset-0 bg-[#faf8f5] text-[#0a0a0a] flex flex-col justify-between p-6 sm:p-10 lg:p-14 z-20 shadow-2xl overflow-visible"
      >
        {/* DENNIS SNELLENBERG ELASTIC LIQUID SVG CURVE (Warm Cream) */}
        <svg
          className="absolute top-0 left-0 w-full pointer-events-none fill-[#faf8f5]"
          style={{ height: `calc(100vh + ${curveExtra}px)` }}
          viewBox={`0 0 ${dimension.width} ${dimension.height + curveExtra}`}
          preserveAspectRatio="none"
        >
          <motion.path
            initial={{ d: initialPath }}
            animate={exiting ? { d: targetPath } : { d: initialPath }}
            transition={{ duration: EXIT_DURATION / 1000, ease: EASE }}
          />
        </svg>

        {/* Ambient Subtle Crimson Glow */}
        <div
          aria-hidden="true"
          className="absolute inset-0 flex items-center justify-center pointer-events-none z-10"
        >
          <div className="w-[75vw] max-w-[700px] h-[50vh] rounded-full bg-red/[0.06] blur-[150px]" />
        </div>

        {/* TOP STATUS BAR */}
        <header className="relative z-30 flex items-center justify-between w-full font-mono text-[11px] sm:text-xs tracking-widest uppercase text-[#0a0a0a]/60">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#0a0a0a] text-white flex items-center justify-center font-display font-black text-xs shadow-md">
              VC
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red animate-pulse" />
              <span className="text-[#0a0a0a] font-bold tracking-wider">Vikash Choudhary</span>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-3 text-[10px] text-[#0a0a0a]/50 tracking-widest px-3.5 py-1.5 rounded-full bg-white border border-black/5 shadow-xs">
            <span>ALWAR, RAJASTHAN</span>
            <span>•</span>
            <span>PORTFOLIO © 2026</span>
          </div>

          <div className="text-[10px] text-[#0a0a0a]/60 tracking-wider px-3.5 py-1.5 rounded-full bg-white border border-black/10 hover:border-black/25 transition-all shadow-xs">
            <span>Click / ESC to Skip</span>
          </div>
        </header>

        {/* CENTER STAGE: 3D FLOATING LUXURY CRYSTAL CAPSULE */}
        <main className="relative z-30 my-auto flex flex-col items-center justify-center text-center py-4 w-full max-w-2xl mx-auto">
          <motion.div
            style={{
              rotateX: reduceMotion ? 0 : tiltX,
              rotateY: reduceMotion ? 0 : tiltY,
              transformStyle: "preserve-3d",
            }}
            animate={
              exiting
                ? { opacity: 0, scale: 0.94, y: -30, transition: { duration: 0.35, ease: "easeIn" } }
                : { opacity: 1, scale: 1, y: 0 }
            }
            className="w-full relative flex flex-col items-center p-8 sm:p-12 rounded-3xl bg-white/80 border border-black/10 backdrop-blur-xl shadow-[0_20px_60px_rgba(0,0,0,0.06)]"
          >
            {/* Animated Laser Stroke Signature Monogram */}
            <div className="relative mb-5 flex items-center justify-center">
              <svg
                viewBox="0 0 100 80"
                fill="none"
                aria-hidden="true"
                className="w-20 sm:w-24 h-auto overflow-visible"
              >
                {/* Background Shadow Path */}
                <path
                  d="M15 15 L50 68 L85 15"
                  stroke="rgba(0,0,0,0.08)"
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                {/* Laser Red Drawing Stroke */}
                <motion.path
                  d="M15 15 L50 68 L85 15"
                  stroke="#e10600"
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: Math.min(1, progress / 90) }}
                  transition={{ duration: 0.1, ease: "linear" }}
                  style={{
                    filter: "drop-shadow(0 0 8px rgba(225,6,0,0.5))",
                  }}
                />
              </svg>
            </div>

            {/* Discipline Eyebrow Badge */}
            <div className="inline-flex items-center gap-2 mb-3 px-3.5 py-1 rounded-full bg-[#faf8f5] border border-black/10">
              <span className="w-1.5 h-1.5 rounded-full bg-red animate-pulse" />
              <span className="font-mono text-[10px] sm:text-[11px] font-semibold tracking-[0.22em] uppercase text-[#0a0a0a]/80">
                Creative Web & Shopify Developer
              </span>
            </div>

            {/* Architectural Signature Title */}
            <h1 className="font-display font-black text-3xl sm:text-5xl md:text-6xl tracking-tight text-[#0a0a0a] uppercase mb-4">
              Vikash Choudhary
            </h1>

            {/* Colossal Numeric Display */}
            <div className="font-display font-black text-5xl sm:text-7xl md:text-8xl tracking-tight text-[#0a0a0a] flex items-baseline justify-center my-2 tabular-nums">
              <span>{progress.toString().padStart(3, "0")}</span>
              <span className="text-red font-light text-2xl sm:text-4xl ml-1">%</span>
            </div>

            {/* Sleek Liquid Gradient Progress Track */}
            <div className="w-full max-w-xs h-[3px] bg-black/10 rounded-full overflow-hidden mt-3 mb-3">
              <div
                className="h-full bg-gradient-to-r from-red via-[#ff4d4d] to-red rounded-full transition-[width] duration-100 ease-out shadow-[0_0_12px_rgba(225,6,0,0.5)]"
                style={{ width: `${progress}%` }}
              />
            </div>

            {/* Status Feedback */}
            <p className="font-mono text-xs text-[#0a0a0a]/50 tracking-widest uppercase">
              {progress < 100 ? "Building Digital Experience..." : "Portfolio Ready • Welcome"}
            </p>
          </motion.div>
        </main>

        {/* BOTTOM SECTION */}
        <footer className="relative z-30 flex items-end justify-between w-full font-mono text-[10px] sm:text-xs tracking-widest uppercase text-[#0a0a0a]/50">
          <div>
            <span className="text-black/30 block text-[9px] mb-0.5">DISCIPLINE</span>
            <span className="text-[#0a0a0a] font-semibold">Shopify Plus • Liquid 3D • Next.js</span>
          </div>

          <div className="text-right">
            <span className="text-black/30 block text-[9px] mb-0.5">STATUS</span>
            <span className="text-[#0a0a0a] font-semibold">ONLINE • 2026 EDITION</span>
          </div>
        </footer>
      </motion.div>

      {/* LAYER 2: TRAILING SIGNATURE CRIMSON CURTAIN (Two-Tone Red Flash Reveal) */}
      <motion.div
        initial={{ y: 0 }}
        animate={exiting ? { y: "-100%" } : { y: 0 }}
        transition={{ duration: EXIT_DURATION / 1000, delay: 0.08, ease: EASE }}
        className="absolute inset-0 bg-red z-10"
      />
    </div>
  );
}
