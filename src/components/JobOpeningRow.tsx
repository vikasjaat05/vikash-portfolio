"use client";

import Link from "next/link";
import { ArrowUpRight, MapPin, Briefcase } from "lucide-react";
import { JobOpening } from "@/data/careers";
import { useInViewHover } from "./useInViewHover";

export default function JobOpeningRow({ job }: { job: JobOpening }) {
  const { ref, inView } = useInViewHover<HTMLAnchorElement>();

  return (
    <Link
      ref={ref}
      data-inview={inView}
      href="/contact"
      data-cursor-hover
      className="group flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8 py-8"
    >
      <div className="flex-1">
        <h3 className="font-display text-xl md:text-2xl font-bold transition-colors duration-300 group-hover:text-red group-data-[inview=true]:text-red mb-2">
          {job.title}
        </h3>
        <div className="flex items-center gap-4 text-sm text-black/50">
          <span className="flex items-center gap-1.5">
            <Briefcase size={14} /> {job.department}
          </span>
          <span className="flex items-center gap-1.5">
            <MapPin size={14} /> {job.location}
          </span>
          <span>{job.type}</span>
        </div>
      </div>
      <div className="w-10 h-10 rounded-full border border-black/15 flex items-center justify-center transition-colors duration-300 group-hover:bg-red group-hover:border-red group-data-[inview=true]:bg-red group-data-[inview=true]:border-red flex-shrink-0">
        <ArrowUpRight
          size={16}
          className="text-black/60 transition-all duration-300 group-hover:text-white group-hover:rotate-45 group-data-[inview=true]:text-white group-data-[inview=true]:rotate-45"
        />
      </div>
    </Link>
  );
}
