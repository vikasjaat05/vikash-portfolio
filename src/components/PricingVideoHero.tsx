"use client";

import { ArrowDown } from "lucide-react";
import AnimatedHeading from "./AnimatedHeading";

export default function PricingVideoHero() {
  return (
    <section className="relative w-full h-screen overflow-hidden bg-black">
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260328_115001_bcdaa3b4-03de-47e7-ad63-ae3e392c32d4.mp4"
      />
      <div className="absolute inset-0 bg-black/30" />

      <div className="relative z-10 flex flex-col items-center justify-center h-full px-6 text-center">
        <AnimatedHeading
          mode="load"
          delay={0.15}
          className="text-4xl sm:text-6xl lg:text-7xl text-white mb-6 tracking-tight"
        >
          <span style={{ fontFamily: "'Instrument Serif', serif" }}>
            Answers, and proof it works
          </span>
        </AnimatedHeading>

        <p className="text-white/70 text-sm sm:text-base max-w-md leading-relaxed px-4 mb-10">
          Everything clients usually ask before starting a project — plus what
          they had to say once it shipped.
        </p>

        <a
          href="#testimonials"
          data-cursor-hover
          className="liquid-glass rounded-full px-8 py-3 text-white text-sm font-medium hover:bg-white/5 transition-colors inline-flex items-center gap-2"
        >
          See Reviews
          <ArrowDown size={16} />
        </a>
      </div>
    </section>
  );
}
