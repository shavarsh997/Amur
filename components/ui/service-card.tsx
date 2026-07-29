import {
  ArrowRight,
  Blocks,
  Building2,
  House,
  PaintRoller,
  PanelsTopLeft,
  PenTool,
  Ruler,
  type LucideIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { ContactTrigger } from "@/components/forms/contact-dialog";
import type { Locale } from "@/types";
import type { ServiceConfig, ServiceContent } from "@/types/service";

const serviceIcons: Record<string, LucideIcon> = {
  blocks: Blocks,
  "building-2": Building2,
  house: House,
  "paint-roller": PaintRoller,
  "pen-tool": PenTool,
  "panels-top-left": PanelsTopLeft,
  ruler: Ruler,
};

type ServiceCardProps = {
  service: ServiceConfig;
  content: ServiceContent;
  locale: Locale;
  learnMore: string;
  contactLabel: string;
  href?: string;
};

export function ServiceCard({
  service,
  content,
  locale,
  learnMore,
  contactLabel,
  href = `/${locale}/services/${service.slug}`,
}: ServiceCardProps) {
  const Icon = serviceIcons[service.icon] ?? Blocks;
  const ctaLabel = content.primaryCta ?? learnMore;

  return (
    <article className="group grid grid-cols-[1fr_7.75rem] overflow-hidden rounded-2xl border border-[var(--border)] bg-white transition-shadow hover:shadow-[0_18px_38px_-30px_rgb(24_24_27/0.28)] sm:grid-cols-[1fr_0.9fr]">
      <div className="order-2 relative min-h-full overflow-hidden bg-[var(--background-warm)] sm:order-none sm:min-h-52">
        <Image
          alt={content.title}
          className="object-cover transition duration-500 group-hover:scale-105"
          fill
          sizes="(max-width: 639px) 100vw, (max-width: 1199px) 42vw, 27vw"
          src={service.image}
        />
      </div>
      <div className="order-1 flex flex-col items-start p-4 sm:order-none sm:p-6">
        <span className="grid size-8 place-items-center rounded-lg bg-[var(--background-warm)] text-[var(--text-primary)] sm:size-9 sm:rounded-xl">
          <Icon aria-hidden="true" className="size-[18px] stroke-[1.4]" />
        </span>
        <h3 className="mt-3 text-[15px] font-semibold leading-5 tracking-[-0.03em] text-[var(--text-primary)] sm:mt-5 sm:text-lg">
          {content.title}
        </h3>
        <p className="mt-1.5 flex-1 text-xs leading-5 text-[var(--text-secondary)] sm:mt-2 sm:text-sm sm:leading-6">
          {content.shortDescription}
        </p>
        {service.ctaKind === "calculator" || service.ctaKind === "contact" ? (
          <ContactTrigger
            className="mt-3 min-h-9 rounded-lg px-3 text-xs sm:mt-5 sm:min-h-10 sm:text-sm"
            label={contactLabel}
          />
        ) : (
          <Link
            className="mt-3 inline-flex items-center gap-2 rounded-sm text-xs font-semibold text-[var(--text-primary)] transition-colors hover:text-[var(--text-secondary)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--button-primary)] sm:mt-5 sm:text-sm"
            href={href}
          >
            {ctaLabel}
            <ArrowRight
              aria-hidden="true"
              className="size-4 transition-transform group-hover:translate-x-1"
            />
          </Link>
        )}
      </div>
    </article>
  );
}
