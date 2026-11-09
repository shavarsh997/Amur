/** Visual categories only; service identity and SEO remain in existing configs. */
export type ServiceVisual =
  "engineering" | "architecture" | "interior" | "commercial";

export function getServiceVisual(slug: string): ServiceVisual {
  if (
    [
      "monolithic-work",
      "electrical-work-yerevan",
      "plumbing-work-yerevan",
      "facade-and-roofing",
    ].includes(slug)
  )
    return "engineering";
  if (["house-construction", "design"].includes(slug)) return "architecture";
  if (["commercial-construction", "office-renovation-yerevan"].includes(slug))
    return "commercial";
  return "interior";
}
