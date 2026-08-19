import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import FadeSection from "@/components/FadeSection";

const SECTIONS = [
  {
    title: "What we collect",
    body: "When you fill out our contact form, we collect the name, email, company, budget range, and project details you choose to share. We don't collect anything else about you unless you give it to us directly.",
  },
  {
    title: "Cookies",
    body: "We use a small number of cookies to remember your preferences (like this cookie notice) and to understand, in aggregate, how visitors use this site. We don't sell your data or share it with advertisers.",
  },
  {
    title: "How we use it",
    body: "Information you submit through our contact form is used only to respond to your inquiry and, if we start working together, to deliver the project. We keep it only as long as we need to.",
  },
  {
    title: "Third parties",
    body: "We use a small number of trusted services to run this site — for example, sending emails when you submit our contact form, and hosting the videos and images you see here. These providers only see what's necessary to do their job.",
  },
  {
    title: "Your choices",
    body: "You can ask me to delete any information you've shared with me at any time by emailing vikashchoudhary@gmail.com.",
  },
];

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <main className="relative">
        <PageHeader
          eyebrow="Legal"
          title={
            <>
              Privacy <span className="text-red">Policy.</span>
            </>
          }
          description="Straightforward, in plain English — no legal jargon you have to decode."
          breadcrumb={[{ label: "Privacy Policy" }]}
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
