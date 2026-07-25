import Link from "next/link";

import { defaultLocale } from "@/lib/i18n";

export default function NotFound() {
  return (
    <main className="grid min-h-screen place-items-center bg-zinc-50 px-5 text-center">
      <div>
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-blue-700">404</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-zinc-950">
          Page not found
        </h1>
        <p className="mt-4 text-zinc-600">The requested page is unavailable.</p>
        <Link
          className="mt-8 inline-flex min-h-12 items-center rounded-full bg-zinc-950 px-6 py-3 text-sm font-semibold text-white"
          href={`/${defaultLocale}`}
        >
          Amur Build
        </Link>
      </div>
    </main>
  );
}
