"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, Lock, AlertTriangle } from "lucide-react";

export default function DevToolsGuard() {
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    // 1. Console Self-XSS & Anti-Tamper Banner
    try {
      console.log(
        "%c🔒 VIKASH CHOUDHARY — SECURITY SENTINEL ACTIVE",
        "color: #fff; background: #e10600; font-size: 14px; font-weight: 900; padding: 6px 12px; border-radius: 6px;"
      );
      console.log(
        "%c⚠️ STOP! This browser console is reserved for authorized debugging. Pasting unknown code here can compromise your security via Self-XSS. Digital assets, design layouts, and proprietary source code on this site are protected by copyright.",
        "color: #a1a1aa; font-size: 12px; line-height: 1.5;"
      );
    } catch {
      // ignore
    }

    const showSecurityAlert = (msg: string) => {
      setToastMessage(msg);
    };

    // 2. Keyboard Shortcuts Interception
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toUpperCase();
      const isMac = navigator.platform.toUpperCase().includes("MAC");
      const cmdOrCtrl = isMac ? e.metaKey : e.ctrlKey;

      // F12 DevTools
      if (key === "F12") {
        e.preventDefault();
        e.stopPropagation();
        showSecurityAlert("Developer Tools access is disabled.");
        return;
      }

      // Ctrl+Shift+I or Cmd+Option+I (Inspect Element)
      if (cmdOrCtrl && (e.shiftKey || e.altKey) && key === "I") {
        e.preventDefault();
        e.stopPropagation();
        showSecurityAlert("Inspect Element is disabled.");
        return;
      }

      // Ctrl+Shift+J or Cmd+Option+J (Console)
      if (cmdOrCtrl && (e.shiftKey || e.altKey) && key === "J") {
        e.preventDefault();
        e.stopPropagation();
        showSecurityAlert("Console shortcut is disabled.");
        return;
      }

      // Ctrl+Shift+C or Cmd+Option+C (Element Picker)
      if (cmdOrCtrl && (e.shiftKey || e.altKey) && key === "C") {
        // Only block if not focused in an input/textarea
        const tag = (e.target as HTMLElement)?.tagName?.toLowerCase();
        if (tag !== "input" && tag !== "textarea") {
          e.preventDefault();
          e.stopPropagation();
          showSecurityAlert("Element Inspector is disabled.");
          return;
        }
      }

      // Ctrl+U or Cmd+Option+U (View Source)
      if ((cmdOrCtrl && key === "U") || (cmdOrCtrl && e.altKey && key === "U")) {
        e.preventDefault();
        e.stopPropagation();
        showSecurityAlert("Page Source inspection is protected.");
        return;
      }

      // Ctrl+S or Cmd+S (Save Page HTML/Assets)
      if (cmdOrCtrl && key === "S") {
        e.preventDefault();
        e.stopPropagation();
        showSecurityAlert("Offline saving of portfolio assets is disabled.");
        return;
      }

      // Ctrl+P or Cmd+P (Print Scraping)
      if (cmdOrCtrl && key === "P") {
        e.preventDefault();
        e.stopPropagation();
        showSecurityAlert("Page printing is disabled.");
        return;
      }
    };

    // 3. Right-Click Context Menu Interception
    const handleContextMenu = (e: MouseEvent) => {
      // Allow right-click in text inputs/textareas for normal editing
      const target = e.target as HTMLElement | null;
      const tag = target?.tagName?.toLowerCase();
      if (tag === "input" || tag === "textarea") {
        return;
      }

      e.preventDefault();
      showSecurityAlert("Content & Design Assets are Protected");
    };

    // 4. Disable Dragging of Images and Videos
    const handleDragStart = (e: DragEvent) => {
      const target = e.target as HTMLElement | null;
      if (target && (target.tagName === "IMG" || target.tagName === "VIDEO" || target.closest("img") || target.closest("video"))) {
        e.preventDefault();
      }
    };

    // 5. Production Debugger Check (Non-destructive, production-only)
    let debuggerInterval: NodeJS.Timeout | null = null;
    if (process.env.NODE_ENV === "production") {
      debuggerInterval = setInterval(() => {
        const start = performance.now();
        // eslint-disable-next-line no-debugger
        debugger;
        const duration = performance.now() - start;
        if (duration > 150) {
          // DevTools was paused on debugger
          showSecurityAlert("Debugger detected: Protected Environment.");
        }
      }, 3500);
    }

    document.addEventListener("keydown", handleKeyDown, { capture: true });
    document.addEventListener("contextmenu", handleContextMenu);
    document.addEventListener("dragstart", handleDragStart);

    return () => {
      document.removeEventListener("keydown", handleKeyDown, { capture: true });
      document.removeEventListener("contextmenu", handleContextMenu);
      document.removeEventListener("dragstart", handleDragStart);
      if (debuggerInterval) clearInterval(debuggerInterval);
    };
  }, []);

  // Auto-dismiss toast
  useEffect(() => {
    if (!toastMessage) return;
    const timer = setTimeout(() => {
      setToastMessage(null);
    }, 2400);
    return () => clearTimeout(timer);
  }, [toastMessage]);

  return (
    <AnimatePresence>
      {toastMessage && (
        <motion.aside
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          role="status"
          aria-live="polite"
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[99999] pointer-events-none select-none max-w-[92vw]"
        >
          <div className="flex items-center gap-3 px-5 py-3 rounded-full bg-[#0a0a0a]/95 text-white border border-white/15 shadow-[0_20px_50px_rgba(0,0,0,0.45)] backdrop-blur-xl">
            <div className="w-7 h-7 rounded-full bg-red/20 border border-red/40 flex items-center justify-center shrink-0">
              <Lock size={13} className="text-red" />
            </div>
            <div className="text-xs font-medium tracking-wide">
              <span className="font-bold text-white block sm:inline mr-2">
                Vikash Choudhary Security Shield
              </span>
              <span className="text-white/70">{toastMessage}</span>
            </div>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
