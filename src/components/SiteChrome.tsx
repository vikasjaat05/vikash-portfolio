"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import CustomCursor from "./CustomCursor";
import SmoothScroll from "./SmoothScroll";
import ScrollRestoration from "./ScrollRestoration";
import Preloader from "./Preloader";
import DevToolsGuard from "./DevToolsGuard";
import CookieConsent from "./CookieConsent";
import { BackgroundAudioProvider } from "./BackgroundAudioContext";

export default function SiteChrome({ children }: { children: React.ReactNode }) {
  const [revealed, setRevealed] = useState(false);

  return (
    <BackgroundAudioProvider>
      <DevToolsGuard />
      <SmoothScroll ready={revealed} />
      <ScrollRestoration />
      <CustomCursor />
      <Preloader onComplete={() => setRevealed(true)} />
      <CookieConsent />
      <motion.div
        initial={{ opacity: 0 }}
        animate={revealed ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.div>
    </BackgroundAudioProvider>
  );
}
