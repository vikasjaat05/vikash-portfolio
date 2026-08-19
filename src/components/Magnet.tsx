"use client";

import { useEffect, useRef, useState, ReactNode } from "react";

export default function MagnetEffect({
  children,
  padding = 100,
  strength = 4,
  activeTransition = "transform 0.3s ease-out",
  inactiveTransition = "transform 0.6s ease-in-out",
  className = "",
}: {
  children: ReactNode;
  padding?: number;
  strength?: number;
  activeTransition?: string;
  inactiveTransition?: string;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState("translate3d(0px, 0px, 0)");
  const [active, setActive] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const withinX = e.clientX > rect.left - padding && e.clientX < rect.right + padding;
      const withinY = e.clientY > rect.top - padding && e.clientY < rect.bottom + padding;

      if (withinX && withinY) {
        const dx = (e.clientX - centerX) / strength;
        const dy = (e.clientY - centerY) / strength;
        setActive(true);
        setTransform(`translate3d(${dx}px, ${dy}px, 0)`);
      } else {
        setActive(false);
        setTransform("translate3d(0px, 0px, 0)");
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [padding, strength]);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        transform,
        transition: active ? activeTransition : inactiveTransition,
        willChange: "transform",
      }}
    >
      {children}
    </div>
  );
}
