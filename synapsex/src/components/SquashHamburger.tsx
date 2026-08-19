import { motion } from "framer-motion";

export default function SquashHamburger({
  open,
  isMobile = false,
}: {
  open: boolean;
  isMobile?: boolean;
}) {
  const width = isMobile ? 15 : 18;
  const height = isMobile ? 10 : 12;
  const barHeight = isMobile ? 1.2 : 1.5;
  const spring = { type: "spring" as const, stiffness: 300, damping: 20 };

  return (
    <div
      className="relative"
      style={{ width, height }}
      aria-hidden="true"
    >
      <motion.span
        className="absolute left-0 right-0 bg-white rounded-full"
        style={{ height: barHeight, top: 0 }}
        animate={
          open
            ? { rotate: 45, top: height / 2 - barHeight / 2 }
            : { rotate: 0, top: 0 }
        }
        transition={spring}
      />
      <motion.span
        className="absolute left-0 right-0 bg-white rounded-full"
        style={{ height: barHeight, top: height / 2 - barHeight / 2 }}
        animate={open ? { opacity: 0, scale: 0.4 } : { opacity: 1, scale: 1 }}
        transition={spring}
      />
      <motion.span
        className="absolute left-0 right-0 bg-white rounded-full"
        style={{ height: barHeight, bottom: 0 }}
        animate={
          open
            ? { rotate: -45, bottom: height / 2 - barHeight / 2 }
            : { rotate: 0, bottom: 0 }
        }
        transition={spring}
      />
    </div>
  );
}
