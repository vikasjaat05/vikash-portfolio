"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Reveal from "./Reveal";
import WorkCategoryGrid from "./WorkCategoryGrid";

export default function Work() {
  return (
    <section id="work" className="relative py-28 md:py-36 px-6 md:px-10">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16 md:mb-20">
          <div>
            <Reveal>
              <div className="flex items-center gap-3 mb-6">
                <span className="w-2.5 h-2.5 rounded-full bg-red" />
                <span className="text-xs font-semibold uppercase tracking-widest text-black/50">
                  Selected work
                </span>
              </div>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="font-display font-extrabold text-4xl md:text-6xl lg:text-7xl leading-[1.02]">
                Work that speaks<br />for itself.
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <Link
              href="/work"
              data-cursor-hover
              className="inline-flex items-center gap-2 font-semibold underline-swipe whitespace-nowrap"
            >
              View all projects <ArrowUpRight size={18} />
            </Link>
          </Reveal>
        </div>

        <WorkCategoryGrid />
      </div>
    </section>
  );
}
