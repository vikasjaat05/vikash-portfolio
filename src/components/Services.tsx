"use client";

import { SERVICES } from "@/data/services";
import Reveal from "./Reveal";
import TechBlackHole from "./TechBlackHole";
import ServicesPageRow from "./ServicesPageRow";

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
          {SERVICES.map((service) => (
            <ServicesPageRow key={service.index} service={service} />
          ))}
        </div>
      </div>
    </section>
  );
}
