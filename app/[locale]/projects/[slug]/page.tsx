import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { defaultLocale, getDictionary, isLocale } from "@/lib/i18n";
import { buildMetadata } from "@/lib/metadata";

type Props = { params: Promise<{ locale: string; slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) redirect(`/${defaultLocale}/projects`);
  const dictionary = await getDictionary(locale);

  return buildMetadata({
    locale,
    path: "projects",
    title: dictionary.projects.availabilityTitle,
    description: dictionary.projects.availabilityDescription,
  });
}

export default async function ProjectDetailPage({ params }: Props) {
  const { locale } = await params;
  redirect(`/${isLocale(locale) ? locale : defaultLocale}/projects`);
}
