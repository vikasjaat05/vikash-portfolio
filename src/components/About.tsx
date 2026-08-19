"use client";

import Reveal from "./Reveal";
import Counter from "./Counter";

const STATS = [
  { value: 14, suffix: "+", label: "Live Stores & Builds" },
  { value: 1, suffix: "+", label: "Years Experience" },
  { value: 98, suffix: "%", label: "Client Satisfaction" },
];

export default function About() {
  return (
    <section id="about" className="relative py-28 md:py-36 px-6 md:px-10 bg-white overflow-hidden">
      <div className="absolute top-0 right-0 w-[40vw] h-[40vw] bg-red/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-[1400px] mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <Reveal>
              <div className="flex items-center gap-3 mb-6">
                <span className="w-2.5 h-2.5 rounded-full bg-red" />
                <span className="text-xs font-semibold uppercase tracking-widest text-black/50">
                  About me
                </span>
              </div>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="font-display font-extrabold text-4xl md:text-5xl lg:text-6xl leading-[1.05] mb-6">
                A developer obsessed with{" "}
                <span className="text-red">craft, speed and results.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="text-black/60 text-lg leading-relaxed max-w-lg">
                Hi, I&apos;m Vikash Choudhary — a Web &amp; Shopify Developer specializing in
                high-converting storefronts, scalable web applications, and modern digital
                experiences. I pair clean code architecture with pixel-level attention so sites
                feel as fast as they look.
              </p>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8 content-center">
            {STATS.map((stat, i) => (
              <Reveal key={stat.label} delay={i * 0.08}>
                <div className="border-l-2 border-red pl-5">
                  <div className="font-display text-4xl md:text-5xl font-extrabold">
                    <Counter to={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="text-black/50 text-xs sm:text-sm mt-2 uppercase tracking-wide">
                    {stat.label}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
