"use client";

import { useEffect, useRef, useState } from "react";
import { useTypewriter } from "./useTypewriter";

const VIDEO_SRC =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260826_041744_63efcd78-bf7d-4039-99e2-2461e8a61903.mp4";

const ACTION_PILLS = [
  "Pitch us an idea",
  "Come work here",
  "Send a brief hello",
  "See how we operate",
];

function CopyIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="9" y="9" width="13" height="13" rx="2" stroke="currentColor" strokeWidth="2" />
      <path
        d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"
        stroke="currentColor"
        strokeWidth="2"
      />
    </svg>
  );
}

export default function ServicesVideoHero() {
  const containerRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoWrapperRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  const mouseRef = useRef({ x: 0.5, y: 0.5 });
  const smoothMouseRef = useRef({ x: 0.5, y: 0.5 });
  const targetTimeRef = useRef(0);
  const currentTimeRef = useRef(0);
  const isSeekingRef = useRef(false);

  const [pillsVisible, setPillsVisible] = useState(false);
  const [copied, setCopied] = useState(false);

  const { displayed, done } = useTypewriter(
    "Glad you stopped in. Good taste tends to find us. Now, what are we building?",
    38,
    600
  );

  useEffect(() => {
    const timer = setTimeout(() => setPillsVisible(true), 400);
    return () => clearTimeout(timer);
  }, []);

  // 60FPS Interactive 3D Holographic Parallax + Video Scrubbing Loop
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.pause();

    let animId: number;
    let isRunning = true;

    const render = () => {
      if (!isRunning) return;

      // 1. Smooth Spring Lerp for Cursor Position
      const mouse = mouseRef.current;
      const smooth = smoothMouseRef.current;
      smooth.x += (mouse.x - smooth.x) * 0.08;
      smooth.y += (mouse.y - smooth.y) * 0.08;

      // 2. Real-time 3D Holographic Parallax Tilt (Instant tactile feel)
      if (videoWrapperRef.current) {
        const tiltX = (smooth.y - 0.5) * -12; // -6deg to +6deg
        const tiltY = (smooth.x - 0.5) * 16;  // -8deg to +8deg
        const panX = (smooth.x - 0.5) * -20;
        const panY = (smooth.y - 0.5) * -15;

        videoWrapperRef.current.style.transform = `perspective(1000px) rotateX(${tiltX.toFixed(2)}deg) rotateY(${tiltY.toFixed(2)}deg) translate3d(${panX.toFixed(1)}px, ${panY.toFixed(1)}px, 0) scale(1.06)`;
      }

      // 3. Dynamic Cursor Spotlight Glow
      if (glowRef.current) {
        glowRef.current.style.left = `${(smooth.x * 100).toFixed(1)}%`;
        glowRef.current.style.top = `${(smooth.y * 100).toFixed(1)}%`;
      }

      // 4. Video Timeline Scrubbing
      const duration = video.duration;
      if (duration && !Number.isNaN(duration) && duration > 0) {
        targetTimeRef.current = smooth.x * duration;

        const diff = targetTimeRef.current - currentTimeRef.current;
        currentTimeRef.current += diff * 0.15;

        const clampedTime = Math.min(
          duration - 0.02,
          Math.max(0.01, currentTimeRef.current)
        );

        if (!isSeekingRef.current && Math.abs(video.currentTime - clampedTime) > 0.015) {
          isSeekingRef.current = true;
          video.currentTime = clampedTime;
        }
      }

      animId = requestAnimationFrame(render);
    };

    const handleSeeked = () => {
      isSeekingRef.current = false;
    };

    const handlePointerMove = (e: PointerEvent) => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      if (w > 0 && h > 0) {
        mouseRef.current.x = Math.min(1, Math.max(0, e.clientX / w));
        mouseRef.current.y = Math.min(1, Math.max(0, e.clientY / h));
      }
    };

    const handleLoadedMetadata = () => {
      if (video.duration) {
        video.currentTime = 0.5 * video.duration;
      }
    };

    video.addEventListener("seeked", handleSeeked);
    video.addEventListener("loadedmetadata", handleLoadedMetadata);
    video.addEventListener("canplay", handleLoadedMetadata);
    window.addEventListener("pointermove", handlePointerMove, { passive: true });

    animId = requestAnimationFrame(render);

    return () => {
      isRunning = false;
      cancelAnimationFrame(animId);
      video.removeEventListener("seeked", handleSeeked);
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
      video.removeEventListener("canplay", handleLoadedMetadata);
      window.removeEventListener("pointermove", handlePointerMove);
    };
  }, []);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText("vikkijaat800@gmail.com");
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // clipboard API unavailable — no-op
    }
  };

  return (
    <section
      ref={containerRef}
      className="relative h-screen w-full overflow-hidden bg-black select-none cursor-crosshair"
    >
      {/* 3D Holographic Perspective Video Canvas */}
      <div
        ref={videoWrapperRef}
        className="absolute inset-0 w-full h-full will-change-transform transform-gpu pointer-events-none"
        style={{ transformOrigin: "center center", transition: "transform 0.1s ease-out" }}
      >
        <video
          ref={videoRef}
          muted
          playsInline
          preload="auto"
          className="w-full h-full object-cover pointer-events-none"
          style={{ objectPosition: "70% center" }}
          src={VIDEO_SRC}
        />
      </div>

      {/* Interactive Cursor Spotlight Glow */}
      <div
        ref={glowRef}
        className="absolute w-[500px] h-[500px] rounded-full pointer-events-none -translate-x-1/2 -translate-y-1/2 opacity-30 blur-[120px] transition-opacity duration-300"
        style={{
          background: "radial-gradient(circle, rgba(225, 6, 0, 0.45) 0%, rgba(255, 255, 255, 0.15) 40%, transparent 70%)",
        }}
      />

      {/* Dark Vignette Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/30 pointer-events-none" />

      {/* Hero Content */}
      <div className="relative z-10 h-full flex flex-col justify-end md:justify-center px-5 sm:px-8 md:px-10 pb-12 md:pb-0">
        <div className="max-w-xl relative z-10">
          {/* 1. Blurred intro label */}
          <p
            className="pointer-events-none select-none mb-5 sm:mb-6 text-white"
            style={{ fontSize: "clamp(18px, 4vw, 26px)", lineHeight: 1.3, fontWeight: 400, filter: "blur(4px)" }}
          >
            Hey there, welcome to Vikash&apos;s Studio,
            <br />
            Senior Web &amp; Shopify Engineering
          </p>

          {/* 2. Typewriter text */}
          <p
            className="text-white mb-5 sm:mb-6"
            style={{ fontSize: "clamp(18px, 4vw, 26px)", lineHeight: 1.35, fontWeight: 400, minHeight: 54 }}
          >
            {displayed}
            {!done && (
              <span className="inline-block w-[2px] h-[1.1em] bg-white align-middle ml-[2px] animate-blink" />
            )}
          </p>

          {/* 3. Action pill buttons (Liquid Style) */}
          <div
            className="flex flex-wrap gap-y-1.5"
            style={{
              opacity: pillsVisible ? 1 : 0,
              transform: pillsVisible ? "translateY(0)" : "translateY(8px)",
              transition: "opacity 0.4s ease, transform 0.4s ease",
            }}
          >
            {ACTION_PILLS.map((label) => (
              <a
                key={label}
                href="/contact"
                data-cursor-hover
                className="inline-flex items-center justify-center bg-white text-black border border-black/10 rounded-full text-[13px] sm:text-[15px] px-4 sm:px-5 py-[0.35em] mx-[0.2em] mb-[0.4em] whitespace-nowrap hover:bg-red hover:text-white transition-all duration-200 shadow-sm"
              >
                {label}
              </a>
            ))}
            <button
              onClick={handleCopy}
              data-cursor-hover
              className="inline-flex items-center justify-center gap-2 sm:gap-3 text-white bg-transparent border border-white/60 rounded-full text-[13px] sm:text-[15px] px-4 sm:px-5 py-[0.35em] mx-[0.2em] mb-[0.4em] whitespace-nowrap hover:bg-white hover:text-black transition-all duration-200"
            >
              {copied ? "Copied!" : (
                <>
                  Reach me: <span className="underline underline-offset-1">vikkijaat800@gmail.com</span>
                </>
              )}
              <CopyIcon />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
