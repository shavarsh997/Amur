import Link from "next/link";

import {
  serviceGuideGroups,
  serviceGuidesTitle,
} from "@/config/service-guides.config";
import type { Locale } from "@/types";

export function ServiceGuides({ locale }: { locale: Locale }) {
  return (
    <section className="mt-12 border-t border-[var(--border)] pt-8">
      <h2 className="text-2xl font-semibold tracking-tight text-[var(--text-primary)]">
        {serviceGuidesTitle[locale]}
      </h2>
      <div className="mt-6 grid gap-5 md:grid-cols-3">
        {serviceGuideGroups.map((group) => (
          <div
            className="rounded-2xl border border-[var(--border)] bg-white p-5 sm:p-6"
            key={group.title.en}
          >
            <h3 className="font-semibold text-[var(--text-primary)]">
              {group.title[locale]}
            </h3>
            <ul className="mt-4 space-y-3">
              {group.links.map(({ path, label }) => (
                <li key={path}>
                  <Link
                    className="text-sm leading-6 text-[var(--text-secondary)] underline decoration-[var(--border)] underline-offset-4 hover:text-[var(--text-primary)] focus-visible:outline-2 focus-visible:outline-offset-4"
                    href={`/${locale}/${path}`}
                  >
                    {label[locale]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
