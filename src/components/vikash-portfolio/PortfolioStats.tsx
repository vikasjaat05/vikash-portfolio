"use client";

import { motion } from "framer-motion";
import styles from "./portfolio.module.css";
import { STATS } from "./data";

export default function PortfolioStats() {
  return (
    <section className="py-16 md:py-24">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: i * 0.08, ease: [0.25, 0.1, 0.25, 1] }}
              className={`border-t pt-6 ${styles.borderStroke}`}
            >
              <p className="font-display text-4xl md:text-6xl text-white">{stat.value}</p>
              <p className={`mt-2 text-sm uppercase tracking-widest ${styles.textMuted}`}>
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
