"use client";

import Image from "next/image";
import Link from "next/link";
import { Globe, Share2, ArrowUpRight } from "lucide-react";
import type { Founder } from "@/lib/team-data";
import { useInViewHover } from "./useInViewHover";

export default function FounderCard({ founder, index }: { founder: Founder; index: number }) {
  const { ref, inView } = useInViewHover<HTMLAnchorElement>();

  return (
    <Link ref={ref} data-inview={inView} href={`/about/${founder.slug}`} data-cursor-hover className="group block">
      <div
        className="relative aspect-[4/5] rounded-2xl md:rounded-3xl overflow-hidden flex flex-col justify-between p-6 transition-transform duration-500 group-hover:-translate-y-2 group-data-[inview=true]:-translate-y-2"
        style={{ background: founder.gradient, transitionDelay: `${index * 40}ms` }}
      >
        <div className="relative z-10 flex items-center justify-between">
          <span className="text-xs font-semibold uppercase tracking-widest text-white/60">
            {founder.focus}
          </span>
          <div className="flex gap-2 opacity-0 translate-y-1 transition-all duration-400 group-hover:opacity-100 group-hover:translate-y-0 group-data-[inview=true]:opacity-100 group-data-[inview=true]:translate-y-0">
            <span className="w-8 h-8 rounded-full bg-white/15 backdrop-blur flex items-center justify-center">
              <Globe size={14} className="text-white" />
            </span>
            <span className="w-8 h-8 rounded-full bg-white/15 backdrop-blur flex items-center justify-center">
              <Share2 size={14} className="text-white" />
            </span>
          </div>
        </div>

        <div className="absolute inset-0">
          <Image
            src={founder.avatar}
            alt={founder.name}
            fill
            sizes="(min-width: 768px) 33vw, 100vw"
            className="object-cover object-top"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.05) 50%, rgba(0,0,0,0.55) 100%)",
            }}
          />
        </div>

        <div className="relative z-10 flex items-center justify-between">
          <span className="text-white font-semibold text-sm">View Profile</span>
          <div className="w-9 h-9 rounded-full bg-white/15 backdrop-blur flex items-center justify-center transition-colors duration-400 group-hover:bg-white group-data-[inview=true]:bg-white">
            <ArrowUpRight
              size={15}
              className="text-white transition-all duration-400 group-hover:text-[#0a0a0a] group-hover:rotate-45 group-data-[inview=true]:text-[#0a0a0a] group-data-[inview=true]:rotate-45"
            />
          </div>
        </div>
      </div>
    </Link>
  );
}
