"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function AnimatedText({
  text,
  className = "",
}: {
  text: string;
  className?: string;
}) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.8", "end 0.2"],
  });

  const chars = text.split("");

  return (
    <p ref={ref} className={className}>
      {chars.map((char, i) => (
        <Char key={i} char={char} index={i} total={chars.length} progress={scrollYProgress} />
      ))}
    </p>
  );
}

function Char({
  char,
  index,
  total,
  progress,
}: {
  char: string;
  index: number;
  total: number;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
  const start = index / total;
  const end = start + 1 / total;
  const opacity = useTransform(progress, [start, end], [0.2, 1]);

  return (
    <span className="relative inline-block">
      <span className="invisible">{char}</span>
      <motion.span style={{ opacity }} className="absolute inset-0">
        {char}
      </motion.span>
    </span>
  );
}
