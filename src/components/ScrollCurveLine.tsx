"use client";

import { motion, useScroll, useTransform } from "framer-motion";

const PATH_KEYFRAMES = [
  "M -50,120 C 250,20 550,220 850,90 S 1350,40 1650,140",
  "M -50,110 C 200,200 400,10 650,140 S 1050,240 1300,60 S 1550,180 1650,90",
  "M -50,150 C 150,30 350,260 550,60 S 900,20 1100,200 S 1400,40 1650,180",
  "M -50,90 C 300,240 500,20 800,180 S 1200,20 1400,220 S 1600,60 1650,120",
  "M -50,160 C 250,40 450,240 700,80 S 1100,220 1350,40 S 1550,140 1650,100",
];

/**
 * A sky-blue curvy line fixed near the top of the viewport, like
 * lusion.co — it doesn't travel down the page; its shape keeps morphing
 * through a longer sequence of curves as scroll progresses across the
 * whole homepage, so it reads as "alive" throughout the scroll, not just
 * in the hero.
 */
export default function ScrollCurveLine() {
  const { scrollYProgress } = useScroll();

  const morph = useTransform(scrollYProgress, [0, 0.15, 0.4, 0.65, 1], PATH_KEYFRAMES);
  const strokeOpacity = useTransform(scrollYProgress, [0, 0.04, 1], [0, 0.85, 0.85]);

  return (
    <div
      className="fixed inset-x-0 top-0 z-30 pointer-events-none mix-blend-plus-lighter"
      aria-hidden="true"
    >
      <svg
        className="absolute top-0 left-0 w-full h-[320px] md:h-[420px]"
        viewBox="0 0 1600 300"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="curveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#7dd3e8" stopOpacity="0.15" />
            <stop offset="35%" stopColor="#5ec4e0" stopOpacity="0.9" />
            <stop offset="65%" stopColor="#4ab8dc" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#7dd3e8" stopOpacity="0.15" />
          </linearGradient>
        </defs>
        <motion.path
          d={morph}
          fill="none"
          stroke="url(#curveGradient)"
          strokeWidth={7}
          strokeLinecap="round"
          style={{ opacity: strokeOpacity }}
        />
      </svg>
    </div>
  );
}
