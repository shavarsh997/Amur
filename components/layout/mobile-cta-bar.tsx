"use client";

import { Phone } from "lucide-react";

import { CalculatorTrigger } from "@/components/calculator/calculator-dialog";

type MobileCtaBarProps = {
  calculateLabel: string;
  phone?: { href: string; label: string };
};

export function MobileCtaBar({ calculateLabel, phone }: MobileCtaBarProps) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-[var(--border)] bg-white/95 px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 shadow-[0_-12px_28px_-24px_rgb(24_24_27/0.45)] backdrop-blur sm:hidden">
      <div className="mx-auto flex max-w-md gap-2">
        <CalculatorTrigger className="min-h-12 flex-1 rounded-xl px-3" label={calculateLabel} />
        {phone ? (
          <a
            aria-label={phone.label}
            className="grid size-12 shrink-0 place-items-center rounded-xl bg-[var(--background-warm)] text-[var(--text-primary)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--button-primary)]"
            href={phone.href}
          >
            <Phone aria-hidden="true" className="size-5 stroke-[1.5]" />
          </a>
        ) : null}
      </div>
    </div>
  );
}
