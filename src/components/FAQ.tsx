"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, HelpCircle, Mail, MessageSquare } from "lucide-react";
import { FAQS } from "@/data/faq";
import Reveal from "./Reveal";
import Link from "next/link";

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="relative py-24 md:py-36 px-6 md:px-10 bg-white">
      <div className="max-w-[1000px] mx-auto">
        <Reveal>
          <div className="flex items-center justify-center gap-3 mb-6">
            <span className="w-2.5 h-2.5 rounded-full bg-red" />
            <span className="text-xs font-semibold uppercase tracking-widest text-black/50">
              Frequently Asked Questions
            </span>
          </div>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="font-display font-extrabold text-3xl sm:text-5xl md:text-6xl leading-[1.02] text-center mb-14 md:mb-18">
            Got questions? <span className="text-red">Here are answers.</span>
          </h2>
        </Reveal>

        <div className="border-t border-black/10">
          {FAQS.map((item, i) => {
            const isOpen = open === i;
            return (
              <div key={item.question} className="border-b border-black/10">
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  data-cursor-hover
                  className="group w-full flex items-center justify-between gap-6 py-6 sm:py-7 text-left"
                >
                  <div className="flex items-center gap-3 pr-4">
                    {item.category && (
                      <span className="hidden sm:inline-block px-2.5 py-0.5 rounded-full bg-black/5 text-[11px] font-mono text-black/50">
                        {item.category}
                      </span>
                    )}
                    <span className="font-display text-base sm:text-xl font-bold group-hover:text-red transition-colors duration-200">
                      {item.question}
                    </span>
                  </div>

                  <motion.span
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className={`flex-shrink-0 w-8 h-8 sm:w-9 sm:h-9 rounded-full border flex items-center justify-center transition-colors duration-200 ${
                      isOpen
                        ? "bg-red border-red text-white"
                        : "border-black/15 text-black/60 group-hover:border-red group-hover:text-red"
                    }`}
                  >
                    <Plus size={16} />
                  </motion.span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="text-black/70 leading-relaxed pb-6 pt-1 max-w-3xl text-sm sm:text-base">
                        {item.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Still Have Questions Box */}
        <Reveal delay={0.2}>
          <div className="mt-14 p-6 sm:p-8 rounded-3xl bg-[#faf8f5] border border-black/10 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-red/10 text-red flex items-center justify-center flex-shrink-0">
                <HelpCircle size={22} />
              </div>
              <div>
                <h3 className="font-display font-bold text-lg text-black">
                  Have a specific question in mind?
                </h3>
                <p className="text-xs sm:text-sm text-black/60">
                  Feel free to reach out directly — response within 2–4 hours.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <a
                href="mailto:vikkijaat800@gmail.com"
                data-cursor-hover
                className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-[#0a0a0a] text-white text-xs sm:text-sm font-semibold hover:bg-red transition-colors shadow-xs"
              >
                <Mail size={14} />
                <span>Email Me</span>
              </a>

              <Link
                href="/contact"
                data-cursor-hover
                className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full border border-black/15 bg-white text-black text-xs sm:text-sm font-semibold hover:border-black transition-colors"
              >
                <MessageSquare size={14} />
                <span>Contact Page</span>
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
