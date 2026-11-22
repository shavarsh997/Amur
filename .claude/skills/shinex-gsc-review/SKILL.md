---
name: shinex-gsc-review
description: Search Console review for SHINEX: queries, pages, CTR, positions, cannibalisation, indexing, sitemaps across hy/ru/en/de/fr. Use for the weekly run or when asked about SHINEX search performance.
---

# Анализ Search Console SHINEX
1. `npm --prefix marketing-agent run cli -- weekly` — GSC query+page за 28 дней и сравнение.
2. Разделы отчёта: low CTR при высоких показах, striking distance (позиции 4–20, коммерческие), каннибализация (один запрос — несколько URL одного языка).
3. Сопоставь с `docs/seo/KEYWORD_MAPPING.md` и `config/seo-intents.config.ts`.
4. Предложения: правки title/description/H1/внутренних ссылок существующих страниц → через skill shinex-seo-audit (ветка + PR).
