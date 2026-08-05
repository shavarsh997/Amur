import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Manrope, Noto_Sans_Armenian } from "next/font/google";
import { notFound } from "next/navigation";

import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { MobileCtaBar } from "@/components/layout/mobile-cta-bar";
import { ContactDialog } from "@/components/forms/contact-dialog";
import { companyConfig } from "@/config/company.config";
import { seoConfig } from "@/config/seo.config";
import { getSiteOrigin } from "@/lib/company";
import { getDictionary, isLocale, locales } from "@/lib/i18n";
import {
  getOrganizationJsonLd,
  getWebsiteJsonLd,
  serializeJsonLd,
} from "@/lib/json-ld";

import "../globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["cyrillic", "latin"],
});

const notoArmenian = Noto_Sans_Armenian({
  variable: "--font-armenian",
  subsets: ["armenian"],
});

export const metadata: Metadata = {
  metadataBase: new URL(getSiteOrigin()),
  title: {
    default: companyConfig.brand.name,
    template: `%s | ${companyConfig.brand.name}`,
  },
  applicationName: companyConfig.brand.name,
  manifest: "/manifest.webmanifest",
  icons: {
    icon: [{ url: "/icon.png", sizes: "512x512", type: "image/png" }],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
  },
  category: seoConfig.category,
  robots: seoConfig.robots,
};

export const viewport: Viewport = {
  themeColor: "#fcfaf8",
  colorScheme: "light",
};

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
  const htmlLang = locale === "hy" ? "hy-AM" : locale === "ru" ? "ru-AM" : "en";
  return (
    <html
      className={`${manrope.variable} ${notoArmenian.variable} h-full antialiased`}
      lang={htmlLang}
    >
      <body suppressHydrationWarning className="flex min-h-full flex-col">
        <div className="flex min-h-screen flex-col">
          <script
            dangerouslySetInnerHTML={{
              __html: serializeJsonLd(getOrganizationJsonLd()),
            }}
            type="application/ld+json"
          />
          <script
            dangerouslySetInnerHTML={{
              __html: serializeJsonLd(getWebsiteJsonLd()),
            }}
            type="application/ld+json"
          />
          <a
            className="sr-only fixed left-4 top-4 z-[200] rounded-md bg-white px-4 py-2 font-semibold text-[var(--text-primary)] shadow focus:not-sr-only focus:outline-2 focus:outline-offset-2 focus:outline-[var(--button-primary)]"
            href="#main-content"
          >
            Անցնել հիմնական բովանդակությանը
          </a>
          <Header dictionary={dictionary} locale={locale} />
          <main className="flex-1 pb-20 sm:pb-0" id="main-content">
            {children}
          </main>
          <Footer dictionary={dictionary} locale={locale} />
          <ContactDialog dictionary={dictionary} locale={locale} />
          <MobileCtaBar contactLabel={dictionary.nav.contacts} />
        </div>
      </body>
    </html>
  );
}
