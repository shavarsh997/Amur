---
name: shinex-seo-audit
description: Regular technical + on-page SEO audit of www.shinex.am (crawl, sitemap/robots, canonical/hreflang, metadata, JSON-LD, internal links, CWV). Use for the weekly SEO run or when asked to audit SHINEX SEO.
---

# SEO-аудит SHINEX
1. `npm --prefix marketing-agent run cli -- weekly` — обход 150 стр., GSC 28д, PSI; прочитай отчёт (путь печатается).
2. `npm run seo:check -- --base-url https://www.shinex.am --report "$HOME/Library/Application Support/shinex-marketing/reports/seo-check-$(date +%F).json"` — инварианты проекта (README → SEO invariants).
3. Сравни с прошлым снимком (раздел «Метрики и изменения»). Новые 4xx/5xx, noindex в sitemap, потерянный hreflang/canonical — приоритет 1.
4. Безопасные исправления: ветка `marketing/$(date +%F)-seo`, правка, `npm run lint && npm run typecheck && npm run build && npm run seo:check`, затем `gh pr create --draft`. Без merge и без деплоя.
5. Запиши итог: `npm --prefix marketing-agent run cli -- memory add ...` для каждой гипотезы.
