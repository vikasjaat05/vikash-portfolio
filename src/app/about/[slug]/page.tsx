import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Check, Globe, Share2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import PortfolioGrid from "@/components/PortfolioGrid";
import FadeSection from "@/components/FadeSection";
import SkillCard from "@/components/SkillCard";
import Counter from "@/components/Counter";
import CTA from "@/components/CTA";
import ResumeExperienceSection from "@/components/ResumeExperienceSection";
import WorkspaceGear from "@/components/WorkspaceGear";
import { getCategory } from "@/data/portfolio";
import { getFounder, getAllFounderSlugs } from "@/lib/team-data";

export async function generateStaticParams() {
  const slugs = await getAllFounderSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const founder = await getFounder(slug);
  if (!founder) return {};

  const title = `${founder.name} — ${founder.role} Profile | Vikash Choudhary`;
  const description = `${founder.bio} Specialized in ${founder.focus}.`;
  const url = `https://vikash.website/about/${founder.slug}`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      type: "profile",
      images: founder.avatar ? [{ url: founder.avatar, alt: `${founder.name} — ${founder.role}` }] : undefined,
    },
  };
}

export default async function TeamMemberPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const founder = await getFounder(slug);
  if (!founder) notFound();

  const category = getCategory(founder.categorySlug);

  return (
    <>
      <Navbar />
      <main className="relative">
        {/* 1. Hero */}
        <PageHeader
          eyebrow={founder.focus}
          title={founder.name}
          description={founder.bio}
          breadcrumb={[{ label: "About", href: "/about" }, { label: founder.name }]}
        />

        {/* 2. About */}
        <section id="about" className="px-6 md:px-10 py-20 md:py-28">
          <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-10 lg:gap-16">
            <FadeSection>
              <div
                className="group relative aspect-[4/5] lg:h-full lg:aspect-auto rounded-2xl md:rounded-3xl overflow-hidden"
                style={{ background: founder.gradient }}
              >
                <div className="relative z-10 flex items-center justify-between p-6">
                  <span className="text-xs font-semibold uppercase tracking-widest text-white/60">
                    {founder.focus}
                  </span>
                  <div className="flex gap-2 opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-400">
                    <span className="w-8 h-8 rounded-full bg-white/15 backdrop-blur flex items-center justify-center">
                      <Globe size={14} className="text-white" />
                    </span>
                    <span className="w-8 h-8 rounded-full bg-white/15 backdrop-blur flex items-center justify-center">
                      <Share2 size={14} className="text-white" />
                    </span>
                  </div>
                </div>
                <div className="absolute inset-0">
                  <Image
                    src={founder.avatar}
                    alt={founder.name}
                    fill
                    sizes="(min-width: 1024px) 40vw, 100vw"
                    className="object-cover object-top"
                  />
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(180deg, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.05) 50%, rgba(0,0,0,0.55) 100%)",
                    }}
                  />
                </div>
                <div className="absolute bottom-0 left-0 right-0 z-10 p-6">
                  <p className="font-display text-xl md:text-2xl font-bold text-white">
                    {founder.name}
                  </p>
                  <p className="text-sm text-white/70 mt-1">{founder.role}</p>
                </div>
              </div>
            </FadeSection>

            <FadeSection className="h-full">
              <div className="flex flex-col h-full lg:justify-between gap-10">
                <div>
                  <div className="inline-flex items-center gap-2 border border-black/10 rounded-full px-4 py-1.5 mb-6 text-xs font-semibold uppercase tracking-widest text-black/60">
                    <span className="w-1.5 h-1.5 rounded-full bg-red" />
                    {founder.role}
                  </div>

                  <h2 className="font-display text-2xl md:text-3xl font-bold mb-6">
                    About {founder.name.split(" ")[0]}
                  </h2>

                  <div className="flex flex-col gap-5">
                    {founder.longBio.split("\n\n").map((paragraph, i) => (
                      <p key={i} className="text-black/60 leading-relaxed">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-widest text-black/50 mb-4">
                    Highlights
                  </h3>
                  <ul className="flex flex-col gap-3 mb-8">
                    {founder.highlights.map((point) => (
                      <li key={point} className="flex items-start gap-3">
                        <span className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full bg-red/10 flex items-center justify-center">
                          <Check size={12} className="text-red" strokeWidth={3} />
                        </span>
                        <span className="text-black/70 leading-relaxed">{point}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="border-t border-black/10 pt-6">
                    <Link
                      href="/"
                      data-cursor-hover
                      className="inline-flex items-center gap-2 font-semibold underline-swipe"
                    >
                      <ArrowLeft size={18} />
                      Back to portfolio
                    </Link>
                  </div>
                </div>
              </div>
            </FadeSection>
          </div>
        </section>

        {/* 3. Skills */}
        <section
          id="skills"
          className="relative px-6 md:px-10 py-20 md:py-28 overflow-hidden"
          style={{ background: "linear-gradient(180deg, #f5f1ea 0%, #ece5da 100%)" }}
        >
          <div
            className="absolute top-1/3 left-1/4 w-[45vw] h-[45vw] rounded-full bg-red/10 blur-[120px] pointer-events-none"
            aria-hidden="true"
          />
          <div
            className="absolute bottom-0 right-0 w-[30vw] h-[30vw] rounded-full bg-black/5 blur-[100px] pointer-events-none"
            aria-hidden="true"
          />

          <div className="max-w-[1400px] mx-auto relative z-10">
            <FadeSection>
              <div className="flex items-center gap-3 mb-6">
                <span className="w-2.5 h-2.5 rounded-full bg-red" />
                <span className="text-xs font-semibold uppercase tracking-widest text-black/50">
                  What {founder.name.split(" ")[0]} works with
                </span>
              </div>
              <h2 className="font-display font-extrabold text-3xl md:text-5xl leading-[1.05] mb-10 md:mb-14 max-w-2xl">
                Skills &amp; <span className="text-red">tools.</span>
              </h2>
            </FadeSection>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-6">
              {founder.skills.map((s, i) => (
                <FadeSection key={s} className="h-full">
                  <SkillCard skill={s} index={i} />
                </FadeSection>
              ))}
            </div>
          </div>
        </section>

        {/* 4. Experience & Education */}
        <ResumeExperienceSection />

        {/* Workspace, Accessories & AI Tools */}
        <WorkspaceGear />

        {/* 5. Work */}
        {category && category.items.length > 0 && (
          <section id="work" className="px-6 md:px-10 py-20 md:py-28">
            <div className="max-w-[1400px] mx-auto">
              <FadeSection>
                <div className="flex items-center gap-3 mb-6">
                  <span className="w-2.5 h-2.5 rounded-full bg-red" />
                  <span className="text-xs font-semibold uppercase tracking-widest text-black/50">
                    Work by {founder.name.split(" ")[0]}
                  </span>
                </div>
                <h2 className="font-display font-extrabold text-3xl md:text-5xl leading-[1.05] mb-14 md:mb-16 max-w-2xl">
                  {category.label} <span className="text-red">projects.</span>
                </h2>
              </FadeSection>

              <FadeSection>
                <PortfolioGrid items={category.items} categorySlug={category.slug} />
              </FadeSection>
            </div>
          </section>
        )}

        {/* 6. Stats */}
        <section id="stats" className="px-6 md:px-10 py-20 md:py-28 bg-[#f5f1ea]">
          <div className="max-w-[1400px] mx-auto">
            <FadeSection>
              <div className="flex items-center gap-3 mb-10 md:mb-14">
                <span className="w-2.5 h-2.5 rounded-full bg-red" />
                <span className="text-xs font-semibold uppercase tracking-widest text-black/50">
                  By the numbers
                </span>
              </div>
            </FadeSection>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 md:gap-10">
              {founder.stats.map((stat) => (
                <FadeSection key={stat.label}>
                  <div className="border-l-2 border-red pl-5">
                    <div className="font-display text-4xl md:text-6xl font-extrabold">
                      <Counter to={stat.value} suffix={stat.suffix} />
                    </div>
                    <div className="text-black/50 text-sm mt-2 uppercase tracking-wide">
                      {stat.label}
                    </div>
                  </div>
                </FadeSection>
              ))}
            </div>
          </div>
        </section>

        {/* 7. Contact */}
        <CTA />
      </main>
      <Footer />
    </>
  );
}
