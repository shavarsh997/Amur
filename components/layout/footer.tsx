import Link from "next/link";

import { ContactTrigger } from "@/components/forms/contact-dialog";
import { navigationConfig } from "@/config/navigation.config";
import { siteConfig } from "@/config/site.config";
import { getActiveServices } from "@/config/services.config";
import { BrandMark } from "@/components/ui/brand-mark";
import { Container } from "@/components/ui/container";
import type { Dictionary, Locale } from "@/types";
import type { SiteConfiguration } from "@/types/config";

type FooterProps = {
  locale: Locale;
  dictionary: Dictionary;
  config?: SiteConfiguration;
};

export function Footer({
  locale,
  dictionary,
  config = siteConfig,
}: FooterProps) {
  const prefix = `/${locale}`;
  const navigation = navigationConfig.map((item) => ({
    href: item.path ? `${prefix}/${item.path}` : prefix,
    label: dictionary.nav[item.key],
    isContact: item.key === "contacts",
  }));

  return (
    <footer className="mt-auto border-t border-[var(--border)] bg-white py-12 text-[var(--text-secondary)] sm:py-14">
      <Container>
        <div className="grid gap-10 border-b border-[var(--border)] pb-12 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link
              className="inline-flex items-center gap-2.5 rounded-sm text-[15px] font-bold tracking-[0.04em] text-[var(--text-primary)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--button-primary)]"
              href={prefix}
            >
              <BrandMark className="h-8 w-auto" />
              {config.shortCompanyName}
            </Link>
            <p className="mt-5 max-w-xs text-sm leading-6 text-[var(--text-secondary)]">
              {dictionary.footer.description}
            </p>
          </div>

          <div>
            <h2 className="font-semibold text-[var(--text-primary)]">
              {dictionary.footer.navigation}
            </h2>
            <ul className="mt-5 space-y-3 text-sm">
              {navigation.map((item) => (
                <li key={item.href}>
                  {item.isContact ? (
                    <ContactTrigger label={item.label} variant="link" />
                  ) : (
                    <Link
                      className="rounded-sm transition-colors hover:text-[var(--text-primary)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--button-primary)]"
                      href={item.href}
                    >
                      {item.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="font-semibold text-[var(--text-primary)]">
              {dictionary.footer.services}
            </h2>
            <ul className="mt-5 space-y-3 text-sm">
              {getActiveServices(locale).map(({ content, slug }) => (
                <li key={slug}>
                  <Link
                    className="rounded-sm transition-colors hover:text-[var(--text-primary)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--button-primary)]"
                    href={`${prefix}/services/${slug}`}
                  >
                    {content.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="font-semibold text-[var(--text-primary)]">
              {dictionary.footer.contacts}
            </h2>
            <ContactTrigger
              className="mt-5"
              label={dictionary.nav.contacts}
              variant="secondary"
            />
          </div>
        </div>

        <div className="flex flex-col gap-4 pt-7 text-sm text-[var(--text-muted)] sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {config.companyName}.{" "}
            {dictionary.footer.rights}
          </p>
          <Link
            className="rounded-sm hover:text-[var(--text-primary)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--button-primary)]"
            href={`${prefix}/privacy`}
          >
            {dictionary.footer.privacy}
          </Link>
        </div>
      </Container>
    </footer>
  );
}
