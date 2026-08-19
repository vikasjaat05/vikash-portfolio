"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import { setLenisInstance } from "./lenisInstance";

export default function SmoothScroll({ ready = true }: { ready?: boolean }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.1,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    lenisRef.current = lenis;
    setLenisInstance(lenis);

    let raf = 0;
    function tick(time: number) {
      lenis.raf(time);
      raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);

    const resizeObserver = new ResizeObserver(() => lenis.resize());
    resizeObserver.observe(document.body);

    // Belt-and-suspenders: body height can also change from late-loading fonts
    // or media without firing another observed resize in time for the next scroll.
    document.fonts?.ready.then(() => lenis.resize());
    window.addEventListener("load", () => lenis.resize());

    return () => {
      cancelAnimationFrame(raf);
      resizeObserver.disconnect();
      lenis.destroy();
      lenisRef.current = null;
      setLenisInstance(null);
    };
  }, []);

  useEffect(() => {
    // The preloader holds `overflow: hidden` on body while it's showing, which
    // makes Lenis measure a collapsed scroll height. Force a remeasure once the
    // real content is visible and interactive, otherwise scroll-linked effects
    // (parallax, useScroll progress) never move correctly.
    if (!ready) return;
    const id = requestAnimationFrame(() => lenisRef.current?.resize());
    return () => cancelAnimationFrame(id);
  }, [ready]);

  return null;
}
