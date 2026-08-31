"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Reveal from "./Reveal";
import { EXPERTISE } from "@/data/expertise";

export default function TrustBar() {
  // Multiply list for seamless infinite loop
  const marqueeItems = [...EXPERTISE, ...EXPERTISE, ...EXPERTISE, ...EXPERTISE];

  return (
    <section className="relative py-8 sm:py-12 px-4 sm:px-8 border-t border-b border-black/[0.08] bg-[#f5f1ea] overflow-hidden select-none">
      <div className="max-w-[1400px] mx-auto mb-5 sm:mb-7">
        <Reveal>
          <p className="text-center text-xs font-bold uppercase tracking-[0.2em] text-black/45">
            What We Do
          </p>
        </Reveal>
      </div>

      {/* Auto-Scrolling Infinite Marquee Container */}
      <div className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: "linear",
          }}
          whileHover={{ animationPlayState: "paused" }}
          className="flex items-center gap-3 sm:gap-4 w-max py-1"
        >
          {marqueeItems.map((item, idx) => (
            <Link
              key={`${item.label}-${idx}`}
              href={item.href}
              data-cursor-hover
              className="group inline-flex items-center gap-2.5 rounded-full border border-black/10 bg-white/90 backdrop-blur-md px-5 py-2.5 sm:px-6 sm:py-3 shadow-xs transition-all duration-300 hover:border-red hover:bg-red hover:scale-105 active:scale-95 shrink-0"
            >
              <item.icon
                size={16}
                strokeWidth={2.2}
                className="text-red transition-colors duration-300 group-hover:text-white shrink-0"
              />
              <span className="text-xs sm:text-sm font-semibold text-black/80 whitespace-nowrap transition-colors duration-300 group-hover:text-white">
                {item.label}
              </span>
            </Link>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
