"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Check, 
  Sparkles, 
  ArrowRight, 
  X, 
  MessageCircle, 
  Send, 
  Loader2, 
  CheckCircle2, 
  ShieldCheck, 
  Zap, 
  Code2, 
  Crown 
} from "lucide-react";

type Tier = {
  id: string;
  name: string;
  tagline: string;
  priceUsd: string;
  priceInr: string;
  popular?: boolean;
  badge?: string;
  features: string[];
  ctaText: string;
  accent: string;
};

const TIERS: Tier[] = [
  {
    id: "source-code",
    name: "Source Code License",
    tagline: "For developers and engineers who want full source code & instant self-deployment.",
    priceUsd: "$149",
    priceInr: "₹11,999",
    badge: "Instant Access",
    accent: "border-white/15 bg-white/[0.03]",
    features: [
      "Complete Next.js 16 + React 19 repository",
      "Tailwind CSS v4 & bespoke luxury styling",
      "Liquid glass floating dock & smooth scrolling",
      "Ambient sound engine & interactive audio",
      "Supabase PIN-protected CMS & migrations",
      "1-Click Vercel deployment configuration",
      "Full commercial license for personal/client site",
      "Lifetime updates & bug fix releases",
    ],
    ctaText: "Get Source Code",
  },
  {
    id: "turnkey",
    name: "Turnkey Launch",
    tagline: "Vikash personally customizes, configures, and launches your portfolio in 48 hours.",
    priceUsd: "$399",
    priceInr: "₹29,999",
    popular: true,
    badge: "Most Popular — Done For You",
    accent: "border-red/60 bg-gradient-to-b from-red/[0.08] to-transparent shadow-[0_0_40px_rgba(225,6,0,0.2)]",
    features: [
      "Everything in Source Code License included",
      "Done-For-You setup directly by Vikash Choudhary",
      "Custom domain & DNS routing (Vercel/Cloudflare)",
      "Upload your bio, work, resume & up to 10 projects",
      "Custom accent palette & brand identity alignment",
      "Automated contact form wiring & spam shield",
      "SEO metadata & OpenGraph social share cards",
      "30 days dedicated VIP priority support",
    ],
    ctaText: "Claim Turnkey Launch",
  },
  {
    id: "bespoke",
    name: "Bespoke 3D Cyber",
    tagline: "A 1-of-1 bespoke digital flagship crafted specifically for high-growth tech founders & agencies.",
    priceUsd: "$999+",
    priceInr: "₹79,999+",
    badge: "1-of-1 Signature Build",
    accent: "border-white/15 bg-white/[0.03]",
    features: [
      "Everything in Turnkey Launch included",
      "100% custom 3D ambient concept & bespoke physics",
      "Interactive shaders or 3D Spline elements",
      "Multi-member agency architecture & CMS roles",
      "Custom lead capture & booking calendar integrations",
      "Direct private WhatsApp / Slack channel with Vikash",
      "Multi-round design revisions until 100% satisfied",
      "Priority post-launch maintenance & retainer option",
    ],
    ctaText: "Request Bespoke Build",
  },
];

export default function BuyPortfolioTiers() {
  const [selectedTier, setSelectedTier] = useState<Tier | null>(null);
  const [currency, setCurrency] = useState<"USD" | "INR">("USD");

  // Modal form states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleOpenModal = (tier: Tier) => {
    setSelectedTier(tier);
    setSubmitted(false);
    setError("");
  };

  const handleCloseModal = () => {
    setSelectedTier(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTier) return;
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          company: phone ? `Phone/WhatsApp: ${phone}` : "Buy Portfolio Inquiry",
          budget: `${currency === "USD" ? selectedTier.priceUsd : selectedTier.priceInr} (${currency})`,
          service: `Buy Portfolio: ${selectedTier.name}`,
          message: `Package Selected: ${selectedTier.name} (${currency === "USD" ? selectedTier.priceUsd : selectedTier.priceInr})\n\nClient Notes:\n${notes || "No additional notes provided."}\n\nPhone/WhatsApp: ${phone || "Not provided"}`,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to submit inquiry. Please try again.");
      }

      setSubmitted(true);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const getWhatsAppUrl = (tierName: string) => {
    const text = encodeURIComponent(
      `Hi Vikash! I am interested in purchasing your portfolio: "${tierName}". Can we discuss the setup and onboarding?`
    );
    return `https://wa.me/918185000000?text=${text}`;
  };

  return (
    <section id="packages" className="relative bg-[#0a0a0a] text-white py-24 sm:py-32 px-4 sm:px-6 md:px-12 border-t border-white/10">
      <div className="max-w-[1280px] mx-auto">
        {/* Section Heading & Currency Switcher */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 sm:mb-20">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-red mb-3">
              <Sparkles size={14} />
              <span>Investment &amp; Packages</span>
            </div>
            <h2 className="font-display text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white leading-tight">
              Select Your <span className="text-red font-serif italic" style={{ fontFamily: "'Instrument Serif', serif" }}>Acquisition</span> Tier
            </h2>
            <p className="text-white/60 text-sm sm:text-base mt-3 max-w-xl">
              Transparent pricing with no recurring monthly subscriptions. Buy the full source code or let us launch it for you.
            </p>
          </div>

          {/* Currency Toggle */}
          <div className="inline-flex items-center p-1 rounded-full bg-white/10 border border-white/15 backdrop-blur-md self-start md:self-auto">
            <button
              type="button"
              onClick={() => setCurrency("USD")}
              data-cursor-hover
              className={`px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider transition-all ${
                currency === "USD"
                  ? "bg-red text-white shadow-md"
                  : "text-white/70 hover:text-white"
              }`}
            >
              USD ($)
            </button>
            <button
              type="button"
              onClick={() => setCurrency("INR")}
              data-cursor-hover
              className={`px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider transition-all ${
                currency === "INR"
                  ? "bg-red text-white shadow-md"
                  : "text-white/70 hover:text-white"
              }`}
            >
              INR (₹)
            </button>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {TIERS.map((tier) => (
            <motion.div
              key={tier.id}
              whileHover={{ y: -6 }}
              transition={{ duration: 0.3 }}
              className={`relative rounded-3xl p-7 sm:p-9 border flex flex-col justify-between backdrop-blur-xl transition-all ${tier.accent}`}
            >
              {/* Top Badge */}
              <div className="flex items-center justify-between gap-2 mb-6">
                <span className="text-xs font-mono uppercase tracking-widest px-3 py-1 rounded-full bg-white/10 border border-white/10 text-white/80">
                  {tier.badge}
                </span>
                {tier.popular && (
                  <span className="flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-white bg-red px-3 py-1 rounded-full shadow-[0_0_12px_rgba(225,6,0,0.6)]">
                    <Crown size={12} />
                    Popular
                  </span>
                )}
              </div>

              {/* Title & Description */}
              <div>
                <h3 className="font-display text-2xl sm:text-3xl font-bold text-white mb-2">
                  {tier.name}
                </h3>
                <p className="text-white/60 text-xs sm:text-sm leading-relaxed mb-6">
                  {tier.tagline}
                </p>

                {/* Price Display */}
                <div className="flex items-baseline gap-2 mb-8 pb-8 border-b border-white/10">
                  <span className="font-display text-4xl sm:text-5xl font-black text-white">
                    {currency === "USD" ? tier.priceUsd : tier.priceInr}
                  </span>
                  <span className="text-xs sm:text-sm font-mono text-white/50">
                    / one-time payment
                  </span>
                </div>

                {/* Feature Bullet List */}
                <ul className="space-y-3.5 mb-10">
                  {tier.features.map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-white/80">
                      <div className="mt-0.5 w-4 h-4 rounded-full bg-red/20 text-red flex items-center justify-center shrink-0">
                        <Check size={11} strokeWidth={3} />
                      </div>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Bottom Action CTAs */}
              <div className="space-y-3 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => handleOpenModal(tier)}
                  data-cursor-hover
                  className={`w-full py-3.5 px-6 rounded-2xl font-semibold text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition-all duration-300 shadow-lg ${
                    tier.popular
                      ? "bg-red hover:bg-red-dark text-white shadow-[0_8px_24px_rgba(225,6,0,0.4)]"
                      : "bg-white text-black hover:bg-white/90"
                  }`}
                >
                  <span>{tier.ctaText}</span>
                  <ArrowRight size={15} />
                </button>

                <a
                  href={getWhatsAppUrl(tier.name)}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor-hover
                  className="w-full py-2.5 px-4 rounded-xl text-[11px] font-medium tracking-wide flex items-center justify-center gap-1.5 text-white/70 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 transition-all"
                >
                  <MessageCircle size={14} className="text-emerald-400" />
                  <span>Chat on WhatsApp about this tier</span>
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Security & Guarantee Note */}
        <div className="mt-14 p-6 rounded-2xl bg-white/[0.02] border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <ShieldCheck size={28} className="text-emerald-400 shrink-0" />
            <div>
              <div className="font-semibold text-sm text-white">Full Source &amp; IP Transfer Guarantee</div>
              <div className="text-xs text-white/50">
                You receive 100% complete clean un-obfuscated code with complete commercial rights.
              </div>
            </div>
          </div>
          <div className="flex items-center gap-6 text-xs text-white/60 font-mono">
            <span>• No recurring vendor lock-in</span>
            <span>• Direct developer access</span>
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* ORDER / INQUIRY MODAL                                     */}
      {/* ========================================================= */}
      <AnimatePresence>
        {selectedTier && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleCloseModal}
              className="fixed inset-0 bg-black/80 backdrop-blur-md"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.25 }}
              className="relative w-full max-w-lg rounded-3xl p-6 sm:p-8 bg-[#111111] border border-white/20 shadow-2xl text-white z-10 my-8"
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={handleCloseModal}
                className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/70 hover:text-white transition-colors"
              >
                <X size={16} />
              </button>

              {!submitted ? (
                <>
                  <div className="mb-6">
                    <span className="text-[11px] font-mono uppercase tracking-widest text-red px-2.5 py-0.5 rounded-md bg-red/10 border border-red/20">
                      Acquisition Inquiry
                    </span>
                    <h3 className="font-display text-2xl sm:text-3xl font-bold mt-2">
                      {selectedTier.name}
                    </h3>
                    <p className="text-white/60 text-xs sm:text-sm mt-1">
                      Amount:{" "}
                      <span className="text-white font-bold">
                        {currency === "USD" ? selectedTier.priceUsd : selectedTier.priceInr} ({currency})
                      </span>
                    </p>
                  </div>

                  {error && (
                    <div className="mb-4 p-3 rounded-xl bg-red/10 border border-red/30 text-red text-xs">
                      {error}
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-white/60 mb-1.5">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Alex Hunter"
                        className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/15 focus:border-red outline-none text-sm text-white placeholder:text-white/30 transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-white/60 mb-1.5">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="alex@example.com"
                        className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/15 focus:border-red outline-none text-sm text-white placeholder:text-white/30 transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-white/60 mb-1.5">
                        WhatsApp / Phone Number (Optional)
                      </label>
                      <input
                        type="text"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+1 (555) 000-0000 or +91 98765 43210"
                        className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/15 focus:border-red outline-none text-sm text-white placeholder:text-white/30 transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-white/60 mb-1.5">
                        Custom Domain / Project Notes
                      </label>
                      <textarea
                        rows={3}
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder="Tell us about your portfolio goals, your target launch date, or domain name..."
                        className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/15 focus:border-red outline-none text-sm text-white placeholder:text-white/30 transition-colors resize-none"
                      />
                    </div>

                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3 rounded-xl bg-red hover:bg-red-dark text-white font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_8px_20px_rgba(225,6,0,0.4)] disabled:opacity-60 transition-all"
                      >
                        {loading ? (
                          <>
                            <Loader2 size={16} className="animate-spin" />
                            <span>Processing...</span>
                          </>
                        ) : (
                          <>
                            <span>Send Purchase Request</span>
                            <Send size={14} />
                          </>
                        )}
                      </button>
                    </div>

                    <div className="text-center pt-2">
                      <span className="text-white/40 text-xs">or prefer instant reply?</span>
                      <a
                        href={getWhatsAppUrl(selectedTier.name)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-1.5 flex items-center justify-center gap-2 text-xs font-semibold text-emerald-400 hover:text-emerald-300"
                      >
                        <MessageCircle size={15} />
                        <span>Chat directly with Vikash on WhatsApp</span>
                      </a>
                    </div>
                  </form>
                </>
              ) : (
                /* Success State */
                <div className="text-center py-8">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-4 border border-emerald-500/30">
                    <CheckCircle2 size={32} />
                  </div>
                  <h3 className="font-display text-2xl font-bold mb-2">
                    Request Received!
                  </h3>
                  <p className="text-white/70 text-sm max-w-sm mx-auto mb-6">
                    Thank you {name}. We have received your order details for the{" "}
                    <span className="text-white font-semibold">{selectedTier.name}</span>. 
                    Vikash will personally reach out via email within a few hours.
                  </p>
                  <div className="flex flex-col gap-2.5">
                    <a
                      href={getWhatsAppUrl(selectedTier.name)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-3 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors shadow-lg"
                    >
                      <MessageCircle size={16} />
                      <span>Continue on WhatsApp Now</span>
                    </a>
                    <button
                      type="button"
                      onClick={handleCloseModal}
                      className="w-full py-2.5 text-xs text-white/50 hover:text-white"
                    >
                      Close Window
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
