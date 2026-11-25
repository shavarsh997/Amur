import Link from "next/link";

import {
  serviceGuideGroups,
  serviceGuidesDescription,
  serviceGuidesTitle,
} from "@/config/service-guides.config";
import type { Locale } from "@/types";

/** `compact` (home page): budget links first; on phones (< md) labels only,
 * the intro and link descriptions are hidden by CSS. From md up it matches
 * the regular layout. */
export function ServiceGuides({
  locale,
  prominent = false,
  compact = false,
}: {
  locale: Locale;
  prominent?: boolean;
  compact?: boolean;
}) {
  const groups = compact
    ? [...serviceGuideGroups.slice(-1), ...serviceGuideGroups.slice(0, -1)]
    : serviceGuideGroups;
  return (
    <section
      className={
        prominent
          ? "pb-4"
          : compact
            ? "mt-10 border-t border-[var(--border)] pt-8 md:mt-12"
            : "mt-12 border-t border-[var(--border)] pt-8"
      }
    >
      <h2 className="text-2xl font-semibold tracking-tight text-[var(--text-primary)]">
        {serviceGuidesTitle[locale]}
      </h2>
      <p
        className={`mt-4 max-w-4xl leading-7 text-[var(--text-secondary)] ${compact ? "hidden md:block" : ""}`}
      >
        {serviceGuidesDescription[locale]}
      </p>
      <div
        className={`content-grid-three grid md:grid-cols-3 ${compact ? "mt-5 gap-3 md:mt-6 md:gap-5" : "mt-6 gap-5"}`}
      >
        {groups.map((group) => (
          <div
            className={`rounded-card border border-[var(--border)] bg-white ${compact ? "p-4 sm:p-5 md:p-6" : "p-5 sm:p-6"}`}
            key={group.title.en}
          >
            <h3 className="font-semibold text-[var(--text-primary)]">
              {group.title[locale]}
            </h3>
            <ul
              className={
                compact
                  ? "mt-3 space-y-2 md:mt-4 md:space-y-3"
                  : "mt-4 space-y-3"
              }
            >
              {group.links.map(({ path, label, description }) => (
                <li key={path}>
                  <Link
                    className="text-sm leading-6 text-[var(--text-secondary)] underline decoration-[var(--border)] underline-offset-4 hover:text-[var(--text-primary)] focus-visible:outline-2 focus-visible:outline-offset-4"
                    href={`/${locale}/${path}`}
                  >
                    {label[locale]}
                  </Link>
                  <p
                    className={`mt-1 text-sm leading-6 text-[var(--text-secondary)] ${compact ? "hidden md:block" : ""}`}
                  >
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
