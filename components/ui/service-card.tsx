import {
  ArrowRight,
  Blocks,
  Building2,
  House,
  PaintRoller,
  PanelsTopLeft,
  Ruler,
  type LucideIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import type { Locale } from "@/types";
import type { ServiceConfig, ServiceContent } from "@/types/service";

const serviceIcons: Record<string, LucideIcon> = {
  blocks: Blocks,
  "building-2": Building2,
  house: House,
  "paint-roller": PaintRoller,
  "panels-top-left": PanelsTopLeft,
  ruler: Ruler,
};

type ServiceCardProps = {
  service: ServiceConfig;
  content: ServiceContent;
  locale: Locale;
  learnMore: string;
  href?: string;
};

export function ServiceCard({
  service,
  content,
  locale,
  learnMore,
  href = `/${locale}/services/${service.slug}`,
}: ServiceCardProps) {
  const Icon = serviceIcons[service.icon] ?? Blocks;

  return (
    <article className="group grid overflow-hidden rounded-2xl border border-[var(--border)] bg-white transition-shadow hover:shadow-[0_18px_38px_-30px_rgb(24_24_27/0.28)] sm:grid-cols-[1fr_0.9fr]">
      <div className="order-2 relative min-h-52 overflow-hidden bg-[var(--background-warm)] sm:order-none">
        <Image
          alt={content.title}
          className="object-cover transition duration-500 group-hover:scale-105"
          fill
          sizes="(max-width: 639px) 100vw, (max-width: 1199px) 42vw, 27vw"
          src={service.image}
        />
      </div>
      <div className="order-1 flex flex-col items-start p-5 sm:order-none sm:p-6">
        <span className="grid size-9 place-items-center rounded-xl bg-[var(--background-warm)] text-[var(--text-primary)]">
          <Icon aria-hidden="true" className="size-[18px] stroke-[1.4]" />
        </span>
        <h3 className="mt-5 text-lg font-semibold tracking-[-0.03em] text-[var(--text-primary)]">
          {content.title}
        </h3>
        <p className="mt-2 flex-1 text-sm leading-6 text-[var(--text-secondary)]">{content.shortDescription}</p>
        <Link
          className="mt-5 inline-flex items-center gap-2 rounded-sm text-sm font-semibold text-[var(--text-primary)] transition-colors hover:text-[var(--text-secondary)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--button-primary)]"
          href={href}
        >
          {learnMore}
          <ArrowRight
            aria-hidden="true"
            className="size-4 transition-transform group-hover:translate-x-1"
          />
        </Link>
      </div>
    </article>
  );
}
