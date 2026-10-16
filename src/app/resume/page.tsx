import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import FadeSection from "@/components/FadeSection";
import { ExternalLink, ArrowLeft } from "lucide-react";
import Link from "next/link";
import ResumeExperienceSection from "@/components/ResumeExperienceSection";
import ResumeViewer from "@/components/ResumeViewer";

export const metadata = {
  title: "Resume — Vikash Chaudhry | Shopify Developer & Frontend Developer",
  description:
    "Official resume and career history of Vikash Chaudhry — Shopify Developer, Frontend Developer, and E-commerce Specialist with 1.5+ years of experience.",
};

export default function ResumePage() {
  return (
    <>
      <Navbar />
      <main className="relative bg-[#faf8f5]">
        <PageHeader
          eyebrow="Curriculum Vitae"
          title={
            <>
              Vikash Chaudhry <span className="text-red">Resume.</span>
            </>
          }
          description="Shopify Developer & Frontend Developer specializing in custom Liquid themes, e-commerce storefronts, multi-channel marketplace management, and conversion-focused architectures."
          breadcrumb={[{ label: "Resume" }]}
        />

        <section className="px-6 md:px-10 pb-20 md:pb-32">
          <div className="max-w-[1040px] mx-auto">
            <FadeSection>
              <ResumeViewer />
            </FadeSection>
          </div>
        </section>

        {/* Semantic Work Experience & Education Details */}
        <ResumeExperienceSection />

        <section className="px-6 md:px-10 pb-20">
          <div className="max-w-[1000px] mx-auto">

            {/* Bottom Navigation */}
            <FadeSection className="mt-12 flex items-center justify-between">
              <Link
                href="/about"
                data-cursor-hover
                className="inline-flex items-center gap-2 font-semibold text-sm text-black hover:text-red transition-colors underline-swipe"
              >
                <ArrowLeft size={16} />
                Back to About Me
              </Link>

              <Link
                href="/contact"
                data-cursor-hover
                className="inline-flex items-center gap-2 font-semibold text-sm text-red hover:text-black transition-colors"
              >
                <span>Get in Touch</span>
                <ExternalLink size={15} />
              </Link>
            </FadeSection>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
