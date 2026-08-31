"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import AnimatedLogo from "./AnimatedLogo";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  const DARK_HERO_PAGES = ["/about", "/contact", "/vanguard"];
  const onDarkHero = DARK_HERO_PAGES.includes(pathname) && !scrolled;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        scrolled
          ? "bg-white/75 backdrop-blur-xl border-b border-black/[0.05] shadow-2xs py-2 sm:py-3"
          : "bg-transparent py-2.5 sm:py-4"
      }`}
    >
      <nav className="max-w-[1400px] mx-auto flex items-center justify-between px-3.5 sm:px-6 md:px-12">
        {/* Brand Logo (Left) */}
        <AnimatedLogo onDark={onDarkHero} />

        {/* Clean Right Actions */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Live Availability Status (Desktop/Tablet) */}
          <div
            className={`hidden md:inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-medium transition-colors ${
              onDarkHero
                ? "bg-white/10 text-white/90 border border-white/15"
                : "bg-black/[0.04] text-black/75 border border-black/[0.06]"
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
            <span>Available for Q3</span>
          </div>

          {/* Liquid Glass CTA Button (Optimized for mobile touch) */}
          <Link
            href="/contact"
            data-cursor-hover
            className={`inline-flex items-center gap-1 sm:gap-1.5 text-[11px] sm:text-xs font-semibold uppercase tracking-wider px-3.5 py-2 sm:px-6 sm:py-2.5 rounded-full transition-all duration-300 ${
              onDarkHero ? "liquid-btn" : "liquid-btn-dark"
            }`}
          >
            <span>Start a Project</span>
            <ArrowUpRight size={14} />
          </Link>
        </div>
      </nav>
    </header>
  );
}
