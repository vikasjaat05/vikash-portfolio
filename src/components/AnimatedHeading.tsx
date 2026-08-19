"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

const MotionH1 = motion.create("h1");
const MotionH2 = motion.create("h2");
const MotionH3 = motion.create("h3");

const TAGS = {
  h1: MotionH1,
  h2: MotionH2,
  h3: MotionH3,
} as const;

export default function AnimatedHeading({
  children,
  as = "h1",
  className = "",
  delay = 0,
  mode = "scroll",
}: {
  children: ReactNode;
  as?: keyof typeof TAGS;
  className?: string;
  delay?: number;
  /** "scroll" reveals when it enters the viewport; "load" reveals immediately (use for above-the-fold heroes). */
  mode?: "scroll" | "load";
}) {
  const MotionTag = TAGS[as];

  const scrollProps =
    mode === "scroll"
      ? {
          initial: { y: "110%", opacity: 0 },
          whileInView: { y: 0, opacity: 1 },
          viewport: { once: true, margin: "-80px" },
        }
      : {
          initial: { y: "110%", opacity: 0 },
          animate: { y: 0, opacity: 1 },
        };

  return (
    <div className="overflow-hidden">
      <MotionTag
        {...scrollProps}
        transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
        className={className}
      >
        {children}
      </MotionTag>
    </div>
  );
}
