import { MapPin } from "lucide-react";

import { homeContent } from "@/config/home-content.config";
import { Container } from "@/components/ui/container";
import type { Locale } from "@/types";

export function ServiceArea({ locale }: { locale: Locale }) {
  const content = homeContent[locale].serviceArea;

  return (
    <section className="bg-white py-12 sm:py-16 lg:py-20">
      <Container>
        <div className="grid gap-6 rounded-[28px] bg-[var(--background-warm)] p-6 sm:p-10 lg:grid-cols-[1fr_0.9fr] lg:items-center">
          <div>
            <MapPin aria-hidden="true" className="size-6 stroke-[1.35]" />
            <h2 className="mt-6 text-3xl font-semibold tracking-[-0.04em] text-[var(--text-primary)] sm:text-4xl">
              {content.title}
            </h2>
            <p className="mt-4 max-w-xl leading-7 text-[var(--text-secondary)]">
              {content.description}
            </p>
          </div>
          <ul className="grid gap-2 sm:grid-cols-3 lg:grid-cols-1">
            {content.details.map((item) => (
              <li
                className="rounded-xl border border-white/80 bg-white/70 px-4 py-3 text-sm font-medium text-[var(--text-primary)]"
                key={item}
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
