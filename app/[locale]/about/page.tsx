import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { FinalCta } from "@/components/sections/final-cta";
import { Container } from "@/components/ui/container";
import { PageHero } from "@/components/ui/page-hero";
import { getDictionary, isLocale } from "@/lib/i18n";
import { buildMetadata } from "@/lib/metadata";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const { about } = await getDictionary(locale);

  return buildMetadata({
    locale,
    path: "about",
    title: about.title,
    description: about.intro,
  });
}

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dictionary = await getDictionary(locale);
  const { about } = dictionary;
  const geography = dictionary.whyUs.items[5];

  return (
    <>
      <PageHero
        breadcrumbs={[
          { label: dictionary.common.home, href: `/${locale}` },
          { label: about.title },
        ]}
        description={about.intro}
        eyebrow={about.eyebrow}
        title={about.title}
      />
      <Container className="space-y-20 py-16 sm:py-20 lg:py-24">
        <section className="grid gap-8 lg:grid-cols-[0.7fr_1.3fr]">
          <h2 className="text-3xl font-semibold text-zinc-950">{about.storyTitle}</h2>
          <div className="space-y-5 text-lg leading-8 text-zinc-600">
            {about.story.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </div>
        </section>
        <section>
          <h2 className="text-3xl font-semibold text-zinc-950">{about.valuesTitle}</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {about.values.map((value) => (
              <article className="rounded-3xl border border-zinc-200 bg-zinc-50 p-7" key={value.title}>
                <h3 className="text-xl font-semibold text-zinc-950">{value.title}</h3>
                <p className="mt-3 leading-7 text-zinc-600">{value.description}</p>
              </article>
            ))}
          </div>
        </section>
        <section className="grid gap-6 rounded-3xl bg-zinc-950 p-8 text-white sm:p-12 lg:grid-cols-2">
          <div>
            <h2 className="text-3xl font-semibold">{about.approachTitle}</h2>
            <p className="mt-4 leading-7 text-zinc-300">{about.approach}</p>
          </div>
          <div className="border-t border-white/15 pt-6 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
            <h2 className="text-2xl font-semibold">{geography.title}</h2>
            <p className="mt-4 leading-7 text-zinc-300">{geography.description}</p>
            <p className="mt-3 text-sm text-blue-300">{dictionary.footer.description}</p>
          </div>
        </section>
        <section>
          <h2 className="text-3xl font-semibold text-zinc-950">{about.team.title}</h2>
          <p className="mt-4 max-w-2xl leading-7 text-zinc-600">{about.team.description}</p>
          <p className="mt-5 inline-block rounded-full bg-blue-100 px-4 py-2 text-xs font-bold uppercase tracking-wide text-blue-800">
            {about.team.placeholderNotice}
          </p>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {about.team.members.map((member) => (
              <article className="rounded-3xl border border-dashed border-blue-400 bg-blue-50 p-7" key={member.role}>
                <h3 className="text-xl font-semibold text-zinc-950">{member.role}</h3>
                <p className="mt-3 leading-7 text-zinc-600">{member.description}</p>
              </article>
            ))}
          </div>
        </section>
      </Container>
      <FinalCta dictionary={dictionary} locale={locale} />
    </>
  );
}
