"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { 
  ArrowUpRight, 
  Sparkles, 
  Star, 
  Code2, 
  Zap, 
  ShieldCheck, 
  ShoppingBag,
  ExternalLink,
  Plus,
  Check,
  Award,
  Layers,
  Flame,
  MousePointerClick
} from "lucide-react";
import { useCart } from "./CartContext";
import { STORE_ITEMS } from "@/data/store-items";
import { soundFX } from "@/lib/ui-sounds";

const RECENT_PURCHASES = [
  { name: "Dev from San Francisco", item: "Cyber Ronin 2026", time: "2m ago" },
  { name: "Founder from Berlin", item: "Maison Luxury Shopify", time: "5m ago" },
  { name: "Agency from London", item: "Figma Cyber UI Kit", time: "11m ago" },
  { name: "Creator from Bangalore", item: "Minimalist Bento Theme", time: "18m ago" },
  { name: "Engineer from Tokyo", item: "Solax CleanTech Platform", time: "24m ago" },
];

const MARQUEE_ITEMS = [
  "NEXT.JS 16 APP ROUTER",
  "REACT 19 CORE",
  "60FPS LIQUID GLASS DOCK",
  "SUPABASE PIN CMS",
  "COMMERCIAL LICENSE INCLUDED",
  "SUB-SECOND 0.4S LOADS",
  "FREE VERCEL & SUPABASE DEPLOY",
  "1-ON-1 WHATSAPP SUPPORT",
];

export default function StoreHeroSection() {
  const { addToCart, setIsCartOpen, totalCount } = useCart();
  const [purchaseIndex, setPurchaseIndex] = useState(0);
  const [addedFlagship, setAddedFlagship] = useState(false);

  // 3D Tilt Card Motion Values
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [12, -12]), { damping: 20, stiffness: 200 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-12, 12]), { damping: 20, stiffness: 200 });

  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleCardMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  // Rotate live purchases simulation
  useEffect(() => {
    const timer = setInterval(() => {
      setPurchaseIndex((prev) => (prev + 1) % RECENT_PURCHASES.length);
    }, 4200);
    return () => clearInterval(timer);
  }, []);

  const flagshipItem = STORE_ITEMS[0]; // Cyber Ronin 2026

  const handleAddFlagship = () => {
    soundFX.playCartChime();
    addToCart(flagshipItem);
    setAddedFlagship(true);
    setTimeout(() => setAddedFlagship(false), 2000);
  };

  const currentPurchase = RECENT_PURCHASES[purchaseIndex];

  return (
    <section className="relative px-3 sm:px-5 md:px-8 pt-24 sm:pt-28 pb-10 bg-[#faf8f5]">
      {/* ========================================================= */}
      {/* 1. LARGE SIGNATURE HERO CONTAINER                         */}
      {/* ========================================================= */}
      <div className="relative w-full rounded-[2.2rem] sm:rounded-[3.2rem] overflow-hidden bg-gradient-to-br from-[#0a0f1d] via-[#111827] to-[#1e1b4b] text-white shadow-[0_24px_70px_rgba(0,0,0,0.22)] border border-black/[0.08]">
        
        {/* Continuous Animated Energy Meshes & Gradients */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <motion.div
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.2, 0.4, 0.2],
              x: [0, 50, 0],
              y: [0, -40, 0],
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-24 left-1/4 w-[700px] h-[550px] bg-red/25 blur-[140px] rounded-full"
          />
          <motion.div
            animate={{
              scale: [1, 1.25, 1],
              opacity: [0.15, 0.35, 0.15],
              x: [0, -40, 0],
              y: [0, 50, 0],
            }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-0 right-10 w-[600px] h-[500px] bg-[#3b82f6]/20 blur-[150px] rounded-full"
          />
          
          {/* Subtle Grid Dot Array */}
          <div 
            className="absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage: `radial-gradient(rgba(255, 255, 255, 0.45) 1px, transparent 1px)`,
              backgroundSize: "28px 28px",
            }}
          />
        </div>

        {/* ======================================================= */}
        {/* TOP STATUS BAR: LIVE TICKER & ANIMATED CART TRIGGER     */}
        {/* ======================================================= */}
        <div className="relative z-20 flex flex-col sm:flex-row items-center justify-between gap-3 px-6 sm:px-10 md:px-14 pt-6 sm:pt-8">
          
          {/* Animated Recent Sale Alert Ticker */}
          <motion.div
            key={currentPurchase.item}
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.35 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.08] hover:bg-white/[0.12] border border-white/15 backdrop-blur-md text-xs shadow-xs transition-colors"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="font-mono text-white/55 text-[11px]">{currentPurchase.time}:</span>
            <span className="text-white font-medium truncate max-w-[200px] sm:max-w-none text-xs">
              {currentPurchase.name} purchased <strong className="text-white font-semibold">{currentPurchase.item}</strong>
            </span>
          </motion.div>

          {/* Floating Cart Trigger with Counter Bounce */}
          <motion.button
            type="button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              soundFX.playOpenChime();
              setIsCartOpen(true);
            }}
            data-cursor-hover
            className="relative flex items-center gap-2.5 px-4.5 py-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-md text-xs font-semibold text-white transition-all shadow-md group"
          >
            <ShoppingBag size={14} className="text-red group-hover:rotate-12 transition-transform" />
            <span>Cart</span>
            {totalCount > 0 ? (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: [1, 1.25, 1] }}
                className="w-5 h-5 rounded-full bg-red text-white text-[10px] font-black flex items-center justify-center shadow-xs"
              >
                {totalCount}
              </motion.span>
            ) : (
              <span className="text-white/40 text-[11px] font-mono">0</span>
            )}
          </motion.button>
        </div>

        {/* ======================================================= */}
        {/* HERO MAIN CONTENT & 3D TILT SHOWCASE                   */}
        {/* ======================================================= */}
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center px-6 sm:px-10 md:px-14 pt-6 sm:pt-10 pb-8 sm:pb-10">
          
          {/* Left Column: Brand Copy & Interactive Quick Actions */}
          <div className="lg:col-span-7 flex flex-col justify-center text-left">
            
            {/* Pill Tag with Shimmer Effect */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 backdrop-blur-md mb-6 text-xs text-white/90 self-start shadow-xs"
            >
              <span className="flex h-2 w-2 rounded-full bg-red animate-pulse" />
              <span className="font-mono uppercase tracking-widest text-[11px] text-white/80">
                Official Digital Store
              </span>
              <span className="text-white/30">|</span>
              <span className="font-semibold text-white flex items-center gap-1">
                <Sparkles size={13} className="text-red animate-spin" style={{ animationDuration: "7s" }} />
                By Vikash Choudhary
              </span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.05 }}
              className="font-display text-4xl sm:text-6xl md:text-7xl font-black text-white tracking-tight leading-[1.05] mb-6"
            >
              Award-Winning <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white/95 to-white/70">
                Portfolio Themes &amp;
              </span>{" "}
              <span
                className="text-red italic font-serif"
                style={{ fontFamily: "'Instrument Serif', serif" }}
              >
                Digital Craft.
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="text-white/75 text-base sm:text-lg max-w-xl leading-relaxed mb-8"
            >
              Production-tested Next.js 16 + React 19 source code, luxury Shopify storefronts, 
              and bespoke UI/UX systems. Every purchase includes an <strong>official commercial certificate</strong> and direct developer setup.
            </motion.p>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="flex flex-wrap items-center gap-3.5 sm:gap-4 mb-8"
            >
              <a
                href="#catalog"
                data-cursor-hover
                className="group inline-flex items-center gap-3 pl-6 pr-2.5 py-2.5 rounded-full bg-red hover:bg-red-dark text-white font-bold text-xs sm:text-sm uppercase tracking-wider transition-all duration-300 shadow-[0_10px_25px_rgba(225,6,0,0.4)] hover:scale-105 active:scale-95"
              >
                <span>Explore Catalog</span>
                <span className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:rotate-45">
                  <ArrowUpRight size={16} strokeWidth={2.5} />
                </span>
              </a>

              <button
                type="button"
                onClick={handleAddFlagship}
                data-cursor-hover
                className={`inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 shadow-md ${
                  addedFlagship
                    ? "bg-emerald-500 text-white scale-105"
                    : "bg-white/10 hover:bg-white/20 border border-white/25 text-white hover:scale-105 active:scale-95"
                }`}
              >
                {addedFlagship ? (
                  <>
                    <Check size={16} />
                    <span>Added to Cart!</span>
                  </>
                ) : (
                  <>
                    <Plus size={16} className="text-red" />
                    <span>Quick Add Cyber Ronin ($129)</span>
                  </>
                )}
              </button>
            </motion.div>

            {/* Social Proof Rating & Real-time Browsing Indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs text-white/80"
            >
              <div className="flex items-center gap-1 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14} fill="currentColor" />
                ))}
              </div>
              <span className="font-mono text-white/40">•</span>
              <span className="font-medium text-white/90">
                Rated 4.9/5 by 350+ developers
              </span>
              <span className="font-mono text-white/40">•</span>
              <span className="inline-flex items-center gap-1.5 text-emerald-400 font-mono text-[11px] bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                24 shoppers live
              </span>
            </motion.div>
          </div>

          {/* Right Column: 3D Interactive Tilt Showcase Card */}
          <div className="lg:col-span-5 relative flex items-center justify-center perspective-[1000px]">
            <motion.div
              ref={cardRef}
              style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
              onMouseMove={handleCardMouseMove}
              onMouseLeave={handleCardMouseLeave}
              className="relative w-full max-w-[460px] rounded-3xl overflow-hidden bg-white/[0.08] border border-white/25 backdrop-blur-2xl shadow-[0_30px_90px_rgba(0,0,0,0.55)] p-5 transition-shadow duration-300 hover:shadow-[0_35px_100px_rgba(225,6,0,0.25)]"
            >
              {/* Card Window Bar */}
              <div className="flex items-center justify-between pb-3.5 border-b border-white/10 mb-4">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-red/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/80" />
                </div>
                <span className="text-[10px] font-mono text-white/60">
                  cyber-ronin-2026.zip
                </span>
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20 flex items-center gap-1">
                  <Flame size={10} className="text-amber-400" />
                  Most Popular
                </span>
              </div>

              {/* Showcase Screenshot with Glow & Quick Add */}
              <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden bg-black/40 border border-white/10 mb-4 group">
                <img
                  src="https://res.cloudinary.com/dh0amtajw/image/upload/v1783577279/25b3c37a-add8-4e2e-920a-fa6239df736b_jyz3ni.png"
                  alt="Cyber Ronin Portfolio Theme"
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs">
                  <div>
                    <span className="text-[10px] font-mono uppercase text-red font-bold block">
                      Flagship Theme
                    </span>
                    <span className="font-bold text-white text-sm">Cyber Ronin 2026 Edition</span>
                  </div>
                  
                  <button
                    type="button"
                    onClick={handleAddFlagship}
                    data-cursor-hover
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-red hover:bg-red-dark text-white font-bold text-xs shadow-md transition-all active:scale-95"
                  >
                    <ShoppingBag size={13} />
                    <span>Add to Cart</span>
                  </button>
                </div>
              </div>

              {/* Dynamic Highlights Footer */}
              <div className="p-3 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center justify-between text-[11px] font-mono">
                <div className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                  <ShieldCheck size={14} />
                  <span>Verified License Included</span>
                </div>
                <span className="text-white font-bold">$129 / ₹9,999</span>
              </div>
            </motion.div>
          </div>
        </div>

        {/* ======================================================= */}
        {/* INFINITE RUNNING MARQUEE RIBBON                         */}
        {/* ======================================================= */}
        <div className="relative z-20 py-3.5 bg-black/40 border-y border-white/10 overflow-hidden">
          <div className="animate-marquee flex items-center gap-8 text-xs font-mono font-bold tracking-widest text-white/70 uppercase">
            {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((text, idx) => (
              <div key={idx} className="flex items-center gap-3 shrink-0">
                <span className="text-red text-sm">✦</span>
                <span className="hover:text-white transition-colors">{text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ======================================================= */}
        {/* BOTTOM ROW OF 5 BENTO PREVIEW CARDS                     */}
        {/* ======================================================= */}
        <div className="relative z-20 px-4 sm:px-8 py-6 sm:py-8">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3 sm:gap-4">
            
            {/* Card 1: Core Tech Tags */}
            <div className="p-3.5 sm:p-4 rounded-2xl sm:rounded-3xl bg-white/[0.06] backdrop-blur-xl border border-white/10 text-white flex flex-col justify-between min-h-[140px] sm:min-h-[160px] hover:border-white/20 transition-all">
              <div className="flex flex-wrap gap-1.5">
                {["Next.js 16", "React 19", "Tailwind v4", "Supabase", "Lenis 60fps"].map((tag) => (
                  <span
                    key={tag}
                    className="text-[9px] sm:text-[10px] font-medium px-2 py-0.5 rounded-full bg-white/10 text-white/80"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="pt-2 border-t border-white/10 flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase text-white/50">Lighthouse</span>
                <span className="text-xs sm:text-sm font-bold text-emerald-400">99 / 100</span>
              </div>
            </div>

            {/* Card 2: E-Commerce Storefront Stats */}
            <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden min-h-[140px] sm:min-h-[160px] flex flex-col justify-end p-2.5 sm:p-3 border border-white/10 hover:border-white/20 transition-all">
              <img
                src="https://res.cloudinary.com/dh0amtajw/image/upload/v1783577413/eda9108d-48f3-4060-878a-234360ddd785_toe3tv.png"
                alt="Maison Store"
                className="absolute inset-0 w-full h-full object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
              
              <div className="relative z-10 flex items-center justify-between gap-1 p-2 rounded-xl bg-black/75 backdrop-blur-md text-white border border-white/10">
                <div>
                  <span className="text-[8px] text-white/60 block">Load Speed</span>
                  <span className="text-[11px] font-extrabold text-emerald-400">0.6s Avg</span>
                </div>
                <div className="border-l border-white/15 pl-2">
                  <span className="text-[8px] text-white/60 block">Conversion</span>
                  <span className="text-[11px] font-extrabold text-white">+38% Mobile</span>
                </div>
              </div>
            </div>

            {/* Card 3: Dark Signature Features Card */}
            <div className="p-4 sm:p-5 rounded-2xl sm:rounded-3xl bg-black/60 backdrop-blur-xl border border-white/10 text-white flex flex-col justify-between min-h-[140px] sm:min-h-[160px] hover:border-white/20 transition-all">
              <div className="flex items-center gap-1.5 text-red text-xs font-mono font-bold">
                <span className="w-2 h-2 rounded-full bg-red animate-pulse" />
                <span>Liquid Dock &amp; Audio</span>
              </div>
              <p className="text-xs font-semibold leading-snug text-white/90">
                Ambient Sound Engine + PIN-Protected CMS
              </p>
              <div className="text-[10px] text-white/40 font-mono">
                Draft / Publish Safety
              </div>
            </div>

            {/* Card 4: Official Certificate Stamp */}
            <div className="p-3.5 sm:p-4 rounded-2xl sm:rounded-3xl bg-white/[0.06] backdrop-blur-xl border border-white/10 text-white flex flex-col justify-between min-h-[140px] sm:min-h-[160px] hover:border-white/20 transition-all">
              <div>
                <span className="text-[9px] font-mono text-red uppercase block font-bold">
                  Official Verification
                </span>
                <div className="text-xs sm:text-sm font-extrabold text-white mt-0.5">
                  Signed Certificate
                </div>
                <div className="text-[10px] text-white/60 mt-1">
                  Downloadable PNG/PDF
                </div>
              </div>

              <div className="flex items-center gap-1.5 pt-2 border-t border-white/10 text-[9px] text-emerald-400 font-mono">
                <Award size={12} />
                <span>Personalized with your name</span>
              </div>
            </div>

            {/* Card 5: Instant Delivery */}
            <div className="col-span-2 md:col-span-1 p-3.5 sm:p-4 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-red/20 to-black/40 backdrop-blur-xl border border-red/30 text-white flex flex-col justify-between min-h-[140px] sm:min-h-[160px] hover:border-red/50 transition-all">
              <div>
                <span className="text-[9px] font-mono uppercase text-red font-bold block">
                  Support &amp; Delivery
                </span>
                <div className="text-xs sm:text-sm font-bold text-white mt-0.5">
                  Instant Access
                </div>
              </div>

              <div className="space-y-1.5 pt-2">
                <div className="flex items-center gap-1.5 p-1.5 rounded-lg bg-white/10 text-[9px] font-mono">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span>WhatsApp 1-on-1</span>
                </div>
                <div className="flex items-center gap-1.5 p-1.5 rounded-lg bg-white/10 text-[9px] font-mono">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span>GitHub Repo Invite</span>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
