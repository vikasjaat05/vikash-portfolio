import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const roles = [
  {
    company: "Flâneur Global",
    role: "Frontend & E-commerce Developer",
    period: "2025 — Present",
  },
  {
    company: "Digital Heroes",
    role: "Shopify Developer",
    period: "2025",
  },
  {
    company: "Qudrat Studio",
    role: "Web Development & Digital Optimization",
    period: "2025",
  },
];

export default function CareerPreview() {
  return (
    <section id="journey" className="bg-white px-6 py-20 md:px-10 md:py-28">
      <div className="mx-auto max-w-[1280px]">
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-red">
              Experience
            </p>
            <h2 className="font-display text-3xl font-extrabold leading-[1.08] tracking-tight text-black sm:text-5xl md:text-6xl">
              The experience <span className="text-red">behind the work.</span>
            </h2>
          </div>
          <Link
            href="/resume"
            className="inline-flex min-h-11 w-fit items-center gap-2 rounded-full bg-[#0a0a0a] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-red"
          >
            Full experience &amp; CV <ArrowUpRight size={16} aria-hidden="true" />
          </Link>
        </div>

        <ol className="mt-10 grid gap-3 md:mt-14 md:grid-cols-3 md:gap-4">
          {roles.map((item, index) => (
            <li key={item.company} className="rounded-[24px] border border-black/10 bg-[#faf8f5] p-5 sm:p-6">
              <div className="flex items-center justify-between gap-3 border-b border-black/10 pb-4">
                <span className="font-mono text-xs font-semibold text-red">0{index + 1}</span>
                <span className="font-mono text-xs text-black/60">{item.period}</span>
              </div>
              <h3 className="mt-5 font-display text-lg font-bold text-black sm:text-xl">{item.role}</h3>
              <p className="mt-2 text-sm text-black/65">{item.company}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
