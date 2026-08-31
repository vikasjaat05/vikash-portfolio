import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ServicesVideoHero from "@/components/ServicesVideoHero";
import TrustBar from "@/components/TrustBar";
import FadeSection from "@/components/FadeSection";
import ServicesPageRow from "@/components/ServicesPageRow";
import CTA from "@/components/CTA";
import { SERVICES } from "@/data/services";

export const metadata: Metadata = {
  title: "Web & Shopify Development Services | Vikash Choudhary",
  description:
    "Bespoke Shopify store development, custom Liquid theme engineering, fullstack Next.js web applications, and sub-1s Core Web Vitals speed optimization by Vikash Choudhary.",
  alternates: {
    canonical: "https://vikash.website/services",
  },
  openGraph: {
    title: "Web & Shopify Development Services | Vikash Choudhary",
    description:
      "Bespoke Shopify store development, custom Liquid theme engineering, fullstack Next.js web applications, and sub-1s Core Web Vitals speed optimization by Vikash Choudhary.",
    url: "https://vikash.website/services",
    type: "website",
  },
};

export default function ServicesPage() {
  return (
    <>
      <Navbar />
      <main className="relative">
        <ServicesVideoHero />
        <TrustBar />

        <section className="px-6 md:px-10 pb-28 md:pb-36">
          <div className="max-w-[1400px] mx-auto divide-y divide-black/10 border-t border-b border-black/10">
            {SERVICES.map((service) => (
              <FadeSection key={service.index}>
                <ServicesPageRow service={service} />
              </FadeSection>
            ))}
          </div>
        </section>

        <CTA />
      </main>
      <Footer />
    </>
  );
}
