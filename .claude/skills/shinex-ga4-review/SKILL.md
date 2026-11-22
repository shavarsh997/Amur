---
name: shinex-ga4-review
description: GA4 review for SHINEX: traffic and lead trends, channels, landing pages, funnel, event/key-event configuration. Use for the daily/monthly run or when asked about SHINEX analytics.
---

# Анализ GA4 SHINEX
1. `npm --prefix marketing-agent run cli -- daily` — 7д vs 7д.
2. MCP `analytics-mcp`: get_custom_dimensions_and_metrics (есть ли entry_source/entry_medium/landing_page), run_report по eventName (generate_lead, phone_click, whatsapp_click, form_start, form_submit), run_funnel_report form_start→form_submit→generate_lead.
3. Сверь с `docs/seo/ANALYTICS_SETUP.md`. Если generate_lead не отмечен ключевым событием или событий нет — это находка приоритета 1.
4. Не сравнивай стандартный session source с периодом до 28.10.2026 (referrer очищается).
