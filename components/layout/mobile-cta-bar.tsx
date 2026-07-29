"use client";

import { ContactTrigger } from "@/components/forms/contact-dialog";

type MobileCtaBarProps = {
  contactLabel: string;
};

export function MobileCtaBar({ contactLabel }: MobileCtaBarProps) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-[var(--border)] bg-white/95 px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 shadow-[0_-12px_28px_-24px_rgb(24_24_27/0.45)] backdrop-blur sm:hidden">
      <div className="mx-auto flex max-w-md gap-2">
        <ContactTrigger
          className="min-h-12 flex-1 rounded-xl px-3"
          label={contactLabel}
        />
      </div>
    </div>
  );
}
