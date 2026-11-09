import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { homeContent } from "@/config/home-content.config";
import { getHomeHeroMedia } from "@/config/hero-media.config";
import type { Dictionary, Locale } from "@/types";
import { ContactTrigger } from "@/components/forms/contact-dialog";

export function Hero({
  locale,
  dictionary,
}: {
  locale: Locale;
  dictionary: Dictionary;
}) {
  const content = homeContent[locale];
  const image = getHomeHeroMedia(locale);
  const destinations = [
    "apartment-renovation-yerevan",
    "house-construction",
    "interior-design",
    "commercial-construction",
  ];
  return (
    <section className="home-hero">
      <div className="home-hero__layout">
        <div className="home-hero__copy">
          <p className="home-hero__eyebrow">
            <span aria-hidden="true" />
            {dictionary.hero.eyebrow}
          </p>
          <h1>{dictionary.hero.title}</h1>
          <p className="home-hero__description">
            {dictionary.hero.description}
          </p>
          <div className="action-group mt-8">
            <ContactTrigger
              label={dictionary.hero.primaryAction}
              variant="primary"
            />
            <ButtonLink href={`/${locale}/services`} variant="secondary">
              {dictionary.hero.secondaryAction}
            </ButtonLink>
          </div>
          <ul className="home-hero__benefits">
            {dictionary.whyUs.items.slice(0, 3).map((item, index) => (
              <li key={item.title}>
                <span aria-hidden="true">0{index + 1}</span>
                {item.title}
              </li>
            ))}
          </ul>
        </div>
        <figure className="home-hero__image">
          <Image
            alt={image.alt}
            className="object-cover"
            fill
            loading="eager"
            fetchPriority="high"
            quality={82}
            sizes="(max-width: 959px) 100vw, (max-width: 1800px) 54vw, 972px"
            src={image.src}
          />
          <div className="home-hero__image-rule" aria-hidden="true">
            <ArrowDownRight size={30} strokeWidth={1} />
          </div>
          <figcaption>{image.caption}</figcaption>
        </figure>
      </div>
      <Container>
        <div className="home-directions">
          {content.heroDirections.map((direction, index) => (
            <Link
              key={direction}
              href={`/${locale}/services/${destinations[index]}`}
            >
              <span aria-hidden="true" className="home-directions__number">
                0{index + 1}
              </span>
              <span>{direction}</span>
              <ArrowUpRight aria-hidden="true" size={18} />
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
