"use client";

import { useRef, useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  AnimatePresence,
  MotionValue,
} from "framer-motion";
import {
  Zap,
  Briefcase,
  User,
  Code2,
  FileText,
  Star,
  ShoppingBag,
  Mail,
  Search,
  Volume2,
  X,
  ArrowUpRight,
  ChevronDown,
  LayoutGrid,
} from "lucide-react";
import { useBackgroundAudio } from "./BackgroundAudioContext";

type DockItemConfig = {
  id: string;
  title: string;
  shortTitle?: string;
  renderIcon: (props: { isPlaying?: boolean; isActive?: boolean; isHovered?: boolean }) => React.ReactNode;
  href?: string;
  action?: () => void;
};

export default function FloatingDock() {
  const mouseX = useMotionValue(Infinity);
  const [isOpen, setIsOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { playing, toggle: toggleAudio, trackTitle } = useBackgroundAudio();
  const pathname = usePathname();
  const router = useRouter();
  const dockRef = useRef<HTMLDivElement>(null);

  // Close dock on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Click outside to close
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dockRef.current && !dockRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  // Keyboard shortcut (⌘K / Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      }
      if (e.key === "Escape") {
        setSearchOpen(false);
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const WORKING_DOCK_ITEMS: DockItemConfig[] = [
    {
      id: "home",
      title: "Home",
      renderIcon: ({ isActive, isHovered }) => (
        <Zap
          size={18}
          strokeWidth={2.2}
          className={`transition-colors duration-200 ${
            isActive || isHovered ? "text-red fill-red/20" : "text-[#0a0a0a]"
          }`}
        />
      ),
      href: "/",
    },
    {
      id: "work",
      title: "Work",
      renderIcon: ({ isActive, isHovered }) => (
        <Briefcase
          size={18}
          strokeWidth={2.2}
          className={`transition-colors duration-200 ${
            isActive || isHovered ? "text-red" : "text-[#0a0a0a]"
          }`}
        />
      ),
      href: "/work",
    },
    {
      id: "about",
      title: "About",
      renderIcon: ({ isActive, isHovered }) => (
        <User
          size={18}
          strokeWidth={2.2}
          className={`transition-colors duration-200 ${
            isActive || isHovered ? "text-red" : "text-[#0a0a0a]"
          }`}
        />
      ),
      href: "/about",
    },
    {
      id: "services",
      title: "Services",
      renderIcon: ({ isActive, isHovered }) => (
        <Code2
          size={18}
          strokeWidth={2.2}
          className={`transition-colors duration-200 ${
            isActive || isHovered ? "text-red" : "text-[#0a0a0a]"
          }`}
        />
      ),
      href: "/services",
    },
    {
      id: "resume",
      title: "Resume",
      renderIcon: ({ isActive, isHovered }) => (
        <FileText
          size={18}
          strokeWidth={2.2}
          className={`transition-colors duration-200 ${
            isActive || isHovered ? "text-red" : "text-[#0a0a0a]"
          }`}
        />
      ),
      href: "/resume",
    },
    {
      id: "pricing",
      title: "Reviews",
      renderIcon: ({ isActive, isHovered }) => (
        <Star
          size={18}
          strokeWidth={2.2}
          className={`transition-colors duration-200 ${
            isActive || isHovered ? "text-amber-500 fill-amber-400/30" : "text-[#0a0a0a]"
          }`}
        />
      ),
      href: "/pricing",
    },
    {
      id: "buy-portfolio",
      title: "Buy Portfolio",
      shortTitle: "Buy",
      renderIcon: ({ isActive, isHovered }) => (
        <ShoppingBag
          size={18}
          strokeWidth={2.2}
          className={`transition-colors duration-200 ${
            isActive || isHovered ? "text-red fill-red/20" : "text-[#0a0a0a]"
          }`}
        />
      ),
      href: "/buy-portfolio",
    },
    {
      id: "contact",
      title: "Contact",
      renderIcon: ({ isActive, isHovered }) => (
        <Mail
          size={18}
          strokeWidth={2.2}
          className={`transition-colors duration-200 ${
            isActive || isHovered ? "text-red" : "text-[#0a0a0a]"
          }`}
        />
      ),
      href: "/contact",
    },
    {
      id: "search",
      title: "Search (⌘K)",
      shortTitle: "Search",
      renderIcon: ({ isHovered }) => (
        <Search
          size={18}
          strokeWidth={2.2}
          className={`transition-colors duration-200 ${
            isHovered ? "text-red" : "text-[#0a0a0a]"
          }`}
        />
      ),
      action: () => setSearchOpen(true),
    },
    {
      id: "audio",
      title: playing ? "Playing" : "Music",
      renderIcon: ({ isPlaying, isHovered }) =>
        isPlaying ? (
          <div className="flex items-end gap-0.5 h-3.5 justify-center">
            <span className="w-0.5 bg-red rounded-full animate-[bounce_0.6s_infinite_ease-in-out] h-full" />
            <span className="w-0.5 bg-red rounded-full animate-[bounce_0.8s_infinite_0.2s_ease-in-out] h-2.5" />
            <span className="w-0.5 bg-red rounded-full animate-[bounce_0.5s_infinite_0.4s_ease-in-out] h-full" />
          </div>
        ) : (
          <Volume2
            size={18}
            strokeWidth={2.2}
            className={`transition-colors duration-200 ${
              isHovered ? "text-red" : "text-[#0a0a0a]"
            }`}
          />
        ),
      action: toggleAudio,
    },
  ];

  const SEARCH_ITEMS = [
    { title: "Home / Overview", href: "/", category: "Navigation" },
    { title: "Selected Work & Projects", href: "/work", category: "Portfolio" },
    { title: "About Vikash Choudhary", href: "/about", category: "Bio & Story" },
    { title: "Services & Tech Stack", href: "/services", category: "Offerings" },
    { title: "Resume & Experience (CV)", href: "/resume", category: "Career" },
    { title: "Buy Portfolio / Source Code", href: "/buy-portfolio", category: "Store" },
    { title: "FAQ & Client Reviews", href: "/pricing", category: "Pricing" },
    { title: "Start a Project / Contact", href: "/contact", category: "Action" },
  ];

  const filteredSearch = SEARCH_ITEMS.filter((item) =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      {/* Floating Bottom Dock Container */}
      <div
        ref={dockRef}
        className="fixed bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-40 select-none pointer-events-auto"
      >
        <AnimatePresence mode="wait">
          {!isOpen ? (
            /* ======================================================= */
            /* A. COMPACT TRIGGER PILL                                 */
            /* ======================================================= */
            <div className="flex items-center p-1 rounded-full bg-white/40 backdrop-blur-2xl border border-white/80 shadow-[0_16px_36px_rgba(0,0,0,0.14)]">
              {/* Menu Button */}
              <motion.button
                key="compact-trigger"
                type="button"
                onClick={() => setIsOpen(true)}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.95 }}
                data-cursor-hover
                className="group flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 rounded-full bg-white/70 hover:bg-white shadow-xs transition-all"
              >
                <LayoutGrid size={15} className="text-red group-hover:rotate-90 transition-transform duration-300" />
                <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[#0a0a0a]">
                  Menu
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-red animate-pulse" />
              </motion.button>
            </div>
          ) : (
            /* ======================================================= */
            /* B. EXPANDED LIQUID GLASS DOCK                           */
            /* ======================================================= */
            <motion.div
              key="expanded-dock"
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 15 }}
              transition={{ type: "spring", stiffness: 420, damping: 28 }}
              onMouseMove={(e) => mouseX.set(e.pageX)}
              onMouseLeave={() => mouseX.set(Infinity)}
              className="w-[92vw] max-w-[340px] sm:w-auto sm:max-w-none rounded-[24px] sm:rounded-full p-2.5 sm:px-3.5 sm:py-2.5 shadow-[0_24px_60px_rgba(0,0,0,0.18)]"
              style={{
                background: "rgba(255, 255, 255, 0.52)",
                backdropFilter: "blur(32px) saturate(200%)",
                WebkitBackdropFilter: "blur(32px) saturate(200%)",
                border: "1.5px solid rgba(255, 255, 255, 0.8)",
                boxShadow:
                  "0 20px 50px rgba(0, 0, 0, 0.15), inset 0 1.5px 2px rgba(255, 255, 255, 0.95), inset 0 -1px 2px rgba(0, 0, 0, 0.06)",
              }}
            >
              {/* Desktop Single-Row Layout (>= 640px) */}
              <div className="hidden sm:flex items-end gap-1.5 sm:gap-2">
                {WORKING_DOCK_ITEMS.map((item) => (
                  <DockGlassItem
                    key={item.id}
                    item={item}
                    mouseX={mouseX}
                    isActive={pathname === item.href}
                    isPlayingAudio={item.id === "audio" && playing}
                    onNavigate={(href) => {
                      if (href) {
                        router.push(href);
                        setIsOpen(false);
                      }
                    }}
                  />
                ))}

                {/* Close Button Desktop */}
                <div className="relative flex flex-col items-center justify-end">
                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    data-cursor-hover
                    className="w-10 h-10 rounded-[14px] bg-white/60 hover:bg-white border border-white/80 shadow-xs flex items-center justify-center text-black/70 hover:text-red transition-all"
                    title="Close Menu"
                  >
                    <ChevronDown size={18} strokeWidth={2.5} />
                  </button>
                  <span className="h-1 mt-1" />
                </div>
              </div>

              {/* Mobile Bento Grid (< 640px) */}
              <div className="flex sm:hidden flex-col gap-2">
                <div className="grid grid-cols-5 gap-1.5">
                  {WORKING_DOCK_ITEMS.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => {
                        if (item.action) {
                          item.action();
                        } else if (item.href) {
                          router.push(item.href);
                          setIsOpen(false);
                        }
                      }}
                      className={`h-12 rounded-xl flex flex-col items-center justify-center gap-0.5 transition-all ${
                        pathname === item.href
                          ? "bg-white border-2 border-red shadow-sm"
                          : item.id === "voice"
                            ? "bg-red/10 border border-red/30 text-red"
                            : "bg-white/55 active:bg-white/85 border border-white/70 shadow-2xs"
                      }`}
                    >
                      {item.renderIcon({ isActive: pathname === item.href, isPlaying: item.id === "audio" && playing })}
                      <span className="text-[9px] font-bold text-black/80 max-w-[48px] truncate">
                        {item.shortTitle ?? item.title}
                      </span>
                    </button>
                  ))}
                </div>

                {/* Full-width Close Button Mobile */}
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="w-full h-8 rounded-xl bg-white/70 active:bg-white border border-white/80 text-black/80 hover:text-red font-semibold text-xs flex items-center justify-center gap-1.5 transition-all"
                >
                  <X size={14} />
                  <span>Close Menu</span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 2. macOS Spotlight Quick Search Modal (⌘K) */}
      <AnimatePresence>
        {searchOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 select-none">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSearchOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-xl rounded-3xl overflow-hidden z-10"
              style={{
                background: "rgba(255, 255, 255, 0.9)",
                backdropFilter: "blur(32px) saturate(200%)",
                WebkitBackdropFilter: "blur(32px) saturate(200%)",
                border: "1.5px solid rgba(255, 255, 255, 0.8)",
                boxShadow: "0 30px 70px rgba(0,0,0,0.35), inset 0 1px 2px rgba(255,255,255,0.9)",
              }}
            >
              <div className="flex items-center gap-3 px-5 py-3.5 sm:px-6 sm:py-4 border-b border-black/10">
                <Search className="w-5 h-5 text-black/40" />
                <input
                  type="text"
                  autoFocus
                  placeholder="Search pages, projects, services..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 bg-transparent text-[#0a0a0a] placeholder:text-black/40 text-sm sm:text-base font-medium outline-none"
                />
                <button
                  type="button"
                  onClick={() => setSearchOpen(false)}
                  className="w-8 h-8 rounded-full bg-black/5 hover:bg-black/10 flex items-center justify-center text-black/60 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="max-h-[320px] overflow-y-auto p-2.5 sm:p-3 flex flex-col gap-1.5">
                {filteredSearch.length > 0 ? (
                  filteredSearch.map((item) => (
                    <button
                      key={item.title}
                      type="button"
                      onClick={() => {
                        setSearchOpen(false);
                        router.push(item.href);
                        setIsOpen(false);
                      }}
                      className="group flex items-center justify-between px-3.5 py-2.5 sm:px-4 sm:py-3 rounded-2xl hover:bg-[#0a0a0a] hover:text-white transition-all text-left"
                    >
                      <div className="flex items-center gap-2.5 sm:gap-3">
                        <span className="text-[10px] sm:text-xs font-mono uppercase px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-lg bg-black/5 group-hover:bg-white/20 text-black/60 group-hover:text-white transition-colors">
                          {item.category}
                        </span>
                        <span className="text-xs sm:text-sm font-semibold text-black/90 group-hover:text-white transition-colors">
                          {item.title}
                        </span>
                      </div>
                      <ArrowUpRight className="w-4 h-4 text-black/30 group-hover:text-white transition-colors" />
                    </button>
                  ))
                ) : (
                  <div className="py-8 text-center text-black/40 text-sm">
                    No results found for &ldquo;{searchQuery}&rdquo;
                  </div>
                )}
              </div>

              <div className="px-5 py-2 sm:px-6 sm:py-2.5 bg-black/[0.03] border-t border-black/5 flex items-center justify-between text-[11px] text-black/40 font-mono">
                <span>Navigation Shortcut</span>
                <span className="bg-black/10 px-2 py-0.5 rounded text-black/70">ESC to close</span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}

// 3. Desktop Liquid Glass Squircle Card
function DockGlassItem({
  item,
  mouseX,
  isActive,
  isPlayingAudio,
  onNavigate,
}: {
  item: DockItemConfig;
  mouseX: MotionValue<number>;
  isActive?: boolean;
  isPlayingAudio?: boolean;
  onNavigate: (href?: string) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const [isBouncing, setIsBouncing] = useState(false);

  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const widthSync = useTransform(distance, [-120, 0, 120], [40, 60, 40]);
  const width = useSpring(widthSync, { mass: 0.1, stiffness: 360, damping: 22 });

  const handleClick = () => {
    setIsBouncing(true);
    setTimeout(() => setIsBouncing(false), 800);

    if (item.action) {
      item.action();
    } else if (item.href) {
      onNavigate(item.href);
    }
  };

  return (
    <div className="relative flex flex-col items-center justify-end">
      {/* Floating Apple-Style Frosted Tooltip */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.9 }}
            animate={{ opacity: 1, y: -48, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.9 }}
            transition={{ duration: 0.15 }}
            className="absolute pointer-events-none px-3 py-1 rounded-lg text-[11px] font-semibold text-white bg-black/90 backdrop-blur-xl shadow-xl border border-white/20 whitespace-nowrap z-50"
          >
            {item.title}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Pure Liquid Glass Squircle Card */}
      <motion.div
        ref={ref}
        style={{
          width,
          height: width,
          background: isActive
            ? "rgba(255, 255, 255, 0.88)"
            : hovered
              ? "rgba(255, 255, 255, 0.65)"
              : "rgba(255, 255, 255, 0.38)",
          backdropFilter: "blur(16px) saturate(180%)",
          WebkitBackdropFilter: "blur(16px) saturate(180%)",
          border: isActive
            ? "1.5px solid #e10600"
            : hovered
              ? "1.5px solid rgba(255, 255, 255, 0.85)"
              : "1px solid rgba(255, 255, 255, 0.55)",
          boxShadow: isActive
            ? "0 6px 20px rgba(225, 6, 0, 0.2), inset 0 1px 1.5px rgba(255, 255, 255, 0.9)"
            : hovered
              ? "0 8px 24px rgba(0, 0, 0, 0.1), inset 0 1.5px 2px rgba(255, 255, 255, 0.95)"
              : "0 2px 8px rgba(0, 0, 0, 0.05), inset 0 1px 1px rgba(255, 255, 255, 0.75)",
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={handleClick}
        animate={isBouncing ? { y: [0, -20, 0, -10, 0] } : { y: 0 }}
        transition={{ duration: 0.75, ease: "easeOut" }}
        data-cursor-hover
        className="relative rounded-[14px] sm:rounded-[17px] flex items-center justify-center cursor-pointer select-none transition-all duration-200 transform-gpu will-change-transform"
      >
        {item.renderIcon({ isPlaying: isPlayingAudio, isActive, isHovered: hovered })}
      </motion.div>

      {/* Active Dot Indicator */}
      <div className="h-1 flex items-center justify-center mt-1">
        {isActive ? (
          <span className="w-1.5 h-1.5 rounded-full bg-red shadow-[0_0_6px_rgba(225,6,0,0.8)]" />
        ) : (
          <span className="w-1.5 h-1.5" />
        )}
      </div>
    </div>
  );
}
