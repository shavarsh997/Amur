import type { Locale } from "@/types";

const homeHeroAlt: Record<Locale, string> = {
  hy: "Բնակարանի ինտերիեր՝ քարե հարդարմամբ և կաղնու պանելներով",
  ru: "Интерьер квартиры с каменной отделкой и дубовыми панелями",
  en: "Apartment interior with stone finishes and oak panels",
  de: "Wohnungsinterieur mit Steinoberflächen und Eichenpaneelen",
  fr: "Intérieur d’appartement avec pierre et panneaux de chêne",
};

export function getHomeHeroMedia(locale: Locale) {
  return {
    src: "/images/ultra/apartment-hero.webp",
    alt: homeHeroAlt[locale],
    focalPoint: "60% 50%",
    mobileFocalPoint: "50% 50%",
    mobileSrc: "/images/ultra/apartment-hero-mobile.webp",
  };
}
