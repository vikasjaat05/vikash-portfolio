"use client";

import { useEffect, useRef, useState } from "react";
import { useTypewriter } from "./useTypewriter";

const VIDEO_SRC =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260530_042513_df96a13b-6155-4f6e-8b93-c9dee66fba08.mp4";

const SENSITIVITY = 0.8;

const ACTION_PILLS = [
  "Get a Free Quote",
  "Start a Web Project",
  "Talk About an App",
  "See Our Process",
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
  const videoRef = useRef<HTMLVideoElement>(null);
  const prevXRef = useRef<number | null>(null);
  const targetTimeRef = useRef(0);
  const seekingRef = useRef(false);
  const [pillsVisible, setPillsVisible] = useState(false);
  const [copied, setCopied] = useState(false);

  const { displayed, done } = useTypewriter(
    "Fast, senior-led execution across web, app, marketing, and design. Now, what are we building?",
    38,
    600
  );

  useEffect(() => {
    const timer = setTimeout(() => setPillsVisible(true), 400);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const applySeek = () => {
      if (seekingRef.current) return;
      seekingRef.current = true;
      video.currentTime = targetTimeRef.current;
    };

    const onSeeked = () => {
      seekingRef.current = false;
      if (Math.abs(video.currentTime - targetTimeRef.current) > 0.02) {
        applySeek();
      }
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!video.duration || Number.isNaN(video.duration)) return;
      const prevX = prevXRef.current;
      prevXRef.current = e.clientX;
      if (prevX === null) return;

      const delta = e.clientX - prevX;
      const timeDelta = (delta / window.innerWidth) * SENSITIVITY * video.duration;
      const nextTarget = Math.min(
        video.duration,
        Math.max(0, targetTimeRef.current + timeDelta)
      );
      targetTimeRef.current = nextTarget;
      applySeek();
    };

    video.addEventListener("seeked", onSeeked);
    window.addEventListener("mousemove", onMouseMove);

    return () => {
      video.removeEventListener("seeked", onSeeked);
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText("vikashchoudhary@gmail.com");
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // clipboard API unavailable — no-op
    }
  };

  return (
    <section className="relative h-screen w-full overflow-hidden bg-black">
      <video
        ref={videoRef}
        muted
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ objectPosition: "70% center" }}
        src={VIDEO_SRC}
      />
      <div className="absolute inset-0 bg-black/35" />

      <div className="relative z-10 h-full flex flex-col justify-end md:justify-center px-6 sm:px-8 md:px-10 pb-12 md:pb-0">
        <div className="max-w-xl relative z-10">
          <p
            className="pointer-events-none select-none mb-5 sm:mb-6 text-white"
            style={{ fontSize: "clamp(18px, 4vw, 26px)", lineHeight: 1.3, filter: "blur(4px)" }}
          >
            Hey there, I&apos;m Vikash Choudhary,
            <br />
            here to scope your next project.
          </p>

          <p
            className="text-white mb-5 sm:mb-6"
            style={{ fontSize: "clamp(18px, 4vw, 26px)", lineHeight: 1.35, minHeight: 54 }}
          >
            {displayed}
            {!done && (
              <span className="inline-block w-[2px] h-[1.1em] bg-white align-middle ml-[2px] animate-blink" />
            )}
          </p>

          <div
            className="flex flex-wrap gap-y-1"
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
                className="inline-flex items-center justify-center bg-white text-black border border-black/10 rounded-full text-[13px] sm:text-[15px] px-4 sm:px-5 py-[0.3em] mx-[0.2em] mb-[0.4em] whitespace-nowrap hover:bg-black hover:text-white transition-colors duration-200"
              >
                {label}
              </a>
            ))}
            <button
              onClick={handleCopy}
              data-cursor-hover
              className="inline-flex items-center justify-center gap-2 sm:gap-3 text-white bg-transparent border border-white rounded-full text-[13px] sm:text-[15px] px-4 sm:px-5 py-[0.3em] mx-[0.2em] mb-[0.4em] whitespace-nowrap hover:bg-white hover:text-black transition-colors duration-200"
            >
              {copied ? "Copied!" : (
                <>
                  Reach me: <span className="underline underline-offset-1">vikashchoudhary@gmail.com</span>
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
