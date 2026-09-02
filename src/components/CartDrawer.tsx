"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  ArrowRight, 
  ShieldCheck, 
  Tag, 
  Zap, 
  Check 
} from "lucide-react";
import { useCart } from "./CartContext";

export default function CartDrawer() {
  const {
    items,
    removeFromCart,
    addToCart,
    isCartOpen,
    setIsCartOpen,
    setIsCheckoutOpen,
    currency,
    setCurrency,
    discountCode,
    discountPercent,
    applyDiscount,
    totalCount,
    totalPriceUsd,
    totalPriceInr,
    finalPriceUsd,
    finalPriceInr,
  } = useCart();

  const [promoInput, setPromoInput] = useState("");
  const [promoMsg, setPromoMsg] = useState<{ text: string; success: boolean } | null>(null);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoInput) return;
    const ok = applyDiscount(promoInput);
    if (ok) {
      setPromoMsg({ text: "Promo code applied successfully! 🎉", success: true });
    } else {
      setPromoMsg({ text: "Invalid code. Try VIKASH10 or SPECIAL20", success: false });
    }
  };

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden select-none">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
          />

          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 300 }}
              className="w-screen max-w-md bg-white border-l border-black/[0.08] shadow-2xl flex flex-col justify-between"
            >
              {/* Drawer Header */}
              <div className="px-6 py-5 border-b border-black/[0.06] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-9 h-9 rounded-xl bg-red/10 text-red flex items-center justify-center">
                    <ShoppingBag size={18} />
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-bold text-[#0a0a0a]">
                      Your Cart
                    </h3>
                    <span className="text-xs font-mono text-black/50">
                      {totalCount} {totalCount === 1 ? "item" : "items"} selected
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {/* Currency Toggle */}
                  <div className="flex items-center p-0.5 rounded-full bg-black/[0.04] border border-black/[0.06]">
                    <button
                      type="button"
                      onClick={() => setCurrency("USD")}
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-semibold ${
                        currency === "USD" ? "bg-white text-black shadow-xs" : "text-black/50"
                      }`}
                    >
                      $ USD
                    </button>
                    <button
                      type="button"
                      onClick={() => setCurrency("INR")}
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-semibold ${
                        currency === "INR" ? "bg-red text-white shadow-xs" : "text-black/50"
                      }`}
                    >
                      ₹ INR
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() => setIsCartOpen(false)}
                    className="w-8 h-8 rounded-full bg-black/[0.04] hover:bg-black/[0.08] flex items-center justify-center text-black/60 hover:text-black transition-colors"
                  >
                    <X size={16} />
                  </button>
                </div>
              </div>

              {/* Drawer Scrollable Items */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {items.length > 0 ? (
                  items.map(({ item, quantity }) => (
                    <div
                      key={item.id}
                      className="p-3.5 rounded-2xl border border-black/[0.06] bg-[#faf8f5] flex items-center gap-3.5"
                    >
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-16 h-16 rounded-xl object-cover border border-black/[0.06] shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-1">
                          <h4 className="font-display text-sm font-bold text-[#0a0a0a] truncate">
                            {item.title}
                          </h4>
                          <button
                            type="button"
                            onClick={() => removeFromCart(item.id)}
                            className="text-black/40 hover:text-red transition-colors p-1"
                            title="Remove"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                        <span className="text-[10px] font-mono text-black/50 uppercase block">
                          {item.categoryLabel}
                        </span>
                        <div className="flex items-center justify-between mt-2">
                          <span className="font-display font-extrabold text-sm text-[#0a0a0a]">
                            {currency === "USD" ? item.priceUsd : item.priceInr}
                          </span>
                          <span className="text-[10px] font-mono bg-white px-2 py-0.5 rounded border border-black/[0.06] text-black/70">
                            Qty: {quantity}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="py-16 text-center">
                    <div className="w-16 h-16 rounded-full bg-black/[0.04] flex items-center justify-center mx-auto mb-3 text-black/30">
                      <ShoppingBag size={28} />
                    </div>
                    <h4 className="font-display text-base font-bold text-black/80">Your cart is empty</h4>
                    <p className="text-xs text-black/50 mt-1 mb-5">
                      Explore themes, Figma designs, and Shopify storefronts below.
                    </p>
                    <button
                      type="button"
                      onClick={() => setIsCartOpen(false)}
                      className="px-5 py-2 rounded-full bg-[#0a0a0a] text-white text-xs font-semibold"
                    >
                      Browse Digital Store
                    </button>
                  </div>
                )}

                {/* Promo Code Accordion */}
                {items.length > 0 && (
                  <div className="pt-2">
                    <form onSubmit={handleApplyPromo} className="flex gap-2">
                      <div className="relative flex-1">
                        <Tag size={13} className="absolute left-3 top-3 text-black/40" />
                        <input
                          type="text"
                          value={promoInput}
                          onChange={(e) => setPromoInput(e.target.value)}
                          placeholder="Promo code (e.g. VIKASH10)"
                          className="w-full pl-8 pr-3 py-2 rounded-xl bg-black/[0.03] border border-black/[0.08] focus:border-red text-xs outline-none uppercase font-mono"
                        />
                      </div>
                      <button
                        type="submit"
                        className="px-4 py-2 rounded-xl bg-black/[0.06] hover:bg-black hover:text-white text-xs font-semibold transition-colors"
                      >
                        Apply
                      </button>
                    </form>
                    {promoMsg && (
                      <p
                        className={`text-[11px] mt-1.5 pl-1 ${
                          promoMsg.success ? "text-emerald-600 font-semibold" : "text-red"
                        }`}
                      >
                        {promoMsg.text}
                      </p>
                    )}
                  </div>
                )}
              </div>

              {/* Drawer Footer & Checkout Action */}
              {items.length > 0 && (
                <div className="p-6 border-t border-black/[0.06] bg-white space-y-4">
                  <div className="space-y-1.5 text-xs text-black/70">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span className="font-mono font-semibold">
                        {currency === "USD" ? `$${totalPriceUsd}` : `₹${totalPriceInr.toLocaleString()}`}
                      </span>
                    </div>

                    {discountPercent > 0 && (
                      <div className="flex justify-between text-emerald-600 font-semibold">
                        <span>Discount ({discountCode} - {discountPercent}%)</span>
                        <span className="font-mono">
                          -{currency === "USD" ? `$${totalPriceUsd - finalPriceUsd}` : `₹${(totalPriceInr - finalPriceInr).toLocaleString()}`}
                        </span>
                      </div>
                    )}

                    <div className="flex justify-between text-base font-bold text-[#0a0a0a] pt-2 border-t border-black/[0.06]">
                      <span>Total Due</span>
                      <span className="font-display font-black text-xl text-red">
                        {currency === "USD" ? `$${finalPriceUsd}` : `₹${finalPriceInr.toLocaleString()}`}
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleProceedToCheckout}
                    data-cursor-hover
                    className="w-full py-3.5 px-6 rounded-2xl bg-red hover:bg-red-dark text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_8px_20px_rgba(225,6,0,0.35)] hover:scale-[1.01] active:scale-[0.99] transition-all"
                  >
                    <span>Proceed to Checkout</span>
                    <ArrowRight size={15} />
                  </button>

                  <div className="flex items-center justify-center gap-4 text-[11px] text-black/50 font-mono">
                    <span className="flex items-center gap-1">
                      <ShieldCheck size={13} className="text-emerald-600" />
                      Official Certificate
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Zap size={13} className="text-amber-500" />
                      Instant Delivery
                    </span>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
