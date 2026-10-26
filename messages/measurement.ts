import type { Locale } from "@/types";

/** Factual description of the implemented measurement, not a legal template. */
export const measurementCopy: Record<
  Locale,
  { title: string; paragraphs: readonly string[] }
> = {
  ru: {
    title: "Источник обращения и статистика сайта",
    paragraphs: [
      "В хранилище текущей вкладки сохраняются первая посещённая страница сайта и общая категория источника перехода. Запись перестаёт использоваться после 30 минут бездействия или закрытия вкладки. При отправке заявки эти сведения и страница отправки передаются вместе с обращением через Telegram, чтобы понимать, откуда приходят запросы.",
      "Если на сайте подключён Google Analytics, в статистику передаются просмотры страниц и события взаимодействия: контакт, начало заполнения, попытка отправки и подтверждённая доставка заявки. Имя, телефон, описание проекта, полный адрес источника перехода и параметры URL в эти события не передаются.",
    ],
  },
  hy: {
    title: "Հարցման աղբյուրը և կայքի վիճակագրությունը",
    paragraphs: [
      "Բացված ներդիրի ժամանակավոր պահոցում գրանցվում են կայքի առաջին այցելած էջը և անցման աղբյուրի ընդհանուր տեսակը։ Գրառումն այլևս չի օգտագործվում 30 րոպե անգործությունից կամ ներդիրը փակելուց հետո։ Հայտն ուղարկելիս այս տվյալներն ու ուղարկման էջը փոխանցվում են հայտի հետ Telegram-ով՝ հարցումների աղբյուրը հասկանալու համար։",
      "Եթե կայքին միացված է Google Analytics-ը, վիճակագրության մեջ գրանցվում են էջերի դիտումները և գործողությունները՝ կապի միջոցի ընտրությունը, ձևի լրացման սկիզբը, ուղարկման փորձը և հաստատված առաքումը։ Անունը, հեռախոսահամարը, նախագծի նկարագրությունը, անցման աղբյուրի ամբողջ հասցեն և URL-ի պարամետրերը չեն փոխանցվում այս իրադարձությունների հետ։",
    ],
  },
  en: {
    title: "Enquiry source and website statistics",
    paragraphs: [
      "The current tab temporarily stores the first page visited and a general referral category. The record stops being used after 30 minutes of inactivity or when the tab closes. When you submit an enquiry, this information and the submission page accompany it through Telegram to identify the source of enquiries.",
      "If Google Analytics is enabled, page views and interactions are recorded: contact clicks, form starts, submission attempts and acknowledged delivery. Names, phone numbers, project descriptions, full referrer addresses and URL parameters are not sent in these events.",
    ],
  },
  de: {
    title: "Herkunft der Anfrage und Website-Statistik",
    paragraphs: [
      "Der aktuelle Tab speichert vorübergehend die zuerst besuchte Seite und eine allgemeine Herkunftskategorie. Nach 30 Minuten Inaktivität oder dem Schließen des Tabs wird der Eintrag nicht mehr verwendet. Beim Absenden werden diese Angaben und die Absende-Seite zusammen mit der Anfrage über Telegram übermittelt, um die Herkunft von Anfragen zu erkennen.",
      "Wenn Google Analytics aktiviert ist, werden Seitenaufrufe und Interaktionen erfasst: Kontaktklicks, Formularbeginn, Sendeversuche und bestätigte Zustellung. Namen, Telefonnummern, Projektbeschreibungen, vollständige Verweisadressen und URL-Parameter werden in diesen Ereignissen nicht übertragen.",
    ],
  },
  fr: {
    title: "Origine des demandes et statistiques du site",
    paragraphs: [
      "L’onglet conserve temporairement la première page visitée et une catégorie générale de provenance. Cette information cesse d’être utilisée après 30 minutes d’inactivité ou à la fermeture de l’onglet. Lors de l’envoi, elle accompagne la demande et la page d’envoi via Telegram pour identifier l’origine des demandes.",
      "Si Google Analytics est activé, les pages vues et interactions sont enregistrées : clics de contact, début de formulaire, tentatives d’envoi et livraison confirmée. Les noms, numéros de téléphone, descriptions de projet, adresses complètes de provenance et paramètres d’URL ne sont pas transmis dans ces événements.",
    ],
  },
};
