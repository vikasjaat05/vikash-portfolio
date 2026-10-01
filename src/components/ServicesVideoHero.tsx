import Link from "next/link";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";

const VIDEO_SRC =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260826_041744_63efcd78-bf7d-4039-99e2-2461e8a61903.mp4";

export default function ServicesVideoHero() {
  return (
    <section className="relative flex min-h-[690px] w-full items-end overflow-hidden bg-[#10151a] text-white md:min-h-[760px] md:items-center">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_42%,#57231f_0%,#192229_34%,#10151a_72%)]" />
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover opacity-40"
        src={VIDEO_SRC}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[#10151a]/95 via-[#10151a]/75 to-[#10151a]/30" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#10151a]/80 via-transparent to-[#10151a]/35 md:hidden" />

      <div className="relative z-10 mx-auto w-full max-w-[1400px] px-6 pb-20 pt-36 sm:px-8 md:px-10 md:py-44">
        <div className="mb-8 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em] text-white/65">
          <span className="h-2 w-2 rounded-full bg-[#f04b40]" />
          What I do
        </div>
        <h1 className="max-w-[1050px] font-display text-[clamp(3.3rem,8vw,8.8rem)] font-semibold leading-[0.92] tracking-[-0.075em]">
          Ideas deserve<br />
          <span className="text-[#ff7468]">better execution.</span>
        </h1>
        <div className="mt-9 flex flex-col gap-8 md:mt-12 md:flex-row md:items-end md:justify-between">
          <p className="max-w-[610px] text-base leading-relaxed text-white/75 sm:text-lg md:text-xl">
            From the first sketch to the final line of code, I design and build digital experiences that feel considered and work hard for your business.
          </p>
          <Link href="/contact" className="inline-flex min-h-12 w-fit items-center gap-3 rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#111820] transition-colors hover:bg-[#ff7468] hover:text-white">
            Start a project <ArrowUpRight size={17} />
          </Link>
        </div>
        <Link href="#services-list" className="mt-14 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.17em] text-white/60 transition-colors hover:text-white md:mt-20">
          Explore services <ArrowDownRight size={17} />
        </Link>
      </div>
    </section>
  );
}
