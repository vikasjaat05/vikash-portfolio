"use client";

import { useState } from "react";
import CustomCursor from "./CustomCursor";
import SmoothScroll from "./SmoothScroll";
import ScrollRestoration from "./ScrollRestoration";
import Preloader from "./Preloader";
import DevToolsGuard from "./DevToolsGuard";
import CookieConsent from "./CookieConsent";
import AppInstallPrompt from "./AppInstallPrompt";
import LocalAgencyThemeSync from "./LocalAgencyThemeSync";
import { BackgroundAudioProvider } from "./BackgroundAudioContext";

export default function SiteChrome({ children }: { children: React.ReactNode }) {
  const [revealed, setRevealed] = useState(false);

  return (
    <BackgroundAudioProvider>
      <LocalAgencyThemeSync />
      <Preloader onComplete={() => setRevealed(true)} />
      <DevToolsGuard />
      <SmoothScroll ready={revealed} />
      <ScrollRestoration />
      <CustomCursor />
      <CookieConsent />
      <AppInstallPrompt />
      {children}
    </BackgroundAudioProvider>
  );
}
