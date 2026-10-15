"use client";

import CustomCursor from "./CustomCursor";
import SmoothScroll from "./SmoothScroll";
import ScrollRestoration from "./ScrollRestoration";
import DevToolsGuard from "./DevToolsGuard";
import CookieConsent from "./CookieConsent";
import AppInstallPrompt from "./AppInstallPrompt";
import LocalAgencyThemeSync from "./LocalAgencyThemeSync";
import { BackgroundAudioProvider } from "./BackgroundAudioContext";

export default function SiteChrome({ children }: { children: React.ReactNode }) {
  return (
    <BackgroundAudioProvider>
      <LocalAgencyThemeSync />
      <DevToolsGuard />
      <SmoothScroll ready={true} />
      <ScrollRestoration />
      <CustomCursor />
      <CookieConsent />
      <AppInstallPrompt />
      {children}
    </BackgroundAudioProvider>
  );
}
