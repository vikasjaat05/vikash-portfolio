"use client";

import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, ShoppingBag, ArrowRight, X } from "lucide-react";
import { useCart } from "./CartContext";
import { soundFX } from "@/lib/ui-sounds";

export default function AddToCartToast() {
  const { toast, dismissToast, setIsCartOpen, totalCount, formatPrice, currency } = useCart();

  if (!toast) return null;

  return (
    <AnimatePresence>
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 pointer-events-none">
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.92 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ type: "spring", stiffness: 400, damping: 28 }}
          className="pointer-events-auto flex items-center gap-3.5 pl-3 pr-4 py-2.5 rounded-2xl bg-[#0a0a0a]/95 text-white backdrop-blur-xl border border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.45)] select-none"
        >
          {/* Thumbnail */}
          <div className="w-10 h-10 rounded-xl overflow-hidden bg-white/10 shrink-0 border border-white/15">
            <img
              src={toast.item.image}
              alt={toast.item.title}
              className="w-full h-full object-cover object-top"
            />
          </div>

          <div className="leading-tight">
            <div className="flex items-center gap-1.5 text-[11px] text-emerald-400 font-mono font-semibold">
              <CheckCircle2 size={13} />
              <span>Added to Bag</span>
            </div>
            <div className="text-xs font-bold text-white max-w-[180px] sm:max-w-[240px] truncate">
              {toast.item.title}
            </div>
          </div>

          {/* Action to open cart */}
          <button
            type="button"
            onClick={() => {
              soundFX.playOpenChime();
              dismissToast();
              setIsCartOpen(true);
            }}
            data-cursor-hover
            className="ml-1 inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-red hover:bg-red-dark text-white text-xs font-bold transition-all shadow-xs shrink-0"
          >
            <span>View Bag ({totalCount})</span>
            <ArrowRight size={13} />
          </button>

          {/* Dismiss */}
          <button
            type="button"
            onClick={dismissToast}
            className="text-white/40 hover:text-white transition-colors p-1"
          >
            <X size={14} />
          </button>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
