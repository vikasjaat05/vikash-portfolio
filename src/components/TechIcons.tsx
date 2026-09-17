"use client";

import React from "react";
import clsx from "clsx";

// 1. Shopify Icon (Official Vibrant Green)
export function ShopifyIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M19.14 7.63c-.04-.26-.26-.45-.52-.45h-2.12c-.03-.27-.08-.58-.16-.92-.62-2.73-2.16-4.08-4.57-4.08-2.4 0-3.95 1.35-4.57 4.08-.08.34-.13.65-.16.92H5c-.26 0-.48.19-.52.45L2.52 20.35c-.04.3.17.57.48.61.05.01.1.01.15.01h17.7c.3 0 .55-.25.55-.55 0-.05 0-.1-.01-.15L19.14 7.63z"
        fill="#95BF47"
      />
      <path
        d="M11.77 2.18c2.4 0 3.95 1.35 4.57 4.08.08.34.13.65.16.92h-4.73V2.18z"
        fill="#5E8E3E"
      />
      <path
        d="M12.9 9.8c-.37 0-.67.14-.9.41l-.4.49v3.83l.81.25c.34.11.59.3.73.57.14.28.22.62.22 1.04 0 .76-.23 1.36-.7 1.8-.46.45-1.12.67-1.97.67-.98 0-1.74-.29-2.28-.86-.23-.25-.41-.56-.54-.93l1.52-.77c.09.28.22.5.39.67.24.24.57.36 1 .36.42 0 .75-.11.98-.33.23-.22.35-.52.35-.9 0-.31-.08-.57-.25-.76-.17-.2-.48-.37-.93-.52l-.76-.25c-.71-.23-1.24-.55-1.59-.97-.35-.42-.52-.97-.52-1.65 0-.74.24-1.34.72-1.8.48-.46 1.15-.69 2.01-.69.85 0 1.54.24 2.07.72.31.28.53.64.66 1.09l-1.53.69c-.06-.25-.18-.46-.35-.61-.22-.19-.51-.29-.88-.29z"
        fill="#FFFFFF"
      />
    </svg>
  );
}

// 2. Liquid Icon (Shopify Liquid Theme Engine)
export function LiquidIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 2.5C8.2 7.8 5 11.5 5 15.2a7 7 0 0014 0c0-3.7-3.2-7.4-7-12.7z"
        fill="#0284C7"
      />
      <path
        d="M9.5 13.5L7.5 15.5l2 2m5-4l2 2-2 2"
        stroke="#FFFFFF"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// 3. HTML5 Icon (Official Orange Shield)
export function Html5Icon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M3 2l1.65 18.53L12 23l7.35-2.47L21 2H3z" fill="#E34F26" />
      <path d="M12 3.63v17.54l5.85-1.96L19.4 3.63H12z" fill="#EF652A" />
      <path
        d="M12 7.72H7.28l.21 2.37H12v-2.37zm0 4.74H9.68l.16 1.84 2.16.58v2.46l-4.14-1.15-.3-3.41H12v-.32zm0-4.74v2.37h4.34l-.4 4.54-3.94 1.09v2.46l6.23-1.73.83-9.33L12 7.72z"
        fill="#ECECEC"
      />
      <path
        d="M12 10.09v-2.37h4.72l-.4 4.54-4.32 1.2v-2.46l1.96-.54.2-2.37H12z"
        fill="#FFFFFF"
      />
    </svg>
  );
}

// 4. CSS3 Icon (Official Blue Shield)
export function Css3Icon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M3 2l1.65 18.53L12 23l7.35-2.47L21 2H3z" fill="#1572B6" />
      <path d="M12 3.63v17.54l5.85-1.96L19.4 3.63H12z" fill="#33A9DC" />
      <path
        d="M12 7.72H7.28l.21 2.37H12v-2.37zm0 4.74H7.7l.21 2.37H12v-2.37z"
        fill="#ECECEC"
      />
      <path
        d="M12 14.83l-2.16-.58-.14-1.57H7.31l.29 3.29L12 17.2v-2.37zm0-7.11v2.37h4.34l-.4 4.54-3.94 1.09v2.46l6.23-1.73.83-9.33H12zm0 4.74v2.37h1.96l-.2 2.29-1.76.48v2.46l3.94-1.09.4-4.51H12z"
        fill="#FFFFFF"
      />
    </svg>
  );
}

// 5. JavaScript Icon (Official Yellow Badge)
export function JavaScriptIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect width="24" height="24" rx="4" fill="#F7DF1E" />
      <path
        d="M6.5 17.5l1.9-.9c.3.6.6 1.1 1.3 1.1.7 0 1.1-.3 1.1-1.2v-6.7h2.2v6.7c0 1.9-1.1 2.8-2.9 2.8-1.5 0-2.6-.8-3.1-2.2l-.5.4zm9.3-.1c.6.9 1.5 1.5 2.7 1.5 1.1 0 1.8-.6 1.8-1.4 0-.9-.7-1.3-2-1.8-1.8-.7-3-1.6-3-3.2 0-1.6 1.3-2.8 3.2-2.8 1.4 0 2.4.5 3.1 1.7l-1.7 1.1c-.4-.7-.9-1-1.5-1-.7 0-1.1.4-1.1.9 0 .6.5.9 1.6 1.4 2 .8 3.3 1.6 3.3 3.4 0 1.9-1.5 3-3.7 3-2 0-3.3-.9-4.1-2.3l1.4-1.5z"
        fill="#000000"
      />
    </svg>
  );
}

// 6. TypeScript Icon (Official Blue Badge)
export function TypeScriptIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect width="24" height="24" rx="4" fill="#3178C6" />
      <path
        d="M5.5 8h6v2.1h-1.9V18h-2.2v-7.9H5.5V8zm7.3 6.8c.4.6 1.1 1 1.9 1 .8 0 1.3-.4 1.3-1 0-.6-.5-.9-1.4-1.3-1.4-.5-2.3-1.2-2.3-2.4 0-1.3 1.1-2.3 2.6-2.3 1.1 0 1.9.4 2.4 1.2l-1.3 1c-.3-.5-.7-.7-1.2-.7-.5 0-.8.3-.8.7 0 .4.3.6 1.2 1 1.6.6 2.5 1.3 2.5 2.6 0 1.5-1.2 2.4-2.9 2.4-1.5 0-2.5-.6-3.1-1.6l1.5-1.1z"
        fill="#FFFFFF"
      />
    </svg>
  );
}

// 7. React Icon (Official Cyan Atom)
export function ReactIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <ellipse cx="12" cy="12" rx="9.5" ry="3.8" stroke="#61DAFB" strokeWidth="1.6" />
      <ellipse
        cx="12"
        cy="12"
        rx="9.5"
        ry="3.8"
        transform="rotate(60 12 12)"
        stroke="#61DAFB"
        strokeWidth="1.6"
      />
      <ellipse
        cx="12"
        cy="12"
        rx="9.5"
        ry="3.8"
        transform="rotate(120 12 12)"
        stroke="#61DAFB"
        strokeWidth="1.6"
      />
      <circle cx="12" cy="12" r="1.8" fill="#61DAFB" />
    </svg>
  );
}

// 8. Next.js Icon (Official Monogram)
export function NextjsIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="11" fill="#000000" />
      <path
        d="M15.4 17.2l-6.8-8.5H6.5v8.5h2.1v-6l5.6 7.1c.4-.3.8-.7 1.2-1.1z"
        fill="#FFFFFF"
      />
      <path d="M15.4 7.5h2.1v9l-2.1-2.7V7.5z" fill="#FFFFFF" />
    </svg>
  );
}

// 9. Tailwind CSS Icon (Official Cyan Wave)
export function TailwindIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.335 6.182 14.974 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.335 13.382 8.974 12 6.001 12z"
        fill="#06B6D4"
      />
    </svg>
  );
}

// 10. Figma Icon (Official 5-Color Mark)
export function FigmaIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M8 24c2.2 0 4-1.8 4-4v-4H8c-2.2 0-4 1.8-4 4s1.8 4 4 4z" fill="#0ACF83" />
      <path d="M4 12c0-2.2 1.8-4 4-4h4v8H8c-2.2 0-4-1.8-4-4z" fill="#A259FF" />
      <path d="M4 4c0-2.2 1.8-4 4-4h4v8H8C5.8 8 4 6.2 4 4z" fill="#F24E1E" />
      <path d="M12 0h4c2.2 0 4 1.8 4 4s-1.8 4-4 4h-4V0z" fill="#FF7262" />
      <path d="M20 12c0 2.2-1.8 4-4 4s-4-1.8-4-4 1.8-4 4-4 4 1.8 4 4z" fill="#1ABCFE" />
    </svg>
  );
}

// 11. OpenAI / ChatGPT Icon (Emerald Spiral)
export function OpenAIIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M22.28 9.77a6 6 0 00-.51-4.89 6.06 6.06 0 00-6.19-2.9 6.06 6.06 0 00-4.64-2.09 6.09 6.09 0 00-5.8 4.2 6.06 6.06 0 00-4 2.89 6.06 6.06 0 00.75 6.8 6.06 6.06 0 00.51 4.89 6.06 6.06 0 006.19 2.9 6.06 6.06 0 004.64 2.09 6.09 6.09 0 005.8-4.2 6.06 6.06 0 004-2.89 6.06 6.06 0 00-.75-6.8zm-8.89 12.33a4.54 4.54 0 01-2.94-.37l2.84-1.64a.8.8 0 00.41-.7v-3.92l1.62.94v4.54a4.57 4.57 0 01-1.93 1.15zM4.1 18.06a4.57 4.57 0 01-.59-2.91l2.84 1.64a.8.8 0 00.8 0l3.4-1.96v1.87l-3.93 2.27a4.57 4.57 0 01-2.52-.91zm-1.57-7.6a4.54 4.54 0 012.35-1.74V12a.8.8 0 00.4.7l3.4 1.96-1.62.94-3.93-2.27a4.57 4.57 0 01-.6-2.87zm13.62 1.34l-3.4-1.96 1.62-.94 3.93 2.27a4.57 4.57 0 01.6 2.87 4.54 4.54 0 01-2.35 1.74V13.1a.8.8 0 00-.4-.7zm2.75-3.34a4.57 4.57 0 01.59 2.91l-2.84-1.64a.8.8 0 00-.8 0l-3.4 1.96v-1.87l3.93-2.27a4.57 4.57 0 012.52.91zm-6.84-2.2l-1.62-.94v-4.54a4.57 4.57 0 014.87-.78l-2.84 1.64a.8.8 0 00-.41.7v3.92zm-2.02 4.67l2.45-1.42 2.45 1.42v2.83l-2.45 1.42-2.45-1.42V10.9z"
        fill="#10A37F"
      />
    </svg>
  );
}

// 12. Claude Icon (Anthropic Warm Terracotta Spark)
export function ClaudeIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M13.5 2.5l1.6 6.3 6.4 1.6-6.4 1.6-1.6 6.3-1.6-6.3L5.5 10.4l6.4-1.6 1.6-6.3z"
        fill="#CC785C"
      />
      <circle cx="18.5" cy="5.5" r="2.2" fill="#D97706" />
    </svg>
  );
}

// 13. Speed & Core Web Vitals Icon (Lighthouse Emerald Speedometer)
export function SpeedIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 3.5v2.5M4.93 5.93l1.77 1.77M2.5 12h2.5M19.07 5.93l-1.77 1.77M21.5 12h-2.5M12 20.5a8.5 8.5 0 100-17 8.5 8.5 0 000 17z"
        stroke="#00C853"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M12 12l3.8-2.8"
        stroke="#E10600"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle cx="12" cy="12" r="2.2" fill="#00C853" />
    </svg>
  );
}

// 14. Node.js Icon (Green Hexagon)
export function NodejsIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 2l8.66 5v10L12 22l-8.66-5V7L12 2z" fill="#5FA04E" />
      <path d="M12 6.5l5 2.89v5.78L12 18.06l-5-2.89V9.39L12 6.5z" fill="#333333" />
      <path d="M12 9l3 1.73v3.46L12 15.92l-3-1.73V10.73L12 9z" fill="#FFFFFF" />
    </svg>
  );
}

// 15. Python Icon (Blue & Yellow)
export function PythonIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M11.87 2c-5.28 0-4.96 2.29-4.96 2.29l.01 2.37h5.04v.71H4.91S2 7.04 2 12.33c0 5.28 2.54 5.09 2.54 5.09h1.52v-2.13s-.08-2.54 2.5-2.54h5.01s2.42.04 2.42-2.38V4.38S16.39 2 11.87 2zm-2.73 1.45a.91.91 0 110 1.82.91.91 0 010-1.82z"
        fill="#3776AB"
      />
      <path
        d="M12.13 22c5.28 0 4.96-2.29 4.96-2.29l-.01-2.37h-5.04v-.71h7.05S22 16.96 22 11.67c0-5.28-2.54-5.09-2.54-5.09h-1.52v2.13s.08 2.54-2.5 2.54h-5.01s-2.42-.04-2.42 2.38v5.99S7.61 22 12.13 22zm2.73-1.45a.91.91 0 110-1.82.91.91 0 010 1.82z"
        fill="#FFD43B"
      />
    </svg>
  );
}

// Unified Tech Icon Dispatcher
export function TechIcon({
  name,
  className = "w-4 h-4",
}: {
  name: string;
  className?: string;
}) {
  const key = name.toLowerCase();
  switch (key) {
    case "shopify":
      return <ShopifyIcon className={className} />;
    case "liquid":
      return <LiquidIcon className={className} />;
    case "html5":
    case "html":
      return <Html5Icon className={className} />;
    case "css3":
    case "css":
      return <Css3Icon className={className} />;
    case "javascript":
    case "js":
      return <JavaScriptIcon className={className} />;
    case "typescript":
    case "ts":
      return <TypeScriptIcon className={className} />;
    case "react":
      return <ReactIcon className={className} />;
    case "nextjs":
    case "next.js":
      return <NextjsIcon className={className} />;
    case "tailwind":
    case "tailwindcss":
      return <TailwindIcon className={className} />;
    case "figma":
      return <FigmaIcon className={className} />;
    case "openai":
    case "chatgpt":
    case "ai":
      return <OpenAIIcon className={className} />;
    case "claude":
      return <ClaudeIcon className={className} />;
    case "speed":
    case "core web vitals":
    case "lighthouse":
      return <SpeedIcon className={className} />;
    case "nodejs":
    case "node":
      return <NodejsIcon className={className} />;
    case "python":
      return <PythonIcon className={className} />;
    default:
      return <Html5Icon className={className} />;
  }
}

// Category Hero Icon for Service Row
export function ServiceCategoryIcon({
  type,
  className = "w-6 h-6",
}: {
  type: string;
  className?: string;
}) {
  switch (type) {
    case "shopify":
      return <ShopifyIcon className={className} />;
    case "web":
      return <ReactIcon className={className} />;
    case "ai":
      return <OpenAIIcon className={className} />;
    case "uiux":
      return <FigmaIcon className={className} />;
    default:
      return <ShopifyIcon className={className} />;
  }
}

// Reusable TechBadge Pill Component
export function TechBadge({
  icon,
  label,
  className = "",
}: {
  icon: string;
  label: string;
  className?: string;
}) {
  return (
    <span
      className={clsx(
        "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold tracking-tight transition-all duration-300",
        "bg-white/95 border border-black/10 text-black/85 shadow-2xs",
        "group-hover:bg-white group-hover:border-transparent group-hover:text-black group-hover:shadow-sm",
        "group-data-[inview=true]:bg-white group-data-[inview=true]:border-transparent group-data-[inview=true]:text-black group-data-[inview=true]:shadow-sm",
        "hover:scale-105 select-none",
        className
      )}
    >
      <TechIcon name={icon} className="w-3.5 h-3.5 shrink-0" />
      <span className="whitespace-nowrap">{label}</span>
    </span>
  );
}
