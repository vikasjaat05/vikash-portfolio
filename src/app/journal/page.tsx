import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import FadeSection from "@/components/FadeSection";
import ArticleRow from "@/components/ArticleRow";
import { ARTICLES } from "@/data/journal";

export default function JournalPage() {
  return (
    <>
      <Navbar />
      <main className="relative">
        <PageHeader
          eyebrow="Journal"
          title={
            <>
              Ideas on design, growth <span className="text-red">and building well.</span>
            </>
          }
          description="Notes from the studio — what we're learning across web, app, marketing, and design work."
          breadcrumb={[{ label: "Journal" }]}
        />

        <section className="px-6 md:px-10 pb-28 md:pb-36">
          <div className="max-w-[1000px] mx-auto divide-y divide-black/10 border-t border-b border-black/10">
            {ARTICLES.map((article) => (
              <FadeSection key={article.slug}>
                <ArticleRow article={article} />
              </FadeSection>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
