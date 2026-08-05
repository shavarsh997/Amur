"use client";

import { ContactTrigger } from "@/components/forms/contact-dialog";

type MobileCtaBarProps = {
  contactLabel: string;
};

export function MobileCtaBar({ contactLabel }: MobileCtaBarProps) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-[var(--border)] bg-[var(--brand-background)] px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 sm:hidden">
      <div className="mx-auto flex max-w-md gap-2">
        <ContactTrigger
          className="min-h-12 flex-1 px-3"
          label={contactLabel}
        />
      </div>
    </div>
  );
}
