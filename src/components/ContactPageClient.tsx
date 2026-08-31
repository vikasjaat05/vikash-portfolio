"use client";

import { useState } from "react";
import { Mail, MapPin, Clock, Phone, MessageSquare, ArrowUpRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactVideoHero from "@/components/ContactVideoHero";
import ContactForm from "@/components/ContactForm";
import FadeSection from "@/components/FadeSection";

const CONTACT_CHANNELS = [
  {
    icon: Mail,
    label: "Direct Email",
    value: "vikkijaat800@gmail.com",
    subtext: "Best for project briefs & inquiries",
    href: "mailto:vikkijaat800@gmail.com",
    actionLabel: "Send Email",
  },
  {
    icon: MessageSquare,
    label: "WhatsApp Chat",
    value: "+91 8000165311",
    subtext: "Instant quick chat & consultations",
    href: "https://wa.me/918000165311?text=Hi%20Vikash,%20I%20would%20like%20to%20discuss%20a%20project.",
    actionLabel: "Chat on WhatsApp",
  },
  {
    icon: Phone,
    label: "Phone Call",
    value: "+91 8000165311",
    subtext: "Direct voice line (10 AM – 8 PM IST)",
    href: "tel:+918000165311",
    actionLabel: "Call Directly",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Alwar, Rajasthan, India",
    subtext: "Available for global remote client work",
    href: null,
    actionLabel: null,
  },
];

export default function ContactPageClient() {
  const [prefillEmail, setPrefillEmail] = useState("");

  return (
    <>
      <Navbar />
      <main className="relative">
        <ContactVideoHero onSubmitEmail={setPrefillEmail} />

        <section id="contact-form" className="relative px-6 md:px-10 py-20 md:py-28 bg-[#faf8f5]">
          <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-12 lg:gap-16">
            {/* Direct Contact Cards */}
            <div>
              <FadeSection className="mb-8">
                <div className="flex items-center gap-3 mb-4">
                  <span className="w-2.5 h-2.5 rounded-full bg-red" />
                  <span className="text-xs font-semibold uppercase tracking-widest text-black/50">
                    Get In Touch
                  </span>
                </div>
                <h2 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl tracking-tight mb-4">
                  Let&apos;s build something <span className="text-red">exceptional.</span>
                </h2>
                <p className="text-sm sm:text-base text-black/70 leading-relaxed">
                  Reach out directly via Email, WhatsApp, or submit your project details below. I typically respond within 2–4 hours.
                </p>
              </FadeSection>

              <FadeSection>
                <div className="flex flex-col gap-4">
                  {CONTACT_CHANNELS.map((item) => (
                    <div
                      key={item.label}
                      className="p-5 sm:p-6 rounded-2xl bg-white border border-black/10 shadow-2xs hover:border-red/30 transition-all duration-300"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-start gap-4">
                          <div className="w-11 h-11 rounded-full bg-red/10 text-red flex items-center justify-center flex-shrink-0 mt-0.5">
                            <item.icon size={19} />
                          </div>
                          <div>
                            <p className="text-xs font-semibold uppercase tracking-widest text-black/50 mb-0.5">
                              {item.label}
                            </p>
                            <p className="font-display text-base sm:text-lg font-bold text-black">
                              {item.value}
                            </p>
                            <p className="text-xs text-black/60 mt-0.5">{item.subtext}</p>
                          </div>
                        </div>

                        {item.href && item.actionLabel && (
                          <a
                            href={item.href}
                            target={item.href.startsWith("http") ? "_blank" : undefined}
                            rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                            data-cursor-hover
                            className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold bg-[#0a0a0a] text-white hover:bg-red transition-colors flex-shrink-0"
                          >
                            <span>{item.actionLabel}</span>
                            <ArrowUpRight size={13} />
                          </a>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </FadeSection>
            </div>

            {/* Interactive Form */}
            <FadeSection>
              <div className="p-7 sm:p-10 rounded-3xl bg-white border border-black/10 shadow-lg">
                <h3 className="font-display font-bold text-2xl sm:text-3xl text-black mb-2">
                  Send a Project Brief
                </h3>
                <p className="text-sm text-black/60 mb-8">
                  Fill in your project requirements for an instant consultation.
                </p>
                <ContactForm defaultEmail={prefillEmail} />
              </div>
            </FadeSection>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
