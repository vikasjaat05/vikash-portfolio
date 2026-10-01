import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PricingVideoHero from "@/components/PricingVideoHero";
import TrustBar from "@/components/TrustBar";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import CTA from "@/components/CTA";
import FadeSection from "@/components/FadeSection";

export const metadata: Metadata = {
  title: {
    absolute: "Web & Shopify Development Pricing | Vikash Choudhary",
  },
  description:
    "Transparent pricing and packages for custom Shopify theme development, web application engineering, and e-commerce optimization by Vikash Choudhary.",
  alternates: {
    canonical: "https://vikash.website/pricing",
  },
  openGraph: {
    title: "Web & Shopify Development Pricing | Vikash Choudhary",
    description:
      "Transparent pricing and packages for custom Shopify theme development, web application engineering, and e-commerce optimization by Vikash Choudhary.",
    url: "https://vikash.website/pricing",
    type: "website",
  },
};

export default function PricingPage() {
  return (
    <>
      <Navbar />
      <main className="relative">
        <FadeSection isTop disableY>
          <PricingVideoHero />
        </FadeSection>

        <FadeSection fadeOffset={0.1}>
          <TrustBar />
        </FadeSection>

        <FadeSection fadeOffset={0.1}>
          <Testimonials />
        </FadeSection>

        <FadeSection fadeOffset={0.1}>
          <FAQ />
        </FadeSection>

        <FadeSection fadeOffset={0.12} disableExit={true}>
          <CTA />
        </FadeSection>
      </main>
      <Footer />
    </>
  );
}
