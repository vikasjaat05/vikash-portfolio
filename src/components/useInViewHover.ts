"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Devices without real hover (touch) get their "hover" state driven by
 * scroll position instead: the returned ref should be placed on the
 * `.group` element, and `inView` mirrors what `:hover` would give on desktop.
 * Desktop keeps native `:hover`/`group-hover:` untouched — this only adds
 * `data-inview="true"` so `group-data-[inview=true]:` variants can mirror it.
 */
export function useInViewHover<T extends HTMLElement>(threshold = 0.5) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(hover: hover)").matches) return;

    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, inView };
}
