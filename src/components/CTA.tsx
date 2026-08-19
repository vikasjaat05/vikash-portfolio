"use client";

import { ArrowUpRight, Mail } from "lucide-react";
import Reveal from "./Reveal";
import Magnetic from "./Magnetic";
import { useInViewHover } from "./useInViewHover";

export default function CTA() {
  const { ref, inView } = useInViewHover<HTMLAnchorElement>();

  return (
    <section id="contact" className="relative py-28 md:py-40 px-6 md:px-10">
      <div className="max-w-[1400px] mx-auto">
        <div className="relative rounded-[2rem] md:rounded-[3rem] bg-red text-white px-8 md:px-20 py-20 md:py-28 overflow-hidden text-center">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60vw] h-[30vw] bg-white/10 blur-[120px] rounded-full pointer-events-none" />

          <Reveal className="relative z-10">
            <span className="text-xs font-semibold uppercase tracking-widest text-white/70">
              Let&apos;s build something great
            </span>
          </Reveal>

          <Reveal delay={0.08} className="relative z-10">
            <h2 className="font-display font-extrabold text-4xl md:text-6xl lg:text-7xl leading-[1.02] mt-6 mb-10 max-w-3xl mx-auto">
              Got a project in mind? <span className="text-[#0a0a0a]">Let&apos;s talk.</span>
            </h2>
          </Reveal>

          <Reveal delay={0.16} className="relative z-10">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
              <Magnetic>
                <a
                  ref={ref}
                  data-inview={inView}
                  href="mailto:vikkijaat800@gmail.com"
                  data-cursor-hover
                  className="group inline-flex items-center gap-2 bg-white text-red font-semibold px-8 py-4 rounded-full transition-colors duration-300 hover:bg-[#0a0a0a] hover:text-white data-[inview=true]:bg-[#0a0a0a] data-[inview=true]:text-white"
                >
                  <Mail size={18} />
                  vikkijaat800@gmail.com
                  <ArrowUpRight
                    size={18}
                    className="transition-transform duration-300 group-hover:rotate-45 group-data-[inview=true]:rotate-45"
                  />
                </a>
              </Magnetic>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
