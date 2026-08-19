import { ArrowUpRight } from "lucide-react";

export default function LiveProjectButton({
  href,
  className = "",
}: {
  href?: string;
  className?: string;
}) {
  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        data-cursor-hover
        className={`inline-flex items-center gap-2 rounded-full border-2 border-[#D7E2EA] text-[#D7E2EA] font-medium uppercase tracking-widest px-6 py-2.5 sm:px-8 sm:py-3 text-xs sm:text-sm hover:bg-white hover:text-black transition-colors ${className}`}
      >
        <span>Live Site</span>
        <ArrowUpRight size={16} />
      </a>
    );
  }

  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border-2 border-[#D7E2EA]/50 text-[#D7E2EA]/70 font-medium uppercase tracking-widest px-6 py-2.5 sm:px-8 sm:py-3 text-xs sm:text-sm ${className}`}
    >
      Live Project
    </span>
  );
}
