import { getWebPageJsonLd, serializeJsonLd } from "@/lib/json-ld";

/** Server-rendered page entity, using the same copy as the visible page. */
export function PageSchema(props: Parameters<typeof getWebPageJsonLd>[0]) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: serializeJsonLd(getWebPageJsonLd(props)),
      }}
    />
  );
}
