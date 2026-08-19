"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Reveal from "./Reveal";

const STEPS = [
  {
    n: "01",
    title: "Discover",
    desc: "We dig into your business, audience and goals to find the real opportunity worth building for.",
  },
  {
    n: "02",
    title: "Design",
    desc: "Strategy becomes visuals — wireframes, brand systems and prototypes shaped around how people actually behave.",
  },
  {
    n: "03",
    title: "Develop",
    desc: "Our engineers turn designs into fast, resilient websites, apps and campaigns — built to scale from day one.",
  },
  {
    n: "04",
    title: "Deliver & Grow",
    desc: "We launch, measure and iterate — pairing marketing muscle with product data to keep compounding results.",
  },
];

export default function Process() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.8", "end 0.4"],
  });
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="process" className="relative py-28 md:py-36 px-6 md:px-10">
      <div className="max-w-[1400px] mx-auto">
        <Reveal>
          <div className="flex items-center gap-3 mb-6">
            <span className="w-2.5 h-2.5 rounded-full bg-red" />
            <span className="text-xs font-semibold uppercase tracking-widest text-black/50">
              How we work
            </span>
          </div>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="font-display font-extrabold text-4xl md:text-6xl lg:text-7xl leading-[1.02] max-w-2xl mb-20 md:mb-28">
            A process built for <span className="text-red">momentum.</span>
          </h2>
        </Reveal>

        <div ref={ref} className="relative grid grid-cols-1 md:grid-cols-2 gap-y-16 md:gap-y-24 gap-x-16">
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-black/10 -translate-x-1/2">
            <motion.div
              style={{ scaleY, originY: 0 }}
              className="absolute top-0 left-0 w-full h-full bg-red"
            />
          </div>

          {STEPS.map((step, i) => (
            <motion.div
              key={step.n}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className={`relative ${i % 2 === 0 ? "md:pr-16 md:text-right" : "md:pl-16 md:col-start-2"}`}
            >
              <span className="font-display text-5xl md:text-8xl font-extrabold text-black/[0.06] absolute -top-8 md:-top-10 left-0 md:left-auto md:right-0 select-none">
                {step.n}
              </span>
              <h3 className="relative font-display text-2xl md:text-3xl font-bold mb-3 pt-8">
                {step.title}
              </h3>
              <p className="relative text-black/60 leading-relaxed max-w-sm md:ml-auto">
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
