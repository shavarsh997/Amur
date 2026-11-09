import { Container } from "@/components/ui/container";

type VerifiedTestimonial = {
  id: string;
  quote: string;
  author: string;
  sourceUrl: string;
  publicationApproved: true;
};

/** Intentionally unused until approved, attributable SHINEX testimonials exist. */
export function Testimonials({
  title,
  items,
}: {
  title: string;
  items: readonly VerifiedTestimonial[];
}) {
  if (!items.length) return null;
  return (
    <section className="py-section">
      <Container>
        <h2 className="content-heading">{title}</h2>
        <div className="mt-8 grid gap-8 md:grid-cols-2">
          {items.map((item) => (
            <figure key={item.id} className="border-t pt-6">
              <blockquote>
                <p className="text-lg leading-8">{item.quote}</p>
              </blockquote>
              <figcaption className="mt-5">
                <a
                  className="underline underline-offset-4"
                  href={item.sourceUrl}
                >
                  {item.author}
                </a>
              </figcaption>
            </figure>
          ))}
        </div>
      </Container>
    </section>
  );
}
