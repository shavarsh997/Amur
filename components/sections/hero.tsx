import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { ArchitecturalImage } from "@/components/ui/architectural-image";
import styles from "./editorial.module.css";
import Link from "next/link";

import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { homeContent } from "@/config/home-content.config";
import { getHomeHeroMedia } from "@/config/hero-media.config";
import { renovationPriceTiers } from "@/config/pricing.config";
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
  // Same formatting as the price examples, so the headline follows the config.
  const startingPrice = new Intl.NumberFormat(locale, {
    maximumFractionDigits: 0,
  }).format(renovationPriceTiers[0].from);
  const title = dictionary.hero.title.replaceAll("{price}", startingPrice);
  const destinations = [
    "apartment-renovation-yerevan",
    "house-construction",
    "interior-design",
    "commercial-construction",
  ];
  return (
    <section className={styles.hero}>
      <div className={styles.heroLayout}>
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow}>
            <span aria-hidden="true" />
            {dictionary.hero.eyebrow}
          </p>
          <h1>{title}</h1>
          <p className={styles.heroDescription}>
            {dictionary.hero.description}
          </p>
          <div className="action-group mt-8">
            <ContactTrigger
              label={dictionary.hero.primaryAction}
              variant="primary"
            />
            <ButtonLink href={`/${locale}/calculator`} variant="secondary">
              {dictionary.hero.secondaryAction}
            </ButtonLink>
          </div>
          <p className={styles.heroMicrocopy}>{dictionary.hero.microcopy}</p>
          <ul className={styles.heroTrust}>
            {dictionary.hero.trustPoints.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
        </div>
        <figure className={styles.heroImage}>
          <ArchitecturalImage image={image} eager sizes="100vw" />
        </figure>
        <a
          className={styles.continueLink}
          href="#company-introduction"
          aria-label={dictionary.about.eyebrow}
        >
          <ArrowDownRight aria-hidden="true" size={24} strokeWidth={1} />
        </a>
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
