"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import styles from "./portfolio.module.css";
import { NAV_LINKS } from "./data";

export default function PortfolioNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("#home");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 100);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 md:pt-6 px-4">
      <div
        className={`inline-flex items-center rounded-full backdrop-blur-md border border-white/10 px-2 py-2 transition-shadow duration-300 ${styles.bgSurface} ${
          scrolled ? "shadow-md shadow-black/10" : ""
        }`}
      >
        <div className={`group relative w-9 h-9 rounded-full p-[1.5px] flex-shrink-0 ${styles.accentGradient}`}>
          <div
            className="w-full h-full rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
            style={{ background: "hsl(0 0% 4%)" }}
          >
            <span className={`font-display italic text-[13px] ${styles.textPrimary}`}>VC</span>
          </div>
        </div>

        <div className={`hidden sm:block w-px h-5 mx-1 ${styles.bgStroke}`} />

        <div className="hidden sm:flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              data-cursor-hover
              onClick={() => setActive(link.href)}
              className={`text-xs sm:text-sm rounded-full px-3 sm:px-4 py-1.5 sm:py-2 ${styles.navLink} ${
                active === link.href ? styles.navLinkActive : ""
              }`}
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className={`hidden sm:block w-px h-5 mx-1 ${styles.bgStroke}`} />

        <Link
          href="/contact"
          data-cursor-hover
          className="group relative rounded-full"
        >
          <span
            className={`absolute inset-[-2px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${styles.accentGradient}`}
          />
          <span
            className={`relative flex items-center gap-1.5 rounded-full backdrop-blur-md px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm ${styles.bgSurface} ${styles.textPrimary}`}
          >
            Say hi <span aria-hidden>↗</span>
          </span>
        </Link>
      </div>
    </nav>
  );
}
