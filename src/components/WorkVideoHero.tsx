"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { HERO_VIDEOS } from "@/data/heroVideos";
import AnimatedHeading from "./AnimatedHeading";

export default function WorkVideoHero() {
  const [active, setActive] = useState(0);
  const [transitioning, setTransitioning] = useState(false);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  const isDark = active === 2;

  const switchVideo = (index: number) => {
    if (index === active || transitioning) return;
    setActive(index);
    setTransitioning(true);
    setTimeout(() => setTransitioning(false), 1000);
  };

  return (
    <section className="relative w-full h-screen overflow-hidden bg-black">
      {HERO_VIDEOS.map((video, i) => (
        <video
          key={video.src}
          ref={(el) => {
            videoRefs.current[i] = el;
          }}
          autoPlay
          muted
          loop
          playsInline
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
            i === active ? "opacity-100" : "opacity-0"
          }`}
          src={video.src}
        />
      ))}
      <div className="absolute inset-0 bg-black/25" />

      <div className="relative z-10 flex flex-col h-full">
        <div className="flex-1 flex flex-col items-center justify-center text-center px-6">
          <div className="liquid-glass rounded-full px-5 py-2 mb-8 text-xs sm:text-sm text-white/90">
            Web &amp; Shopify Developer Portfolio
          </div>

          <AnimatedHeading
            mode="load"
            delay={0.2}
            className={`text-4xl sm:text-5xl md:text-7xl lg:text-[5.5rem] leading-[1.1] max-w-4xl font-display font-extrabold transition-colors duration-700 ${
              isDark ? "text-[#182C41]" : "text-white"
            }`}
          >
            Work that speaks
            <br />
            for itself.
          </AnimatedHeading>

          <p
            className={`mt-6 max-w-xl leading-relaxed transition-colors duration-700 ${
              isDark ? "text-[#182C41]/70" : "text-white/70"
            }`}
          >
            High-converting Shopify storefronts, full-stack web applications, and custom digital products built for scale and speed.
          </p>

          <Link
            href="#gallery"
            data-cursor-hover
            className="mt-10 bg-white text-[#0a0a0a] font-semibold px-8 py-4 rounded-full hover:bg-red hover:text-white transition-colors duration-300 shadow-xl"
          >
            Explore Projects
          </Link>

          <div className="flex items-center gap-6 sm:gap-8 mt-14 flex-wrap justify-center">
            {HERO_VIDEOS.map((video, i) => (
              <button
                key={video.label}
                data-cursor-hover
                onClick={() => switchVideo(i)}
                className={`text-xs sm:text-sm font-medium uppercase tracking-widest pb-2 border-b-2 transition-all duration-300 ${
                  i === active
                    ? `border-red ${isDark ? "text-[#182C41]" : "text-white"}`
                    : `border-transparent opacity-50 hover:opacity-80 ${
                        isDark ? "text-[#182C41]" : "text-white"
                      }`
                }`}
              >
                {video.label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 pb-8 sm:pb-10 text-white/70 text-xs sm:text-sm px-6 text-center">
          <span>Senior Engineering, Always</span>
        </div>
      </div>
    </section>
  );
}
