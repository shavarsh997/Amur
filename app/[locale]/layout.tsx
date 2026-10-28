import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import Script from "next/script";

import { Footer } from "@/components/layout/footer";
import { ConversionTracking } from "@/components/analytics/conversion-tracking";
import { WebVitals } from "@/components/analytics/web-vitals";
import { Header } from "@/components/layout/header";
import { MobileContactBar } from "@/components/layout/mobile-contact-bar";
import { ContactDialog } from "@/components/forms/contact-dialog";
import { SiteMotion } from "@/components/motion/site-motion";
import { ConstructionBackdrop } from "@/components/motion/construction-backdrop";
import { companyConfig } from "@/config/company.config";
import { seoConfig } from "@/config/seo.config";
import { getSiteOrigin } from "@/lib/company";
import { CANONICAL_SITE_URL } from "@/lib/site-url";
import { shouldPreventIndexing } from "@/lib/seo-environment";
import {
  getDictionary,
  isLocale,
  localeLanguageTags,
  locales,
} from "@/lib/i18n";
import { getRobotsMetadata } from "@/lib/metadata";
import {
  getOrganizationJsonLd,
  getWebsiteJsonLd,
  serializeJsonLd,
} from "@/lib/json-ld";

import "../globals.css";
import "@/components/motion/construction-backdrop.css";
import "@/components/motion/content-layout.css";

const configuredMeasurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? "";
const googleAnalyticsMeasurementId =
  !shouldPreventIndexing() && /^G-[A-Z0-9]+$/.test(configuredMeasurementId)
    ? configuredMeasurementId
    : undefined;

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
  robots: getRobotsMetadata(),
  ...(process.env.GOOGLE_SITE_VERIFICATION?.trim()
    ? { verification: { google: process.env.GOOGLE_SITE_VERIFICATION.trim() } }
    : {}),
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
  const htmlLang = localeLanguageTags[locale];
  return (
    <html
      className="h-full antialiased"
      data-scroll-behavior="smooth"
      lang={htmlLang}
    >
      <body suppressHydrationWarning className="flex min-h-full flex-col">
        <ConversionTracking />
        <div className="flex min-h-screen flex-col pb-[calc(5rem+env(safe-area-inset-bottom))] sm:pb-0">
          <script
            dangerouslySetInnerHTML={{
              __html: serializeJsonLd(getOrganizationJsonLd(locale)),
            }}
            type="application/ld+json"
          />
          <script
            dangerouslySetInnerHTML={{
              __html: serializeJsonLd(getWebsiteJsonLd(locale)),
            }}
            type="application/ld+json"
          />
          <a
            className="sr-only fixed left-4 top-4 z-[200] rounded-md bg-white px-4 py-2 font-semibold text-[var(--text-primary)] shadow focus:not-sr-only focus:outline-2 focus:outline-offset-2 focus:outline-[var(--button-primary)]"
            href="#main-content"
          >
            {dictionary.common.skipToContent}
          </a>
          <Header dictionary={dictionary} locale={locale} />
          <main className="flex-1" id="main-content">
            <SiteMotion backdrop={<ConstructionBackdrop />}>
              {children}
            </SiteMotion>
          </main>
          <Footer dictionary={dictionary} locale={locale} />
          <MobileContactBar dictionary={dictionary} />
          <ContactDialog
            dictionary={{
              contacts: dictionary.contacts,
              estimate: dictionary.estimate,
              calculatorRequest: dictionary.constructionCalculator.request,
              nav: { closeMenu: dictionary.nav.closeMenu },
              common: {
                back: dictionary.common.back,
                loading: dictionary.common.loading,
                optional: dictionary.common.optional,
                website: dictionary.common.website,
              },
            }}
            locale={locale}
          />
        </div>
        {googleAnalyticsMeasurementId ? (
          <>
            <WebVitals />
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsMeasurementId}`}
              strategy="lazyOnload"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                if (window.location.origin === ${JSON.stringify(CANONICAL_SITE_URL)}) {
                window.dataLayer = window.dataLayer || [];
                window.gtag = function(){window.dataLayer.push(arguments);};
                window.gtag('js', new Date());
                window.gtag('config', ${JSON.stringify(googleAnalyticsMeasurementId)}, {
                  send_page_view: false,
                  page_location: window.location.origin,
                  page_referrer: ''
                });
                window.dispatchEvent(new Event('shinex-analytics-ready'));
                }
              `}
            </Script>
          </>
        ) : null}
      </body>
    </html>
  );
}
