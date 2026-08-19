"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Service } from "@/data/services";
import { useInViewHover } from "./useInViewHover";

const SERVICE_LINKS: Record<string, string> = {
  "Web Development": "/work/web",
  "App Development": "/work/app",
  "Digital Marketing": "/work/marketing",
  "Graphic Design": "/work/graphics",
};

export default function ServicesPageRow({ service }: { service: Service }) {
  const { ref, inView } = useInViewHover<HTMLDivElement>();

  return (
    <div
      ref={ref}
      data-inview={inView}
      className="group relative py-10 md:py-12 grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-center"
    >
      <div className="absolute inset-0 bg-red -translate-x-full transition-transform duration-500 ease-[cubic-bezier(0.65,0,0.35,1)] group-hover:translate-x-0 group-data-[inview=true]:translate-x-0 -mx-6 md:-mx-10 px-6 md:px-10 z-0" />

      <div className="relative z-10 md:col-span-1 font-display text-sm font-bold text-black/30 transition-colors duration-500 group-hover:text-white/70 group-data-[inview=true]:text-white/70">
        {service.index}
      </div>

      <div className="relative z-10 md:col-span-4">
        <h3 className="font-display text-2xl md:text-4xl font-bold transition-colors duration-500 group-hover:text-white group-data-[inview=true]:text-white">
          {service.title}
        </h3>
      </div>

      <div className="relative z-10 md:col-span-5">
        <p className="text-black/60 transition-colors duration-500 group-hover:text-white/85 group-data-[inview=true]:text-white/85 leading-relaxed">
          {service.description}
        </p>
        <div className="flex flex-wrap gap-2 mt-4">
          {service.points.map((p) => (
            <span
              key={p}
              className="text-xs font-medium px-3 py-1 rounded-full border border-black/15 text-black/60 transition-colors duration-500 group-hover:border-white/40 group-hover:text-white group-data-[inview=true]:border-white/40 group-data-[inview=true]:text-white"
            >
              {p}
            </span>
          ))}
        </div>
      </div>

      <div className="relative z-10 md:col-span-2 flex md:justify-end">
        <Link
          href={SERVICE_LINKS[service.title] ?? "/work"}
          data-cursor-hover
          className="w-12 h-12 rounded-full border border-black/15 flex items-center justify-center transition-colors duration-500 group-hover:border-white group-hover:bg-white group-data-[inview=true]:border-white group-data-[inview=true]:bg-white"
        >
          <ArrowUpRight
            size={20}
            className="text-black/60 transition-all duration-500 group-hover:text-red group-hover:rotate-45 group-data-[inview=true]:text-red group-data-[inview=true]:rotate-45"
          />
        </Link>
      </div>
    </div>
  );
}
