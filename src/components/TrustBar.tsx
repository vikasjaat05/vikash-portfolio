"use client";

import Link from "next/link";
import Reveal from "./Reveal";
import { EXPERTISE } from "@/data/expertise";

export default function TrustBar() {
  return (
    <section className="relative py-10 md:py-14 px-6 md:px-10 border-t border-b border-black/10 bg-[#f5f1ea]">
      <div className="max-w-[1400px] mx-auto">
        <Reveal>
          <p className="text-center text-xs font-semibold uppercase tracking-widest text-black/40 mb-8">
            What we do
          </p>
        </Reveal>

        <Reveal delay={0.05}>
          <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4">
            {EXPERTISE.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                data-cursor-hover
                className="group inline-flex items-center gap-2.5 rounded-full border border-black/10 bg-white px-5 py-3 transition-colors duration-300 hover:border-red hover:bg-red"
              >
                <item.icon
                  size={16}
                  className="text-red transition-colors duration-300 group-hover:text-white"
                />
                <span className="text-sm font-semibold text-black/70 transition-colors duration-300 group-hover:text-white">
                  {item.label}
                </span>
              </Link>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
