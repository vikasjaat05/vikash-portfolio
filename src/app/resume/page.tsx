import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import FadeSection from "@/components/FadeSection";
import Image from "next/image";
import { Download, ExternalLink, ArrowLeft, Eye } from "lucide-react";
import Link from "next/link";
import ResumeExperienceSection from "@/components/ResumeExperienceSection";

const RESUME_IMG =
  "https://res.cloudinary.com/dh0amtajw/image/upload/v1787135013/Vikash_Choudhary_resume_irb3oh.png";

export const metadata = {
  title: "Resume — Vikash Choudhary | Web & Shopify Developer",
  description:
    "Official resume and experience summary of Vikash Choudhary, Web & Shopify Developer.",
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
              Vikash Choudhary <span className="text-red">Resume.</span>
            </>
          }
          description="Web & Shopify Developer specializing in high-performance storefronts, Next.js web applications, and conversion-optimized architectures."
          breadcrumb={[{ label: "Resume" }]}
        />

        <section className="px-6 md:px-10 pb-24 md:pb-36">
          <div className="max-w-[1000px] mx-auto">
            {/* Action Bar */}
            <FadeSection className="mb-8">
              <div className="p-4 sm:p-6 rounded-2xl bg-white border border-black/10 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-red/10 text-red flex items-center justify-center font-bold text-xs">
                    PDF
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-sm sm:text-base text-black">
                      Vikash Choudhary — Resume
                    </h3>
                    <p className="text-xs text-black/50">High-Resolution Image Document</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <a
                    href={RESUME_IMG}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor-hover
                    className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 rounded-full border border-black/15 bg-white text-black px-5 py-2.5 text-xs sm:text-sm font-semibold hover:bg-black hover:text-white transition-colors"
                  >
                    <Eye size={15} />
                    <span>Open Fullscreen</span>
                  </a>

                  <a
                    href={RESUME_IMG}
                    download="Vikash_Choudhary_Resume.png"
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor-hover
                    className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 rounded-full bg-red text-white px-6 py-2.5 text-xs sm:text-sm font-semibold hover:bg-black transition-colors shadow-md"
                  >
                    <Download size={15} />
                    <span>Download</span>
                  </a>
                </div>
              </div>
            </FadeSection>

            {/* Resume Preview Sheet */}
            <FadeSection>
              <div className="relative w-full rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border border-black/10 bg-white p-2 sm:p-4 md:p-6">
                <div className="relative w-full min-h-[600px] md:min-h-[1100px] rounded-xl overflow-hidden">
                  <Image
                    src={RESUME_IMG}
                    alt="Vikash Choudhary Resume"
                    width={1200}
                    height={1600}
                    priority
                    className="w-full h-auto object-contain rounded-lg"
                  />
                </div>
              </div>
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
