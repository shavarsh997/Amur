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

import type { Locale, Service } from "@/types";

const serviceIcons: Record<string, LucideIcon> = {
  blocks: Blocks,
  "building-2": Building2,
  house: House,
  "paint-roller": PaintRoller,
  "panels-top-left": PanelsTopLeft,
  ruler: Ruler,
};

type ServiceCardProps = {
  service: Service;
  locale: Locale;
  learnMore: string;
  href?: string;
};

export function ServiceCard({
  service,
  locale,
  learnMore,
  href = `/${locale}/services/${service.slug}`,
}: ServiceCardProps) {
  const Icon = serviceIcons[service.icon] ?? Blocks;

  return (
    <article className="group overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-sm">
      <div className="relative aspect-[16/10] overflow-hidden bg-zinc-100">
        <Image
          alt={service.title}
          className="object-cover transition duration-500 group-hover:scale-105"
          fill
          sizes="(max-width: 767px) 100vw, (max-width: 1199px) 50vw, 33vw"
          src={service.image}
        />
      </div>
      <div className="flex h-[calc(100%-auto)] flex-col items-start gap-4 p-6">
        <span className="grid size-11 place-items-center rounded-2xl bg-blue-100 text-blue-700">
          <Icon aria-hidden="true" className="size-5" />
        </span>
        <h3 className="text-xl font-semibold tracking-tight text-zinc-950">
          {service.title}
        </h3>
        <p className="flex-1 leading-7 text-zinc-600">{service.shortDescription}</p>
        <Link
          className="inline-flex items-center gap-2 rounded-sm text-sm font-semibold text-zinc-950 transition-colors hover:text-blue-700 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-600"
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
