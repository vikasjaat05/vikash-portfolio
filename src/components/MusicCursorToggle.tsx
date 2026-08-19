"use client";

import { useEffect, useRef, useState } from "react";
import { useBackgroundAudio } from "./BackgroundAudioContext";

export default function MusicCursorToggle({
  targetRef,
}: {
  targetRef: React.RefObject<HTMLElement | null>;
}) {
  const { playing, toggle } = useBackgroundAudio();
  const labelRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const target = targetRef.current;
    if (!target || window.matchMedia("(pointer: coarse)").matches) return;

    let mouseX = 0;
    let mouseY = 0;
    let x = 0;
    let y = 0;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      const rect = target.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;

      const overInteractive = (e.target as HTMLElement)?.closest(
        "a, button, [data-cursor-hover], input, textarea"
      );
      setVisible(!overInteractive);
    };

    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);

    const animate = () => {
      x += (mouseX - x) * 0.22;
      y += (mouseY - y) * 0.22;
      if (labelRef.current) {
        labelRef.current.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
      }
      raf = requestAnimationFrame(animate);
    };

    target.addEventListener("mousemove", onMove);
    target.addEventListener("mouseleave", onLeave);
    target.addEventListener("mouseenter", onEnter);
    raf = requestAnimationFrame(animate);

    return () => {
      target.removeEventListener("mousemove", onMove);
      target.removeEventListener("mouseleave", onLeave);
      target.removeEventListener("mouseenter", onEnter);
      cancelAnimationFrame(raf);
    };
  }, [targetRef]);

  useEffect(() => {
    const target = targetRef.current;
    if (!target) return;

    const onClick = (e: MouseEvent) => {
      const overInteractive = (e.target as HTMLElement)?.closest(
        "a, button, [data-cursor-hover], input, textarea"
      );
      if (overInteractive) return;
      toggle();
    };

    target.addEventListener("click", onClick);
    return () => target.removeEventListener("click", onClick);
  }, [targetRef, toggle]);

  return (
    <>
      {/* Desktop: Cursor-following floating audio controller */}
      <div
        ref={labelRef}
        className="hidden md:block absolute top-0 left-0 z-30 pointer-events-none"
      >
        <div
          className={`flex flex-col items-center justify-center w-20 h-20 rounded-full bg-[#0a0a0a]/90 backdrop-blur-md text-white text-xs font-semibold uppercase tracking-wider border border-white/25 shadow-2xl transition-all duration-200 transform scale-90 ${
            visible ? "opacity-100 scale-100" : "opacity-0 scale-75"
          }`}
        >
          {/* Animated Equalizer Bars */}
          <div className="flex items-end gap-0.5 h-3 mb-1">
            <span
              className={`w-0.5 bg-white rounded-full transition-all duration-200 ${
                playing ? "animate-[bounce_0.6s_infinite_ease-in-out] h-full" : "h-1"
              }`}
            />
            <span
              className={`w-0.5 bg-white rounded-full transition-all duration-200 ${
                playing ? "animate-[bounce_0.8s_infinite_0.2s_ease-in-out] h-full" : "h-2.5"
              }`}
            />
            <span
              className={`w-0.5 bg-white rounded-full transition-all duration-200 ${
                playing ? "animate-[bounce_0.5s_infinite_0.4s_ease-in-out] h-full" : "h-1.5"
              }`}
            />
          </div>
          <span className="text-[11px] font-mono font-bold tracking-widest">
            {playing ? "PAUSE" : "PLAY ♫"}
          </span>
        </div>
      </div>

      {/* Mobile / touch: fixed corner button */}
      <button
        onClick={toggle}
        data-cursor-hover
        aria-label={playing ? "Pause background music" : "Play background music"}
        className="md:hidden absolute bottom-6 right-6 z-20"
      >
        <span className="flex items-center justify-center w-12 h-12 rounded-full bg-[#0a0a0a]/90 text-white text-xs font-semibold shadow-lg border border-white/20">
          {playing ? "❚❚" : "▶"}
        </span>
      </button>
    </>
  );
}
