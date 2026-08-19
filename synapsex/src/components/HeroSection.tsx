import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import ScrambleIn from "./ScrambleIn";

const HERO_VIDEO =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260622_083515_290e5a10-0b95-41af-a5e2-32b6389baa4d.mp4";

export default function HeroSection({ entranceComplete }: { entranceComplete: boolean }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const lastXRef = useRef<number | null>(null);
  const pendingSeekRef = useRef(false);
  const targetTimeRef = useRef(0);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const onLoadedMetadata = () => {
      // Force the browser to decode and paint the first frame — without this,
      // a muted <video> with no autoplay/currentTime nudge can render as a
      // blank/black frame until the user's mouse moves.
      video.currentTime = 0.001;
      setReady(true);
    };
    video.addEventListener("loadedmetadata", onLoadedMetadata);
    return () => video.removeEventListener("loadedmetadata", onLoadedMetadata);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !ready) return;

    const SENSITIVITY = 0.8;

    const applySeek = () => {
      if (pendingSeekRef.current) return;
      pendingSeekRef.current = true;
      video.currentTime = targetTimeRef.current;
    };

    const onSeeked = () => {
      pendingSeekRef.current = false;
    };

    const onMouseMove = (e: MouseEvent) => {
      if (lastXRef.current === null) {
        lastXRef.current = e.clientX;
        return;
      }
      const deltaX = e.clientX - lastXRef.current;
      lastXRef.current = e.clientX;

      const duration = video.duration || 0;
      if (!duration) return;

      const deltaTime = (deltaX / window.innerWidth) * duration * SENSITIVITY;
      let next = targetTimeRef.current + deltaTime;
      next = Math.max(0, Math.min(duration, next));
      targetTimeRef.current = next;
      applySeek();
    };

    video.addEventListener("seeked", onSeeked);
    window.addEventListener("mousemove", onMouseMove);

    return () => {
      video.removeEventListener("seeked", onSeeked);
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, [ready]);

  return (
    <section className="relative min-h-screen h-[100dvh] w-full overflow-hidden flex flex-col">
      <video
        ref={videoRef}
        src={HERO_VIDEO}
        muted
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover"
      />

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)",
          backgroundSize: "24px 24px",
          opacity: 0.05,
        }}
        aria-hidden="true"
      />

      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
        style={{ transform: "translateY(50px)" }}
        aria-hidden="true"
      >
        <span
          className="uppercase whitespace-nowrap"
          style={{
            fontFamily: "'Anton SC', sans-serif",
            fontSize: "clamp(120px, 30vw, 521px)",
            letterSpacing: "-4px",
            opacity: 0.1,
            backgroundImage:
              "radial-gradient(circle, rgba(142,127,148,0) 0%, #8E7F94 70%)",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            color: "transparent",
          }}
        >
          TRANSCENDENCE
        </span>
      </div>

      <div className="relative z-10 flex-1 flex flex-col px-4 sm:px-6 md:px-8 pt-20 sm:pt-24 pb-8 sm:pb-12">
        <div className="flex-1" />

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: entranceComplete ? 1 : 0 }}
          transition={{ duration: 1 }}
          className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between"
        >
          <div className="flex flex-col gap-4">
            <h1 className="text-white font-light leading-[0.95] tracking-[-0.03em] text-[clamp(40px,10vw,100px)]">
              <ScrambleIn text="Brain" delay={200} triggered={entranceComplete} />
              <br />
              <ScrambleIn text="And Body" delay={500} triggered={entranceComplete} />
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 25 }}
              animate={
                entranceComplete
                  ? { opacity: 1, y: 0 }
                  : { opacity: 0, y: 25 }
              }
              transition={{ duration: 0.9, ease: [0.215, 0.61, 0.355, 1], delay: 0.2 }}
              className="max-w-sm text-[13px] sm:text-[15px] text-white/60 leading-relaxed"
            >
              Built at the intersection of neuroscience and artificial intelligence.
              SynapseX continuously maps neural pathways, cognitive load, and
              physiological states into a single adaptive intelligence layer.
            </motion.p>
          </div>

          <h1 className="text-left md:text-right text-white font-light leading-[0.95] tracking-[-0.03em] text-[clamp(40px,10vw,100px)]">
            <ScrambleIn text="One" delay={700} triggered={entranceComplete} />
            <br />
            <ScrambleIn text="Network" delay={1000} triggered={entranceComplete} />
          </h1>
        </motion.div>
      </div>
    </section>
  );
}
