import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WorkVideoHero from "@/components/WorkVideoHero";
import TrustBar from "@/components/TrustBar";
import WorkProjectGallery from "@/components/WorkProjectGallery";
import StickyProjects from "@/components/StickyProjects";
import CTA from "@/components/CTA";

export default function WorkIndexPage() {
  return (
    <>
      <Navbar />
      <main className="relative">
        <WorkVideoHero />
        <TrustBar />
        <WorkProjectGallery />
        <StickyProjects />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
