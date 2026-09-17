"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  ArrowUpRight,
  ExternalLink,
  Briefcase,
  GraduationCap,
  Sparkles,
  Zap,
  TrendingUp,
  Building2,
  Calendar,
  CheckCircle2,
  FileText,
  MapPin,
  Flame,
} from "lucide-react";
import Reveal from "./Reveal";

type Experience = {
  id: string;
  role: string;
  company: string;
  period: string;
  duration: string;
  type: string;
  isCurrent?: boolean;
  industry: string;
  location: string;
  metricBadge: string;
  metricIcon: typeof Zap;
  summary: string;
  achievements: string[];
  skills: string[];
  caseStudyUrl?: string;
  liveUrl?: string;
  initials: string;
};

type Education = {
  id: string;
  degree: string;
  institution: string;
  period: string;
  status: string;
  location: string;
  note: string;
};

const EXPERIENCES: Experience[] = [
  {
    id: "flaneur",
    role: "Frontend & E-commerce Developer",
    company: "Flâneur Global Silver & Fine Jewels",
    period: "2025 — Present",
    duration: "May 2025 – Present",
    type: "Full-Time",
    isCurrent: true,
    industry: "Luxury Jewelry & High AOV DTC",
    location: "Global & India",
    metricBadge: "+45% AOV • Sub-1s Page Load",
    metricIcon: TrendingUp,
    summary:
      "Spearheading frontend engineering and Shopify Plus theme architecture for international fine jewelry commerce, delivering sub-second performance across mobile and desktop.",
    achievements: [
      "Engineered bespoke Shopify Liquid templates with real-time color swatch visualizers and slide-out cart drawers.",
      "Synchronized multi-channel product catalog across Amazon, Flipkart, eBay, Etsy, and Shopify Plus.",
      "Designed high-impact visual banners, promotional graphics, and brand creatives in Canva.",
      "Achieved +45% average order value increase and frictionless multi-currency international checkout.",
    ],
    skills: ["Shopify Plus", "Liquid Engine", "JavaScript ES6+", "Canva", "Multi-Currency", "Catalog Sync"],
    caseStudyUrl: "/work/web/flaneur-global",
    liveUrl: "https://www.flaneurglobal.com/",
    initials: "FG",
  },
  {
    id: "digital-heroes",
    role: "Shopify Developer",
    company: "Digital Heroes Agency",
    period: "2025",
    duration: "March 2025 – August 2025",
    type: "Agency Production",
    industry: "E-Commerce Agency & Web Production",
    location: "Global Clients",
    metricBadge: "14+ Stores Launched • 0 Drop Crashes",
    metricIcon: Zap,
    summary:
      "Engineered high-converting Shopify Liquid themes, collection filter engines, and bespoke responsive product page templates for diverse international client portfolios.",
    achievements: [
      "Custom-coded Liquid templates, dynamic filters, and conversion cart drawers without relying on bloated apps.",
      "Resolved complex responsive layout bugs, mobile checkout friction, and speed bottlenecks.",
      "Delivered 14+ live store projects on tight turnarounds with zero drop bottlenecks.",
    ],
    skills: ["Shopify Liquid", "HTML5 & CSS3", "JavaScript", "Theme Optimization", "Mobile UI", "Cart Drawers"],
    caseStudyUrl: "/work/web",
    initials: "DH",
  },
  {
    id: "qudrat",
    role: "Web Development & Digital Optimization",
    company: "Qudrat Studio",
    period: "2025",
    duration: "January 2025 – June 2025",
    type: "Studio & Growth",
    industry: "Creative Studio & Sustainable Innovations",
    location: "Jaipur, India",
    metricBadge: "100k+ Global Visitors • 90+ Lighthouse",
    metricIcon: Sparkles,
    summary:
      "Engineered brand and informational web platforms with interactive motion typography, asset optimization, and targeted Social Media Optimization (SMO) strategies.",
    achievements: [
      "Built clean, responsive web platforms showcasing sustainable innovations and studio initiatives.",
      "Spearheaded Social Media Optimization (SMO) that generated over 100k+ global visitors.",
      "Optimized multimedia assets to maintain 90+ Google Lighthouse Core Web Vitals.",
    ],
    skills: ["Next.js", "Tailwind CSS", "Asset Optimization", "SEO / SMO", "Core Web Vitals", "Motion Design"],
    caseStudyUrl: "/work/web/qudrat",
    liveUrl: "https://www.qudrat.org/",
    initials: "QS",
  },
];

const EDUCATION: Education[] = [
  {
    id: "grad",
    degree: "Graduation (B.A. Arts)",
    institution: "Matsya University",
    period: "2021 — 2024",
    status: "Completed",
    location: "Alwar, Rajasthan",
    note: "Focused on analytical problem solving, humanities, structured communication, and project planning.",
  },
  {
    id: "12th",
    degree: "12th Senior Secondary",
    institution: "Harikishan S.S. School (Ajmer Board)",
    period: "2020 — 2021",
    status: "Completed",
    location: "Alwar, Rajasthan",
    note: "Comprehensive senior secondary education with mathematical foundations and digital literacy.",
  },
  {
    id: "10th",
    degree: "10th Secondary",
    institution: "Harikishan S.S. School (Ajmer Board)",
    period: "2018 — 2019",
    status: "Completed",
    location: "Alwar, Rajasthan",
    note: "Secondary board certification with strong academic record and computer fundamentals.",
  },
];

export default function CareerJourney() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<"all" | "experience" | "education">("all");

  // Scroll Progress Line tracking the entire timeline container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="journey" className="relative py-24 md:py-36 px-6 md:px-10 bg-white overflow-hidden">
      <div className="max-w-[1280px] mx-auto">
        {/* Section Header with exact Image 1 / Image 2 style */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-16 md:mb-24">
          <div className="max-w-3xl">
            <Reveal>
              <span className="text-[11px] sm:text-xs font-semibold tracking-[0.2em] text-black/45 uppercase block mb-3">
                FOUNDER-LED ENGINEERING &bull; VERIFIED RESUME TRACK RECORD
              </span>
            </Reveal>

            <Reveal delay={0.05}>
              <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-[-0.04em] text-black leading-[1.05]">
                Career journey{" "}
                <span className="text-black/35 font-bold">and work experience.</span>
              </h2>
            </Reveal>

            <Reveal delay={0.08}>
              <p className="mt-4 text-black/60 text-base sm:text-lg max-w-2xl leading-relaxed">
                A verified timeline of building and scaling production Shopify Plus storefronts,
                custom Liquid architectures, and modern web applications that deliver real business impact.
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.1}>
            <div className="flex flex-wrap items-center gap-3">
              {/* Tab Switcher */}
              <div className="p-1 rounded-full bg-[#f0f0f2] flex items-center shadow-2xs">
                <button
                  onClick={() => setActiveTab("all")}
                  data-cursor-hover
                  className={`px-4 py-2 rounded-full text-xs font-semibold transition-all duration-200 ${
                    activeTab === "all"
                      ? "bg-white text-black shadow-xs"
                      : "text-black/55 hover:text-black"
                  }`}
                >
                  All Milestones
                </button>
                <button
                  onClick={() => setActiveTab("experience")}
                  data-cursor-hover
                  className={`px-4 py-2 rounded-full text-xs font-semibold transition-all duration-200 ${
                    activeTab === "experience"
                      ? "bg-white text-black shadow-xs"
                      : "text-black/55 hover:text-black"
                  }`}
                >
                  Experience (3)
                </button>
                <button
                  onClick={() => setActiveTab("education")}
                  data-cursor-hover
                  className={`px-4 py-2 rounded-full text-xs font-semibold transition-all duration-200 ${
                    activeTab === "education"
                      ? "bg-white text-black shadow-xs"
                      : "text-black/55 hover:text-black"
                  }`}
                >
                  Education (3)
                </button>
              </div>

              {/* Signature Pill Button matching Image 2 */}
              <Link
                href="/resume"
                data-cursor-hover
                className="inline-flex items-center gap-3 bg-[#f0f0f2] hover:bg-[#e6e6e9] transition-colors pl-1.5 pr-5 py-1.5 rounded-full group"
              >
                <span className="w-8 h-8 rounded-lg bg-black text-white flex items-center justify-center font-bold text-sm shadow-xs group-hover:scale-105 transition-transform">
                  &rarr;
                </span>
                <span className="font-semibold text-black text-xs sm:text-sm">Verified CV</span>
              </Link>
            </div>
          </Reveal>
        </div>

        {/* Interactive Scroll-Animated Timeline Section */}
        {activeTab !== "education" && (
          <div ref={containerRef} className="relative mb-20 md:mb-28">
            {/* The Animated Scroll Spine Line */}
            <div className="absolute left-4 sm:left-6 md:left-8 top-8 bottom-8 w-1 bg-black/10 rounded-full -translate-x-1/2">
              <motion.div
                style={{ height: lineHeight }}
                className="w-full bg-gradient-to-b from-red via-red to-[#b30500] rounded-full shadow-[0_0_12px_rgba(225,6,0,0.6)]"
              />
            </div>

            {/* Experience Cards Stack */}
            <div className="space-y-12 sm:space-y-16 pl-10 sm:pl-16 md:pl-20">
              {EXPERIENCES.map((exp, idx) => (
                <ScrollAnimatedCard key={exp.id} exp={exp} index={idx} />
              ))}
            </div>
          </div>
        )}

        {/* Academic Roots & Education Grid */}
        {activeTab !== "experience" && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6 }}
            className="pt-8 border-t border-black/8"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
              <div>
                <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-black/45 block mb-1">
                  FOUNDATIONAL ACADEMICS
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold tracking-[-0.03em] text-black">
                  Education &amp; Roots.
                </h3>
              </div>
              <span className="text-xs font-mono text-black/45 bg-[#f0f0f2] px-3.5 py-1.5 rounded-full">
                Alwar &bull; Rajasthan Board
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {EDUCATION.map((edu, idx) => (
                <motion.div
                  key={edu.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="p-6 sm:p-7 rounded-2xl bg-[#faf8f5] border border-black/8 hover:border-black/25 hover:shadow-lg transition-all duration-300 group"
                >
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="font-mono text-xs font-bold text-red">
                      {edu.period}
                    </span>
                    <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-white border border-black/8 text-black/70">
                      {edu.status}
                    </span>
                  </div>

                  <h4 className="text-lg font-bold text-black group-hover:text-red transition-colors mb-1">
                    {edu.degree}
                  </h4>
                  <p className="text-xs font-semibold text-black/60 mb-3 flex items-center gap-1">
                    <MapPin size={12} className="text-red flex-shrink-0" />
                    <span>{edu.institution}</span>
                  </p>
                  <p className="text-xs text-black/70 leading-relaxed">
                    {edu.note}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Signature Resume Action Card matching Image 2 */}
        <div className="mt-16 md:mt-24 p-8 sm:p-12 rounded-3xl bg-[#faf8f5] border border-black/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-sm">
          <div className="max-w-xl">
            <span className="text-[11px] font-semibold tracking-[0.2em] text-red uppercase block mb-2 font-mono">
              CURRICULUM VITAE &bull; OFFICIAL DOCUMENT
            </span>
            <h4 className="text-2xl sm:text-3xl font-extrabold tracking-[-0.03em] text-black">
              Need the complete resume sheet?
            </h4>
            <p className="text-black/60 text-sm mt-2 leading-relaxed">
              Download the official high-resolution resume PDF with verified contact details,
              employment history, and technical competencies.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/resume"
              data-cursor-hover
              className="inline-flex items-center gap-3 bg-[#0a0a0a] hover:bg-red text-white transition-all duration-300 pl-2 pr-6 py-2 rounded-full shadow-sm group"
            >
              <span className="w-8 h-8 rounded-lg bg-white/20 text-white flex items-center justify-center font-bold text-sm group-hover:rotate-45 transition-transform">
                &rarr;
              </span>
              <span className="font-semibold text-xs sm:text-sm">Inspect &amp; Download Resume</span>
            </Link>

            <Link
              href="/contact"
              data-cursor-hover
              className="inline-flex items-center gap-2 bg-white hover:bg-[#f0f0f2] text-black border border-black/15 text-xs sm:text-sm font-semibold px-5 py-3 rounded-full transition-colors"
            >
              <span>Get in Touch</span>
              <ArrowUpRight size={14} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Scroll-Animated Experience Card with Dynamic Glow Node
// ---------------------------------------------------------------------------
function ScrollAnimatedCard({
  exp,
  index,
}: {
  exp: Experience;
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const MetricIcon = exp.metricIcon;

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="relative group"
    >
      {/* Dynamic Animated Node on Timeline Spine */}
      <div className="absolute -left-[30px] sm:-left-[42px] md:-left-[54px] top-8 w-5 h-5 rounded-full bg-white border-3 border-red shadow-md group-hover:scale-130 group-hover:bg-red transition-all duration-300 flex items-center justify-center -translate-x-1/2 z-10">
        {exp.isCurrent && (
          <span className="w-2.5 h-2.5 rounded-full bg-red animate-ping" />
        )}
      </div>

      {/* Luxury Tactile Card Container */}
      <div className="p-7 sm:p-9 md:p-10 rounded-3xl bg-[#faf8f5] border border-black/10 hover:border-red/40 hover:shadow-2xl transition-all duration-400 relative overflow-hidden">
        {/* Subtle Ambient Light Glow */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-red/[0.04] rounded-full blur-3xl pointer-events-none -mr-20 -mt-20 group-hover:bg-red/[0.08] transition-all duration-500" />

        {/* Top Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
          <div className="flex items-center gap-3">
            {/* Company Monogram Badge */}
            <div className="w-11 h-11 rounded-2xl bg-black text-white font-mono font-black text-sm flex items-center justify-center shadow-xs flex-shrink-0 group-hover:bg-red transition-colors duration-300">
              {exp.initials}
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-black/50">
                  {exp.industry}
                </span>
                {exp.isCurrent && (
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    ACTIVE NOW
                  </span>
                )}
              </div>
              <h4 className="text-base sm:text-lg font-bold text-black mt-0.5">
                {exp.company}
              </h4>
            </div>
          </div>

          {/* Period Capsule */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-black/8 text-xs font-mono font-bold text-black/75 shadow-2xs self-start sm:self-auto">
            <Calendar size={12} className="text-red" />
            <span>{exp.duration}</span>
          </div>
        </div>

        {/* Role Title & Impact Metric Pill */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-5">
          <h3 className="text-2xl sm:text-3xl font-extrabold tracking-[-0.03em] text-black group-hover:text-red transition-colors duration-200">
            {exp.role}
          </h3>

          {/* Key Impact Metric Pill */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-white border border-black/10 text-xs font-bold text-black shadow-2xs self-start lg:self-auto">
            <MetricIcon size={14} className="text-red flex-shrink-0" />
            <span>{exp.metricBadge}</span>
          </div>
        </div>

        {/* Narrative Summary */}
        <p className="text-black/70 text-sm sm:text-base leading-relaxed mb-6">
          {exp.summary}
        </p>

        {/* Proven Achievements */}
        <div className="space-y-2.5 mb-6 pt-4 border-t border-black/6">
          {exp.achievements.map((item, i) => (
            <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-black/75 leading-relaxed">
              <CheckCircle2 size={16} className="text-red mt-0.5 flex-shrink-0" />
              <span>{item}</span>
            </div>
          ))}
        </div>

        {/* Tech Stack Chips & Action Links */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-5 border-t border-black/8">
          {/* Tech Chips */}
          <div className="flex flex-wrap gap-1.5">
            {exp.skills.map((skill) => (
              <span
                key={skill}
                className="text-[11px] font-semibold px-3 py-1 rounded-full bg-white text-black/70 border border-black/8 shadow-2xs"
              >
                {skill}
              </span>
            ))}
          </div>

          {/* Signature Action Links */}
          <div className="flex items-center gap-3">
            {exp.caseStudyUrl && (
              <Link
                href={exp.caseStudyUrl}
                data-cursor-hover
                className="inline-flex items-center gap-2 bg-[#f0f0f2] hover:bg-black hover:text-white transition-all duration-200 pl-1.5 pr-4 py-1.5 rounded-full text-xs font-semibold text-black shadow-2xs group/btn"
              >
                <span className="w-6 h-6 rounded-md bg-black text-white group-hover/btn:bg-white group-hover/btn:text-black flex items-center justify-center font-bold text-xs transition-colors">
                  &rarr;
                </span>
                <span>Case Study</span>
              </Link>
            )}

            {exp.liveUrl && (
              <a
                href={exp.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor-hover
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-black/60 hover:text-red transition-colors"
              >
                <span>Live Site</span>
                <ExternalLink size={12} />
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
