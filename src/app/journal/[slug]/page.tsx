import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import FadeSection from "@/components/FadeSection";
import CTA from "@/components/CTA";
import { ARTICLES, getArticle } from "@/data/journal";

export function generateStaticParams() {
  return ARTICLES.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return {};

  const title = `${article.title} | Vikash Choudhary`;
  const description = article.excerpt;
  const url = `https://vikash.website/journal/${article.slug}`;

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
      publishedTime: article.date,
      authors: ["Vikash Choudhary"],
    },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  const date = new Date(article.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <>
      <Navbar />
      <main className="relative">
        <PageHeader
          eyebrow={`${article.category} — ${date}`}
          title={article.title}
          description={article.excerpt}
          breadcrumb={[{ label: "Journal", href: "/journal" }, { label: article.title }]}
        />

        <section className="px-6 md:px-10 pb-20 md:pb-28">
          <div className="max-w-[720px] mx-auto">
            <FadeSection>
              <div
                className="w-full aspect-[16/9] rounded-2xl md:rounded-3xl mb-12 md:mb-16"
                style={{ background: article.color }}
              />
            </FadeSection>

            <div className="space-y-6">
              {article.content.map((paragraph, i) => (
                <FadeSection key={i}>
                  <p className="text-black/70 text-base md:text-lg leading-relaxed">
                    {paragraph}
                  </p>
                </FadeSection>
              ))}
            </div>

            <FadeSection className="mt-16 pt-8 border-t border-black/10">
              <Link
                href="/journal"
                data-cursor-hover
                className="inline-flex items-center gap-2 font-semibold underline-swipe"
              >
                <ArrowLeft size={18} />
                Back to Journal
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
