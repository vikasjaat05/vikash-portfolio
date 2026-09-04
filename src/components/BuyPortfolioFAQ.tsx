"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle, MessageCircle, ShieldCheck, Zap, ArrowRight } from "lucide-react";

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
    <section className="relative bg-[#ffffff] text-[#0a0a0a] py-20 sm:py-28 px-4 sm:px-6 md:px-12 border-t border-black/[0.06]">
      <div className="max-w-[1360px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          {/* Left Column: Sticky Editorial Header & WhatsApp Support Box */}
          <div className="lg:col-span-5 space-y-6">
            <div className="lg:sticky lg:top-28 space-y-6">
              <div>
                <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-red mb-3">
                  <HelpCircle size={14} />
                  <span>Buyer FAQ &amp; Assurance</span>
                </div>
                <h2 className="font-display text-3xl sm:text-5xl font-extrabold tracking-tight text-[#0a0a0a] leading-tight">
                  Frequently Asked{" "}
                  <span className="text-red font-serif italic" style={{ fontFamily: "'Instrument Serif', serif" }}>
                    Questions.
                  </span>
                </h2>
                <p className="text-black/60 text-sm sm:text-base mt-4 leading-relaxed">
                  Everything you need to know about purchasing source code, commercial licensing, turnkey setup, and instant repository delivery.
                </p>
              </div>

              {/* Direct WhatsApp Consultation Card */}
              <div className="p-6 sm:p-7 rounded-3xl bg-black/[0.02] border border-black/[0.08] space-y-4">
                <div className="flex items-center gap-2 text-xs font-mono text-emerald-600 font-bold">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Direct WhatsApp Assistance</span>
                </div>
                <h4 className="font-display text-lg font-bold text-[#0a0a0a]">
                  Have a question before buying?
                </h4>
                <p className="text-xs text-black/60 leading-relaxed">
                  Message Vikash directly for instant help with tech compatibility, custom requirements, or corporate invoicing.
                </p>
                <a
                  href="https://wa.me/918278670857?text=Hi%20Vikash,%20I%20have%20a%20question%20before%20purchasing%20a%20portfolio%20theme%20or%20design."
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor-hover
                  className="w-full py-3 px-5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-xs cursor-pointer"
                >
                  <MessageCircle size={15} />
                  <span>Chat with Vikash on WhatsApp</span>
                  <ArrowRight size={14} />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: FAQ Accordion List */}
          <div className="lg:col-span-7 space-y-3.5">
            {FAQS.map((faq, idx) => {
              const isOpen = openIndex === idx;
              return (
                <div
                  key={idx}
                  className={`rounded-2xl border transition-all overflow-hidden ${
                    isOpen
                      ? "border-black/30 bg-black/[0.01] shadow-xs"
                      : "border-black/[0.07] bg-white hover:border-black/20"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => toggle(idx)}
                    data-cursor-hover
                    className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 transition-colors cursor-pointer"
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
        </div>
      </div>
    </section>
  );
}
