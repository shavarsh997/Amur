import type { Locale } from "@/types";

type Label = Record<Locale, string>;
type GuideLink = { path: string; label: Label };

export const serviceGuidesTitle: Label = {
  hy: "Ընտրեք աշխատանքները կամ հաշվարկեք արժեքը",
  ru: "Выберите задачу или рассчитайте стоимость",
  en: "Explore the work you need or plan your budget",
};

export const serviceGuideGroups: readonly {
  title: Label;
  links: readonly GuideLink[];
}[] = [
  {
    title: {
      hy: "Բնակարանի վերանորոգում",
      ru: "Ремонт квартиры",
      en: "Apartment renovation",
    },
    links: [
      {
        path: "services/apartment-renovation-yerevan",
        label: {
          hy: "Աշխատանքների կազմն ու փուլերը",
          ru: "Состав и этапы ремонта",
          en: "Work and renovation stages",
        },
      },
      {
        path: "services/new-build-renovation",
        label: {
          hy: "Նորակառույց բնակարան",
          ru: "Квартира в новостройке",
          en: "New-build apartments",
        },
      },
      {
        path: "services/turnkey-renovation",
        label: {
          hy: "Ամբողջական վերանորոգում",
          ru: "Ремонт под ключ",
          en: "Complete renovation service",
        },
      },
      {
        path: "services/capital-renovation-yerevan",
        label: {
          hy: "Կապիտալ վերանորոգում",
          ru: "Капитальный ремонт",
          en: "Major renovation",
        },
      },
      {
        path: "services/cosmetic-renovation-yerevan",
        label: {
          hy: "Հարդարման թարմացում",
          ru: "Косметический ремонт",
          en: "Redecoration and interior refresh",
        },
      },
    ],
  },
  {
    title: {
      hy: "Առանձին աշխատանքներ",
      ru: "Отдельные задачи",
      en: "Specialist work",
    },
    links: [
      {
        path: "services/office-renovation-yerevan",
        label: {
          hy: "Գրասենյակի վերանորոգում",
          ru: "Ремонт офиса",
          en: "Office renovation",
        },
      },
      {
        path: "services/plumbing-work-yerevan",
        label: {
          hy: "Սանտեխնիկական աշխատանքներ",
          ru: "Сантехнические работы",
          en: "Plumbing installation",
        },
      },
      {
        path: "services/electrical-work-yerevan",
        label: {
          hy: "Էլեկտրական աշխատանքներ",
          ru: "Электромонтажные работы",
          en: "Electrical installation",
        },
      },
      {
        path: "services/apartment-interior-design-yerevan",
        label: {
          hy: "Բնակարանի ինտերիերի դիզայն",
          ru: "Дизайн интерьера квартиры",
          en: "Apartment interior design",
        },
      },
    ],
  },
  {
    title: {
      hy: "Բյուջե և նախահաշիվ",
      ru: "Бюджет и смета",
      en: "Budget and estimates",
    },
    links: [
      {
        path: "prices",
        label: {
          hy: "Ինչից է կազմվում արժեքը",
          ru: "Из чего складывается стоимость",
          en: "Understanding renovation costs",
        },
      },
      {
        path: "renovation-estimate-yerevan",
        label: {
          hy: "Ինչպես կարդալ նախահաշիվը",
          ru: "Как читать смету",
          en: "How to read an estimate",
        },
      },
      {
        path: "calculator",
        label: {
          hy: "Արժեքի հաշվիչ",
          ru: "Калькулятор стоимости",
          en: "Cost calculator",
        },
      },
    ],
  },
];
