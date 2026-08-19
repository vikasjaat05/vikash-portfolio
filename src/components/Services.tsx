"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { SERVICES } from "@/data/services";
import Reveal from "./Reveal";
import { useInViewHover } from "./useInViewHover";

export default function Services() {
  return (
    <section id="services" className="relative py-28 md:py-36 px-6 md:px-10">
      <div className="max-w-[1400px] mx-auto">
        <Reveal>
          <div className="flex items-center gap-3 mb-6">
            <span className="w-2.5 h-2.5 rounded-full bg-red" />
            <span className="text-xs font-semibold uppercase tracking-widest text-black/50">
              What I do
            </span>
          </div>
        </Reveal>

        <Reveal delay={0.05}>
          <h2 className="font-display font-extrabold text-4xl md:text-6xl lg:text-7xl leading-[1.02] max-w-3xl mb-16 md:mb-24">
            Modern web engineering. <span className="text-red">Zero compromise.</span>
          </h2>
        </Reveal>

        <div className="divide-y divide-black/10 border-t border-b border-black/10">
          {SERVICES.map((service, i) => (
            <ServiceRow key={service.index} service={service} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceRow({
  service,
  index,
}: {
  service: (typeof SERVICES)[number];
  index: number;
}) {
  const { ref, inView } = useInViewHover<HTMLDivElement>();

  return (
    <motion.div
      ref={ref}
      data-inview={inView}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className="group relative py-10 md:py-12 grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-center cursor-pointer"
      data-cursor-hover
    >
      <div className="absolute inset-0 bg-red -translate-x-full transition-transform duration-500 ease-[cubic-bezier(0.65,0,0.35,1)] group-hover:translate-x-0 group-data-[inview=true]:translate-x-0 -mx-6 md:-mx-10 px-6 md:px-10 z-0" />

      <div className="relative z-10 md:col-span-1 font-display text-sm font-bold text-black/30 transition-colors duration-500 group-hover:text-white/70 group-data-[inview=true]:text-white/70">
        {service.index}
      </div>

      <div className="relative z-10 md:col-span-4">
        <h3 className="font-display text-2xl md:text-4xl font-bold transition-colors duration-500 group-hover:text-white group-data-[inview=true]:text-white">
          {service.title}
        </h3>
      </div>

      <div className="relative z-10 md:col-span-5">
        <p className="text-black/60 transition-colors duration-500 group-hover:text-white/85 group-data-[inview=true]:text-white/85 leading-relaxed">
          {service.description}
        </p>
        <div className="flex flex-wrap gap-2 mt-4">
          {service.points.map((p) => (
            <span
              key={p}
              className="text-xs font-medium px-3 py-1 rounded-full border border-black/15 text-black/60 transition-colors duration-500 group-hover:border-white/40 group-hover:text-white group-data-[inview=true]:border-white/40 group-data-[inview=true]:text-white"
            >
              {p}
            </span>
          ))}
        </div>
      </div>

      <div className="relative z-10 md:col-span-2 flex md:justify-end">
        <div className="w-12 h-12 rounded-full border border-black/15 flex items-center justify-center transition-colors duration-500 group-hover:border-white group-hover:bg-white group-data-[inview=true]:border-white group-data-[inview=true]:bg-white">
          <ArrowUpRight
            size={20}
            className="text-black/60 transition-all duration-500 group-hover:text-red group-hover:rotate-45 group-data-[inview=true]:text-red group-data-[inview=true]:rotate-45"
          />
        </div>
      </div>
    </motion.div>
  );
}
