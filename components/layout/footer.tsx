import Link from "next/link";

import { ContactTrigger } from "@/components/forms/contact-dialog";
import { navigationConfig } from "@/config/navigation.config";
import { companyConfig } from "@/config/company.config";
import {
  getMailHref,
  getPhoneHref,
  getSocialLinks,
  getWhatsAppHref,
} from "@/lib/company";
import { getActiveServices } from "@/config/services.config";
import { BrandMark } from "@/components/ui/brand-mark";
import { Container } from "@/components/ui/container";
import type { Dictionary, Locale } from "@/types";

type FooterProps = {
  locale: Locale;
  dictionary: Dictionary;
};

export function Footer({ locale, dictionary }: FooterProps) {
  const prefix = `/${locale}`;
  const phoneHref = getPhoneHref();
  const whatsappHref = getWhatsAppHref();
  const mailHref = getMailHref();
  const navigation = navigationConfig.map((item) => ({
    href: item.path ? `${prefix}/${item.path}` : prefix,
    label: dictionary.nav[item.key],
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
              {companyConfig.brand.name}
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
            <div className="mt-5 space-y-3 text-sm">
              {phoneHref && companyConfig.contact.displayPhone ? (
                <a
                  className="block rounded-sm font-semibold text-[var(--text-primary)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--button-primary)]"
                  href={phoneHref}
                >
                  {companyConfig.contact.displayPhone}
                </a>
              ) : null}
              {whatsappHref ? (
                <a
                  className="block rounded-sm hover:text-[var(--text-primary)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--button-primary)]"
                  href={whatsappHref}
                  rel="noreferrer"
                  target="_blank"
                >
                  WhatsApp
                </a>
              ) : null}
              {mailHref && companyConfig.contact.email ? (
                <a
                  className="block rounded-sm hover:text-[var(--text-primary)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--button-primary)]"
                  href={mailHref}
                >
                  {companyConfig.contact.email}
                </a>
              ) : null}
              {companyConfig.contact.address ? (
                <p>{companyConfig.contact.address}</p>
              ) : null}
              {companyConfig.contact.workingHours ? (
                <p>{companyConfig.contact.workingHours}</p>
              ) : null}
              {getSocialLinks().map(({ name, url }) => (
                <a
                  className="block capitalize hover:text-[var(--text-primary)]"
                  href={url}
                  key={name}
                  rel="noreferrer"
                  target="_blank"
                >
                  {name}
                </a>
              ))}
              <ContactTrigger
                className="mt-2"
                label={dictionary.nav.contacts}
                variant="secondary"
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 pt-7 text-sm text-[var(--text-muted)] sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()}{" "}
            {companyConfig.brand.legalName ?? companyConfig.brand.name}.{" "}
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
