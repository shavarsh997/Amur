import { ContactTrigger } from "@/components/forms/contact-dialog";
import { Container } from "@/components/ui/container";
import type { Dictionary, Locale } from "@/types";
import styles from "./editorial.module.css";

export function FinalCta({
  dictionary,
}: {
  locale: Locale;
  dictionary: Dictionary;
}) {
  return (
    <section className={styles.finalCta}>
      <Container className={styles.finalCtaGrid}>
        <div>
          <span className={styles.eyebrow}>SHINEX</span>
          <h2>{dictionary.cta.title}</h2>
          <p>{dictionary.cta.description}</p>
          <div className="action-group mt-8">
            <ContactTrigger label={dictionary.cta.primaryAction} />
          </div>
        </div>
        <aside>
          <span aria-hidden="true">↗</span>
          <p>{dictionary.whyUs.items[5].title}</p>
          <p>{dictionary.whyUs.items[5].description}</p>
        </aside>
      </Container>
    </section>
  );
}
