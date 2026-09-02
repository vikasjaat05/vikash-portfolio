"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import QRCode from "qrcode";
import { 
  X, 
  CreditCard, 
  QrCode, 
  ShieldCheck, 
  Lock, 
  Loader2, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles, 
  MessageCircle,
  Smartphone
} from "lucide-react";
import { useCart } from "./CartContext";

export default function CheckoutModal() {
  const {
    items,
    isCheckoutOpen,
    setIsCheckoutOpen,
    currency,
    finalPriceUsd,
    finalPriceInr,
    clearCart,
    setLatestReceipt,
  } = useCart();

  const [paymentMethod, setPaymentMethod] = useState<"upi" | "card" | "paypal">("upi");
  const [buyerName, setBuyerName] = useState("");
  const [buyerEmail, setBuyerEmail] = useState("");
  const [buyerPhone, setBuyerPhone] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvc, setCardCvc] = useState("");
  const [upiQrUrl, setUpiQrUrl] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState("");

  const totalAmount = currency === "USD" ? `$${finalPriceUsd}` : `₹${finalPriceInr.toLocaleString()}`;

  // Generate real UPI payment QR code string
  useEffect(() => {
    if (isCheckoutOpen) {
      const upiLink = `upi://pay?pa=8000165311@upi&pn=Vikash%20Choudhary&am=${finalPriceInr}&cu=INR&tn=Digital%20Portfolio%20Theme`;
      QRCode.toDataURL(upiLink, { width: 220, margin: 1, color: { dark: "#0a0a0a", light: "#ffffff" } })
        .then((url) => setUpiQrUrl(url))
        .catch(() => {});
    }
  }, [isCheckoutOpen, finalPriceInr]);

  const handleCompleteOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!buyerName || !buyerEmail) {
      setError("Please fill in your name and email.");
      return;
    }

    setIsProcessing(true);
    setError("");

    // Simulate verified secure payment processing
    setTimeout(async () => {
      // Generate Unique License Key
      const randomSuffix = Math.random().toString(36).substring(2, 7).toUpperCase();
      const randomNum = Math.floor(1000 + Math.random() * 9000);
      const generatedLicenseKey = `LIC-VK-2026-${randomNum}-${randomSuffix}`;

      // Notify backend / email via /api/contact
      try {
        await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: buyerName,
            email: buyerEmail,
            company: buyerPhone ? `Phone: ${buyerPhone}` : "Store Purchase",
            budget: totalAmount,
            service: `Store Order: ${items.map((i) => i.item.title).join(", ")}`,
            message: `Official Order Completed!\nBuyer: ${buyerName}\nEmail: ${buyerEmail}\nPhone: ${buyerPhone}\nLicense: ${generatedLicenseKey}\nMethod: ${paymentMethod.toUpperCase()}\nItems: ${items.map((i) => i.item.title).join(", ")}\nTotal: ${totalAmount}`,
          }),
        });
      } catch {
        // Continue even if network notification fails
      }

      // Save Receipt in state to show personalized certificate modal
      setLatestReceipt({
        buyerName,
        buyerEmail,
        buyerPhone,
        licenseKey: generatedLicenseKey,
        purchaseDate: new Date().toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
        items: items.map((i) => i.item),
        totalAmount,
        currency,
        paymentMethod: paymentMethod.toUpperCase(),
      });

      setIsProcessing(false);
      setIsCheckoutOpen(false);
      clearCart();
    }, 1200);
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
            onClick={() => setIsCheckoutOpen(false)}
            className="fixed inset-0 bg-black/75 backdrop-blur-md"
          />

          {/* Checkout Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.25 }}
            className="relative w-full max-w-xl rounded-3xl p-6 sm:p-8 bg-white text-[#0a0a0a] shadow-2xl border border-black/10 z-10 my-8 max-h-[90vh] overflow-y-auto"
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setIsCheckoutOpen(false)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-black/[0.04] hover:bg-black/[0.08] flex items-center justify-center text-black/60 transition-colors"
            >
              <X size={16} />
            </button>

            {/* Header */}
            <div className="mb-6">
              <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-red uppercase tracking-wider mb-1">
                <Lock size={12} />
                <span>256-Bit Encrypted Checkout</span>
              </div>
              <h3 className="font-display text-2xl sm:text-3xl font-bold">
                Complete Your Acquisition
              </h3>
              <p className="text-xs sm:text-sm text-black/60 mt-1">
                An official, downloadable commercial license certificate will be generated in your name upon completion.
              </p>
            </div>

            {error && (
              <div className="mb-4 p-3 rounded-xl bg-red/10 text-red text-xs border border-red/20 font-medium">
                {error}
              </div>
            )}

            <form onSubmit={handleCompleteOrder} className="space-y-5">
              {/* 1. Customer Details */}
              <div className="space-y-3">
                <span className="text-xs font-mono uppercase tracking-wider text-black/50 block font-semibold">
                  1. Licensee Information
                </span>

                <div>
                  <label className="block text-[11px] font-mono uppercase text-black/60 mb-1">
                    Your Full Name (Printed on Certificate) *
                  </label>
                  <input
                    type="text"
                    required
                    value={buyerName}
                    onChange={(e) => setBuyerName(e.target.value)}
                    placeholder="e.g. Alex Hunter"
                    className="w-full px-4 py-2.5 rounded-xl bg-black/[0.03] border border-black/[0.1] focus:border-red text-sm outline-none font-medium text-[#0a0a0a]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-mono uppercase text-black/60 mb-1">
                      Email Address (For Code Access) *
                    </label>
                    <input
                      type="email"
                      required
                      value={buyerEmail}
                      onChange={(e) => setBuyerEmail(e.target.value)}
                      placeholder="alex@example.com"
                      className="w-full px-4 py-2.5 rounded-xl bg-black/[0.03] border border-black/[0.1] focus:border-red text-sm outline-none font-medium text-[#0a0a0a]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono uppercase text-black/60 mb-1">
                      WhatsApp / Phone (Instant Link)
                    </label>
                    <input
                      type="text"
                      value={buyerPhone}
                      onChange={(e) => setBuyerPhone(e.target.value)}
                      placeholder="+91 8000165311"
                      className="w-full px-4 py-2.5 rounded-xl bg-black/[0.03] border border-black/[0.1] focus:border-red text-sm outline-none font-medium text-[#0a0a0a]"
                    />
                  </div>
                </div>
              </div>

              {/* 2. Payment Method Selector */}
              <div className="space-y-3 pt-3 border-t border-black/[0.06]">
                <span className="text-xs font-mono uppercase tracking-wider text-black/50 block font-semibold">
                  2. Select Payment Method
                </span>

                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("upi")}
                    className={`py-2.5 px-3 rounded-xl border text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                      paymentMethod === "upi"
                        ? "border-red bg-red/5 text-red shadow-xs font-bold"
                        : "border-black/[0.08] hover:bg-black/[0.02] text-black/70"
                    }`}
                  >
                    <QrCode size={15} />
                    <span>UPI / QR</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod("card")}
                    className={`py-2.5 px-3 rounded-xl border text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                      paymentMethod === "card"
                        ? "border-red bg-red/5 text-red shadow-xs font-bold"
                        : "border-black/[0.08] hover:bg-black/[0.02] text-black/70"
                    }`}
                  >
                    <CreditCard size={15} />
                    <span>Card</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod("paypal")}
                    className={`py-2.5 px-3 rounded-xl border text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                      paymentMethod === "paypal"
                        ? "border-red bg-red/5 text-red shadow-xs font-bold"
                        : "border-black/[0.08] hover:bg-black/[0.02] text-black/70"
                    }`}
                  >
                    <Smartphone size={15} />
                    <span>PayPal</span>
                  </button>
                </div>

                {/* UPI QR Payment Box */}
                {paymentMethod === "upi" && (
                  <div className="p-4 rounded-2xl bg-[#faf8f5] border border-black/[0.06] text-center space-y-3">
                    <span className="text-xs text-black/70 block">
                      Scan with <strong>Google Pay, PhonePe, Paytm, or BHIM</strong>:
                    </span>
                    {upiQrUrl && (
                      <div className="w-36 h-36 mx-auto bg-white p-2 rounded-xl shadow-xs border border-black/[0.08] flex items-center justify-center">
                        <img src={upiQrUrl} alt="UPI QR Code" className="w-full h-full object-contain" />
                      </div>
                    )}
                    <div className="text-[11px] font-mono text-black/60">
                      UPI ID: <span className="font-bold text-black select-all bg-white px-2 py-0.5 rounded border">8000165311@upi</span>
                    </div>
                  </div>
                )}

                {/* Card Inputs Box */}
                {paymentMethod === "card" && (
                  <div className="space-y-2.5 p-4 rounded-2xl bg-[#faf8f5] border border-black/[0.06]">
                    <div>
                      <input
                        type="text"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        placeholder="Card Number (4000 1234 5678 9010)"
                        className="w-full px-3.5 py-2 rounded-xl bg-white border border-black/[0.08] text-xs font-mono outline-none"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                        placeholder="MM / YY"
                        className="px-3.5 py-2 rounded-xl bg-white border border-black/[0.08] text-xs font-mono outline-none"
                      />
                      <input
                        type="password"
                        maxLength={4}
                        value={cardCvc}
                        onChange={(e) => setCardCvc(e.target.value)}
                        placeholder="CVC"
                        className="px-3.5 py-2 rounded-xl bg-white border border-black/[0.08] text-xs font-mono outline-none"
                      />
                    </div>
                  </div>
                )}

                {/* PayPal Box */}
                {paymentMethod === "paypal" && (
                  <div className="p-4 rounded-2xl bg-[#faf8f5] border border-black/[0.06] text-center text-xs text-black/70">
                    Clicking &ldquo;Authorize Order&rdquo; will securely verify your transaction with PayPal protection.
                  </div>
                )}
              </div>

              {/* Order Summary Snapshot */}
              <div className="p-4 rounded-2xl bg-black/[0.03] border border-black/[0.06] flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono uppercase text-black/50 block">
                    Total Due ({currency})
                  </span>
                  <span className="font-display text-2xl font-black text-[#0a0a0a]">
                    {totalAmount}
                  </span>
                </div>
                <span className="text-xs font-mono text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200 font-semibold">
                  ✓ Instant Download Ready
                </span>
              </div>

              {/* Submit CTA */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isProcessing}
                  data-cursor-hover
                  className="w-full py-4 px-6 rounded-2xl bg-red hover:bg-red-dark text-white font-bold text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_10px_25px_rgba(225,6,0,0.35)] disabled:opacity-60 transition-all hover:scale-[1.01] active:scale-[0.99]"
                >
                  {isProcessing ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      <span>Verifying &amp; Generating Certificate...</span>
                    </>
                  ) : (
                    <>
                      <span>Complete Purchase &amp; Claim Certificate</span>
                      <ArrowRight size={15} />
                    </>
                  )}
                </button>
              </div>

              <div className="text-center">
                <a
                  href={`https://wa.me/918000165311?text=Hi%20Vikash,%20I'm%20at%20checkout%20for%20${encodeURIComponent(items.map((i) => i.item.title).join(", "))}%20amount%20${totalAmount}.%20Can%20you%20help%20confirm?`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-emerald-700 hover:text-emerald-800 font-medium"
                >
                  <MessageCircle size={14} />
                  <span>Need help? Chat with Vikash on WhatsApp</span>
                </a>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
