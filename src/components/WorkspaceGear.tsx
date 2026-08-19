"use client";

import { Laptop, Smartphone, Monitor, Cpu, Bot, Sparkles, Terminal, Palette, Wrench } from "lucide-react";
import Reveal from "./Reveal";
import FadeSection from "./FadeSection";

const HARDWARE_GEAR = [
  {
    title: "MacBook Pro (Latest Apple Silicon)",
    category: "Primary Workstation",
    icon: Laptop,
    description:
      "My primary development powerhouse for compiling Next.js applications, local Shopify CLI theme serving, and high-performance frontend workflows.",
    badge: "Hardware",
  },
  {
    title: "Mobile Testing Devices",
    category: "Responsive QA & Testing",
    icon: Smartphone,
    description:
      "Real device testing (iOS & Android) to ensure sub-second touch responsiveness, frictionless mobile cart drawers, and cross-browser perfection.",
    badge: "Mobile Testing",
  },
  {
    title: "Ultra-Wide 4K Display Setup",
    category: "Workspace Visuals",
    icon: Monitor,
    description:
      "Dual-pane workspace for simultaneous live coding, responsive viewport emulation, and Figma/Canva design inspection.",
    badge: "Display",
  },
];

const AI_SOFTWARE_STACK = [
  {
    title: "AI Prompt Engineering & LLM Workflows",
    category: "Generative AI",
    icon: Bot,
    description:
      "Advanced prompt engineering using Claude, GPT-4o, and Gemini to rapidly prototype architectures, automate boilerplate, and debug complex UI logic.",
    badge: "AI Workflow",
  },
  {
    title: "Cursor & VS Code Dev Environment",
    category: "Code Editor & Terminal",
    icon: Terminal,
    description:
      "Equipped with custom zsh configs, Turbopack, TypeScript linting, and Shopify CLI integrations for ultra-fast deployment cycles.",
    badge: "IDE",
  },
  {
    title: "Canva & UI Prototyping Tools",
    category: "Design & Assets",
    icon: Palette,
    description:
      "Crafting marketing banners, social assets, UI wireframes, and vector components that elevate storefront branding.",
    badge: "Design",
  },
];

export default function WorkspaceGear() {
  return (
    <section className="relative py-24 md:py-36 px-6 md:px-10 bg-[#faf8f5] overflow-hidden">
      <div className="max-w-[1400px] mx-auto relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
          <Reveal>
            <div className="flex items-center justify-center gap-3 mb-6">
              <span className="w-2.5 h-2.5 rounded-full bg-red" />
              <span className="text-xs font-semibold uppercase tracking-widest text-black/50">
                Workspace &amp; Daily Stack
              </span>
            </div>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="font-display font-extrabold text-3xl sm:text-5xl md:text-6xl leading-[1.02]">
              Hardware, Accessories &amp; <span className="text-red">AI Tools.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-4 text-black/65 text-sm sm:text-base leading-relaxed">
              The everyday gear, Apple hardware, responsive testing devices, and AI-accelerated workflows I use to build world-class storefronts and web apps.
            </p>
          </Reveal>
        </div>

        {/* 2-Column Grid: Hardware & AI/Software */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-12">
          {/* Hardware Column */}
          <FadeSection>
            <div className="p-7 sm:p-9 rounded-3xl bg-white border border-black/10 shadow-sm h-full flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2.5 mb-6 text-xs font-semibold uppercase tracking-wider text-black/50">
                  <Cpu size={15} className="text-red" />
                  <span>Hardware &amp; Devices</span>
                </div>

                <div className="flex flex-col gap-6">
                  {HARDWARE_GEAR.map((item) => {
                    const Icon = item.icon;
                    return (
                      <div
                        key={item.title}
                        className="p-5 rounded-2xl bg-[#faf8f5] border border-black/5 hover:border-red/30 transition-colors"
                      >
                        <div className="flex items-start justify-between gap-3 mb-2">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-xl bg-black text-white flex items-center justify-center flex-shrink-0">
                              <Icon size={18} />
                            </div>
                            <div>
                              <h3 className="font-display font-bold text-base text-black">
                                {item.title}
                              </h3>
                              <p className="text-xs text-black/50">{item.category}</p>
                            </div>
                          </div>
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-white border border-black/10 text-black/70">
                            {item.badge}
                          </span>
                        </div>
                        <p className="text-xs sm:text-sm text-black/70 leading-relaxed mt-2 pl-12">
                          {item.description}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </FadeSection>

          {/* AI & Software Column */}
          <FadeSection>
            <div className="p-7 sm:p-9 rounded-3xl bg-white border border-black/10 shadow-sm h-full flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2.5 mb-6 text-xs font-semibold uppercase tracking-wider text-black/50">
                  <Sparkles size={15} className="text-red" />
                  <span>AI Engineering &amp; Software</span>
                </div>

                <div className="flex flex-col gap-6">
                  {AI_SOFTWARE_STACK.map((item) => {
                    const Icon = item.icon;
                    return (
                      <div
                        key={item.title}
                        className="p-5 rounded-2xl bg-[#faf8f5] border border-black/5 hover:border-red/30 transition-colors"
                      >
                        <div className="flex items-start justify-between gap-3 mb-2">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-xl bg-red text-white flex items-center justify-center flex-shrink-0">
                              <Icon size={18} />
                            </div>
                            <div>
                              <h3 className="font-display font-bold text-base text-black">
                                {item.title}
                              </h3>
                              <p className="text-xs text-black/50">{item.category}</p>
                            </div>
                          </div>
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-white border border-black/10 text-black/70">
                            {item.badge}
                          </span>
                        </div>
                        <p className="text-xs sm:text-sm text-black/70 leading-relaxed mt-2 pl-12">
                          {item.description}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </FadeSection>
        </div>
      </div>
    </section>
  );
}
