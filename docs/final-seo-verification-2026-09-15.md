# FINAL SHINEX SEO VERIFICATION

Дата: 15 сентября 2026. Проверены исходный код, история Git, публичный `https://www.shinex.am` и локальная production-сборка.

## Overall status

**GOOD.** Основные SEO-механизмы согласованы: **72/72** страницы sitemap доступны, разрешены для обхода, содержат основной HTML, имеют self-canonical и эквивалентные взаимные hreflang. Расширенный smoke test проходит; сборка и проверенные сценарии браузера работают.

Статус не EXCELLENT: мобильный LCP публичной главной — 4,4 с в одном лабораторном замере, на Vercel остаются дополнительные доменные редиректы, а фактическая индексация и поисковые показатели требуют Search Console. **Локальные исправления ещё не опубликованы.**

### Приложения

- [Полный технический аудит и рекомендации](/Users/shavarshpapoian/Desktop/s-work/amur-build/docs/seo-audit-2026-09-15.md).
- [Таблица всех 72 страниц: URL → HTTP → canonical и полная metadata](/Users/shavarshpapoian/Desktop/s-work/amur-build/docs/seo-verification-2026-09-15-metadata.md).
- [Результат автоматического smoke test в JSON](/Users/shavarshpapoian/Desktop/s-work/amur-build/docs/seo-verification-2026-09-15-pages.json).
- [Доказательства публичного и локального обходов](/Users/shavarshpapoian/Desktop/s-work/amur-build/docs/seo-audit-2026-09-15-evidence.json).

### Проверка Git и архитектуры

Изучены текущий diff и недавняя история, включая `c288f4d` (SEO, metadata, redirects, smoke checks), `a23f32f` (отказ от автоматической оценки ремонта) и изменения LanguageSwitcher. Текущий HEAD при проверке — `13f267e`.

- **Одна цепочка формирования URL:** `lib/site-url.ts` → `getSiteOrigin()` / `getAbsoluteUrl()` → metadata, sitemap, schema. Неодобренный origin из переменных окружения не становится canonical.
- **Один sitemap и один robots:** маршруты `app/sitemap.ts` и `app/robots.ts`; конкурирующих статических файлов в `public` не найдено.
- **Layout и страницы дополняют друг друга:** layout задаёт defaults, иконки и verification; `createPageMetadata` задаёт полный набор полей конкретной страницы. Вложенные metadata Next.js заменяются целиком, поэтому одинаковый robots helper используется на обоих уровнях. В готовом HTML проверены итоговые теги, а не только TypeScript-объекты.
- **Title не удваивает бренд:** страницы используют `title.absolute`; повторного `SHINEX | SHINEX` не обнаружено.
- **Один прикладной механизм редиректа:** `proxy.ts`; отдельного конкурирующего middleware нет. Нормализация слэша перенесена из встроенного редиректа Next.js в proxy для объединения переходов.
- **JSON-LD разделён по назначению:** один Organization и WebSite из layout, Service/WebPage и BreadcrumbList из страницы. На всех 72 страницах одна согласованная организация и нет повторяющихся верхнеуровневых `@id` внутри одной страницы.
- **Калькулятор ремонта не возвращён:** подтверждённая цена служит ориентиром в тексте, а ремонт ведёт к контакту. Калькулятор строительства/дизайна и его проверки сохранены.
- Новые тяжёлые client components, внешние шрифты или блокирующие скрипты SEO-изменениями не добавлены. Число уникальных script src при сравнении обходов осталось 20. Общий объём сериализованных JSON-LD по 72 страницам изменился незначительно: 170 479 → 170 710 байт в формате измерения аудитора, главным образом из-за текста цены; это не размер одного ответа по сети.

## Critical conflicts found

**No critical SEO conflicts found.**

Не найдено пересечений вида «URL в sitemap, но noindex/404/redirect/чужой canonical», массового canonical на главную, canonical на другую языковую версию или закрытия услуг через robots.txt. Это вывод о проверенных ответах и коде; он не заменяет отчёты Google о выбранном canonical и статусе индексации.

## Regressions found

**Подтверждённых регрессий опубликованных SEO-страниц от текущих изменений не обнаружено.**

При проверке промежуточного решения обнаружено, что `NextURL.clone()` способен восстановить исходный завершающий слэш. Это исправлено до завершения аудита: plain `URL` формирует окончательную цель. Итоговые редиректы повторно проверены HTTP-запросами.

Найдены пробелы прежнего smoke test: отсутствие проверки правил robots для каждого URL, пропуск абсолютных внутренних ссылок, учёт языковых ссылок как достаточного признака доступности страницы. Эти пробелы могли скрыть будущие регрессии, хотя соответствующего нарушения на текущем сайте не найдено. Проверки усилены.

Отдельный **риск публикации**, а не текущая ошибка production: статическую preview-сборку с noindex нельзя продвигать в production без пересборки в production-окружении. Это зафиксировано в README. Подмена production sitemap URL на preview URL не происходит.

## Fixed during this audit

На повторном проходе изменения ограничены тестами и документацией — работающие страницы, H1, URL, canonical и hreflang повторно не переписывались.

| FILE                                                                                                          | PROBLEM                                                                                   | FIX                                                                                                                                                                                              | WHY                                                                      |
| ------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------ |
| [scripts/lib/robots-rules.mjs](/Users/shavarshpapoian/Desktop/s-work/amur-build/scripts/lib/robots-rules.mjs) | Раньше тест проверял лишь наличие ссылки Sitemap в robots                                 | Проверка User-agent, Allow/Disallow, приоритетов, wildcard и end-anchor правил, используемых проектом                                                                                            | Выявлять конфликт sitemap → robots для каждой страницы и важных ресурсов |
| [scripts/lib/crawl-seo.mjs](/Users/shavarshpapoian/Desktop/s-work/amur-build/scripts/lib/crawl-seo.mjs)       | Возможные слепые зоны при проверке готового HTML и ссылок                                 | Проверка Content-Type, количества title/description, SSR-текста, OG URL, robots, абсолютных ссылок, языка, входящих ссылок внутри языка, query-параметров, одинаковой организации и XML hreflang | Проверять SEO как связанную систему                                      |
| [scripts/seo-check.mjs](/Users/shavarshpapoian/Desktop/s-work/amur-build/scripts/seo-check.mjs)               | Не было автоматически сохраняемого полного реестра страниц; не все invariants были явными | Проверки canonical origin/locale/технических путей sitemap, контрольные примеры robots, `--report` с JSON всех metadata и HTTP-заголовков                                                        | Делать будущие проверки воспроизводимыми и проверяемыми                  |
| [README.md](/Users/shavarshpapoian/Desktop/s-work/amur-build/README.md)                                       | Правила взаимного согласования SEO не были перечислены                                    | Добавлены SEO invariants, команды выгрузки и границы проверки                                                                                                                                    | Предотвращать регрессии при следующих изменениях                         |

Исправления основного прохода — единый 308, защита staging, robots helper, verification token, sizes логотипа, контраст небольших подписей и intent map — сохранены и повторно проверены. Их точный список файлов находится в основном отчёте. Предсуществующую пробельную правку LanguageSwitcher не меняли.

## Canonical verification

**PASS.** На всех 72 страницах один canonical, совпадающий с основным URL на `https://www.shinex.am`, без слэша, query и смены языка. Каждый target входит в проверенный набор HTTP 200. `og:url` согласован с canonical.

Отдельно проверены `utm_source`, `gclid`, `fbclid`: страница остаётся доступной, metadata не меняется на параметризованный URL, атрибуция не удаляется редиректом. Полная таблица URL → status → canonical находится в приложении metadata.

## Hreflang verification

**PASS.** `hy-AM`, `ru-AM`, `en` и `x-default` образуют взаимные наборы эквивалентных страниц. Все targets доступны и имеют self-canonical. HTML и отрендеренный sitemap XML согласованы. Корень и x-default сохраняют приоритет HY; прямое открытие RU/EN не переводит пользователя в HY.

## Sitemap verification

**PASS.** 72 уникальных URL; нет 404, редиректов, noindex, технических страниц или неподдерживаемых языков. Сверены исходный список, публичный XML, XML локальной сборки и ответы страниц. Важных опубликованных страниц, отсутствующих в sitemap, не найдено. Blog/projects пока не опубликованы и правильно исключены. `lastmod` отсутствует; недостоверные даты не добавлялись.

**Список автоматических ошибок sitemap: пустой.**

## Robots verification

**PASS.** Публичный robots разрешает HTML, языки, услуги и ресурсы рендеринга. Содержит правильный sitemap; `/api/`, `/admin/`, `/preview/` ограничены. Проверены Googlebot, Googlebot-Image и общий User-agent для каждого sitemap URL. В production блокирующего X-Robots-Tag нет.

Preview защищён noindex, оставаясь доступным для чтения этой директивы. Его sitemap перечисляет production URL, а не noindex preview URL; противоречия между этими адресами нет. Правила произвольного staging задаются `SITE_NOINDEX=true` при сборке и запуске.

## Metadata verification

**PASS.** 72 непустых уникальных title, 72 непустых уникальных description, один H1 на каждой странице. Проверены язык, соответствие заголовка теме, OG/Twitter, итоговое наследование layout/page. Армянская metadata не заменена английской/русской. SHINEX и технические обозначения AMD не считаются ошибкой языка.

Полная таблица **URL / Title / Description / H1 / Canonical / Locale** дана в отдельном приложении, без выборочного исключения страниц.

## Structured data verification

**PASS по синтаксису и согласованности данных.** На всех страницах одна и та же организация, телефон и домен; Service URL соответствует canonical, BreadcrumbList не дублируется. Рейтинги и отзывы не выдумывались. Наличие полезного FAQ не требует добавления ещё одного типа schema.

Это не подтверждение права на любой rich result. Полный публичный адрес компании не предоставлен; Rich Results Test и фактическое отображение Google остаются отдельной проверкой. FAQ rich results Google прекратил показывать с мая 2026. [Журнал Google Search](https://developers.google.com/search/updates#may-2026).

## Internal links verification

**PASS.** Проверены относительные и абсолютные внутренние href, конечные пути и якоря. Ссылок на старые пути, localhost/staging или неверную языковую версию не найдено. У каждой страницы есть входящая ссылка с другой страницы **того же языка**; ссылки только между переводами для этого критерия не учитываются. Orphan pages: **0**.

## Redirect verification

**PASS для прикладных правил и конечных целей.** Проверены 15 старых локализованных URL, каждый со слэшем и без — 30 вариантов, плюс 3 языковых корня со слэшем. Все дают один 308 на правильный конечный путь; UTM сохраняется. Цели возвращают 200 и не редиректят повторно.

**Замечание к публичному хостингу:** www/non-www и HTTP/HTTPS переходы Vercel могут выполняться до proxy. Например, HTTP apex root проходит через HTTPS apex и www перед `/hy`. Исправление одного прикладного перехода не означает, что все внешние цепочки уже устранены. Публичный сайт также ещё использует предыдущую версию обработки старого URL со слэшем. Ни циклов, ни конечных 404 в проверенных цепочках не найдено.

## Indexability verification

**PASS — техническая доступность.** Для всех 72 страниц выполнено:

`внутренняя ссылка → robots разрешает → HTML 200 → нет noindex → self-canonical → верный язык → взаимный hreflang → sitemap → основной текст`.

Обход с User-Agent Googlebot Smartphone — это имитация заголовка запроса, а не запрос с IP Google. На контрольных страницах HTML совпал с ответом обычному браузеру. Google может выбрать не индексировать часть технически корректных страниц по содержательным и другим причинам; это проверяется в GSC.

## Mobile verification

**PASS для проверенных сценариев.** На ширине 390 px проверены главная, цена, навигация и переключение языка. Основной DOM-текст цены совпадает с desktop; горизонтального переполнения нет. FAQ остаётся серверным HTML. Новые оттенки текста применились; геометрия элементов сохранена.

**Производительность требует внимания:** публичная главная — mobile 76/100, LCP 4,4 с, CLS 0, TBT 140 мс; desktop 99/100, LCP 0,4 с. Реальных CrUX/INP данных нет. Это замер публичной версии до публикации локальных исправлений, а не доказательство отсутствия любых CWV-регрессий. [PageSpeed report](https://pagespeed.web.dev/analysis/https-www-shinex-am-hy/3czcp6hc3n?form_factor=mobile).

## Production build

**PASS.** `npm run lint`, `npm run typecheck`, `npm run seo:check`, `npm run calculator:check`, `npm run build` выполнены успешно. После последнего изменения кода приложения production-сборка запущена через `next start`; расширенный HTTP smoke test повторно прошёл после изменений самих проверок.

В выводе Next.js — 86 сгенерированных маршрутов, включая служебные. Это **не** 86 индексируемых страниц: индексируемый sitemap содержит 72. Неопубликованные blog/projects могут присутствовать в дереве маршрутов, но фактически возвращают 404.

## Runtime verification

**PASS в проверенной выборке.** В чистой браузерной вкладке открыты `/hy`, `/ru`, `/en`, `/hy/services/apartment-renovation-yerevan`, `/hy/services/new-build-renovation`, `/hy/calculator`, `/hy/prices`. Проверены H1, основной текст, canonical и язык. Открыт/закрыт диалог контактов и выполнен клиентский переход `/hy/prices` → `/ru/prices` через переключатель.

В захваченной консоли этих сценариев **0 ошибок и 0 предупреждений**, hydration mismatch не обнаружено. Серверные SEO-ответы проверены на всех 72 URL. Это не исчерпывающий тест каждого возможного пользовательского действия; отправка заявок и сторонние аккаунты GA не проверялись.

## Keyword cannibalization

**Подтверждённой каннибализации не найдено.** Точные дубли title/description и всего основного текста отсутствуют. Общие CTA, блоки связанных услуг и реквизиты закономерно повторяются; они не считаются самостоятельными дублирующими посадочными страницами. Скрытого набора ключей или искусственного многократного повторения запросов в изменённых текстах не найдено.

Зоны наблюдения: общий ремонт ↔ ремонт квартиры; общий дизайн ↔ дизайн квартиры; коммерческие помещения ↔ офис. Наличие смыслового пересечения не доказывает проблему в выдаче. Primary/supporting роли приведены ниже; фактическое переключение Google между URL одного запроса нужно проверить в GSC. Ремонт частного дома и цена строительства пока покрыты более широкими страницами — это недостаток глубины, а не основание удалить действующие URL.

## Keyword → Primary URL

Supporting URLs дополняют ответ и ссылаются на primary; они не должны копировать его title/H1 и основной текст. Все пути ниже начинаются с `https://www.shinex.am`.

| Keyword                            | Primary URL                                                                                                           | Supporting URLs                                                                                                                                                                                                                                 | Intent / примечание                         |
| ---------------------------------- | --------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------- |
| բնակարանի վերանորոգում             | [/hy/services/apartment-renovation-yerevan](https://www.shinex.am/hy/services/apartment-renovation-yerevan)           | [/hy/services/new-build-renovation](https://www.shinex.am/hy/services/new-build-renovation); [/hy/prices](https://www.shinex.am/hy/prices)                                                                                                      | Ремонт квартиры                             |
| բնակարանների վերանորոգում          | [/hy/services/apartment-renovation-yerevan](https://www.shinex.am/hy/services/apartment-renovation-yerevan)           | [/hy/services/capital-renovation-yerevan](https://www.shinex.am/hy/services/capital-renovation-yerevan); [/hy/services/cosmetic-renovation-yerevan](https://www.shinex.am/hy/services/cosmetic-renovation-yerevan)                              | Тот же кластер                              |
| նորակառույց բնակարանի վերանորոգում | [/hy/services/new-build-renovation](https://www.shinex.am/hy/services/new-build-renovation)                           | [/hy/services/apartment-renovation-yerevan](https://www.shinex.am/hy/services/apartment-renovation-yerevan); [/hy/prices](https://www.shinex.am/hy/prices)                                                                                      | Квартира от застройщика                     |
| բնակարանի վերանորոգման գին         | [/hy/prices](https://www.shinex.am/hy/prices)                                                                         | [/hy/renovation-estimate-yerevan](https://www.shinex.am/hy/renovation-estimate-yerevan); [/hy/services/apartment-renovation-yerevan](https://www.shinex.am/hy/services/apartment-renovation-yerevan)                                            | Бюджет ремонта                              |
| վերանորոգման արժեքը 1 քմ           | [/hy/prices](https://www.shinex.am/hy/prices)                                                                         | [/hy/renovation-estimate-yerevan](https://www.shinex.am/hy/renovation-estimate-yerevan); [/hy/services/capital-renovation-yerevan](https://www.shinex.am/hy/services/capital-renovation-yerevan)                                                | Цена за м², состав предложения              |
| բնակարանի կապիտալ վերանորոգում     | [/hy/services/capital-renovation-yerevan](https://www.shinex.am/hy/services/capital-renovation-yerevan)               | [/hy/prices](https://www.shinex.am/hy/prices); [/hy/services/plumbing-work-yerevan](https://www.shinex.am/hy/services/plumbing-work-yerevan); [/hy/services/electrical-work-yerevan](https://www.shinex.am/hy/services/electrical-work-yerevan) | Капитальное обновление                      |
| վերանորոգման նախահաշիվ             | [/hy/renovation-estimate-yerevan](https://www.shinex.am/hy/renovation-estimate-yerevan)                               | [/hy/prices](https://www.shinex.am/hy/prices); [/hy/contacts](https://www.shinex.am/hy/contacts)                                                                                                                                                | Смета и объёмы работ                        |
| առանձնատան վերանորոգում            | [/hy/services/renovation](https://www.shinex.am/hy/services/renovation)                                               | [/hy/services/facade-and-roofing](https://www.shinex.am/hy/services/facade-and-roofing); [/hy/prices](https://www.shinex.am/hy/prices)                                                                                                          | Ремонт дома; пока общий раздел              |
| առանձնատան կառուցում               | [/hy/services/house-construction](https://www.shinex.am/hy/services/house-construction)                               | [/hy/services/design](https://www.shinex.am/hy/services/design); [/hy/calculator](https://www.shinex.am/hy/calculator)                                                                                                                          | Строительство дома                          |
| տան կառուցման արժեքը               | [/hy/calculator](https://www.shinex.am/hy/calculator)                                                                 | [/hy/services/house-construction](https://www.shinex.am/hy/services/house-construction); [/hy/services/design](https://www.shinex.am/hy/services/design)                                                                                        | Стоимость строительства; частичное покрытие |
| շինարարական ընկերություն           | [/hy](https://www.shinex.am/hy)                                                                                       | [/hy/about](https://www.shinex.am/hy/about); [/hy/services](https://www.shinex.am/hy/services); [/hy/contacts](https://www.shinex.am/hy/contacts)                                                                                               | Выбор компании в Армении                    |
| ինտերիերի դիզայն                   | [/hy/services/interior-design](https://www.shinex.am/hy/services/interior-design)                                     | [/hy/services/apartment-interior-design-yerevan](https://www.shinex.am/hy/services/apartment-interior-design-yerevan); [/hy/calculator](https://www.shinex.am/hy/calculator)                                                                    | Общая услуга дизайна                        |
| բնակարանի ինտերիերի դիզայն         | [/hy/services/apartment-interior-design-yerevan](https://www.shinex.am/hy/services/apartment-interior-design-yerevan) | [/hy/services/interior-design](https://www.shinex.am/hy/services/interior-design); [/hy/services/apartment-renovation-yerevan](https://www.shinex.am/hy/services/apartment-renovation-yerevan)                                                  | Дизайн квартиры                             |
| գրասենյակի վերանորոգում            | [/hy/services/office-renovation-yerevan](https://www.shinex.am/hy/services/office-renovation-yerevan)                 | [/hy/services/commercial-construction](https://www.shinex.am/hy/services/commercial-construction); [/hy/services/interior-design](https://www.shinex.am/hy/services/interior-design)                                                            | Офис                                        |
| առևտրային տարածքների վերանորոգում  | [/hy/services/commercial-construction](https://www.shinex.am/hy/services/commercial-construction)                     | [/hy/services/office-renovation-yerevan](https://www.shinex.am/hy/services/office-renovation-yerevan); [/hy/services/interior-design](https://www.shinex.am/hy/services/interior-design)                                                        | Помещения бизнеса                           |

## URLs Google should index

Полный набор — **72 URL**, 24 на каждый язык. Это список разрешённых для индексации страниц, а не подтверждение фактического нахождения всех в Google. Вспомогательные about/contacts/privacy сохранены.

### Armenian — HY (24)

- [https://www.shinex.am/hy](https://www.shinex.am/hy)
- [https://www.shinex.am/hy/services](https://www.shinex.am/hy/services)
- [https://www.shinex.am/hy/about](https://www.shinex.am/hy/about)
- [https://www.shinex.am/hy/contacts](https://www.shinex.am/hy/contacts)
- [https://www.shinex.am/hy/calculator](https://www.shinex.am/hy/calculator)
- [https://www.shinex.am/hy/privacy](https://www.shinex.am/hy/privacy)
- [https://www.shinex.am/hy/services/renovation](https://www.shinex.am/hy/services/renovation)
- [https://www.shinex.am/hy/services/house-construction](https://www.shinex.am/hy/services/house-construction)
- [https://www.shinex.am/hy/services/interior-design](https://www.shinex.am/hy/services/interior-design)
- [https://www.shinex.am/hy/services/commercial-construction](https://www.shinex.am/hy/services/commercial-construction)
- [https://www.shinex.am/hy/services/design](https://www.shinex.am/hy/services/design)
- [https://www.shinex.am/hy/services/monolithic-work](https://www.shinex.am/hy/services/monolithic-work)
- [https://www.shinex.am/hy/services/facade-and-roofing](https://www.shinex.am/hy/services/facade-and-roofing)
- [https://www.shinex.am/hy/services/apartment-renovation-yerevan](https://www.shinex.am/hy/services/apartment-renovation-yerevan)
- [https://www.shinex.am/hy/services/new-build-renovation](https://www.shinex.am/hy/services/new-build-renovation)
- [https://www.shinex.am/hy/services/turnkey-renovation](https://www.shinex.am/hy/services/turnkey-renovation)
- [https://www.shinex.am/hy/prices](https://www.shinex.am/hy/prices)
- [https://www.shinex.am/hy/services/apartment-interior-design-yerevan](https://www.shinex.am/hy/services/apartment-interior-design-yerevan)
- [https://www.shinex.am/hy/services/office-renovation-yerevan](https://www.shinex.am/hy/services/office-renovation-yerevan)
- [https://www.shinex.am/hy/services/capital-renovation-yerevan](https://www.shinex.am/hy/services/capital-renovation-yerevan)
- [https://www.shinex.am/hy/services/cosmetic-renovation-yerevan](https://www.shinex.am/hy/services/cosmetic-renovation-yerevan)
- [https://www.shinex.am/hy/renovation-estimate-yerevan](https://www.shinex.am/hy/renovation-estimate-yerevan)
- [https://www.shinex.am/hy/services/plumbing-work-yerevan](https://www.shinex.am/hy/services/plumbing-work-yerevan)
- [https://www.shinex.am/hy/services/electrical-work-yerevan](https://www.shinex.am/hy/services/electrical-work-yerevan)

### Russian — RU (24)

- [https://www.shinex.am/ru](https://www.shinex.am/ru)
- [https://www.shinex.am/ru/services](https://www.shinex.am/ru/services)
- [https://www.shinex.am/ru/about](https://www.shinex.am/ru/about)
- [https://www.shinex.am/ru/contacts](https://www.shinex.am/ru/contacts)
- [https://www.shinex.am/ru/calculator](https://www.shinex.am/ru/calculator)
- [https://www.shinex.am/ru/privacy](https://www.shinex.am/ru/privacy)
- [https://www.shinex.am/ru/services/renovation](https://www.shinex.am/ru/services/renovation)
- [https://www.shinex.am/ru/services/house-construction](https://www.shinex.am/ru/services/house-construction)
- [https://www.shinex.am/ru/services/interior-design](https://www.shinex.am/ru/services/interior-design)
- [https://www.shinex.am/ru/services/commercial-construction](https://www.shinex.am/ru/services/commercial-construction)
- [https://www.shinex.am/ru/services/design](https://www.shinex.am/ru/services/design)
- [https://www.shinex.am/ru/services/monolithic-work](https://www.shinex.am/ru/services/monolithic-work)
- [https://www.shinex.am/ru/services/facade-and-roofing](https://www.shinex.am/ru/services/facade-and-roofing)
- [https://www.shinex.am/ru/services/apartment-renovation-yerevan](https://www.shinex.am/ru/services/apartment-renovation-yerevan)
- [https://www.shinex.am/ru/services/new-build-renovation](https://www.shinex.am/ru/services/new-build-renovation)
- [https://www.shinex.am/ru/services/turnkey-renovation](https://www.shinex.am/ru/services/turnkey-renovation)
- [https://www.shinex.am/ru/prices](https://www.shinex.am/ru/prices)
- [https://www.shinex.am/ru/services/apartment-interior-design-yerevan](https://www.shinex.am/ru/services/apartment-interior-design-yerevan)
- [https://www.shinex.am/ru/services/office-renovation-yerevan](https://www.shinex.am/ru/services/office-renovation-yerevan)
- [https://www.shinex.am/ru/services/capital-renovation-yerevan](https://www.shinex.am/ru/services/capital-renovation-yerevan)
- [https://www.shinex.am/ru/services/cosmetic-renovation-yerevan](https://www.shinex.am/ru/services/cosmetic-renovation-yerevan)
- [https://www.shinex.am/ru/renovation-estimate-yerevan](https://www.shinex.am/ru/renovation-estimate-yerevan)
- [https://www.shinex.am/ru/services/plumbing-work-yerevan](https://www.shinex.am/ru/services/plumbing-work-yerevan)
- [https://www.shinex.am/ru/services/electrical-work-yerevan](https://www.shinex.am/ru/services/electrical-work-yerevan)

### English — EN (24)

- [https://www.shinex.am/en](https://www.shinex.am/en)
- [https://www.shinex.am/en/services](https://www.shinex.am/en/services)
- [https://www.shinex.am/en/about](https://www.shinex.am/en/about)
- [https://www.shinex.am/en/contacts](https://www.shinex.am/en/contacts)
- [https://www.shinex.am/en/calculator](https://www.shinex.am/en/calculator)
- [https://www.shinex.am/en/privacy](https://www.shinex.am/en/privacy)
- [https://www.shinex.am/en/services/renovation](https://www.shinex.am/en/services/renovation)
- [https://www.shinex.am/en/services/house-construction](https://www.shinex.am/en/services/house-construction)
- [https://www.shinex.am/en/services/interior-design](https://www.shinex.am/en/services/interior-design)
- [https://www.shinex.am/en/services/commercial-construction](https://www.shinex.am/en/services/commercial-construction)
- [https://www.shinex.am/en/services/design](https://www.shinex.am/en/services/design)
- [https://www.shinex.am/en/services/monolithic-work](https://www.shinex.am/en/services/monolithic-work)
- [https://www.shinex.am/en/services/facade-and-roofing](https://www.shinex.am/en/services/facade-and-roofing)
- [https://www.shinex.am/en/services/apartment-renovation-yerevan](https://www.shinex.am/en/services/apartment-renovation-yerevan)
- [https://www.shinex.am/en/services/new-build-renovation](https://www.shinex.am/en/services/new-build-renovation)
- [https://www.shinex.am/en/services/turnkey-renovation](https://www.shinex.am/en/services/turnkey-renovation)
- [https://www.shinex.am/en/prices](https://www.shinex.am/en/prices)
- [https://www.shinex.am/en/services/apartment-interior-design-yerevan](https://www.shinex.am/en/services/apartment-interior-design-yerevan)
- [https://www.shinex.am/en/services/office-renovation-yerevan](https://www.shinex.am/en/services/office-renovation-yerevan)
- [https://www.shinex.am/en/services/capital-renovation-yerevan](https://www.shinex.am/en/services/capital-renovation-yerevan)
- [https://www.shinex.am/en/services/cosmetic-renovation-yerevan](https://www.shinex.am/en/services/cosmetic-renovation-yerevan)
- [https://www.shinex.am/en/renovation-estimate-yerevan](https://www.shinex.am/en/renovation-estimate-yerevan)
- [https://www.shinex.am/en/services/plumbing-work-yerevan](https://www.shinex.am/en/services/plumbing-work-yerevan)
- [https://www.shinex.am/en/services/electrical-work-yerevan](https://www.shinex.am/en/services/electrical-work-yerevan)

## URLs Google should NOT index

- Старые пути: `services/house-construction-yerevan`, `services/complete-house-construction-yerevan`, `services/interior-design-yerevan`, `services/commercial-renovation-yerevan`, `renovation-price-per-square-meter-yerevan` во всех трёх языках — 308 на действующую услугу или `prices`, без присутствия в sitemap.
- HTTP/non-www варианты, корень `/` и варианты со слэшем — алиасы с постоянным редиректом, а не отдельные страницы.
- Query-варианты `utm_*`, `gclid`, `fbclid` — чистый canonical при сохранении рекламной атрибуции.
- Неопубликованные `/hy|ru|en/projects` и `/hy|ru|en/blog`, их неопубликованные дочерние URL, `/fr` и вымышленные адреса — настоящий 404/noindex.
- `/api/*`, будущие `/admin/*`, `/auth/*`, `/preview/*` — технические маршруты вне sitemap; для приватных интерфейсов нужны доступ по авторизации и noindex, а не только robots Disallow.
- Development, Vercel preview и другие staging с установленным флагом — noindex. Для private staging noindex не заменяет защиту доступа.

`robots.txt`, `sitemap.xml`, manifest, CSS/JS, next/image, brand assets и share-image — ресурсы, а не SEO-посадочные страницы. Они должны оставаться доступными для обхода/рендеринга; изображения могут участвовать в Google Images. Запрещать их массово ради исключения «технических URL» не следует.

## SEO invariants

Инварианты закреплены в README и автоматических проверках: индексируемый URL должен быть доступен robots, возвращать содержательный HTML 200, иметь один title/description/H1, корректные canonical/locale/hreflang и sitemap, входящую ссылку своего языка. Неиндексируемые и старые страницы не включаются в sitemap; редиректы сохраняют язык и атрибуцию, схема сохраняет идентичность компании.

Команда проверки и создания нового реестра:

```bash
npm run seo:check -- --base-url http://127.0.0.1:3100 --report /tmp/shinex-seo-pages.json
```

После публикации тот же тест можно запустить с `--base-url https://www.shinex.am`. До публикации он закономерно обнаружит старое поведение редиректа со слэшем на публичном сайте. Проверка по умолчанию предназначена для production, поэтому запуск против noindex preview должен завершаться ошибкой индексируемости.

## Ответы на 18 итоговых вопросов

1. **Есть ли сейчас код, мешающий индексации?** На основных страницах при production-настройках не обнаружен. Преднамеренный noindex preview станет проблемой только при ошибочной публикации такого окружения.
2. **Есть ли конфликт robots/sitemap/canonical/hreflang/metadata?** На проверенных 72 URL нет; расширенный автоматический тест проходит.
3. **Может ли Google считать страницы дублями?** Точных дублей основной части нет. Query и доменные алиасы канонизируются. Google может иначе оценить похожие услуги; это выясняется в GSC, а не только сравнением строк.
4. **Неправильный canonical?** Не найдено: 72/72 self-canonical на правильный HTTPS www URL и язык.
5. **Broken hreflang?** Не найдено; targets доступны, взаимны и эквивалентны.
6. **Индексируемые redirects?** Redirect URL отсутствуют в sitemap, canonical и внутренних ссылках. Старый URL может некоторое время отображаться в Google до повторного обхода; это не подтверждено как текущая ошибка индексации.
7. **Неиндексируемые URL в sitemap?** Нет, все 72 прошли проверку.
8. **Важные опубликованные страницы вне sitemap?** Не обнаружены. Blog/projects пока намеренно не опубликованы.
9. **Orphan pages?** Нет: есть входящие ссылки с других страниц того же языка.
10. **Keyword cannibalization?** Не доказана. Primary URL назначены; широкие и узкие услуги требуют наблюдения в GSC.
11. **Проблемы multilingual architecture?** В проверенных маршрутах и metadata нет: прямой доступ к HY/RU/EN сохранён, язык самопроизвольно не меняется.
12. **Проблемы Next.js rendering?** Основной HTML, metadata и schema присутствуют до гидратации; конфликтов наследования не найдено.
13. **Runtime/hydration ошибки?** В проверенных браузерных сценариях не обнаружены. Это ограниченная функциональная выборка, а не гарантия для всех устройств и действий.
14. **Production build проходит?** Да, полностью; lint, typecheck и существующие тесты также проходят.
15. **Есть ли потенциально опасные изменения?** Главное — не публиковать preview/noindex сборку как production. Действующие URL и язык canonical не менялись; постоянные переносы сохранены и проверены.
16. **Нужно ли что-то откатывать?** По полученным результатам оснований для отката нет. Промежуточная проблема со слэшем исправлена и покрыта тестом.
17. **Что остаётся вне кода?** Публикация и проверка окружения, GSC, настройки доменных редиректов Vercel, реальный Business Profile, собственные кейсы/отзывы, состав цены от 55 000 драм/м², проверка GA4 и внешние упоминания. Мобильная скорость требует дополнительной технической работы и замера после публикации.
18. **Сможет ли Googlebot сегодня пройти сайт и понять его?** По текущим HTTP/HTML и связям — технически да: основные публичные страницы доступны и согласованы. Код не может гарантировать фактическую индексацию каждого URL или поисковые позиции; итог подтверждается данными Google.

**Финальный вывод:** SEO-архитектура согласована и прошла повторную проверку. Обязательный следующий шаг для применения исправлений — публикация проверенной production-сборки и контроль Google Search Console. Гарантий TOP-1/TOP-10 нет.
