"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle, MessageCircle } from "lucide-react";

type FaqItem = {
  question: string;
  answer: string;
};

const FAQS: FaqItem[] = [
  {
    question: "How do I receive the files or source code once I purchase?",
    answer:
      "For codebases (Next.js themes & component libraries), you receive immediate access to the GitHub repository along with a downloadable ZIP archive containing documentation and environment setup guides. For Figma files, you get an instant duplicate link and .fig file. For Shopify themes, you receive the installable theme .zip.",
  },
  {
    question: "Can I use these themes and designs for client commercial projects?",
    answer:
      "Yes, 100%! All items include full commercial rights. You can use them for your personal portfolio, your agency, or customize and deploy them for your paying clients without any royalties or forced attributions.",
  },
  {
    question: "Can Vikash customize and launch the theme for me?",
    answer:
      "Yes! If you want a hands-off experience, select the 'Done-For-You Turnkey Setup' or reach out via WhatsApp. Vikash personally configures your custom domain, connects DNS on Vercel/Cloudflare, uploads your projects and resume, and tailors the colors for a small setup fee.",
  },
  {
    question: "What if I need help or run into setup issues?",
    answer:
      "Every product includes direct developer support from Vikash Choudhary via WhatsApp and email. If you ever hit an issue installing dependencies, configuring Supabase, or connecting your domain, you can reach out directly.",
  },
  {
    question: "Which payment methods are accepted?",
    answer:
      "We accept international payments (Credit/Debit Card, Stripe, PayPal, Wire Transfer) as well as all Indian domestic payments (UPI, GPay, PhonePe, Paytm, and NetBanking).",
  },
  {
    question: "Are updates included with my purchase?",
    answer:
      "Yes. When Next.js, Tailwind CSS, or dependencies receive major version updates, you receive free lifetime repository updates and improvements.",
  },
];

export default function BuyPortfolioFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="relative bg-[#faf8f5] text-[#0a0a0a] py-20 sm:py-28 px-4 sm:px-6 md:px-12 border-t border-black/[0.06]">
      <div className="max-w-[900px] mx-auto">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-red mb-3">
            <HelpCircle size={14} />
            <span>Buyer FAQ</span>
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-[#0a0a0a]">
            Frequently Asked{" "}
            <span className="text-red font-serif italic" style={{ fontFamily: "'Instrument Serif', serif" }}>
              Questions.
            </span>
          </h2>
          <p className="text-black/60 text-sm sm:text-base mt-3">
            Everything you need to know about purchasing digital assets, licensing, and customization.
          </p>
        </div>

        <div className="space-y-3.5">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl border border-black/[0.08] bg-white hover:border-black/20 transition-all overflow-hidden shadow-2xs"
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  data-cursor-hover
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 transition-colors"
                >
                  <span className="font-display text-base sm:text-lg font-semibold text-[#0a0a0a]">
                    {faq.question}
                  </span>
                  <div
                    className={`w-8 h-8 rounded-full bg-black/[0.04] flex items-center justify-center text-black/60 transition-transform duration-300 shrink-0 ${
                      isOpen ? "rotate-180 text-red bg-red/10" : ""
                    }`}
                  >
                    <ChevronDown size={16} />
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                    >
                      <div className="px-5 pb-6 sm:px-6 sm:pb-7 text-xs sm:text-sm text-black/70 leading-relaxed border-t border-black/[0.06] pt-4">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Support Callout */}
        <div className="mt-12 text-center p-7 sm:p-9 rounded-3xl bg-white border border-black/[0.08] shadow-xs flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="text-left">
            <h4 className="font-display text-lg font-bold text-[#0a0a0a]">
              Have a question before buying?
            </h4>
            <p className="text-black/60 text-xs sm:text-sm mt-1">
              Message Vikash directly on WhatsApp for instant assistance or custom invoicing.
            </p>
          </div>
          <a
            href="https://wa.me/918000165311?text=Hi%20Vikash,%20I%20have%20a%20question%20before%20purchasing%20a%20portfolio%20theme%20or%20design."
            target="_blank"
            rel="noopener noreferrer"
            data-cursor-hover
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold uppercase tracking-wider transition-colors shrink-0 shadow-sm"
          >
            <MessageCircle size={15} />
            <span>Chat on WhatsApp</span>
          </a>
        </div>
      </div>
    </section>
  );
}
