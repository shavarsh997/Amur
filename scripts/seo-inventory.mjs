import {
  readFileSync,
  writeFileSync,
  readdirSync,
  existsSync,
  mkdirSync,
} from "node:fs";
import { join } from "node:path";
import { createTypeScriptLoader } from "./lib/load-typescript.mjs";

const load = createTypeScriptLoader(process.cwd());
const { locales } = load("lib/i18n");
const { seoIntentMap } = load("config/seo-intents.config");
const { seoRedirects } = load("config/seo-redirects.config");
const { projectCatalog } = load("data/projects");
const sitemap = load("app/sitemap").default();
const { seoLandingPages, getSeoLandingPath } = load(
  "config/seo-landing-pages.config"
);
const { getActiveServices } = load("config/services.config");
const sourcePath = process.argv[3] ?? "docs/seo/GSC_BASELINE.json";
const outputDirectory = process.argv[4] ?? "docs/seo";
mkdirSync(outputDirectory, { recursive: true });
const source = JSON.parse(readFileSync(sourcePath, "utf8"));
const gsc = new Map(
  source.sheets["Страницы"].rows.map((row) => [row["Популярные страницы"], row])
);
const reportPath = process.argv[2];
const crawl = new Map(
  reportPath && existsSync(reportPath)
    ? JSON.parse(readFileSync(reportPath, "utf8")).pages.map((page) => [
        page.url,
        page,
      ])
    : []
);
const origin = "https://www.shinex.am";
const urls = new Set([
  `${origin}/`,
  ...sitemap.map((x) => x.url),
  ...gsc.keys(),
]);
for (const locale of locales) {
  for (const redirect of seoRedirects)
    urls.add(`${origin}/${locale}/${redirect.source}`);
  for (const path of [
    "projects",
    "blog",
    ...projectCatalog.map((x) => `projects/${x.slug}`),
  ])
    urls.add(`${origin}/${locale}/${path}`);
}
const technical = [
  "/robots.txt",
  "/sitemap.xml",
  "/manifest.webmanifest",
  "/share-image",
  "/icon.png",
  "/apple-icon.png",
];
for (const path of technical) urls.add(`${origin}${path}`);
const templates = [];
function walk(dir) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) walk(path);
    else if (
      /^(page|route)\.tsx?$/.test(entry.name) ||
      /^(sitemap|robots|manifest)\.ts$/.test(entry.name)
    )
      templates.push(path);
  }
}
walk("app");
// Text resemblance is a screening signal, never proof of query cannibalization.
const flattenText = (value) =>
  typeof value === "string"
    ? [value]
    : Array.isArray(value)
      ? value.flatMap(flattenText)
      : value && typeof value === "object"
        ? Object.values(value).flatMap(flattenText)
        : [];
const shingles = (content) => {
  const words =
    flattenText(content)
      .join(" ")
      .toLowerCase()
      .match(/[\p{L}\p{N}]+/gu) ?? [];
  return new Set(
    words.slice(0, -4).map((_, i) => words.slice(i, i + 5).join(" "))
  );
};
const similarities = locales.map((locale) => {
  const pages = [
    ...seoLandingPages.map((page) => ({
      path: getSeoLandingPath(page),
      text: page.translations[locale],
    })),
    ...getActiveServices(locale).map((page) => ({
      path: `services/${page.slug}`,
      text: page.content,
    })),
  ].map((page) => ({ ...page, grams: shingles(page.text) }));
  const pairs = [];
  for (let i = 0; i < pages.length; i++)
    for (let j = i + 1; j < pages.length; j++) {
      const a = pages[i],
        b = pages[j];
      const overlap = [...a.grams].filter((gram) => b.grams.has(gram)).length;
      pairs.push({
        a: a.path,
        b: b.path,
        jaccard: overlap / (a.grams.size + b.grams.size - overlap),
      });
    }
  return {
    locale,
    topPairs: pairs.sort((a, b) => b.jaccard - a.jaccard).slice(0, 5),
  };
});
writeFileSync(
  join(outputDirectory, "CONTENT_SIMILARITY.json"),
  JSON.stringify(
    {
      method:
        "Jaccard similarity of 5-word shingles from service/landing copy, within each language; excludes layout boilerplate. Measures textual overlap, not shared search intent.",
      similarities,
    },
    null,
    2
  ) + "\n"
);
const sitemapUrls = new Set(sitemap.map((x) => x.url));
const suspect = new Set([
  "services/turnkey-renovation",
  "services/apartment-interior-design-yerevan",
  "services/office-renovation-yerevan",
]);
const rows = [...urls].sort().map((url) => {
  const pathname = new URL(url).pathname;
  const [, language, ...segments] = pathname.split("/");
  const locale = locales.includes(language) ? language : "—";
  const path = segments.join("/");
  const intent = Object.entries(seoIntentMap).filter(
    ([, item]) => item.paths[locale] === path && locale !== "—"
  );
  const redirect =
    locale !== "—" && seoRedirects.find((x) => x.source === path);
  const published = sitemapUrls.has(url);
  const metrics = gsc.get(url);
  const observed = crawl.get(url);
  let decision = "KEEP",
    reason = "Самостоятельная страница; сохраняем URL и язык.",
    risk = "Низкий: URL сохраняется.",
    target = url;
  if (
    published &&
    (path.startsWith("services/") ||
      ["prices", "calculator", "contacts", "about", ""].includes(path))
  ) {
    decision = "IMPROVE";
    reason =
      "Улучшить путь к заявке, измерение и связи; основной интент сохраняется.";
  }
  if (suspect.has(path) && published) {
    decision = "INVESTIGATE";
    reason =
      "Пересечение широкого и специализированного предложения. Нет query + page/backlinks; слияние не применяется.";
    risk = "Средний/высокий при слиянии; текущий URL сохранён.";
  }
  if (redirect || pathname === "/") {
    decision = "REDIRECT";
    target = `${origin}/${redirect ? `${locale}/${redirect.destination}` : "hy"}`;
    reason =
      "Существующий прямой 308; сохранить правило, исключить исходник из sitemap.";
    risk = "Низкий: правило уже существует; проверить хостинг.";
  } else if (!published && !technical.includes(pathname)) {
    decision = "INVESTIGATE";
    reason =
      "Неопубликованный/исторический URL; текущий 404 не является новым удалением. Проверить историю и ссылки.";
    risk = "Неизвестен без внешних ссылок/URL Inspection.";
  }
  if (technical.includes(pathname)) {
    decision = "KEEP";
    reason =
      "Технический ресурс, не коммерческая посадочная; вне sitemap страниц.";
  }
  const fallback = {
    calculator: "Запрос расчёта строительства/дизайна",
    about: "Информация о компании",
    contacts: "Связь и заявка",
    privacy: "Конфиденциальность",
    services: "Каталог услуг",
    "services/design": "Архитектурное проектирование",
    "services/monolithic-work": "Монолитные работы",
    "services/facade-and-roofing": "Фасад и кровля",
  };
  return {
    url,
    locale,
    intent:
      intent.map(([key]) => key).join(", ") ||
      fallback[path] ||
      (technical.includes(pathname)
        ? "Технический ресурс"
        : "Исторический/неопубликованный"),
    queries: intent.length
      ? intent
          .flatMap(([, x]) => [x.primary[locale], ...x.secondary[locale]])
          .filter((x, i, a) => a.indexOf(x) === i)
      : published && path.startsWith("services/")
        ? [
            getActiveServices(locale).find(
              (service) => `services/${service.slug}` === path
            )?.content.title ?? observed?.h1,
          ].filter(Boolean)
        : [],
    clicks: metrics?.["Kлики"] ?? null,
    impressions: metrics?.["Показы"] ?? null,
    ctr: metrics?.["CTR"] ?? null,
    position: metrics?.["Позиция"] ?? null,
    cannibalizationRisk: suspect.has(path)
      ? "Возможное пересечение; не доказано"
      : "Не доказана; разные назначения",
    decision,
    target,
    reason,
    migrationRisk: risk,
    inSitemap: published,
    status:
      observed?.status ??
      (redirect || pathname === "/"
        ? "308 (код)"
        : published
          ? "200 (маршрут; до HTTP-проверки)"
          : technical.includes(pathname)
            ? "ресурс"
            : "404 (ожидается)"),
    canonical: observed?.canonical ?? null,
    title: observed?.title ?? null,
    description: observed?.description ?? null,
    h1: observed?.h1 ?? null,
    incomingPages: observed?.incomingPages ?? null,
  };
});
writeFileSync(
  join(outputDirectory, "URL_INVENTORY.json"),
  JSON.stringify(
    { source: sourcePath, exportDate: source.exportDate, templates, rows },
    null,
    2
  ) + "\n"
);
const cell = (value) =>
  String(value ?? "нет строки")
    .replaceAll("|", "\\|")
    .replaceAll("\n", " ");
writeFileSync(
  join(outputDirectory, "URL_INVENTORY.md"),
  `# Автоматический инвентарь URL\n\nКоманда: \`node scripts/seo-inventory.mjs [HTTP-report.json]\`. ${sitemap.length} URL в sitemap. Метрики — точные строки листа «Страницы»; отсутствие строки не равно нулю. Решение REDIRECT означает сохранение существующего правила. INVESTIGATE не меняет статус. Raw metadata, canonical, входящие страницы и статусы — в JSON; null означает, что HTTP-проверка ещё не приложена.\n\n## Файлы маршрутов\n\n${templates.map((x) => `- \`${x}\``).join("\n")}\n\nДинамические параметры раскрыты из активных услуг, landing pages, sitemap, GSC и каталога демо-проектов. Неограниченные неизвестные slug не перечисляются; проверяются репрезентативными 404. API отсутствует; формы используют Server Actions.\n\n## Решения\n\n| URL | Язык | Основной поисковый интент | Целевые запросы | Клики | Показы | Риск каннибализации | Решение | Целевой URL | Обоснование | Риск миграции |\n| --- | --- | --- | --- | ---: | ---: | --- | --- | --- | --- | --- |\n${rows
    .map((x) =>
      [
        x.url,
        x.locale,
        x.intent,
        x.queries.join("; ") || "—",
        x.clicks,
        x.impressions,
        x.cannibalizationRisk,
        x.decision,
        x.target,
        x.reason,
        x.migrationRisk,
      ]
        .map(cell)
        .join(" | ")
    )
    .map((x) => `| ${x} |`)
    .join("\n")}\n`
);
console.log(
  `Inventory: ${rows.length} URLs, ${templates.length} route files, ${crawl.size} HTTP observations.`
);
