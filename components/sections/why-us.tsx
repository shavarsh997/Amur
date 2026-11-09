import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { ArchitecturalImage } from "@/components/ui/architectural-image";
import { getServiceMedia } from "@/config/service-media.config";
import styles from "./editorial.module.css";
import { operationsConfig } from "@/config/operations.config";
import Link from "next/link";
import type { Dictionary, Locale } from "@/types";

export function WhyUs({
  dictionary,
  locale,
}: {
  dictionary: Dictionary;
  locale: Locale;
}) {
  const image = getServiceMedia("monolithic-work", locale).quality;
  return (
    <section className={styles.why}>
      <Container className={styles.whyGrid}>
        <div>
          <SectionHeading
            align="left"
            description={dictionary.whyUs.description}
            eyebrow={dictionary.whyUs.eyebrow}
            title={dictionary.whyUs.title}
          />
          <figure className={styles.whyPhoto}>
            <ArchitecturalImage
              image={image}
              sizes="(max-width: 767px) 100vw, 45vw"
            />
          </figure>
        </div>
        <div className={styles.benefits}>
          {operationsConfig.benefits.map((benefitKey, index) => {
            const item = dictionary.whyUs.items[index];
            if (!item) return null;

            return (
              <article key={benefitKey}>
                <span aria-hidden="true">0{index + 1}</span>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              </article>
            );
          })}
          <Link href={`/${locale}/about`} className={styles.aboutLink}>
            {dictionary.about.eyebrow}
          </Link>
        </div>
      </Container>
    </section>
  );
}
