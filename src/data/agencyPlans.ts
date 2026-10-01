export type AgencyPlan = {
  slug: "basic" | "pro" | "advanced" | "custom";
  name: string;
  subtitle: string;
  description: string;
  focus: string[];
};

export const AGENCY_PLANS: AgencyPlan[] = [
  {
    slug: "basic",
    name: "Basic",
    subtitle: "A confident first step",
    description: "For a focused landing page or a lean website that presents your brand clearly.",
    focus: ["Responsive page design", "Clear content structure", "Essential launch setup"],
  },
  {
    slug: "pro",
    name: "Pro",
    subtitle: "Room to grow",
    description: "For a fuller brand website or Shopify storefront with a more tailored experience.",
    focus: ["Custom visual direction", "Core pages or storefront", "Content and product setup", "Performance review"],
  },
  {
    slug: "advanced",
    name: "Advanced",
    subtitle: "For bigger ideas",
    description: "For more involved commerce journeys, web applications, and connected features.",
    focus: ["Technical planning", "Custom user journeys", "Integrations and workflows", "Testing and refinement"],
  },
  {
    slug: "custom",
    name: "Custom",
    subtitle: "Made around your brief",
    description: "For unique requirements that need a scope and delivery plan built from the ground up.",
    focus: ["Discovery and roadmap", "Tailored feature scope", "Flexible project phases", "Support options"],
  },
];

export function getAgencyPlanName(slug: string | undefined) {
  return AGENCY_PLANS.find((plan) => plan.slug === slug)?.name;
}
