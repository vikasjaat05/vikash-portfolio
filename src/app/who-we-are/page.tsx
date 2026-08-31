import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import FadeSection from "@/components/FadeSection";
import Clients from "@/components/Clients";
import CTA from "@/components/CTA";

export const metadata: Metadata = {
  title: "Who We Are & Philosophy | Vikash Choudhary",
  description:
    "Independent web engineering and Shopify development backed by senior attention. Learn the values and approach behind Vikash Choudhary's work.",
  alternates: {
    canonical: "https://vikash.website/who-we-are",
  },
  openGraph: {
    title: "Who We Are & Philosophy | Vikash Choudhary",
    description:
      "Independent web engineering and Shopify development backed by senior attention. Learn the values and approach behind Vikash Choudhary's work.",
    url: "https://vikash.website/who-we-are",
    type: "website",
  },
};

const VALUES = [
  {
    title: "Craft over shortcuts",
    desc: "We'd rather ship something a week later that we're proud of than rush something forgettable.",
  },
  {
    title: "Direct access, always",
    desc: "You work with the people actually building your project — no account managers relaying messages.",
  },
  {
    title: "Data before opinions",
    desc: "Design and marketing decisions are backed by real user behavior, not just taste.",
  },
  {
    title: "Built to scale",
    desc: "Every site, app and campaign is engineered to hold up as your business grows, not just launch day.",
  },
];

export default function WhoWeArePage() {
  return (
    <>
      <Navbar />
      <main className="relative">
        <PageHeader
          eyebrow="My Story"
          title={
            <>
              Building fast, modern digital products with <span className="text-red">craft &amp; code.</span>
            </>
          }
          description="Independent web engineering backed by senior attention — no layered agencies, no juniors learning on your budget."
        />

        <section className="px-6 md:px-10 pb-20 md:pb-28">
          <div className="max-w-[1000px] mx-auto">
            <FadeSection>
              <p className="text-lg md:text-2xl font-display font-medium leading-relaxed text-black/80">
                Hi, I&apos;m Vikash Choudhary. I work with founders and high-growth brands who need
                a website, Shopify storefront, or web application that actually converts and
                performs — backed by senior attention from day one to launch.
              </p>
            </FadeSection>
          </div>
        </section>

        <section className="px-6 md:px-10 pb-28 md:pb-36">
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

        <Clients />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
