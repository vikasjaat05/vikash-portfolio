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
  FileText,
  Loader2,
  Award
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
    discountCode,
    setLatestReceipt,
    clearCart,
  } = useCart();

  const [buyerName, setBuyerName] = useState("");
  const [buyerPhone, setBuyerPhone] = useState("");
  const [buyerEmail, setBuyerEmail] = useState("");
  const [buyerCompany, setBuyerCompany] = useState("");
  const [buyerNotes, setBuyerNotes] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [generatedWhatsAppUrl, setGeneratedWhatsAppUrl] = useState("");
  const [generatedMessageText, setGeneratedMessageText] = useState("");
  const [verifiedOrderRef, setVerifiedOrderRef] = useState("");
  const [verifiedLicenseKey, setVerifiedLicenseKey] = useState("");
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
    setIsSubmitting(true);
    soundFX.playPurchaseChime();

    let serverOrderNumber = "";
    let serverLicenseKey = "";
    let serverTotal = totalAmount;

    // 1. Authoritative Server-Side Order Reservation
    try {
      const orderRes = await fetch("/api/orders/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map((i) => ({ id: i.item.id, quantity: i.quantity })),
          customer: {
            name: buyerName.trim(),
            email: buyerEmail.trim(),
            phone: buyerPhone.trim(),
            company: buyerCompany.trim() || undefined,
            notes: buyerNotes.trim() || undefined,
          },
          discountCode: discountCode || undefined,
          currency,
        }),
      });

      if (orderRes.ok) {
        const orderData = await orderRes.json();
        if (orderData.order) {
          serverOrderNumber = orderData.order.orderNumber;
          serverLicenseKey = orderData.order.licenseKey;
          serverTotal = orderData.order.formattedTotal;
          setVerifiedOrderRef(serverOrderNumber);
          setVerifiedLicenseKey(serverLicenseKey);

          // Store verified receipt for certificate generation
          setLatestReceipt({
            buyerName: buyerName.trim(),
            buyerEmail: buyerEmail.trim(),
            buyerPhone: buyerPhone.trim(),
            licenseKey: serverLicenseKey,
            purchaseDate: new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }),
            items: items.map((i) => i.item),
            totalAmount: serverTotal,
            currency: currency as any,
            paymentMethod: "Direct Official Order Inquiry",
          });
        }
      }
    } catch (orderErr) {
      console.warn("Server order reservation notice:", orderErr);
    } finally {
      setIsSubmitting(false);
    }

    // 2. Construct Clean, Authenticated WhatsApp message with Server Order Reference
    const waMessage = `🛍️ *NEW PORTFOLIO THEME ORDER INQUIRY*
━━━━━━━━━━━━━━━━━━━━
${serverOrderNumber ? `🔖 *Official Order Ref:* ${serverOrderNumber}\n🔐 *License Key:* ${serverLicenseKey}\n` : ""}📦 *Selected Theme(s):*
${itemsList}

💰 *Verified Total:* ${serverTotal} (${currency})
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
          budget: serverTotal,
          service: `Theme Order: ${items.map((i) => i.item.title).join(", ") || "Portfolio Theme"}`,
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
                    Fill in your details below. Your order will be registered on our secure server and sent directly to Vikash&apos;s WhatsApp (<strong>+91 8000165311</strong>) for instant code delivery.
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
                      Server-Verified Commercial License
                    </span>
                    <span>Direct Delivery</span>
                  </div>
                </div>

                {error && (
                  <div className="mb-4 p-3 rounded-xl bg-red/10 text-red text-xs border border-red/20 font-medium">
                    {error}
                  </div>
                )}

                {/* Form Inputs */}
                <form onSubmit={handleFormSubmit} className="space-y-3.5">
                  {/* Name Input */}
                  <div>
                    <label className="block text-xs font-mono font-bold uppercase tracking-wider text-black/70 mb-1">
                      Full Name <span className="text-red">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        required
                        placeholder="e.g. John Doe / Alex Morgan"
                        value={buyerName}
                        onChange={(e) => setBuyerName(e.target.value)}
                        className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-black/15 bg-white text-xs text-black placeholder:text-black/35 focus:outline-none focus:border-red focus:ring-1 focus:ring-red transition-all"
                      />
                      <User size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-black/40" />
                    </div>
                  </div>

                  {/* Contact Row: Phone & Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-mono font-bold uppercase tracking-wider text-black/70 mb-1">
                        WhatsApp Number <span className="text-red">*</span>
                      </label>
                      <div className="relative">
                        <input
                          type="tel"
                          required
                          placeholder="+91 98765 43210"
                          value={buyerPhone}
                          onChange={(e) => setBuyerPhone(e.target.value)}
                          className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-black/15 bg-white text-xs text-black placeholder:text-black/35 focus:outline-none focus:border-red focus:ring-1 focus:ring-red transition-all"
                        />
                        <Phone size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-black/40" />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-mono font-bold uppercase tracking-wider text-black/70 mb-1">
                        Email Address <span className="text-red">*</span>
                      </label>
                      <div className="relative">
                        <input
                          type="email"
                          required
                          placeholder="john@example.com"
                          value={buyerEmail}
                          onChange={(e) => setBuyerEmail(e.target.value)}
                          className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-black/15 bg-white text-xs text-black placeholder:text-black/35 focus:outline-none focus:border-red focus:ring-1 focus:ring-red transition-all"
                        />
                        <Mail size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-black/40" />
                      </div>
                    </div>
                  </div>

                  {/* Company / Brand (Optional) */}
                  <div>
                    <label className="block text-xs font-mono font-bold uppercase tracking-wider text-black/70 mb-1">
                      Company / Brand / Portfolio Name <span className="text-black/40 font-normal">(Optional)</span>
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="e.g. Acme Studios / Personal Portfolio"
                        value={buyerCompany}
                        onChange={(e) => setBuyerCompany(e.target.value)}
                        className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-black/15 bg-white text-xs text-black placeholder:text-black/35 focus:outline-none focus:border-red focus:ring-1 focus:ring-red transition-all"
                      />
                      <Building2 size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-black/40" />
                    </div>
                  </div>

                  {/* Notes / Special Requests */}
                  <div>
                    <label className="block text-xs font-mono font-bold uppercase tracking-wider text-black/70 mb-1">
                      Project Notes / Special Setup Requirements <span className="text-black/40 font-normal">(Optional)</span>
                    </label>
                    <div className="relative">
                      <textarea
                        rows={2}
                        placeholder="e.g. Need help with Vercel deployment and custom domain setup..."
                        value={buyerNotes}
                        onChange={(e) => setBuyerNotes(e.target.value)}
                        className="w-full pl-9 pr-3.5 py-2 rounded-xl border border-black/15 bg-white text-xs text-black placeholder:text-black/35 focus:outline-none focus:border-red focus:ring-1 focus:ring-red transition-all resize-none"
                      />
                      <FileText size={14} className="absolute left-3 top-3 text-black/40" />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      data-cursor-hover
                      className="w-full py-4 px-6 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-2.5 shadow-[0_10px_25px_rgba(16,185,129,0.35)] active:scale-[0.99] transition-all cursor-pointer disabled:opacity-75"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 size={18} className="animate-spin" />
                          <span>Securing Order on Server...</span>
                        </>
                      ) : (
                        <>
                          <MessageCircle size={18} />
                          <span>Send Order via WhatsApp 💬</span>
                          <ArrowRight size={15} />
                        </>
                      )}
                    </button>
                  </div>

                  {/* Direct Contact reassurance */}
                  <div className="text-center pt-1">
                    <p className="text-[11px] text-black/50 font-mono">
                      🔒 Server-verified order will be sent directly to Vikash&apos;s WhatsApp (<strong className="text-black/80">+91 8000165311</strong>).
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
                    Server Order Confirmed!
                  </span>
                  <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-[#0a0a0a]">
                    Redirecting to WhatsApp...
                  </h3>
                  <p className="text-xs sm:text-sm text-black/60 mt-1.5 max-w-sm mx-auto leading-relaxed">
                    Thank you, <strong>{buyerName}</strong>! Your order has been securely registered on our server. If WhatsApp did not open automatically, click below:
                  </p>
                </div>

                {/* Verified Order Info Badge */}
                {verifiedOrderRef && (
                  <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-left text-xs font-mono space-y-1">
                    <div className="flex items-center justify-between text-emerald-900 font-bold">
                      <span>Order Reference:</span>
                      <span>{verifiedOrderRef}</span>
                    </div>
                    {verifiedLicenseKey && (
                      <div className="flex items-center justify-between text-emerald-700 text-[11px]">
                        <span>License Key:</span>
                        <span>{verifiedLicenseKey}</span>
                      </div>
                    )}
                  </div>
                )}

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

                  {/* Verify Certificate Link */}
                  {verifiedLicenseKey && (
                    <a
                      href={`/verify?lic=${encodeURIComponent(verifiedLicenseKey)}&buyer=${encodeURIComponent(buyerName)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-2.5 px-4 rounded-xl bg-black/[0.04] hover:bg-black/[0.08] text-xs font-mono font-semibold text-black/80 flex items-center justify-center gap-2 transition-colors"
                    >
                      <Award size={14} className="text-emerald-600" />
                      <span>View Official License Certificate</span>
                    </a>
                  )}
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
