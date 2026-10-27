import type { CSSProperties, ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowDown,
  ArrowUpRight,
  Cable,
  House,
  Paintbrush,
  PanelsTopLeft,
  Plus,
} from "lucide-react";

import { ContactTrigger } from "@/components/forms/contact-dialog";
import { Breadcrumbs, type BreadcrumbItem } from "@/components/ui/breadcrumbs";
import { Container } from "@/components/ui/container";
import { FAQAccordion } from "@/components/ui/faq-accordion";
import type { Dictionary } from "@/types";
import type { ServiceWorkflowStep } from "@/types/service";
import styles from "./service-page.module.css";

export type ServiceLink = { href: string; title: string; description: string };
export type ServicePhoto = { src: string; alt: string; caption?: string };

export function ServicePage({ children }: { children: ReactNode }) {
  return (
    <div className={styles.page} data-service-page>
      {children}
    </div>
  );
}

export function ServiceHero({
  breadcrumbs,
  breadcrumbsLabel,
  title,
  description,
  image,
  contactLabel,
  exploreLabel,
  secondaryAction,
}: {
  breadcrumbs: readonly BreadcrumbItem[];
  breadcrumbsLabel: string;
  title: string;
  description: string;
  image: ServicePhoto;
  contactLabel: string;
  exploreLabel: string;
  secondaryAction?: ReactNode;
}) {
  return (
    <section className={styles.hero} aria-labelledby="service-title">
      <div className={styles.heroCopy}>
        <Breadcrumbs
          items={[...breadcrumbs]}
          ariaLabel={breadcrumbsLabel}
          className={styles.breadcrumbs}
        />
        <h1 id="service-title">{title}</h1>
        <p className={styles.heroDescription}>{description}</p>
        <div
          className={
            secondaryAction
              ? `action-group ${styles.heroActions}`
              : styles.actions
          }
        >
          <ContactTrigger label={contactLabel} />
          {secondaryAction ?? (
            <a className={styles.textLink} href="#service-details">
              {exploreLabel}
              <ArrowDown aria-hidden="true" size={16} />
            </a>
          )}
        </div>
      </div>
      <figure className={styles.heroPhoto}>
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes="(max-width: 767px) 100vw, (max-width: 1599px) 55vw, 880px"
          loading="eager"
          fetchPriority="high"
          className={styles.photo}
        />
        <figcaption>{image.caption ?? image.alt}</figcaption>
      </figure>
    </section>
  );
}

export function ServiceSection({
  id,
  eyebrow,
  title,
  description,
  children,
  tone = "light",
}: {
  id?: string;
  eyebrow?: string;
  title: string;
  description?: ReactNode;
  children?: ReactNode;
  tone?: "light" | "warm";
}) {
  return (
    <section
      id={id}
      className={`${styles.section} ${tone === "warm" ? styles.warm : ""}`}
    >
      <Container>
        <div className={styles.sectionHeader}>
          <div>
            {eyebrow ? <p className={styles.eyebrow}>{eyebrow}</p> : null}
            <h2>{title}</h2>
          </div>
          {description ? (
            <div className={styles.sectionDescription}>{description}</div>
          ) : null}
        </div>
        {children}
      </Container>
    </section>
  );
}

const scopeIcons = [Paintbrush, Cable, House, PanelsTopLeft];
export function ServiceScope({ cards }: { cards: readonly ServiceLink[] }) {
  return (
    <div className={styles.scopeGrid}>
      {cards.map((card, index) => {
        const Icon = scopeIcons[index % scopeIcons.length];
        return (
          <Link className={styles.scopeCard} href={card.href} key={card.title}>
            <Icon aria-hidden="true" size={30} strokeWidth={1.2} />
            <h3>{card.title}</h3>
            <p>{card.description}</p>
            <ArrowUpRight
              aria-hidden="true"
              className={styles.cardArrow}
              size={20}
            />
          </Link>
        );
      })}
    </div>
  );
}

export function ServiceDetails({
  title,
  eyebrow,
  paragraphs,
  image,
  children,
}: {
  title: string;
  eyebrow: string;
  paragraphs: readonly string[];
  image: ServicePhoto;
  children?: ReactNode;
}) {
  return (
    <section className={styles.details} id="service-details">
      <Container className={styles.detailsGrid}>
        <figure className={styles.detailPhoto}>
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes="(max-width: 767px) calc(100vw - 40px), (max-width: 1279px) 42vw, 520px"
            className={styles.photo}
          />
          <figcaption>{image.caption ?? image.alt}</figcaption>
        </figure>
        <div className={styles.detailsCopy}>
          <p className={styles.eyebrow}>{eyebrow}</p>
          <h2>{title}</h2>
          {paragraphs.map((paragraph) => (
            <p className={styles.prose} key={paragraph}>
              {paragraph}
            </p>
          ))}
          {children}
        </div>
      </Container>
    </section>
  );
}

export function ServiceList({ items }: { items: readonly string[] }) {
  return (
    <ul className={styles.workList}>
      {items.map((item) => (
        <li key={item}>
          <span aria-hidden="true" className={styles.listRule} />
          {item}
        </li>
      ))}
    </ul>
  );
}

export function ServiceWorkGrid({ items }: { items: readonly string[] }) {
  return (
    <ul className={styles.workGrid}>
      {items.map((item, index) => (
        <li key={item}>
          <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
          <p>{item}</p>
        </li>
      ))}
    </ul>
  );
}

export function ServiceFacts({
  groups,
}: {
  groups: readonly { title: string; items: readonly string[] }[];
}) {
  return (
    <div className={styles.facts}>
      {groups
        .filter((group) => group.items.length)
        .map((group) => (
          <section key={group.title}>
            <h3>{group.title}</h3>
            <ServiceList items={group.items} />
          </section>
        ))}
    </div>
  );
}

export function ServiceProcess({
  steps,
}: {
  steps: readonly ServiceWorkflowStep[];
}) {
  const count = Math.max(steps.length, 1);
  const columns = (limit: number) =>
    Math.ceil(count / Math.ceil(count / limit));

  return (
    <ol
      className={styles.timeline}
      style={
        {
          "--process-columns": columns(4),
          "--process-columns-tablet": columns(3),
        } as CSSProperties
      }
    >
      {steps.map((step, index) => (
        <li key={step.title}>
          <span className={styles.stepNumber} aria-hidden="true">
            {String(index + 1).padStart(2, "0")}
          </span>
          <h3>{step.title}</h3>
          {step.description ? <p>{step.description}</p> : null}
        </li>
      ))}
    </ol>
  );
}

export function ServicePricing({
  title,
  description,
  factors,
  requirementsTitle,
  requirements,
  contactLabel,
  children,
  aside,
}: {
  title: string;
  description?: ReactNode;
  factors?: readonly string[];
  requirementsTitle?: string;
  requirements?: readonly string[];
  contactLabel: string;
  children?: ReactNode;
  aside?: ReactNode;
}) {
  return (
    <section
      className={`${styles.section} ${styles.pricing}`}
      id="service-pricing"
    >
      <Container>
        <div className={styles.pricingHeader}>
          <div className={styles.pricingIntro}>
            <p className={styles.eyebrow}>SHINEX</p>
            <h2>{title}</h2>
            {description ? (
              <div className={styles.prose}>{description}</div>
            ) : null}
          </div>
          <div className={`${styles.actions} ${styles.pricingAction}`}>
            <ContactTrigger label={contactLabel} />
          </div>
        </div>
        {children}
        {factors?.length ? (
          <div className={styles.pricingFactors}>
            <ServiceList items={factors} />
          </div>
        ) : null}
        {requirements?.length ? (
          <section className={styles.requirements}>
            <h3>{requirementsTitle}</h3>
            <ServiceList items={requirements} />
          </section>
        ) : null}
        {aside ? <div className={styles.pricingAside}>{aside}</div> : null}
      </Container>
    </section>
  );
}

export function ServiceFAQ({
  title,
  items,
}: {
  title: string;
  items: readonly { question: string; answer: string }[];
}) {
  if (!items.length) return null;
  return (
    <section className={styles.section}>
      <Container className={styles.faqGrid}>
        <div>
          <p className={styles.eyebrow}>SHINEX / FAQ</p>
          <h2>{title}</h2>
        </div>
        <div className={styles.faq}>
          <FAQAccordion items={items} />
        </div>
      </Container>
    </section>
  );
}

function RelatedCard({ link }: { link: ServiceLink }) {
  return (
    <Link href={link.href} className={styles.relatedCard}>
      <div>
        <h3>{link.title}</h3>
        <p>{link.description}</p>
      </div>
      <ArrowUpRight aria-hidden="true" size={20} />
    </Link>
  );
}

export function RelatedServices({
  title,
  links,
  moreLabel,
}: {
  title: string;
  links: readonly ServiceLink[];
  moreLabel: string;
}) {
  if (!links.length) return null;
  return (
    <ServiceSection title={title} tone="warm">
      <div className={styles.relatedGrid}>
        {links.slice(0, 3).map((link) => (
          <RelatedCard key={link.href} link={link} />
        ))}
      </div>
      {links.length > 3 ? (
        <details className={styles.moreServices}>
          <summary>
            {moreLabel}
            <Plus aria-hidden="true" size={18} />
          </summary>
          <div className={styles.relatedGrid}>
            {links.slice(3).map((link) => (
              <RelatedCard key={link.href} link={link} />
            ))}
          </div>
        </details>
      ) : null}
    </ServiceSection>
  );
}

export function ServiceCTA({ dictionary }: { dictionary: Dictionary }) {
  return (
    <section className={styles.cta}>
      <Container className={styles.ctaGrid}>
        <div>
          <p className={styles.eyebrow}>SHINEX</p>
          <h2>{dictionary.cta.title}</h2>
          <p>{dictionary.cta.description}</p>
          <div className={styles.actions}>
            <ContactTrigger
              label={dictionary.cta.primaryAction}
              variant="secondary"
            />
          </div>
        </div>
        <aside>
          <span className={styles.ctaMark} aria-hidden="true">
            ↗
          </span>
          <h3>{dictionary.whyUs.items[5].title}</h3>
          <p>{dictionary.whyUs.items[5].description}</p>
        </aside>
      </Container>
    </section>
  );
}
