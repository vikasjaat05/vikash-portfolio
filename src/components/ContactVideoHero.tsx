"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";

const FEATURES = ["Web & Shopify", "App Development", "Digital Marketing"];

export default function ContactVideoHero({
  onSubmitEmail,
}: {
  onSubmitEmail?: (email: string) => void;
}) {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmitEmail?.(email);
    document.getElementById("contact-form")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative h-screen w-full overflow-hidden bg-black">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        style={{ objectPosition: "80% center" }}
        src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260618_174853_aac61aa2-0f3f-4cf1-bc78-7f657dd11164.mp4"
      />

      <div className="absolute inset-0 z-10 flex flex-col px-4 sm:px-10 lg:px-12 py-4 sm:py-8">
        <div className="flex-1 sm:hidden" />

        <div className="flex flex-col sm:flex-1 sm:flex-row sm:items-end pb-4 sm:pb-12 lg:pb-16 sm:mt-auto gap-8">
          <div className="flex-1">
            <h1
              className="text-white text-[2rem] sm:text-[3.5rem] md:text-[4.5rem] leading-[1.05] tracking-tight max-w-[700px] mb-4"
              style={{ fontFamily: "'Instrument Serif', serif" }}
            >
              Let&apos;s start something.
            </h1>
            <p className="text-white/70 text-xs sm:text-base md:text-lg max-w-[520px] leading-relaxed mb-6">
              Tell us where you&apos;re headed. We&apos;ll reply within one business day
              with next steps — no sales runaround.
            </p>

            <form
              onSubmit={handleSubmit}
              className="relative max-w-md bg-black/30 backdrop-blur-md rounded-full border border-white/10"
            >
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                className="w-full bg-transparent text-white placeholder:text-white/50 px-4 sm:px-6 py-3 sm:py-4 text-sm outline-none pr-28 sm:pr-36"
              />
              <button
                type="submit"
                data-cursor-hover
                className="absolute right-1.5 top-1/2 -translate-y-1/2 bg-white text-gray-900 text-xs sm:text-sm font-medium px-3 sm:px-6 py-2 sm:py-3 rounded-full inline-flex items-center gap-1.5 hover:scale-[1.03] transition-transform"
              >
                Get Started
                <ArrowRight size={14} />
              </button>
            </form>

            <div className="flex flex-wrap gap-2 mt-4">
              {FEATURES.map((f) => (
                <span
                  key={f}
                  className="bg-black/30 backdrop-blur-md text-white text-xs px-3 py-1.5 rounded-full border border-white/10"
                >
                  {f}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
