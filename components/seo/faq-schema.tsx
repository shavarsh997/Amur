import { getFaqPageJsonLd, serializeJsonLd } from "@/lib/json-ld";

/** Pass the same items the page renders in its FAQ; renders nothing when empty. */
export function FaqSchema(props: Parameters<typeof getFaqPageJsonLd>[0]) {
  const schema = getFaqPageJsonLd(props);
  if (!schema) return null;
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: serializeJsonLd(schema) }}
    />
  );
}
