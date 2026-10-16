"use client";

import { Briefcase, GraduationCap, Calendar, MapPin, CheckCircle2, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import FadeSection from "./FadeSection";

const EXPERIENCES = [
  {
    role: "Frontend & E-commerce Developer",
    company: "Flaneur Global Silver & Gold (Fine Jewellery Brand), Jaipur",
    duration: "Jun 2025 – Present",
    type: "Current Role",
    location: "Jaipur, Rajasthan",
    points: [
      "Built and maintain the brand's fine jewellery e-commerce website on Shopify, keeping site performance and user experience consistent.",
      "Manage multi-channel product listings and catalogues across Amazon, Flipkart, eBay and Etsy.",
      "Improved website layout and functionality with the team to lift conversions and simplify the customer journey.",
      "Create product visuals and social media graphics in Canva for the website and marketing channels.",
    ],
  },
  {
    role: "Shopify Developer (Part-time)",
    company: "Digital Heroes",
    duration: "Mar 2026 – Aug 2026",
    type: "Part-Time",
    location: "Client Projects",
    points: [
      "Developed and customised Shopify e-commerce websites for multiple clients based on their business requirements.",
      "Customised themes, responsive layouts, product pages, collections, navigation and store functionality.",
      "Wrote Shopify Liquid, HTML, CSS and JavaScript to build custom features and UI improvements.",
      "Improved user experience through responsive design, smoother navigation and conversion-focused layouts.",
      "Managed product listings, collections, pricing, images and other store content.",
      "Diagnosed and resolved theme, layout and functionality issues across client stores.",
      "Worked with clients and team members to gather requirements and deliver website updates on deadline.",
    ],
  },
  {
    role: "Web Developer",
    company: "Qudrat Studio, Jaipur",
    duration: "Jan 2025 – Jun 2025",
    type: "Studio Web Platform",
    location: "Jaipur, Rajasthan",
    points: [
      "Designed and launched the studio's informational website on WordPress to establish its professional web presence.",
      "Planned and executed Social Media Optimisation (SMO) strategies to improve the studio's online visibility and engagement.",
    ],
  },
];

const TECHNICAL_SKILLS = [
  {
    category: "E-commerce Platforms",
    skills: "Shopify (Liquid, theme customisation, store setup), WordPress",
  },
  {
    category: "Frontend",
    skills: "HTML5, CSS3, JavaScript (basic), Responsive Web Design, UI/UX Implementation",
  },
  {
    category: "Store Management",
    skills: "Product pages, collections, navigation, pricing, store content, theme troubleshooting",
  },
  {
    category: "Marketplaces",
    skills: "Amazon, Flipkart, eBay, Etsy (product listing and catalogue management)",
  },
  {
    category: "Optimisation",
    skills: "Website performance, conversion-focused layouts, e-commerce website optimisation",
  },
  {
    category: "Marketing & Design",
    skills: "Social Media Optimisation (SMO), social media content, Canva creatives, promotional banners",
  },
];

const EDUCATION = [
  {
    degree: "Bachelor of Arts (B.A.)",
    institution: "Raj Rishi Bhartrihari Matsya University, Alwar",
    year: "2021 – 2024",
    status: "Completed",
  },
  {
    degree: "Senior Secondary (Class XII)",
    institution: "Harikishan Sr. Sec. School, Alwar (RBSE, Ajmer)",
    year: "2021",
    status: "Completed",
  },
  {
    degree: "Secondary (Class X)",
    institution: "Harikishan Sr. Sec. School, Alwar (RBSE, Ajmer)",
    year: "2019",
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

            {/* Technical Skills from Resume */}
            <FadeSection className="mt-12 mb-10">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-2.5 h-2.5 rounded-full bg-red" />
                <span className="text-xs font-semibold uppercase tracking-widest text-black/50">
                  Skills &amp; Competencies
                </span>
              </div>
              <h2 className="font-display font-extrabold text-2xl sm:text-3xl tracking-tight mb-4">
                Technical <span className="text-red">Skills.</span>
              </h2>

              <div className="flex flex-col gap-3">
                {TECHNICAL_SKILLS.map((item) => (
                  <div
                    key={item.category}
                    className="p-4 rounded-xl border border-black/10 bg-[#faf8f5]"
                  >
                    <p className="text-xs font-bold uppercase tracking-wider text-red mb-1 font-mono">
                      {item.category}
                    </p>
                    <p className="text-xs sm:text-sm text-black/80 font-medium">
                      {item.skills}
                    </p>
                  </div>
                ))}
              </div>
            </FadeSection>

            {/* Additional Information */}
            <FadeSection className="mb-10">
              <div className="p-5 rounded-2xl border border-black/10 bg-[#faf8f5]">
                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-black/50 mb-3">
                  Additional Information
                </h4>
                <div className="flex flex-col gap-2 text-xs sm:text-sm text-black/80">
                  <p>
                    <span className="font-semibold text-black">Languages:</span> English, Hindi
                  </p>
                  <p>
                    <span className="font-semibold text-black">Core Strengths:</span> Adaptability, time management, attention to detail, problem solving, team collaboration
                  </p>
                  <p>
                    <span className="font-semibold text-black">Location:</span> Alwar, Rajasthan, India
                  </p>
                </div>
              </div>
            </FadeSection>

            {/* Quick Resume Card */}
            <FadeSection>
              <div className="p-8 rounded-3xl bg-[#0a0a0a] text-white">
                <span className="text-xs font-semibold uppercase tracking-widest text-red mb-3 block">
                  Official Resume Document
                </span>
                <h3 className="font-display font-bold text-2xl mb-3">
                  Looking for the PDF?
                </h3>
                <p className="text-sm text-white/70 leading-relaxed mb-6">
                  Download or inspect the official high-resolution resume sheet (Vikash_Chaudhry_Resume.pdf) with verified contact and employment history.
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
