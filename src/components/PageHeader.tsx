"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { ReactNode } from "react";

export default function PageHeader({
  eyebrow,
  title,
  description,
  breadcrumb,
}: {
  eyebrow: string;
  title: ReactNode;
  description?: string;
  breadcrumb?: { label: string; href?: string }[];
}) {
  return (
    <section className="relative pt-36 md:pt-44 pb-16 md:pb-20 px-6 md:px-10 overflow-hidden border-b border-black/10">
      <motion.div
        animate={{ x: [0, 30, 0], y: [0, 20, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[-10%] right-[-10%] w-[40vw] h-[40vw] rounded-full bg-red/10 blur-[100px] pointer-events-none"
      />

      <div className="max-w-[1400px] mx-auto relative z-10">
        {breadcrumb && breadcrumb.length > 0 && (
          <motion.nav
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            aria-label="Breadcrumb"
            className="flex items-center gap-1.5 text-xs text-black/40 mb-6 flex-wrap"
          >
            <Link href="/" className="hover:text-black transition-colors">
              Home
            </Link>
            {breadcrumb.map((b, i) => (
              <span key={i} className="flex items-center gap-1.5">
                <ChevronRight size={12} />
                {b.href ? (
                  <Link href={b.href} className="hover:text-black transition-colors">
                    {b.label}
                  </Link>
                ) : (
                  <span className="text-black/60">{b.label}</span>
                )}
              </span>
            ))}
          </motion.nav>
        )}

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 border border-black/10 rounded-full px-4 py-1.5 mb-6 text-xs font-semibold uppercase tracking-widest text-black/60"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-red" />
          {eyebrow}
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="font-display font-extrabold text-4xl md:text-6xl lg:text-7xl leading-[1.03] max-w-4xl"
        >
          {title}
        </motion.h1>

        {description && (
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-6 text-base md:text-lg text-black/60 max-w-xl leading-relaxed"
          >
            {description}
          </motion.p>
        )}
      </div>
    </section>
  );
}
