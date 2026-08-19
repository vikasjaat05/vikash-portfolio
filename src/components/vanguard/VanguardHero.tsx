"use client";

import { useState } from "react";
import { ArrowUpRight, Award, Crown, X } from "lucide-react";
import Link from "next/link";

const NAV_LINKS = ["Projects", "Studio", "Offerings", "Inquire"];

const STATS = [
  { value: "250+", label: "Brands Transformed" },
  { value: "95%", label: "Client Retention" },
  { value: "10+", label: "Years in the Game" },
];

export default function VanguardHero() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <section className="relative h-screen w-full overflow-hidden bg-black text-white flex flex-col justify-between select-none">
      {/* 1. Fullscreen Looping Video Background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
        src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260606_154941_df1a96e1-a06f-450c-bd02-d863414cc1a0.mp4"
      />

      {/* Subtle Cinematic Overlay */}
      <div className="absolute inset-0 bg-black/40 z-0 pointer-events-none" />

      {/* 2. Top Navbar */}
      <header className="relative z-20 w-full flex items-center justify-between px-6 sm:px-10 lg:px-16 py-5 lg:py-7">
        {/* Left: Brand Name */}
        <Link
          href="/"
          data-cursor-hover
          className="font-podium font-bold uppercase text-2xl sm:text-3xl tracking-wider text-white hover:opacity-90 transition-opacity"
        >
          VANGUARD
        </Link>

        {/* Center: Desktop Nav Links (hidden below md) */}
        <nav className="hidden md:flex items-center gap-8 lg:gap-12">
          {NAV_LINKS.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              data-cursor-hover
              className="font-inter text-sm text-white/80 tracking-widest uppercase hover:text-white transition-colors duration-200"
            >
              {link}
            </a>
          ))}
        </nav>

        {/* Right: Desktop CTA Button (hidden below md) */}
        <div className="hidden md:block">
          <Link
            href="/contact"
            data-cursor-hover
            className="inline-flex items-center gap-2 border border-white/30 hover:border-white/60 px-6 py-3 text-xs tracking-widest uppercase text-white hover:bg-white/10 transition-all duration-300 rounded-sm"
          >
            <span>GET IN TOUCH</span>
            <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

        {/* Right: Mobile Hamburger Button (visible below md) */}
        <button
          onClick={() => setMenuOpen(true)}
          data-cursor-hover
          aria-label="Open mobile navigation menu"
          className="md:hidden flex flex-col justify-center items-end space-y-1.5 p-2 focus:outline-none cursor-pointer"
        >
          <div className="w-6 h-0.5 bg-white transition-transform" />
          <div className="w-6 h-0.5 bg-white transition-transform" />
          <div className="w-4 h-0.5 bg-white transition-transform" />
        </button>
      </header>

      {/* 3. Mobile Menu Overlay (below md only) */}
      <div
        className={`md:hidden fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex flex-col justify-between px-6 py-6 transition-all duration-500 ${
          menuOpen ? "opacity-100 visible pointer-events-auto" : "opacity-0 invisible pointer-events-none"
        }`}
      >
        {/* Header row */}
        <div className="flex items-center justify-between">
          <span className="font-podium font-bold uppercase text-2xl tracking-wider text-white">
            VANGUARD
          </span>
          <button
            onClick={() => setMenuOpen(false)}
            data-cursor-hover
            aria-label="Close mobile navigation menu"
            className="p-2 text-white/80 hover:text-white transition-colors cursor-pointer"
          >
            <X size={28} />
          </button>
        </div>

        {/* Centered Staggered Links */}
        <div className="flex flex-col items-center justify-center gap-6 my-auto">
          {NAV_LINKS.map((link, i) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              onClick={() => setMenuOpen(false)}
              data-cursor-hover
              className="font-podium text-4xl sm:text-5xl uppercase text-white hover:text-red transition-all duration-300 transform"
              style={{
                transitionDelay: `${i * 80 + 100}ms`,
                opacity: menuOpen ? 1 : 0,
                transform: menuOpen ? "translateY(0)" : "translateY(20px)",
              }}
            >
              {link}
            </a>
          ))}

          {/* Mobile GET IN TOUCH */}
          <div
            className="mt-6 transition-all duration-300"
            style={{
              transitionDelay: `${NAV_LINKS.length * 80 + 100}ms`,
              opacity: menuOpen ? 1 : 0,
              transform: menuOpen ? "translateY(0)" : "translateY(20px)",
            }}
          >
            <Link
              href="/contact"
              onClick={() => setMenuOpen(false)}
              data-cursor-hover
              className="inline-flex items-center gap-2 border border-white/40 px-8 py-3.5 text-xs tracking-widest uppercase text-white hover:bg-white hover:text-black transition-colors"
            >
              <span>GET IN TOUCH</span>
              <ArrowUpRight size={14} />
            </Link>
          </div>
        </div>

        {/* Footer info */}
        <div className="text-center text-white/40 text-xs tracking-widest uppercase font-inter">
          World-Class Digital Collective
        </div>
      </div>

      {/* 4. Hero Content — Vertically Centered & Left Aligned */}
      <div className="relative z-10 w-full flex-1 flex flex-col justify-center px-6 sm:px-10 lg:px-16 py-6">
        <div className="max-w-5xl">
          {/* 1. Tagline */}
          <div className="animate-fade-up flex items-center gap-2.5 mb-6 lg:mb-8">
            <Crown className="w-4 h-4 text-white/70" />
            <span className="text-white/70 text-xs sm:text-sm font-inter tracking-[0.3em] uppercase">
              World-Class Digital Collective
            </span>
          </div>

          {/* 2. Main Heading */}
          <h1 className="animate-fade-up-delay-1 font-podium font-bold uppercase text-[clamp(2.8rem,8vw,7rem)] leading-[0.92] tracking-tight text-white">
            <span className="block">Design.</span>
            <span className="block">Disrupt.</span>
            <span className="block">Conquer.</span>
          </h1>

          {/* 3. Subtext */}
          <p className="animate-fade-up-delay-2 mt-6 lg:mt-8 text-white/70 text-sm sm:text-base font-inter leading-relaxed max-w-md">
            We build fierce brand identities
            <br />
            that don&apos;t just turn heads &mdash;{" "}
            <strong className="text-white font-bold">they lead.</strong>
          </p>

          {/* 4. CTA Row */}
          <div className="animate-fade-up-delay-3 mt-8 lg:mt-10 flex flex-wrap items-center gap-4 sm:gap-6">
            <a
              href="#projects"
              data-cursor-hover
              className="group inline-flex items-center gap-2 bg-black hover:bg-neutral-900 text-white px-5 sm:px-7 py-3 sm:py-4 text-[11px] sm:text-xs font-inter tracking-widest uppercase transition-colors rounded-sm shadow-xl"
            >
              <span>SEE OUR WORK</span>
              <ArrowUpRight
                size={14}
                className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </a>

            {/* Award Badge (hidden on mobile, visible on sm+) */}
            <div className="hidden sm:flex items-center gap-3 pl-2 border-l border-white/20">
              <Award className="w-8 h-8 text-white/50" />
              <div className="text-white/60 text-xs font-inter tracking-wider uppercase leading-tight">
                <div>Top-Rated</div>
                <div>Brand Studio</div>
              </div>
            </div>
          </div>

          {/* 5. Stats Row */}
          <div className="animate-fade-up-delay-4 mt-8 sm:mt-10 lg:mt-14 flex flex-wrap gap-6 sm:gap-12 lg:gap-16">
            {STATS.map((stat) => (
              <div key={stat.label} className="flex flex-col">
                <div className="font-inter text-white text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
                  {stat.value}
                </div>
                <div className="text-white/50 text-[9px] sm:text-xs font-inter tracking-widest uppercase mt-1">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom subtle gradient vignette */}
      <div className="relative z-10 w-full h-8 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
    </section>
  );
}
