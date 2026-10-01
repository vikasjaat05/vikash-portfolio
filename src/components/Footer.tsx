"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import AnimatedHeading from "./AnimatedHeading";
import AnimatedLogo from "./AnimatedLogo";

const BG_VIDEO =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260928_144832_2b6b23aa-4416-4fcb-9df4-132349c59edc.mp4";

const SERVICES_LINKS = [
  { label: "Web Development", href: "/work/web" },
  { label: "Shopify Storefronts", href: "/work/web" },
  { label: "Web Applications", href: "/work/web" },
  { label: "Headless Commerce", href: "/work/web" },
];
const COMPANY_LINKS = [
  { label: "About Me", href: "/about" },
  { label: "Vikash Studio", href: "/agency" },
  { label: "Services", href: "/services" },
  { label: "Work", href: "/work" },
  { label: "Resume (CV)", href: "/resume" },
];
const RESOURCES_LINKS = [
  { label: "Buy Portfolio", href: "/buy-portfolio" },
  { label: "FAQ & Reviews", href: "/pricing" },
  { label: "Journal", href: "/journal" },
  { label: "Contact", href: "/contact" },
];

export default function Footer() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const playVideo = () => {
      if (video.paused) {
        video.play().catch(() => {});
      }
    };

    playVideo();

    // Mobile fallback triggers for power-saver / user-gesture restrictions
    const onUserInteraction = () => {
      playVideo();
    };

    window.addEventListener("touchstart", onUserInteraction, { once: true, passive: true });
    window.addEventListener("scroll", onUserInteraction, { once: true, passive: true });

    if ("IntersectionObserver" in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              playVideo();
            } else {
              video.pause();
            }
          });
        },
        { threshold: 0.05 }
      );
      observer.observe(video);
      return () => {
        observer.disconnect();
        window.removeEventListener("touchstart", onUserInteraction);
        window.removeEventListener("scroll", onUserInteraction);
      };
    }

    return () => {
      window.removeEventListener("touchstart", onUserInteraction);
      window.removeEventListener("scroll", onUserInteraction);
    };
  }, []);

  return (
    <footer className="relative overflow-hidden bg-black">
      {/* Background Video — Optimized for mobile with dedicated framing and seamless fade */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden="true"
          tabIndex={-1}
          disablePictureInPicture
          className="absolute top-0 left-0 w-full h-[540px] sm:h-[620px] md:h-full object-cover object-[50%_35%] md:object-center scale-100 md:scale-[1.08] transition-transform duration-700"
          src={BG_VIDEO}
        />
        {/* Gradient Overlay for high text legibility and smooth mobile transition */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/60 to-black md:bg-black/55 pointer-events-none" />
      </div>

      <div className="relative z-10 px-6 md:px-10 pt-24 md:pt-32 pb-10">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center mb-20 md:mb-28">
            <AnimatedHeading
              as="h2"
              className="font-display text-3xl sm:text-5xl md:text-6xl font-bold text-white leading-tight max-w-3xl mx-auto mb-8"
            >
              Let&apos;s build your next big idea.
            </AnimatedHeading>
            <Link
              href="/contact"
              data-cursor-hover
              className="liquid-glass inline-flex items-center gap-2 rounded-full px-8 py-3.5 text-sm font-medium text-white hover:bg-white/5 transition-colors"
            >
              Start a Project <ArrowUpRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-12 mb-12 md:mb-16">
            <div className="md:col-span-5">
              <AnimatedLogo onDark={true} />
              <p className="text-white/70 mt-4 max-w-xs leading-relaxed">
                Web &amp; Shopify Developer crafting fast, scalable storefronts, web
                applications, and modern digital experiences.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 md:gap-10 md:col-span-7">
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-widest text-white/50 mb-5">
                  Services
                </h4>
                <ul className="space-y-3">
                  {SERVICES_LINKS.map((s) => (
                    <li key={s.label}>
                      <Link
                        href={s.href}
                        data-cursor-hover
                        className="text-white/80 hover:text-white transition-colors text-sm md:text-base"
                      >
                        {s.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-xs font-semibold uppercase tracking-widest text-white/50 mb-5">
                  Navigation
                </h4>
                <ul className="space-y-3">
                  {COMPANY_LINKS.map((c) => (
                    <li key={c.label}>
                      <Link
                        href={c.href}
                        data-cursor-hover
                        className="text-white/80 hover:text-white transition-colors text-sm md:text-base"
                      >
                        {c.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-xs font-semibold uppercase tracking-widest text-white/50 mb-5">
                  Resources
                </h4>
                <ul className="space-y-3">
                  {RESOURCES_LINKS.map((r) => (
                    <li key={r.label}>
                      <Link
                        href={r.href}
                        data-cursor-hover
                        className="text-white/80 hover:text-white transition-colors text-sm md:text-base"
                      >
                        {r.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 border-t border-white/15 text-sm text-white/60">
            <span>© {new Date().getFullYear()} Vikash Choudhary. All rights reserved.</span>
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
              <Link href="/privacy" data-cursor-hover className="hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" data-cursor-hover className="hover:text-white transition-colors">
                Terms &amp; Conditions
              </Link>
              <button type="button" onClick={() => window.dispatchEvent(new Event("show-app-install"))} className="hover:text-white transition-colors">
                Install App
              </button>
              <span>Designed &amp; built with care.</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
