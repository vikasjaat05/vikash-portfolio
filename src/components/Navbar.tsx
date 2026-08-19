"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";
import AnimatedLogo from "./AnimatedLogo";

const LINKS = [
  { label: "Work", href: "/work" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Resume", href: "/resume" },
  { label: "FAQ & Reviews", href: "/pricing" },
];

const MORE_LINKS = [
  { label: "About Me", href: "/about" },
  { label: "Resume (CV)", href: "/resume" },
  { label: "Journal", href: "/journal" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  const DARK_HERO_PAGES = ["/about", "/contact", "/vanguard"];
  const onDarkHero = DARK_HERO_PAGES.includes(pathname) && !scrolled && !open;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled || open
            ? "bg-white/80 backdrop-blur-md border-b border-black/[0.06]"
            : "bg-transparent"
        }`}
      >
        <nav className="max-w-[1400px] mx-auto flex items-center justify-between px-5 sm:px-6 md:px-10 py-4 md:py-5">
          <AnimatedLogo onDark={onDarkHero} />

          <ul
            className={`hidden lg:flex items-center gap-8 px-6 py-2 rounded-full backdrop-blur-md border shadow-2xs transition-colors duration-300 ${
              onDarkHero
                ? "bg-black/40 border-white/20 text-white"
                : "bg-white/80 border-black/10 text-black"
            }`}
          >
            {LINKS.map((link) => {
              const active = pathname === link.href;
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    data-cursor-hover
                    className={`text-xs font-semibold uppercase tracking-wider underline-swipe transition-colors ${
                      active
                        ? "text-red font-bold"
                        : onDarkHero
                          ? "text-white/80 hover:text-white"
                          : "text-black/75 hover:text-black"
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="hidden lg:flex items-center gap-3">
            <Link
              href="/contact"
              data-cursor-hover
              className={`inline-flex items-center gap-1.5 text-sm font-semibold px-5 py-2.5 rounded-full transition-colors duration-300 hover:bg-red ${
                onDarkHero ? "liquid-glass text-white" : "bg-[#0a0a0a] text-white"
              }`}
            >
              Start a Project <ArrowUpRight size={16} />
            </Link>
          </div>

          <button
            aria-label="Toggle menu"
            data-cursor-hover
            className={`lg:hidden relative z-50 transition-colors ${onDarkHero ? "text-white" : "text-[#0a0a0a]"}`}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ clipPath: "circle(0% at 100% 0%)" }}
            animate={{ clipPath: "circle(150% at 100% 0%)" }}
            exit={{ clipPath: "circle(0% at 100% 0%)" }}
            transition={{ duration: 0.6, ease: [0.65, 0, 0.35, 1] }}
            className="fixed inset-0 z-40 bg-white flex flex-col justify-center px-8"
          >
            <ul className="flex flex-col gap-4 sm:gap-5">
              {LINKS.map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 + i * 0.07 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="font-display text-3xl sm:text-4xl font-bold text-[#0a0a0a] hover:text-red transition-colors"
                  >
                    {link.label}
                  </Link>
                </motion.li>
              ))}
            </ul>

            <ul className="flex flex-wrap gap-x-5 gap-y-2 mt-6">
              {MORE_LINKS.map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 + (LINKS.length + i) * 0.05 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="text-sm font-medium text-black/50 hover:text-red transition-colors"
                  >
                    {link.label}
                  </Link>
                </motion.li>
              ))}
            </ul>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 + (LINKS.length + MORE_LINKS.length) * 0.05 }}
            >
              <Link
                href="/contact"
                onClick={() => setOpen(false)}
                className="inline-flex items-center gap-2 mt-6 bg-red text-white font-semibold px-6 py-3 rounded-full"
              >
                Start a Project <ArrowUpRight size={18} />
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
