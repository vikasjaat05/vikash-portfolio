"use client";

import { useState } from "react";
import { ShoppingBag, ArrowUpRight, X, ChevronRight, Check } from "lucide-react";
import ImageRevealBackground from "./ImageRevealBackground";

const BG_IMAGE_1 = "/images/model_1.png";

type DrawerType = "shop" | "collections" | "journal" | "cart" | null;

interface CartItem {
  id: string;
  title: string;
  price: string;
}

const CATALOG_ITEMS = [
  { id: "1", title: "CYBER-TEX OVERCOAT", price: "$850", tag: "LIMITED EDITION" },
  { id: "2", title: "GEO-MESH TECH HOODIE", price: "$320", tag: "NEW DROP" },
  { id: "3", title: "ORBITAL TAPERED TROUSERS", price: "$290", tag: "IN STOCK" },
  { id: "4", title: "MODULAR ALL-WEATHER VEST", price: "$410", tag: "PRE-ORDER" },
];

const ARCHIVE_ITEMS = [
  {
    series: "SERIES 01",
    title: "SYNTHETIC HORIZONS",
    desc: "Ultra-durable weather-sealed fabrics with minimalist silhouette architecture.",
  },
  {
    series: "SERIES 02",
    title: "KINETIC FORM",
    desc: "Ergonomic streetwear designed for maximum mobility and temperature equilibrium.",
  },
  {
    series: "SERIES 03",
    title: "MONOCHROME ZERO",
    desc: "Pure black and white structural tailoring crafted from 100% recycled polymers.",
  },
];

const JOURNAL_ITEMS = [
  { date: "AUG 2026", title: "THE ARCHITECTURE OF NEXT-GEN TEXTILES", read: "4 MIN READ" },
  { date: "JUL 2026", title: "CIRCULAR DESIGN IN HIGH-END APPAREL", read: "6 MIN READ" },
  { date: "JUN 2026", title: "MINIMALISM AS A FUNCTIONAL STATEMENT", read: "3 MIN READ" },
];

export default function LGPSMPage() {
  const [activeDrawer, setActiveDrawer] = useState<DrawerType>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const addToCart = (item: { id: string; title: string; price: string }) => {
    setCart((prev) => [...prev, item]);
    showToast(`Added "${item.title}" to your shopping bag.`);
  };

  const removeFromCart = (index: number) => {
    setCart((prev) => prev.filter((_, i) => i !== index));
  };

  const handleCheckout = () => {
    showToast("Order submitted successfully!");
    setCart([]);
    setActiveDrawer(null);
  };

  return (
    <div className="min-h-screen bg-white text-black font-jakarta flex flex-col justify-between relative overflow-hidden selection:bg-black selection:text-white lgpsm-root">
      {/* Google Fonts Link */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        href="https://fonts.googleapis.com/css2?family=Chakra+Petch:wght@500;600;700&family=Michroma&family=Orbitron:wght@600;700;800;900&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap"
        rel="stylesheet"
      />

      {/* Fluid CSS Variables */}
      <style jsx global>{`
        .lgpsm-root {
          --pad-x: clamp(1.25rem, 4.5vw, 5rem);
          --pad-y: clamp(1rem, 3vh, 4rem);
          --header-pt: clamp(1.25rem, 2.5vh, 2.5rem);
          --gap-nav: clamp(1rem, 2.2vw, 2.25rem);
          --logo: clamp(1.35rem, 1.2vw + 0.9rem, 2.1rem);
          --logo-deg: clamp(0.65rem, 0.4vw + 0.45rem, 0.9rem);
          --nav: clamp(0.65rem, 0.35vw + 0.5rem, 0.875rem);
          --headline: clamp(2rem, 4vw + 0.8rem, 4.25rem);
          --body: clamp(0.8rem, 0.4vw + 0.6rem, 1.05rem);
          --micro: clamp(0.55rem, 0.25vw + 0.45rem, 0.7rem);
          --btn-px: clamp(1.15rem, 1.4vw, 1.75rem);
          --btn-py: clamp(0.6rem, 0.9vh, 0.85rem);
          --btn-gap: clamp(0.75rem, 1vw, 1.1rem);
          --corner: clamp(0.65rem, 0.4vw + 0.4rem, 0.95rem);
          --icon: clamp(1rem, 0.6vw + 0.7rem, 1.35rem);
          --drawer-pad: clamp(1.25rem, 2.5vw, 2.25rem);
          --drawer-max: clamp(18rem, 28vw, 28rem);
          --section-gap: clamp(0.75rem, 1.5vh, 1.5rem);
          --main-py: clamp(1.25rem, 4vh, 4rem);
        }
        .font-orbitron {
          font-family: "Orbitron", sans-serif;
        }
        .font-jakarta {
          font-family: "Plus Jakarta Sans", sans-serif;
        }
      `}</style>

      {/* Desktop Interactive Spotlight Reveal Background */}
      <ImageRevealBackground />

      {/* Main Hero — Clean Minimalist Poetic Composition */}
      <main
        className="flex-1 flex flex-col justify-center relative z-10"
        style={{
          paddingInline: "var(--pad-x)",
          paddingBlock: "var(--main-py)",
        }}
      >
        <div className="max-w-2xl relative my-auto">
          {/* Top-left L-corner bracket */}
          <div className="mb-4 text-black/70">
            <svg
              viewBox="0 0 12 12"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              style={{ width: "var(--corner)", height: "var(--corner)" }}
            >
              <path d="M0 11.5V0.5H11.5" />
            </svg>
          </div>

          {/* Headline */}
          <h1
            className="font-display font-extrabold text-black leading-[1.08] tracking-tight"
            style={{
              fontSize: "var(--headline)",
            }}
          >
            Crafting high-speed web apps &amp; Shopify storefronts.
          </h1>

          {/* Body */}
          <p
            className="text-black/80 mt-6 leading-relaxed font-normal"
            style={{
              fontSize: "var(--body)",
              maxWidth: "38rem",
            }}
          >
            Hi, I&apos;m <strong className="text-black font-semibold">Vikash Choudhary</strong> — an independent Web &amp; Shopify Developer. I help modern brands scale with lightning-fast e-commerce stores, custom Next.js web applications, and precision UI engineering — built for speed, designed to convert.
          </p>

          {/* Bottom-left L-corner bracket */}
          <div className="mt-6 text-black/70">
            <svg
              viewBox="0 0 12 12"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              style={{ width: "var(--corner)", height: "var(--corner)" }}
            >
              <path d="M0 0.5V11.5H11.5" />
            </svg>
          </div>
        </div>
      </main>

      {/* Mobile Static Fallback Image Section (Hidden on lg+) */}
      <section className="lg:hidden px-6 pb-12 relative z-10">
        <div className="w-full aspect-[4/5] sm:aspect-[16/9] border border-gray-200 rounded-lg overflow-hidden relative">
          <img
            src={BG_IMAGE_1}
            alt="Look"
            className="w-full h-full object-cover object-center"
          />
        </div>
      </section>

      {/* 3. Side Drawers */}
      {activeDrawer && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Dimmed backdrop */}
          <div
            onClick={() => setActiveDrawer(null)}
            className="fixed inset-0 bg-black/20 backdrop-blur-xs transition-opacity duration-300"
          />

          {/* Drawer Panel */}
          <div
            className="relative z-10 w-full h-full bg-white border-l border-gray-200 flex flex-col justify-between shadow-2xl overflow-y-auto"
            style={{
              maxWidth: "var(--drawer-max)",
              padding: "var(--drawer-pad)",
            }}
          >
            <div>
              {/* Drawer Header */}
              <div className="flex items-center justify-between pb-6 border-b border-gray-100">
                <h2 className="font-orbitron font-bold uppercase text-lg sm:text-xl tracking-wider text-black">
                  {activeDrawer === "shop" && "Catalog"}
                  {activeDrawer === "collections" && "Archive 2026"}
                  {activeDrawer === "journal" && "Editorial"}
                  {activeDrawer === "cart" && "Shopping Bag"}
                </h2>
                <button
                  onClick={() => setActiveDrawer(null)}
                  className="p-1.5 text-gray-500 hover:text-black transition-colors rounded-full hover:bg-gray-100 cursor-pointer"
                  aria-label="Close drawer"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Drawer Content */}
              <div className="pt-6">
                {/* 1. SHOP Drawer */}
                {activeDrawer === "shop" && (
                  <div>
                    <p
                      className="text-gray-400 font-semibold uppercase mb-6"
                      style={{ fontSize: "var(--micro)", letterSpacing: "0.15em" }}
                    >
                      Featured Garments
                    </p>
                    <div className="space-y-6">
                      {CATALOG_ITEMS.map((item) => (
                        <div
                          key={item.id}
                          className="flex items-center justify-between pb-4 border-b border-gray-100"
                        >
                          <div>
                            <span
                              className="text-gray-400 font-semibold block uppercase"
                              style={{ fontSize: "var(--micro)", letterSpacing: "0.1em" }}
                            >
                              {item.tag}
                            </span>
                            <h3
                              className="font-bold text-black mt-0.5 text-sm"
                            >
                              {item.title}
                            </h3>
                            <p className="text-gray-600 font-mono text-xs mt-0.5">
                              {item.price}
                            </p>
                          </div>
                          <button
                            onClick={() => addToCart(item)}
                            className="px-3.5 py-1.5 rounded-md border border-gray-300 text-xs font-semibold uppercase tracking-wider hover:bg-black hover:text-white hover:border-black transition-colors cursor-pointer"
                          >
                            ADD
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 2. COLLECTIONS Drawer */}
                {activeDrawer === "collections" && (
                  <div>
                    <p
                      className="text-gray-400 font-semibold uppercase mb-6"
                      style={{ fontSize: "var(--micro)", letterSpacing: "0.15em" }}
                    >
                      Season Lineup
                    </p>
                    <div className="space-y-8">
                      {ARCHIVE_ITEMS.map((item) => (
                        <div key={item.series} className="pb-6 border-b border-gray-100">
                          <span
                            className="text-gray-400 font-semibold uppercase block"
                            style={{ fontSize: "var(--micro)", letterSpacing: "0.15em" }}
                          >
                            {item.series}
                          </span>
                          <h3
                            className="font-orbitron font-bold text-black mt-1 mb-2 tracking-wide text-sm"
                          >
                            {item.title}
                          </h3>
                          <p className="text-gray-600 text-xs leading-relaxed">
                            {item.desc}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 3. JOURNAL Drawer */}
                {activeDrawer === "journal" && (
                  <div>
                    <p
                      className="text-gray-400 font-semibold uppercase mb-6"
                      style={{ fontSize: "var(--micro)", letterSpacing: "0.15em" }}
                    >
                      Latest Dispatches
                    </p>
                    <div className="space-y-8">
                      {JOURNAL_ITEMS.map((item) => (
                        <div key={item.title} className="pb-6 border-b border-gray-100">
                          <div
                            className="flex items-center justify-between text-gray-400 font-mono text-[10px] uppercase mb-1"
                            style={{ letterSpacing: "0.12em" }}
                          >
                            <span>{item.date}</span>
                            <span>{item.read}</span>
                          </div>
                          <h3
                            className="font-bold text-black leading-snug hover:opacity-60 transition-opacity cursor-pointer text-sm"
                          >
                            {item.title}
                          </h3>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 4. CART Drawer */}
                {activeDrawer === "cart" && (
                  <div>
                    {cart.length === 0 ? (
                      <div className="py-16 text-center flex flex-col items-center justify-center text-gray-400">
                        <ShoppingBag size={36} strokeWidth={1.2} className="mb-4 text-gray-300" />
                        <p className="text-xs uppercase tracking-widest">
                          Your shopping bag is empty.
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {cart.map((item, idx) => (
                          <div
                            key={`${item.id}-${idx}`}
                            className="flex items-center justify-between py-3 border-b border-gray-100"
                          >
                            <div>
                              <p className="font-bold text-xs text-black">{item.title}</p>
                              <p className="text-gray-500 font-mono text-xs mt-0.5">
                                {item.price}
                              </p>
                            </div>
                            <button
                              onClick={() => removeFromCart(idx)}
                              className="text-xs text-gray-400 hover:text-red-500 underline transition-colors cursor-pointer"
                            >
                              Remove
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Drawer Footer */}
            <div className="pt-6 border-t border-gray-100 mt-8">
              {activeDrawer === "cart" && cart.length > 0 ? (
                <button
                  onClick={handleCheckout}
                  className="w-full bg-black text-white py-3.5 px-6 rounded-md font-semibold text-xs uppercase tracking-widest hover:bg-gray-800 transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>CHECKOUT NOW</span>
                  <ChevronRight size={16} />
                </button>
              ) : (
                <p
                  className="text-center text-gray-400 uppercase font-mono"
                  style={{ fontSize: "var(--micro)", letterSpacing: "0.15em" }}
                >
                  LGPSM © 2026 — FUTURE FORWARD FASHION
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-50 bg-black text-white px-5 py-3 rounded-lg shadow-2xl flex items-center gap-3 border border-gray-800 text-xs font-medium tracking-wide animate-in fade-in slide-in-from-top-2 duration-300">
          <Check size={16} className="text-emerald-400 flex-shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
