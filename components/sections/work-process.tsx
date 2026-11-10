import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { operationsConfig } from "@/config/operations.config";
import { ArchitecturalImage } from "@/components/ui/architectural-image";
import { getServiceMedia } from "@/config/service-media.config";
import styles from "./editorial.module.css";
import type { Dictionary, Locale } from "@/types";

export function WorkProcess({
  dictionary,
  locale,
}: {
  dictionary: Dictionary;
  locale: Locale;
}) {
  const image = getServiceMedia("monolithic-work", locale).hero;
  return (
    <section className={styles.process}>
      <Container className={styles.processGrid}>
        <div className={styles.processIntro}>
          <SectionHeading
            description={dictionary.process.description}
            eyebrow={dictionary.process.eyebrow}
            inverted
            title={dictionary.process.title}
          />
          <figure className={styles.processImage} data-motion="image">
            <ArchitecturalImage
              image={image}
              className="motion-photo"
              parallax="vertical"
              sizes="(max-width: 767px) 100vw, 45vw"
            />
          </figure>
        </div>
        <ol className={styles.processSteps}>
          {operationsConfig.workflow.map((workflowKey, index) => {
            const step = dictionary.process.steps[index];
            if (!step) return null;

            return (
              <li key={workflowKey}>
                <span aria-hidden="true">{step.number}</span>
                <div>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </div>
              </li>
            );
          })}
        </ol>
      </Container>
    </section>
  );
}
