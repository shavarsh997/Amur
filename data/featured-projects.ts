import type { Locale } from "@/types";

/**
 * The homepage portfolio is intentionally separate from publishable case
 * studies. Fill in only verified information; nullable fields are omitted in
 * the UI until the project owner approves them for publication.
 */
export type FeaturedProject = {
  id: string;
  image: string;
  imageAlt: Record<Locale, string>;
  beforeImage: string | null;
  afterImage: string | null;
  objectType: string | null;
  location: string | null;
  area: string | null;
  completedWorks: readonly string[] | null;
  duration: string | null;
  href: string | null;
  contentStage:
    | "before"
    | "process"
    | "engineering"
    | "installation"
    | "quality-control"
    | "finished";
};

/** Existing project visuals are presentation references, not SHINEX case studies. */
export const featuredProjects: readonly FeaturedProject[] = [
  {
    id: "reference-01",
    image:
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1800&q=85",
    imageAlt: {
      hy: "Ինտերիերի ներկայացուցչական պատկեր",
      ru: "Презентационное изображение интерьера",
      en: "Interior presentation reference",
    },
    beforeImage: null,
    afterImage: null,
    objectType: null,
    location: null,
    area: null,
    completedWorks: null,
    duration: null,
    href: null,
    contentStage: "finished",
  },
  {
    id: "reference-02",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1800&q=85",
    imageAlt: {
      hy: "Առանձնատան ներկայացուցչական պատկեր",
      ru: "Презентационное изображение частного дома",
      en: "Private house presentation reference",
    },
    beforeImage: null,
    afterImage: null,
    objectType: null,
    location: null,
    area: null,
    completedWorks: null,
    duration: null,
    href: null,
    contentStage: "finished",
  },
  {
    id: "reference-03",
    image:
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1800&q=85",
    imageAlt: {
      hy: "Ինտերիերի դիզայնի ներկայացուցչական պատկեր",
      ru: "Презентационное изображение дизайна интерьера",
      en: "Interior design presentation reference",
    },
    beforeImage: null,
    afterImage: null,
    objectType: null,
    location: null,
    area: null,
    completedWorks: null,
    duration: null,
    href: null,
    contentStage: "finished",
  },
];
