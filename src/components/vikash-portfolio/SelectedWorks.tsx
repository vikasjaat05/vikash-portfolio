"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import styles from "./portfolio.module.css";
import { WORKS } from "./data";

const SPANS = ["md:col-span-7", "md:col-span-5", "md:col-span-5", "md:col-span-7"];
const ASPECTS = ["aspect-[4/3]", "aspect-square", "aspect-square", "aspect-[4/3]"];

export default function SelectedWorks() {
  return (
    <section id="work" className="py-12 md:py-16">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
          className="flex items-end justify-between mb-10 md:mb-14"
        >
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className={`w-8 h-px ${styles.bgStroke}`} />
              <span className={`text-xs uppercase tracking-[0.3em] ${styles.textMuted}`}>
                Selected Work
              </span>
            </div>
            <h2 className="font-display text-3xl md:text-5xl text-white">
              Featured <span className="italic">projects</span>
            </h2>
            <p className={`mt-4 max-w-md ${styles.textMuted}`}>
              A selection of web and Shopify projects — from concept to launch.
            </p>
          </div>

          <Link
            href="/work/web"
            data-cursor-hover
            className="group relative hidden md:inline-flex rounded-full"
          >
            <span
              className={`absolute inset-[-1.5px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${styles.accentGradient}`}
            />
            <span
              className={`relative flex items-center gap-2 rounded-full px-5 py-2.5 text-sm border ${styles.borderStroke} text-white`}
            >
              View all work <span aria-hidden>→</span>
            </span>
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-6">
          {WORKS.map((work, i) => (
            <motion.div
              key={work.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: (i % 4) * 0.08, ease: [0.25, 0.1, 0.25, 1] }}
              className={SPANS[i % SPANS.length]}
            >
              <Link
                href={work.href}
                data-cursor-hover
                className={`group relative block overflow-hidden rounded-3xl border ${styles.borderStroke} ${styles.bgSurface} ${ASPECTS[i % ASPECTS.length]}`}
              >
                <div
                  className="absolute inset-0 transition-transform duration-500 group-hover:scale-105"
                  style={{ background: work.color }}
                />
                <div
                  className="absolute inset-0 opacity-20"
                  style={{
                    backgroundImage:
                      "radial-gradient(circle, #000 1px, transparent 1px)",
                    backgroundSize: "4px 4px",
                    mixBlendMode: "multiply",
                  }}
                />
                <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 backdrop-blur-lg transition-opacity duration-400 flex items-center justify-center">
                  <span className="rounded-full bg-white text-[#0a0a0a] px-5 py-2 text-sm">
                    View — <span className="font-display italic">{work.title}</span>
                  </span>
                </div>
                <div className="absolute bottom-5 left-5 z-10 opacity-100 group-hover:opacity-0 transition-opacity duration-300">
                  <p className="text-white text-lg font-medium">{work.title}</p>
                  <p className="text-white/70 text-sm">{work.category}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
