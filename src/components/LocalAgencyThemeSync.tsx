"use client";

import { useEffect } from "react";

/**
 * Ensures Agency UI Text Color Theme is active across ALL pages
 * ONLY on local environment (localhost / 127.0.0.1 / development)
 * and strictly NOT on live/production.
 */
export default function LocalAgencyThemeSync() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const hostname = window.location.hostname;
    const isLocalHost =
      hostname === "localhost" ||
      hostname === "127.0.0.1" ||
      hostname.endsWith(".local");
    const isDev = process.env.NODE_ENV === "development";
    const isLocal = isLocalHost || isDev;

    const bodyEl = document.body;
    const mainEl = document.querySelector("main");

    if (isLocal) {
      bodyEl?.classList.add("theme-agency-local");
      mainEl?.classList.add("theme-agency-local");
    } else {
      bodyEl?.classList.remove("theme-agency-local");
      mainEl?.classList.remove("theme-agency-local");
    }
  }, []);

  return null;
}
