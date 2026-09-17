"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { SERVICES } from "@/data/services";
import Reveal from "./Reveal";
import { useInViewHover } from "./useInViewHover";
import { ServiceCategoryIcon, TechBadge } from "./TechIcons";
import TechBlackHole from "./TechBlackHole";

export default function Services() {
  return (
    <section id="services" className="relative py-24 md:py-32 px-6 md:px-10 overflow-hidden">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8 mb-16 md:mb-20">
          <div className="max-w-2xl">
            <Reveal>
              <div className="flex items-center gap-3 mb-6">
                <span className="w-2.5 h-2.5 rounded-full bg-red" />
                <span className="text-xs font-semibold uppercase tracking-widest text-black/50">
                  What I do
                </span>
              </div>
            </Reveal>

            <Reveal delay={0.05}>
              <h2 className="font-display font-extrabold text-4xl md:text-6xl lg:text-7xl leading-[1.02] tracking-tight">
                Modern web engineering. <span className="text-red">Zero compromise.</span>
              </h2>
            </Reveal>
          </div>

          {/* Desktop Only: Interactive Tech Black Hole (Gravitational Orbit of Colored Tech Icons) */}
          <div className="hidden lg:flex items-center justify-center shrink-0">
            <Reveal delay={0.1}>
              <TechBlackHole />
            </Reveal>
          </div>
        </div>

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
      className="group relative py-10 md:py-14 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center cursor-pointer select-none"
      data-cursor-hover
    >
      {/* Red hover overlay slide */}
      <div className="absolute inset-0 bg-red -translate-x-full transition-transform duration-500 ease-[cubic-bezier(0.65,0,0.35,1)] group-hover:translate-x-0 group-data-[inview=true]:translate-x-0 -mx-6 md:-mx-10 px-6 md:px-10 z-0" />

      {/* Index Number */}
      <div className="relative z-10 lg:col-span-1 font-mono text-sm font-bold text-black/35 transition-colors duration-500 group-hover:text-white/70 group-data-[inview=true]:text-white/70">
        {service.index}
      </div>

      {/* Title & Primary Category Hero Icon */}
      <div className="relative z-10 lg:col-span-4 flex items-start gap-4">
        <div className="w-12 h-12 rounded-2xl bg-white border border-black/10 shadow-xs flex items-center justify-center shrink-0 transition-all duration-500 group-hover:scale-110 group-hover:shadow-md group-data-[inview=true]:scale-110">
          <ServiceCategoryIcon
            type={service.primaryIcon ?? (index === 0 ? "shopify" : index === 1 ? "web" : index === 2 ? "ai" : "uiux")}
            className="w-6 h-6"
          />
        </div>
        <div>
          <h3 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight transition-colors duration-500 group-hover:text-white group-data-[inview=true]:text-white">
            {service.title}
          </h3>
          {service.subtitle && (
            <p className="mt-1 text-xs font-mono font-bold uppercase tracking-wider text-red transition-colors duration-500 group-hover:text-white/80 group-data-[inview=true]:text-white/80">
              {service.subtitle}
            </p>
          )}
        </div>
      </div>

      {/* Description & Tech Badges with Authentic Color Logos */}
      <div className="relative z-10 lg:col-span-5">
        <p className="text-black/65 text-sm md:text-base leading-relaxed transition-colors duration-500 group-hover:text-white/90 group-data-[inview=true]:text-white/90">
          {service.description}
        </p>

        {/* Tech Badges Row */}
        <div className="flex flex-wrap gap-2 mt-4">
          {service.techTags && service.techTags.length > 0 ? (
            service.techTags.map((tech) => (
              <TechBadge
                key={tech.name}
                icon={tech.icon}
                label={tech.name}
              />
            ))
          ) : (
            service.points.map((p) => (
              <span
                key={p}
                className="text-xs font-medium px-3 py-1 rounded-full border border-black/15 text-black/60 transition-colors duration-500 group-hover:border-white/40 group-hover:text-white group-data-[inview=true]:border-white/40 group-data-[inview=true]:text-white"
              >
                {p}
              </span>
            ))
          )}
        </div>
      </div>

      {/* Action Button */}
      <div className="relative z-10 lg:col-span-2 flex lg:justify-end">
        <Link
          href="/services"
          className="w-12 h-12 rounded-full border border-black/15 bg-white/60 backdrop-blur-xs flex items-center justify-center transition-all duration-500 group-hover:border-white group-hover:bg-white group-hover:scale-110 group-data-[inview=true]:border-white group-data-[inview=true]:bg-white"
        >
          <ArrowUpRight
            size={20}
            className="text-black/60 transition-all duration-500 group-hover:text-red group-hover:rotate-45 group-data-[inview=true]:text-red group-data-[inview=true]:rotate-45"
          />
        </Link>
      </div>
    </motion.div>
  );
}
