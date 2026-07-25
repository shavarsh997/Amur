import type { ReactNode } from "react";
import { notFound } from "next/navigation";

import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { getDictionary, isLocale, locales } from "@/lib/i18n";
import { siteConfig } from "@/lib/site-config";
import type { SiteConfig } from "@/types";

function hidePlaceholder(value: string) {
  return value.includes("TODO_REPLACE") ? "" : value;
}

const publicSiteConfig = {
  ...siteConfig,
  contacts: {
    ...siteConfig.contacts,
    phone: hidePlaceholder(siteConfig.contacts.phone),
    email: hidePlaceholder(siteConfig.contacts.email),
    address: hidePlaceholder(siteConfig.contacts.address),
    hours: hidePlaceholder(siteConfig.contacts.hours),
  },
} satisfies SiteConfig;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const dictionary = await getDictionary(locale);
  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.brand,
    url: `${siteConfig.siteUrl}/${locale}`,
    areaServed: {
      "@type": "Country",
      name: "Armenia",
    },
    telephone: publicSiteConfig.contacts.phone || undefined,
    email: publicSiteConfig.contacts.email || undefined,
    address: publicSiteConfig.contacts.address
      ? {
          "@type": "PostalAddress",
          addressLocality: publicSiteConfig.contacts.address,
          addressCountry: "AM",
        }
      : undefined,
    sameAs: siteConfig.contacts.socials
      .map((social) => social.url)
      .filter(Boolean),
  };

  return (
    <div className="flex min-h-screen flex-col" lang={locale}>
      <script
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationJsonLd).replace(/</g, "\\u003c"),
        }}
        type="application/ld+json"
      />
      <Header
        config={publicSiteConfig}
        dictionary={dictionary}
        locale={locale}
        transparent={false}
      />
      <main className="flex-1">{children}</main>
      <Footer config={publicSiteConfig} dictionary={dictionary} locale={locale} />
    </div>
  );
}
