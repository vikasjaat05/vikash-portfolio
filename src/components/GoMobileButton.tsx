"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Smartphone, X } from "lucide-react";
import QRCode from "qrcode";

export default function GoMobileButton({ dark = false }: { dark?: boolean }) {
  const [open, setOpen] = useState(false);
  const [dataUrl, setDataUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!open) return;
    const url = window.location.href;
    QRCode.toDataURL(url, {
      width: 240,
      margin: 1,
      color: { dark: "#0a0a0a", light: "#ffffff" },
    })
      .then(setDataUrl)
      .catch(() => setDataUrl(null));
  }, [open]);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        data-cursor-hover
        aria-label="View this site on mobile"
        className={`inline-flex items-center gap-1.5 text-sm font-medium px-4 py-2 rounded-full border transition-colors ${
          dark
            ? "border-white/25 text-white/80 hover:text-white hover:border-white/50"
            : "border-black/15 text-black/70 hover:text-black hover:border-black/30"
        }`}
      >
        <Smartphone size={15} />
        Go Mobile
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 backdrop-blur-sm px-6"
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative bg-white rounded-3xl p-8 md:p-10 max-w-sm w-full text-center"
            >
              <button
                onClick={() => setOpen(false)}
                data-cursor-hover
                aria-label="Close"
                className="absolute top-4 right-4 w-9 h-9 rounded-full border border-black/10 flex items-center justify-center hover:bg-black/5 transition-colors"
              >
                <X size={16} />
              </button>

              <h3 className="font-display text-xl font-bold mb-2">Scan to open on mobile</h3>
              <p className="text-black/60 text-sm mb-6">
                Point your phone&apos;s camera at the code below.
              </p>

              <div className="w-full aspect-square max-w-[240px] mx-auto rounded-2xl border border-black/10 flex items-center justify-center overflow-hidden bg-white">
                {dataUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={dataUrl}
                    alt="QR code to open this site on mobile"
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <div className="w-8 h-8 border-2 border-black/10 border-t-red rounded-full animate-spin" />
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
