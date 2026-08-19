import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import FadeSection from "@/components/FadeSection";

const SECTIONS = [
  {
    title: "About my services",
    body: "I work as an independent Web & Shopify Developer. These terms apply whenever you engage my services for client projects.",
  },
  {
    title: "Project scope",
    body: "Every project starts with an agreed scope — what's included, the timeline, and the price. Work outside that scope (extra pages, new features, additional revision rounds beyond what's agreed) is billed separately and confirmed with you before starting.",
  },
  {
    title: "Payment",
    body: "Projects are typically billed with an upfront deposit and a final payment on delivery, or in milestones for larger engagements. Final files, source code, and assets are handed over once payment is complete.",
  },
  {
    title: "Ownership",
    body: "Once a project is paid in full, you own the final deliverables — the website, code, or storefront built for you. I may showcase the finished work in my portfolio unless you request confidentiality.",
  },
  {
    title: "Revisions",
    body: "Each project includes agreed revision rounds. Feedback should be consolidated per round to ensure timely delivery.",
  },
  {
    title: "Liability",
    body: "I build and test rigorously before delivery. Any technical bugs introduced by my code will be fixed promptly within a reasonable post-delivery window.",
  },
  {
    title: "Questions",
    body: "If anything here is unclear, or you want to talk through terms before starting a project, email me at vikashchoudhary@gmail.com.",
  },
];

export default function TermsPage() {
  return (
    <>
      <Navbar />
      <main className="relative">
        <PageHeader
          eyebrow="Legal"
          title={
            <>
              Terms &amp; <span className="text-red">Conditions.</span>
            </>
          }
          description="The plain-English version of how we work together on a project."
          breadcrumb={[{ label: "Terms & Conditions" }]}
        />

        <section className="px-6 md:px-10 pb-28 md:pb-36">
          <div className="max-w-[800px] mx-auto flex flex-col gap-12">
            {SECTIONS.map((section) => (
              <FadeSection key={section.title}>
                <h2 className="font-display text-2xl md:text-3xl font-bold mb-3">
                  {section.title}
                </h2>
                <p className="text-black/60 leading-relaxed">{section.body}</p>
              </FadeSection>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
