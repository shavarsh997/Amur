import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Container } from "@/components/ui/container";
import { PageHero } from "@/components/ui/page-hero";
import { getPublishedArticles } from "@/data/blog";
import { getDictionary, isLocale } from "@/lib/i18n";
import { createPageMetadata } from "@/lib/metadata";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale) || !getPublishedArticles().length) notFound();
  const copy = locale === "ru"
    ? ["Гиды по ремонту в Ереване", "Практические материалы SHINEX о планировании ремонта, смете и подготовке объекта."]
    : locale === "en"
      ? ["Renovation guides for Yerevan", "Practical SHINEX guides to renovation planning, estimates, and property preparation."]
      : ["Վերանորոգման ուղեցույցներ Երևանում", "SHINEX-ի գործնական նյութեր վերանորոգման պլանավորման, նախահաշվի և օբյեկտի նախապատրաստման մասին։"];
  return createPageMetadata({ locale, pathname: "blog", title: copy[0], description: copy[1] });
}

export default async function BlogIndexPage({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const articles = getPublishedArticles();
  if (!articles.length) notFound();
  const dictionary = await getDictionary(locale);
  const title = locale === "ru" ? "Гиды по ремонту в Ереване" : locale === "en" ? "Renovation guides for Yerevan" : "Վերանորոգման ուղեցույցներ Երևանում";
  const description = locale === "ru" ? "Проверенные материалы о подготовке к ремонту, сроках и расчёте сметы." : locale === "en" ? "Reviewed guides to preparation, timing, and renovation estimates." : "Ստուգված նյութեր վերանորոգման նախապատրաստման, ժամկետների և նախահաշվի մասին։";
  return <>
    <PageHero breadcrumbs={[{ label: dictionary.common.home, href: `/${locale}` }, { label: title }]} breadcrumbsLabel={dictionary.common.breadcrumbs} description={description} eyebrow="SHINEX" title={title} />
    <Container className="grid gap-5 py-12 sm:grid-cols-2 sm:py-16">
      {articles.map((article) => (
        <article className="rounded-2xl border border-[var(--border)] bg-white p-6" key={article.slug}>
          <h2 className="text-xl font-semibold text-[var(--text-primary)]"><Link href={`/${locale}/blog/${article.slug}`}>{article.translations[locale].title}</Link></h2>
          <p className="mt-3 leading-7 text-[var(--text-secondary)]">{article.translations[locale].excerpt}</p>
        </article>
      ))}
    </Container>
  </>;
}
