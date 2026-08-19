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
    <section className="relative py-16 md:py-20 px-6 md:px-10 border-t border-b border-black/10">
      <div className="max-w-[1400px] mx-auto">
        <Reveal>
          <p className="text-center text-xs font-semibold uppercase tracking-widest text-black/40 mb-10">
            Trusted by ambitious brands &amp; founders
          </p>
        </Reveal>

        <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
          <div className="flex whitespace-nowrap animate-marquee">
            {[...CLIENTS, ...CLIENTS, ...CLIENTS].map((name, i) => (
              <span
                key={i}
                className="font-display text-xl md:text-2xl font-bold px-10 text-black/25 hover:text-red transition-colors duration-300"
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
