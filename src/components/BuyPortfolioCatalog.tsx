"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
  ExternalLink,
  ShoppingBag,
  Sparkles,
  Check,
  X,
  MessageCircle,
  Send,
  Loader2,
  CheckCircle2,
  ArrowRight,
  Code2,
  Layout,
  Crown,
  Plus,
} from "lucide-react";
import { STORE_CATEGORIES, STORE_ITEMS, StoreCategory, StoreItem } from "@/data/store-items";
import { useCart } from "./CartContext";

type CatalogProps = {
  searchQuery: string;
  currency: "USD" | "INR";
};

export default function BuyPortfolioCatalog({ searchQuery, currency }: CatalogProps) {
  const { addToCart, setIsCheckoutOpen } = useCart();
  const [activeCategory, setActiveCategory] = useState<StoreCategory>("all");
  const [selectedItem, setSelectedItem] = useState<StoreItem | null>(null);

  // Modal Form States
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const filteredItems = useMemo(() => {
    return STORE_ITEMS.filter((item) => {
      const matchesCategory =
        activeCategory === "all" || item.category === activeCategory;
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        item.title.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query) ||
        item.tagline.toLowerCase().includes(query) ||
        item.categoryLabel.toLowerCase().includes(query) ||
        item.techStack.some((t) => t.toLowerCase().includes(query));

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  const handleOpenModal = (item: StoreItem) => {
    setSelectedItem(item);
    setSubmitted(false);
    setError("");
  };

  const handleCloseModal = () => {
    setSelectedItem(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedItem) return;
    setLoading(true);
    setError("");

    try {
      const priceText = currency === "USD" ? selectedItem.priceUsd : selectedItem.priceInr;
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          company: phone ? `Phone/WhatsApp: ${phone}` : "Store Purchase Inquiry",
          budget: `${priceText} (${currency})`,
          service: `Digital Store: ${selectedItem.title}`,
          message: `Product Requested: ${selectedItem.title} (${priceText} ${currency})\nCategory: ${selectedItem.categoryLabel}\n\nNotes / Requirements:\n${notes || "Standard digital license and delivery requested."}\n\nClient Contact: ${phone || "Email only"}`,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to submit inquiry. Please try again or chat via WhatsApp.");
      }

      setSubmitted(true);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const getWhatsAppUrl = (itemTitle: string, priceStr: string) => {
    const text = encodeURIComponent(
      `Hi Vikash! I want to buy "${itemTitle}" (${priceStr}). Can you share the payment link and access details?`
    );
    return `https://wa.me/918000165311?text=${text}`;
  };

  return (
    <section id="catalog" className="relative bg-[#faf8f5] py-16 sm:py-24 px-4 sm:px-6 md:px-12">
      <div className="max-w-[1360px] mx-auto">
        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 sm:gap-2.5 overflow-x-auto pb-4 mb-10 no-scrollbar justify-start sm:justify-center">
          {STORE_CATEGORIES.map((cat) => {
            const count =
              cat.key === "all"
                ? STORE_ITEMS.length
                : STORE_ITEMS.filter((i) => i.category === cat.key).length;
            const isActive = activeCategory === cat.key;

            return (
              <button
                key={cat.key}
                type="button"
                onClick={() => setActiveCategory(cat.key)}
                data-cursor-hover
                className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-semibold tracking-wide whitespace-nowrap transition-all flex items-center gap-2 shadow-2xs ${
                  isActive
                    ? "bg-[#0a0a0a] text-white shadow-sm"
                    : "bg-white hover:bg-black/[0.04] text-black/70 border border-black/[0.06]"
                }`}
              >
                <span>{cat.label}</span>
                <span
                  className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full ${
                    isActive ? "bg-white/20 text-white" : "bg-black/[0.06] text-black/50"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Product Cards Grid */}
        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredItems.map((item) => {
              const priceDisplay = currency === "USD" ? item.priceUsd : item.priceInr;

              return (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="group rounded-3xl bg-white border border-black/[0.08] hover:border-black/20 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden"
                >
                  <div>
                    {/* Image Preview Container */}
                    <div className="relative aspect-[16/10] w-full overflow-hidden bg-black/[0.03] border-b border-black/[0.06]">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                        loading="lazy"
                      />

                      {/* Top Floating Badges */}
                      <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between pointer-events-none">
                        <span className="text-[11px] font-mono font-semibold uppercase tracking-wider px-3 py-1 rounded-full bg-white/95 text-black shadow-sm backdrop-blur-md">
                          {item.categoryLabel}
                        </span>
                        {item.popular && (
                          <span className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-red text-white shadow-sm">
                            <Crown size={12} />
                            Featured
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Card Content */}
                    <div className="p-6 sm:p-7">
                      <div className="flex items-baseline justify-between gap-3 mb-2">
                        <h3 className="font-display text-xl sm:text-2xl font-bold text-[#0a0a0a] group-hover:text-red transition-colors">
                          {item.title}
                        </h3>
                      </div>

                      <p className="text-black/65 text-xs sm:text-sm leading-relaxed mb-5">
                        {item.tagline}
                      </p>

                      {/* Tech Stack Pills */}
                      <div className="flex flex-wrap gap-1.5 mb-6">
                        {item.techStack.map((tech) => (
                          <span
                            key={tech}
                            className="text-[11px] font-mono px-2.5 py-0.5 rounded-md bg-black/[0.04] text-black/75 border border-black/[0.04]"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      {/* Deliverables checklist */}
                      <ul className="space-y-2 mb-6 pt-4 border-t border-black/[0.06]">
                        {item.features.slice(0, 3).map((feat, i) => (
                          <li
                            key={i}
                            className="flex items-center gap-2 text-xs text-black/70"
                          >
                            <Check size={13} className="text-red shrink-0" strokeWidth={2.5} />
                            <span className="truncate">{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Card Footer Actions */}
                  <div className="p-6 sm:p-7 pt-0 border-t border-black/[0.04] mt-2">
                    <div className="flex items-center justify-between gap-3 pt-4">
                      <div>
                        <span className="text-[11px] font-mono text-black/45 uppercase tracking-wider block">
                          One-time purchase
                        </span>
                        <span className="font-display text-2xl sm:text-3xl font-black text-[#0a0a0a]">
                          {priceDisplay}
                        </span>
                      </div>

                      <div className="flex items-center gap-1.5 sm:gap-2">
                        {item.liveDemoUrl && (
                          <a
                            href={item.liveDemoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            data-cursor-hover
                            className="p-2.5 rounded-xl bg-black/[0.04] hover:bg-black/[0.08] text-black/70 hover:text-black transition-colors"
                            title="Live Demo Preview"
                          >
                            <ExternalLink size={15} />
                          </a>
                        )}

                        <button
                          type="button"
                          onClick={() => addToCart(item)}
                          data-cursor-hover
                          className="inline-flex items-center gap-1 px-3 py-2 sm:px-3.5 sm:py-2.5 rounded-xl bg-black/[0.05] hover:bg-black/[0.1] text-black text-xs font-semibold tracking-wide transition-all"
                          title="Add to Cart"
                        >
                          <Plus size={14} />
                          <span className="hidden sm:inline">Add to Cart</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            addToCart(item);
                            setIsCheckoutOpen(true);
                          }}
                          data-cursor-hover
                          className="inline-flex items-center gap-1.5 px-4 py-2 sm:px-4.5 sm:py-2.5 rounded-xl bg-[#0a0a0a] hover:bg-red text-white text-xs font-bold tracking-wide transition-all shadow-sm"
                        >
                          <ShoppingBag size={13} />
                          <span>Buy Now</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        ) : (
          <div className="py-20 text-center bg-white rounded-3xl border border-black/[0.08] p-8 max-w-md mx-auto">
            <ShoppingBag size={40} className="text-black/20 mx-auto mb-3" />
            <h4 className="font-display text-xl font-bold text-black/80">No items found</h4>
            <p className="text-sm text-black/50 mt-1 mb-5">
              No digital products match &ldquo;{searchQuery}&rdquo; in this category.
            </p>
            <button
              type="button"
              onClick={() => setActiveCategory("all")}
              className="px-5 py-2 rounded-full bg-black text-white text-xs font-semibold"
            >
              View All Items
            </button>
          </div>
        )}

        {/* ========================================================= */}
        {/* CUSTOM REQUEST BANNER (For Bespoke Work)                  */}
        {/* ========================================================= */}
        <div className="mt-16 sm:mt-24 p-8 sm:p-12 rounded-3xl bg-white border border-black/[0.08] shadow-sm flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-2xl text-center md:text-left">
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-red mb-2">
              <Sparkles size={14} />
              <span>Bespoke Engineering</span>
            </div>
            <h3 className="font-display text-2xl sm:text-4xl font-bold text-[#0a0a0a]">
              Want a unique 1-of-1 portfolio or custom design?
            </h3>
            <p className="text-black/60 text-sm sm:text-base mt-2">
              If you have a custom vision, brand guidelines, or require a bespoke 3D interactive web app built from scratch, Vikash takes select private client commissions.
            </p>
          </div>

          <a
            href="/contact"
            data-cursor-hover
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-red hover:bg-red-dark text-white font-semibold text-sm tracking-wide uppercase shadow-md transition-all hover:scale-105 shrink-0"
          >
            <span>Commission Custom Build</span>
            <ArrowRight size={16} />
          </a>
        </div>
      </div>

      {/* ========================================================= */}
      {/* PURCHASE / INQUIRY MODAL                                  */}
      {/* ========================================================= */}
      <AnimatePresence>
        {selectedItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleCloseModal}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            />

            {/* Modal Dialog */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.2 }}
              className="relative w-full max-w-lg rounded-3xl p-6 sm:p-8 bg-white border border-black/[0.1] shadow-2xl text-[#0a0a0a] z-10 my-8"
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={handleCloseModal}
                className="absolute top-5 right-5 w-8 h-8 rounded-full bg-black/[0.05] hover:bg-black/[0.1] flex items-center justify-center text-black/70 hover:text-black transition-colors"
              >
                <X size={16} />
              </button>

              {!submitted ? (
                <>
                  <div className="mb-6">
                    <span className="text-[11px] font-mono uppercase tracking-widest text-red px-2.5 py-0.5 rounded-md bg-red/10 border border-red/20 font-semibold">
                      {selectedItem.categoryLabel}
                    </span>
                    <h3 className="font-display text-2xl sm:text-3xl font-bold mt-2">
                      {selectedItem.title}
                    </h3>
                    <div className="flex items-baseline gap-2 mt-1">
                      <span className="text-2xl font-black text-[#0a0a0a]">
                        {currency === "USD" ? selectedItem.priceUsd : selectedItem.priceInr}
                      </span>
                      <span className="text-xs font-mono text-black/50">
                        / One-time license ({currency})
                      </span>
                    </div>
                  </div>

                  {error && (
                    <div className="mb-4 p-3 rounded-xl bg-red/10 border border-red/30 text-red text-xs">
                      {error}
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-black/60 mb-1.5">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Alex Hunter"
                        className="w-full px-4 py-2.5 rounded-xl bg-black/[0.03] border border-black/[0.1] focus:border-red outline-none text-sm text-[#0a0a0a] placeholder:text-black/30 transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-black/60 mb-1.5">
                        Email Address (for code / delivery) *
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="alex@example.com"
                        className="w-full px-4 py-2.5 rounded-xl bg-black/[0.03] border border-black/[0.1] focus:border-red outline-none text-sm text-[#0a0a0a] placeholder:text-black/30 transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-black/60 mb-1.5">
                        WhatsApp / Phone (Optional for instant support)
                      </label>
                      <input
                        type="text"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+91 98765 43210 or +1 (555) 000-0000"
                        className="w-full px-4 py-2.5 rounded-xl bg-black/[0.03] border border-black/[0.1] focus:border-red outline-none text-sm text-[#0a0a0a] placeholder:text-black/30 transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-black/60 mb-1.5">
                        Project / Customization Notes
                      </label>
                      <textarea
                        rows={2}
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder="Any questions, custom domain preferences, or setup assistance needed?"
                        className="w-full px-4 py-2.5 rounded-xl bg-black/[0.03] border border-black/[0.1] focus:border-red outline-none text-sm text-[#0a0a0a] placeholder:text-black/30 transition-colors resize-none"
                      />
                    </div>

                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3.5 rounded-xl bg-red hover:bg-red-dark text-white font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm disabled:opacity-60 transition-all"
                      >
                        {loading ? (
                          <>
                            <Loader2 size={16} className="animate-spin" />
                            <span>Processing Request...</span>
                          </>
                        ) : (
                          <>
                            <span>Submit Purchase Request</span>
                            <Send size={14} />
                          </>
                        )}
                      </button>
                    </div>

                    <div className="text-center pt-2">
                      <span className="text-black/40 text-xs">or prefer instant checkout via chat?</span>
                      <a
                        href={getWhatsAppUrl(
                          selectedItem.title,
                          currency === "USD" ? selectedItem.priceUsd : selectedItem.priceInr
                        )}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-1.5 flex items-center justify-center gap-2 text-xs font-semibold text-emerald-700 hover:text-emerald-800"
                      >
                        <MessageCircle size={15} />
                        <span>Chat directly with Vikash on WhatsApp</span>
                      </a>
                    </div>
                  </form>
                </>
              ) : (
                /* Success State */
                <div className="text-center py-6">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4 border border-emerald-200">
                    <CheckCircle2 size={32} />
                  </div>
                  <h3 className="font-display text-2xl font-bold mb-2">
                    Request Received!
                  </h3>
                  <p className="text-black/65 text-sm max-w-sm mx-auto mb-6">
                    Thank you {name}. We received your order inquiry for{" "}
                    <span className="text-black font-semibold">{selectedItem.title}</span>.
                    Vikash will send invoice &amp; repository access details to{" "}
                    <span className="font-semibold text-black">{email}</span> within a few hours.
                  </p>
                  <div className="flex flex-col gap-2">
                    <a
                      href={getWhatsAppUrl(
                        selectedItem.title,
                        currency === "USD" ? selectedItem.priceUsd : selectedItem.priceInr
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors shadow-sm"
                    >
                      <MessageCircle size={16} />
                      <span>Instant Confirmation via WhatsApp</span>
                    </a>
                    <button
                      type="button"
                      onClick={handleCloseModal}
                      className="w-full py-2 text-xs text-black/50 hover:text-black"
                    >
                      Close Window
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
