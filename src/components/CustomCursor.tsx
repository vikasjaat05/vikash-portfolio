"use client";

import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;

    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;
    let isHovering = false;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
      }
    };

    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const hoverEl = target?.closest?.("a, button, [data-cursor-hover], input, textarea");
      const shouldHover = Boolean(hoverEl);
      if (shouldHover !== isHovering) {
        isHovering = shouldHover;
        if (isHovering) {
          ringRef.current?.classList.add("cursor-hover");
          dotRef.current?.classList.add("cursor-hover");
        } else {
          ringRef.current?.classList.remove("cursor-hover");
          dotRef.current?.classList.remove("cursor-hover");
        }
      }
    };

    const onDown = () => {
      dotRef.current?.classList.add("cursor-pressed");
      ringRef.current?.classList.add("cursor-pressed");
    };

    const onUp = () => {
      dotRef.current?.classList.remove("cursor-pressed");
      ringRef.current?.classList.remove("cursor-pressed");
    };

    let raf = 0;
    const animate = () => {
      ringX += (mouseX - ringX) * 0.22;
      ringY += (mouseY - ringY) * 0.22;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX.toFixed(2)}px, ${ringY.toFixed(2)}px, 0) translate(-50%, -50%)`;
      }
      raf = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver, { passive: true });
    window.addEventListener("mousedown", onDown, { passive: true });
    window.addEventListener("mouseup", onUp, { passive: true });
    raf = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
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
