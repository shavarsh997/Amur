import Link from "next/link";

import {
  serviceGuideGroups,
  serviceGuidesDescription,
  serviceGuidesTitle,
} from "@/config/service-guides.config";
import type { Locale } from "@/types";

export function ServiceGuides({
  locale,
  prominent = false,
}: {
  locale: Locale;
  prominent?: boolean;
}) {
  return (
    <section
      className={
        prominent ? "pb-4" : "mt-12 border-t border-[var(--border)] pt-8"
      }
    >
      <h2 className="text-2xl font-semibold tracking-tight text-[var(--text-primary)]">
        {serviceGuidesTitle[locale]}
      </h2>
      <p className="mt-4 max-w-4xl leading-7 text-[var(--text-secondary)]">
        {serviceGuidesDescription[locale]}
      </p>
      <div className="content-grid-three mt-6 grid gap-5 md:grid-cols-3">
        {serviceGuideGroups.map((group) => (
          <div
            className="rounded-2xl border border-[var(--border)] bg-white p-5 sm:p-6"
            key={group.title.en}
          >
            <h3 className="font-semibold text-[var(--text-primary)]">
              {group.title[locale]}
            </h3>
            <ul className="mt-4 space-y-3">
              {group.links.map(({ path, label, description }) => (
                <li key={path}>
                  <Link
                    className="text-sm leading-6 text-[var(--text-secondary)] underline decoration-[var(--border)] underline-offset-4 hover:text-[var(--text-primary)] focus-visible:outline-2 focus-visible:outline-offset-4"
                    href={`/${locale}/${path}`}
                  >
                    {label[locale]}
                  </Link>
                  <p className="mt-1 text-sm leading-6 text-[var(--text-secondary)]">
                    {description[locale]}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
