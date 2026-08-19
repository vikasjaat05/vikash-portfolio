"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { DIFFERENTIATORS } from "@/data/differentiators";
import { DISCIPLINES } from "@/data/disciplines";
import Reveal from "./Reveal";
import { useInViewHover } from "./useInViewHover";

export default function WhyChooseUs() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  return (
    <section className="relative py-28 md:py-36 px-6 md:px-10 bg-[#f5f1ea]">
      <div className="max-w-[1400px] mx-auto">
        <Reveal>
          <div className="flex items-center gap-3 mb-6">
            <span className="w-2.5 h-2.5 rounded-full bg-red" />
            <span className="text-xs font-semibold uppercase tracking-widest text-black/50">
              Why work with me
            </span>
          </div>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="font-display font-extrabold text-4xl md:text-6xl lg:text-7xl leading-[1.02] max-w-3xl mb-20 md:mb-28">
            What makes my approach <span className="text-red">different.</span>
          </h2>
        </Reveal>

        <div ref={sectionRef} className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          <div className="hidden lg:flex flex-col sticky top-32 h-fit">
            <p className="font-display text-3xl md:text-4xl font-bold leading-tight max-w-md mb-10">
              Five reasons clients stay with me long after the first project ships.
            </p>

            <div className="border-t border-black/10">
              {DISCIPLINES.map((d, i) => (
                <Reveal key={d.href} delay={i * 0.06}>
                  <Link
                    href={d.href}
                    data-cursor-hover
                    className="group flex items-center justify-between py-4 border-b border-black/10 hover:pl-2 transition-all duration-300"
                  >
                    <span className="font-medium group-hover:text-red transition-colors duration-300">
                      {d.label}
                    </span>
                    <ArrowUpRight
                      size={16}
                      className="text-black/30 group-hover:text-red group-hover:rotate-45 transition-all duration-300"
                    />
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-6 md:gap-8">
            {DIFFERENTIATORS.map((item, i) => (
              <ParallaxCard
                key={item.number}
                item={item}
                index={i}
                progress={scrollYProgress}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ParallaxCard({
  item,
  index,
  progress,
}: {
  item: (typeof DIFFERENTIATORS)[number];
  index: number;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
  const speed = index % 2 === 0 ? 90 : -90;
  const rawY = useTransform(progress, [0, 1], [speed, -speed]);
  const y = useSpring(rawY, { stiffness: 120, damping: 20, mass: 0.3 });
  const { ref, inView } = useInViewHover<HTMLDivElement>();

  return (
    <motion.div style={{ y }}>
      <motion.div
        ref={ref}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6, delay: (index % 4) * 0.06 }}
        whileHover={{ y: -6, borderColor: "rgba(225,6,0,0.3)" }}
        animate={inView ? { y: -6, borderColor: "rgba(225,6,0,0.3)" } : undefined}
        className="rounded-2xl md:rounded-3xl border border-black/[0.06] bg-white p-8 md:p-10 transition-shadow duration-300 hover:shadow-xl"
      >
        <span className="font-display text-sm font-bold text-red">{item.number}</span>
        <h3 className="font-display text-xl md:text-2xl font-bold mt-3 mb-3">{item.title}</h3>
        <p className="text-black/60 leading-relaxed">{item.description}</p>
      </motion.div>
    </motion.div>
  );
}
