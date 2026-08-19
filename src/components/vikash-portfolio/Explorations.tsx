"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./portfolio.module.css";
import { EXPLORATIONS } from "./data";

gsap.registerPlugin(ScrollTrigger);

export default function Explorations() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const colARef = useRef<HTMLDivElement>(null);
  const colBRef = useRef<HTMLDivElement>(null);

  const colA = EXPLORATIONS.filter((_, i) => i % 2 === 0);
  const colB = EXPLORATIONS.filter((_, i) => i % 2 === 1);

  useEffect(() => {
    if (!sectionRef.current || !contentRef.current) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom bottom",
        pin: contentRef.current,
        pinSpacing: false,
      });

      if (colARef.current) {
        gsap.fromTo(
          colARef.current,
          { y: "0%" },
          {
            y: "-20%",
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          }
        );
      }
      if (colBRef.current) {
        gsap.fromTo(
          colBRef.current,
          { y: "-15%" },
          {
            y: "10%",
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="explorations" ref={sectionRef} className="relative min-h-[300vh]">
      <div
        ref={contentRef}
        className="relative z-10 h-screen flex flex-col items-center justify-center text-center px-6"
      >
        <div className="flex items-center gap-3 mb-4">
          <span className={`w-8 h-px ${styles.bgStroke}`} />
          <span className={`text-xs uppercase tracking-[0.3em] ${styles.textMuted}`}>
            Explorations
          </span>
        </div>
        <h2 className="font-display text-3xl md:text-5xl text-white mb-4">
          Visual <span className="italic">playground</span>
        </h2>
        <p className={`max-w-md ${styles.textMuted}`}>
          Interfaces, components and interaction patterns I keep coming back to.
        </p>
      </div>

      <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none px-6">
        <div className="grid grid-cols-2 gap-12 md:gap-40 max-w-[1400px] w-full">
          <div ref={colARef} className="flex flex-col gap-8 md:gap-10">
            {colA.map((item, i) => (
              <div
                key={item.title}
                className={`aspect-square max-w-[320px] rounded-2xl md:rounded-3xl flex items-end p-5 pointer-events-auto ${
                  i % 2 === 0 ? "-rotate-2" : "rotate-2"
                }`}
                style={{ background: item.color }}
              >
                <span className="text-white text-sm font-medium">{item.title}</span>
              </div>
            ))}
          </div>
          <div ref={colBRef} className="flex flex-col gap-8 md:gap-10 mt-16 md:mt-24">
            {colB.map((item, i) => (
              <div
                key={item.title}
                className={`aspect-square max-w-[320px] rounded-2xl md:rounded-3xl flex items-end p-5 pointer-events-auto ${
                  i % 2 === 0 ? "rotate-2" : "-rotate-2"
                }`}
                style={{ background: item.color }}
              >
                <span className="text-white text-sm font-medium">{item.title}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
