"use client";

import { useEffect, useRef } from "react";

const BG_IMAGE_1 = "/images/model_1.png";
const BG_IMAGE_2 = "/images/model_aligned_2.png";

export default function ImageRevealBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const revealLayerRef = useRef<HTMLDivElement>(null);
  const patternRef = useRef<SVGPatternElement>(null);

  const mouseRef = useRef({ x: -1000, y: -1000 });
  const smoothRef = useRef({ x: -1000, y: -1000 });
  const gridOffsetRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    let animId: number;
    let isRunning = true;

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;

      if (smoothRef.current.x < -500) {
        smoothRef.current.x = e.clientX;
        smoothRef.current.y = e.clientY;
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    const render = () => {
      if (!isRunning) return;

      const mouse = mouseRef.current;
      const smooth = smoothRef.current;

      // Smooth 0.1 ease interpolation
      smooth.x += (mouse.x - smooth.x) * 0.1;
      smooth.y += (mouse.y - smooth.y) * 0.1;

      const w = window.innerWidth;
      const h = window.innerHeight;
      // Fluid radius with soft feather
      const radius = Math.round(Math.min(460, Math.max(180, w * 0.18)));

      // Ultra high-performance GPU-accelerated CSS radial mask with seamless feather
      if (revealLayerRef.current && smooth.x > -500) {
        const maskGradient = `radial-gradient(circle ${radius}px at ${smooth.x.toFixed(1)}px ${smooth.y.toFixed(1)}px, #000 0%, #000 35%, rgba(0,0,0,0.85) 55%, rgba(0,0,0,0.5) 72%, rgba(0,0,0,0.18) 88%, transparent 100%)`;
        revealLayerRef.current.style.maskImage = maskGradient;
        revealLayerRef.current.style.webkitMaskImage = maskGradient;
      }

      // Parallax Grid GPU ease
      if (patternRef.current && w > 0 && h > 0) {
        const normX = smooth.x / w - 0.5;
        const normY = smooth.y / h - 0.5;

        const targetOffsetX = normX * 16;
        const targetOffsetY = normY * 16;

        gridOffsetRef.current.x += (targetOffsetX - gridOffsetRef.current.x) * 0.06;
        gridOffsetRef.current.y += (targetOffsetY - gridOffsetRef.current.y) * 0.06;

        patternRef.current.setAttribute("x", gridOffsetRef.current.x.toFixed(2));
        patternRef.current.setAttribute("y", gridOffsetRef.current.y.toFixed(2));
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      isRunning = false;
      cancelAnimationFrame(animId);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="hidden lg:block fixed inset-0 pointer-events-none z-0 overflow-hidden transform-gpu"
      aria-hidden="true"
    >
      {/* 1. Base layer: Image 1 full bleed */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat will-change-transform"
        style={{
          backgroundImage: `url(${BG_IMAGE_1})`,
        }}
      />

      {/* 2. Reveal layer: Aligned Image 2 with pixel-perfect facial match */}
      <div
        ref={revealLayerRef}
        className="absolute inset-0 bg-cover bg-center bg-no-repeat will-change-[mask-image,transform]"
        style={{
          backgroundImage: `url(${BG_IMAGE_2})`,
        }}
      />

      {/* 3. Subtle Parallax SVG Grid overlay at 10% opacity */}
      <svg className="absolute inset-0 w-full h-full opacity-10 pointer-events-none">
        <defs>
          <pattern
            id="lgpsm-grid"
            ref={patternRef}
            width="48"
            height="48"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 48 0 L 0 0 0 48"
              fill="none"
              stroke="#64748b"
              strokeWidth="0.6"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#lgpsm-grid)" />
      </svg>
    </div>
  );
}
