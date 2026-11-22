---
name: shinex-ads-review
description: Google Ads review for SHINEX: spend, CPA, search terms, wasted spend, negatives, geo/language, bidding, conversion setup. Read-only; outputs a proposed change set. Use for the daily run or when asked about SHINEX ads.
---

# Анализ Google Ads SHINEX
1. `npm --prefix marketing-agent run cli -- daily` и раздел Ads в отчёте.
2. Глубже — MCP `google-ads-mcp` (только SELECT GAQL): search_term_view, campaign, ad_group_criterion, geographic_view, conversion_action.
3. Проверь: расход vs ориентир ~2 USD/день (дневной бюджет — не календарный лимит), CPA по generate_lead, долю расхода без конверсий, информационные запросы, гео за пределами Армении, языки, стратегию ставок при малом числе конверсий.
4. Выход: таблица «Предлагаемые изменения» (действие, причина, ожидаемый эффект, риск). Ничего не применяй — нужно подтверждение владельца.
