import { generatedCaption } from "@/config/service-media.config";
import type { Locale } from "@/types";

const homeHeroAlt: Record<Locale, string> = {
  hy: "Կառուցվող եռահարկ բնակելի շենք՝ երկաթբետոնե կառուցվածքով և քարե ճակատով",
  ru: "Строительство трёхэтажного жилого здания с железобетонным каркасом и каменным фасадом",
  en: "Three-story residential building under construction with a concrete frame and stone facade",
  de: "Dreigeschossiges Wohngebäude im Bau mit Stahlbetontragwerk und Steinfassade",
  fr: "Immeuble résidentiel de trois niveaux en construction, avec ossature en béton et façade en pierre",
};

export function getHomeHeroMedia(locale: Locale) {
  return {
    src: "/images/home/residential-construction-hero.webp",
    alt: homeHeroAlt[locale],
    caption: generatedCaption[locale],
  };
}
