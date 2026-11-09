import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import type { Dictionary, Locale } from "@/types";
import styles from "./editorial.module.css";

export function CompanyIntroduction({
  dictionary,
  locale,
}: {
  dictionary: Dictionary;
  locale: Locale;
}) {
  return (
    <section id="company-introduction" className={styles.introduction}>
      <Container className={styles.introductionGrid}>
        <div className={styles.introductionLabel}>
          <span aria-hidden="true">01 / SHINEX</span>
          <Link href={`/${locale}/about`}>
            {dictionary.about.eyebrow}
            <ArrowUpRight aria-hidden="true" size={18} />
          </Link>
        </div>
        <div>
          <p className={styles.statement}>{dictionary.hero.description}</p>
          <ul className={styles.principles}>
            {dictionary.whyUs.items.slice(0, 3).map((item, index) => (
              <li key={item.title}>
                <span aria-hidden="true">0{index + 1}</span>
                {item.title}
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
