import { MessageCircle, Phone } from "lucide-react";
import { PhoneLink } from "@/components/forms/phone-contact";
import { getPhoneHref, getWhatsAppHref } from "@/lib/company";
import type { Dictionary } from "@/types";

/** Reserved space in the layout keeps the fixed mobile controls off the footer. */
export function MobileContactBar({ dictionary }: { dictionary: Dictionary }) {
  const phone = getPhoneHref();
  const whatsapp = getWhatsAppHref();
  return (
    <div
      className="fixed inset-x-0 bottom-0 z-40 border-t border-[var(--border)] bg-white px-3 pt-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] shadow-[0_-4px_20px_rgb(0_0_0/0.05)] sm:hidden"
      data-mobile-contact-bar
    >
      <div className="mx-auto flex max-w-lg items-center gap-2">
        {phone ? (
          <PhoneLink
            className="flex min-h-12 flex-1 items-center justify-center gap-2 rounded-xl border border-[var(--border)] text-sm font-semibold"
            href={phone}
          >
            <Phone className="size-4" aria-hidden="true" />
            {dictionary.contacts.phone}
          </PhoneLink>
        ) : null}
        {whatsapp ? (
          <a
            className="flex min-h-12 flex-1 items-center justify-center gap-2 rounded-xl border border-[var(--border)] text-sm font-semibold"
            href={whatsapp}
            target="_blank"
            rel="noreferrer"
          >
            <MessageCircle className="size-4" aria-hidden="true" />
            {dictionary.contacts.whatsapp}
          </a>
        ) : null}
        {/* <ContactTrigger
          className="min-h-12 flex-1 !px-3 !text-xs"
          label={dictionary.estimate.submit}
          size="compact"
        /> */}
      </div>
    </div>
  );
}
