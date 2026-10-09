# Scroll-driven construction background

Added a decorative isometric building-to-interior sequence to the shared locale
layout. A foundation is followed by five separate structural floors at 5%, 11.5%,
18%, 24.5% and 31% of the main content's scroll range. The facade appears at 37%.
Between 46% and 62%, a scroll-controlled camera approaches a highlighted window
on the third floor and transitions into the existing room scene. Room engineering,
finishes and furniture appear at 60%, 65% and 72%. Scrolling upward reverses the
whole sequence, including the approach to the window.

The SVG is rendered on the server, is hidden from assistive technology, and has no
focusable controls or pointer events. At 1280 px and above, the reading column is
centered on the viewport, with equal side gutters and a width of 78% capped at
1240 px (slightly widened from the initial 72% / 1120 px layout).
The right gutter holds the sticky scene at 48% opacity and reduced saturation,
without a separate panel background or border. Below 1280 px, matching the mobile
navigation breakpoint, a 56 × 44 px scene sits in the header immediately to the
left of the menu button. There is no animation strip above the page content.
The two SVG instances have unique definition IDs and share one scroll controller;
CSS displays only the appropriate instance. The header's height stays unchanged.
Reduced motion shows a static finished room. Print and forced-color
modes hide the decoration and restore the full-width reading area.

Shared content grids and typography respond to the actual reading-column width
with named CSS container queries. Home sections, service pages, contacts, related
links, project grids and calculator controls adapt without shrinking text or
removing content. Existing solid text surfaces preserve contrast. Image size hints
for the home hero and service cards reflect their new dimensions. Calculator
dialogs render into document.body so they cover the scene and header correctly.

No packages, image requests, video, canvas or WebGL were added. A passive scroll
listener batches reads with requestAnimationFrame. DOM writes occur only when a
stage changes or the camera moves within its approach segment. No animation loop
runs while idle. Listeners, resize observers and pending frames are removed on
route cleanup or when reduced motion is enabled.

## Verification

- Production build, TypeScript, ESLint and formatting checks passed.
- Captured the production HTML before and after the change. All 132 generated HTML
  pages retain exactly the same title, meta tags, canonical/hreflang, H1–H3, main
  text, JSON-LD and anchor URLs. The route inventory is unchanged.
- Relative to the initial five-storey implementation, the content adaptation and
  additional header SVG add approximately 2.0–2.4 kB of compressed home HTML per
  locale. CSS and the small controller are additional shared assets.
- The production HTTP SEO crawl passed for 120 sitemap pages, 50 retired-URL
  variants, 3 slash redirects and 15 true 404s. It also checked internal links,
  hreflang, structured data and the share image.
- The crawl initially reported a pre-existing false positive: it required the
  company's translated street/city strings to be identical across all languages.
  The checker now compares each complete Organization schema with that locale's
  configured schema. No production structured data was changed.
- Browser checks for the centered/header layout at 320×568, 390×844, 1280×720,
  1440×900 and 1920×1080 confirmed no horizontal overflow. Desktop content centers
  exactly at the viewport midpoint. The mobile header remains 65 px tall, and its
  miniature animates through the building and interior stages. Opening and closing
  the menu works with the miniature beside it. No duplicate SVG IDs were found.
- Earlier checks covered the Russian home, calculator and house-construction service pages, plus
  German contacts with long text. Mobile field focus settled below the sticky
  scene. A 100 m² construction calculation opened its result over the whole page,
  and the close button remained visible. Calculator amount checks pass across all
  five locales. Navigation resets scene progress. No browser
  console errors or warnings were observed during these checks.
- A controller lifecycle harness verified all five floor counts, a complete frame
  before the facade, the facade before the approach, a bounded and continuous
  camera progression, short pages, forward/reverse progression, coalesced
  scroll events, no mutations within a stage, no idle frame loop, live reduced
  motion changes and cleanup of observers/listeners/pending frames.

These checks establish content/indexing preservation and the local behavior of
the change. They are not a field Core Web Vitals or search-ranking measurement.
