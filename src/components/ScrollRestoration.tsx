"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { getLenisInstance } from "./lenisInstance";

const STORAGE_KEY = "arix-scroll-positions";

function readStore(): Record<string, number> {
  try {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY) ?? "{}");
  } catch {
    return {};
  }
}

function writeStore(store: Record<string, number>) {
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(store));
}

function scrollTo(y: number) {
  const lenis = getLenisInstance();
  if (lenis) {
    lenis.scrollTo(y, { immediate: true });
  } else {
    window.scrollTo(0, y);
  }
}

export default function ScrollRestoration() {
  const pathname = usePathname();
  const previousPathRef = useRef<string | null>(null);
  const isPopStateRef = useRef(false);

  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    const onPopState = () => {
      isPopStateRef.current = true;
    };
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  useEffect(() => {
    const previousPath = previousPathRef.current;

    if (previousPath && previousPath !== pathname) {
      const store = readStore();
      store[previousPath] = window.scrollY;
      writeStore(store);
    }

    const wasPopState = isPopStateRef.current;
    isPopStateRef.current = false;

    const raf = requestAnimationFrame(() => {
      if (wasPopState) {
        const store = readStore();
        const saved = store[pathname];
        scrollTo(typeof saved === "number" ? saved : 0);
      } else {
        scrollTo(0);
      }
    });

    previousPathRef.current = pathname;
    return () => cancelAnimationFrame(raf);
  }, [pathname]);

  return null;
}
