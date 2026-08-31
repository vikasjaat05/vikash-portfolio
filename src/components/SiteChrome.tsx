"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import CustomCursor from "./CustomCursor";
import SmoothScroll from "./SmoothScroll";
import ScrollRestoration from "./ScrollRestoration";
import DevToolsGuard from "./DevToolsGuard";
import CookieConsent from "./CookieConsent";
import { BackgroundAudioProvider } from "./BackgroundAudioContext";
import FloatingDock from "./FloatingDock";
import AppInstallPrompt from "./AppInstallPrompt";

export default function SiteChrome({ children }: { children: React.ReactNode }) {
  const [revealed, setRevealed] = useState(true);

  return (
    <BackgroundAudioProvider>
      <DevToolsGuard />
      <SmoothScroll ready={revealed} />
      <ScrollRestoration />
      <CustomCursor />
      <CookieConsent />
      <FloatingDock />
      <AppInstallPrompt />
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.div>
    </BackgroundAudioProvider>
  );
}
