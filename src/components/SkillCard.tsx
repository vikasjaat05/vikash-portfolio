"use client";

import { Sparkles } from "lucide-react";
import { useInViewHover } from "./useInViewHover";

export default function SkillCard({ skill, index }: { skill: string; index: number }) {
  const { ref, inView } = useInViewHover<HTMLDivElement>();

  return (
    <div
      ref={ref}
      data-inview={inView}
      className="glass-card group h-full rounded-2xl md:rounded-3xl p-6 md:p-7 flex flex-col justify-between gap-8 min-h-[160px]"
    >
      <div className="flex items-center justify-between">
        <span className="font-display text-xs font-bold text-red">
          {String(index + 1).padStart(2, "0")}
        </span>
        <span className="w-9 h-9 rounded-full bg-white/70 border border-black/[0.06] flex items-center justify-center transition-colors duration-300 group-hover:bg-red group-hover:border-red group-data-[inview=true]:bg-red group-data-[inview=true]:border-red">
          <Sparkles
            size={16}
            className="text-black/50 transition-colors duration-300 group-hover:text-white group-data-[inview=true]:text-white"
          />
        </span>
      </div>
      <h3 className="font-display text-lg md:text-xl font-bold leading-snug">{skill}</h3>
    </div>
  );
}
