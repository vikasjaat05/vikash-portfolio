import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AboutVideoHero from "@/components/AboutVideoHero";
import TrustBar from "@/components/TrustBar";
import FadeSection from "@/components/FadeSection";
import FounderCard from "@/components/FounderCard";
import Counter from "@/components/Counter";
import CTA from "@/components/CTA";
import { HOW_WE_WORK } from "@/data/howWeWork";
import { Clock3, Repeat2, ArrowUpRight } from "lucide-react";
import { getFounders } from "@/lib/team-data";
import Link from "next/link";
import ResumeExperienceSection from "@/components/ResumeExperienceSection";
import WorkspaceGear from "@/components/WorkspaceGear";

export const metadata: Metadata = {
  title: {
    absolute: "About Vikash Choudhary | Web & Shopify Developer",
  },
  description:
    "Learn about Vikash Choudhary, a Web & Shopify Developer specializing in high-converting luxury e-commerce storefronts, bespoke Liquid themes, and modern Next.js engineering.",
  alternates: {
    canonical: "https://vikash.website/about",
  },
  openGraph: {
    title: "About Vikash Choudhary | Web & Shopify Developer",
    description:
      "Learn about Vikash Choudhary, a Web & Shopify Developer specializing in high-converting luxury e-commerce storefronts, bespoke Liquid themes, and modern Next.js engineering.",
    url: "https://vikash.website/about",
    type: "profile",
  },
};

const STATS = [
  { icon: Clock3, value: 1, suffix: "+", label: "Years Experience" },
  { icon: Repeat2, value: 98, suffix: "%", label: "Client Satisfaction" },
];

export default async function AboutPage() {
  const founders = await getFounders();
  const vikash =
    founders.find(
      (f) => f.slug === "vikash-choudhary" || f.name.toLowerCase().includes("vikash")
    ) ?? founders[0];

  return (
    <>
      <Navbar />
      <main className="relative">
        <AboutVideoHero />
        <TrustBar />

        {/* Profile Section */}
        <section className="px-6 md:px-10 pt-24 md:pt-32 pb-20 md:pb-28">
          <div className="max-w-[1400px] mx-auto">
            <FadeSection>
              <div className="flex items-center gap-3 mb-6">
                <span className="w-2.5 h-2.5 rounded-full bg-red" />
                <span className="text-xs font-semibold uppercase tracking-widest text-black/50">
                  About Me
                </span>
              </div>
              <h2 className="font-display font-extrabold text-3xl md:text-5xl lg:text-6xl leading-[1.05] mb-4 max-w-2xl">
                The developer behind <span className="text-red">every pixel.</span>
              </h2>
              <p className="text-black/60 max-w-lg leading-relaxed mb-12 md:mb-16">
                Direct communication, high-end engineering, and fast turnaround — built to perform from day one.
              </p>
            </FadeSection>

            {vikash && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">
                <FadeSection className="lg:col-span-5">
                  <FounderCard founder={vikash} index={0} />
                </FadeSection>

                <FadeSection className="lg:col-span-7 flex flex-col gap-6">
                  <div>
                    <span className="inline-flex items-center gap-2 border border-black/10 rounded-full px-4 py-1.5 mb-4 text-xs font-semibold uppercase tracking-widest text-black/60">
                      <span className="w-1.5 h-1.5 rounded-full bg-red" />
                      {vikash.role}
                    </span>

                    <h3 className="font-display text-3xl md:text-4xl font-bold mb-4">{vikash.name}</h3>
                    <p className="text-black/70 text-base md:text-lg leading-relaxed mb-6">
                      {vikash.longBio ?? vikash.bio}
                    </p>
                  </div>

                  {vikash.highlights && vikash.highlights.length > 0 && (
                    <div>
                      <h4 className="text-xs font-semibold uppercase tracking-widest text-black/50 mb-3">
                        Key Highlights
                      </h4>
                      <ul className="flex flex-col gap-2.5">
                        {vikash.highlights.map((h) => (
                          <li key={h} className="text-sm text-black/70 flex items-start gap-2.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-red mt-2 flex-shrink-0" />
                            {h}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div>
                    <h4 className="text-xs font-semibold uppercase tracking-widest text-black/50 mb-3">
                      Core Skills &amp; Tools
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {vikash.skills.map((s) => (
                        <span
                          key={s}
                          className="text-xs font-medium px-3.5 py-1.5 rounded-full border border-black/15 bg-white text-black/80 shadow-2xs"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 flex flex-wrap items-center gap-3">
                    <Link
                      href="/resume"
                      data-cursor-hover
                      className="group liquid-btn-red !text-sm !font-semibold !px-6 !py-3 gap-2"
                    >
                      <span>View &amp; Download Resume</span>
                      <ArrowUpRight size={16} className="group-hover:rotate-45 transition-transform duration-300" />
                    </Link>

                    <Link
                      href={`/about/${vikash.slug}`}
                      data-cursor-hover
                      className="group liquid-btn-dark !text-sm !font-semibold !px-6 !py-3 gap-2"
                    >
                      <span>View Dedicated Profile</span>
                      <ArrowUpRight size={16} className="group-hover:rotate-45 transition-transform duration-300" />
                    </Link>
                  </div>
                </FadeSection>
              </div>
            )}
          </div>
        </section>

        {/* Work Experience & Education */}
        <ResumeExperienceSection />

        {/* Workspace, Accessories & AI Tools */}
        <WorkspaceGear />

        {/* Operating Principles */}
        <section className="px-6 md:px-10 py-20 md:py-28 bg-[#f5f1ea]">
          <div className="max-w-[1400px] mx-auto">
            <FadeSection>
              <div className="flex items-center gap-3 mb-6">
                <span className="w-2.5 h-2.5 rounded-full bg-red" />
                <span className="text-xs font-semibold uppercase tracking-widest text-black/50">
                  Principles
                </span>
              </div>
              <h2 className="font-display font-extrabold text-3xl md:text-5xl leading-[1.05] mb-14 md:mb-16 max-w-2xl">
                How I <span className="text-red">operate.</span>
              </h2>
            </FadeSection>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              {HOW_WE_WORK.map((item, i) => (
                <FadeSection key={item.title}>
                  <div className="border-t border-black/10 pt-6">
                    <span className="font-display text-sm font-bold text-red">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="font-display text-xl md:text-2xl font-bold mt-3 mb-2">
                      {item.title}
                    </h3>
                    <p className="text-black/60 leading-relaxed">{item.desc}</p>
                  </div>
                </FadeSection>
              ))}
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="px-6 md:px-10 py-20 md:py-28">
          <div className="max-w-[1400px] mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 md:gap-10">
              {STATS.map((stat) => (
                <FadeSection key={stat.label}>
                  <div className="border-l-2 border-red pl-5">
                    <div className="font-display text-4xl md:text-6xl font-extrabold">
                      <Counter to={stat.value} suffix={stat.suffix} />
                    </div>
                    <div className="text-black/50 text-sm mt-2 uppercase tracking-wide">
                      {stat.label}
                    </div>
                  </div>
                </FadeSection>
              ))}
            </div>
          </div>
        </section>

        <CTA />
      </main>
      <Footer />
    </>
  );
}
