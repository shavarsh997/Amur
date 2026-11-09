import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { ArchitecturalImage } from "@/components/ui/architectural-image";
import styles from "./editorial.module.css";
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
    <section className={styles.hero}>
      <div className={styles.heroLayout}>
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow}>
            <span aria-hidden="true" />
            {dictionary.hero.eyebrow}
          </p>
          <h1>{dictionary.hero.title}</h1>
          <p className={styles.heroDescription}>
            {dictionary.footer.description}
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
