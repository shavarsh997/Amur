import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Container } from "@/components/ui/container";
import { PageHero } from "@/components/ui/page-hero";
import { getPublishedArticle, getPublishedArticles } from "@/data/blog";
import { getAbsoluteUrl } from "@/lib/company";
import { getDictionary, isLocale, locales } from "@/lib/i18n";
import { getBreadcrumbJsonLd, serializeJsonLd } from "@/lib/json-ld";
import { createPageMetadata } from "@/lib/metadata";

type Props = { params: Promise<{ locale: string; slug: string }> };

export function generateStaticParams() {
  return locales.flatMap((locale) => getPublishedArticles().map(({ slug }) => ({ locale, slug })));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();
  const article = getPublishedArticle(slug);
  if (!article) notFound();
  const copy = article.translations[locale];
  return createPageMetadata({ locale, pathname: `blog/${slug}`, title: copy.metaTitle, description: copy.metaDescription });
}

export default async function BlogArticlePage({ params }: Props) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();
  const article = getPublishedArticle(slug);
  if (!article) notFound();
  const dictionary = await getDictionary(locale);
  const copy = article.translations[locale];
  const breadcrumbs = [{ label: dictionary.common.home, href: `/${locale}` }, { label: dictionary.blog.label, href: `/${locale}/blog` }, { label: copy.title }];
  const articleJsonLd = { "@context": "https://schema.org", "@type": "Article", headline: copy.title, description: copy.metaDescription, datePublished: article.publishedAt, ...(article.updatedAt ? { dateModified: article.updatedAt } : {}), author: { "@type": "Person", name: article.author.name }, publisher: { "@id": getAbsoluteUrl("/#organization") }, mainEntityOfPage: getAbsoluteUrl(`/${locale}/blog/${slug}`), inLanguage: locale === "hy" ? "hy-AM" : locale === "ru" ? "ru-AM" : "en" };
  return <>
    <script dangerouslySetInnerHTML={{ __html: serializeJsonLd(articleJsonLd) }} type="application/ld+json" />
    <script dangerouslySetInnerHTML={{ __html: serializeJsonLd(getBreadcrumbJsonLd(breadcrumbs)) }} type="application/ld+json" />
    <PageHero breadcrumbs={breadcrumbs} breadcrumbsLabel={dictionary.common.breadcrumbs} description={copy.excerpt} eyebrow="SHINEX" title={copy.title} />
    <article><Container className="mx-auto max-w-3xl space-y-10 py-12 text-lg leading-8 text-[var(--text-secondary)] sm:py-16">
      {copy.body.map((section, index) => <section key={`${section.heading ?? "intro"}-${index}`}>{section.heading ? <h2 className="mb-4 text-3xl font-semibold tracking-[-0.04em] text-[var(--text-primary)]">{section.heading}</h2> : null}{section.paragraphs.map((paragraph) => <p className="mb-4" key={paragraph}>{paragraph}</p>)}</section>)}
    </Container></article>
  </>;
}
