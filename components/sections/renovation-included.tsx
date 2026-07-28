import { Check } from "lucide-react";

import { homeContent } from "@/config/home-content.config";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import type { Locale } from "@/types";

export function RenovationIncluded({ locale }: { locale: Locale }) {
  const content = homeContent[locale].renovationIncluded;

  return (
    <section className="bg-[var(--background-soft)] py-12 sm:py-16 lg:py-20">
      <Container>
        <div className="grid gap-8 lg:grid-cols-[0.7fr_1.3fr] lg:gap-14">
          <SectionHeading eyebrow={content.eyebrow} title={content.title} />
          <div>
            <ul className="grid gap-2 sm:grid-cols-2 sm:gap-3">
              {content.items.map((item) => (
                <li className="flex items-center gap-3 rounded-xl border border-[var(--border)] bg-white px-4 py-3 text-sm font-medium text-[var(--text-primary)]" key={item}>
                  <Check aria-hidden="true" className="size-4 shrink-0 stroke-[1.7]" />
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-5 text-sm leading-6 text-[var(--text-secondary)]">{content.notice}</p>
          </div>
        </div>
      </Container>
    </section>
  );
}
