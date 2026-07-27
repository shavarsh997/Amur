import Link from "next/link";

import { Container } from "@/components/ui/container";
import { defaultLocale, getDictionary } from "@/lib/i18n";

export default async function LocaleNotFound() {
  const dictionary = await getDictionary(defaultLocale);

  return (
    <Container className="grid flex-1 place-items-center py-24 text-center">
      <div>
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-[var(--brand-accent)]">404</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-[var(--text-primary)]">
          {dictionary.common.notFoundTitle}
        </h1>
        <p className="mt-4 text-[var(--text-secondary)]">{dictionary.common.notFoundDescription}</p>
        <Link
          className="mt-8 inline-flex min-h-12 items-center rounded-full bg-[var(--button-primary)] px-6 py-3 text-sm font-semibold text-white"
          href={`/${defaultLocale}`}
        >
          {dictionary.common.returnHome}
        </Link>
      </div>
    </Container>
  );
}
