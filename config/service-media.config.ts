import type { Locale } from "@/types";
import { getServiceImageAlt } from "@/config/service-images.config";

type ServiceAsset = {
  src: string;
  alt?: Record<Locale, string>;
  generated?: boolean;
};

const generatedCaption: Record<Locale, string> = {
  ru: "Иллюстрация услуги, созданная с ИИ",
  en: "AI-generated service illustration",
  hy: "ԱԲ-ով ստեղծված ծառայության պատկեր",
  de: "KI-generierte Illustration der Leistung",
  fr: "Illustration du service générée par IA",
};

function generated(
  name: string,
  ru: string,
  en: string,
  hy: string,
  de: string,
  fr: string
): ServiceAsset {
  return {
    src: `/images/services/${name}.webp`,
    generated: true,
    alt: { ru, en, hy, de, fr },
  };
}

function stock(photo: string): ServiceAsset {
  return {
    src: `https://images.unsplash.com/${photo}?auto=format&fit=crop&w=1600&q=85`,
  };
}

/** Presentation assets only: metadata, schemas and established URLs stay independent.
 * Each of the 16 services owns two different photographs. Generated scenes are
 * illustrative and must never be used as evidence of a completed SHINEX project.
 */
export const serviceMedia: Record<
  string,
  { hero: ServiceAsset; details: ServiceAsset }
> = {
  renovation: {
    hero: generated(
      "renovation-hero",
      "Каменный частный дом с садом",
      "Stone private house with a garden",
      "Քարե առանձնատուն՝ այգով",
      "Privathaus aus Stein mit Garten",
      "Maison en pierre avec jardin"
    ),
    details: generated(
      "renovation-details",
      "Внутренняя отделка дома с деревянными балками",
      "House interior refurbishment with timber beams",
      "Փայտե հեծաններով տան ներքին հարդարում",
      "Innenausbau eines Hauses mit Holzbalken",
      "Rénovation intérieure d’une maison à poutres en bois"
    ),
  },
  "house-construction": {
    hero: stock("photo-1600585154340-be6161a56a0c"),
    details: generated(
      "house-construction-details",
      "Возведение стен и конструкций частного дома",
      "Walls and structure of a house under construction",
      "Կառուցվող առանձնատան պատերն ու կառուցվածքները",
      "Wände und Tragwerk eines Hauses im Bau",
      "Murs et structure d’une maison en construction"
    ),
  },
  "interior-design": {
    hero: stock("photo-1616486338812-3dadae4b4ace"),
    details: generated(
      "interior-design-details",
      "План интерьера и образцы отделочных материалов",
      "Interior plan and finish material samples",
      "Ինտերիերի հատակագիծ և հարդարման նյութերի նմուշներ",
      "Innenraumplan und Materialmuster",
      "Plan intérieur et échantillons de matériaux"
    ),
  },
  "commercial-construction": {
    hero: stock("photo-1556761175-b413da4baf72"),
    details: generated(
      "commercial-construction-details",
      "Обустройство торгового пространства",
      "Retail space during fit-out",
      "Առևտրային տարածքի հարդարում",
      "Ausbau eines Verkaufsraums",
      "Aménagement d’un espace commercial"
    ),
  },
  design: {
    hero: stock("photo-1503387762-592deb58ef4e"),
    details: generated(
      "design-details",
      "Архитектурный макет дома и участка",
      "Architectural house and site model",
      "Տան և հողամասի ճարտարապետական մակետ",
      "Architekturmodell eines Hauses mit Grundstück",
      "Maquette architecturale d’une maison et de son terrain"
    ),
  },
  "monolithic-work": {
    hero: stock("photo-1504307651254-35680f356dfd"),
    details: generated(
      "monolithic-work-details",
      "Армирование и опалубка железобетонной конструкции",
      "Reinforcement and formwork for concrete construction",
      "Երկաթբետոնե կառուցվածքի ամրանավորում և կաղապար",
      "Bewehrung und Schalung einer Betonkonstruktion",
      "Armatures et coffrage d’une structure en béton"
    ),
  },
  "facade-and-roofing": {
    hero: generated(
      "facade-and-roofing-hero",
      "Каменный фасад дома, скатная кровля и водостоки",
      "Stone house facade, pitched roof and gutters",
      "Տան քարե ճակատ, թեք տանիք և ջրահեռացում",
      "Steinfassade, Steildach und Regenrinnen eines Hauses",
      "Façade en pierre, toiture inclinée et gouttières"
    ),
    details: generated(
      "facade-and-roofing-details",
      "Узел кровли, водосток и каменный фасад",
      "Roof junction, gutter and stone facade",
      "Տանիքի հանգույց, ջրահեռացում և քարե ճակատ",
      "Dachanschluss, Regenrinne und Steinfassade",
      "Raccord de toiture, gouttière et façade en pierre"
    ),
  },
  "apartment-renovation-yerevan": {
    hero: stock("photo-1600210492486-724fe5c67fb0"),
    details: generated(
      "apartment-renovation-yerevan-details",
      "Подготовка и укладка плитки при ремонте квартиры",
      "Tile preparation and installation in an apartment renovation",
      "Սալիկապատման նախապատրաստում բնակարանի վերանորոգման ընթացքում",
      "Vorbereitung und Verlegung von Fliesen in einer Wohnung",
      "Préparation et pose de carrelage dans un appartement"
    ),
  },
  "new-build-renovation": {
    hero: generated(
      "new-build-renovation-hero",
      "Гостиная в новой квартире с готовой отделкой",
      "Finished living room in a new apartment",
      "Նոր բնակարանի հարդարված հյուրասենյակ",
      "Fertig ausgebautes Wohnzimmer in einer Neubauwohnung",
      "Salon aménagé dans un appartement neuf"
    ),
    details: generated(
      "new-build-renovation-details",
      "Квартира в новостройке до начала отделки",
      "New-build apartment before finishing work",
      "Նորակառույց բնակարան՝ մինչև հարդարումը",
      "Neubauwohnung vor dem Innenausbau",
      "Appartement neuf avant les finitions"
    ),
  },
  "turnkey-renovation": {
    hero: generated(
      "turnkey-renovation-hero",
      "Спальня после комплексной отделки квартиры",
      "Bedroom after a complete apartment fit-out",
      "Ննջասենյակ՝ բնակարանի ամբողջական հարդարումից հետո",
      "Schlafzimmer nach dem vollständigen Wohnungsausbau",
      "Chambre après aménagement complet d’un appartement"
    ),
    details: generated(
      "turnkey-renovation-details",
      "Прихожая с отделкой и встроенным хранением",
      "Finished entrance hall with built-in storage",
      "Հարդարված նախասրահ՝ ներկառուցված պահարանով",
      "Fertiger Eingangsbereich mit Einbauschrank",
      "Entrée aménagée avec rangement intégré"
    ),
  },
  "apartment-interior-design-yerevan": {
    hero: generated(
      "apartment-interior-design-yerevan-hero",
      "Планировка компактной кухни и столовой в квартире",
      "Compact apartment kitchen and dining layout",
      "Բնակարանի կոմպակտ խոհանոցի և ճաշասենյակի լուծում",
      "Kompakte Wohnküche mit Essbereich",
      "Cuisine et coin repas dans un appartement compact"
    ),
    details: generated(
      "apartment-interior-design-yerevan-details",
      "Рабочее место и хранение в небольшой квартире",
      "Workspace and storage in a compact apartment",
      "Աշխատատեղ և պահեստավորում փոքր բնակարանում",
      "Arbeitsplatz und Stauraum in einer kleinen Wohnung",
      "Bureau et rangement dans un petit appartement"
    ),
  },
  "office-renovation-yerevan": {
    hero: generated(
      "office-renovation-yerevan-hero",
      "Офис с переговорными и стеклянными перегородками",
      "Office with meeting rooms and glass partitions",
      "Գրասենյակ՝ հանդիպումների սենյակներով և ապակե միջնապատերով",
      "Büro mit Besprechungsräumen und Glastrennwänden",
      "Bureau avec salles de réunion et cloisons vitrées"
    ),
    details: generated(
      "office-renovation-yerevan-details",
      "Монтаж перегородок и кабельных трасс в офисе",
      "Office partitions and cable routes during fit-out",
      "Գրասենյակի միջնապատերի և մալուխային ուղիների տեղադրում",
      "Montage von Bürotrennwänden und Kabelwegen",
      "Pose de cloisons et de chemins de câbles dans un bureau"
    ),
  },
  "capital-renovation-yerevan": {
    hero: generated(
      "capital-renovation-yerevan-hero",
      "Квартира после демонтажа старой отделки",
      "Apartment after removal of old finishes",
      "Բնակարան՝ հին հարդարման ապամոնտաժումից հետո",
      "Wohnung nach dem Rückbau alter Oberflächen",
      "Appartement après dépose des anciennes finitions"
    ),
    details: generated(
      "capital-renovation-yerevan-details",
      "Подготовка стен и дверного проёма к отделке",
      "Wall and doorway preparation before finishing",
      "Պատերի և դռան բացվածքի նախապատրաստում հարդարմանը",
      "Vorbereitung von Wänden und Türöffnung",
      "Préparation des murs et d’une ouverture de porte"
    ),
  },
  "cosmetic-renovation-yerevan": {
    hero: generated(
      "cosmetic-renovation-yerevan-hero",
      "Обновление окраски стен в спальне",
      "Bedroom wall redecoration",
      "Ննջասենյակի պատերի ներկի թարմացում",
      "Erneuerung des Wandanstrichs im Schlafzimmer",
      "Rafraîchissement des murs d’une chambre"
    ),
    details: generated(
      "cosmetic-renovation-yerevan-details",
      "Материалы и инструменты для обновления отделки",
      "Materials and tools for refreshing finishes",
      "Հարդարման թարմացման նյութեր և գործիքներ",
      "Materialien und Werkzeuge für die Oberflächenerneuerung",
      "Matériaux et outils pour rafraîchir les finitions"
    ),
  },
  "plumbing-work-yerevan": {
    hero: generated(
      "plumbing-work-yerevan-hero",
      "Разводка воды и канализации до отделки санузла",
      "Water supply and drainage before bathroom finishing",
      "Ջրի և կոյուղու խողովակներ՝ մինչև սանհանգույցի հարդարումը",
      "Wasser- und Abwasserleitungen vor dem Badausbau",
      "Réseaux d’eau et d’évacuation avant les finitions de la salle de bains"
    ),
    details: generated(
      "plumbing-work-yerevan-details",
      "Подключения воды и слив под раковиной",
      "Water connections and drain beneath a basin",
      "Ջրի միացումներ և արտահոսք լվացարանի տակ",
      "Wasseranschlüsse und Ablauf unter einem Waschbecken",
      "Raccordements et évacuation sous un lavabo"
    ),
  },
  "electrical-work-yerevan": {
    hero: generated(
      "electrical-work-yerevan-hero",
      "Кабельные трассы и подрозетники до отделки",
      "Cable routes and outlet boxes before finishing",
      "Մալուխային ուղիներ և վարդակների տուփեր՝ մինչև հարդարումը",
      "Kabelwege und Steckdosendosen vor dem Ausbau",
      "Cheminements de câbles et boîtiers avant les finitions"
    ),
    details: generated(
      "electrical-work-yerevan-details",
      "Розетки и выключатель у рабочего места",
      "Outlets and a switch beside a workspace",
      "Վարդակներ և անջատիչ աշխատատեղի մոտ",
      "Steckdosen und Schalter am Arbeitsplatz",
      "Prises et interrupteur près d’un espace de travail"
    ),
  },
};

export function getServiceMedia(slug: string, locale: Locale) {
  const media = Object.hasOwn(serviceMedia, slug)
    ? serviceMedia[slug]
    : undefined;
  if (!media) throw new Error(`Missing service media: ${slug}`);
  const localize = (asset: ServiceAsset) => {
    const alt = asset.alt?.[locale] ?? getServiceImageAlt(asset.src, locale);
    return {
      src: asset.src,
      alt,
      caption: asset.generated ? generatedCaption[locale] : alt,
    };
  };
  return { hero: localize(media.hero), details: localize(media.details) };
}
