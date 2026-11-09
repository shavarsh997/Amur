import { ArrowUpRight } from "lucide-react";
import { ArchitecturalImage } from "@/components/ui/architectural-image";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { getActiveServices } from "@/config/services.config";
import { getServiceMedia } from "@/config/service-media.config";
import type { Dictionary, Locale } from "@/types";

export function SpecializedServices({
  dictionary,
  locale,
}: {
  dictionary: Dictionary;
  locale: Locale;
}) {
  return (
    <section className="technical-services py-section">
      <Container>
        <h2 className="content-heading">
          {dictionary.services.specializedTitle}
        </h2>
        <div className="technical-services__grid">
          {getActiveServices(locale)
            .filter((service) => service.category === "additional")
            .map((service, index) => {
              const photo = getServiceMedia(service.slug, locale).details;
              return (
                <Link
                  className="technical-service"
                  href={`/${locale}/services/${service.slug}`}
                  key={service.slug}
                >
                  <div className="technical-service__photo">
                    <ArchitecturalImage
                      image={photo}
                      sizes="(max-width: 767px) 100vw, 45vw"
                    />
                  </div>
                  <span
                    className="technical-service__number"
                    aria-hidden="true"
                  >
                    0{index + 1}
                  </span>
                  <h3>{service.content.title}</h3>
                  <p>{service.content.shortDescription}</p>
                  <span className="technical-service__link">
                    {dictionary.services.learnMore}
                    <ArrowUpRight aria-hidden="true" size={18} />
                  </span>
                </Link>
              );
            })}
        </div>
      </Container>
    </section>
  );
}
