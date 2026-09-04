"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Check, Search, MapPin, X } from "lucide-react";
import { 
  useCart, 
  ALL_CURRENCIES, 
  CurrencyCode 
} from "./CartContext";
import { soundFX } from "@/lib/ui-sounds";

export default function StoreControlBar() {
  const { 
    currency, 
    setCurrency, 
    selectedCountry,
    setIsCountryModalOpen 
  } = useCart();

  const [currOpen, setCurrOpen] = useState(false);
  const [currSearch, setCurrSearch] = useState("");
  const currRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (currRef.current && !currRef.current.contains(e.target as Node)) {
        setCurrOpen(false);
        setCurrSearch("");
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const activeCurrency = ALL_CURRENCIES.find((c) => c.code === currency) || ALL_CURRENCIES[0];

  // Filtered Currencies with live search
  const filteredCurrencies = useMemo(() => {
    if (!currSearch.trim()) return ALL_CURRENCIES;
    const q = currSearch.toLowerCase().trim();
    return ALL_CURRENCIES.filter(
      (c) =>
        c.code.toLowerCase().includes(q) ||
        c.label.toLowerCase().includes(q) ||
        c.symbol.toLowerCase().includes(q)
    );
  }, [currSearch]);

  return (
    <div className="flex items-center gap-2 text-xs font-mono select-none">
      
      {/* 1. Country / Region Pill (Opens Country Selector Modal) */}
      <button
        type="button"
        onClick={() => {
          soundFX.playOpenChime();
          setIsCountryModalOpen(true);
        }}
        data-cursor-hover
        title="Select Country & Auto-Configure Currency"
        className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white backdrop-blur-md transition-all shadow-xs group"
      >
        <MapPin size={12} className="text-red group-hover:scale-110 transition-transform" />
        <span className="font-semibold hidden sm:inline">
          {selectedCountry ? `${selectedCountry.flag} ${selectedCountry.name}` : "🌍 Region"}
        </span>
        <span className="sm:hidden text-xs">
          {selectedCountry ? selectedCountry.flag : "🌍"}
        </span>
      </button>

      {/* 2. Currency Dropdown with Live Search */}
      <div ref={currRef} className="relative">
        <button
          type="button"
          onClick={() => {
            soundFX.playOpenChime();
            setCurrOpen((prev) => !prev);
            setCurrSearch("");
          }}
          data-cursor-hover
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white backdrop-blur-md transition-all shadow-xs"
        >
          <span className="text-sm">{activeCurrency.flag}</span>
          <span className="font-bold">{activeCurrency.code}</span>
          <span className="text-white/60">({activeCurrency.symbol})</span>
          <ChevronDown size={12} className={`text-white/60 transition-transform duration-200 ${currOpen ? "rotate-180" : ""}`} />
        </button>

        <AnimatePresence>
          {currOpen && (
            <motion.div
              initial={{ opacity: 0, y: 8, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.95 }}
              transition={{ duration: 0.15 }}
              className="absolute top-full right-0 mt-2 w-60 rounded-2xl bg-[#0d111c]/95 backdrop-blur-2xl border border-white/20 shadow-2xl p-2.5 z-50 text-white"
            >
              {/* Search input for currencies */}
              <div className="relative mb-2">
                <Search size={13} className="absolute left-2.5 top-2.5 text-white/40" />
                <input
                  type="text"
                  autoFocus
                  value={currSearch}
                  onChange={(e) => setCurrSearch(e.target.value)}
                  placeholder="Search currency..."
                  className="w-full pl-8 pr-7 py-1.5 rounded-xl bg-white/10 border border-white/10 text-xs text-white placeholder-white/40 focus:outline-none focus:border-red"
                />
                {currSearch && (
                  <button
                    type="button"
                    onClick={() => setCurrSearch("")}
                    className="absolute right-2 top-2 text-white/40 hover:text-white"
                  >
                    <X size={12} />
                  </button>
                )}
              </div>

              <div className="px-2 py-0.5 text-[10px] uppercase font-mono text-white/40 tracking-wider">
                Select Currency
              </div>

              <div className="max-h-60 overflow-y-auto space-y-0.5 mt-1">
                {filteredCurrencies.length > 0 ? (
                  filteredCurrencies.map((curr) => {
                    const isSelected = currency === curr.code;
                    return (
                      <button
                        key={curr.code}
                        type="button"
                        onClick={() => {
                          setCurrency(curr.code);
                          setCurrOpen(false);
                        }}
                        className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-mono transition-colors ${
                          isSelected
                            ? "bg-red/20 border border-red/40 text-white font-bold"
                            : "hover:bg-white/10 text-white/75 hover:text-white"
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-base">{curr.flag}</span>
                          <span className="font-bold">{curr.code}</span>
                          <span className="text-white/50 text-[11px]">({curr.symbol})</span>
                        </div>
                        {isSelected && <Check size={13} className="text-red" />}
                      </button>
                    );
                  })
                ) : (
                  <div className="py-3 text-center text-xs text-white/40">No currency found</div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

    </div>
  );
}
