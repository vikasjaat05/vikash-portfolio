import Navbar from "@/components/Navbar";
import AmbientBackground from "@/components/AmbientBackground";
import ScrollCurveLine from "@/components/ScrollCurveLine";
import Hero from "@/components/Hero";
import Clients from "@/components/Clients";
import TrustBar from "@/components/TrustBar";
import Services from "@/components/Services";
import About from "@/components/About";
import WhyChooseUs from "@/components/WhyChooseUs";
import Work from "@/components/Work";
import Process from "@/components/Process";
import Team from "@/components/Team";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import { getFounders } from "@/lib/team-data";

export default async function Home() {
  const founders = await getFounders();

  return (
    <>
      <Navbar />
      <ScrollCurveLine />
      <main className="relative">
        <Hero />
        <AmbientBackground />
        <Clients />
        <TrustBar />
        <Services />
        <About />
        <WhyChooseUs />
        <Work />
        <Process />
        <Team members={founders} />
        <Testimonials />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
