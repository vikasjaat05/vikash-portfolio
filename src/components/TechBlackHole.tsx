"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  ShopifyIcon,
  Html5Icon,
  Css3Icon,
  JavaScriptIcon,
  TypeScriptIcon,
  ReactIcon,
  NextjsIcon,
  TailwindIcon,
  FigmaIcon,
  OpenAIIcon,
  ClaudeIcon,
  SpeedIcon,
  NodejsIcon,
  PythonIcon,
} from "./TechIcons";

// Tech items positioned on 3 concentric gravitational orbit rings
const INNER_ORBIT = [
  { name: "Shopify Plus", icon: ShopifyIcon, angle: 0, glow: "rgba(149,191,71,0.35)" },
  { name: "Next.js 15", icon: NextjsIcon, angle: 90, glow: "rgba(0,0,0,0.3)" },
  { name: "React 19", icon: ReactIcon, angle: 180, glow: "rgba(97,218,251,0.4)" },
  { name: "HTML5", icon: Html5Icon, angle: 270, glow: "rgba(227,79,38,0.4)" },
];

const MIDDLE_ORBIT = [
  { name: "Tailwind CSS", icon: TailwindIcon, angle: 30, glow: "rgba(6,182,212,0.4)" },
  { name: "TypeScript", icon: TypeScriptIcon, angle: 102, glow: "rgba(49,120,198,0.4)" },
  { name: "OpenAI & LLMs", icon: OpenAIIcon, angle: 174, glow: "rgba(16,163,127,0.4)" },
  { name: "JavaScript", icon: JavaScriptIcon, angle: 246, glow: "rgba(247,223,30,0.4)" },
  { name: "CSS3", icon: Css3Icon, angle: 318, glow: "rgba(21,114,182,0.4)" },
];

const OUTER_ORBIT = [
  { name: "Figma", icon: FigmaIcon, angle: 15, glow: "rgba(162,89,255,0.4)" },
  { name: "Claude AI", icon: ClaudeIcon, angle: 87, glow: "rgba(204,120,92,0.4)" },
  { name: "Speed & CWV", icon: SpeedIcon, angle: 159, glow: "rgba(0,200,83,0.4)" },
  { name: "Node.js", icon: NodejsIcon, angle: 231, glow: "rgba(95,160,78,0.4)" },
  { name: "Python", icon: PythonIcon, angle: 303, glow: "rgba(55,118,171,0.4)" },
];

export default function TechBlackHole() {
  const [hoveredTech, setHoveredTech] = useState<string | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / 20;
    const y = (e.clientY - rect.top - rect.height / 2) / 20;
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
    setHoveredTech(null);
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-[380px] h-[380px] xl:w-[440px] xl:h-[440px] flex items-center justify-center select-none"
    >
      {/* Dynamic Gravitational Ambient Glow (Background) */}
      <motion.div
        animate={{
          scale: [1, 1.08, 1],
          opacity: [0.35, 0.55, 0.35],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute inset-0 m-auto w-64 h-64 rounded-full bg-radial from-red/20 via-red/5 to-transparent blur-3xl pointer-events-none"
      />

      {/* Orbit 3 (Outer Orbit - 360px diameter) */}
      <div
        className="absolute w-[340px] h-[340px] xl:w-[400px] xl:h-[400px] rounded-full border border-dashed border-black/[0.09] animate-[spin_55s_linear_infinite]"
        style={{ willChange: "transform" }}
      >
        {OUTER_ORBIT.map((tech) => {
          const rad = (tech.angle * Math.PI) / 180;
          const radius = 170; // 340px / 2 (responsive via CSS transform)
          const x = Math.cos(rad) * radius;
          const y = Math.sin(rad) * radius;

          return (
            <div
              key={tech.name}
              style={{
                left: `calc(50% + ${x}px)`,
                top: `calc(50% + ${y}px)`,
                transform: "translate(-50%, -50%)",
              }}
              className="absolute"
            >
              {/* Counter-rotation to keep icon upright */}
              <div
                className="animate-[spin_55s_linear_infinite_reverse]"
                onMouseEnter={() => setHoveredTech(tech.name)}
                onMouseLeave={() => setHoveredTech(null)}
              >
                <TechOrb tech={tech} isHovered={hoveredTech === tech.name} size="lg" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Orbit 2 (Middle Orbit - 250px diameter) */}
      <div
        className="absolute w-[240px] h-[240px] xl:w-[280px] xl:h-[280px] rounded-full border border-dashed border-black/[0.12] animate-[spin_38s_linear_infinite_reverse]"
        style={{ willChange: "transform" }}
      >
        {MIDDLE_ORBIT.map((tech) => {
          const rad = (tech.angle * Math.PI) / 180;
          const radius = 120; // 240px / 2
          const x = Math.cos(rad) * radius;
          const y = Math.sin(rad) * radius;

          return (
            <div
              key={tech.name}
              style={{
                left: `calc(50% + ${x}px)`,
                top: `calc(50% + ${y}px)`,
                transform: "translate(-50%, -50%)",
              }}
              className="absolute"
            >
              <div
                className="animate-[spin_38s_linear_infinite]"
                onMouseEnter={() => setHoveredTech(tech.name)}
                onMouseLeave={() => setHoveredTech(null)}
              >
                <TechOrb tech={tech} isHovered={hoveredTech === tech.name} size="md" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Orbit 1 (Inner Orbit - 150px diameter) */}
      <div
        className="absolute w-[150px] h-[150px] xl:w-[175px] xl:h-[175px] rounded-full border border-black/[0.12] animate-[spin_24s_linear_infinite]"
        style={{ willChange: "transform" }}
      >
        {INNER_ORBIT.map((tech) => {
          const rad = (tech.angle * Math.PI) / 180;
          const radius = 75; // 150px / 2
          const x = Math.cos(rad) * radius;
          const y = Math.sin(rad) * radius;

          return (
            <div
              key={tech.name}
              style={{
                left: `calc(50% + ${x}px)`,
                top: `calc(50% + ${y}px)`,
                transform: "translate(-50%, -50%)",
              }}
              className="absolute"
            >
              <div
                className="animate-[spin_24s_linear_infinite_reverse]"
                onMouseEnter={() => setHoveredTech(tech.name)}
                onMouseLeave={() => setHoveredTech(null)}
              >
                <TechOrb tech={tech} isHovered={hoveredTech === tech.name} size="sm" />
              </div>
            </div>
          );
        })}
      </div>

      {/* 4. The Cosmic Black Hole Core & Singularity */}
      <motion.div
        animate={{
          x: mousePos.x,
          y: mousePos.y,
        }}
        transition={{ type: "spring", stiffness: 150, damping: 15 }}
        className="relative z-10 flex items-center justify-center cursor-pointer group"
      >
        {/* Accretion Disk Swirl (Fire/Red glowing corona rotating around event horizon) */}
        <div className="absolute w-24 h-24 xl:w-28 xl:h-28 rounded-full bg-gradient-to-tr from-red via-orange-500/80 to-red/40 blur-md opacity-75 animate-[spin_12s_linear_infinite] group-hover:opacity-100 group-hover:scale-110 transition-all duration-500" />

        {/* Accretion Ray Lines */}
        <div className="absolute w-28 h-28 xl:w-32 xl:h-32 rounded-full border border-red/30 animate-[spin_8s_linear_infinite_reverse]" />
        <div className="absolute w-32 h-32 xl:w-36 xl:h-36 rounded-full border border-dashed border-red/20 animate-pulse" />

        {/* Event Horizon (Pure Deep Obsidian Core with Red Rim Lensing) */}
        <div className="relative w-16 h-16 xl:w-20 xl:h-20 rounded-full bg-black shadow-[0_0_25px_rgba(225,6,0,0.5),inset_0_0_15px_rgba(225,6,0,0.8)] border border-red/50 flex flex-col items-center justify-center overflow-hidden transition-transform duration-500 group-hover:scale-105">
          {/* Gravitational Singularity Core Pinpoint */}
          <div className="w-2.5 h-2.5 rounded-full bg-red shadow-[0_0_12px_#E10600] animate-ping opacity-90" />
          <div className="absolute w-1.5 h-1.5 rounded-full bg-white" />

          {/* Tiny status label */}
          <span className="absolute bottom-1.5 text-[8px] font-mono font-bold uppercase tracking-tighter text-white/50 group-hover:text-white transition-colors">
            Core
          </span>
        </div>

        {/* Hover Center Tooltip */}
        <div className="absolute -bottom-7 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap">
          <span className="text-[10px] font-mono font-bold text-red uppercase tracking-widest bg-white/90 backdrop-blur-md px-2 py-0.5 rounded-full border border-red/20 shadow-xs">
            Gravitational Tech Core
          </span>
        </div>
      </motion.div>

      {/* Floating Active Tech Label (Shows when hovering any orbiting icon) */}
      <div className="absolute top-2 left-1/2 -translate-x-1/2 pointer-events-none transition-all duration-300">
        {hoveredTech ? (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black text-white text-[11px] font-mono font-bold tracking-wide shadow-lg border border-red/30"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-red animate-pulse" />
            <span>{hoveredTech}</span>
          </motion.div>
        ) : (
          <span className="text-[10px] font-mono font-semibold uppercase tracking-widest text-black/30">
            Tech Ecosystem &bull; Orbiting
          </span>
        )}
      </div>
    </div>
  );
}

// Single Tech Icon Capsule Orb on Orbit
function TechOrb({
  tech,
  isHovered,
  size = "md",
}: {
  tech: { name: string; icon: React.ComponentType<{ className?: string }>; glow: string };
  isHovered: boolean;
  size?: "sm" | "md" | "lg";
}) {
  const IconComponent = tech.icon;

  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-9 h-9",
    lg: "w-10 h-10",
  }[size];

  const iconSizeClasses = {
    sm: "w-4 h-4",
    md: "w-4.5 h-4.5",
    lg: "w-5 h-5",
  }[size];

  return (
    <div className="relative group/orb cursor-pointer">
      {/* Outer ambient colored glow */}
      <div
        style={{
          boxShadow: isHovered ? `0 0 16px ${tech.glow}` : "0 2px 6px rgba(0,0,0,0.06)",
        }}
        className={`rounded-full transition-all duration-300 ${
          isHovered ? "scale-125" : "hover:scale-110"
        }`}
      >
        {/* White Glass Capsule Container */}
        <div
          className={`${sizeClasses} rounded-full bg-white/95 backdrop-blur-md border border-black/10 flex items-center justify-center shadow-xs transition-colors duration-300 group-hover/orb:border-red/40`}
        >
          <IconComponent className={iconSizeClasses} />
        </div>
      </div>
    </div>
  );
}
