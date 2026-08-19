"use client";

import { Star } from "lucide-react";
import Reveal from "./Reveal";

export default function TrustStats() {
  return (
    <Reveal>
      <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-6 mb-14 md:mb-16">
        <div className="flex items-center gap-2">
          <Star size={22} className="text-red fill-red" />
          <div>
            <p className="font-display text-lg font-bold leading-none">4.9</p>
            <p className="text-xs text-black/50 mt-1">Average rating</p>
          </div>
        </div>
      </div>
    </Reveal>
  );
}
