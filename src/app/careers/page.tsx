import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import FadeSection from "@/components/FadeSection";
import JobOpeningRow from "@/components/JobOpeningRow";
import CTA from "@/components/CTA";
import { OPENINGS, VALUES, PERKS } from "@/data/careers";

export default function CareersPage() {
  return (
    <>
      <Navbar />
      <main className="relative">
        <PageHeader
          eyebrow="Careers"
          title={
            <>
              Build your best work <span className="text-red">with us.</span>
            </>
          }
          description="We're a small, senior team — every hire gets real ownership and direct client access from day one."
          breadcrumb={[{ label: "Careers" }]}
        />

        <section className="px-6 md:px-10 pb-20 md:pb-28">
          <div className="max-w-[1400px] mx-auto">
            <FadeSection>
              <h2 className="font-display font-extrabold text-3xl md:text-5xl leading-[1.05] mb-12 md:mb-16 max-w-2xl">
                What we believe in.
              </h2>
            </FadeSection>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              {VALUES.map((v, i) => (
                <FadeSection key={v.title} className="border-t border-black/10 pt-6">
                  <span className="font-display text-sm font-bold text-red">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-display text-xl md:text-2xl font-bold mt-3 mb-2">
                    {v.title}
                  </h3>
                  <p className="text-black/60 leading-relaxed">{v.desc}</p>
                </FadeSection>
              ))}
            </div>
          </div>
        </section>

        <section className="px-6 md:px-10 pb-20 md:pb-28 bg-[#f0ebe2]">
          <div className="max-w-[1400px] mx-auto py-16 md:py-20">
            <FadeSection>
              <h2 className="font-display font-extrabold text-3xl md:text-5xl leading-[1.05] mb-10 md:mb-12 max-w-2xl">
                Perks &amp; benefits.
              </h2>
            </FadeSection>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {PERKS.map((perk) => (
                <FadeSection key={perk}>
                  <div className="flex items-center gap-3 bg-white rounded-xl px-5 py-4 border border-black/[0.06] transition-all duration-300 hover:border-red/30 hover:shadow-md hover:-translate-y-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-red flex-shrink-0" />
                    <span className="text-sm font-medium">{perk}</span>
                  </div>
                </FadeSection>
              ))}
            </div>
          </div>
        </section>

        <section className="px-6 md:px-10 py-20 md:py-28">
          <div className="max-w-[1400px] mx-auto">
            <FadeSection>
              <h2 className="font-display font-extrabold text-3xl md:text-5xl leading-[1.05] mb-12 md:mb-16 max-w-2xl">
                Open positions.
              </h2>
            </FadeSection>

            <div className="divide-y divide-black/10 border-t border-b border-black/10">
              {OPENINGS.map((job) => (
                <FadeSection key={job.title}>
                  <JobOpeningRow job={job} />
                </FadeSection>
              ))}
            </div>
          </div>
        </section>

        <CTA />
      </main>
      <Footer />
    </>
  );
}
