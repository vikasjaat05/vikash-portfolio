import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PricingVideoHero from "@/components/PricingVideoHero";
import TrustBar from "@/components/TrustBar";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import CTA from "@/components/CTA";

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
