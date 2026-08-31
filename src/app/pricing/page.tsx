import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PricingVideoHero from "@/components/PricingVideoHero";
import TrustBar from "@/components/TrustBar";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import CTA from "@/components/CTA";

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
        <PricingVideoHero />
        <TrustBar />
        <Testimonials />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
