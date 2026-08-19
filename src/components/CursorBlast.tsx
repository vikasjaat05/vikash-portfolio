"use client";

import { forwardRef, useImperativeHandle, useRef } from "react";

export type CursorBlastHandle = {
  burst: (x: number, y: number) => void;
};

const PARTICLE_COUNT = 14;

/**
 * A one-shot particle burst — small red/white shards flung outward from a
 * point and faded, used when the growing ARIX label crosses its size
 * limit and "blasts" apart.
 */
const CursorBlast = forwardRef<CursorBlastHandle>(function CursorBlast(_props, ref) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useImperativeHandle(ref, () => ({
    burst(x: number, y: number) {
      const container = containerRef.current;
      if (!container) return;

      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const particle = document.createElement("span");
        const angle = (Math.PI * 2 * i) / PARTICLE_COUNT + (Math.random() - 0.5) * 0.4;
        const distance = 60 + Math.random() * 90;
        const size = 4 + Math.random() * 6;
        const isRed = i % 2 === 0;

        particle.style.position = "fixed";
        particle.style.left = `${x}px`;
        particle.style.top = `${y}px`;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.borderRadius = "2px";
        particle.style.background = isRed ? "#e10600" : "#ffffff";
        particle.style.pointerEvents = "none";
        particle.style.zIndex = "9997";
        particle.style.transform = "translate(-50%, -50%)";
        particle.style.transition = "transform 0.55s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.55s ease";
        particle.style.opacity = "1";
        container.appendChild(particle);

        requestAnimationFrame(() => {
          const dx = Math.cos(angle) * distance;
          const dy = Math.sin(angle) * distance;
          particle.style.transform = `translate(calc(-50% + ${dx}px), calc(-50% + ${dy}px)) rotate(${
            Math.random() * 360
          }deg)`;
          particle.style.opacity = "0";
        });

        setTimeout(() => particle.remove(), 650);
      }
    },
  }));

  return <div ref={containerRef} aria-hidden="true" />;
});

export default CursorBlast;
