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
  Flame,
  Star,
  Eye,
  ShieldCheck,
  Zap,
  Search,
  ChevronDown,
  Gauge,
  Cpu
} from "lucide-react";
import { STORE_CATEGORIES, STORE_ITEMS, StoreCategory, StoreItem } from "@/data/store-items";
import { useCart } from "./CartContext";
import { soundFX } from "@/lib/ui-sounds";
import DualDevicePreviewModal from "./DualDevicePreviewModal";

type CatalogProps = {
  searchQuery: string;
};

export default function BuyPortfolioCatalog({ searchQuery }: CatalogProps) {
  const { 
    addToCart, 
    setIsCartOpen, 
    setIsCheckoutOpen, 
    totalCount, 
    formatPrice, 
    formatAmount, 
    finalPriceInCurrency, 
    formattedTotal,
    t 
  } = useCart();
  const [activeCategory, setActiveCategory] = useState<StoreCategory>("all");
  const [previewItem, setPreviewItem] = useState<StoreItem | null>(null);
  const [previewTab, setPreviewTab] = useState<"overview" | "specs" | "audit">("overview");
  const [addedItemIds, setAddedItemIds] = useState<Record<string, boolean>>({});
  const [internalSearch, setInternalSearch] = useState("");
  const [sortBy, setSortBy] = useState<"featured" | "price-asc" | "price-desc">("featured");

  const parseNum = (priceStr: string) => {
    const num = parseFloat(priceStr.replace(/[^0-9.]/g, ""));
    return isNaN(num) ? 0 : num;
  };

  const isItemInCat = (item: StoreItem, catKey: StoreCategory) => {
    if (catKey === "all") return true;
    if (catKey === "theme") return item.category === "theme" || item.category === "marketing";
    if (catKey === "marketing") return item.category === "marketing" || item.categoryLabel.toLowerCase().includes("marketing");
    return item.category === catKey;
  };

  // Filter items by category, search query & sort
  const filteredItems = useMemo(() => {
    const q = (internalSearch || searchQuery).trim().toLowerCase();
    let result = STORE_ITEMS.filter((item) => {
      const matchCat = isItemInCat(item, activeCategory);
      const matchSearch =
        !q ||
        item.title.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.categoryLabel.toLowerCase().includes(q) ||
        item.techStack.some((t) => t.toLowerCase().includes(q));
      return matchCat && matchSearch;
    });

    if (sortBy === "price-asc") {
      result = [...result].sort((a, b) => parseNum(a.priceUsd) - parseNum(b.priceUsd));
    } else if (sortBy === "price-desc") {
      result = [...result].sort((a, b) => parseNum(b.priceUsd) - parseNum(a.priceUsd));
    }

    return result;
  }, [activeCategory, internalSearch, searchQuery, sortBy]);

  const handleAddToCart = (item: StoreItem, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    soundFX.playCartChime();
    addToCart(item);

    // Trigger local feedback animation
    setAddedItemIds((prev) => ({ ...prev, [item.id]: true }));
    setTimeout(() => {
      setAddedItemIds((prev) => ({ ...prev, [item.id]: false }));
    }, 1800);
  };

  const handleBuyNow = (item: StoreItem, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    soundFX.playCartChime();
    addToCart(item);
    setIsCheckoutOpen(true);
  };

  return (
    <section id="catalog" className="relative bg-[#ffffff] py-20 sm:py-28 px-4 sm:px-6 md:px-12 border-t border-black/[0.06]">
      <div className="max-w-[1360px] mx-auto">
        
        {/* Editorial Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-18">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red/10 text-red text-xs font-mono font-bold uppercase tracking-wider mb-4">
            <Sparkles size={13} />
            <span>Production-Grade Codebases &amp; Architecture</span>
          </div>

          <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl font-extrabold text-[#0a0a0a] tracking-tight leading-[1.12]">
            Curated Themes, UI Kits &amp;{" "}
            <span className="font-serif italic text-red" style={{ fontFamily: "'Instrument Serif', serif" }}>
              Storefronts.
            </span>
          </h2>

          <p className="text-sm sm:text-base text-black/60 mt-4 leading-relaxed max-w-2xl mx-auto">
            Acquire battle-tested source code with 100% commercial freedom. Instant GitHub repo invite, signed license certificate, and personal developer setup by Vikash.
          </p>

          {/* Social Proof Trust Bar */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 mt-6 pt-6 border-t border-black/[0.06] text-xs font-mono text-black/60">
            <span className="flex items-center gap-1.5">
              <Star size={13} className="text-amber-500 fill-amber-500" />
              <span className="font-bold text-black">4.9/5 Rating</span> (120+ Founders)
            </span>
            <span className="hidden sm:inline text-black/20">•</span>
            <span className="flex items-center gap-1.5">
              <Zap size={13} className="text-red" />
              <span>Instant GitHub &amp; Figma Delivery</span>
            </span>
            <span className="hidden sm:inline text-black/20">•</span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck size={13} className="text-emerald-600" />
              <span>100% Commercial Freedom</span>
            </span>
          </div>
        </div>

        {/* Command Bar: Frosted Capsule */}
        <div className="p-2 sm:p-2.5 rounded-2xl sm:rounded-full bg-black/[0.02] border border-black/[0.08] shadow-2xs mb-12 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
          {/* Category Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto p-1 no-scrollbar">
            {STORE_CATEGORIES.map((cat) => {
              const count = STORE_ITEMS.filter((i) => isItemInCat(i, cat.key)).length;
              const isActive = activeCategory === cat.key;

              return (
                <button
                  key={cat.key}
                  type="button"
                  onClick={() => {
                    soundFX.playOpenChime();
                    setActiveCategory(cat.key);
                  }}
                  data-cursor-hover
                  className={`relative px-4 py-2 rounded-full text-xs font-semibold tracking-wide whitespace-nowrap transition-colors flex items-center gap-2 cursor-pointer ${
                    isActive ? "text-white" : "text-black/70 hover:text-black hover:bg-black/[0.04]"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="catalogCategoryTab"
                      className="absolute inset-0 rounded-full bg-[#0a0a0a] shadow-xs"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{cat.label}</span>
                  <span
                    className={`relative z-10 text-[10px] font-mono px-1.5 py-0.5 rounded-full ${
                      isActive ? "bg-white/20 text-white" : "bg-black/[0.06] text-black/50"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Search & Sort Controls */}
          <div className="flex items-center gap-2 px-1 pb-1 lg:pb-0">
            <div className="relative flex-1 sm:w-64">
              <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-black/40 pointer-events-none" />
              <input
                type="text"
                value={internalSearch}
                onChange={(e) => setInternalSearch(e.target.value)}
                placeholder="Search themes or tech..."
                className="w-full pl-9 pr-8 py-2 rounded-full bg-white border border-black/[0.08] focus:border-black/30 text-xs text-black placeholder:text-black/40 outline-none transition-all shadow-2xs"
              />
              {internalSearch && (
                <button
                  type="button"
                  onClick={() => setInternalSearch("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-black/40 hover:text-black p-0.5 cursor-pointer"
                  title="Clear search"
                >
                  <X size={13} />
                </button>
              )}
            </div>

            <div className="relative shrink-0">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                aria-label="Sort catalog items"
                className="appearance-none pl-3.5 pr-8 py-2 rounded-full bg-white border border-black/[0.08] text-xs font-semibold text-black/80 focus:border-black/30 outline-none cursor-pointer shadow-2xs transition-colors"
              >
                <option value="featured">Sort: Featured</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
              <ChevronDown size={13} className="absolute right-3 top-1/2 -translate-y-1/2 text-black/40 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Product Cards Grid */}
        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredItems.map((item) => {
              const priceDisplay = formatPrice(item.priceUsd, item.priceInr);
              const originalUsdNum = Math.round(parseNum(item.priceUsd) * 1.5);
              const comparePriceDisplay = formatPrice(
                `$${originalUsdNum}`, 
                item.priceInr ? `₹${Math.round(parseNum(item.priceInr) * 1.5).toLocaleString("en-IN")}` : undefined
              );
              const isAdded = !!addedItemIds[item.id];

              return (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.3 }}
                  className="group rounded-[2rem] bg-white border border-black/[0.08] hover:border-black/25 shadow-[0_4px_25px_rgba(0,0,0,0.03)] hover:shadow-[0_28px_65px_rgba(0,0,0,0.09)] transition-all duration-500 flex flex-col justify-between overflow-hidden"
                >
                  <div>
                    {/* Mini Browser Bar */}
                    <div className="flex items-center justify-between px-4 py-2.5 bg-black/[0.02] border-b border-black/[0.06] text-black/40">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-[#ff5f56]" />
                        <span className="w-2 h-2 rounded-full bg-[#ffbd2e]" />
                        <span className="w-2 h-2 rounded-full bg-[#27c93f]" />
                      </div>
                      <div className="px-2.5 py-0.5 rounded-full bg-black/[0.03] text-[9px] font-mono text-black/50 border border-black/[0.04] truncate max-w-[150px]">
                        {item.category === "shopify" ? "storefront.live" : "app.nextjs16.dev"}
                      </div>
                      <div className="flex items-center gap-1 text-[9px] font-mono text-emerald-600 font-semibold">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        <span>v2.4</span>
                      </div>
                    </div>

                    {/* Image Preview Container with Hover Zoom & Badges */}
                    <div className="relative aspect-[16/10] w-full overflow-hidden bg-black/[0.02] border-b border-black/[0.06]">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                        loading="lazy"
                      />

                      {/* Top Floating Badges */}
                      <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between pointer-events-none">
                        <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-white/95 text-black shadow-sm backdrop-blur-md border border-black/[0.06]">
                          {item.categoryLabel}
                        </span>
                        
                        {item.popular && (
                          <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-red text-white shadow-sm">
                            <Flame size={11} className="text-amber-300" />
                            <span>Bestseller</span>
                          </span>
                        )}
                      </div>

                      {/* Single Unified Live Preview Button on Hover */}
                      <div className="absolute inset-0 bg-black/45 backdrop-blur-xs opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-4">
                        <button
                          type="button"
                          onClick={() => {
                            soundFX.playOpenChime();
                            setPreviewItem(item);
                          }}
                          className="px-6 py-3 rounded-2xl bg-white text-[#0a0a0a] text-xs font-bold shadow-2xl flex items-center gap-2 hover:scale-105 active:scale-95 transition-all cursor-pointer border border-white/60 hover:bg-white"
                        >
                          <Eye size={15} className="text-red" />
                          <span>Live Preview</span>
                        </button>
                      </div>
                    </div>

                    {/* Card Body */}
                    <div className="p-6 sm:p-7">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <h3 className="font-display text-xl sm:text-2xl font-extrabold text-[#0a0a0a] group-hover:text-red transition-colors tracking-tight leading-snug">
                          {item.title}
                        </h3>
                      </div>

                      <p className="text-xs sm:text-sm text-black/60 leading-relaxed mb-4 line-clamp-2">
                        {item.description}
                      </p>

                      {/* Tech Tags */}
                      <div className="flex flex-wrap gap-1.5 mb-5">
                        {item.techStack.map((tag) => (
                          <span
                            key={tag}
                            className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-black/[0.04] text-black/75 border border-black/[0.04]"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Deliverables checklist */}
                      <ul className="space-y-2 pt-4 border-t border-black/[0.06]">
                        {item.features.slice(0, 3).map((feat, i) => (
                          <li
                            key={i}
                            className="flex items-center gap-2 text-xs text-black/75"
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
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-mono text-black/40 line-through">
                            {comparePriceDisplay}
                          </span>
                          <span className="text-[9px] font-mono text-emerald-600 font-bold bg-emerald-500/10 px-1.5 py-0.2 rounded">
                            Save 30%
                          </span>
                        </div>
                        <span className="font-display text-2xl sm:text-3xl font-black text-[#0a0a0a]">
                          {priceDisplay}
                        </span>
                      </div>

                      <div className="flex items-center gap-1.5 sm:gap-2">
                        <button
                          type="button"
                          onClick={(e) => handleAddToCart(item, e)}
                          data-cursor-hover
                          className={`inline-flex items-center gap-1 px-3 py-2.5 sm:px-3.5 sm:py-2.5 rounded-xl text-xs font-semibold tracking-wide transition-all shadow-2xs cursor-pointer ${
                            isAdded
                              ? "bg-emerald-600 text-white"
                              : "bg-black/[0.05] hover:bg-black/[0.1] text-black"
                          }`}
                          title="Add to Cart"
                        >
                          {isAdded ? (
                            <>
                              <Check size={14} />
                              <span className="hidden sm:inline">Added!</span>
                            </>
                          ) : (
                            <>
                              <Plus size={14} />
                              <span className="hidden sm:inline">Add</span>
                            </>
                          )}
                        </button>

                        <button
                          type="button"
                          onClick={(e) => handleBuyNow(item, e)}
                          data-cursor-hover
                          className="inline-flex items-center gap-1.5 px-4 py-2.5 sm:px-4.5 sm:py-2.5 rounded-xl bg-[#0a0a0a] hover:bg-red text-white text-xs font-bold tracking-wide transition-all shadow-sm active:scale-95 cursor-pointer"
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

            {/* VIP Bespoke Card: Full-Width Across Grid */}
            <motion.div
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.3 }}
              className="group relative col-span-1 md:col-span-2 lg:col-span-3 rounded-3xl bg-gradient-to-br from-[#0c121e] via-[#111827] to-[#1a1740] border border-red/30 hover:border-red shadow-md hover:shadow-[0_20px_50px_rgba(225,6,0,0.25)] transition-all duration-300 overflow-hidden text-white p-7 sm:p-9 lg:p-10"
            >
              {/* Glowing Ambient Mesh */}
              <div className="absolute -top-12 -right-12 w-64 h-64 bg-red/20 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute -bottom-12 -left-12 w-64 h-64 bg-[#3b82f6]/15 rounded-full blur-3xl pointer-events-none" />

              <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                {/* Left Info Column */}
                <div className="lg:col-span-8 space-y-4">
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <span className="inline-flex items-center gap-1.5 text-[10px] font-mono font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-red text-white shadow-xs">
                      <Crown size={12} className="text-amber-300" />
                      <span>Bespoke 1-of-1 Build</span>
                    </span>
                    <span className="text-[10px] font-mono text-emerald-400 font-bold bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                      ⚡ Turnkey Launch in 4 Days
                    </span>
                  </div>

                  <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                    Need a Bespoke 1-of-1 Custom Theme?
                  </h3>

                  <p className="text-xs sm:text-sm text-white/70 leading-relaxed max-w-2xl">
                    Can&apos;t find your exact aesthetic? Let Vikash engineer a custom 1-of-1 portfolio theme, agency showcase, or bespoke Shopify storefront tailored directly to your personal brand and vision.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                    {[
                      "1-on-1 Architecture Session on WhatsApp",
                      "Custom 60fps Framer Motion Animations",
                      "Supabase PIN CMS & Private GitHub Handover",
                      "Full Perpetual Commercial Ownership Rights",
                    ].map((perk, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-white/90">
                        <CheckCircle2 size={14} className="text-emerald-400 shrink-0" />
                        <span>{perk}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right VIP CTA Box */}
                <div className="lg:col-span-4 p-6 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-md flex flex-col justify-between gap-4 text-center">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-white/50 block">
                      Direct Developer Access
                    </span>
                    <span className="font-display text-lg font-bold text-white mt-1 block">
                      Personal Project Build
                    </span>
                    <span className="text-xs text-emerald-400 font-mono mt-1 block">
                      ● Active &amp; Booking for this month
                    </span>
                  </div>

                  <a
                    href="https://wa.me/918278670857?text=Hi%20Vikash,%20I%20am%20interested%20in%20a%20bespoke%20custom%20portfolio%20website%20build!"
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor-hover
                    className="w-full py-3.5 px-5 rounded-xl bg-red hover:bg-red-dark text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_8px_20px_rgba(225,6,0,0.4)] hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
                  >
                    <MessageCircle size={15} />
                    <span>Consult on WhatsApp</span>
                    <ArrowRight size={14} />
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        ) : (
          <div className="py-20 text-center">
            <h3 className="text-xl font-bold text-black/80">No items found</h3>
            <p className="text-sm text-black/50 mt-1">Try choosing another category or clearing your search.</p>
          </div>
        )}

      </div>

      {/* ========================================================= */}
      {/* IN-PAGE DUAL DEVICE PREVIEW MODAL WITH ANTI-SCREENSHOT    */}
      {/* ========================================================= */}
      <DualDevicePreviewModal
        item={previewItem}
        onClose={() => setPreviewItem(null)}
        onAddToCart={(item) => handleAddToCart(item)}
        onBuyNow={(item) => {
          handleAddToCart(item);
          setPreviewItem(null);
          setIsCheckoutOpen(true);
        }}
        formatPrice={formatPrice}
        isAdded={previewItem ? !!addedItemIds[previewItem.id] : false}
      />

      {/* ========================================================= */}
      {/* STICKY FLOATING CART PILL (VISIBLE WHEN ITEMS IN CART)    */}
      {/* ========================================================= */}
      <AnimatePresence>
        {totalCount > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="fixed bottom-6 right-6 z-40"
          >
            <button
              type="button"
              onClick={() => {
                soundFX.playOpenChime();
                setIsCartOpen(true);
              }}
              data-cursor-hover
              className="flex items-center gap-3 pl-4 pr-5 py-3 rounded-full bg-[#0a0a0a] text-white shadow-[0_15px_35px_rgba(0,0,0,0.35)] hover:scale-105 active:scale-95 transition-all border border-white/20 group"
            >
              <div className="relative">
                <ShoppingBag size={18} className="text-red group-hover:rotate-12 transition-transform" />
                <span className="absolute -top-1.5 -right-2 w-4 h-4 rounded-full bg-red text-white text-[9px] font-black flex items-center justify-center animate-bounce">
                  {totalCount}
                </span>
              </div>
              <div className="text-left leading-tight">
                <span className="text-[10px] font-mono text-white/60 block">{t("viewCart")}</span>
                <span className="text-xs font-bold text-white">
                  {formattedTotal}
                </span>
              </div>
              <ArrowRight size={14} className="text-white/60 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
