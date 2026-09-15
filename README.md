This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Telegram notifications for contact forms

All submissions from the contact form are sent by a Telegram bot. Add these server-side variables locally in `.env.local` and in the environment settings of the deployed site:

```bash
TELEGRAM_BOT_TOKEN=123456:replace-with-token-from-botfather
TELEGRAM_CHAT_ID=-1001234567890
```

Create the bot through [@BotFather](https://t.me/BotFather), add it to the target chat (or start a private chat with it), then obtain the chat ID. Do not use the `NEXT_PUBLIC_` prefix: the bot token must never be exposed to the browser.

## Google Analytics 4

To enable Google Analytics, add the GA4 Measurement ID to `.env.local` and to the environment variables of the deployed site:

```bash
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

The identifier is public and starts with `G-`. The tag is omitted when this variable is unset. Existing interaction events (contact clicks, forms, and calculator actions) will then be sent to GA4 as well.

## SEO and multilingual checks

```bash
npm run lint
npm run typecheck
npm run build
npm run seo:check
npm run calculator:check
```

To check rendered pages, start the production build with `npm run start`, then run:

```bash
npm run seo:check -- --base-url http://localhost:3000
```

To save the verified URL/status/title/description/H1/canonical/locale inventory:

```bash
npm run seo:check -- --base-url http://localhost:3000 --report /tmp/shinex-seo-pages.json
```

The smoke check also evaluates robots rules for every sitemap URL, checks rendered XML language alternatives, absolute internal links, same-language incoming links, attribution parameters and consistent organization schema. Its robots helper covers the user-agent groups and Allow/Disallow prefix, wildcard and end-anchor rules used by this project; it is not a general-purpose search crawler.

### SEO invariants

- Every production sitemap URL returns HTML 200 without redirects or blocking meta/HTTP robots directives, is allowed by robots.txt, and has server-rendered primary content.
- It has one nonempty title, description and H1, a self-canonical on `https://www.shinex.am`, and an OpenGraph URL matching that canonical.
- Locale, equivalent reciprocal hreflang targets and sitemap alternatives agree. Every alternate is another verified canonical 200 page.
- Crawlable internal links use the final canonical path and intended language. Every indexed page has an incoming link from another page of the same language; translation links alone do not count.
- Retired URLs are excluded from sitemap and redirect permanently to a verified page in the same locale. Query parameters survive the redirect; attribution URLs canonicalize to the clean page.
- Missing and unpublished pages return real 404s with noindex. Technical/private content stays outside sitemap. Preview noindex never reaches a production build.
- Organization identity and contact data agree across pages; JSON-LD is parseable and does not invent ratings. New metadata or routing changes must pass the production HTTP check before release.

The HTTP check covers all 72 sitemap URLs, metadata and indexing headers, reciprocal language links, structured data, internal links, duplicate HTML IDs, 15 permanent redirects with and without trailing slashes, locale slash normalization, missing-page responses and the share image. Redirects for consolidated landing pages live in `config/seo-redirects.config.ts`; keep them when publishing future updates. Portfolio content is not published.

### Production and preview indexing

`lib/seo-environment.ts` keeps normal production builds indexable. Development and Vercel preview deployments receive `noindex, follow` metadata and an `X-Robots-Tag` header. For other staging hosts, set `SITE_NOINDEX=true` in both the build and runtime environment. Keep this flag unset (or `false`) in production. Rebuild after changing it because page metadata is generated statically. Do not promote a preview build directly to production; build with production environment settings.

Preview robots.txt remains crawlable so crawlers can read the noindex instruction. Its sitemap and canonical references continue to use the public production domain. Indexing controls do not replace access control for private staging content.

The proxy combines domain, trailing slash and retired-page redirects. `skipTrailingSlashRedirect` disables the separate framework redirect. Hosting-level HTTP/HTTPS and apex/www redirects run before the proxy; configure those in Vercel if a shorter public redirect chain is needed.

### Google Search Console verification

Prefer a Domain property for `shinex.am` verified through the owner's DNS settings. For a URL-prefix property, optionally set `GOOGLE_SITE_VERIFICATION` to the verification token (not the complete HTML tag) before building. The locale layout emits the Google verification meta tag. Existing DNS verification is independent of this setting.

Submit `https://www.shinex.am/sitemap.xml` and use URL Inspection on the Armenian home, apartment renovation, new-build renovation, prices and construction pages after deploying. The code and HTTP checks establish technical eligibility; actual Google indexing, selected canonicals, traffic and Core Web Vitals require Search Console data.

Renovation enquiries lead to contact methods; there is no automatic renovation estimate. Calculator checks enforce this and verify construction and design amounts across all three languages. Rates and coefficients for these calculations remain in `config/construction-calculator.config.ts`; the tests do not verify current market prices. The renovation budget guide explains quantities and estimate structure, with a contact action for discussing the project.

The owner-confirmed renovation starting rate is stored in `config/pricing.config.ts`. `lib/pricing.ts` formats it for the visible price-page introduction and search descriptions in all three languages. Keep the starting rate distinct from a final quotation; do not use it to generate automatic renovation estimates. Other service prices remain unpublished.

The site uses a system font stack without external font downloads.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
