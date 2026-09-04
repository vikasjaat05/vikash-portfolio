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
  Check,
  ChevronDown,
  MessageCircle,
  Sparkles
} from "lucide-react";
import { useCart, ALL_CURRENCIES } from "./CartContext";
import { soundFX } from "@/lib/ui-sounds";

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
    removeDiscount,
    totalCount,
    formattedSubtotal,
    formattedTotal,
    formatPrice,
    t,
  } = useCart();

  const [promoInput, setPromoInput] = useState("");
  const [promoMsg, setPromoMsg] = useState<{ text: string; success: boolean } | null>(null);
  const [currencyDropdownOpen, setCurrencyDropdownOpen] = useState(false);

  const handleApplyPromoCode = (code: string) => {
    const res = applyDiscount(code);
    if (res.success) {
      soundFX.playPurchaseChime();
      setPromoMsg({ text: `Code ${code} applied successfully! 🎉`, success: true });
      setPromoInput("");
    } else {
      setPromoMsg({ text: res.error || "Invalid code. Try LAUNCH20 or VIKASH10", success: false });
    }
  };

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoInput) return;
    handleApplyPromoCode(promoInput);
  };

  const handleProceedToCheckout = () => {
    soundFX.playOpenChime();
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const activeCurrency = ALL_CURRENCIES.find((c) => c.code === currency) || ALL_CURRENCIES[0];

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
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-red/10 text-red flex items-center justify-center">
                    <ShoppingBag size={18} />
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-bold text-[#0a0a0a]">
                      {t("yourCart")}
                    </h3>
                    <span className="text-xs font-mono text-black/50">
                      {totalCount} {totalCount === 1 ? "item" : "items"} selected
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {/* Currency Selector Dropdown */}
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => setCurrencyDropdownOpen((prev) => !prev)}
                      className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/[0.04] hover:bg-black/[0.08] border border-black/[0.08] text-[11px] font-mono font-bold text-black/80 transition-colors"
                    >
                      <span>{activeCurrency.flag}</span>
                      <span>{activeCurrency.code}</span>
                      <ChevronDown size={11} className="text-black/50" />
                    </button>

                    {currencyDropdownOpen && (
                      <div className="absolute top-full right-0 mt-1.5 w-40 rounded-xl bg-[#0a0a0a] text-white p-1 shadow-2xl z-50 border border-white/10 font-mono text-xs max-h-48 overflow-y-auto">
                        {ALL_CURRENCIES.map((c) => (
                          <button
                            key={c.code}
                            type="button"
                            onClick={() => {
                              setCurrency(c.code);
                              setCurrencyDropdownOpen(false);
                            }}
                            className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-left transition-colors ${
                              currency === c.code ? "bg-white/20 font-bold text-white" : "hover:bg-white/10 text-white/70"
                            }`}
                          >
                            <span className="flex items-center gap-1.5">
                              <span>{c.flag}</span>
                              <span>{c.code}</span>
                            </span>
                            <span className="text-[10px] text-white/50">{c.symbol}</span>
                          </button>
                        ))}
                      </div>
                    )}
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
                            {formatPrice(item.priceUsd)}
                          </span>

                          {/* Quantity Controls */}
                          <div className="flex items-center gap-1 bg-white px-1.5 py-0.5 rounded-lg border border-black/[0.08]">
                            <button
                              type="button"
                              onClick={() => {
                                if (quantity > 1) {
                                  removeFromCart(item.id);
                                  for (let i = 0; i < quantity - 1; i++) addToCart(item);
                                } else {
                                  removeFromCart(item.id);
                                }
                              }}
                              className="text-black/40 hover:text-black p-0.5"
                            >
                              <Minus size={11} />
                            </button>
                            <span className="text-xs font-mono font-bold px-1 min-w-[16px] text-center">
                              {quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() => addToCart(item)}
                              className="text-black/40 hover:text-black p-0.5"
                            >
                              <Plus size={11} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="py-16 text-center">
                    <div className="w-16 h-16 rounded-full bg-black/[0.04] flex items-center justify-center mx-auto mb-3 text-black/30">
                      <ShoppingBag size={28} />
                    </div>
                    <h4 className="font-display text-base font-bold text-black/80">{t("cartEmpty")}</h4>
                    <p className="text-xs text-black/50 mt-1 mb-5">
                      Explore themes, Figma designs, and Shopify storefronts below.
                    </p>
                    <button
                      type="button"
                      onClick={() => setIsCartOpen(false)}
                      className="px-5 py-2 rounded-full bg-[#0a0a0a] text-white text-xs font-semibold"
                    >
                      {t("browseStore")}
                    </button>
                  </div>
                )}

                {/* Promo Code Section */}
                {items.length > 0 && (
                  <div className="pt-3 border-t border-black/[0.06] space-y-2">
                    {discountCode ? (
                      <div className="flex items-center justify-between p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs">
                        <div className="flex items-center gap-2">
                          <Tag size={14} className="text-emerald-600" />
                          <span className="font-mono font-bold uppercase">{discountCode}</span>
                          <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                            -{discountPercent}% OFF applied
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            removeDiscount();
                            setPromoMsg(null);
                          }}
                          className="p-1 text-emerald-600 hover:text-red transition-colors cursor-pointer"
                          title="Remove Coupon"
                        >
                          <X size={14} />
                        </button>
                      </div>
                    ) : (
                      <>
                        <form onSubmit={handleApplyPromo} className="flex gap-2">
                          <div className="relative flex-1">
                            <Tag size={13} className="absolute left-3 top-3 text-black/40" />
                            <input
                              type="text"
                              value={promoInput}
                              onChange={(e) => setPromoInput(e.target.value)}
                              placeholder="Promo code (e.g. LAUNCH20)"
                              className="w-full pl-8 pr-3 py-2 rounded-xl bg-black/[0.03] border border-black/[0.08] focus:border-red text-xs outline-none uppercase font-mono"
                            />
                          </div>
                          <button
                            type="submit"
                            className="px-4 py-2 rounded-xl bg-black/[0.06] hover:bg-black hover:text-white text-xs font-semibold transition-colors cursor-pointer"
                          >
                            Apply
                          </button>
                        </form>

                        {/* Quick-Click Coupon Suggestion Pills */}
                        <div className="flex items-center gap-1.5 flex-wrap text-[10px] font-mono text-black/50 pt-0.5">
                          <span>Coupons:</span>
                          <button
                            type="button"
                            onClick={() => handleApplyPromoCode("LAUNCH20")}
                            className="px-2 py-0.5 rounded-md bg-red/10 text-red font-bold hover:bg-red hover:text-white transition-colors cursor-pointer"
                          >
                            LAUNCH20 (-20%)
                          </button>
                          <button
                            type="button"
                            onClick={() => handleApplyPromoCode("VIKASH10")}
                            className="px-2 py-0.5 rounded-md bg-black/[0.05] text-black/70 font-bold hover:bg-black hover:text-white transition-colors cursor-pointer"
                          >
                            VIKASH10 (-10%)
                          </button>
                        </div>

                        {/* Offer Threshold Notice */}
                        <div className="flex items-center gap-1.5 text-[10px] font-mono text-amber-800 bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200/60 mt-1">
                          <Sparkles size={11} className="text-amber-600 shrink-0" />
                          <span>Special offers apply only on orders above ₹5,999 ($72)</span>
                        </div>
                      </>
                    )}

                    {promoMsg && (
                      <p
                        className={`text-[11px] pl-1 font-medium ${
                          promoMsg.success ? "text-emerald-600" : "text-red"
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
                      <span>{t("subtotal")}</span>
                      <span className="font-mono font-semibold">
                        {formattedSubtotal}
                      </span>
                    </div>

                    {discountPercent > 0 && (
                      <div className="flex justify-between text-emerald-600 font-semibold">
                        <span>{t("discount")} ({discountCode} - {discountPercent}%)</span>
                        <span className="font-mono">
                          -{discountPercent}%
                        </span>
                      </div>
                    )}

                    <div className="flex justify-between text-base font-bold text-[#0a0a0a] pt-2 border-t border-black/[0.06]">
                      <span>{t("totalDue")}</span>
                      <span className="font-display font-black text-xl text-red">
                        {formattedTotal}
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleProceedToCheckout}
                    data-cursor-hover
                    className="w-full py-3.5 px-6 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_8px_20px_rgba(16,185,129,0.35)] hover:scale-[1.01] active:scale-[0.99] transition-all cursor-pointer"
                  >
                    <MessageCircle size={16} />
                    <span>{t("proceedCheckout")}</span>
                    <ArrowRight size={15} />
                  </button>

                  <div className="flex items-center justify-center gap-4 text-[11px] text-black/50 font-mono">
                    <span className="flex items-center gap-1">
                      <ShieldCheck size={13} className="text-emerald-600" />
                      {t("officialCert")}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Zap size={13} className="text-amber-500" />
                      {t("instantDelivery")}
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
