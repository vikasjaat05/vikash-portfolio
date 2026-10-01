"use client";

import { useState } from "react";
import StoreHeroSection from "./StoreHeroSection";
import StoreValueSection from "./StoreValueSection";
import BuyPortfolioCatalog from "./BuyPortfolioCatalog";
import BuyPortfolioFAQ from "./BuyPortfolioFAQ";
import CartDrawer from "./CartDrawer";
import CheckoutModal from "./CheckoutModal";
import LicenseCertificateModal from "./LicenseCertificateModal";
import AddToCartToast from "./AddToCartToast";
import CountrySelectorModal from "./CountrySelectorModal";
import CTA from "./CTA";
import FadeSection from "./FadeSection";
import { CartProvider } from "./CartContext";

export default function BuyPortfolioStoreClient() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <CartProvider>
      {/* 1. Tailored Signature Hero (Continuous animations, sales ticker & quick cart) */}
      <FadeSection isTop disableY>
        <StoreHeroSection />
      </FadeSection>

      {/* 2. Value Proposition Bento Section (Real clients & metrics) */}
      <FadeSection fadeOffset={0.08}>
        <StoreValueSection />
      </FadeSection>

      {/* 3. Digital Store Catalog (Search, filters, product cards & Add to Cart) */}
      <FadeSection fadeOffset={0.06}>
        <BuyPortfolioCatalog
          searchQuery={searchQuery}
        />
      </FadeSection>

      {/* 4. Buyer Assurance FAQ */}
      <FadeSection fadeOffset={0.1}>
        <BuyPortfolioFAQ />
      </FadeSection>

      {/* 5. Contact CTA */}
      <FadeSection fadeOffset={0.12} disableExit={true}>
        <CTA />
      </FadeSection>

      {/* Non-intrusive Add to Cart Floating Toast Notification */}
      <AddToCartToast />

      {/* Welcome / Region Country Selector Modal */}
      <CountrySelectorModal />

      {/* Interactive Cart & Checkout Modals */}
      <CartDrawer />
      <CheckoutModal />
      <LicenseCertificateModal />
    </CartProvider>
  );
}
