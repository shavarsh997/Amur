"use client";

import Link from "next/link";
import { useParams } from "next/navigation";

import { Container } from "@/components/ui/container";
import { isLocale } from "@/lib/i18n";

const messages = {
  hy: {
    title: "Էջը չի գտնվել",
    description:
      "Այս հասցեով էջ չկա։ Կարող եք վերադառնալ գլխավոր էջ կամ ընտրել ծառայություն։",
    home: "Գլխավոր էջ",
    services: "Ծառայություններ",
  },
  ru: {
    title: "Страница не найдена",
    description:
      "По этому адресу нет страницы. Перейдите на главную или выберите нужную услугу.",
    home: "На главную",
    services: "Услуги",
  },
  en: {
    title: "Page not found",
    description:
      "There is no page at this address. Return to the homepage or explore our services.",
    home: "Back to home",
    services: "Services",
  },
  de: {
    title: "Seite nicht gefunden",
    description:
      "Unter dieser Adresse gibt es keine Seite. Kehren Sie zur Startseite zurück oder sehen Sie sich unsere Leistungen an.",
    home: "Zur Startseite",
    services: "Leistungen",
  },
  fr: {
    title: "Page introuvable",
    description:
      "Aucune page ne correspond à cette adresse. Revenez à l’accueil ou découvrez nos services.",
    home: "Retour à l’accueil",
    services: "Services",
  },
};

export default function LocaleNotFound() {
  const params = useParams<{ locale?: string }>();
  const locale = isLocale(params.locale) ? params.locale : "hy";
  const copy = messages[locale];
  return (
    <Container className="grid flex-1 place-items-center py-24 text-center">
      <div>
        <p className="text-sm font-bold tracking-[0.2em] text-[var(--brand-accent)]">
          404
        </p>
        <h1 className="mt-4 text-4xl font-semibold text-[var(--text-primary)]">
          {copy.title}
        </h1>
        <p className="mt-4 text-[var(--text-secondary)]">{copy.description}</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            className="inline-flex min-h-12 items-center rounded-full bg-[var(--button-primary)] px-6 py-3 font-semibold text-white"
            href={`/${locale}`}
          >
            {copy.home}
          </Link>
          <Link
            className="inline-flex min-h-12 items-center rounded-full border border-[var(--border)] px-6 py-3 font-semibold text-[var(--text-primary)]"
            href={`/${locale}/services`}
          >
            {copy.services}
          </Link>
        </div>
      </div>
    </Container>
  );
}
