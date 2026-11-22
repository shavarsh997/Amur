# SHINEX Marketing Agent

Изолированный модуль: сбор данных (GA4, Search Console, Google Ads, PageSpeed, обход сайта), анализ, отчёты, память экспериментов и воронка без персональных данных. Не входит в сборку Next.js (исключён в `tsconfig.json` и `eslint.config.mjs` корня).

- Архитектура и контракты модулей: [SPEC.md](SPEC.md)
- Правила для агентов и расписания: [CLAUDE.md](CLAUDE.md)

## Требования
Node ≥ 22.6 (без npm-зависимостей), gcloud CLI, pipx (MCP-серверы), Python 3.12 для `google-ads-mcp`.

## Первичная настройка (уже выполнена 22.11.2026)
1. GCP-проект `shinex-marketing-agent` (без биллинга): Analytics Admin/Data, Search Console, Google Ads, PageSpeed, Business Information, Cloud Resource Manager API.
2. Google Auth Platform: приложение «SHINEX Marketing Agent», External, **In production** (иначе refresh-токен истекает через 7 дней), Desktop-клиент.
3. `marketing-agent/scripts/auth-setup.sh` — забирает JSON клиента из «Загрузок» в `~/.config/shinex-marketing/`, создаёт ADC со scope adwords, analytics.readonly, webmasters.readonly, cloud-platform и quota project.
4. MCP: `analytics-mcp`, `google-ads-mcp` (pipx, user scope Claude Code).
5. `cli.ts discover` — сохраняет GA4 property, GSC site, Ads customer в `config.json`.

## Повторная авторизация
Если `health` показывает AUTH REQUIRED для Google: `./marketing-agent/scripts/auth-setup.sh` и войти аккаунтом, указанным в `ACCOUNTS.md` каталога данных («Дополнительные настройки → Перейти на страницу SHINEX Marketing Agent»).

## Тесты
```bash
cd marketing-agent && npm test && npm run typecheck
SHINEX_MA_LIVE=1 node --experimental-strip-types --test test/integration.site.test.ts   # живой обход сайта
```

## Расписание (Claude desktop, локально, Asia/Yerevan)
| Задача | Когда | Что делает |
| --- | --- | --- |
| `shinex-daily` | ежедневно 09:00 | health + daily, краткий отчёт |
| `shinex-weekly-seo` | пн 10:00 | weekly + seo:check, безопасные правки в ветке и draft PR |
| `shinex-monthly` | 1-е число 11:00 | monthly, стратегия и план на месяц |

Задачи выполняются, пока Mac включён и приложение Claude открыто; пропущенный запуск выполняется при следующем открытии приложения.
