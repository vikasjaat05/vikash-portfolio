"use client";

import { Briefcase, GraduationCap, Calendar, MapPin, CheckCircle2, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import FadeSection from "./FadeSection";

const EXPERIENCES = [
  {
    role: "Frontend & E-commerce Developer",
    company: "Flaneur Global Silver & Fine Jewels Shop",
    duration: "May 2025 – Present",
    type: "Current Role",
    location: "E-Commerce / Jewelry",
    points: [
      "Developed and maintained luxury fine jewelry e-commerce stores on Shopify with smooth UI and fast page load speeds.",
      "Successfully managed multi-platform product catalog and listings across major global marketplaces including Amazon, Flipkart, eBay, and Etsy.",
      "Created high-impact visual banners, promotional graphics, and social creatives using Canva.",
      "Collaborated on website layout, custom Liquid sections, and checkout flow enhancements to drive conversion rates.",
    ],
  },
  {
    role: "Shopify Developer",
    company: "Digital Heroes",
    duration: "March 2025 – August 2025",
    type: "Part-Time / Client Projects",
    location: "Digital Agency",
    points: [
      "Developed and customized Shopify e-commerce websites according to diverse client specifications.",
      "Engineered custom Shopify Liquid templates, responsive layouts, product pages, and dynamic collection filters.",
      "Implemented and optimized HTML5, CSS3, JavaScript, and custom Liquid logic for bespoke UI improvements.",
      "Troubleshot and resolved theme bugs, responsive layout issues, and checkout optimizations on tight deadlines.",
    ],
  },
  {
    role: "Web Development & Digital Optimization",
    company: "Qudrat Studio, Jaipur",
    duration: "January 2025 – June 2025",
    type: "6 Months",
    location: "Jaipur, India",
    points: [
      "Developed and deployed informational and brand web platforms to establish high-impact web presence.",
      "Executed Social Media Optimization (SMO) strategies across platforms to enhance studio visibility and online reach.",
      "Optimized website assets and responsiveness for seamless multi-device browsing.",
    ],
  },
];

const EDUCATION = [
  {
    degree: "Graduation (B.A. Arts)",
    institution: "Matsya University, Alwar",
    year: "2021 – 2024",
    status: "Completed",
  },
  {
    degree: "12th Senior Secondary",
    institution: "Harikishan S.S. School, Alwar (Ajmer Board)",
    year: "2020 – 2021",
    status: "Completed",
  },
  {
    degree: "10th Secondary",
    institution: "Harikishan S.S. School, Alwar (Ajmer Board)",
    year: "2018 – 2019",
    status: "Completed",
  },
];

export default function ResumeExperienceSection() {
  return (
    <section className="py-20 md:py-28 px-6 md:px-10 bg-white">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-12 lg:gap-16">
          {/* Work Experience */}
          <div>
            <FadeSection className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-2.5 h-2.5 rounded-full bg-red" />
                <span className="text-xs font-semibold uppercase tracking-widest text-black/50">
                  Career Trajectory
                </span>
              </div>
              <h2 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl tracking-tight">
                Work <span className="text-red">Experience.</span>
              </h2>
            </FadeSection>

            <div className="flex flex-col gap-8">
              {EXPERIENCES.map((exp, i) => (
                <FadeSection key={exp.company}>
                  <div className="p-7 sm:p-8 rounded-3xl border border-black/10 bg-[#faf8f5] hover:border-red/30 transition-all duration-300 shadow-2xs">
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-red/10 text-red">
                        <Briefcase size={12} />
                        {exp.type}
                      </span>
                      <span className="inline-flex items-center gap-1.5 text-xs text-black/50 font-mono">
                        <Calendar size={12} />
                        {exp.duration}
                      </span>
                    </div>

                    <h3 className="font-display font-bold text-xl sm:text-2xl text-black mb-1">
                      {exp.role}
                    </h3>
                    <p className="text-sm font-semibold text-black/60 mb-5 flex items-center gap-1.5">
                      <MapPin size={13} className="text-red" />
                      {exp.company}
                    </p>

                    <ul className="flex flex-col gap-2.5">
                      {exp.points.map((pt, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 text-sm text-black/75 leading-relaxed">
                          <CheckCircle2 size={16} className="text-red mt-0.5 flex-shrink-0" />
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </FadeSection>
              ))}
            </div>
          </div>

          {/* Education & CV Download */}
          <div>
            <FadeSection className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-2.5 h-2.5 rounded-full bg-red" />
                <span className="text-xs font-semibold uppercase tracking-widest text-black/50">
                  Academic Background
                </span>
              </div>
              <h2 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl tracking-tight">
                Education.
              </h2>
            </FadeSection>

            <div className="flex flex-col gap-6 mb-12">
              {EDUCATION.map((edu) => (
                <FadeSection key={edu.degree}>
                  <div className="p-6 rounded-2xl border border-black/10 bg-[#faf8f5] hover:border-black/25 transition-colors">
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-red">
                        <GraduationCap size={14} />
                        {edu.status}
                      </span>
                      <span className="text-xs text-black/50 font-mono">{edu.year}</span>
                    </div>
                    <h3 className="font-display font-bold text-lg text-black mb-1">
                      {edu.degree}
                    </h3>
                    <p className="text-xs text-black/60">{edu.institution}</p>
                  </div>
                </FadeSection>
              ))}
            </div>

            {/* Quick Resume Card */}
            <FadeSection>
              <div className="p-8 rounded-3xl bg-[#0a0a0a] text-white">
                <span className="text-xs font-semibold uppercase tracking-widest text-red mb-3 block">
                  Official Resume Document
                </span>
                <h3 className="font-display font-bold text-2xl mb-3">
                  Looking for a complete CV?
                </h3>
                <p className="text-sm text-white/70 leading-relaxed mb-6">
                  Download or inspect the official high-resolution resume sheet with verified contact and employment history.
                </p>
                <div className="flex flex-wrap items-center gap-3">
                  <Link
                    href="/resume"
                    data-cursor-hover
                    className="inline-flex items-center gap-2 bg-red text-white text-xs sm:text-sm font-semibold px-6 py-3 rounded-full hover:bg-white hover:text-black transition-colors"
                  >
                    <span>View &amp; Download Resume</span>
                    <ArrowUpRight size={15} />
                  </Link>
                </div>
              </div>
            </FadeSection>
          </div>
        </div>
      </div>
    </section>
  );
}
