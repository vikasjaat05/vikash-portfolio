import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BuyPortfolioStoreClient from "@/components/BuyPortfolioStoreClient";

export const metadata: Metadata = {
  title: {
    absolute: "Buy Portfolio Themes, Figma Designs & Web Templates | Vikash Choudhary",
  },
  description:
    "Browse and buy production-ready Next.js portfolio themes, Shopify storefronts, UI/UX Figma kits, and custom source code by Vikash Choudhary. Instant delivery, full commercial rights.",
  alternates: {
    canonical: "https://vikash.website/buy-portfolio",
  },
  openGraph: {
    title: "Buy Portfolio Themes, Figma Designs & Web Templates | Vikash Choudhary",
    description:
      "Acquire official Next.js portfolio themes, Shopify e-commerce templates, and Figma design kits by Vikash Choudhary. Full source code, commercial rights, and turnkey support.",
    url: "https://vikash.website/buy-portfolio",
    type: "website",
  },
};

export default function BuyPortfolioPage() {
  return (
    <>
      <Navbar />
      <main className="relative bg-[#faf8f5] min-h-screen">
        <BuyPortfolioStoreClient />
      </main>
      <Footer />
    </>
  );
}
