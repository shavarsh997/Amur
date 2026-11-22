# SHINEX Marketing Agent — спецификация модуля

Изолированный модуль в `marketing-agent/`. Не импортирует код сайта, не входит в сборку Next.js.
Нулевые runtime-зависимости: Node 22 (`fetch`, `node:test`), TypeScript запускается через
`node --experimental-strip-types` (поэтому только `import type` для типов, без enum/namespace/parameter properties,
импорты с расширением `.ts`). Typecheck: `../node_modules/.bin/tsc -p marketing-agent/tsconfig.json`.

## Где лежат данные (вне публичного репозитория)

- Каталог данных: `$SHINEX_MA_DATA_DIR` или `~/Library/Application Support/shinex-marketing/`.
  - `config.json` — несекретные идентификаторы: `{ ga4PropertyId, gscSiteUrl, adsCustomerId, adsLoginCustomerId, adsApiVersion, siteUrl, gcpProject, ga4HostNames }`. Любое поле может отсутствовать.
    `ga4HostNames` (дефолт `["www.shinex.am", "shinex.am"]`): GA4-ресурс общий для нескольких сайтов, поэтому каждый `runReport` в health и jobs получает `dimensionFilter` по `hostName` (`inListFilter`); пустой список отключает фильтр.
  - `snapshots/<source>/<YYYY-MM-DD>.json` — сырые результаты сборщиков.
  - `reports/<job>-<YYYY-MM-DD>.md` — отчёты.
  - `logs/<YYYY-MM-DD>.jsonl` — журнал действий: `{ ts, level, event, ...data }`.
  - `ledger.json` — защита от повторного выполнения действий.
  - `memory/experiments.jsonl` — гипотезы/изменения/результаты: `{ id, date, area, hypothesis, change, status: "proposed"|"approved"|"applied"|"rejected"|"won"|"lost"|"inconclusive", result?, notes? }`.
  - `funnel/leads.jsonl` — воронка без персональных данных (см. ниже).
- Секреты: только Google ADC (`~/.config/gcloud/application_default_credentials.json`, создаёт `gcloud auth application-default login`)
  и macOS Keychain (`security find-generic-password -s shinex-marketing -a <name> -w`). Никаких секретов в репозитории и в `config.json`.

## Модули

### src/core
- `paths.ts`: `dataDir()`, `ensureDir(p)`, `today()` (дата YYYY-MM-DD в Asia/Yerevan).
- `config.ts`: `type AgentConfig`; `loadConfig(): Promise<AgentConfig>` (отсутствие файла → `{}` + дефолты `siteUrl="https://www.shinex.am"`, `adsApiVersion="v23"`, `ga4HostNames=["www.shinex.am","shinex.am"]`); `saveConfig(patch)`.
- `log.ts`: `log(level, event, data?)` пишет jsonl и в stderr.
- `retry.ts`: `withRetry(fn, { retries=3, baseMs=500 })` — повтор на сетевые ошибки, HTTP 429 и 5xx (экспоненциальная задержка с джиттером); класс `HttpError { status, body }`; `fetchJson(url, init)` бросает `HttpError` при !ok.
- `ledger.ts`: `runOnce(key, fn)` — если `key` уже выполнен успешно, возвращает сохранённый результат и не вызывает `fn`; иначе выполняет и записывает `{ key, ts, ok, result }`. Ошибки не записываются как выполненные.
- `store.ts`: `saveSnapshot(source, date, data)`, `loadSnapshot(source, date)`, `listSnapshots(source)`, `latestBefore(source, date)`.
- `auth.ts`: `getAccessToken(): Promise<string>` — читает ADC (тип `authorized_user`: refresh_token/client_id/client_secret), обменивает на access token через `https://oauth2.googleapis.com/token`, кэширует до истечения. Ошибка без ADC → `AuthRequiredError`. `keychainSecret(name)` → строка или `null`. `quotaProject()` из ADC `quota_project_id` или `config.gcpProject`.

### src/connectors (каждый принимает внедряемый `fetch`/токен для тестов)
- `gsc.ts`: `listSites()`, `searchAnalytics(siteUrl, { startDate, endDate, dimensions, rowLimit })`, `inspectUrl(siteUrl, url)`, `listSitemaps(siteUrl)`. Scope `webmasters.readonly`.
- `ga4.ts`: `accountSummaries()` (Admin API v1beta), `runReport(propertyId, body)` (Data API v1beta), `keyEvents(propertyId)`.
- `ads.ts`: `searchStream(customerId, gaql)` через REST `googleads.googleapis.com/<version>/customers/<id>/googleAds:searchStream`; заголовок `developer-token` только если есть в Keychain (`google-ads-developer-token`), `login-customer-id` из config. Developer token необязателен: без него health/discover/daily всё равно вызывают API, а 403 `ACTION_NOT_PERMITTED` показывается как BLOCKED «GCP-проекту нужен Google Ads API Explorer access». Только чтение. Готовые GAQL: кампании (cost, clicks, conversions, budget), search terms, keywords, geo.
- `psi.ts`: `pageSpeed(url, strategy)` — PageSpeed Insights v5 (ключ из Keychain `psi-api-key`, если есть); возвращает lab-метрики и field (CrUX) при наличии.
- `site.ts`: `crawlSite(siteUrl, { limit })` — robots.txt, sitemap.xml, для каждой страницы: статус, финальный URL, title, description, h1 count, canonical, hreflang, meta robots, JSON-LD парсится ли.

### src/analysis (чистые функции, без сети)
- `compare.ts`: `deltas(current, previous)` для метрик → `{ metric, current, previous, change, changePct }`.
- `seo.ts`: `lowCtrOpportunities(rows)`, `strikingDistance(rows)` (позиция 4–20, коммерческий интент), `cannibalization(rows)` (один запрос → ≥2 страниц со значимыми показами), `classifyIntent(query)` (transactional/informational/navigational, hy/ru/en ключи: «цена», «стоимость», «ремонт квартир», «գին», «վերանորոգում», «price», «cost» и т.п.).
- `ads.ts`: `wastedSpend(searchTerms)` (расход без конверсий, нерелевантные/информационные), `negativeCandidates(...)`, `cpa(...)`.
- `funnel.ts`: стадии `visit → lead → qualified → inspection → contract`; агрегирование и конверсия между стадиями.
- `site.ts`: проблемы обхода (не-200, нет canonical/self-canonical mismatch, дубликаты title, отсутствие hreflang взаимности, noindex в sitemap).
- `opportunities.ts`: `rankOpportunities(findings)` → топ-N по ожидаемому коммерческому эффекту (score = влияние × уверенность / усилие).

### src/reports
- `render.ts`: Markdown-отчёт: статус интеграций, ключевые метрики и изменения, находки, топ-возможности, предлагаемые изменения (Ads — только как предложение), что требует подтверждения.

### src/cli.ts
`node --experimental-strip-types src/cli.ts <command>`:
- `health` — реальный read-only запрос в каждый источник, печатает таблицу `WORKING | AUTH REQUIRED | BLOCKED | FAILED | NOT CONFIGURED` и JSON (`--json`). Exit 0 всегда (статусы — данные).
- `discover` — находит GA4 property, GSC site, Ads customer, доступные аккаунту, и сохраняет в config (если однозначно).
- `daily | weekly | monthly` — собирает данные, сохраняет снимки, сравнивает с предыдущими, пишет отчёт, печатает путь.
- `funnel add --stage <s> --channel <c> [--landing <path>] [--service <s>] [--region <r>] [--reason <text>] [--date YYYY-MM-DD]` и `funnel report`. Запрещены поля имени/телефона/email.
- `memory add|list` — журнал экспериментов.

## Тесты
`node --experimental-strip-types --test 'test/*.test.ts'` — unit-тесты с подменой fetch и временным каталогом данных
(`SHINEX_MA_DATA_DIR`). Integration-тест `test/integration.site.test.ts` обходит живой сайт только при `SHINEX_MA_LIVE=1`.

## Правила
- Никаких изменяющих запросов к Google Ads/GA4/GSC/GBP. Изменения рекламы — только предложения в отчёте.
- Не логировать токены и заголовки авторизации.
