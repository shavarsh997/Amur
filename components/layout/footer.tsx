import { Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";

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
  }));
  const socialLinks = config.contacts.socials.filter((social) => social.url);

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
                  <Link
                    className="rounded-sm transition-colors hover:text-[var(--text-primary)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--button-primary)]"
                    href={item.href}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="font-semibold text-[var(--text-primary)]">
              {dictionary.footer.services}
            </h2>
            <ul className="mt-5 space-y-3 text-sm">
              {getActiveServices(locale)
                .map(({ content, slug }) => (
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
            <ul className="mt-5 space-y-4 text-sm">
              {config.contacts.phoneHref ? (
                <li>
                  <a
                    className="inline-flex items-center gap-2 rounded-sm hover:text-[var(--text-primary)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--button-primary)]"
                    href={config.contacts.phoneHref}
                  >
                    <Phone
                      aria-hidden="true"
                      className="size-4 text-[var(--text-muted)]"
                    />
                    {config.contacts.phone}
                  </a>
                </li>
              ) : null}
              {config.contacts.email ? (
                <li>
                  <a
                    className="inline-flex items-center gap-2 rounded-sm hover:text-[var(--text-primary)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--button-primary)]"
                    href={`mailto:${config.contacts.email}`}
                  >
                    <Mail
                      aria-hidden="true"
                      className="size-4 text-[var(--text-muted)]"
                    />
                    {config.contacts.email}
                  </a>
                </li>
              ) : null}
              {config.contacts.address ? (
                <li className="flex items-start gap-2">
                  <MapPin
                    aria-hidden="true"
                    className="mt-0.5 size-4 shrink-0 text-[var(--text-muted)]"
                  />
                  {config.contacts.address}
                </li>
              ) : null}
            </ul>
            {socialLinks.length ? (
              <ul className="mt-6 flex flex-wrap gap-4 text-sm">
                {socialLinks.map((social) => (
                  <li key={social.label}>
                    <a
                      className="rounded-sm font-semibold text-[var(--text-primary)] hover:text-[var(--text-secondary)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--button-primary)]"
                      href={social.url}
                      rel="noreferrer"
                      target="_blank"
                    >
                      {social.label}
                    </a>
                  </li>
                ))}
              </ul>
            ) : null}
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
