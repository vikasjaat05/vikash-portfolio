"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ReactNode } from "react";

interface FadeSectionProps {
  children: ReactNode;
  className?: string;
  disableY?: boolean;
  fadeOffset?: number;
  disableExit?: boolean;
  isTop?: boolean;
  thresholds?: [number, number, number, number];
}

export default function FadeSection({
  children,
  className = "",
  disableY = false,
  fadeOffset = 0.08,
  disableExit = true,
  isTop = false,
  thresholds,
}: FadeSectionProps) {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: isTop ? ["start start", "end start"] : ["start end", "end start"],
  });

  // For top/hero sections: start fully visible at scroll 0, fade out smoothly on exit
  const topRange = [0, 0.6, 1];
  const topOpacityValues = [1, 1, 0];
  const topYValues = disableY ? [0, 0, 0] : [0, 0, -20];

  // For mid/bottom sections: fade in on entry from bottom smoothly, keep stable once entered
  const standardRange = thresholds || (disableExit
    ? [0, fadeOffset, 1, 1]
    : [0, fadeOffset, 1 - fadeOffset, 1]);

  const standardOpacityValues = disableExit ? [0, 1, 1, 1] : [0, 1, 1, 0];
  const standardYValues = disableY
    ? [0, 0, 0, 0]
    : disableExit
    ? [20, 0, 0, 0]
    : [20, 0, 0, -20];

  const range = isTop ? topRange : standardRange;
  const opacityValues = isTop ? topOpacityValues : standardOpacityValues;
  const yValues = isTop ? topYValues : standardYValues;

  const opacity = useTransform(scrollYProgress, range, opacityValues);
  const y = useTransform(scrollYProgress, range, yValues);

  return (
    <motion.div
      ref={ref}
      style={{
        opacity,
        ...(disableY ? {} : { y }),
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
