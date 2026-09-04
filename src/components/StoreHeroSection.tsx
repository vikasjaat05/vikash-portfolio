"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { 
  ArrowUpRight, 
  Sparkles, 
  Star, 
  ShoppingBag,
  Plus,
  Check,
  Award
} from "lucide-react";
import { useCart } from "./CartContext";
import { STORE_ITEMS } from "@/data/store-items";
import { soundFX } from "@/lib/ui-sounds";
import StoreControlBar from "./StoreControlBar";

const RECENT_PURCHASES = [
  { name: "Dev from San Francisco", item: "Cyber Ronin 2026", time: "2m ago" },
  { name: "Founder from Berlin", item: "Maison Luxury Shopify", time: "5m ago" },
  { name: "Agency from London", item: "Figma Cyber UI Kit", time: "11m ago" },
  { name: "Creator from Bangalore", item: "Minimalist Bento Theme", time: "18m ago" },
  { name: "Engineer from Tokyo", item: "Solax CleanTech Platform", time: "24m ago" },
  { name: "Studio from Dubai", item: "Liquid Glass Motion Kit", time: "31m ago" },
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
  const { addToCart, setIsCartOpen, totalCount, formatPrice, t } = useCart();
  const [purchaseIndex, setPurchaseIndex] = useState(0);
  const [addedFlagship, setAddedFlagship] = useState(false);

  // Rotate live purchases simulation
  useEffect(() => {
    const timer = setInterval(() => {
      setPurchaseIndex((prev) => (prev + 1) % RECENT_PURCHASES.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, []);

  const flagshipItem = STORE_ITEMS[0]; // Cyber Ronin 2026

  const handleAddFlagship = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    soundFX.playCartChime();
    addToCart(flagshipItem);
    setAddedFlagship(true);
    setTimeout(() => setAddedFlagship(false), 2000);
  };

  const currentPurchase = RECENT_PURCHASES[purchaseIndex];

  return (
    <section 
      className="relative w-full overflow-hidden bg-[#142838] text-white shadow-[0_30px_90px_rgba(0,0,0,0.25)] border-b border-black/[0.08]"
      style={{ transform: "translateZ(0)" }}
    >
      {/* Background Looping Alpine Cinematic Video - Edge-to-Edge Full Width */}
      <div 
        className="absolute inset-0 pointer-events-none overflow-hidden bg-[#1d8fb8]"
        style={{ transform: "translateZ(0)" }}
      >
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          poster="https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/693205bf-8048-456a-879e-4e0a1b85a098.webp"
          aria-label="Painted alpine panorama: a lone hiker with a pink backpack faces a snow-capped peak above a sea of clouds"
          className="absolute inset-0 w-full h-full object-cover object-right-bottom scale-100 pointer-events-none"
          style={{ 
            filter: "saturate(0.95) contrast(1.04)",
            transform: "translateZ(0)",
          }}
        >
          <source
            src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260826_123836_11a3c5e0-713f-4bef-a8e9-7dd93bdea3b0.mp4"
            type="video/mp4"
          />
        </video>

        {/* Directional Left Scrim: protects headline & text contrast while leaving mountain & clouds 100% visible */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "linear-gradient(90deg, rgba(6, 18, 30, 0.78) 0%, rgba(6, 18, 30, 0.48) 44%, rgba(6, 18, 30, 0.08) 72%, transparent 100%)",
          }}
        />

        {/* Top Status Bar Scrim */}
        <div 
          className="absolute top-0 left-0 right-0 h-36 pointer-events-none"
          style={{
            background: "linear-gradient(180deg, rgba(4, 14, 24, 0.60) 0%, transparent 100%)",
          }}
        />

        {/* Bottom Bento Anchor Scrim */}
        <div 
          className="absolute bottom-0 left-0 right-0 h-80 pointer-events-none"
          style={{
            background: "linear-gradient(0deg, rgba(6, 16, 26, 0.90) 0%, rgba(6, 16, 26, 0.45) 50%, transparent 100%)",
          }}
        />
        
        {/* Subtle Grid Dot Array */}
        <div 
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(rgba(255, 255, 255, 0.45) 1px, transparent 1px)`,
            backgroundSize: "28px 28px",
          }}
        />
      </div>

      {/* ======================================================= */}
      {/* TOP STATUS BAR: LIVE TICKER, CONTROLS & CART TRIGGER    */}
      {/* ======================================================= */}
      <div className="relative z-20 max-w-[1550px] mx-auto w-full flex flex-col md:flex-row items-center justify-between gap-3 px-4 sm:px-8 md:px-12 pt-28 sm:pt-32">
          
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
              {currentPurchase.name} acquired <strong className="text-white font-semibold">{currentPurchase.item}</strong>
            </span>
          </motion.div>

          {/* Right Controls: Language, Currency & Cart Bag */}
          <div className="flex items-center gap-2.5">
            {/* Multi-Language & Multi-Currency Selectors */}
            <StoreControlBar />

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
              className="relative flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/25 backdrop-blur-md text-xs font-semibold text-white transition-all shadow-md group"
            >
              <ShoppingBag size={14} className="text-red group-hover:rotate-12 transition-transform" />
              <span>{t("cart")}</span>
              {totalCount > 0 ? (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: [1, 1.3, 1] }}
                  className="w-5 h-5 rounded-full bg-red text-white text-[10px] font-black flex items-center justify-center shadow-xs"
                >
                  {totalCount}
                </motion.span>
              ) : (
                <span className="text-white/40 text-[11px] font-mono">0</span>
              )}
            </motion.button>
          </div>
        </div>

        {/* ======================================================= */}
        {/* HERO MAIN CONTENT (Cinematic Left-Aligned Layout)       */}
        {/* ======================================================= */}
        <div className="relative z-10 max-w-[1550px] mx-auto w-full px-4 sm:px-8 md:px-12 pt-8 sm:pt-14 pb-14 sm:pb-20">
          
          {/* Left Column: Brand Copy & Interactive Quick Actions */}
          <div className="max-w-2xl lg:max-w-3xl flex flex-col justify-center text-left">
            
            {/* Pill Tag with Shimmer Effect */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 backdrop-blur-md mb-6 text-xs text-white/90 self-start shadow-xs"
            >
              <span className="flex h-2 w-2 rounded-full bg-red animate-pulse" />
              <span className="font-mono uppercase tracking-widest text-[11px] text-white/80">
                {t("heroPill")}
              </span>
              <span className="text-white/30">|</span>
              <span className="font-semibold text-white flex items-center gap-1">
                <Sparkles size={13} className="text-red animate-spin" style={{ animationDuration: "7s" }} />
                By Vikash Choudhary
              </span>
            </motion.div>

            {/* Main Headline with kinetic styling */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.05 }}
              className="font-display text-4xl sm:text-6xl md:text-7xl font-black text-white tracking-tight leading-[1.05] mb-6"
            >
              {t("heroTitle1")} <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white/95 to-white/70">
                {t("heroTitle2")}
              </span>{" "}
              <span
                className="text-red italic font-serif"
                style={{ fontFamily: "'Instrument Serif', serif" }}
              >
                {t("heroTitle3")}
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="text-white/85 text-base sm:text-lg max-w-xl leading-relaxed mb-8 drop-shadow-sm"
            >
              {t("heroSubtitle")}
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
                className="group inline-flex items-center gap-3 pl-6 pr-2.5 py-2.5 rounded-full bg-red hover:bg-red-dark text-white font-bold text-xs sm:text-sm uppercase tracking-wider transition-all duration-300 shadow-[0_10px_25px_rgba(225,6,0,0.45)] hover:scale-105 active:scale-95"
              >
                <span>{t("exploreCatalog")}</span>
                <span className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:rotate-45">
                  <ArrowUpRight size={16} strokeWidth={2.5} />
                </span>
              </a>

              <button
                type="button"
                onClick={handleAddFlagship}
                data-cursor-hover
                className={`relative inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 shadow-md ${
                  addedFlagship
                    ? "bg-emerald-500 text-white scale-105"
                    : "bg-white/10 hover:bg-white/20 border border-white/25 text-white hover:scale-105 active:scale-95"
                }`}
              >
                {addedFlagship ? (
                  <>
                    <Check size={16} />
                    <span>{t("added")}</span>
                  </>
                ) : (
                  <>
                    <Plus size={16} className="text-red" />
                    <span>{t("quickAdd")} ({formatPrice(flagshipItem.priceUsd, flagshipItem.priceInr)})</span>
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
                {t("ratedBy")}
              </span>
              <span className="font-mono text-white/40">•</span>
              <span className="inline-flex items-center gap-1.5 text-emerald-400 font-mono text-[11px] bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                28 {t("liveShoppers")}
              </span>
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
        <div className="relative z-20 max-w-[1550px] mx-auto w-full px-4 sm:px-8 md:px-12 py-8 sm:py-12">
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
    </section>
  );
}
