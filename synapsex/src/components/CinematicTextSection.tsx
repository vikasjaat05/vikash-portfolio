import { useRef } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionTemplate,
} from "framer-motion";

const VIDEO_URL =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260622_092455_089c54f8-3b03-4966-9df1-e9746063d0ef.mp4";

export default function CinematicTextSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 15,
    damping: 32,
    mass: 1.8,
  });

  const yScaleValue = useTransform(smoothProgress, [0, 1], [60, -120]);
  const translateY = useMotionTemplate`${yScaleValue}px`;
  const opacity = useTransform(smoothProgress, [0.3, 0.5], [0, 1]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen h-[100dvh] w-full overflow-hidden"
    >
      <video
        src={VIDEO_URL}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover"
      />

      <div
        className="absolute top-0 left-0 right-0 z-10"
        style={{
          height: 180,
          background: "linear-gradient(to bottom, #010103, transparent)",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 h-full flex items-center justify-center">
        <div style={{ perspective: 400 }}>
          <motion.p
            style={{
              transform: `rotateX(24deg) translateZ(15px)`,
              translateY,
              opacity,
            }}
            className="max-w-5xl font-sans font-normal text-[22px] sm:text-[30px] md:text-[36px] lg:text-[42px] text-white leading-[1.35] tracking-[-0.02em] select-none px-6 sm:px-12 text-center"
          >
            A neural-AI interface built on the architecture of the human
            nervous system. SynapseX translates synaptic activity into
            computational intelligence. Every signal becomes measurable,
            structured, and visible. It continuously reconstructs internal
            state as a dynamic neural map. Biological noise is filtered into
            actionable cognitive patterns.
          </motion.p>
        </div>
      </div>
    </section>
  );
}
