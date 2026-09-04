"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  X, 
  MessageCircle, 
  Send, 
  CheckCircle2, 
  Sparkles, 
  ShieldCheck, 
  ArrowRight,
  ExternalLink,
  Copy,
  Check,
  User,
  Phone,
  Mail,
  Building2,
  FileText
} from "lucide-react";
import { useCart } from "./CartContext";
import { soundFX } from "@/lib/ui-sounds";

const VIKASH_WHATSAPP_NUMBER = "918000165311"; // +91 8000165311

export default function CheckoutModal() {
  const {
    items,
    isCheckoutOpen,
    setIsCheckoutOpen,
    currency,
    formattedTotal,
    clearCart,
  } = useCart();

  const [buyerName, setBuyerName] = useState("");
  const [buyerPhone, setBuyerPhone] = useState("");
  const [buyerEmail, setBuyerEmail] = useState("");
  const [buyerCompany, setBuyerCompany] = useState("");
  const [buyerNotes, setBuyerNotes] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [generatedWhatsAppUrl, setGeneratedWhatsAppUrl] = useState("");
  const [generatedMessageText, setGeneratedMessageText] = useState("");
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");

  const totalAmount = formattedTotal;
  const itemsList = items.length > 0 
    ? items.map((i) => `• ${i.item.title} (${i.item.categoryLabel})`).join("\n")
    : "• Custom Portfolio Theme Inquiry";

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!buyerName.trim() || !buyerPhone.trim() || !buyerEmail.trim()) {
      setError("Please fill in your Name, WhatsApp Number, and Email.");
      return;
    }

    setError("");
    soundFX.playPurchaseChime();

    // Construct clean, beautifully structured WhatsApp message
    const waMessage = `🛍️ *NEW PORTFOLIO THEME ORDER INQUIRY*
━━━━━━━━━━━━━━━━━━━━
📦 *Selected Theme(s):*
${itemsList}

💰 *Total Amount:* ${totalAmount} (${currency})
━━━━━━━━━━━━━━━━━━━━
👤 *Customer Information:*
• *Name:* ${buyerName.trim()}
• *WhatsApp / Phone:* ${buyerPhone.trim()}
• *Email:* ${buyerEmail.trim()}
• *Company / Brand:* ${buyerCompany.trim() || "Individual Founder / Creator"}

📝 *Requirements / Message:*
"${buyerNotes.trim() || "I would like to acquire this theme with full commercial license and setup."}"

🌐 *Source:* https://vikash.website/buy-portfolio
━━━━━━━━━━━━━━━━━━━━
Hi Vikash! I have submitted this theme order inquiry on your store. Please share the source code and payment details!`;

    const encoded = encodeURIComponent(waMessage);
    const waUrl = `https://wa.me/${VIKASH_WHATSAPP_NUMBER}?text=${encoded}`;

    setGeneratedWhatsAppUrl(waUrl);
    setGeneratedMessageText(waMessage);
    setIsSubmitted(true);

    // Save lead in background via /api/contact as backup
    try {
      fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: buyerName,
          email: buyerEmail,
          company: buyerCompany ? `${buyerCompany} (Phone: ${buyerPhone})` : `Phone: ${buyerPhone}`,
          budget: totalAmount,
          service: `WhatsApp Order: ${items.map((i) => i.item.title).join(", ") || "Portfolio Theme"}`,
          message: waMessage,
        }),
      }).catch(() => {});
    } catch {
      // Ignore background network errors
    }

    // Automatically open WhatsApp in a new tab
    if (typeof window !== "undefined") {
      window.open(waUrl, "_blank", "noopener,noreferrer");
    }
  };

  const handleCopyMessage = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(generatedMessageText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleClose = () => {
    setIsCheckoutOpen(false);
    // If order was submitted, clear cart after closing
    if (isSubmitted) {
      clearCart();
      setIsSubmitted(false);
      setBuyerName("");
      setBuyerPhone("");
      setBuyerEmail("");
      setBuyerCompany("");
      setBuyerNotes("");
    }
  };

  return (
    <AnimatePresence>
      {isCheckoutOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto select-none">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/75 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.25 }}
            className="relative w-full max-w-lg rounded-3xl p-6 sm:p-8 bg-white text-[#0a0a0a] shadow-2xl border border-black/10 z-10 my-8 max-h-[92vh] overflow-y-auto"
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={handleClose}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-black/[0.04] hover:bg-black/[0.08] flex items-center justify-center text-black/60 hover:text-black transition-colors cursor-pointer"
            >
              <X size={16} />
            </button>

            {!isSubmitted ? (
              <>
                {/* Form Header */}
                <div className="mb-5 pr-8">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-mono font-bold uppercase tracking-wider mb-2.5 border border-emerald-200/60">
                    <MessageCircle size={13} className="text-emerald-600" />
                    <span>Direct WhatsApp Connection</span>
                  </div>
                  <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-[#0a0a0a] tracking-tight leading-snug">
                    Order Theme &amp; Connect
                  </h3>
                  <p className="text-xs sm:text-sm text-black/60 mt-1 leading-relaxed">
                    Fill in your details below. Your order will be sent directly to Vikash&apos;s WhatsApp (<strong>+91 8000165311</strong>) for instant source code delivery &amp; setup.
                  </p>
                </div>

                {/* Selected Item Summary Card */}
                <div className="mb-5 p-3.5 rounded-2xl bg-[#faf8f5] border border-black/[0.06] space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono uppercase font-bold text-black/50">
                      Selected Item ({items.length || 1})
                    </span>
                    <span className="font-display text-base font-black text-red">
                      {totalAmount}
                    </span>
                  </div>

                  <div className="space-y-1">
                    {items.length > 0 ? (
                      items.map((i) => (
                        <div key={i.item.id} className="flex items-center justify-between text-xs text-black/80 font-medium">
                          <span className="truncate max-w-[240px]">• {i.item.title}</span>
                          <span className="font-mono text-black/60 text-[11px]">{i.item.categoryLabel}</span>
                        </div>
                      ))
                    ) : (
                      <div className="text-xs text-black/80 font-medium">
                        • Victor — Graphic Designer Portfolio
                      </div>
                    )}
                  </div>

                  <div className="pt-2 border-t border-black/[0.05] flex items-center justify-between text-[11px] font-mono text-black/55">
                    <span className="flex items-center gap-1 text-emerald-700 font-semibold">
                      <ShieldCheck size={12} />
                      Commercial License Included
                    </span>
                    <span>No Payment Gateway Wait</span>
                  </div>
                </div>

                {error && (
                  <div className="mb-4 p-3 rounded-xl bg-red/10 text-red text-xs border border-red/20 font-medium">
                    {error}
                  </div>
                )}

                {/* Main Order Form */}
                <form onSubmit={handleFormSubmit} className="space-y-3.5">
                  {/* Name */}
                  <div>
                    <label className="block text-[11px] font-mono uppercase font-semibold text-black/70 mb-1">
                      Full Name *
                    </label>
                    <div className="relative">
                      <User size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-black/40" />
                      <input
                        type="text"
                        required
                        value={buyerName}
                        onChange={(e) => setBuyerName(e.target.value)}
                        placeholder="e.g. Rahul Sharma / Alex Hunter"
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-black/[0.03] border border-black/[0.1] focus:border-emerald-600 focus:bg-white text-sm outline-none font-medium text-[#0a0a0a] transition-all"
                      />
                    </div>
                  </div>

                  {/* Phone & Email in 2 columns */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {/* WhatsApp Phone */}
                    <div>
                      <label className="block text-[11px] font-mono uppercase font-semibold text-black/70 mb-1">
                        WhatsApp Number *
                      </label>
                      <div className="relative">
                        <Phone size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-black/40" />
                        <input
                          type="tel"
                          required
                          value={buyerPhone}
                          onChange={(e) => setBuyerPhone(e.target.value)}
                          placeholder="+91 98765 43210"
                          className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-black/[0.03] border border-black/[0.1] focus:border-emerald-600 focus:bg-white text-sm outline-none font-medium text-[#0a0a0a] transition-all"
                        />
                      </div>
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-[11px] font-mono uppercase font-semibold text-black/70 mb-1">
                        Email Address *
                      </label>
                      <div className="relative">
                        <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-black/40" />
                        <input
                          type="email"
                          required
                          value={buyerEmail}
                          onChange={(e) => setBuyerEmail(e.target.value)}
                          placeholder="yourname@gmail.com"
                          className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-black/[0.03] border border-black/[0.1] focus:border-emerald-600 focus:bg-white text-sm outline-none font-medium text-[#0a0a0a] transition-all"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Company / Brand (Optional) */}
                  <div>
                    <label className="block text-[11px] font-mono uppercase font-semibold text-black/70 mb-1">
                      Company / Brand Name <span className="text-black/40 font-normal">(Optional)</span>
                    </label>
                    <div className="relative">
                      <Building2 size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-black/40" />
                      <input
                        type="text"
                        value={buyerCompany}
                        onChange={(e) => setBuyerCompany(e.target.value)}
                        placeholder="e.g. Studio Vertex or personal portfolio"
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-black/[0.03] border border-black/[0.1] focus:border-emerald-600 focus:bg-white text-sm outline-none font-medium text-[#0a0a0a] transition-all"
                      />
                    </div>
                  </div>

                  {/* Requirements / Notes (Optional) */}
                  <div>
                    <label className="block text-[11px] font-mono uppercase font-semibold text-black/70 mb-1">
                      Requirements / Message <span className="text-black/40 font-normal">(Optional)</span>
                    </label>
                    <div className="relative">
                      <FileText size={15} className="absolute left-3.5 top-3 text-black/40" />
                      <textarea
                        rows={2}
                        value={buyerNotes}
                        onChange={(e) => setBuyerNotes(e.target.value)}
                        placeholder="e.g. Want setup assistance on Vercel, need custom color palette, etc."
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-black/[0.03] border border-black/[0.1] focus:border-emerald-600 focus:bg-white text-sm outline-none font-medium text-[#0a0a0a] transition-all resize-none"
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      data-cursor-hover
                      className="w-full py-4 px-6 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-2.5 shadow-[0_10px_25px_rgba(16,185,129,0.35)] active:scale-[0.99] transition-all cursor-pointer"
                    >
                      <MessageCircle size={18} />
                      <span>Send Order via WhatsApp 💬</span>
                      <ArrowRight size={15} />
                    </button>
                  </div>

                  {/* Direct Contact reassurance */}
                  <div className="text-center pt-1">
                    <p className="text-[11px] text-black/50 font-mono">
                      🔒 Your details will be sent directly to Vikash&apos;s WhatsApp (<strong className="text-black/80">+91 8000165311</strong>).
                    </p>
                  </div>
                </form>
              </>
            ) : (
              /* Success / WhatsApp Redirect Screen */
              <div className="py-6 text-center space-y-5">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
                  <CheckCircle2 size={36} />
                </div>

                <div>
                  <span className="text-xs font-mono uppercase tracking-wider text-emerald-700 font-bold block mb-1">
                    Order Details Prepared!
                  </span>
                  <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-[#0a0a0a]">
                    Redirecting to WhatsApp...
                  </h3>
                  <p className="text-xs sm:text-sm text-black/60 mt-1.5 max-w-sm mx-auto leading-relaxed">
                    Thank you, <strong>{buyerName}</strong>! Your order message has been formatted. If WhatsApp did not open automatically, click the button below:
                  </p>
                </div>

                {/* Big Green Direct WhatsApp Button */}
                <div className="space-y-2.5 pt-2">
                  <a
                    href={generatedWhatsAppUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor-hover
                    className="w-full py-4 px-6 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2.5 shadow-[0_10px_25px_rgba(16,185,129,0.4)] hover:scale-[1.01] active:scale-[0.99] transition-all"
                  >
                    <MessageCircle size={18} />
                    <span>Open WhatsApp Chat Now (+91 8000165311)</span>
                    <ExternalLink size={15} />
                  </a>

                  <button
                    type="button"
                    onClick={handleCopyMessage}
                    data-cursor-hover
                    className="w-full py-2.5 px-4 rounded-xl border border-black/10 hover:bg-black/[0.03] text-xs font-mono font-semibold text-black/70 flex items-center justify-center gap-2 transition-colors cursor-pointer"
                  >
                    {copied ? (
                      <>
                        <Check size={14} className="text-emerald-600" />
                        <span>Copied Message to Clipboard!</span>
                      </>
                    ) : (
                      <>
                        <Copy size={14} />
                        <span>Copy Order Message Text</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Done / Close Button */}
                <div className="pt-3 border-t border-black/[0.06]">
                  <button
                    type="button"
                    onClick={handleClose}
                    className="text-xs text-black/50 hover:text-black font-semibold font-mono uppercase tracking-wider"
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
  );
}
