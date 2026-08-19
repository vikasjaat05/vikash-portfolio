"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Cookie } from "lucide-react";

const STORAGE_KEY = "arix-cookie-consent";

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (localStorage.getItem(STORAGE_KEY)) return;
    const timer = setTimeout(() => setVisible(true), 800);
    return () => clearTimeout(timer);
  }, []);

  const accept = () => {
    localStorage.setItem(STORAGE_KEY, "accepted");
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          role="dialog"
          aria-label="Cookie consent"
          className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:bottom-6 z-[90] max-w-md rounded-2xl border border-black/10 bg-white shadow-2xl p-5 md:p-6"
        >
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-full bg-red/10 flex items-center justify-center flex-shrink-0">
              <Cookie size={18} className="text-red" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-black/70 leading-relaxed">
                We use cookies to improve your experience on this site. See our{" "}
                <Link href="/privacy" data-cursor-hover className="underline-swipe font-medium text-black">
                  Privacy Policy
                </Link>{" "}
                and{" "}
                <Link href="/terms" data-cursor-hover className="underline-swipe font-medium text-black">
                  Terms &amp; Conditions
                </Link>{" "}
                for details.
              </p>
              <div className="flex items-center gap-3 mt-4">
                <button
                  type="button"
                  onClick={accept}
                  data-cursor-hover
                  className="bg-[#0a0a0a] text-white text-sm font-semibold px-5 py-2.5 rounded-full hover:bg-red transition-colors duration-300"
                >
                  Accept
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
