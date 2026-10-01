import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WorkVideoHero from "@/components/WorkVideoHero";
import TrustBar from "@/components/TrustBar";
import WorkProjectGallery from "@/components/WorkProjectGallery";
import StickyProjects from "@/components/StickyProjects";
import CTA from "@/components/CTA";
import FadeSection from "@/components/FadeSection";

export const metadata: Metadata = {
  title: {
    absolute: "Web & Shopify Development Projects | Vikash Choudhary",
  },
  description:
    "Explore 14+ live Shopify e-commerce stores, custom Liquid themes, and modern Next.js web applications engineered by Web & Shopify Developer Vikash Choudhary.",
  alternates: {
    canonical: "https://vikash.website/work",
  },
  openGraph: {
    title: "Web & Shopify Development Projects | Vikash Choudhary",
    description:
      "Explore 14+ live Shopify e-commerce stores, custom Liquid themes, and modern Next.js web applications engineered by Web & Shopify Developer Vikash Choudhary.",
    url: "https://vikash.website/work",
    type: "website",
  },
};

export default function WorkIndexPage() {
  return (
    <>
      <Navbar />
      <main className="relative">
        <FadeSection isTop disableY>
          <WorkVideoHero />
        </FadeSection>

        <FadeSection fadeOffset={0.1}>
          <TrustBar />
        </FadeSection>

        <FadeSection fadeOffset={0.08}>
          <WorkProjectGallery />
        </FadeSection>

        <FadeSection fadeOffset={0.05} disableY={true}>
          <StickyProjects />
        </FadeSection>

        <FadeSection fadeOffset={0.12} disableExit={true}>
          <CTA />
        </FadeSection>
      </main>
      <Footer />
    </>
  );
}
