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
        <p className={styles.statement}>{dictionary.about.intro}</p>
      </Container>
    </section>
  );
}
