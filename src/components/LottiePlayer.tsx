"use client";

import { useEffect, useRef, useState } from "react";

const SCRIPT_SRC =
  "https://unpkg.com/@lottiefiles/dotlottie-wc@0.9.14/dist/dotlottie-wc.js";

let loadPromise: Promise<void> | null = null;

function loadDotLottieScript(): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve();
  if (customElements.get("dotlottie-wc")) return Promise.resolve();
  if (loadPromise) return loadPromise;

  loadPromise = new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = SCRIPT_SRC;
    script.type = "module";
    script.onload = () => resolve();
    script.onerror = () => reject(new Error(`Failed to load ${SCRIPT_SRC}`));
    document.head.appendChild(script);
  });

  return loadPromise;
}

export default function LottiePlayer({
  src,
  width = 300,
  height = 300,
  loop = true,
  className,
  onComplete,
}: {
  src: string;
  width?: number;
  height?: number;
  loop?: boolean;
  className?: string;
  onComplete?: () => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let cancelled = false;
    loadDotLottieScript()
      .then(() => customElements.whenDefined("dotlottie-wc"))
      .then(() => {
        if (!cancelled) setReady(true);
      })
      .catch((err) => {
        console.error("LottiePlayer: failed to load dotlottie-wc", err);
        if (!cancelled) setFailed(true);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!ready || !containerRef.current) return;
    const container = containerRef.current;
    container.innerHTML = "";

    const el = document.createElement("dotlottie-wc");
    el.setAttribute("src", src);
    el.setAttribute("autoplay", "");
    if (loop) el.setAttribute("loop", "");
    el.style.width = `${width}px`;
    el.style.height = `${height}px`;

    const handleComplete = () => onComplete?.();
    if (onComplete) el.addEventListener("complete", handleComplete);

    container.appendChild(el);

    return () => {
      if (onComplete) el.removeEventListener("complete", handleComplete);
      container.innerHTML = "";
    };
  }, [ready, src, width, height, loop, onComplete]);

  if (failed) return null;

  return (
    <div
      ref={containerRef}
      className={className}
      style={{ width, height }}
      aria-hidden="true"
    />
  );
}
