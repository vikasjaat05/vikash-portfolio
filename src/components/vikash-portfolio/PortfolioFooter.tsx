"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import styles from "./portfolio.module.css";
import { HERO_VIDEO } from "./data";

const SOCIALS = [
  { label: "LinkedIn", href: "https://linkedin.com" },
  { label: "GitHub", href: "https://github.com" },
  { label: "Dribbble", href: "https://dribbble.com" },
];

export default function PortfolioFooter() {
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!marqueeRef.current) return;
    const ctx = gsap.context(() => {
      gsap.to(marqueeRef.current, {
        xPercent: -50,
        duration: 40,
        ease: "none",
        repeat: -1,
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <section className="relative pt-16 md:pt-20 pb-8 md:pb-12 overflow-hidden">
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover scale-y-[-1]"
        src={HERO_VIDEO}
      />
      <div className="absolute inset-0 bg-black/60" />

      <div className="relative z-10">
        <div className="overflow-hidden py-8 md:py-12 border-y border-white/10">
          <div ref={marqueeRef} className="flex whitespace-nowrap">
            {Array.from({ length: 10 }).map((_, i) => (
              <span
                key={i}
                className="font-display italic text-4xl md:text-6xl text-white/80 px-4"
              >
                Building the future •{" "}
              </span>
            ))}
          </div>
        </div>

        <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16 py-16 md:py-24 text-center">
          <span className="text-xs uppercase tracking-[0.3em] text-white/50 mb-6 block">
            Get in touch
          </span>
          <h2 className="font-display text-4xl md:text-6xl text-white mb-10">
            Let&apos;s build <span className="italic">something.</span>
          </h2>
          <a
            href="mailto:vikkijaat800@gmail.com"
            data-cursor-hover
            className="group relative inline-flex rounded-full"
          >
            <span
              className={`absolute inset-[-2px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${styles.accentGradient}`}
            />
            <span className="relative flex items-center gap-2 rounded-full border border-white/20 px-7 py-3.5 text-white">
              vikkijaat800@gmail.com
            </span>
          </a>
        </div>

        <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16 flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-white/10 text-sm text-white/60">
          <div className="flex items-center gap-6">
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor-hover
                className="hover:text-white transition-colors"
              >
                {s.label}
              </a>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            Available for projects
          </div>
        </div>
      </div>
    </section>
  );
}
