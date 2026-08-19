"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { PRICING, PricingTier } from "@/data/pricing";
import { useInViewHover } from "./useInViewHover";

export default function PricingTabs() {
  const [active, setActive] = useState(PRICING[0].slug);
  const category = PRICING.find((c) => c.slug === active) ?? PRICING[0];

  return (
    <div>
      <div className="flex items-center justify-center gap-2 flex-wrap mb-14 md:mb-16">
        {PRICING.map((c) => (
          <button
            key={c.slug}
            data-cursor-hover
            onClick={() => setActive(c.slug)}
            className={`text-sm font-medium px-5 py-2.5 rounded-full border transition-colors ${
              active === c.slug
                ? "bg-[#0a0a0a] text-white border-[#0a0a0a]"
                : "border-black/15 text-black/60 hover:border-black/30"
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8"
        >
          {category.tiers.map((tier) => (
            <PricingTierCard key={tier.name} tier={tier} />
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function PricingTierCard({ tier }: { tier: PricingTier }) {
  const { ref, inView } = useInViewHover<HTMLDivElement>();

  return (
    <motion.div
      ref={ref}
      data-inview={inView}
      whileHover={{ y: -8 }}
      animate={inView ? { y: -8 } : undefined}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className={`group relative rounded-2xl md:rounded-3xl p-8 md:p-9 flex flex-col transition-shadow duration-300 ${
        tier.featured
          ? "bg-[#0a0a0a] text-white hover:shadow-2xl hover:shadow-red/20 data-[inview=true]:shadow-2xl data-[inview=true]:shadow-red/20"
          : "border border-black/10 text-black hover:border-black/25 hover:shadow-xl data-[inview=true]:border-black/25 data-[inview=true]:shadow-xl"
      }`}
    >
      {tier.featured && (
        <span className="absolute top-6 right-6 text-xs font-semibold uppercase tracking-widest text-red">
          Popular
        </span>
      )}

      <h3 className="font-display text-xl font-bold mb-1">{tier.name}</h3>
      <p className={`text-sm mb-6 ${tier.featured ? "text-white/60" : "text-black/60"}`}>
        {tier.description}
      </p>

      <div className="mb-6">
        <span className="font-display text-3xl md:text-4xl font-extrabold">{tier.price}</span>
        <span className={`text-sm ml-1 ${tier.featured ? "text-white/50" : "text-black/50"}`}>
          {tier.unit}
        </span>
      </div>

      <ul className="space-y-3 mb-8 flex-1">
        {tier.features.map((f) => (
          <li key={f} className="flex items-start gap-2.5 text-sm">
            <Check size={16} className="mt-0.5 flex-shrink-0 text-red" />
            <span className={tier.featured ? "text-white/80" : "text-black/70"}>{f}</span>
          </li>
        ))}
      </ul>

      <Link
        href="/contact"
        data-cursor-hover
        className={`group inline-flex items-center justify-center gap-2 font-semibold px-6 py-3 rounded-full transition-colors duration-300 ${
          tier.featured
            ? "bg-white text-[#0a0a0a] hover:bg-red hover:text-white"
            : "bg-[#0a0a0a] text-white hover:bg-red"
        }`}
      >
        Get Started
        <ArrowUpRight size={16} className="group-hover:rotate-45 transition-transform duration-300" />
      </Link>
    </motion.div>
  );
}
