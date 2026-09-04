"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Laptop,
  Smartphone,
  Layers,
  ShieldCheck,
  ShieldAlert,
  ShoppingBag,
  Plus,
  Check,
  AlertTriangle,
  RotateCcw,
  Sparkles,
  Lock,
  EyeOff,
  Flame,
  CheckCircle2,
} from "lucide-react";
import { StoreItem } from "@/data/store-items";

type DualDevicePreviewModalProps = {
  item: StoreItem | null;
  onClose: () => void;
  onAddToCart: (item: StoreItem) => void;
  onBuyNow: (item: StoreItem) => void;
  formatPrice: (priceUsd: string, itemInr?: string) => string;
  isAdded: boolean;
};

type ViewportMode = "dual" | "desktop" | "mobile";

function WatermarkOverlay() {
  return (
    <div className="absolute inset-0 pointer-events-none z-20 overflow-hidden flex flex-wrap items-center justify-around select-none rotate-[-18deg] scale-125">
      {Array.from({ length: 64 }).map((_, i) => (
        <div
          key={i}
          className="text-xs sm:text-sm font-mono font-black tracking-[0.24em] text-neutral-900/18 dark:text-white/20 drop-shadow-[0_1px_1px_rgba(255,255,255,0.4)] whitespace-nowrap p-8 sm:p-10 select-none"
        >
          VIKASH CHOUDHARY • CONFIDENTIAL PREVIEW • NO SCREENSHOTS
        </div>
      ))}
    </div>
  );
}

export default function DualDevicePreviewModal({
  item,
  onClose,
  onAddToCart,
  onBuyNow,
  formatPrice,
  isAdded,
}: DualDevicePreviewModalProps) {
  const [viewportMode, setViewportMode] = useState<ViewportMode>("desktop");
  const [isPrivacyShieldActive, setIsPrivacyShieldActive] = useState(false);
  const [showScreenshotWarning, setShowScreenshotWarning] = useState(false);
  const [iframeKey, setIframeKey] = useState(0);
  const [previewSource, setPreviewSource] = useState<"live" | "mockup">("live");

  // Triggered warning banner timeout
  const triggerScreenshotWarning = useCallback(() => {
    setShowScreenshotWarning(true);
    // Clear clipboard if possible
    if (typeof navigator !== "undefined" && navigator.clipboard && navigator.clipboard.writeText) {
      try {
        navigator.clipboard.writeText("Protected Commercial Asset — Screenshots Disabled");
      } catch (err) {
        // clipboard access might be restricted
      }
    }
    setTimeout(() => {
      setShowScreenshotWarning(false);
    }, 3500);
  }, []);

  // Anti-Screenshot & DRM Listeners
  useEffect(() => {
    if (!item) return;

    // 1. Window Blur: Obscure preview immediately when OS snipping tool / screenshot utility takes focus
    const handleWindowBlur = () => {
      setIsPrivacyShieldActive(true);
    };

    const handleWindowFocus = () => {
      setIsPrivacyShieldActive(false);
    };

    // 2. Keyboard Interceptions: PrintScreen, Cmd+Shift+3/4/5, Ctrl+P, Ctrl+S, Ctrl+U
    const handleKeyDown = (e: KeyboardEvent) => {
      // Esc closes modal
      if (e.key === "Escape") {
        onClose();
        return;
      }

      // PrintScreen key (Windows)
      if (e.key === "PrintScreen") {
        e.preventDefault();
        e.stopPropagation();
        triggerScreenshotWarning();
        return;
      }

      // Cmd+Shift+3, Cmd+Shift+4, Cmd+Shift+5, Cmd+Shift+S, Win+Shift+S
      if (
        (e.metaKey || e.ctrlKey) &&
        e.shiftKey &&
        ["3", "4", "5", "s", "S"].includes(e.key)
      ) {
        e.preventDefault();
        e.stopPropagation();
        triggerScreenshotWarning();
        return;
      }

      // Print shortcut: Ctrl+P / Cmd+P
      if ((e.metaKey || e.ctrlKey) && (e.key === "p" || e.key === "P")) {
        e.preventDefault();
        e.stopPropagation();
        triggerScreenshotWarning();
        return;
      }

      // Save page / view source: Ctrl+S / Ctrl+U
      if ((e.metaKey || e.ctrlKey) && (e.key === "s" || e.key === "S" || e.key === "u" || e.key === "U")) {
        e.preventDefault();
        e.stopPropagation();
        return;
      }
    };

    // 3. Right Click Context Menu Blocking
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      triggerScreenshotWarning();
    };

    window.addEventListener("blur", handleWindowBlur);
    window.addEventListener("focus", handleWindowFocus);
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("contextmenu", handleContextMenu);

    // Prevent body scrolling when preview modal is open
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("blur", handleWindowBlur);
      window.removeEventListener("focus", handleWindowFocus);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("contextmenu", handleContextMenu);
      document.body.style.overflow = "auto";
    };
  }, [item, onClose, triggerScreenshotWarning]);

  if (!item) return null;

  // Determine demo URL: Use liveDemoUrl if internal/safe, or fallback to beautiful interactive mockup frame
  const demoUrl = item.liveDemoUrl || "/";
  const priceDisplay = formatPrice(item.priceUsd, item.priceInr);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex flex-col bg-[#07090e] text-white select-none overflow-hidden print:hidden">
        {/* ========================================================= */}
        {/* TOP COMMAND BAR (STUDIO CONTROLS & BUY ACTIONS)           */}
        {/* ========================================================= */}
        <header className="h-16 shrink-0 bg-[#0c111d]/90 backdrop-blur-xl border-b border-white/10 px-4 sm:px-6 flex items-center justify-between gap-4 z-20">
          {/* Left: Theme Info & Security Badge */}
          <div className="flex items-center gap-3 min-w-0">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-red text-white shrink-0">
              {item.categoryLabel}
            </span>
            <div className="min-w-0">
              <h2 className="font-display text-sm sm:text-base font-bold text-white truncate">
                {item.title}
              </h2>
              <div className="flex items-center gap-2 text-[10px] font-mono text-white/50">
                <span className="flex items-center gap-1 text-emerald-400">
                  <Lock size={10} />
                  <span>DRM Shield Active</span>
                </span>
                <span>•</span>
                <span>Screenshots Disabled</span>
              </div>
            </div>
          </div>

          {/* Center: Device Viewport Switcher */}
          <div className="hidden md:flex items-center gap-1 p-1 rounded-full bg-white/[0.06] border border-white/10">
            <button
              type="button"
              onClick={() => setViewportMode("dual")}
              data-cursor-hover
              className={`px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                viewportMode === "dual"
                  ? "bg-white text-[#0a0a0a] shadow-xs font-bold"
                  : "text-white/70 hover:text-white"
              }`}
            >
              <Layers size={13} />
              <span>Dual View</span>
            </button>

            <button
              type="button"
              onClick={() => setViewportMode("desktop")}
              data-cursor-hover
              className={`px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                viewportMode === "desktop"
                  ? "bg-white text-[#0a0a0a] shadow-xs font-bold"
                  : "text-white/70 hover:text-white"
              }`}
            >
              <Laptop size={13} />
              <span>Desktop (Full Page)</span>
            </button>

            <button
              type="button"
              onClick={() => setViewportMode("mobile")}
              data-cursor-hover
              className={`px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                viewportMode === "mobile"
                  ? "bg-white text-[#0a0a0a] shadow-xs font-bold"
                  : "text-white/70 hover:text-white"
              }`}
            >
              <Smartphone size={13} />
              <span>Mobile (iPhone 16)</span>
            </button>
          </div>

          {/* Mode Switcher: Live Web vs Mockup View */}
          {item.liveDemoUrl && (
            <div className="hidden xl:flex items-center gap-1 p-1 rounded-full bg-white/[0.06] border border-white/10">
              <button
                type="button"
                onClick={() => setPreviewSource("live")}
                data-cursor-hover
                className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                  previewSource === "live"
                    ? "bg-emerald-500 text-black font-bold shadow-xs"
                    : "text-white/70 hover:text-white"
                }`}
              >
                ● Live Website
              </button>
              <button
                type="button"
                onClick={() => setPreviewSource("mockup")}
                data-cursor-hover
                className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                  previewSource === "mockup"
                    ? "bg-white text-black font-bold shadow-xs"
                    : "text-white/70 hover:text-white"
                }`}
              >
                Mockup View
              </button>
            </div>
          )}

          {/* Right: Pricing, Buy Actions & Close Button */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="text-right hidden sm:block">
              <span className="text-[10px] font-mono text-white/40 uppercase block">
                Perpetual License
              </span>
              <span className="font-display text-lg font-black text-white">
                {priceDisplay}
              </span>
            </div>

            <button
              type="button"
              onClick={() => onAddToCart(item)}
              data-cursor-hover
              className={`px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-xs ${
                isAdded
                  ? "bg-emerald-600 text-white"
                  : "bg-white/10 hover:bg-white/20 text-white"
              }`}
            >
              {isAdded ? (
                <>
                  <Check size={13} />
                  <span className="hidden sm:inline">In Cart</span>
                </>
              ) : (
                <>
                  <Plus size={13} />
                  <span className="hidden sm:inline">Add</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={() => onBuyNow(item)}
              data-cursor-hover
              className="px-4 py-2 rounded-xl bg-red hover:bg-red-dark text-white text-xs font-bold tracking-wider uppercase flex items-center gap-1.5 transition-all shadow-[0_4px_15px_rgba(225,6,0,0.4)] active:scale-95 cursor-pointer"
            >
              <ShoppingBag size={13} />
              <span>Buy Now</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors cursor-pointer ml-1"
              title="Close Preview (Esc)"
            >
              <X size={16} />
            </button>
          </div>
        </header>

        {/* ========================================================= */}
        {/* MOBILE VIEWPORT SWITCHER STRIP (ON SMALL SCREENS)         */}
        {/* ========================================================= */}
        <div className="md:hidden flex items-center justify-center gap-1 p-2 bg-[#0c111d] border-b border-white/10 shrink-0">
          <button
            type="button"
            onClick={() => setViewportMode("dual")}
            className={`px-3 py-1 rounded-full text-xs font-semibold ${
              viewportMode === "dual" ? "bg-white text-black" : "text-white/60"
            }`}
          >
            Dual View
          </button>
          <button
            type="button"
            onClick={() => setViewportMode("desktop")}
            className={`px-3 py-1 rounded-full text-xs font-semibold ${
              viewportMode === "desktop" ? "bg-white text-black" : "text-white/60"
            }`}
          >
            Desktop
          </button>
          <button
            type="button"
            onClick={() => setViewportMode("mobile")}
            className={`px-3 py-1 rounded-full text-xs font-semibold ${
              viewportMode === "mobile" ? "bg-white text-black" : "text-white/60"
            }`}
          >
            Mobile
          </button>
        </div>

        {/* ========================================================= */}
        {/* 1. FULL PAGE DESKTOP VIEWPORT (WITH DIRECT WATERMARK)     */}
        {/* ========================================================= */}
        {viewportMode === "desktop" ? (
          <div className="relative flex-1 w-full h-full flex flex-col bg-[#07090e] overflow-hidden">
            {/* Slim Browser Top Bar */}
            <div className="h-10 shrink-0 bg-[#0f1422] border-b border-white/10 px-4 flex items-center justify-between text-xs z-20">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
              </div>

              <div className="flex items-center gap-2 px-4 py-1 rounded-full bg-black/50 text-[11px] font-mono text-white/80 border border-white/10 shadow-xs">
                <Lock size={11} className="text-emerald-400" />
                <span className="text-white font-semibold">preview.vikashchoudhary.dev/{item.id}</span>
                <span className="text-white/30">•</span>
                <span className="text-emerald-400 font-bold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Full-Page Desktop
                </span>
              </div>

              <div className="flex items-center gap-2 text-[10px] font-mono text-white/50">
                <span className="px-2 py-0.5 rounded-md bg-white/5 border border-white/10">100% Full Viewport</span>
              </div>
            </div>

            {/* Full-Page Screen Canvas */}
            <div className="relative flex-1 w-full h-full overflow-hidden bg-white">
              {previewSource === "live" && item.liveDemoUrl ? (
                <iframe
                  key={`desktop-full-${iframeKey}`}
                  src={item.liveDemoUrl}
                  title={`${item.title} Desktop Full Page Live View`}
                  className="w-full h-full border-0 pointer-events-auto"
                  loading="lazy"
                />
              ) : (
                <div className="w-full h-full overflow-y-auto bg-[#0a0d14]">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-auto object-cover object-top select-none pointer-events-none"
                    onDragStart={(e) => e.preventDefault()}
                  />
                </div>
              )}

              {/* DIRECT WATERMARK OVERLAY OVER FULL-PAGE DESKTOP VIEW */}
              <WatermarkOverlay />

              {/* Bottom Security Status Banner */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/85 backdrop-blur-md border border-white/20 text-[11px] font-mono text-white shadow-2xl pointer-events-none">
                <ShieldCheck size={13} className="text-emerald-400" />
                <span>Protected Commercial Asset • Watermarked for Security • Vikash Choudhary</span>
              </div>
            </div>
          </div>
        ) : (
          /* ========================================================= */
          /* 2. STUDIO VIEWPORT CANVAS (FOR DUAL & MOBILE MODES)        */
          /* ========================================================= */
          <div className="relative flex-1 w-full h-full overflow-y-auto p-4 sm:p-8 flex items-center justify-center bg-radial from-[#121927] to-[#07090e]">
            {/* Subtle Studio Grid Mesh */}
            <div
              className="absolute inset-0 opacity-15 pointer-events-none"
              style={{
                backgroundImage:
                  "linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)",
                backgroundSize: "40px 40px",
              }}
            />

            {/* DEVICES CONTAINER */}
            <div className="relative z-10 w-full max-w-[1500px] flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-10">
              {/* DESKTOP LAPTOP FRAME (ONLY IN DUAL VIEW) */}
              {viewportMode === "dual" && (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.35 }}
                  className="relative flex flex-col items-center w-full lg:w-[68%] max-w-4xl"
                >
                  <div className="w-full rounded-2xl bg-[#1e2330] p-2.5 sm:p-3 shadow-[0_30px_90px_rgba(0,0,0,0.8)] border border-white/10">
                    <div className="flex items-center justify-between px-3 pb-2 text-[10px] font-mono text-white/40">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
                        <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
                        <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
                      </div>
                      <div className="flex items-center gap-1 px-3 py-0.5 rounded-full bg-black/40 text-[9px] text-white/60 border border-white/5">
                        <Lock size={9} className="text-emerald-400" />
                        <span>preview.vikashchoudhary.dev/{item.id}</span>
                      </div>
                      <div className="w-2.5 h-2.5 rounded-full bg-black/60 flex items-center justify-center">
                        <span className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" />
                      </div>
                    </div>

                    <div className="relative aspect-[16/10] w-full rounded-lg overflow-hidden bg-[#0a0d14] text-white shadow-inner custom-scrollbar">
                      {previewSource === "live" && item.liveDemoUrl ? (
                        <div className="relative w-full h-full">
                          <iframe
                            key={`desktop-live-${iframeKey}`}
                            src={item.liveDemoUrl}
                            title={`${item.title} Desktop Live View`}
                            className="w-full h-full border-0 pointer-events-auto"
                            loading="lazy"
                          />
                        </div>
                      ) : (
                        <div className="relative w-full h-full overflow-y-auto">
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-full h-auto object-cover object-top select-none pointer-events-none"
                            onDragStart={(e) => e.preventDefault()}
                          />
                        </div>
                      )}
                      <WatermarkOverlay />
                    </div>
                  </div>

                  <div className="w-[104%] h-3.5 bg-gradient-to-b from-[#2a3040] to-[#121620] rounded-b-xl border-t border-white/10 shadow-lg relative flex items-center justify-center">
                    <div className="w-16 h-1 bg-black/40 rounded-full" />
                  </div>
                </motion.div>
              )}

              {/* 2. MOBILE IPHONE 16 PRO FRAME (IN DUAL AND MOBILE MODES) */}
              {(viewportMode === "dual" || viewportMode === "mobile") && (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.35 }}
                  className={`relative shrink-0 ${
                    viewportMode === "mobile" ? "w-[340px] sm:w-[380px]" : "w-[280px] sm:w-[320px]"
                  }`}
                >
                  <div className="relative rounded-[48px] bg-gradient-to-b from-[#3a3f50] via-[#1a1d26] to-[#0f1118] p-3 shadow-[0_25px_70px_rgba(0,0,0,0.85)] border-2 border-white/15">
                    <div className="absolute -left-[5px] top-24 w-[3px] h-9 bg-white/20 rounded-l-md" />
                    <div className="absolute -left-[5px] top-36 w-[3px] h-12 bg-white/20 rounded-l-md" />
                    <div className="absolute -left-[5px] top-52 w-[3px] h-12 bg-white/20 rounded-l-md" />
                    <div className="absolute -right-[5px] top-32 w-[3px] h-16 bg-white/20 rounded-r-md" />

                    <div className="relative aspect-[9/19] w-full rounded-[40px] overflow-hidden bg-[#0a0d14] text-white shadow-inner custom-scrollbar">
                      <div className="sticky top-2.5 left-1/2 -translate-x-1/2 z-30 w-24 h-6 rounded-full bg-black flex items-center justify-between px-2.5 shadow-md border border-white/10 mx-auto">
                        <div className="w-2.5 h-2.5 rounded-full bg-[#121620]" />
                        <div className="w-2.5 h-2.5 rounded-full bg-[#1a2335]/60 flex items-center justify-center">
                          <span className="w-1 h-1 rounded-full bg-[#00e5ff] animate-pulse" />
                        </div>
                      </div>

                      {previewSource === "live" && item.liveDemoUrl ? (
                        <div className="w-full h-full pt-8">
                          <iframe
                            key={`mobile-live-${iframeKey}`}
                            src={item.liveDemoUrl}
                            title={`${item.title} Mobile Live View`}
                            className="w-full h-full border-0 pointer-events-auto"
                            loading="lazy"
                          />
                        </div>
                      ) : (
                        <div className="w-full h-full overflow-y-auto pt-6">
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-full h-auto object-cover object-top select-none pointer-events-none"
                            onDragStart={(e) => e.preventDefault()}
                          />
                        </div>
                      )}

                      <WatermarkOverlay />

                      <div className="sticky bottom-1.5 left-1/2 -translate-x-1/2 w-28 h-1 bg-white/40 rounded-full pointer-events-none z-30 mx-auto my-2" />
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        )}

          {/* ========================================================= */}
          {/* PRIVACY SHIELD OBSCURED CURTAIN (TRIGGERED ON BLUR / CAPTURE) */}
          {/* ========================================================= */}
          <AnimatePresence>
            {isPrivacyShieldActive && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 z-40 bg-black/95 backdrop-blur-2xl flex flex-col items-center justify-center p-6 text-center"
              >
                <div className="w-16 h-16 rounded-3xl bg-red/10 border border-red/30 flex items-center justify-center text-red mb-4 shadow-[0_0_50px_rgba(225,6,0,0.3)]">
                  <ShieldAlert size={32} />
                </div>

                <span className="text-xs font-mono font-bold uppercase tracking-widest text-red mb-2">
                  Security Shield Active
                </span>

                <h3 className="font-display text-2xl sm:text-3xl font-black text-white max-w-md mb-2">
                  Screen Capture Protected
                </h3>

                <p className="text-xs sm:text-sm text-white/60 max-w-md leading-relaxed mb-6">
                  Preview display has been obscured to prevent unauthorized screen recording or extraction of proprietary design assets.
                </p>

                <div className="px-4 py-2 rounded-xl bg-white/10 border border-white/10 text-xs font-mono text-emerald-400 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Click anywhere or switch back to window to resume preview</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ========================================================= */}
          {/* FLOATING SCREENSHOT WARNING TOAST                         */}
          {/* ========================================================= */}
          <AnimatePresence>
            {showScreenshotWarning && (
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.9 }}
                className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-5 py-3 rounded-2xl bg-[#ff1f26] text-white shadow-[0_15px_40px_rgba(225,6,0,0.5)] border border-white/20 flex items-center gap-3 text-xs font-bold"
              >
                <AlertTriangle size={18} className="text-amber-300 shrink-0 animate-bounce" />
                <span>⚠️ Screen Capture Disabled: Screenshots and downloads are blocked for protected commercial previews.</span>
              </motion.div>
            )}
          </AnimatePresence>
      </div>
    </AnimatePresence>
  );
}
