"use client";

import { useEffect, useRef } from "react";

type Blob = { x: number; y: number; r: number; life: number };

/**
 * A soft liquid-looking trail that follows the cursor inside a section —
 * layered, blurred, feathered blobs that melt into each other and fade,
 * approximating a fluid-sim look without the cost of an actual WebGL sim.
 */
export default function CursorLiquidTrail({
  targetRef,
  color = "231, 6, 0",
}: {
  targetRef: React.RefObject<HTMLElement | null>;
  color?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const canvas = canvasRef.current;
    const target = targetRef.current;
    if (!canvas || !target) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      const rect = target.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(target);

    let blobs: Blob[] = [];
    let pointerX = 0;
    let pointerY = 0;
    let lastEmitAt = 0;
    let inside = false;

    const onMove = (e: MouseEvent) => {
      const rect = target.getBoundingClientRect();
      pointerX = e.clientX - rect.left;
      pointerY = e.clientY - rect.top;
      inside = true;

      const now = performance.now();
      if (now - lastEmitAt > 28) {
        blobs.push({ x: pointerX, y: pointerY, r: 46 + Math.random() * 22, life: 1 });
        lastEmitAt = now;
        if (blobs.length > 40) blobs.shift();
      }
    };
    const onLeave = () => {
      inside = false;
    };

    target.addEventListener("mousemove", onMove);
    target.addEventListener("mouseleave", onLeave);

    let raf = 0;
    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      if (blobs.length > 0) {
        ctx.filter = "blur(22px)";
        for (const b of blobs) {
          const alpha = 0.16 * b.life;
          ctx.fillStyle = `rgba(${color}, ${alpha})`;
          ctx.beginPath();
          ctx.arc(b.x, b.y, b.r * (0.6 + 0.4 * b.life), 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.filter = "none";
      }

      blobs = blobs
        .map((b) => ({ ...b, life: b.life - 0.018 }))
        .filter((b) => b.life > 0);

      if (!inside && blobs.length === 0) {
        raf = requestAnimationFrame(draw);
        return;
      }

      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);

    return () => {
      target.removeEventListener("mousemove", onMove);
      target.removeEventListener("mouseleave", onLeave);
      resizeObserver.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [targetRef, color]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none mix-blend-screen hidden md:block"
      aria-hidden="true"
    />
  );
}
