"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Service } from "@/data/services";
import { useInViewHover } from "./useInViewHover";
import { ServiceCategoryIcon, TechBadge } from "./TechIcons";

const SERVICE_LINKS: Record<string, string> = {
  "Shopify & E-Commerce": "/work/web",
  "Web Applications": "/work/app",
  "AI Prompting & Workflows": "/about",
  "UI/UX & Frontend Optimization": "/work/web",
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
      className="group relative py-10 md:py-14 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center select-none"
    >
      {/* Sliding Red Background on hover */}
      <div className="absolute inset-0 bg-red -translate-x-full transition-transform duration-500 ease-[cubic-bezier(0.65,0,0.35,1)] group-hover:translate-x-0 group-data-[inview=true]:translate-x-0 -mx-6 md:-mx-10 px-6 md:px-10 z-0" />

      {/* Index Number */}
      <div className="relative z-10 lg:col-span-1 font-mono text-sm font-bold text-black/35 transition-colors duration-500 group-hover:text-white/70 group-data-[inview=true]:text-white/70">
        {service.index}
      </div>

      {/* Title & Primary Category Hero Icon */}
      <div className="relative z-10 lg:col-span-4 flex items-start gap-4">
        <div className="w-12 h-12 rounded-2xl bg-white border border-black/10 shadow-xs flex items-center justify-center shrink-0 transition-all duration-500 group-hover:scale-110 group-hover:shadow-md group-data-[inview=true]:scale-110">
          <ServiceCategoryIcon
            type={service.primaryIcon ?? (service.index === "01" ? "shopify" : service.index === "02" ? "web" : service.index === "03" ? "ai" : "uiux")}
            className="w-6 h-6"
          />
        </div>
        <div>
          <h3 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight transition-colors duration-500 group-hover:text-white group-data-[inview=true]:text-white">
            {service.title}
          </h3>
          {service.subtitle && (
            <p className="mt-1 text-xs font-mono font-bold uppercase tracking-wider text-red transition-colors duration-500 group-hover:text-white/80 group-data-[inview=true]:text-white/80">
              {service.subtitle}
            </p>
          )}
        </div>
      </div>

      {/* Description & Tech Badges with Authentic Color Logos */}
      <div className="relative z-10 lg:col-span-5">
        <p className="text-black/65 text-sm md:text-base leading-relaxed transition-colors duration-500 group-hover:text-white/90 group-data-[inview=true]:text-white/90">
          {service.description}
        </p>

        {/* Tech Badges Row */}
        <div className="flex flex-wrap gap-2 mt-4">
          {service.techTags && service.techTags.length > 0 ? (
            service.techTags.map((tech) => (
              <TechBadge
                key={tech.name}
                icon={tech.icon}
                label={tech.name}
              />
            ))
          ) : (
            service.points.map((p) => (
              <span
                key={p}
                className="text-xs font-medium px-3 py-1 rounded-full border border-black/15 text-black/60 transition-colors duration-500 group-hover:border-white/40 group-hover:text-white group-data-[inview=true]:border-white/40 group-data-[inview=true]:text-white"
              >
                {p}
              </span>
            ))
          )}
        </div>
      </div>

      {/* Action Arrow Button */}
      <div className="relative z-10 lg:col-span-2 flex lg:justify-end">
        <Link
          href={SERVICE_LINKS[service.title] ?? "/work"}
          data-cursor-hover
          className="w-12 h-12 rounded-full border border-black/15 bg-white/60 backdrop-blur-xs flex items-center justify-center transition-all duration-500 group-hover:border-white group-hover:bg-white group-hover:scale-110 group-data-[inview=true]:border-white group-data-[inview=true]:bg-white"
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
