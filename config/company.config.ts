import type { CompanyConfiguration } from "@/types/config";
import { SITE_URL } from "@/lib/site-url";

/**
 * The sole source of business facts displayed on the site.
 * Keep unknown values null: UI and structured data intentionally omit them.
 */
export const companyConfig = {
  brand: {
    name: "SHINEX",
    alternateName: "SHINEX Armenia",
    legalName: null,
    logo: "/brand/shinex-logo.png",
  },
  website: {
    origin: SITE_URL,
    defaultLocale: "hy",
    supportedLocales: ["hy", "ru", "en", "de", "fr"],
  },
  contact: {
    phone: "+37455156615",
    displayPhone: "+374 55 15 66 15",
    whatsapp: "+37455156615",
    // Add the full public Telegram URL here to display it as a separate contact option.
    telegram: null,
    email: "info@shinex.am",
    address: {
      hy: {
        streetAddress: "Հրաչյա Քոչարի փողոց, 13Ա",
        addressLocality: "Երևան",
      },
      ru: {
        streetAddress: "улица Грачья Кочара, 13А",
        addressLocality: "Ереван",
      },
      en: {
        streetAddress: "13A Hrachya Kochar Street",
        addressLocality: "Yerevan",
      },
      de: {
        streetAddress: "Hrachya-Kochar-Straße 13A",
        addressLocality: "Jerewan",
      },
      fr: {
        streetAddress: "13A, rue Hrachya Kochar",
        addressLocality: "Erevan",
      },
    },
    city: "Yerevan",
    countryCode: "AM",
    geo: { latitude: 40.200501, longitude: 44.498802 },
    acceptsVisitors: false,
    workingHours: {
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ],
      opens: "09:00",
      closes: "19:00",
      display: {
        hy: "Երկ–շբ՝ 09:00–19:00, կիրակի՝ փակ",
        ru: "Пн–сб: 09:00–19:00, вс: выходной",
        en: "Mon–Sat: 09:00–19:00, Sun: closed",
        de: "Mo–Sa: 09:00–19:00, So: geschlossen",
        fr: "Lun–sam : 09:00–19:00, dim : fermé",
      },
    },
  },
  social: {
    instagram: "https://www.instagram.com/shinex_company/",
    facebook: "https://www.facebook.com/profile.php?id=61592503598299",
    youtube: null,
  },
  business: {
    registrationNumber: null,
    foundedYear: null,
    warrantyText: null,
    serviceArea: ["Armenia", "Yerevan"],
  },
  privacy: {
    // TODO: set the real publication/update date before the privacy policy is published.
    updatedAt: null,
  },
} as const satisfies CompanyConfiguration;
