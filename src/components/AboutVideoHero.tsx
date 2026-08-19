"use client";

import Link from "next/link";
import { ArrowUpRight, Sparkles } from "lucide-react";
import AnimatedHeading from "./AnimatedHeading";

const VIDEO_URL =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260606_154941_df1a96e1-a06f-450c-bd02-d863414cc1a0.mp4";

export default function AboutVideoHero() {
  return (
    <section className="relative min-h-[90vh] lg:min-h-screen w-full overflow-hidden bg-black text-white flex flex-col justify-between select-none pt-24 sm:pt-28 pb-8 sm:pb-10 px-6 sm:px-10 lg:px-16">
      {/* 1. Fullscreen Background Video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
        src={VIDEO_URL}
      />

      {/* Balanced Cinematic Overlay (Soft gradient: readable text on left, vivid video on right) */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-black/15 z-0 pointer-events-none" />

      {/* 2. Hero Content — True "About Me" Story & Profile */}
      <div className="relative z-10 w-full max-w-[1400px] mx-auto flex-1 flex flex-col justify-between py-2">
        <div className="max-w-3xl my-auto">
          {/* Micro Tagline */}
          <div
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md border border-white/25 text-[11px] font-mono tracking-widest uppercase text-white mb-4 sm:mb-5 shadow-sm"
            style={{ animation: "fadeSlideUp 0.8s ease 0.1s both" }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-red animate-pulse" />
            <span>About Vikash Choudhary</span>
          </div>

          {/* Strong Personal Headline with Proportional Sizing */}
          <AnimatedHeading
            mode="load"
            delay={0.3}
            className="font-display font-extrabold leading-[1.08] tracking-tight text-white text-3xl sm:text-5xl md:text-6xl lg:text-[4.2rem]"
          >
            The developer behind
            <br />
            <span className="text-white/90">every pixel &amp; </span>
            <span className="text-red drop-shadow-sm">line of code.</span>
          </AnimatedHeading>
        </div>

        {/* Bottom Description & Actions — Safe from bottom viewport clipping */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pt-4 border-t border-white/15 mt-4">
          <p
            className="text-xs sm:text-sm md:text-base leading-relaxed text-white/85 max-w-lg font-normal"
            style={{ animation: "fadeSlideUp 0.8s ease 0.5s both" }}
          >
            Hi, I&apos;m <strong className="text-white font-semibold">Vikash Choudhary</strong> — an independent Web &amp; Shopify Developer from Alwar, Rajasthan. I specialize in building high-speed e-commerce stores, custom Liquid themes, and scalable Next.js web applications that convert visitors into revenue.
          </p>

          <div
            className="flex flex-wrap items-center gap-3 shrink-0"
            style={{ animation: "fadeSlideUp 0.8s ease 0.7s both" }}
          >
            <Link
              href="/resume"
              data-cursor-hover
              className="group inline-flex items-center gap-1.5 bg-red text-white text-xs sm:text-sm font-semibold px-5 py-2.5 rounded-full hover:bg-white hover:text-black transition-colors duration-300 shadow-md"
            >
              <span>View Resume (CV)</span>
              <ArrowUpRight size={14} className="group-hover:rotate-45 transition-transform duration-300" />
            </Link>

            <Link
              href="/work"
              data-cursor-hover
              className="inline-flex items-center gap-1.5 border border-white/25 bg-black/40 backdrop-blur-md text-white text-xs sm:text-sm font-semibold px-4 py-2.5 rounded-full hover:border-white transition-colors"
            >
              <span>Explore Work (14)</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
