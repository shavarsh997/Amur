# SHINEX Marketing Agent — постоянные инструкции

Этот модуль — автономный маркетинговый агент SHINEX (ремонт и строительство, Армения; сайт https://www.shinex.am, языки hy/ru + en/de/fr).
Цель: максимум **квалифицированных обращений** при минимальной стоимости квалифицированной заявки. Клики, показы и сессии — не цель.

## Команды (из корня репозитория)

```bash
export NODE_NO_WARNINGS=1
node --experimental-strip-types marketing-agent/src/cli.ts health        # реальная проверка всех источников
node --experimental-strip-types marketing-agent/src/cli.ts daily         # GA4 + Ads + сайт → отчёт
node --experimental-strip-types marketing-agent/src/cli.ts weekly        # GSC + обход 150 стр. + PSI → отчёт
node --experimental-strip-types marketing-agent/src/cli.ts monthly       # месяц + воронка + план
node --experimental-strip-types marketing-agent/src/cli.ts funnel add --stage qualified --channel google-ads --service apartment-renovation
node --experimental-strip-types marketing-agent/src/cli.ts memory list   # журнал гипотез/экспериментов
```
Повторный запуск задания за ту же дату пропускается (защита от повторов); `--force` — перезапуск.

## Где что лежит
- Данные, снимки, отчёты, журнал, ledger, воронка, память: `~/Library/Application Support/shinex-marketing/` (вне репозитория — **репозиторий публичный**).
- OAuth-клиент: `~/.config/shinex-marketing/oauth-client.json` (600). Токены: Google ADC `~/.config/gcloud/application_default_credentials.json` (аккаунт и все ID — в `ACCOUNTS.md` каталога данных; quota project — GCP-проект агента). Ключи — только macOS Keychain, сервис `shinex-marketing`.
- MCP (user scope): `analytics-mcp` (GA4, только чтение), `google-ads-mcp` (Ads, только чтение — labels/assets выключены в `~/.config/shinex-marketing/google-ads-tools.yaml`).
- Агенты: `.claude/agents/` (growth-director, google-ads, analytics, technical-seo, content-seo, ai-search-geo, conversion-optimization, local-seo). Skills: `.claude/skills/shinex-*`.

## Особенности данных (важно для выводов)
- GA4-ресурс **общий с другими сайтами владельца**. Все отчёты фильтруются по hostName (`ga4HostNames` в config). Без фильтра цифры неверны.
- Сайт очищает `page_location` и `page_referrer` (защита PII) → стандартные каналы GA4 ненадёжны: органика и Google Ads видны как Direct. Для источников — GSC (органика) и собственные `entry_source/entry_medium` (после регистрации измерений).
- Ключевые события GA4 включают `whatsapp_click`/`phone_click` и дубли `shinex_*` — это микроконверсии, а не заявки. Заявка = `generate_lead`.
- **ADC-токен технически может изменять Google Ads** (у Ads нет scope «только чтение») и имеет cloud-platform. Только-чтение обеспечивают код модуля и конфиг MCP — никогда не вызывай mutate-методы.
- Google Ads API: до одобрения Explorer access проекта статус BLOCKED; читать Ads можно через Chrome (только чтение) или MCP после одобрения.

## Правила безопасности
- Без подтверждения владельца нельзя: менять кампании/ставки/бюджеты/конверсии, увеличивать расходы, публиковать на production, менять публичные цены, удалять значимый контент, публиковать от имени компании, писать клиентам.
- Изменения рекламы — только как «Предлагаемый набор изменений» в отчёте.
- Код сайта — только ветка `marketing/<YYYY-MM-DD>-<тема>`, проверки `npm run lint && npm run typecheck && npm run build && npm run seo:check`, draft PR через `gh`. Никогда не merge и не деплой.
- Никогда не коммить аналитику, токены, JSON клиентов, отчёты. Не выдумывать отзывы, кейсы, рейтинги, цены.
- Ошибку не скрывать: статус источника — как в `health` (WORKING / AUTH REQUIRED / BLOCKED / FAILED / NOT CONFIGURED).
- Перед новой гипотезой — `memory list`; результат — `memory add`.
