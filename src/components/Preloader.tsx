"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import LottiePlayer from "./LottiePlayer";

const PRELOAD_DURATION = 6000;

export default function Preloader({ onComplete }: { onComplete?: () => void }) {
  const [exiting, setExiting] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    const exitTimer = setTimeout(() => setExiting(true), PRELOAD_DURATION);

    // Always restore scroll on unmount — regardless of which timer fired last —
    // so an early unmount (fast nav, Fast Refresh, StrictMode remount) can never
    // leave the page permanently stuck at overflow: hidden.
    return () => {
      clearTimeout(exitTimer);
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    if (!exiting) return;
    const timer = setTimeout(() => {
      setDone(true);
      document.body.style.overflow = "";
      onComplete?.();
    }, 900);
    return () => clearTimeout(timer);
  }, [exiting, onComplete]);

  return (
    <AnimatePresence>
      {!done && (
        <div className="fixed inset-0 z-[100] pointer-events-none">
          {/* Split curtain panels */}
          <motion.div
            initial={{ y: 0 }}
            animate={exiting ? { y: "-100%" } : { y: 0 }}
            transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
            className="absolute inset-0 bg-white flex flex-col items-center justify-center"
          >
            <motion.div
              animate={exiting ? { opacity: 0, scale: 0.92 } : { opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center"
            >
              <LottiePlayer
                src="https://lottie.host/61ae61a1-2fa6-4a47-8a9f-c883c24c3f27/tcJR3AyuHz.lottie"
                width={360}
                height={360}
                loop
              />
            </motion.div>
          </motion.div>

          {/* Trailing red accent panel for a two-tone curtain feel */}
          <motion.div
            initial={{ y: 0 }}
            animate={exiting ? { y: "-100%" } : { y: 0 }}
            transition={{ duration: 0.9, delay: 0.08, ease: [0.76, 0, 0.24, 1] }}
            className="absolute inset-0 bg-red -z-10"
          />
        </div>
      )}
    </AnimatePresence>
  );
}
