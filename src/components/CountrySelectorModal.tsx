"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search, 
  X, 
  Check, 
  MapPin, 
  ArrowRight,
  ShieldCheck,
  Coins
} from "lucide-react";
import { useCart, ALL_COUNTRIES, CountryInfo } from "./CartContext";
import { soundFX } from "@/lib/ui-sounds";

const POPULAR_COUNTRIES = ["IN", "US", "GB", "AE", "DE", "JP", "CA", "AU"];

export default function CountrySelectorModal() {
  const { isCountryModalOpen, setIsCountryModalOpen, selectCountry, selectedCountry } = useCart();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCountries = useMemo(() => {
    if (!searchQuery.trim()) return ALL_COUNTRIES;
    const q = searchQuery.toLowerCase().trim();
    return ALL_COUNTRIES.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.code.toLowerCase().includes(q) ||
        c.currency.toLowerCase().includes(q) ||
        c.currencyLabel.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  const handleSelect = (country: CountryInfo) => {
    soundFX.playCartChime();
    selectCountry(country);
  };

  return (
    <AnimatePresence>
      {isCountryModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto select-none">
          {/* Dark Glass Backdrop with Smooth Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCountryModalOpen(false)}
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Elevated Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 24 }}
            transition={{ type: "spring", stiffness: 360, damping: 28 }}
            className="relative w-full max-w-lg rounded-[2.5rem] bg-gradient-to-b from-[#131929] via-[#0d121f] to-[#090d16] border border-white/20 shadow-[0_30px_100px_rgba(0,0,0,0.85)] text-white p-6 sm:p-8 z-10 my-8 overflow-hidden"
          >
            {/* Ambient Red & Blue Radial Glows */}
            <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full bg-red/25 blur-[90px] pointer-events-none" />
            <div className="absolute -bottom-24 -left-24 w-64 h-64 rounded-full bg-blue-600/20 blur-[90px] pointer-events-none" />

            {/* Close button */}
            <button
              type="button"
              onClick={() => setIsCountryModalOpen(false)}
              className="absolute top-5 right-5 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/60 hover:text-white transition-all hover:scale-105 active:scale-95"
            >
              <X size={16} />
            </button>

            {/* Header */}
            <div className="relative z-10 mb-6 text-left">
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-red/15 text-red text-[11px] font-mono font-bold uppercase tracking-wider mb-3 border border-red/30 shadow-xs">
                <MapPin size={12} className="animate-bounce" />
                <span>Regional Currency Selector</span>
              </div>
              
              <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Select Your Country
              </h3>
              <p className="text-xs sm:text-sm text-white/70 mt-1.5 leading-relaxed">
                Prices and checkout will automatically update in your local currency. You can adjust this anytime from the top bar.
              </p>
            </div>

            {/* Search Input Bar */}
            <div className="relative mb-4 z-10">
              <Search size={16} className="absolute left-4 top-3.5 text-white/40" />
              <input
                type="text"
                autoFocus
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search your country or currency (e.g. India, USA, INR, GBP)..."
                className="w-full pl-11 pr-10 py-3 rounded-2xl bg-white/[0.08] border border-white/15 focus:border-red focus:bg-white/[0.12] text-sm text-white placeholder-white/40 outline-none transition-all shadow-inner font-sans"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3.5 top-3.5 text-white/40 hover:text-white transition-colors"
                >
                  <X size={16} />
                </button>
              )}
            </div>

            {/* Popular Region Chips */}
            {!searchQuery && (
              <div className="mb-4 z-10 relative">
                <div className="text-[10px] font-mono uppercase text-white/45 mb-2 tracking-wider">
                  Popular Regions
                </div>
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {ALL_COUNTRIES.filter((c) => POPULAR_COUNTRIES.includes(c.code)).map((c) => (
                    <button
                      key={c.code}
                      type="button"
                      onClick={() => handleSelect(c)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-xs font-mono transition-all hover:scale-105 active:scale-95 text-white shadow-xs"
                    >
                      <span className="text-sm">{c.flag}</span>
                      <span className="font-semibold">{c.name}</span>
                      <span className="text-red font-bold text-[10px]">{c.currency}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Scrollable Country List */}
            <div className="relative z-10 max-h-60 overflow-y-auto space-y-1.5 pr-1 no-scrollbar">
              {filteredCountries.length > 0 ? (
                filteredCountries.map((country) => {
                  const isSelected = selectedCountry?.code === country.code;
                  return (
                    <button
                      key={country.code}
                      type="button"
                      onClick={() => handleSelect(country)}
                      className={`w-full flex items-center justify-between p-3 rounded-2xl transition-all ${
                        isSelected
                          ? "bg-red/20 border border-red/60 shadow-md text-white"
                          : "bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 text-white/85 hover:text-white"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-2xl shrink-0">{country.flag}</span>
                        <div className="text-left">
                          <div className="font-bold text-sm text-white">
                            {country.name}
                          </div>
                          <div className="text-xs text-white/50 font-mono flex items-center gap-1.5 mt-0.5">
                            <Coins size={11} className="text-emerald-400" />
                            <span>Currency:</span>
                            <strong className="text-white/90">{country.currencyLabel}</strong>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        {isSelected ? (
                          <span className="w-7 h-7 rounded-full bg-red text-white flex items-center justify-center shadow-xs">
                            <Check size={14} strokeWidth={3} />
                          </span>
                        ) : (
                          <span className="w-7 h-7 rounded-full bg-white/10 text-white/60 hover:text-white flex items-center justify-center transition-colors">
                            <ArrowRight size={13} />
                          </span>
                        )}
                      </div>
                    </button>
                  );
                })
              ) : (
                <div className="py-8 text-center text-white/40 text-sm font-mono">
                  No country matched &ldquo;{searchQuery}&rdquo;
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="relative z-10 pt-4 mt-4 border-t border-white/10 flex items-center justify-between text-xs text-white/50">
              <span className="flex items-center gap-1.5 font-mono text-[11px]">
                <ShieldCheck size={14} className="text-emerald-400" />
                Live Currency Conversion
              </span>
              <button
                type="button"
                onClick={() => setIsCountryModalOpen(false)}
                className="text-white/70 hover:text-white underline font-mono text-[11px] transition-colors"
              >
                Continue with USD ($)
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
