"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { STICKY_PROJECTS, StickyProject } from "@/data/stickyProjects";
import LiveProjectButton from "./LiveProjectButton";
import { useInViewHover } from "./useInViewHover";

export default function StickyProjects() {
  return (
    <section className="relative -mt-10 sm:-mt-12 md:-mt-14 z-10 rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] bg-[#0a0a0a] pt-16 md:pt-24 pb-10">
      <h2
        className="font-black uppercase leading-none tracking-tight text-center text-white"
        style={{
          background: "linear-gradient(180deg, #ffffff 0%, #8a8a8a 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          fontSize: "clamp(3rem, 12vw, 160px)",
        }}
      >
        Project
      </h2>

      <div className="relative px-4 sm:px-6 md:px-10 mt-8">
        {STICKY_PROJECTS.map((project, i) => (
          <StickyCard
            key={project.number}
            project={project}
            index={i}
            total={STICKY_PROJECTS.length}
          />
        ))}
      </div>
    </section>
  );
}

function StickyCard({
  project,
  index,
  total,
}: {
  project: StickyProject;
  index: number;
  total: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "start start"],
  });

  const targetScale = 1 - (total - 1 - index) * 0.03;
  const scale = useTransform(scrollYProgress, [0, 1], [1, targetScale]);
  const offset = index * 28;
  const { ref: hoverRef, inView } = useInViewHover<HTMLDivElement>();

  return (
    <div ref={ref} className="h-[85vh]">
      <motion.div
        ref={hoverRef}
        data-inview={inView}
        style={{ scale, y: offset }}
        className="group sticky top-24 md:top-32 w-full max-w-6xl mx-auto rounded-[40px] sm:rounded-[50px] md:rounded-[60px] border-2 border-[#D7E2EA] bg-[#0a0a0a] p-4 sm:p-6 md:p-8 transition-[border-color,box-shadow] duration-300 hover:border-red hover:shadow-2xl hover:shadow-red/10 data-[inview=true]:border-red data-[inview=true]:shadow-2xl data-[inview=true]:shadow-red/10"
      >
        <div className="flex items-center justify-between gap-4 mb-6 md:mb-8 flex-wrap">
          <div className="flex items-center gap-4 md:gap-6">
            <span
              className="font-black text-[#D7E2EA] leading-none"
              style={{ fontSize: "clamp(3rem, 10vw, 140px)" }}
            >
              {project.number}
            </span>
            <div>
              <span className="block text-[#D7E2EA]/50 uppercase tracking-widest text-xs sm:text-sm mb-1">
                {project.category}
              </span>
              <h3 className="text-[#D7E2EA] font-medium uppercase text-lg sm:text-2xl md:text-3xl">
                {project.name}
              </h3>
            </div>
          </div>
          <LiveProjectButton href={project.liveUrl} />
        </div>

        <div className="flex gap-3">
          <div className="flex flex-col gap-3 w-[40%]">
            <div
              className="relative w-full rounded-[40px] sm:rounded-[50px] md:rounded-[60px] overflow-hidden"
              style={{ height: "clamp(130px, 16vw, 230px)" }}
            >
              <Image
                src={project.col1[0]}
                alt={`${project.name} detail 1`}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105 group-data-[inview=true]:scale-105"
                sizes="40vw"
              />
            </div>
            <div
              className="relative w-full rounded-[40px] sm:rounded-[50px] md:rounded-[60px] overflow-hidden"
              style={{ height: "clamp(160px, 22vw, 340px)" }}
            >
              <Image
                src={project.col1[1]}
                alt={`${project.name} detail 2`}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105 group-data-[inview=true]:scale-105"
                sizes="40vw"
              />
            </div>
          </div>
          <div className="relative w-[60%] rounded-[40px] sm:rounded-[50px] md:rounded-[60px] overflow-hidden">
            <Image
              src={project.col2}
              alt={`${project.name} main`}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105 group-data-[inview=true]:scale-105"
              sizes="60vw"
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
}
