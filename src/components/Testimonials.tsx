"use client";

import { motion } from "framer-motion";
import { Star, Quote, CheckCircle2, Globe2 } from "lucide-react";
import { TESTIMONIALS } from "@/data/testimonials";
import Reveal from "./Reveal";

export default function Testimonials() {
  return (
    <section id="testimonials" className="relative py-24 md:py-36 px-6 md:px-10 bg-[#f5f1ea] overflow-hidden">
      <div className="absolute bottom-0 left-0 w-[35vw] h-[35vw] bg-red/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-[1400px] mx-auto relative z-10">
        <div className="text-center mb-16 md:mb-20">
          <Reveal>
            <div className="flex items-center justify-center gap-3 mb-6">
              <span className="w-2.5 h-2.5 rounded-full bg-red" />
              <span className="text-xs font-semibold uppercase tracking-widest text-black/50">
                Verified Reviews &amp; Client Feedback
              </span>
            </div>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="font-display font-extrabold text-3xl sm:text-5xl md:text-6xl leading-[1.02] max-w-3xl mx-auto">
              Trusted by founders across <span className="text-red">global markets.</span>
            </h2>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {TESTIMONIALS.map((t, i) => (
            <ReviewCard key={t.name} testimonial={t} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ReviewCard({
  testimonial,
  index,
}: {
  testimonial: (typeof TESTIMONIALS)[number];
  index: number;
}) {
  const initial = testimonial.name.charAt(0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: (index % 6) * 0.06, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -6 }}
      className="rounded-3xl border border-black/[0.08] bg-white p-7 md:p-8 flex flex-col justify-between transition-all duration-300 hover:shadow-2xl hover:border-red/30"
    >
      <div>
        {/* Header with Project Tag and Country */}
        <div className="flex items-center justify-between gap-2 mb-5 pb-4 border-b border-black/[0.06]">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold bg-[#faf8f5] border border-black/10 text-black/75">
            <CheckCircle2 size={12} className="text-emerald-600" />
            {testimonial.company}
          </span>

          <span className="inline-flex items-center gap-1 text-[11px] font-mono text-black/50">
            <Globe2 size={12} />
            {testimonial.country}
          </span>
        </div>

        {/* Stars */}
        <div className="flex items-center gap-1 mb-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              size={15}
              className={i < testimonial.rating ? "text-amber-500 fill-amber-500" : "text-black/15 fill-black/15"}
            />
          ))}
          <span className="text-xs font-bold text-black/60 ml-2">5.0</span>
        </div>

        {/* Quote */}
        <p className="text-black/80 leading-relaxed text-sm sm:text-[15px] mb-6">
          &ldquo;{testimonial.quote}&rdquo;
        </p>
      </div>

      {/* Author Footer */}
      <div className="pt-4 border-t border-black/[0.06] flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0 shadow-xs"
            style={{ background: testimonial.color }}
          >
            {initial}
          </div>
          <div>
            <p className="font-display font-bold text-sm leading-tight text-black">
              {testimonial.name}
            </p>
            <p className="text-black/50 text-xs mt-0.5">
              {testimonial.role}, {testimonial.company}
            </p>
          </div>
        </div>

        <Quote size={20} className="text-black/15 flex-shrink-0" />
      </div>
    </motion.div>
  );
}
