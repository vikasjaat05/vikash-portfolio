"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, animate } from "framer-motion";

export default function Counter({
  to,
  suffix = "",
  duration = 1.6,
  decimals,
}: {
  to: number;
  suffix?: string;
  duration?: number;
  decimals?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const [value, setValue] = useState(0);
  const isFractional = decimals !== undefined ? decimals > 0 : !Number.isInteger(to);
  const precision = decimals !== undefined ? decimals : (isFractional ? 1 : 0);

  useEffect(() => {
    if (!isInView) return;
    const controls = animate(0, to, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setValue(v),
    });
    return () => controls.stop();
  }, [isInView, to, duration]);

  return (
    <motion.span ref={ref}>
      {precision > 0 ? value.toFixed(precision) : Math.round(value)}
      {suffix}
    </motion.span>
  );
}
