"use client";

import { useRef } from "react";
import AnimatedHeading from "./AnimatedHeading";
import MusicCursorToggle from "./MusicCursorToggle";
import CursorLiquidTrail from "./CursorLiquidTrail";

export default function VideoHero() {
  const sectionRef = useRef<HTMLElement | null>(null);

  return (
    <section
      ref={sectionRef}
      id="top"
      className="relative min-h-screen flex flex-col overflow-hidden bg-[#0a0a0a]"
    >
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
        src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260314_131748_f2ca2a28-fed7-44c8-b9a9-bd9acdd5ec31.mp4"
      />
      <div className="absolute inset-0 z-0 bg-black/35" />
      <CursorLiquidTrail targetRef={sectionRef} color="255, 255, 255" />

      <MusicCursorToggle targetRef={sectionRef} />

      <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-6 pt-32 pb-40">
        <AnimatedHeading
          mode="load"
          delay={0.15}
          className="text-5xl sm:text-7xl md:text-8xl leading-[0.95] tracking-[-2.46px] max-w-7xl font-normal text-white"
        >
          <span style={{ fontFamily: "'Instrument Serif', serif" }}>
            Where <em className="not-italic text-white/60">dreams</em> rise{" "}
            <em className="not-italic text-white/60">through the silence.</em>
          </span>
        </AnimatedHeading>

        <p className="animate-fade-rise-delay text-white/60 text-base sm:text-lg max-w-2xl mt-8 leading-relaxed">
          We&apos;re designing tools for deep thinkers, bold creators, and quiet rebels.
          Amid the chaos, we build digital spaces for sharp focus and inspired work.
        </p>

        <a
          href="#contact"
          data-cursor-hover
          className="liquid-glass animate-fade-rise-delay-2 rounded-full px-14 py-5 text-base text-white mt-12 hover:scale-[1.03] cursor-pointer transition-transform duration-300 inline-block"
        >
          Begin Journey
        </a>
      </div>
    </section>
  );
}
