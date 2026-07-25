import { Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";

import { Container } from "@/components/ui/container";
import { siteConfig } from "@/lib/site-config";
import type { Dictionary, Locale, SiteConfig } from "@/types";

type FooterProps = {
  locale: Locale;
  dictionary: Dictionary;
  config?: SiteConfig;
};

export function Footer({
  locale,
  dictionary,
  config = siteConfig,
}: FooterProps) {
  const prefix = `/${locale}`;
  const navigation = [
    { href: prefix, label: dictionary.nav.home },
    { href: `${prefix}/services`, label: dictionary.nav.services },
    { href: `${prefix}/projects`, label: dictionary.nav.projects },
    { href: `${prefix}/about`, label: dictionary.nav.about },
    { href: `${prefix}/contacts`, label: dictionary.nav.contacts },
  ];
  const socialLinks = config.contacts.socials.filter((social) => social.url);

  return (
    <footer className="mt-auto bg-zinc-950 py-14 text-zinc-300 sm:py-16">
      <Container>
        <div className="grid gap-10 border-b border-white/10 pb-12 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link
              className="rounded-sm text-lg font-bold uppercase tracking-[0.12em] text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-600"
              href={prefix}
            >
              {config.brand}
            </Link>
            <p className="mt-5 max-w-xs leading-7 text-zinc-400">
              {dictionary.footer.description}
            </p>
          </div>

          <div>
            <h2 className="font-semibold text-white">{dictionary.footer.navigation}</h2>
            <ul className="mt-5 space-y-3 text-sm">
              {navigation.map((item) => (
                <li key={item.href}>
                  <Link
                    className="rounded-sm transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                    href={item.href}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="font-semibold text-white">{dictionary.footer.services}</h2>
            <ul className="mt-5 space-y-3 text-sm">
              {dictionary.services.items.slice(0, 4).map((service) => (
                <li key={service.slug}>
                  <Link
                    className="rounded-sm transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                    href={`${prefix}/services/${service.slug}`}
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="font-semibold text-white">{dictionary.footer.contacts}</h2>
            <ul className="mt-5 space-y-4 text-sm">
              {config.contacts.phoneHref ? (
                <li>
                  <a
                    className="inline-flex items-center gap-2 rounded-sm hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                    href={config.contacts.phoneHref}
                  >
                    <Phone aria-hidden="true" className="size-4 text-blue-400" />
                    {config.contacts.phone}
                  </a>
                </li>
              ) : null}
              {config.contacts.email ? (
                <li>
                  <a
                    className="inline-flex items-center gap-2 rounded-sm hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                    href={`mailto:${config.contacts.email}`}
                  >
                    <Mail aria-hidden="true" className="size-4 text-blue-400" />
                    {config.contacts.email}
                  </a>
                </li>
              ) : null}
              {config.contacts.address ? (
                <li className="flex items-start gap-2">
                  <MapPin
                    aria-hidden="true"
                    className="mt-0.5 size-4 shrink-0 text-blue-400"
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
                      className="rounded-sm font-semibold text-white hover:text-blue-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
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

        <div className="flex flex-col gap-4 pt-7 text-sm text-zinc-500 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {config.brand}. {dictionary.footer.rights}
          </p>
          <Link
            className="rounded-sm hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            href={`${prefix}/privacy`}
          >
            {dictionary.footer.privacy}
          </Link>
        </div>
      </Container>
    </footer>
  );
}
