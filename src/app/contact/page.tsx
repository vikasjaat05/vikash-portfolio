import type { Metadata } from "next";
import ContactPageClient from "@/components/ContactPageClient";
import { getAgencyPlanName } from "@/data/agencyPlans";

export const metadata: Metadata = {
  title: {
    absolute: "Contact Vikash Choudhary | Hire Web & Shopify Developer",
  },
  description:
    "Get in touch with Web & Shopify Developer Vikash Choudhary for custom Shopify store builds, Next.js web applications, or performance optimization projects.",
  alternates: {
    canonical: "https://vikash.website/contact",
  },
  openGraph: {
    title: "Contact Vikash Choudhary | Hire Web & Shopify Developer",
    description:
      "Get in touch with Web & Shopify Developer Vikash Choudhary for custom Shopify store builds, Next.js web applications, or performance optimization projects.",
    url: "https://vikash.website/contact",
    type: "website",
  },
};

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ plan?: string | string[] }>;
}) {
  const requested = (await searchParams).plan;
  const requestedPlan = getAgencyPlanName(typeof requested === "string" ? requested : undefined);
  return <ContactPageClient requestedPlan={requestedPlan} />;
}
