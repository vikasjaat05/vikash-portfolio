import { motion } from "framer-motion";

const VIDEO_URL =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260622_095750_32a52ce0-2005-45c9-9093-41f03fde9530.mp4";

const FEATURES = [
  {
    title: "Cortical Mapping",
    desc: "Real-time spatial reconstruction of active neural regions.",
  },
  {
    title: "Signal Isolation",
    desc: "Separates cognitive intent from biological noise.",
  },
  {
    title: "State Prediction",
    desc: "Anticipates cognitive transitions before they occur.",
  },
  {
    title: "Loop Feedback",
    desc: "Closed-loop adjustment based on outcome correlation.",
  },
];

export default function TechnologySection() {
  return (
    <section className="relative min-h-screen h-[100dvh] w-full overflow-hidden flex flex-col px-8 sm:px-12 md:px-16 py-12 sm:py-16">
      <video
        src={VIDEO_URL}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover"
      />

      <div className="relative z-10 flex flex-col md:flex-row md:justify-between md:items-start gap-6">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1 }}
          className="text-white font-light text-[clamp(36px,8vw,72px)] leading-[0.95] tracking-[-0.03em]"
        >
          Adaptive
          <br />
          Intelligence
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-white/50 text-[13px] sm:text-[15px] leading-relaxed max-w-xs md:text-right md:pt-2"
        >
          The system learns your neural baseline within 72 hours. From there,
          every cognitive state is mapped, predicted, and optimized in real
          time.
        </motion.p>
      </div>

      <div className="flex-1" />

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 1, delay: 0.3 }}
        className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-6"
      >
        {FEATURES.map((feature, i) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, delay: i * 0.1 }}
          >
            <p className="text-white text-[14px] sm:text-[16px] font-normal mb-2">
              {feature.title}
            </p>
            <p className="text-white/40 text-[12px] sm:text-[14px] leading-relaxed">
              {feature.desc}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
