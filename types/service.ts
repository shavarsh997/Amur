import type { Locale } from "@/types";
import type { ServiceIcon } from "@/types/config";

export type ServiceWorkflowStep = {
  title: string;
  description: string;
};

export type ServiceContent = {
  title: string;
  shortDescription: string;
  fullDescription: string;
  heroDescription: string;
  includedWorks: readonly string[];
  suitableFor: readonly string[];
  workflow: readonly ServiceWorkflowStep[];
  priceFactors: readonly string[];
  faq: readonly { question: string; answer: string }[];
  seoTitle: string;
  seoDescription: string;
};

export type ServiceConfig = {
  id: string;
  slug: string;
  isActive: boolean;
  icon: ServiceIcon;
  image: string;
  calculatorCategory?: string;
  translations: Record<Locale, ServiceContent>;
};
