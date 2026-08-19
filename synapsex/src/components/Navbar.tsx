import { useState } from "react";
import { motion } from "framer-motion";
import SynapseXLogo from "./SynapseXLogo";
import SquashHamburger from "./SquashHamburger";
import ScrambleText from "./ScrambleText";

export default function Navbar({ entranceComplete }: { entranceComplete: boolean }) {
  const [open, setOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const [downloadHovered, setDownloadHovered] = useState(false);

  const scrollTo = (multiplier: number) => {
    window.scrollTo({ top: window.innerHeight * multiplier, behavior: "smooth" });
    setOpen(false);
  };

  return (
    <motion.nav
      initial={{ opacity: 0 }}
      animate={{ opacity: entranceComplete ? 1 : 0 }}
      transition={{ duration: 0.8 }}
      className="fixed top-0 left-0 right-0 z-50 h-20 flex items-center justify-between px-4 sm:px-6"
    >
      <div className="hidden sm:flex items-center gap-2">
        <motion.div
          whileHover={{ scale: 1.02, backgroundColor: "rgba(255,255,255,0.22)" }}
          whileTap={{ scale: 0.98 }}
          className={`h-12 px-5 rounded-[14px] bg-white/15 backdrop-blur-md flex items-center gap-2.5 ${
            open ? "hidden md:flex" : "flex"
          }`}
        >
          <SynapseXLogo size={18} className="text-white" />
          <span className="text-white text-[16px] font-medium tracking-tight">SynapseX</span>
        </motion.div>

        <motion.div
          animate={{ width: open ? 290 : 48 }}
          transition={{ type: "spring", stiffness: 350, damping: 28 }}
          className="h-12 rounded-[14px] bg-white/15 backdrop-blur-md flex items-center overflow-hidden"
        >
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            className={`flex items-center justify-center flex-shrink-0 transition-colors ${
              open
                ? "w-9 h-9 rounded-[11px] bg-white/10 hover:bg-white/20 ml-1.5"
                : "w-12 h-12 rounded-[14px]"
            }`}
          >
            <SquashHamburger open={open} />
          </button>

          <motion.div
            initial={false}
            animate={open ? { opacity: 1, x: 0 } : { opacity: 0, x: 15 }}
            transition={{ duration: 0.25 }}
            className="flex items-center gap-5 px-4 whitespace-nowrap"
          >
            <button
              type="button"
              onMouseEnter={() => setHoveredLink("about")}
              onMouseLeave={() => setHoveredLink(null)}
              onClick={() => scrollTo(1)}
              className="text-[16px] font-normal text-white/85 hover:text-white transition-colors"
            >
              <ScrambleText text="About" isHovered={hoveredLink === "about"} />
            </button>
            <button
              type="button"
              onMouseEnter={() => setHoveredLink("metrics")}
              onMouseLeave={() => setHoveredLink(null)}
              onClick={() => scrollTo(2)}
              className="text-[16px] font-normal text-white/85 hover:text-white transition-colors"
            >
              <ScrambleText text="Metrics" isHovered={hoveredLink === "metrics"} />
            </button>
          </motion.div>
        </motion.div>
      </div>

      <div className="flex sm:hidden items-center gap-1.5">
        <motion.div
          animate={{ width: open ? 0 : "auto", opacity: open ? 0 : 1 }}
          transition={{ type: "spring", stiffness: 350, damping: 28 }}
          className="h-9 px-3.5 rounded-[10px] bg-white/15 backdrop-blur-md flex items-center gap-1.5 overflow-hidden whitespace-nowrap"
        >
          <SynapseXLogo size={14} className="text-white" />
          <span className="text-white text-[13px] font-medium tracking-tight">SynapseX</span>
        </motion.div>

        <motion.div
          animate={{ width: open ? "calc(100vw - 32px)" : 40 }}
          transition={{ type: "spring", stiffness: 350, damping: 28 }}
          className="h-9 rounded-[10px] bg-white/15 backdrop-blur-md flex items-center overflow-hidden"
        >
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            className={`flex items-center justify-center flex-shrink-0 transition-colors ${
              open ? "w-7 h-7 rounded-[8px] bg-white/10 ml-1" : "w-9 h-9 rounded-[10px]"
            }`}
          >
            <SquashHamburger open={open} isMobile />
          </button>

          <motion.div
            initial={false}
            animate={open ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="flex items-center gap-4 px-3 whitespace-nowrap"
          >
            <button
              type="button"
              onClick={() => scrollTo(1)}
              className="text-[13px] font-normal text-white/85"
            >
              About
            </button>
            <button
              type="button"
              onClick={() => scrollTo(2)}
              className="text-[13px] font-normal text-white/85"
            >
              Metrics
            </button>
          </motion.div>
        </motion.div>
      </div>

      <motion.button
        type="button"
        onMouseEnter={() => setDownloadHovered(true)}
        onMouseLeave={() => setDownloadHovered(false)}
        whileHover={{ scale: 1.03, backgroundColor: "#e2e2e6" }}
        whileTap={{ scale: 0.97 }}
        className="hidden sm:flex h-12 px-6 bg-white rounded-full items-center gap-2 text-black"
      >
        <i className="bi bi-apple text-[16px]" aria-hidden="true" />
        <ScrambleText text="Download" isHovered={downloadHovered} className="text-[16px] font-normal" />
      </motion.button>

      <button
        type="button"
        className="flex sm:hidden h-9 px-3.5 bg-white rounded-full items-center gap-1.5 text-black"
      >
        <i className="bi bi-apple text-[13px]" aria-hidden="true" />
        <span className="text-[13px] font-normal">Download</span>
      </button>
    </motion.nav>
  );
}
