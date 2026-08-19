"use client";

import { useEffect } from "react";

export default function DevToolsGuard() {
  useEffect(() => {
    const blockKeys = (e: KeyboardEvent) => {
      const key = e.key.toUpperCase();
      const isF12 = key === "F12";
      const isViewSource = e.ctrlKey && key === "U";

      if (isF12 || isViewSource) {
        e.preventDefault();
      }
    };

    document.addEventListener("keydown", blockKeys);

    return () => {
      document.removeEventListener("keydown", blockKeys);
    };
  }, []);

  return null;
}
