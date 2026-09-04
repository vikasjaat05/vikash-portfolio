import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  ShieldCheck,
  Award,
  CheckCircle2,
  ArrowRight,
  Clock,
  AlertTriangle,
  Search,
  MessageCircle,
  FileCheck,
} from "lucide-react";
import { getOrderByLicenseKey } from "@/lib/orders";

export const metadata: Metadata = {
  title: "Official Commercial License Verification | Vikash Choudhary",
  description:
    "Verify cryptographic authenticity, commercial deployment rights, and source code provenance for Vikash Choudhary digital portfolio themes.",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function VerifyLicensePage({
  searchParams,
}: {
  searchParams: Promise<{ lic?: string; buyer?: string }>;
}) {
  const { lic = "", buyer = "" } = await searchParams;
  const cleanLic = lic.trim();

  // Authoritative server-side lookup
  const order = cleanLic ? getOrderByLicenseKey(cleanLic) : undefined;
  const isPaid = order && order.status === "PAID";
  const isPending = order && order.status === "PENDING";
  const isNotFound = cleanLic.length > 0 && !order;
  const hasSearched = cleanLic.length > 0;

  return (
    <>
      <Navbar />
      <main className="relative min-h-[88vh] bg-[#faf8f5] text-[#0a0a0a] pt-32 pb-24 px-6 md:px-10 flex items-center justify-center">
        <div className="w-full max-w-2xl mx-auto">
          {/* Main Card */}
          <div className="relative rounded-[2.5rem] bg-white border border-black/[0.08] shadow-[0_30px_90px_rgba(0,0,0,0.06)] p-8 sm:p-12 text-center overflow-hidden">
            {/* Top Badge & Header */}
            {isPaid && (
              <>
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-emerald-50 text-emerald-600 border border-emerald-200 mb-6 shadow-sm">
                  <Award size={40} className="stroke-[1.8]" />
                </div>

                <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-100/80 border border-emerald-300 text-emerald-800 text-[11px] font-mono font-bold uppercase tracking-wider mb-3">
                  <ShieldCheck size={13} />
                  <span>Cryptographically Verified Certificate</span>
                </div>

                <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-[#0a0a0a] tracking-tight mb-3">
                  Official Commercial License
                </h1>

                <p className="text-sm text-black/60 max-w-md mx-auto mb-8">
                  This digital certificate confirms legitimate commercial ownership, lifetime deployment rights, and source code provenance issued directly by Vikash Choudhary.
                </p>

                {/* Details Box */}
                <div className="rounded-2xl bg-black/[0.02] border border-black/[0.06] p-6 text-left space-y-4 mb-8">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-black/[0.06] gap-1">
                    <span className="text-xs font-mono uppercase tracking-wider text-black/50">License Status</span>
                    <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 font-mono">
                      <CheckCircle2 size={14} className="text-emerald-600" />
                      <span>ACTIVE • VERIFIED AUTHENTIC</span>
                    </span>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-black/[0.06] gap-1">
                    <span className="text-xs font-mono uppercase tracking-wider text-black/50">License Key</span>
                    <span className="font-mono text-xs font-bold text-[#0a0a0a] bg-black/[0.04] px-2.5 py-1 rounded-md">
                      {order.licenseKey}
                    </span>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-black/[0.06] gap-1">
                    <span className="text-xs font-mono uppercase tracking-wider text-black/50">Licensed Licensee</span>
                    <span className="text-xs font-bold text-[#0a0a0a]">
                      {order.customer.name || buyer || "Authorized Commercial Licensee"}
                    </span>
                  </div>

                  {order.customer.company && (
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-black/[0.06] gap-1">
                      <span className="text-xs font-mono uppercase tracking-wider text-black/50">Organization / Brand</span>
                      <span className="text-xs font-medium text-black/80">{order.customer.company}</span>
                    </div>
                  )}

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-black/[0.06] gap-1">
                    <span className="text-xs font-mono uppercase tracking-wider text-black/50">Production Rights</span>
                    <span className="text-xs font-bold text-black/80">
                      Perpetual Commercial Single-Seat License
                    </span>
                  </div>

                  {order.items && order.items.length > 0 && (
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-1 pt-1">
                      <span className="text-xs font-mono uppercase tracking-wider text-black/50">Licensed Products</span>
                      <div className="text-right space-y-1">
                        {order.items.map((it) => (
                          <div key={it.id} className="text-xs font-bold text-[#0a0a0a]">
                            {it.title}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </>
            )}

            {isPending && (
              <>
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-amber-50 text-amber-600 border border-amber-200 mb-6 shadow-sm">
                  <Clock size={40} className="stroke-[1.8]" />
                </div>

                <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-100/80 border border-amber-300 text-amber-900 text-[11px] font-mono font-bold uppercase tracking-wider mb-3">
                  <Clock size={13} />
                  <span>Order Registered • Pending Payment</span>
                </div>

                <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-[#0a0a0a] tracking-tight mb-3">
                  Payment Verification Pending
                </h1>

                <p className="text-sm text-black/60 max-w-md mx-auto mb-8">
                  Your order inquiry has been securely recorded on our server. Full commercial rights and asset downloads activate immediately once payment confirmation is logged.
                </p>

                {/* Pending Details */}
                <div className="rounded-2xl bg-black/[0.02] border border-black/[0.06] p-6 text-left space-y-4 mb-8">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-black/[0.06] gap-1">
                    <span className="text-xs font-mono uppercase tracking-wider text-black/50">Order Reference</span>
                    <span className="font-mono text-xs font-bold text-[#0a0a0a]">{order.orderNumber}</span>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-black/[0.06] gap-1">
                    <span className="text-xs font-mono uppercase tracking-wider text-black/50">Licensee</span>
                    <span className="text-xs font-bold text-[#0a0a0a]">{order.customer.name}</span>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-black/[0.06] gap-1">
                    <span className="text-xs font-mono uppercase tracking-wider text-black/50">Total Due</span>
                    <span className="text-xs font-bold text-red font-mono">{order.formattedTotal}</span>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-black/[0.06] gap-1">
                    <span className="text-xs font-mono uppercase tracking-wider text-black/50">Status</span>
                    <span className="text-xs font-bold text-amber-700 font-mono">AWAITING PAYMENT CONFIRMATION</span>
                  </div>
                </div>

                <div className="mb-6">
                  <a
                    href={`https://wa.me/918000165311?text=Hi%20Vikash,%20I%20have%20completed%20payment%20for%20order%20${order.orderNumber}%20(License%20${order.licenseKey}).%20Please%20verify%20and%20activate%20my%20license.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3.5 px-6 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
                  >
                    <MessageCircle size={16} />
                    <span>Confirm Payment via WhatsApp (+91 8000165311)</span>
                  </a>
                </div>
              </>
            )}

            {isNotFound && (
              <>
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-red/10 text-red border border-red/20 mb-6 shadow-sm">
                  <AlertTriangle size={40} className="stroke-[1.8]" />
                </div>

                <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-red/10 border border-red/20 text-red text-[11px] font-mono font-bold uppercase tracking-wider mb-3">
                  <AlertTriangle size={13} />
                  <span>Unverified License Key</span>
                </div>

                <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-[#0a0a0a] tracking-tight mb-3">
                  License Record Not Found
                </h1>

                <p className="text-sm text-black/60 max-w-md mx-auto mb-6">
                  The key <code className="font-mono font-bold text-black bg-black/[0.05] px-2 py-0.5 rounded">{cleanLic}</code> could not be verified in our official registry. Please check for typos or enter a different key below.
                </p>

                {/* Re-enter Form */}
                <form action="/verify" method="GET" className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto mb-8">
                  <input
                    type="text"
                    name="lic"
                    defaultValue={cleanLic}
                    placeholder="Enter License Key (e.g. VK-2026-...)"
                    className="flex-1 px-4 py-3 rounded-xl border border-black/15 bg-white text-xs font-mono focus:outline-hidden focus:border-[#0a0a0a]"
                    required
                  />
                  <button
                    type="submit"
                    className="px-6 py-3 rounded-xl bg-[#0a0a0a] text-white text-xs font-bold hover:bg-black/80 transition-all flex items-center justify-center gap-1.5"
                  >
                    <Search size={14} />
                    <span>Verify</span>
                  </button>
                </form>
              </>
            )}

            {!hasSearched && (
              <>
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-black/[0.04] text-[#0a0a0a] border border-black/10 mb-6 shadow-sm">
                  <FileCheck size={40} className="stroke-[1.8]" />
                </div>

                <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-black/[0.04] border border-black/10 text-black/70 text-[11px] font-mono font-bold uppercase tracking-wider mb-3">
                  <ShieldCheck size={13} />
                  <span>Provenance & Authenticity Portal</span>
                </div>

                <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-[#0a0a0a] tracking-tight mb-3">
                  License Verification Registry
                </h1>

                <p className="text-sm text-black/60 max-w-md mx-auto mb-8">
                  Enter your official license key below to verify commercial authenticity, check deployment rights, and confirm legitimate source code provenance.
                </p>

                {/* Search Form */}
                <form action="/verify" method="GET" className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto mb-6">
                  <input
                    type="text"
                    name="lic"
                    placeholder="Enter License Key (e.g. VK-2026-DEMO-VALID-01)"
                    className="flex-1 px-4 py-3 rounded-xl border border-black/15 bg-white text-xs font-mono focus:outline-hidden focus:border-[#0a0a0a]"
                    required
                  />
                  <button
                    type="submit"
                    className="px-6 py-3 rounded-xl bg-[#0a0a0a] text-white text-xs font-bold hover:bg-black/80 transition-all flex items-center justify-center gap-1.5"
                  >
                    <Search size={14} />
                    <span>Verify</span>
                  </button>
                </form>

                <p className="text-[11px] text-black/40 font-mono mb-8">
                  Want to test? Try demo license:{" "}
                  <Link
                    href="/verify?lic=VK-2026-DEMO-VALID-01"
                    className="text-[#0a0a0a] underline font-semibold hover:text-red"
                  >
                    VK-2026-DEMO-VALID-01
                  </Link>
                </p>
              </>
            )}

            {/* Back Button & Store Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4 border-t border-black/[0.06]">
              <Link
                href="/buy-portfolio"
                className="w-full sm:w-auto px-6 py-3 rounded-full bg-[#0a0a0a] text-white text-xs font-bold hover:bg-black/80 transition-all flex items-center justify-center gap-2"
              >
                <span>Browse Portfolio Store</span>
                <ArrowRight size={14} />
              </Link>

              <Link
                href="/"
                className="w-full sm:w-auto px-6 py-3 rounded-full bg-black/[0.04] hover:bg-black/[0.08] text-[#0a0a0a] text-xs font-bold transition-all flex items-center justify-center gap-2"
              >
                <span>Back to Home</span>
              </Link>

              <a
                href="https://wa.me/918000165311"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-6 py-3 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold hover:bg-emerald-100 transition-all flex items-center justify-center gap-1.5"
              >
                <MessageCircle size={14} />
                <span>Support Desk</span>
              </a>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
