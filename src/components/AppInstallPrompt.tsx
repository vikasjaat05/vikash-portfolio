"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Download, X, Smartphone, CheckCircle2, Share2, PlusSquare, Sparkles } from "lucide-react";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

export default function AppInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [showIOSGuide, setShowIOSGuide] = useState(false);
  const [installed, setInstalled] = useState(false);

  useEffect(() => {
    // Check if already installed (standalone mode)
    if (typeof window !== "undefined") {
      const isStandalone =
        window.matchMedia("(display-mode: standalone)").matches ||
        (window.navigator as unknown as { standalone?: boolean }).standalone === true;

      if (isStandalone) {
        setInstalled(true);
        return;
      }

      // Detect iOS Safari
      const ua = window.navigator.userAgent.toLowerCase();
      const isIosDevice = /iphone|ipad|ipod/.test(ua);
      setIsIOS(isIosDevice);

      // Check if user dismissed prompt recently (within last 3 days)
      const dismissedAt = localStorage.getItem("app_prompt_dismissed_at");
      if (dismissedAt) {
        const timeDiff = Date.now() - parseInt(dismissedAt, 10);
        if (timeDiff < 3 * 24 * 60 * 60 * 1000) {
          return; // Skip prompt
        }
      }

      // Listen for Android/Desktop PWA beforeinstallprompt
      const handleBeforeInstallPrompt = (e: Event) => {
        e.preventDefault();
        setDeferredPrompt(e as BeforeInstallPromptEvent);
      };

      window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

      // Show popup after 3.5 seconds
      const timer = setTimeout(() => {
        setShowPrompt(true);
      }, 3500);

      window.addEventListener("appinstalled", () => {
        setInstalled(true);
        setShowPrompt(false);
        setDeferredPrompt(null);
      });

      return () => {
        window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
        clearTimeout(timer);
      };
    }
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      // Trigger native browser install dialog
      await deferredPrompt.prompt();
      const choice = await deferredPrompt.userChoice;
      if (choice.outcome === "accepted") {
        setInstalled(true);
        setShowPrompt(false);
      }
      setDeferredPrompt(null);
    } else if (isIOS) {
      // Show iOS specific "Add to Home Screen" instructions
      setShowIOSGuide(true);
    } else {
      // Direct guide for generic browsers
      setShowIOSGuide(true);
    }
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    setShowIOSGuide(false);
    if (typeof window !== "undefined") {
      localStorage.setItem("app_prompt_dismissed_at", Date.now().toString());
    }
  };

  if (installed) return null;

  return (
    <>
      {/* ── Main App Install Popup Banner ── */}
      <AnimatePresence>
        {showPrompt && !showIOSGuide && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.92 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className="fixed bottom-20 sm:bottom-6 right-4 sm:right-6 z-50 max-w-[360px] w-[calc(100vw-32px)] select-none pointer-events-auto"
          >
            <div
              className="relative overflow-hidden rounded-[26px] p-4 sm:p-5 text-white"
              style={{
                background:
                  "linear-gradient(135deg, rgba(18, 18, 24, 0.96) 0%, rgba(8, 8, 12, 0.99) 100%)",
                backdropFilter: "blur(28px) saturate(190%)",
                WebkitBackdropFilter: "blur(28px) saturate(190%)",
                border: "1.5px solid rgba(255, 255, 255, 0.16)",
                boxShadow:
                  "0 24px 60px rgba(0, 0, 0, 0.8), 0 0 35px rgba(225, 6, 0, 0.22), inset 0 1px 2px rgba(255, 255, 255, 0.3)",
              }}
            >
              {/* Subtle Animated Top Border Glow */}
              <div
                className="absolute top-0 left-0 right-0 h-[2px] pointer-events-none"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, #ff2e2e, #e10600, #ff6b6b, transparent)",
                }}
              />

              {/* Close ✕ Button */}
              <button
                type="button"
                onClick={handleDismiss}
                className="absolute top-3.5 right-3.5 w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 flex items-center justify-center text-white/70 hover:text-white transition-colors"
                title="Dismiss"
              >
                <X size={14} />
              </button>

              {/* Header Info */}
              <div className="flex items-start gap-3.5 mb-3.5">
                {/* App Icon (Monogram V) */}
                <div className="relative w-12 h-12 rounded-2xl overflow-hidden flex-shrink-0 border border-white/25 shadow-[0_8px_20px_rgba(225,6,0,0.35)] bg-gradient-to-br from-[#1c1c24] to-[#0a0a0e] flex items-center justify-center p-1.5">
                  <Image
                    src="/favicon.svg"
                    alt="Vikash App Icon"
                    width={40}
                    height={40}
                    className="w-full h-full object-contain drop-shadow-[0_2px_8px_rgba(225,6,0,0.6)]"
                  />
                  <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-[#121218]" />
                </div>

                {/* Text Description */}
                <div className="flex-1 pr-4">
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <span className="text-[10px] font-mono font-bold tracking-wider uppercase text-red bg-red/10 px-2 py-0.5 rounded-full border border-red/20">
                      Official App
                    </span>
                    <span className="text-[10px] text-white/50 flex items-center gap-0.5">
                      <Sparkles size={10} className="text-amber-400" /> 4.9 ★
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-white tracking-tight leading-tight">
                    Download Vikash App
                  </h3>
                  <p className="text-[11px] text-white/60 leading-tight mt-0.5">
                    Fast access, offline portfolio & direct project booking.
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleInstallClick}
                  className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-gradient-to-r from-red to-[#b30000] text-white font-bold text-xs shadow-[0_4px_16px_rgba(225,6,0,0.4)] hover:brightness-110 active:scale-[0.98] transition-all"
                >
                  <Download size={14} />
                  <span>Download App</span>
                </button>
                <button
                  type="button"
                  onClick={handleDismiss}
                  className="py-2.5 px-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white/60 hover:text-white text-xs font-medium transition-colors"
                >
                  Later
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── iOS / Manual "Add to Home Screen" Instructions Modal ── */}
      <AnimatePresence>
        {showIOSGuide && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 select-none pointer-events-auto">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowIOSGuide(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />

            {/* Modal Card */}
            <motion.div
              initial={{ scale: 0.85, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.85, opacity: 0, y: 20 }}
              transition={{ type: "spring", stiffness: 400, damping: 28 }}
              className="relative w-full max-w-sm rounded-[30px] p-6 text-white text-center z-10"
              style={{
                background:
                  "linear-gradient(135deg, rgba(20, 20, 26, 0.98) 0%, rgba(10, 10, 14, 0.99) 100%)",
                border: "1.5px solid rgba(255, 255, 255, 0.18)",
                boxShadow:
                  "0 32px 80px rgba(0, 0, 0, 0.9), 0 0 40px rgba(225, 6, 0, 0.25)",
              }}
            >
              <button
                type="button"
                onClick={() => setShowIOSGuide(false)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 flex items-center justify-center text-white/80 hover:text-white transition-colors"
              >
                <X size={15} />
              </button>

              {/* Icon */}
              <div className="w-16 h-16 rounded-2xl mx-auto mb-4 overflow-hidden border border-white/30 shadow-[0_8px_24px_rgba(225,6,0,0.4)] bg-gradient-to-br from-[#1c1c24] to-[#0a0a0e] flex items-center justify-center p-2.5">
                <Image
                  src="/favicon.svg"
                  alt="App Icon"
                  width={48}
                  height={48}
                  className="w-full h-full object-contain drop-shadow-[0_2px_10px_rgba(225,6,0,0.7)]"
                />
              </div>

              <h3 className="text-lg font-bold text-white mb-1">
                Install Vikash Portfolio
              </h3>
              <p className="text-xs text-white/60 mb-5">
                Add to your device home screen for fullscreen luxury experience.
              </p>

              {/* Steps */}
              <div className="space-y-3 text-left bg-white/5 rounded-2xl p-4 border border-white/10 mb-5">
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-full bg-red/20 border border-red/40 flex items-center justify-center text-red font-bold text-xs flex-shrink-0">
                    1
                  </div>
                  <div className="text-xs text-white/90 flex items-center gap-1.5 flex-wrap">
                    Tap the <span className="inline-flex items-center gap-1 font-bold text-white bg-white/15 px-2 py-0.5 rounded"><Share2 size={12} /> Share</span> icon in Safari/browser.
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-full bg-red/20 border border-red/40 flex items-center justify-center text-red font-bold text-xs flex-shrink-0">
                    2
                  </div>
                  <div className="text-xs text-white/90 flex items-center gap-1.5 flex-wrap">
                    Scroll down and tap <span className="inline-flex items-center gap-1 font-bold text-white bg-white/15 px-2 py-0.5 rounded"><PlusSquare size={12} /> Add to Home Screen</span>.
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-full bg-red/20 border border-red/40 flex items-center justify-center text-red font-bold text-xs flex-shrink-0">
                    3
                  </div>
                  <div className="text-xs text-white/90">
                    Tap <span className="font-bold text-emerald-400">Add</span> in the top-right corner.
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setShowIOSGuide(false)}
                className="w-full py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-xs transition-colors"
              >
                Got It!
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
