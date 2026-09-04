"use client";

import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import QRCode from "qrcode";
import { 
  Download, 
  CheckCircle2, 
  X, 
  Sparkles, 
  ShieldCheck, 
  ExternalLink, 
  MessageCircle, 
  Award,
  FileText
} from "lucide-react";
import { useCart } from "./CartContext";
import { soundFX } from "@/lib/ui-sounds";

export default function LicenseCertificateModal() {
  const { latestReceipt, setLatestReceipt } = useCart();
  const [certQrUrl, setCertQrUrl] = useState<string>("");
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Play celebratory fanfare and generate QR Code for the certificate verification
  useEffect(() => {
    if (latestReceipt) {
      soundFX.playPurchaseChime();
      const verifyUrl = `https://vikash.website/verify?lic=${latestReceipt.licenseKey}&buyer=${encodeURIComponent(latestReceipt.buyerName)}`;
      QRCode.toDataURL(verifyUrl, { width: 160, margin: 1, color: { dark: "#0a0a0a", light: "#ffffff" } })
        .then((url) => setCertQrUrl(url))
        .catch(() => {});
    }
  }, [latestReceipt]);

  if (!latestReceipt) return null;

  const handleDownloadCertificate = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Canvas dimensions (A4 high-res ratio: 1200 x 850)
    canvas.width = 1200;
    canvas.height = 850;

    // 1. Background
    ctx.fillStyle = "#faf8f5";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // 2. Ornate Certificate Borders
    ctx.strokeStyle = "#e10600";
    ctx.lineWidth = 6;
    ctx.strokeRect(30, 30, canvas.width - 60, canvas.height - 60);

    ctx.strokeStyle = "#0a0a0a";
    ctx.lineWidth = 2;
    ctx.strokeRect(40, 40, canvas.width - 80, canvas.height - 80);

    // 3. Header
    ctx.fillStyle = "#e10600";
    ctx.font = "bold 18px monospace";
    ctx.textAlign = "center";
    ctx.fillText("OFFICIAL CERTIFICATE OF COMMERCIAL LICENSE", canvas.width / 2, 95);

    ctx.fillStyle = "#0a0a0a";
    ctx.font = "bold 34px 'Syne', sans-serif";
    ctx.fillText("Certificate of Ownership & Authenticity", canvas.width / 2, 145);

    ctx.fillStyle = "#666666";
    ctx.font = "16px sans-serif";
    ctx.fillText("Issued by Vikash Choudhary Digital Craft Studio • Alwar, India", canvas.width / 2, 180);

    // Divider
    ctx.strokeStyle = "#dddddd";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(250, 210);
    ctx.lineTo(950, 210);
    ctx.stroke();

    // 4. Body Content
    ctx.fillStyle = "#555555";
    ctx.font = "16px sans-serif";
    ctx.fillText("This document certifies that full commercial rights & source code access are granted to:", canvas.width / 2, 255);

    // Licensee Name (Large & Bold)
    ctx.fillStyle = "#0a0a0a";
    ctx.font = "bold 40px 'Syne', serif";
    ctx.fillText(latestReceipt.buyerName, canvas.width / 2, 315);

    // Underline for name
    ctx.strokeStyle = "#e10600";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(350, 335);
    ctx.lineTo(850, 335);
    ctx.stroke();

    // Product Title
    ctx.fillStyle = "#555555";
    ctx.font = "16px sans-serif";
    ctx.fillText("For the acquisition and deployment of:", canvas.width / 2, 380);

    const productNames = latestReceipt.items.map((i) => i.title).join(", ");
    ctx.fillStyle = "#0a0a0a";
    ctx.font = "bold 26px sans-serif";
    ctx.fillText(productNames, canvas.width / 2, 420);

    // License Details Block
    ctx.fillStyle = "#333333";
    ctx.font = "15px monospace";
    ctx.fillText(`LICENSE KEY: ${latestReceipt.licenseKey}`, canvas.width / 2, 470);
    ctx.fillText(`DATE OF ISSUANCE: ${latestReceipt.purchaseDate}   |   AMOUNT: ${latestReceipt.totalAmount}`, canvas.width / 2, 498);

    // Legal Terms
    ctx.fillStyle = "#666666";
    ctx.font = "14px sans-serif";
    ctx.fillText("The holder is legally entitled to self-host, customize, publish, and deploy this software for", canvas.width / 2, 545);
    ctx.fillText("personal, client, and commercial applications without royalty obligations or forced attribution.", canvas.width / 2, 570);

    // 5. Signatures & Seals (Bottom)
    // Left: QR Code
    if (certQrUrl) {
      const qrImg = new Image();
      qrImg.src = certQrUrl;
      qrImg.onload = () => {
        ctx.drawImage(qrImg, 120, 630, 120, 120);
        ctx.fillStyle = "#666666";
        ctx.font = "11px monospace";
        ctx.textAlign = "left";
        ctx.fillText("Scan to Verify License", 120, 770);

        // Right: Signature
        ctx.textAlign = "center";
        ctx.fillStyle = "#e10600";
        ctx.font = "italic bold 30px 'Instrument Serif', serif";
        ctx.fillText("Vikash Choudhary", 980, 700);

        ctx.strokeStyle = "#0a0a0a";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(860, 720);
        ctx.lineTo(1100, 720);
        ctx.stroke();

        ctx.fillStyle = "#333333";
        ctx.font = "13px sans-serif";
        ctx.fillText("Vikash Choudhary", 980, 740);
        ctx.fillStyle = "#777777";
        ctx.font = "11px monospace";
        ctx.fillText("Lead Full-Stack & Shopify Engineer", 980, 758);

        // Center: Official Stamp
        ctx.beginPath();
        ctx.arc(canvas.width / 2, 690, 48, 0, Math.PI * 2);
        ctx.strokeStyle = "#e10600";
        ctx.lineWidth = 3;
        ctx.stroke();

        ctx.fillStyle = "#e10600";
        ctx.font = "bold 11px monospace";
        ctx.textAlign = "center";
        ctx.fillText("OFFICIAL SEAL", canvas.width / 2, 685);
        ctx.fillText("VERIFIED", canvas.width / 2, 705);

        // Trigger Download
        const link = document.createElement("a");
        link.download = `${latestReceipt.buyerName.replace(/\s+/g, "_")}_Commercial_License.png`;
        link.href = canvas.toDataURL("image/png");
        link.click();
      };
      return;
    }

    // Fallback direct download if QR code ready
    const link = document.createElement("a");
    link.download = `${latestReceipt.buyerName.replace(/\s+/g, "_")}_Commercial_License.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto select-none">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setLatestReceipt(null)}
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 280 }}
          className="relative w-full max-w-2xl rounded-3xl p-6 sm:p-8 bg-white text-[#0a0a0a] shadow-2xl border border-black/10 z-10 my-8 max-h-[92vh] overflow-y-auto"
        >
          {/* Close Button */}
          <button
            type="button"
            onClick={() => setLatestReceipt(null)}
            className="absolute top-5 right-5 w-8 h-8 rounded-full bg-black/[0.05] hover:bg-black/[0.1] flex items-center justify-center text-black/70 hover:text-black transition-colors"
          >
            <X size={16} />
          </button>

          {/* Success Banner */}
          <div className="text-center mb-6">
            <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-3 border border-emerald-200 shadow-xs">
              <Award size={28} />
            </div>
            <span className="text-xs font-mono uppercase tracking-widest text-emerald-600 font-bold block">
              Payment &amp; Acquisition Verified
            </span>
            <h3 className="font-display text-2xl sm:text-3xl font-extrabold mt-1 text-[#0a0a0a]">
              Congratulations, {latestReceipt.buyerName}!
            </h3>
            <p className="text-xs sm:text-sm text-black/60 mt-1 max-w-md mx-auto">
              Your commercial ownership certificate has been generated and sealed below.
            </p>
          </div>

          {/* ======================================================= */}
          {/* THE OFFICIAL CERTIFICATE PREVIEW CARD                   */}
          {/* ======================================================= */}
          <div className="relative rounded-2xl border-4 border-[#0a0a0a] p-6 sm:p-8 bg-[#faf8f5] shadow-inner text-center my-6 overflow-hidden">
            {/* Ornate corner accents */}
            <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-red" />
            <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-red" />
            <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-red" />
            <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-red" />

            <div className="text-[10px] sm:text-xs font-mono font-bold tracking-widest text-red uppercase mb-1">
              Certificate of Commercial License
            </div>
            <h4 className="font-display text-xl sm:text-2xl font-black text-[#0a0a0a] tracking-tight">
              Ownership &amp; Deployment Rights
            </h4>
            <div className="text-[11px] text-black/50 font-mono mb-4">
              Vikash Choudhary Digital Craft Studio
            </div>

            <div className="w-full h-px bg-black/10 my-4" />

            <p className="text-xs text-black/60 mb-2">
              This legally verifies that full commercial and intellectual rights are conferred to:
            </p>
            <div className="font-display text-2xl sm:text-3xl font-black text-[#0a0a0a] my-2">
              {latestReceipt.buyerName}
            </div>
            <div className="w-48 h-0.5 bg-red mx-auto mb-4" />

            <p className="text-xs text-black/60 mb-1">For the official acquisition of:</p>
            <div className="font-bold text-base sm:text-lg text-black mb-3">
              {latestReceipt.items.map((i) => i.title).join(", ")}
            </div>

            <div className="p-2.5 rounded-xl bg-white border border-black/[0.08] inline-block text-left text-xs font-mono text-black/75 mb-4">
              <div><strong className="text-black">LICENSE KEY:</strong> {latestReceipt.licenseKey}</div>
              <div><strong className="text-black">DATE:</strong> {latestReceipt.purchaseDate}</div>
              <div><strong className="text-black">STATUS:</strong> ACTIVE / PERPETUAL</div>
            </div>

            <p className="text-[11px] text-black/60 max-w-md mx-auto leading-relaxed">
              Granted with perpetual, irrevocable rights to self-host, customize, and deploy across personal or client commercial projects.
            </p>

            {/* Bottom Stamps */}
            <div className="flex items-center justify-between pt-6 mt-4 border-t border-black/10">
              {certQrUrl && (
                <div className="flex items-center gap-2 text-left">
                  <img src={certQrUrl} alt="Verify QR" className="w-12 h-12 rounded border p-0.5 bg-white" />
                  <span className="text-[9px] font-mono text-black/50 uppercase leading-tight">
                    Scan to Verify<br />Authenticity
                  </span>
                </div>
              )}

              <div className="text-right">
                <div 
                  className="font-serif italic font-bold text-xl text-red"
                  style={{ fontFamily: "'Instrument Serif', serif" }}
                >
                  Vikash Choudhary
                </div>
                <div className="text-[9px] font-mono uppercase text-black/60">
                  Lead Engineer &amp; Founder
                </div>
              </div>
            </div>
          </div>

          {/* Hidden Canvas used to generate downloadable high-res image */}
          <canvas ref={canvasRef} className="hidden" />

          {/* Action Buttons */}
          <div className="space-y-2.5">
            <button
              type="button"
              onClick={handleDownloadCertificate}
              data-cursor-hover
              className="w-full py-3.5 px-6 rounded-2xl bg-[#0a0a0a] hover:bg-red text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition-all"
            >
              <Download size={15} />
              <span>Download Official Certificate (PNG / High-Res)</span>
            </button>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <a
                href="https://github.com/vikasjaat05"
                target="_blank"
                rel="noopener noreferrer"
                data-cursor-hover
                className="py-2.5 px-4 rounded-xl bg-black/[0.04] hover:bg-black/[0.08] text-black text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
              >
                <ExternalLink size={14} />
                <span>Access GitHub Repository</span>
              </a>

              <a
                href={`https://wa.me/918000165311?text=Hi%20Vikash,%20I%20just%20purchased%20${encodeURIComponent(latestReceipt.items.map((i) => i.title).join(", "))}%20under%20License%20${latestReceipt.licenseKey}.%20Can%20we%20connect%20for%20setup?`}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor-hover
                className="py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold flex items-center justify-center gap-2 transition-colors shadow-xs"
              >
                <MessageCircle size={14} />
                <span>Connect with Vikash on WhatsApp</span>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
