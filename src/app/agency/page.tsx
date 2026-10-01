import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Check, Code2, Gauge, Layers3, LockKeyhole, ShoppingBag } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AgencyOrbitHero from "@/components/AgencyOrbitHero";
import { WORK_CATEGORIES } from "@/data/portfolio";
import { AGENCY_PLANS } from "@/data/agencyPlans";
import styles from "./agency.module.css";

export const metadata: Metadata = {
  title: { absolute: "Vikash Studio | Digital Design, Shopify & Web Development" },
  description:
    "Vikash Studio is an independent digital studio led by Vikash Choudhary. We design and build distinctive websites, Shopify storefronts, and web applications.",
  alternates: { canonical: "https://vikash.website/agency" },
  openGraph: {
    title: "Vikash Studio | Digital Design, Shopify & Web Development",
    description: "An independent digital studio for ambitious brands and businesses.",
    url: "https://vikash.website/agency",
    type: "website",
  },
};

const SERVICES = [
  { number: "01", title: "Direction & design", detail: "A clear point of view, intuitive journeys, and an identity that belongs to your brand.", tags: "Strategy / Art direction / UX", icon: Layers3 },
  { number: "02", title: "Web experiences", detail: "Memorable websites and web applications with the engineering to back them up.", tags: "Websites / Next.js / Applications", icon: Code2 },
  { number: "03", title: "Shopify commerce", detail: "Thoughtful storefronts that make exploring, choosing, and buying feel effortless.", tags: "Shopify / Custom themes / Commerce", icon: ShoppingBag },
  { number: "04", title: "Better, every day", detail: "Speed, usability, and practical refinements that keep your experience moving forward.", tags: "Performance / Optimization / Support", icon: Gauge },
];

const PROCESS = [
  { number: "01", title: "Listen", description: "We understand your business, audience, and what needs to change." },
  { number: "02", title: "Shape", description: "A clear creative and technical direction takes form before we build." },
  { number: "03", title: "Make", description: "Design and engineering come together with direct, useful feedback." },
  { number: "04", title: "Refine", description: "We polish the details, launch carefully, and learn from real use." },
];

const featuredSlugs = ["maison-nagi", "solax24", "flaneur-global"];
const featured = featuredSlugs
  .map((slug) => WORK_CATEGORIES[0].items.find((item) => item.slug === slug))
  .filter((item) => item !== undefined);
const orbitProjects = WORK_CATEGORIES[0].items
  .filter((item) => item.imageUrl)
  .slice(0, 12)
  .map((item) => ({ slug: item.slug, title: item.title, imageUrl: item.imageUrl as string }));

export default function AgencyPage() {
  return (
    <>
      <Navbar />
      <main className="overflow-hidden bg-[#f5f2eb] text-[#192025]">
        <AgencyOrbitHero projects={orbitProjects} featured={orbitProjects[0]} />

        <div className="border-b border-[#192025]/15 bg-[#e8e2d8] px-6 py-4 sm:px-8 lg:px-12" aria-label="Studio disciplines">
          <div className="mx-auto flex max-w-[1400px] flex-wrap items-center gap-x-5 gap-y-2 text-[10px] font-bold uppercase tracking-[0.18em] text-[#414b4c] sm:justify-between sm:text-xs">
            <span>Creative direction</span><span className="text-[#d06d5c]">✳</span><span>Digital design</span><span className="text-[#d06d5c]">✳</span><span>Shopify commerce</span><span className="text-[#d06d5c]">✳</span><span>Web development</span>
          </div>
        </div>

        <section className="mx-auto grid max-w-[1500px] gap-10 px-6 py-24 sm:px-8 md:py-36 lg:grid-cols-[0.9fr_1.1fr] lg:gap-24 lg:px-12">
          <div>
            <p className="mb-7 text-xs font-semibold uppercase tracking-[0.2em] text-[#a84436]">01 / The studio</p>
            <h2 className="font-display text-[clamp(3.2rem,6.5vw,7rem)] font-semibold leading-[0.95] tracking-[-0.072em]">Small studio.<br /><span className="text-[#a84436]">Strong point<br />of view.</span></h2>
          </div>
          <div className="flex flex-col justify-end">
            <p className="max-w-[660px] font-display text-2xl font-medium leading-[1.3] tracking-[-0.04em] sm:text-3xl md:text-4xl">The best digital work happens when the thinking and the making stay close.</p>
            <div className="mt-9 grid gap-6 border-t border-[#192025]/20 pt-7 text-base leading-relaxed text-[#576064] sm:grid-cols-2 sm:gap-9">
              <p>Vikash Studio is an independent practice led by Vikash Choudhary. You work directly with the person shaping and building your project.</p>
              <p>We bring clarity to the brief, personality to the design, and care to every interaction, from the first screen to the final detail.</p>
            </div>
            <Link href="/about" className="mt-9 inline-flex w-fit items-center gap-2 border-b border-[#192025] pb-1 text-sm font-semibold transition-colors hover:text-[#a84436]">Meet the founder <ArrowUpRight size={17} /></Link>
          </div>
        </section>

        <section className="bg-[#dedbd2] px-6 py-24 sm:px-8 md:py-32 lg:px-12">
          <div className="mx-auto max-w-[1400px]">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
              <div><p className="mb-6 text-xs font-semibold uppercase tracking-[0.2em] text-[#a84436]">02 / What we do</p><h2 className="font-display text-[clamp(3.2rem,7vw,7.5rem)] font-semibold leading-[0.94] tracking-[-0.075em]">One vision.<br />Many ways to make it real.</h2></div>
              <div className="flex items-center gap-6">
                <Link href="/services" className="inline-flex w-fit items-center gap-2 border-b border-[#192025] pb-1 text-sm font-semibold">All services <ArrowUpRight size={17} /></Link>
                <Link href="#agency-plans" className="inline-flex w-fit items-center gap-2 border-b border-[#192025] pb-1 text-sm font-semibold">View plans <ArrowUpRight size={17} /></Link>
              </div>
            </div>
            <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:mt-20 lg:gap-4">
              {SERVICES.map((service, index) => {
                const Icon = service.icon;
                return (
                  <Link key={service.number} href="/services" className={`${styles.serviceCard} ${index === 0 ? styles.serviceCardFeatured : ""} group flex min-h-[320px] flex-col justify-between rounded-[25px] p-6 sm:min-h-[350px] sm:p-8`}>
                    <div className="flex items-start justify-between"><span className="font-mono text-xs opacity-70">{service.number} / 04</span><Icon size={28} strokeWidth={1.35} aria-hidden="true" /></div>
                    <div><h3 className="max-w-[400px] font-display text-[clamp(2rem,3.5vw,3.5rem)] font-semibold leading-[1.04] tracking-[-0.06em]">{service.title}</h3><p className="mt-4 max-w-[440px] text-sm leading-relaxed opacity-75 sm:text-base">{service.detail}</p></div>
                    <div className="mt-8 flex items-end justify-between gap-3 border-t border-current/20 pt-4"><span className="text-[10px] font-semibold uppercase tracking-[0.13em] opacity-65">{service.tags}</span><ArrowUpRight size={20} className="shrink-0 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" /></div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        <section id="selected-work" className="bg-[#151b1f] px-6 py-24 text-white sm:px-8 md:py-32 lg:px-12">
          <div className="mx-auto max-w-[1400px]">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
              <div><p className="mb-6 text-xs font-semibold uppercase tracking-[0.2em] text-[#ef826f]">03 / Selected work</p><h2 className="font-display text-[clamp(3.3rem,7.2vw,7.7rem)] font-semibold leading-[0.94] tracking-[-0.075em]">Proof is in<br /><span className="text-[#ef826f]">the pixels.</span></h2></div>
              <Link href="/work" className="inline-flex w-fit items-center gap-2 border-b border-white/70 pb-1 text-sm font-semibold transition-colors hover:text-[#ef826f]">See all projects <ArrowUpRight size={17} /></Link>
            </div>
            <div className="mt-12 grid gap-4 lg:mt-16 lg:grid-cols-2">
              {featured.map((project, index) => (
                <Link key={project.slug} href={`/work/web/${project.slug}`} className={`${styles.workCard} group relative block overflow-hidden rounded-[24px] bg-[#2c3336] ${index === 0 ? "aspect-[1.1] sm:aspect-[1.55] lg:col-span-2 lg:aspect-[2.18]" : "aspect-[1.1] sm:aspect-[1.42]"}`}>
                  {project.imageUrl && <Image src={project.imageUrl} alt={`${project.title} website preview`} fill sizes={index === 0 ? "(max-width: 1024px) 100vw, 1400px" : "(max-width: 1024px) 100vw, 700px"} className="object-cover transition-transform duration-700 group-hover:scale-[1.045]" />}
                  <span className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />
                  <span className="absolute left-5 top-5 rounded-full border border-white/45 bg-black/20 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] backdrop-blur-md sm:left-7 sm:top-7">{project.tags[0]}</span>
                  <span className="absolute inset-x-5 bottom-5 flex items-end justify-between gap-4 sm:inset-x-7 sm:bottom-7"><span><span className="block text-[10px] font-semibold uppercase tracking-[0.2em] text-white/70">Selected project / 0{index + 1}</span><strong className="mt-1 block font-display text-3xl font-semibold tracking-[-0.055em] sm:text-5xl">{project.title}</strong></span><span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-[#151b1f] transition-transform group-hover:-translate-y-1 group-hover:translate-x-1 sm:h-13 sm:w-13"><ArrowUpRight size={22} /></span></span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="px-6 py-24 sm:px-8 md:py-32 lg:px-12">
          <div className="mx-auto max-w-[1400px]">
            <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20"><div><p className="mb-6 text-xs font-semibold uppercase tracking-[0.2em] text-[#a84436]">04 / The process</p><h2 className="font-display text-[clamp(3.2rem,6.5vw,7rem)] font-semibold leading-[0.94] tracking-[-0.075em]">Good work<br />is made<br /><span className="text-[#a84436]">together.</span></h2></div><p className="max-w-[600px] self-end text-lg leading-relaxed text-[#576064] sm:text-xl">A collaborative process that stays clear from first conversation through launch. You see the work as it takes shape and have a voice in the details.</p></div>
            <div className="mt-14 grid border-t border-[#192025]/20 sm:grid-cols-2 lg:mt-20 lg:grid-cols-4">
              {PROCESS.map((step) => <div key={step.number} className="border-b border-[#192025]/20 py-7 sm:px-5 sm:first:pl-0 lg:border-r lg:last:border-r-0 lg:last:pr-0"><span className="font-mono text-sm font-semibold text-[#a84436]">/{step.number}</span><h3 className="mt-8 font-display text-3xl font-semibold tracking-[-0.055em] lg:mt-20">{step.title}<span className="text-[#a84436]">.</span></h3><p className="mt-3 max-w-[280px] text-sm leading-relaxed text-[#576064] sm:text-base">{step.description}</p></div>)}
            </div>
          </div>
        </section>

        <section id="agency-plans" className="scroll-mt-20 bg-[#e8edeb] px-6 py-24 sm:px-8 md:py-32 lg:px-12">
          <div className="mx-auto max-w-[1400px]">
            <div className="flex flex-col gap-7 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="mb-6 text-xs font-semibold uppercase tracking-[0.2em] text-[#a84436]">05 / Ways to work together</p>
                <h2 className="font-display text-[clamp(3.2rem,6.8vw,7rem)] font-semibold leading-[0.94] tracking-[-0.075em]">Find your<br /><span className="text-[#a84436]">starting point.</span></h2>
              </div>
              <p className="max-w-[420px] text-base leading-relaxed text-[#526064] sm:text-lg">Choose the closest fit. We&apos;ll shape the final scope together and share a private quote after your brief.</p>
            </div>

            <div className="mt-12 grid gap-4 sm:grid-cols-2 xl:mt-16 xl:grid-cols-4">
              {AGENCY_PLANS.map((plan, index) => (
                <article key={plan.slug} className={`${styles.planCard} ${plan.slug === "pro" ? styles.planCardFeatured : ""} ${plan.slug === "custom" ? styles.planCardCustom : ""}`}>
                  <div className="flex items-center justify-between gap-3">
                    <span className="font-mono text-xs font-semibold opacity-70">0{index + 1} / 04</span>
                    <span className="text-[10px] font-semibold uppercase tracking-[0.14em] opacity-70">{plan.slug === "pro" ? "Growing brands" : plan.slug === "custom" ? "Your way" : "Studio plan"}</span>
                  </div>
                  <div className="mt-12">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.16em] opacity-65">{plan.subtitle}</p>
                    <h3 className="mt-3 font-display text-[clamp(2.5rem,3.3vw,3.5rem)] font-semibold leading-none tracking-[-0.065em]">{plan.name}<span className="text-[#d87564]">.</span></h3>
                    <p className="mt-5 min-h-[74px] text-sm leading-relaxed opacity-75">{plan.description}</p>
                  </div>
                  <div className={styles.planQuote}><LockKeyhole size={15} strokeWidth={1.8} aria-hidden="true" /> Quote shared privately</div>
                  <div className="mt-7 border-t border-current/20 pt-5">
                    <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.16em] opacity-60">Typical focus</p>
                    <ul className="space-y-3">
                      {plan.focus.map((item) => <li key={item} className="flex items-start gap-2.5 text-sm leading-snug"><Check size={16} className="mt-0.5 shrink-0 text-[#c45a49]" aria-hidden="true" /><span>{item}</span></li>)}
                    </ul>
                  </div>
                  <Link href={`/contact?plan=${plan.slug}#contact-form`} className={styles.planAction}>Discuss {plan.name} <ArrowUpRight size={17} aria-hidden="true" /></Link>
                </article>
              ))}
            </div>
            <p className="mt-8 text-sm text-[#526064]">Not sure which fits? <Link href="/contact#contact-form" className="font-semibold text-[#192025] underline underline-offset-4">Tell me about your idea</Link> and we&apos;ll find the right scope.</p>
          </div>
        </section>

        <section className="relative overflow-hidden bg-[#ed806b] px-6 py-24 text-[#151b1f] sm:px-8 md:py-32 lg:px-12">
          <div className={styles.ctaMark} aria-hidden="true">V.</div>
          <div className="relative mx-auto max-w-[1400px]"><p className="mb-7 text-xs font-semibold uppercase tracking-[0.2em]">Ready when you are / Let&apos;s talk</p><div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between"><h2 className="font-display text-[clamp(4.1rem,10vw,10.5rem)] font-semibold leading-[0.86] tracking-[-0.085em]">Have a good<br />feeling about<br />this?</h2><Link href="/contact" className="inline-flex min-h-14 w-fit shrink-0 items-center gap-4 rounded-full bg-[#151b1f] px-7 py-4 text-sm font-semibold text-white transition-colors hover:bg-white hover:text-[#151b1f]">Tell me your idea <ArrowUpRight size={19} /></Link></div></div>
        </section>
      </main>
      <Footer />
    </>
  );
}
