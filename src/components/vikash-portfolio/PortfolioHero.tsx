"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { HERO_VIDEOS, HERO_SLIDES } from "./heroVideos";
import styles from "./vikashHero.module.css";

const NAV_LINKS = [
  { index: "01", label: "Works", href: "#work" },
  { index: "02", label: "Services", href: "#services" },
  { index: "03", label: "About", href: "#explorations" },
  { index: "04", label: "Contact", href: "/contact" },
];

function useLiveClock() {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const formatter = new Intl.DateTimeFormat("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });
    const tick = () => setTime(formatter.format(new Date()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return time;
}

function usePreloadedVideos(sources: string[]) {
  const [resolved, setResolved] = useState<string[]>(sources);

  useEffect(() => {
    let cancelled = false;
    const objectUrls: string[] = [];

    Promise.all(
      sources.map(async (src, i) => {
        try {
          const res = await fetch(src);
          const blob = await res.blob();
          const url = URL.createObjectURL(blob);
          objectUrls.push(url);
          return { i, url };
        } catch {
          return { i, url: src };
        }
      })
    ).then((results) => {
      if (cancelled) return;
      setResolved((prev) => {
        const next = [...prev];
        results.forEach(({ i, url }) => {
          next[i] = url;
        });
        return next;
      });
    });

    return () => {
      cancelled = true;
      objectUrls.forEach((url) => URL.revokeObjectURL(url));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return resolved;
}

export default function PortfolioHero() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const nameRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const time = useLiveClock();
  const videoSrcs = usePreloadedVideos(HERO_VIDEOS);

  useEffect(() => {
    const targets = [nameRef.current, ctaRef.current].filter(
      (el): el is HTMLDivElement => el !== null
    );
    if (targets.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.revealed);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.35 }
    );

    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const isPink = activeIndex === 0;

  return (
    <section
      id="home"
      className={`${styles.hero} relative min-h-screen w-full overflow-hidden bg-black text-white`}
    >
      {/* bolt-cc-agent */}
      <div className="absolute inset-0 z-0">
        {HERO_VIDEOS.map((src, i) => (
          <video
            key={src}
            src={videoSrcs[i]}
            autoPlay
            muted
            playsInline
            loop
            aria-hidden="true"
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-[1200ms] ease-in-out ${
              i === activeIndex ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
        <div className="absolute inset-0 z-[1] bg-black/10" />
      </div>

      <header className="absolute inset-x-0 top-0 z-10">
        <div className="mx-auto flex max-w-[1340px] items-center justify-between px-[18px] py-6 md:px-[18px] md:py-[30px] lg:px-[15px] lg:py-9">
          <nav
            aria-label="Primary"
            className={`${styles.navLinks} hidden items-center gap-4 md:flex lg:gap-8`}
          >
            {NAV_LINKS.map((link) => (
              <a key={link.href} href={link.href} className={styles.navLink}>
                <span className="text-[8px] font-medium uppercase leading-3 tracking-[-0.08px]">
                  {link.index} /{" "}
                </span>
                <span className="text-xs font-medium uppercase leading-4 tracking-[-0.12px]">
                  {link.label}
                </span>
              </a>
            ))}
          </nav>

          <button
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
            className="relative z-20 md:hidden"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>

          <div className="hidden flex-col items-end gap-1 md:flex">
            <a
              href="mailto:vikashchoudhary@gmail.com"
              className="text-xs font-medium uppercase leading-4 tracking-[-0.12px] text-white/80 transition-colors hover:text-white"
            >
              vikashchoudhary@gmail.com
            </a>
            <span
              role="status"
              aria-label="Current time"
              className="text-[10px] font-medium uppercase leading-4 tracking-[-0.1px] text-white/50 tabular-nums"
            >
              IST {time ?? "00:00:00"}
            </span>
          </div>
        </div>

        <div
          className={`${styles.mobilePanel} ${menuOpen ? styles.mobilePanelOpen : ""}`}
        >
          <div className="overflow-hidden">
            <ul className="flex flex-col gap-5 px-[18px] pb-10">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="text-[28px] font-medium uppercase leading-8 tracking-[-0.84px]"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </header>

      <main
        className="relative z-[2] mx-auto flex min-h-screen max-w-[1340px] flex-col justify-end items-start gap-[72px] px-[18px] pb-11 pt-[140px] md:gap-7 md:px-[18px] md:pb-[52px] md:pt-[140px] lg:items-end lg:gap-[150px] lg:px-[15px] lg:pt-[190px]"
      >
        <div className="flex w-full flex-col gap-7 lg:flex-row lg:items-start">
          <div className="flex flex-col gap-3 lg:flex-[4] lg:flex-row lg:items-center lg:gap-8">
            {HERO_SLIDES.map((slide, i) => (
              <button
                key={slide.label}
                type="button"
                onClick={() => setActiveIndex(i)}
                className={`${styles.roleLink} text-left text-xs font-medium uppercase tracking-[-0.12px] transition-opacity duration-300 ${
                  i === activeIndex ? "opacity-100" : "opacity-55 hover:opacity-75"
                }`}
              >
                {String(i + 1).padStart(2, "0")} / {slide.label}
              </button>
            ))}
          </div>

          <div className="flex flex-1 items-center gap-2.5" aria-label="Availability status">
            <span
              className={styles.dot}
              style={{
                background: isPink ? "#F598F2" : "#ffffff",
                boxShadow: isPink
                  ? "0 0 12px 2px rgba(245,152,242,0.7)"
                  : "0 0 12px 2px rgba(255,255,255,0.6)",
              }}
              aria-hidden="true"
            />
            <span className="text-xs font-medium uppercase tracking-[-0.12px] text-white/85">
              Available for work
            </span>
          </div>
        </div>

        <div className="flex w-full flex-col gap-8 md:gap-7 md:pl-6 lg:flex-row lg:items-end lg:gap-0 lg:pb-[60px] lg:pl-0">
          <div ref={nameRef} className={`${styles.reveal} ${styles.revealUp} lg:flex-[2]`}>
            <h1 className="text-4xl leading-[1.05] tracking-tight sm:text-6xl md:text-[129.6px] md:leading-[113.4px] md:tracking-[-7.7px] lg:text-[200px] lg:leading-[81%] lg:tracking-[-6px] font-medium uppercase">
              Vikash Choudhary
              <span style={{ color: isPink ? "#F598F2" : "#ffffff" }}>.</span>
            </h1>
          </div>

          <div className="flex flex-col gap-6 md:pl-6 lg:flex-1 lg:pl-[50px]">
            <div ref={ctaRef} className={`${styles.reveal} ${styles.revealRight}`}>
              <p className="max-w-[420px] text-base font-medium leading-6 tracking-[-0.16px] text-white/85">
                I craft bold brands and modern websites with purpose, blending
                design and code to build digital experiences that leave a mark.
              </p>
            </div>
            <div
              className={`${styles.reveal} ${styles.revealRight}`}
              style={{ transitionDelay: "0.08s" }}
            >
              <Link href="#work" className={styles.startButton}>
                <span className={styles.startButtonLabel}>start a project</span>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </section>
  );
}
