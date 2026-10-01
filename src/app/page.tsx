import Navbar from "@/components/Navbar";
import AmbientBackground from "@/components/AmbientBackground";
import Hero from "@/components/Hero";
import Clients from "@/components/Clients";
import Services from "@/components/Services";
import About from "@/components/About";
import CareerPreview from "@/components/CareerPreview";
import WhyChooseUs from "@/components/WhyChooseUs";
import Work from "@/components/Work";
import Process from "@/components/Process";
import FAQ from "@/components/FAQ";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import FadeSection from "@/components/FadeSection";
import LocalAgencyThemeSync from "@/components/LocalAgencyThemeSync";
import { getFounders } from "@/lib/team-data";

export default async function Home() {
  const founders = await getFounders();
  const isLocal = process.env.NODE_ENV === "development";

  return (
    <>
      <LocalAgencyThemeSync />
      <Navbar />
      <main className={`relative ${isLocal ? "theme-agency-local" : ""}`}>
        <FadeSection isTop disableY>
          <Hero />
        </FadeSection>

        <AmbientBackground />

        <FadeSection fadeOffset={0.12}>
          <Clients />
        </FadeSection>

        <FadeSection fadeOffset={0.1}>
          <Services />
        </FadeSection>

        <FadeSection fadeOffset={0.04} disableY={true}>
          <Work />
        </FadeSection>

        <FadeSection fadeOffset={0.1}>
          <About founder={founders[0]} />
        </FadeSection>

        <FadeSection fadeOffset={0.08} disableY={true}>
          <WhyChooseUs />
        </FadeSection>

        <FadeSection fadeOffset={0.08}>
          <CareerPreview />
        </FadeSection>

        <FadeSection fadeOffset={0.1}>
          <Process />
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
