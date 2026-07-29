import Link from "next/link";

import { defaultLocale, getDictionary } from "@/lib/i18n";

import "./globals.css";

export default async function GlobalNotFound() {
  const dictionary = await getDictionary(defaultLocale);

  return (
    <html lang={defaultLocale}>
      <body>
        <main className="grid min-h-screen place-items-center bg-zinc-50 px-5 text-center">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-[var(--brand-accent)]">
              404
            </p>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight text-[var(--text-primary)]">
              {dictionary.common.notFoundTitle}
            </h1>
            <p className="mt-4 text-[var(--text-secondary)]">
              {dictionary.common.notFoundDescription}
            </p>
            <Link
              className="mt-8 inline-flex min-h-12 items-center rounded-full bg-[var(--button-primary)] px-6 py-3 text-sm font-semibold text-white"
              href={`/${defaultLocale}`}
            >
              {dictionary.common.returnHome}
            </Link>
          </div>
        </main>
      </body>
    </html>
  );
}
