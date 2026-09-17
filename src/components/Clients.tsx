"use client";

import Reveal from "./Reveal";

const CLIENTS = [
  "Lumen Finance",
  "Nova Retail",
  "Orbit Group",
  "Pulse Growth",
  "Vertex Cloud",
  "Drift Travel",
  "Halo Health",
  "Kindred Foods",
];

export default function Clients() {
  return (
    <section className="relative py-14 md:py-18 px-6 md:px-10 border-t border-b border-black/[0.08] bg-[#fbf9f5]/80 backdrop-blur-xs select-none">
      <div className="max-w-[1400px] mx-auto">
        <Reveal>
          <div className="flex items-center justify-center gap-2 mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-red animate-pulse" />
            <p className="text-center text-xs font-semibold uppercase tracking-widest text-black/45">
              Trusted by ambitious brands &amp; founders
            </p>
          </div>
        </Reveal>

        <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
          <div className="flex items-center whitespace-nowrap animate-marquee">
            {[...CLIENTS, ...CLIENTS, ...CLIENTS].map((name, i) => (
              <div key={i} className="inline-flex items-center">
                <span
                  data-cursor-hover
                  className="font-display text-lg sm:text-xl md:text-2xl font-bold px-6 sm:px-8 text-black/35 hover:text-black hover:scale-105 transition-all duration-300 cursor-pointer"
                >
                  {name}
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-red/40 inline-block shrink-0" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
