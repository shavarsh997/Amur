import { getServicePlanning } from "@/messages/service-planning";
import type { Locale } from "@/types";
import { ServiceSection, ServiceWorkGrid } from "./service-page";

export function ServicePlanning({
  slug,
  locale,
  id = "service-planning",
  eyebrow,
}: {
  slug: string;
  locale: Locale;
  id?: string;
  eyebrow?: string;
}) {
  const content = getServicePlanning(slug, locale);
  if (!content) return null;

  return (
    <ServiceSection
      id={id}
      eyebrow={eyebrow}
      title={content.title}
      description={<p>{content.description}</p>}
      tone="warm"
    >
      <ServiceWorkGrid items={content.items} />
    </ServiceSection>
  );
}
