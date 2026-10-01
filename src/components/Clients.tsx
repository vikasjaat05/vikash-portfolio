"use client";

import Reveal from "./Reveal";

const FOCUS_AREAS = [
  "Shopify storefronts",
  "Custom web apps",
  "Commerce UX",
  "Design systems",
  "Speed optimization",
];

export default function Clients() {
  return (
    <section className="relative py-14 md:py-18 px-6 md:px-10 border-t border-b border-black/[0.08] bg-[#fbf9f5]/80 backdrop-blur-xs select-none">
      <div className="max-w-[1400px] mx-auto">
        <Reveal>
          <div className="flex items-center justify-center gap-2 mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-red animate-pulse" />
            <p className="text-center text-xs font-semibold uppercase tracking-widest text-black/60">
              What I build for growing teams
            </p>
          </div>
        </Reveal>

        <div
          className="clients-marquee-viewport relative overflow-hidden motion-reduce:!overflow-x-auto motion-reduce:![mask-image:none] [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]"
        >
          <div className="flex items-center whitespace-nowrap animate-marquee motion-reduce:!animate-none">
            {[...FOCUS_AREAS, ...FOCUS_AREAS, ...FOCUS_AREAS].map((name, i) => (
              <div key={i} className="inline-flex items-center">
                <span
                  className="font-display text-lg sm:text-xl md:text-2xl font-bold px-6 sm:px-8 text-black/60"
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
