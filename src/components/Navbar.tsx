"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowUpRight,
  BookOpen,
  Briefcase,
  ChevronDown,
  FileText,
  Search,
  Sparkles,
  Star,
  Users,
  Volume2,
  VolumeX,
  X,
} from "lucide-react";
import { useBackgroundAudio } from "./BackgroundAudioContext";

// Primary links directly visible in desktop navbar
const primaryNavLinks = [
  { label: "Work", href: "/work" },
  { label: "Services", href: "/services" },
  { label: "Shop", href: "/buy-portfolio", badge: "Store" },
  { label: "About", href: "/about" },
  { label: "Resume", href: "/resume" },
];

// Secondary links nested in "More" dropdown
const moreNavLinks = [
  {
    label: "Agency",
    href: "/agency",
    description: "High-velocity product & web studio",
    icon: Briefcase,
  },
  {
    label: "Journal",
    href: "/journal",
    description: "Thoughts, engineering & design insights",
    icon: BookOpen,
  },
  {
    label: "Reviews",
    href: "/pricing",
    description: "Client reviews, packages & rates",
    icon: Star,
  },
  {
    label: "Careers",
    href: "/careers",
    description: "Collaborate & open opportunities",
    icon: Users,
  },
];

// All searchable links
const allLinks = [
  { label: "Home", href: "/", category: "Main" },
  { label: "Work", href: "/work", category: "Portfolio" },
  { label: "Services", href: "/services", category: "Offerings" },
  { label: "Shop", href: "/buy-portfolio", category: "Products" },
  { label: "About", href: "/about", category: "Bio" },
  { label: "Resume", href: "/resume", category: "Experience" },
  { label: "Agency", href: "/agency", category: "Studio" },
  { label: "Journal", href: "/journal", category: "Articles" },
  { label: "Reviews & Pricing", href: "/pricing", category: "Reviews" },
  { label: "Careers", href: "/careers", category: "Company" },
  { label: "Contact", href: "/contact", category: "Inquiries" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { playing, toggle: toggleMusic, trackTitle } = useBackgroundAudio();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [moreDropdownOpen, setMoreDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const dropdownTimerRef = useRef<NodeJS.Timeout | null>(null);
  const reduceMotion = useReducedMotion();

  const isCurrent = (href: string) =>
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(href + "/");

  const isMoreActive = moreNavLinks.some((item) => isCurrent(item.href));

  // Detect scroll state for dynamic compact glass appearance
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 24);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    const timer = setTimeout(() => {
      setMenuOpen(false);
      setSearchOpen(false);
      setMoreDropdownOpen(false);
    }, 0);
    return () => clearTimeout(timer);
  }, [pathname]);

  // Lock body scroll when mobile menu or search is open
  const overlayOpen = menuOpen || searchOpen;
  useEffect(() => {
    if (!overlayOpen) return;
    const prevBodyOverflow = document.body.style.overflow;
    const prevHtmlOverflow = document.documentElement.style.overflow;
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevBodyOverflow;
      document.documentElement.style.overflow = prevHtmlOverflow;
    };
  }, [overlayOpen]);

  // Keyboard shortcut: Cmd+K / Ctrl+K & Escape
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setMenuOpen(false);
        setMoreDropdownOpen(false);
        setSearchOpen((prev) => !prev);
      }
      if (event.key === "Escape") {
        setMenuOpen(false);
        setSearchOpen(false);
        setMoreDropdownOpen(false);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setMoreDropdownOpen(false);
      }
    };
    if (moreDropdownOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    }
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [moreDropdownOpen]);

  // Close mobile menu on desktop breakpoint
  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 1024px)");
    const onResize = () => {
      if (desktop.matches) setMenuOpen(false);
    };
    desktop.addEventListener("change", onResize);
    return () => desktop.removeEventListener("change", onResize);
  }, []);

  const handleDropdownEnter = () => {
    if (dropdownTimerRef.current) clearTimeout(dropdownTimerRef.current);
    setMoreDropdownOpen(true);
  };

  const handleDropdownLeave = () => {
    dropdownTimerRef.current = setTimeout(() => {
      setMoreDropdownOpen(false);
    }, 160);
  };

  const searchResults = allLinks.filter(
    (link) =>
      link.label.toLowerCase().includes(searchQuery.trim().toLowerCase()) ||
      link.category.toLowerCase().includes(searchQuery.trim().toLowerCase())
  );

  return (
    <>
      <header className="pointer-events-none fixed top-0 left-0 right-0 w-full max-w-full z-[110] px-3 pt-3 sm:px-6 sm:pt-4 transition-all duration-300">
        <div
          className={`header-glass-shell pointer-events-auto relative mx-auto flex w-full items-center justify-between rounded-full px-3 py-1.5 sm:px-4 sm:py-2 transition-all duration-300 ${
            scrolled
              ? "header-scrolled max-w-[1180px] h-[56px] sm:h-[60px]"
              : "max-w-[1240px] h-[60px] sm:h-[66px]"
          }`}
        >
          {/* Brand Logo & Status */}
          <Link
            href="/"
            aria-label="Vikash Choudhary — Home"
            className="group flex shrink-0 items-center gap-2.5 rounded-full py-1 pl-1 pr-3 transition-colors hover:bg-black/[0.04]"
          >
            {/* Custom Monogram Mark */}
            <div className="relative flex h-9 w-9 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-full bg-[#0a0a0a] text-white shadow-xs transition-transform duration-300 group-hover:scale-105">
              <span className="font-display text-[15px] sm:text-[16px] font-black tracking-tighter leading-none">
                V
              </span>
              <span className="absolute -bottom-0.5 -right-0.5 flex h-3 w-3 items-center justify-center">
                <span className="absolute h-2 w-2 rounded-full bg-[#e10600] animate-ping opacity-75" />
                <span className="relative h-2 w-2 rounded-full bg-[#e10600] border-2 border-white" />
              </span>
            </div>

            {/* Typography */}
            <div className="flex flex-col leading-none">
              <span className="font-display text-[13px] sm:text-[14px] font-bold tracking-[-0.03em] text-[#0a0a0a] group-hover:text-[#e10600] transition-colors">
                Vikash
              </span>
              <span className="text-[9px] sm:text-[10px] font-medium tracking-[0.08em] uppercase text-[#71717a]">
                Developer
              </span>
            </div>
          </Link>

          {/* Desktop Primary Navigation */}
          <nav
            aria-label="Primary navigation"
            className="hidden items-center gap-1 rounded-full px-1 lg:flex"
          >
            {primaryNavLinks.map((link) => {
              const active = isCurrent(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className={`group relative flex h-9 items-center gap-1.5 rounded-full px-3.5 text-[13px] font-medium tracking-tight transition-colors ${
                    active
                      ? "text-[#0a0a0a] font-semibold"
                      : "text-[#52525b] hover:text-[#0a0a0a]"
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="active-nav-pill"
                      className="absolute inset-0 -z-10 rounded-full bg-black/[0.06] border border-black/[0.04]"
                      transition={{ type: "spring", stiffness: 450, damping: 36 }}
                    />
                  )}
                  <span className="absolute inset-0 -z-10 rounded-full bg-black/0 transition-colors group-hover:bg-black/[0.04]" />
                  <span>{link.label}</span>
                  {link.badge && (
                    <span className="rounded-full bg-[#e10600]/10 px-1.5 py-0.5 text-[9px] font-bold text-[#e10600]">
                      {link.badge}
                    </span>
                  )}
                </Link>
              );
            })}

            {/* "More" Interactive Dropdown */}
            <div
              ref={dropdownRef}
              className="relative"
              onMouseEnter={handleDropdownEnter}
              onMouseLeave={handleDropdownLeave}
            >
              <button
                type="button"
                onClick={() => setMoreDropdownOpen((prev) => !prev)}
                aria-expanded={moreDropdownOpen}
                aria-haspopup="true"
                className={`group relative flex h-9 items-center gap-1 rounded-full px-3 text-[13px] font-medium tracking-tight transition-colors ${
                  isMoreActive
                    ? "text-[#0a0a0a] font-semibold"
                    : "text-[#52525b] hover:text-[#0a0a0a]"
                }`}
              >
                {isMoreActive && (
                  <motion.span
                    layoutId="active-nav-pill"
                    className="absolute inset-0 -z-10 rounded-full bg-black/[0.06] border border-black/[0.04]"
                    transition={{ type: "spring", stiffness: 450, damping: 36 }}
                  />
                )}
                <span className="absolute inset-0 -z-10 rounded-full bg-black/0 transition-colors group-hover:bg-black/[0.04]" />
                <span>More</span>
                <ChevronDown
                  size={14}
                  className={`transition-transform duration-200 ${
                    moreDropdownOpen ? "rotate-180 text-[#0a0a0a]" : "text-[#71717a]"
                  }`}
                />
              </button>

              <AnimatePresence>
                {moreDropdownOpen && (
                  <motion.div
                    initial={reduceMotion ? false : { opacity: 0, y: 8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 6, scale: 0.96 }}
                    transition={{ duration: 0.18, ease: "easeOut" }}
                    className="header-dropdown-menu absolute left-1/2 top-full mt-2 w-72 -translate-x-1/2 rounded-2xl p-2 z-50"
                  >
                    <div className="flex flex-col gap-0.5">
                      {moreNavLinks.map((item) => {
                        const Icon = item.icon;
                        const active = isCurrent(item.href);
                        return (
                          <Link
                            key={item.href}
                            href={item.href}
                            onClick={() => setMoreDropdownOpen(false)}
                            aria-current={active ? "page" : undefined}
                            className={`group/item flex items-start gap-3 rounded-xl p-2.5 transition-colors ${
                              active
                                ? "bg-[#e10600]/[0.08] text-[#e10600]"
                                : "hover:bg-black/[0.04] text-[#18181b]"
                            }`}
                          >
                            <div
                              className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg transition-colors ${
                                active
                                  ? "bg-[#e10600] text-white"
                                  : "bg-black/[0.05] text-[#52525b] group-hover/item:bg-[#0a0a0a] group-hover/item:text-white"
                              }`}
                            >
                              <Icon size={14} />
                            </div>
                            <div className="flex flex-col min-w-0">
                              <span
                                className={`text-[13px] font-semibold tracking-tight ${
                                  active ? "text-[#e10600]" : "text-[#0a0a0a]"
                                }`}
                              >
                                {item.label}
                              </span>
                              <span className="text-[11px] text-[#71717a] line-clamp-1 leading-snug">
                                {item.description}
                              </span>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </nav>

          {/* Right Action Utilities (Audio, Search, Contact CTA, Mobile Toggle) */}
          <div className="flex shrink-0 items-center gap-1 sm:gap-2">
            {/* Audio Toggle with Live Equalizer Animation */}
            <button
              type="button"
              onClick={toggleMusic}
              aria-label={playing ? "Pause ambient soundtrack" : "Play ambient soundtrack"}
              aria-pressed={playing}
              title={playing ? `Soundtrack Playing · ${trackTitle}` : "Play ambient soundtrack"}
              className={`relative flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full transition-all duration-200 ${
                playing
                  ? "bg-[#e10600]/10 text-[#e10600] hover:bg-[#e10600]/15"
                  : "text-[#52525b] hover:bg-black/[0.05] hover:text-[#0a0a0a]"
              }`}
            >
              {playing ? (
                <div className="flex items-center gap-0.5 h-4 w-4 justify-center" aria-hidden="true">
                  <span className="w-1 bg-[#e10600] rounded-full animate-eq-1" />
                  <span className="w-1 bg-[#e10600] rounded-full animate-eq-2" />
                  <span className="w-1 bg-[#e10600] rounded-full animate-eq-3" />
                </div>
              ) : (
                <VolumeX size={17} strokeWidth={1.8} />
              )}
            </button>

            {/* Search Command Palette Trigger */}
            <button
              type="button"
              onClick={() => {
                setMenuOpen(false);
                setSearchOpen(true);
              }}
              aria-label="Search pages (Cmd+K)"
              title="Search (⌘K)"
              className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full text-[#52525b] transition-colors hover:bg-black/[0.05] hover:text-[#0a0a0a]"
            >
              <Search size={17} strokeWidth={1.8} />
            </button>

            {/* Desktop Contact CTA */}
            <Link
              href="/contact"
              aria-current={isCurrent("/contact") ? "page" : undefined}
              className="group hidden h-9 sm:h-10 items-center gap-1.5 rounded-full bg-[#0a0a0a] px-4 text-[13px] font-semibold text-white shadow-xs transition-all duration-300 hover:bg-[#e10600] hover:shadow-md lg:flex"
            >
              <span>Let&apos;s Talk</span>
              <ArrowUpRight
                size={14}
                className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </Link>

            {/* Mobile Menu Trigger */}
            <button
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              aria-label={menuOpen ? "Close menu" : "Open navigation menu"}
              aria-expanded={menuOpen}
              aria-controls="header-mobile-menu"
              className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-[#0a0a0a] text-white transition-transform active:scale-95 lg:hidden"
            >
              {menuOpen ? <X size={18} /> : <div className="flex flex-col gap-1 w-4">
                <span className="h-0.5 w-full bg-white rounded-full" />
                <span className="h-0.5 w-2.5 bg-white rounded-full ml-auto" />
              </div>}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="header-mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduceMotion ? 0.1 : 0.22 }}
            className="fixed inset-0 z-[105] overflow-y-auto bg-black/30 px-3 pb-6 pt-[80px] sm:pt-[92px] backdrop-blur-md lg:hidden"
            onClick={(e) => {
              if (e.target === e.currentTarget) setMenuOpen(false);
            }}
          >
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: -16, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -12, scale: 0.98 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="header-liquid-panel relative mx-auto w-full max-w-[540px] rounded-3xl p-5 text-[#0a0a0a]"
            >
              {/* Header Status & Search */}
              <div className="flex items-center justify-between border-b border-black/[0.06] pb-3 mb-4">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute h-full w-full rounded-full bg-[#10b981] animate-ping opacity-75" />
                    <span className="relative h-2 w-2 rounded-full bg-[#10b981]" />
                  </span>
                  <span className="text-[12px] font-medium text-[#71717a]">
                    Available for Q2 Projects
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setMenuOpen(false);
                    setSearchOpen(true);
                  }}
                  className="flex items-center gap-1.5 rounded-full bg-black/[0.04] px-2.5 py-1 text-[11px] font-medium text-[#52525b] hover:bg-black/[0.08]"
                >
                  <Search size={12} />
                  <span>Search</span>
                </button>
              </div>

              {/* Main Highlights */}
              <div className="mb-4">
                <span className="text-[10px] font-bold uppercase tracking-[0.1em] text-[#a1a1aa] block mb-2 px-1">
                  Primary
                </span>
                <div className="grid grid-cols-2 gap-2">
                  {primaryNavLinks.map((link) => {
                    const active = isCurrent(link.href);
                    return (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setMenuOpen(false)}
                        className={`group flex items-center justify-between rounded-xl p-3 border transition-all ${
                          active
                            ? "bg-[#e10600]/[0.08] border-[#e10600]/20 text-[#e10600]"
                            : "bg-black/[0.02] border-black/[0.04] text-[#18181b] hover:bg-black/[0.05]"
                        }`}
                      >
                        <span className="text-[14px] font-semibold">{link.label}</span>
                        <ArrowUpRight
                          size={14}
                          className="opacity-40 group-hover:opacity-100 transition-opacity"
                        />
                      </Link>
                    );
                  })}
                </div>
              </div>

              {/* More Explore Links */}
              <div className="mb-4">
                <span className="text-[10px] font-bold uppercase tracking-[0.1em] text-[#a1a1aa] block mb-2 px-1">
                  Explore
                </span>
                <div className="grid grid-cols-2 gap-2">
                  {moreNavLinks.map((link) => {
                    const active = isCurrent(link.href);
                    const Icon = link.icon;
                    return (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setMenuOpen(false)}
                        className={`flex items-center gap-2.5 rounded-xl p-2.5 border transition-all ${
                          active
                            ? "bg-[#e10600]/[0.08] border-[#e10600]/20 text-[#e10600]"
                            : "bg-black/[0.02] border-black/[0.04] text-[#18181b] hover:bg-black/[0.05]"
                        }`}
                      >
                        <Icon size={14} className="text-[#71717a] shrink-0" />
                        <span className="text-[13px] font-medium truncate">{link.label}</span>
                      </Link>
                    );
                  })}
                </div>
              </div>

              {/* Bottom Direct CTA */}
              <Link
                href="/contact"
                onClick={() => setMenuOpen(false)}
                className="flex items-center justify-between rounded-2xl bg-[#0a0a0a] px-4 py-3 text-white transition-colors hover:bg-[#e10600]"
              >
                <div className="flex flex-col">
                  <span className="text-[13px] font-bold">Have a project in mind?</span>
                  <span className="text-[11px] text-[#a1a1aa]">Let&apos;s build something great</span>
                </div>
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10">
                  <ArrowUpRight size={16} />
                </div>
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modern Command Palette Search Modal */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[130] flex items-start justify-center bg-black/40 px-4 pt-[max(12vh,90px)] backdrop-blur-md"
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) setSearchOpen(false);
            }}
          >
            <motion.div
              initial={{ opacity: 0, y: -16, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -16, scale: 0.98 }}
              transition={{ duration: reduceMotion ? 0.1 : 0.2 }}
              role="dialog"
              aria-modal="true"
              aria-label="Search pages"
              className="header-dropdown-menu w-full max-w-lg overflow-hidden rounded-2xl text-[#0a0a0a]"
            >
              {/* Search Input Bar */}
              <div className="flex items-center gap-3 border-b border-black/[0.06] px-4 py-3.5">
                <Search size={18} className="text-[#e10600] shrink-0" />
                <input
                  autoFocus
                  type="search"
                  aria-label="Search portfolio pages"
                  placeholder="Search pages, projects, services..."
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  className="min-w-0 flex-1 bg-transparent text-[14px] font-medium text-[#0a0a0a] outline-none placeholder:text-[#a1a1aa]"
                />
                <button
                  type="button"
                  onClick={() => setSearchOpen(false)}
                  aria-label="Close search"
                  className="rounded-lg p-1.5 text-[#71717a] hover:bg-black/[0.05] hover:text-[#0a0a0a] transition-colors"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Results List */}
              <div className="max-h-[min(50vh,420px)] overflow-y-auto p-2">
                {searchResults.length > 0 ? (
                  searchResults.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setSearchOpen(false)}
                      className="group flex items-center justify-between rounded-xl px-3 py-2.5 transition-colors hover:bg-black/[0.04]"
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="text-[10px] font-semibold uppercase tracking-wider text-[#a1a1aa] bg-black/[0.04] px-1.5 py-0.5 rounded">
                          {link.category}
                        </span>
                        <span className="text-[13px] font-semibold text-[#18181b] group-hover:text-[#e10600] transition-colors">
                          {link.label}
                        </span>
                      </div>
                      <ArrowUpRight
                        size={14}
                        className="text-[#a1a1aa] opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all"
                      />
                    </Link>
                  ))
                ) : (
                  <div className="py-8 text-center text-[13px] text-[#a1a1aa]">
                    No matching pages found for &quot;{searchQuery}&quot;
                  </div>
                )}
              </div>

              {/* Shortcut Footer */}
              <div className="flex items-center justify-between border-t border-black/[0.06] bg-black/[0.02] px-4 py-2 text-[11px] text-[#71717a]">
                <span>Navigate anytime with ⌘K</span>
                <kbd className="rounded bg-black/[0.05] px-1.5 py-0.5 font-mono text-[10px]">
                  ESC to close
                </kbd>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
