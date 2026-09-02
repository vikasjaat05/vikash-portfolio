"use client";

import { useState } from "react";
import StoreHeroSection from "./StoreHeroSection";
import StoreValueSection from "./StoreValueSection";
import BuyPortfolioCatalog from "./BuyPortfolioCatalog";
import BuyPortfolioFAQ from "./BuyPortfolioFAQ";
import CartDrawer from "./CartDrawer";
import CheckoutModal from "./CheckoutModal";
import LicenseCertificateModal from "./LicenseCertificateModal";
import CTA from "./CTA";
import { CartProvider } from "./CartContext";

export default function BuyPortfolioStoreClient() {
  const [searchQuery, setSearchQuery] = useState("");
  const [currency, setCurrency] = useState<"USD" | "INR">("USD");

  return (
    <CartProvider>
      {/* 1. Tailored Signature Hero (Continuous animations, sales ticker & quick cart) */}
      <StoreHeroSection />

      {/* 2. Value Proposition Bento Section (Real clients & metrics) */}
      <StoreValueSection />

      {/* 3. Digital Store Catalog (Search, filters, product cards & Add to Cart) */}
      <BuyPortfolioCatalog
        searchQuery={searchQuery}
        currency={currency}
      />

      {/* 4. Buyer Assurance FAQ */}
      <BuyPortfolioFAQ />

      {/* 5. Contact CTA */}
      <CTA />

      {/* Interactive Cart & Checkout Modals */}
      <CartDrawer />
      <CheckoutModal />
      <LicenseCertificateModal />
    </CartProvider>
  );
}
