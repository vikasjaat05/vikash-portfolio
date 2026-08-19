"use client";

import { useEffect, useRef } from "react";
import { playHoverTick, playClickTick } from "@/lib/cursor-sound";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;

    let mouseX = 0;
    let mouseY = 0;
    let ringX = 0;
    let ringY = 0;

    let soundEnabled = false;
    const enableSound = () => {
      soundEnabled = true;
    };
    window.addEventListener("pointerdown", enableSound, { once: true });
    window.addEventListener("keydown", enableSound, { once: true });

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.left = `${mouseX}px`;
        dotRef.current.style.top = `${mouseY}px`;
      }
    };

    let currentHoverEl: Element | null = null;
    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const hoverEl = target.closest("a, button, [data-cursor-hover]");
      if (hoverEl) {
        ringRef.current?.classList.add("cursor-hover");
        if (hoverEl !== currentHoverEl && soundEnabled) playHoverTick();
        currentHoverEl = hoverEl;
      } else {
        ringRef.current?.classList.remove("cursor-hover");
        currentHoverEl = null;
      }
    };

    const onDown = () => {
      if (soundEnabled) playClickTick();
      dotRef.current?.classList.add("cursor-pressed");
      ringRef.current?.classList.add("cursor-pressed");
    };

    const onUp = () => {
      dotRef.current?.classList.remove("cursor-pressed");
      ringRef.current?.classList.remove("cursor-pressed");
    };

    let raf = 0;
    const animate = () => {
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;
      if (ringRef.current) {
        ringRef.current.style.left = `${ringX}px`;
        ringRef.current.style.top = `${ringY}px`;
      }
      raf = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    raf = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("pointerdown", enableSound);
      window.removeEventListener("keydown", enableSound);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot hidden md:block" />
      <div ref={ringRef} className="cursor-ring hidden md:block" />
    </>
  );
}
