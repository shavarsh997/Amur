# SHINEX — baseline analysis

- Next.js 16.2.11 / React 19, App Router; 120 indexable URLs across hy/ru/en/de/fr.
- Locale root layout emits Organization/WebSite; routes emit page/service/breadcrumb schemas.
- lib/metadata.ts owns canonical, locale alternates and production/staging robots.
- app/sitemap.ts and app/robots.ts are data-driven; proxy.ts preserves 25 retired URL redirects, slash and hostname normalization.
- Existing text/content and SEO configs stay unchanged. Snapshot compares production HTML (title, description, H1, canonical, hreflang, robots, JSON-LD, links and text blocks).
- Shared service templates cover 16 services; other routes share PageHero and global layout.
- Stock and AI-generated media are illustrative. No published case studies, team, licences or client testimonials will be invented.
- Existing unrelated user changes: eslint.config.mjs, tsconfig.json, sites/.
