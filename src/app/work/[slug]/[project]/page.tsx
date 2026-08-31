import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ExternalLink, KeyRound, Sparkles } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import FadeSection from "@/components/FadeSection";
import CTA from "@/components/CTA";
import { getAllProjectParams, getProject } from "@/data/portfolio";

export function generateStaticParams() {
  return getAllProjectParams();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; project: string }>;
}): Promise<Metadata> {
  const { slug, project } = await params;
  const result = getProject(slug, project);
  if (!result || !result.item) return {};

  const { item, category } = result;
  const title = `${item.title} — ${category.label} Case Study | Vikash Choudhary`;
  const description = `${item.description} Built with ${item.tags.slice(0, 3).join(", ")} by Web & Shopify Developer Vikash Choudhary.`;
  const url = `https://vikash.website/work/${category.slug}/${item.slug}`;

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
      type: "article",
      images: item.imageUrl ? [{ url: item.imageUrl, alt: `${item.title} — ${category.label} project by Vikash Choudhary` }] : undefined,
    },
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string; project: string }>;
}) {
  const { slug, project } = await params;
  const result = getProject(slug, project);
  if (!result || !result.category) notFound();

  const { category, item } = result;

  return (
    <>
      <Navbar />
      <main className="relative">
        <PageHeader
          eyebrow={item.client}
          title={item.title}
          description={item.description}
          breadcrumb={[
            { label: "Work", href: "/work" },
            { label: category.label, href: `/work/${category.slug}` },
            { label: item.title },
          ]}
        />

        <section className="px-6 md:px-10 pb-20 md:pb-28">
          <div className="max-w-[1100px] mx-auto">
            {/* Hero Image / Banner */}
            <FadeSection>
              <div className="relative w-full aspect-[16/9] md:aspect-[21/9] rounded-3xl overflow-hidden mb-12 shadow-2xl border border-black/10 bg-[#121212]">
                {item.imageUrl ? (
                  <Image
                    src={item.imageUrl}
                    alt={item.title}
                    fill
                    priority
                    className="object-cover object-top"
                    sizes="(max-width: 1200px) 100vw, 1100px"
                  />
                ) : (
                  <div
                    className="w-full h-full flex items-center justify-center p-8"
                    style={{ background: item.color }}
                  >
                    <span className="font-display text-4xl md:text-6xl font-bold text-white">
                      {item.title}
                    </span>
                  </div>
                )}

                {/* Overlays / Badges */}
                <div className="absolute bottom-6 left-6 right-6 flex flex-wrap items-center justify-between gap-4 pointer-events-none">
                  <div className="flex flex-wrap gap-2">
                    {item.isWip && (
                      <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold bg-red text-white shadow-xl backdrop-blur">
                        <Sparkles size={14} />
                        In Active Development
                      </span>
                    )}
                    {item.password && (
                      <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold bg-black/90 text-white border border-white/20 shadow-xl backdrop-blur">
                        <KeyRound size={14} className="text-yellow-400" />
                        Storefront Password: {item.password}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </FadeSection>

            {/* Live website bar */}
            {item.liveUrl && (
              <FadeSection className="mb-16">
                <div className="p-6 md:p-8 rounded-2xl bg-[#f5f1ea] border border-black/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div>
                    <h3 className="font-display font-bold text-lg text-black">
                      Experience this build live
                    </h3>
                    <p className="text-xs md:text-sm text-black/60">
                      Explore the live responsive site, performance &amp; user experience.
                    </p>
                  </div>

                  <a
                    href={item.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor-hover
                    className="group inline-flex items-center gap-2 bg-[#0a0a0a] text-white font-semibold text-sm px-7 py-3.5 rounded-full hover:bg-red transition-colors whitespace-nowrap shadow-md"
                  >
                    <span>Visit Live Website</span>
                    <ExternalLink size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </a>
                </div>
              </FadeSection>
            )}

            {/* Case Study Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
              <FadeSection>
                <div className="flex items-center gap-2 mb-4">
                  <span className="w-2 h-2 rounded-full bg-red" />
                  <h2 className="font-display text-2xl md:text-3xl font-bold text-black">
                    The Challenge
                  </h2>
                </div>
                <p className="text-black/70 leading-relaxed text-base md:text-lg">
                  {item.challenge}
                </p>
              </FadeSection>

              <FadeSection>
                <div className="flex items-center gap-2 mb-4">
                  <span className="w-2 h-2 rounded-full bg-red" />
                  <h2 className="font-display text-2xl md:text-3xl font-bold text-black">
                    The Technical Solution
                  </h2>
                </div>
                <p className="text-black/70 leading-relaxed text-base md:text-lg">
                  {item.solution}
                </p>
              </FadeSection>
            </div>

            {/* Measurable Results */}
            <FadeSection className="mt-16 md:mt-20">
              <div className="flex items-center gap-2 mb-8">
                <span className="w-2 h-2 rounded-full bg-red" />
                <h2 className="font-display text-2xl md:text-3xl font-bold">
                  Key Deliverables &amp; Impact
                </h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 border-t border-black/10 pt-8">
                {item.results.map((result) => (
                  <div key={result} className="border-l-2 border-red pl-5 py-1">
                    <p className="font-display text-lg md:text-xl font-bold leading-snug text-black">
                      {result}
                    </p>
                  </div>
                ))}
              </div>
            </FadeSection>

            {/* Tech Tags */}
            <FadeSection className="mt-16 md:mt-20 flex flex-wrap gap-2">
              {item.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs font-semibold px-4 py-2 rounded-full border border-black/15 bg-white text-black/80 shadow-2xs"
                >
                  {tag}
                </span>
              ))}
            </FadeSection>

            {/* Back Navigation */}
            <FadeSection className="mt-16 md:mt-20 pt-8 border-t border-black/10">
              <Link
                href={`/work/${category.slug}`}
                data-cursor-hover
                className="inline-flex items-center gap-2 font-semibold text-black hover:text-red transition-colors underline-swipe"
              >
                <ArrowLeft size={18} />
                Back to {category.label}
              </Link>
            </FadeSection>
          </div>
        </section>

        <CTA />
      </main>
      <Footer />
    </>
  );
}
