"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <main className="relative w-full h-screen h-[100dvh] overflow-hidden bg-white flex flex-col items-center justify-between py-6 sm:py-10 px-4 select-none">
      {/* 1. Background 404 Numbers (Responsive across Mobile & Desktop) */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
        <span
          className="font-display font-black leading-none text-[#FBBF24] opacity-95 select-none text-center"
          style={{
            fontSize: "clamp(150px, 26vw, 380px)",
            letterSpacing: "-0.04em",
          }}
        >
          404
        </span>
      </div>

      {/* Top spacing */}
      <div className="w-full h-2 sm:h-4" />

      {/* 2. Center Animated Fox (Blends seamlessly with zero white box) */}
      <div className="relative my-auto flex items-center justify-center pointer-events-none">
        <div className="w-[260px] h-[260px] sm:w-[320px] sm:h-[320px] md:w-[390px] md:h-[390px] max-w-[90vw] max-h-[48vh] flex items-center justify-center">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-contain pointer-events-none"
            style={{
              mixBlendMode: "multiply",
            }}
            src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260713_234424_b1332b69-2e69-4302-8dbc-40f86846afbd.mp4"
          />
        </div>
      </div>

      {/* 3. Bottom Copy & Mobile Responsive Button */}
      <div className="relative flex flex-col items-center text-center max-w-sm sm:max-w-md mx-auto pb-4 sm:pb-8">
        <h1 className="text-[#0a0a0a] text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight mb-1.5 sm:mb-2 leading-snug">
          Oops, something went wrong!
        </h1>
        <p className="text-black/60 text-xs sm:text-sm md:text-base font-medium mb-5 sm:mb-6">
          This page does not exist.
        </p>

        <Link
          href="/"
          className="group liquid-btn-dark !px-8 !py-3.5 !text-sm sm:!text-base !font-semibold gap-2.5 hover:!scale-105 transition-all duration-300"
        >
          <ArrowLeft
            size={18}
            strokeWidth={2.5}
            className="group-hover:-translate-x-1 transition-transform duration-200"
          />
          <span>Back to Home</span>
        </Link>
      </div>
    </main>
  );
}
