"use client";

import { motion } from "framer-motion";
import { Star, Quote, CheckCircle2, Globe2 } from "lucide-react";
import { TESTIMONIALS } from "@/data/testimonials";
import Reveal from "./Reveal";

export default function Testimonials() {
  // Multiply for seamless infinite loop
  const marqueeRow1 = [...TESTIMONIALS, ...TESTIMONIALS];
  const marqueeRow2 = [...TESTIMONIALS.slice(3), ...TESTIMONIALS.slice(0, 3), ...TESTIMONIALS, ...TESTIMONIALS];

  return (
    <section id="testimonials" className="relative py-20 sm:py-28 md:py-36 bg-[#f5f1ea] overflow-hidden select-none">
      {/* Ambient background glow */}
      <div className="absolute bottom-0 left-0 w-[35vw] h-[35vw] bg-red/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-[1400px] mx-auto relative z-10 px-4 sm:px-6 md:px-10 mb-10 sm:mb-16 text-center">
        <Reveal>
          <div className="flex items-center justify-center gap-2.5 mb-4 sm:mb-5">
            <span className="w-2.5 h-2.5 rounded-full bg-red animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-black/50">
              Verified Reviews &amp; Client Feedback
            </span>
          </div>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="font-display font-extrabold text-2xl sm:text-4xl md:text-6xl leading-[1.08] max-w-3xl mx-auto text-[#0a0a0a]">
            Trusted by founders across <span className="text-red">global markets.</span>
          </h2>
        </Reveal>
      </div>

      {/* Auto-Scrolling Horizontal Reviews Carousel (Row 1 - Moving Left) */}
      <div className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)] py-2 sm:py-3">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            duration: 35,
            repeat: Infinity,
            ease: "linear",
          }}
          whileHover={{ animationPlayState: "paused" }}
          className="flex items-stretch gap-4 sm:gap-6 w-max px-4"
        >
          {marqueeRow1.map((t, i) => (
            <ReviewCard key={`row1-${t.name}-${i}`} testimonial={t} />
          ))}
        </motion.div>
      </div>

      {/* Auto-Scrolling Horizontal Reviews Carousel (Row 2 - Moving Right - Desktop & Tablet) */}
      <div className="hidden sm:block relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)] py-2 sm:py-3 mt-2 sm:mt-4">
        <motion.div
          animate={{ x: ["-50%", "0%"] }}
          transition={{
            duration: 40,
            repeat: Infinity,
            ease: "linear",
          }}
          whileHover={{ animationPlayState: "paused" }}
          className="flex items-stretch gap-4 sm:gap-6 w-max px-4"
        >
          {marqueeRow2.map((t, i) => (
            <ReviewCard key={`row2-${t.name}-${i}`} testimonial={t} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function ReviewCard({
  testimonial,
}: {
  testimonial: (typeof TESTIMONIALS)[number];
}) {
  const initial = testimonial.name.charAt(0);

  return (
    <div
      data-cursor-hover
      className="w-[290px] sm:w-[360px] md:w-[400px] shrink-0 rounded-[24px] sm:rounded-3xl border border-black/[0.08] bg-white/95 backdrop-blur-md p-5 sm:p-7 flex flex-col justify-between shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:shadow-2xl hover:border-red/40 hover:-translate-y-1.5 transition-all duration-300 select-none"
    >
      <div>
        {/* Header with Project Tag and Country */}
        <div className="flex items-center justify-between gap-2 mb-4 pb-3.5 border-b border-black/[0.06]">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] sm:text-[11px] font-semibold bg-[#faf8f5] border border-black/10 text-black/75">
            <CheckCircle2 size={12} className="text-emerald-600 shrink-0" />
            <span className="truncate max-w-[140px]">{testimonial.company}</span>
          </span>

          <span className="inline-flex items-center gap-1 text-[10px] sm:text-[11px] font-mono text-black/50 shrink-0">
            <Globe2 size={12} />
            {testimonial.country}
          </span>
        </div>

        {/* Stars */}
        <div className="flex items-center gap-1 mb-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              size={14}
              className={i < testimonial.rating ? "text-amber-500 fill-amber-500" : "text-black/15 fill-black/15"}
            />
          ))}
          <span className="text-[11px] font-bold text-black/60 ml-1.5">5.0 Verified</span>
        </div>

        {/* Quote */}
        <p className="text-black/80 leading-relaxed text-xs sm:text-sm mb-5 line-clamp-4">
          &ldquo;{testimonial.quote}&rdquo;
        </p>
      </div>

      {/* Author Footer */}
      <div className="pt-3.5 border-t border-black/[0.06] flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-white font-bold text-xs sm:text-sm flex-shrink-0 shadow-xs"
            style={{ background: testimonial.color }}
          >
            {initial}
          </div>
          <div>
            <p className="font-display font-bold text-xs sm:text-sm leading-tight text-black">
              {testimonial.name}
            </p>
            <p className="text-black/50 text-[10px] sm:text-xs mt-0.5">
              {testimonial.role}, {testimonial.company}
            </p>
          </div>
        </div>

        <Quote size={18} className="text-black/15 flex-shrink-0" />
      </div>
    </div>
  );
}
