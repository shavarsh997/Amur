import type { CalculatorScenarioId } from "@/config/construction-calculator.config";
import type { Locale } from "@/types";
import type { ServiceIcon } from "@/types/config";

export type ServiceWorkflowStep = {
  title: string;
  description: string;
};

export type ServiceContent = {
  title: string;
  shortTitle?: string;
  shortDescription: string;
  heroTitle?: string;
  fullDescription: string;
  heroDescription: string;
  includedWorks: readonly string[];
  suitableFor: readonly string[];
  customerTypes?: readonly string[];
  workTypes?: readonly string[];
  workflow: readonly ServiceWorkflowStep[];
  priceFactors: readonly string[];
  estimateRequirements?: readonly string[];
  faq: readonly { question: string; answer: string }[];
  primaryCta?: string;
  secondaryCta?: string;
  seoTitle: string;
  seoDescription: string;
};

export type ServiceCategory = "primary" | "additional";

export type ServiceConfig = {
  id: string;
  slug: string;
  order: number;
  category: ServiceCategory;
  isActive: boolean;
  icon: ServiceIcon;
  image: string;
  calculatorCategory?: string;
  calculatorScenario?: CalculatorScenarioId;
  ctaKind?: "calculator" | "contact";
  translations: Record<Locale, ServiceContent>;
};
