"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";

export default function AnimatedLogo({
  onDark = false,
  className = "",
}: {
  onDark?: boolean;
  className?: string;
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link
      href="/"
      data-cursor-hover
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`group relative z-50 inline-flex items-center gap-2 sm:gap-3 select-none py-1 ${className}`}
    >
      {/* 1. Continuous Looping Calligraphic Signature (Vikash) */}
      <div className="relative flex flex-col justify-center">
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Animated SVG Signature "Vikash" with Continuous Infinite Looping Stroke */}
          <div className="relative h-9 sm:h-11 w-28 sm:w-36 flex items-center">
            {/* Ambient continuous glow halo */}
            <motion.div
              animate={{
                opacity: [0.25, 0.6, 0.25],
                scale: [0.98, 1.05, 0.98],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute inset-0 rounded-2xl bg-red/15 blur-lg pointer-events-none"
            />

            <svg
              viewBox="0 0 160 56"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-full overflow-visible drop-shadow-xs relative z-10"
            >
              <defs>
                <linearGradient id="glowLaser" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#e10600" />
                  <stop offset="50%" stopColor="#ff4d4d" />
                  <stop offset="100%" stopColor="#e10600" />
                </linearGradient>
              </defs>

              {/* Continuous Underline Swash with Traveling Pulse */}
              <motion.path
                d="M 8 46 C 45 54, 105 52, 155 42"
                stroke="url(#glowLaser)"
                strokeWidth="2.5"
                strokeLinecap="round"
                fill="none"
                animate={{
                  pathLength: [0, 1, 1, 1],
                  pathOffset: [0, 0, 0, 1],
                  opacity: [0.3, 1, 1, 0.3],
                }}
                transition={{
                  duration: 3.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  times: [0, 0.4, 0.8, 1],
                }}
              />

              {/* Letter 'V' Continuous Loop */}
              <motion.path
                d="M 12 18 C 18 10, 26 14, 26 34 C 27 46, 32 46, 38 18"
                stroke={onDark ? "#ffffff" : "#0a0a0a"}
                strokeWidth="3.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
                animate={{
                  pathLength: [0, 1, 1, 0.9],
                  opacity: [0.6, 1, 1, 0.6],
                }}
                transition={{
                  duration: 3.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  times: [0, 0.3, 0.85, 1],
                }}
              />

              {/* Letter 'i' Continuous Loop */}
              <motion.path
                d="M 38 32 C 40 32, 42 42, 45 42"
                stroke={onDark ? "#ffffff" : "#0a0a0a"}
                strokeWidth="2.8"
                strokeLinecap="round"
                fill="none"
                animate={{
                  pathLength: [0, 1, 1, 0.9],
                  opacity: [0.6, 1, 1, 0.6],
                }}
                transition={{
                  duration: 3.5,
                  repeat: Infinity,
                  delay: 0.2,
                  ease: "easeInOut",
                  times: [0, 0.3, 0.85, 1],
                }}
              />
              {/* Pulsing Dot over 'i' */}
              <motion.circle
                cx="41"
                cy="22"
                r="2.2"
                fill="#e10600"
                animate={{
                  scale: [0.8, 1.4, 0.8],
                  opacity: [0.7, 1, 0.7],
                }}
                transition={{
                  duration: 1.8,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />

              {/* Letter 'k' Continuous Loop */}
              <motion.path
                d="M 52 14 L 52 42 M 62 28 L 52 35 L 63 44"
                stroke={onDark ? "#ffffff" : "#0a0a0a"}
                strokeWidth="2.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
                animate={{
                  pathLength: [0, 1, 1, 0.9],
                  opacity: [0.6, 1, 1, 0.6],
                }}
                transition={{
                  duration: 3.5,
                  repeat: Infinity,
                  delay: 0.35,
                  ease: "easeInOut",
                  times: [0, 0.3, 0.85, 1],
                }}
              />

              {/* Letter 'a' Continuous Loop */}
              <motion.path
                d="M 76 34 C 70 30, 68 40, 75 42 C 80 42, 80 32, 80 43"
                stroke={onDark ? "#ffffff" : "#0a0a0a"}
                strokeWidth="2.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
                animate={{
                  pathLength: [0, 1, 1, 0.9],
                  opacity: [0.6, 1, 1, 0.6],
                }}
                transition={{
                  duration: 3.5,
                  repeat: Infinity,
                  delay: 0.5,
                  ease: "easeInOut",
                  times: [0, 0.3, 0.85, 1],
                }}
              />

              {/* Letter 's' Continuous Loop */}
              <motion.path
                d="M 88 33 C 94 30, 93 36, 88 38 C 86 39, 93 42, 93 44"
                stroke={onDark ? "#ffffff" : "#0a0a0a"}
                strokeWidth="2.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
                animate={{
                  pathLength: [0, 1, 1, 0.9],
                  opacity: [0.6, 1, 1, 0.6],
                }}
                transition={{
                  duration: 3.5,
                  repeat: Infinity,
                  delay: 0.65,
                  ease: "easeInOut",
                  times: [0, 0.3, 0.85, 1],
                }}
              />

              {/* Letter 'h' Continuous Loop */}
              <motion.path
                d="M 102 14 L 102 43 M 102 33 C 106 29, 114 30, 114 43"
                stroke={onDark ? "#ffffff" : "#0a0a0a"}
                strokeWidth="2.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
                animate={{
                  pathLength: [0, 1, 1, 0.9],
                  opacity: [0.6, 1, 1, 0.6],
                }}
                transition={{
                  duration: 3.5,
                  repeat: Infinity,
                  delay: 0.8,
                  ease: "easeInOut",
                  times: [0, 0.3, 0.85, 1],
                }}
              />

              {/* Trailing Loop Flourish */}
              <motion.path
                d="M 115 42 C 124 44, 138 32, 148 40"
                stroke="#e10600"
                strokeWidth="2.6"
                strokeLinecap="round"
                fill="none"
                animate={{
                  pathLength: [0, 1, 1, 0.8],
                  opacity: [0.4, 1, 1, 0.4],
                }}
                transition={{
                  duration: 3.5,
                  repeat: Infinity,
                  delay: 0.95,
                  ease: "easeInOut",
                  times: [0, 0.3, 0.85, 1],
                }}
              />
            </svg>
          </div>

          {/* 2. Bold Complementary Typographic Suffix: CHOUDHARY (Hidden on extra small mobile, visible on >=480px) */}
          <div className="hidden sm:flex flex-col justify-center pl-1 border-l border-black/15 dark:border-white/15">
            <div className="flex items-center font-display text-sm sm:text-base font-black tracking-wider leading-none">
              <motion.span
                animate={{
                  letterSpacing: ["0.04em", "0.08em", "0.04em"],
                }}
                transition={{
                  duration: 3.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className={`transition-colors ${onDark ? "text-white" : "text-[#0a0a0a]"}`}
              >
                CHOUDHARY
              </motion.span>
              <motion.span
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.7, 1, 0.7],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="text-red font-black text-xl ml-0.5"
              >
                .
              </motion.span>
            </div>

            {/* Continuous Shimmering Subtitle */}
            <motion.span
              animate={{
                opacity: [0.7, 1, 0.7],
                letterSpacing: ["0.18em", "0.26em", "0.18em"],
              }}
              transition={{
                duration: 3.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="text-[8px] sm:text-[9px] font-mono uppercase font-bold text-red mt-0.5"
            >
              WEB &amp; SHOPIFY DEV
            </motion.span>
          </div>
        </div>
      </div>
    </Link>
  );
}
