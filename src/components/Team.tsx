"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Check, Sparkles } from "lucide-react";
import type { Founder } from "@/lib/team-data";
import Reveal from "./Reveal";
import { useInViewHover } from "./useInViewHover";

export default function Team({ members }: { members: Founder[] }) {
  const vikash =
    members.find(
      (m) => m.slug === "vikash-choudhary" || m.name.toLowerCase().includes("vikash")
    ) ?? members[0];

  const { ref, inView } = useInViewHover<HTMLDivElement>();

  if (!vikash) return null;

  return (
    <section className="relative py-24 md:py-32 px-6 md:px-10">
      <div className="max-w-[1400px] mx-auto">
        <Reveal>
          <div className="flex items-center gap-3 mb-6">
            <span className="w-2.5 h-2.5 rounded-full bg-red" />
            <span className="text-xs font-semibold uppercase tracking-widest text-black/50">
              About me
            </span>
          </div>
        </Reveal>

        <Reveal delay={0.05}>
          <h2 className="font-display font-extrabold text-3xl md:text-5xl lg:text-6xl leading-[1.08] max-w-2xl mb-12 md:mb-16">
            The developer behind <span className="text-red">every pixel.</span>
          </h2>
        </Reveal>

        <motion.div
          ref={ref}
          data-inview={inView}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center bg-[#f7f4ee] border border-black/[0.06] rounded-3xl p-6 sm:p-8 md:p-12 shadow-sm"
        >
          {/* Left Column: Portrait */}
          <div className="lg:col-span-5">
            <div className="group relative aspect-[4/5] rounded-2xl bg-[#ebe5da] overflow-hidden border border-black/[0.08] shadow-inner">
              <Image
                src={vikash.avatar}
                alt={vikash.name}
                fill
                priority
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover object-top transition-transform duration-700 group-hover:scale-105 group-data-[inview=true]:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />

              <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between text-white">
                <div>
                  <p className="font-display text-xl font-bold">{vikash.name}</p>
                  <p className="text-xs text-white/80">{vikash.role}</p>
                </div>
                <span className="inline-flex items-center gap-1 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-medium tracking-wide">
                  <Sparkles size={12} className="text-red" /> Available
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Bio, Highlights & Skills */}
          <div className="lg:col-span-7 flex flex-col justify-between h-full gap-6">
            <div>
              <div className="inline-flex items-center gap-2 border border-black/10 bg-white px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider text-black/70 mb-4 shadow-2xs">
                <span className="w-1.5 h-1.5 rounded-full bg-red" />
                {vikash.role}
              </div>

              <h3 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
                Hi, I&apos;m {vikash.name}.
              </h3>

              <p className="text-black/70 text-base md:text-lg leading-relaxed mb-6">
                {vikash.bio}
              </p>

              {/* Highlights */}
              <ul className="flex flex-col gap-2.5 mb-6">
                {vikash.highlights.map((point) => (
                  <li key={point} className="flex items-start gap-3">
                    <span className="mt-1 flex-shrink-0 w-4 h-4 rounded-full bg-red/10 flex items-center justify-center">
                      <Check size={11} className="text-red" strokeWidth={3} />
                    </span>
                    <span className="text-black/80 text-sm leading-relaxed">{point}</span>
                  </li>
                ))}
              </ul>

              {/* Skills Tags */}
              <div className="flex flex-wrap gap-2 pt-2">
                {vikash.skills.map((skill) => (
                  <span
                    key={skill}
                    className="text-xs font-medium px-3.5 py-1.5 rounded-full bg-white border border-black/10 text-black/70 shadow-2xs"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Action CTA */}
            <div className="pt-4 border-t border-black/10 flex flex-wrap items-center gap-3">
              <Link
                href="/resume"
                data-cursor-hover
                className="group liquid-btn-red !text-sm !font-semibold !px-6 !py-3 gap-2"
              >
                <span>View Resume (CV)</span>
                <ArrowUpRight size={16} className="group-hover:rotate-45 transition-transform duration-300" />
              </Link>

              <Link
                href={`/about/${vikash.slug}`}
                data-cursor-hover
                className="group liquid-btn-dark !text-sm !font-semibold !px-6 !py-3 gap-2"
              >
                <span>Full Profile</span>
                <ArrowUpRight size={16} className="group-hover:rotate-45 transition-transform duration-300" />
              </Link>

              <Link
                href="#contact"
                data-cursor-hover
                className="liquid-nav px-5 py-3 rounded-full text-sm font-semibold text-black/80 hover:text-black hover:scale-105 transition-all duration-300"
              >
                Get in touch
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
