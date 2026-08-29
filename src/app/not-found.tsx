"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Home, Sparkles } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function NotFound() {
  const textRef = useRef<HTMLDivElement>(null);
  const [scaleY, setScaleY] = useState(1);

  useEffect(() => {
    const updateScale = () => {
      if (textRef.current) {
        const height = textRef.current.offsetHeight;
        if (height > 0) {
          const calculated = window.innerHeight / height;
          setScaleY(calculated);
        }
      }
    };

    updateScale();
    window.addEventListener("resize", updateScale);
    return () => window.removeEventListener("resize", updateScale);
  }, []);

  return (
    <>
      <Navbar />
      <main className="relative w-full min-h-screen overflow-hidden flex flex-col justify-between bg-[#fbf9f4] pt-28 pb-16 px-6">
        {/* Background "404" text dynamic scale + mask effect */}
        <div
          className="absolute inset-0 pointer-events-none flex items-center justify-center select-none overflow-hidden"
          style={{
            opacity: 0.85,
            maskImage: "linear-gradient(to bottom, black 40%, transparent 95%)",
            WebkitMaskImage: "linear-gradient(to bottom, black 40%, transparent 95%)",
          }}
        >
          {/* Scaled 404 Text */}
          <div
            ref={textRef}
            className="font-display font-black leading-none tracking-tighter text-black/[0.045] whitespace-nowrap transition-transform duration-200"
            style={{
              fontSize: "clamp(200px, 48vw, 800px)",
              transform: `scale(1.15, ${scaleY * 1.4})`,
              transformOrigin: "center",
            }}
          >
            404
          </div>

          {/* Centered Soft Oval Glow */}
          <div
            className="absolute rounded-full bg-red/[0.04] blur-3xl pointer-events-none"
            style={{
              height: "clamp(200px, 50vh, 600px)",
              width: "clamp(160px, 30vw, 500px)",
              transform: `scale(1, ${scaleY})`,
              transformOrigin: "center",
            }}
          />
        </div>

        {/* Center Animated Video Animation */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10 -mt-10 sm:-mt-16">
          <div className="w-[115vw] h-[75vh] sm:w-[70vw] sm:h-[70vh] md:w-[55vw] md:h-[75vh] max-w-[850px] flex items-center justify-center">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-contain pointer-events-none mix-blend-multiply drop-shadow-xl"
              src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260713_234424_b1332b69-2e69-4302-8dbc-40f86846afbd.mp4"
            />
          </div>
        </div>

        {/* Bottom Content & Navigation Links */}
        <div className="relative z-30 mt-auto flex flex-col items-center text-center max-w-xl mx-auto pt-60 sm:pt-72 md:pt-80">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red/10 border border-red/20 text-red text-xs font-semibold uppercase tracking-wider mb-4 shadow-2xs">
            <Sparkles size={13} />
            Page Not Found
          </div>

          <h1 className="font-display text-2xl sm:text-3xl md:text-4xl font-extrabold text-black mb-3">
            Oops, you took a wrong turn!
          </h1>
          <p className="text-sm sm:text-base text-black/60 max-w-md mb-8 leading-relaxed">
            The page you&apos;re looking for doesn&apos;t exist, was renamed, or has gone off the grid.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/"
              data-cursor-hover
              className="inline-flex items-center gap-2 bg-[#0a0a0a] text-white font-semibold text-sm sm:text-base px-7 py-3.5 sm:px-8 sm:py-4 rounded-full hover:bg-red hover:scale-105 hover:shadow-xl transition-all duration-300 shadow-md"
            >
              <ArrowLeft size={18} />
              Back to Home
            </Link>

            <Link
              href="/work"
              data-cursor-hover
              className="inline-flex items-center gap-2 bg-white border border-black/15 text-black font-semibold text-sm sm:text-base px-6 py-3.5 sm:px-7 sm:py-4 rounded-full hover:border-red hover:text-red transition-all duration-300 shadow-2xs"
            >
              <Home size={18} />
              Explore Works
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
