"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./portfolio.module.css";

const WORDS = ["Design", "Build", "Ship"];

export default function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [count, setCount] = useState(0);
  const [wordIndex, setWordIndex] = useState(0);
  const doneRef = useRef(false);

  useEffect(() => {
    const start = performance.now();
    const duration = 2700;
    let raf = 0;

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      setCount(Math.round(t * 100));
      if (t < 1) {
        raf = requestAnimationFrame(tick);
      } else if (!doneRef.current) {
        doneRef.current = true;
        setTimeout(onComplete, 400);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [onComplete]);

  useEffect(() => {
    const id = setInterval(() => {
      setWordIndex((v) => (v + 1) % WORDS.length);
    }, 900);
    return () => clearInterval(id);
  }, []);

  return (
    <div className={`${styles.root} fixed inset-0 z-[9999] flex flex-col justify-between p-6 md:p-10`}>
      <motion.span
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className={`text-xs uppercase tracking-[0.3em] ${styles.textMuted}`}
      >
        Portfolio
      </motion.span>

      <div className="flex-1 flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.span
            key={wordIndex}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.4 }}
            className={`font-display italic text-4xl md:text-6xl lg:text-7xl ${styles.textPrimary}`}
            style={{ opacity: 0.8 }}
          >
            {WORDS[wordIndex]}
          </motion.span>
        </AnimatePresence>
      </div>

      <div className="flex items-end justify-between">
        <div className={`h-[3px] flex-1 mr-8 rounded-full overflow-hidden ${styles.bgStroke}`} style={{ opacity: 0.5 }}>
          <div
            className={`h-full ${styles.accentGradient}`}
            style={{
              transform: `scaleX(${count / 100})`,
              transformOrigin: "left",
              boxShadow: "0 0 8px rgba(137, 170, 204, 0.35)",
            }}
          />
        </div>
        <span className={`font-display text-6xl md:text-8xl lg:text-9xl tabular-nums ${styles.textPrimary}`}>
          {String(count).padStart(3, "0")}
        </span>
      </div>
    </div>
  );
}
