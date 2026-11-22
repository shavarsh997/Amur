import { describe, it } from "node:test";
import assert from "node:assert/strict";

import { deltas } from "../src/analysis/compare.ts";
import { cannibalization, classifyIntent, lowCtrOpportunities, strikingDistance } from "../src/analysis/seo.ts";
import { cpa, negativeCandidates, wastedSpend } from "../src/analysis/ads.ts";
import { aggregateFunnel, FunnelValidationError, validateFunnelRecord } from "../src/analysis/funnel.ts";
import { siteIssues } from "../src/analysis/site.ts";
import { findingsFromSiteIssues, findingsFromWastedSpend, rankOpportunities } from "../src/analysis/opportunities.ts";
import { renderReport } from "../src/reports/render.ts";
import type { AdsSearchTerm, CrawlPage, Finding, FunnelRecord, GscRow } from "../src/analysis/types.ts";

const row = (keys: string[], impressions: number, clicks: number, position: number): GscRow => ({
  keys,
  impressions,
  clicks,
  ctr: impressions ? clicks / impressions : 0,
  position,
});

describe("compare.deltas", () => {
  it("computes change and percent; handles missing and zero previous", () => {
    const d = deltas({ clicks: 120, cost: 50, leads: 3 }, { clicks: 100, cost: 0 });
    assert.deepEqual(d[0], { metric: "clicks", current: 120, previous: 100, change: 20, changePct: 20 });
    assert.equal(d[1].changePct, null);
    assert.equal(d[1].change, 50);
    assert.deepEqual(d[2], { metric: "leads", current: 3, previous: null, change: null, changePct: null });
    assert.equal(deltas({ a: 1 }, null)[0].previous, null);
  });
});

describe("seo.classifyIntent", () => {
  const cases: Array<[string, string]> = [
    // hy
    ["բնակարանի վերանորոգման գներ", "transactional"],
    ["ինչ արժե բնակարանի վերանորոգումը", "transactional"],
    ["կոսմետիկ վերանորոգում", "transactional"],
    ["վերանորոգման նախահաշիվ", "transactional"],
    ["ինչպե՞ս ընտրել սալիկ", "informational"],
    // ru
    ["ремонт квартир в ереване цены", "transactional"],
    ["стоимость капитального ремонта", "transactional"],
    ["сколько стоит ремонт квартиры", "transactional"],
    ["ремонт под ключ", "transactional"],
    ["как выбрать ламинат", "informational"],
    ["ремонт своими руками", "informational"],
    // en
    ["apartment renovation price yerevan", "transactional"],
    ["renovation cost per m2", "transactional"],
    ["how to paint a wall", "informational"],
    // brand
    ["shinex", "navigational"],
    ["Շինեքս վերանորոգում", "navigational"],
    ["шинекс отзывы", "navigational"],
  ];
  for (const [q, expected] of cases) {
    it(`${q} → ${expected}`, () => assert.equal(classifyIntent(q), expected));
  }
});

describe("seo opportunities", () => {
  it("lowCtrOpportunities flags top-10 rows far below expected CTR", () => {
    const rows = [
      row(["ремонт квартир в ереване"], 1000, 10, 3.2), // 1% vs 10% expected → flagged
      row(["կոսմետիկ վերանորոգում"], 500, 40, 3), // 8% vs 10% → fine
      row(["капитальный ремонт"], 50, 0, 2), // too few impressions
      row(["ремонт офиса"], 800, 0, 15), // beyond position 10
    ];
    const res = lowCtrOpportunities(rows);
    assert.equal(res.length, 1);
    assert.equal(res[0].query, "ремонт квартир в ереване");
    assert.equal(res[0].expectedCtr, 0.1);
    assert.equal(res[0].missedClicks, 90);
  });

  it("strikingDistance keeps transactional queries at positions 4–20", () => {
    const rows = [
      row(["ремонт квартир в ереване цены"], 200, 2, 8),
      row(["բնակարանի վերանորոգում"], 100, 1, 12),
      row(["как выбрать плитку"], 500, 1, 6), // informational
      row(["ремонт под ключ"], 300, 30, 2.5), // already top-3
      row(["renovation price"], 300, 0, 25), // too far
      row(["ремонт офиса"], 5, 0, 9), // too few impressions
    ];
    const res = strikingDistance(rows);
    assert.deepEqual(res.map((r) => r.query), ["ремонт квартир в ереване цены", "բնակարանի վերանորոգում"]);
    assert.equal(res[0].potentialClicks, 18);
  });

  it("cannibalization finds queries split across ≥2 pages with meaningful impressions", () => {
    const rows = [
      row(["ремонт квартир", "/ru/services/apartment-renovation-yerevan"], 120, 5, 7),
      row(["ремонт квартир", "/ru/services/turnkey-renovation"], 80, 1, 11),
      row(["ремонт квартир", "/ru/prices"], 3, 0, 40), // insignificant
      row(["կապիտալ վերանորոգում", "/hy/services/capital-renovation-yerevan"], 300, 20, 4),
      row(["կապիտալ վերանորոգում", "/hy"], 12, 0, 30), // 12 imps but <10% share
    ];
    const res = cannibalization(rows);
    assert.equal(res.length, 1);
    assert.equal(res[0].query, "ремонт квартир");
    assert.equal(res[0].totalImpressions, 203);
    assert.deepEqual(res[0].pages.map((p) => p.page), [
      "/ru/services/apartment-renovation-yerevan",
      "/ru/services/turnkey-renovation",
    ]);
  });
});

describe("ads", () => {
  const terms: AdsSearchTerm[] = [
    { term: "ремонт квартир ереван", cost: 300, clicks: 20, conversions: 3 },
    { term: "работа ремонт квартир", cost: 120, clicks: 15, conversions: 0 },
    { term: "как покрасить стены", cost: 80, clicks: 10, conversions: 0 },
    { term: "renovation yerevan", cost: 60, clicks: 6, conversions: 0 },
    { term: "капитальный ремонт", cost: 0, clicks: 0, conversions: 0 },
  ];

  it("wastedSpend sums cost without conversions and tags reasons", () => {
    const res = wastedSpend(terms);
    assert.equal(res.total, 260);
    assert.deepEqual(res.items.map((i) => i.term), ["работа ремонт квартир", "как покрасить стены", "renovation yerevan"]);
    assert.deepEqual(res.items[0].reasons, ["no-conversions", "irrelevant"]);
    assert.deepEqual(res.items[1].reasons, ["no-conversions", "informational"]);
    assert.deepEqual(res.items[2].reasons, ["no-conversions"]);
  });

  it("negativeCandidates proposes phrase/exact negatives, never converting terms", () => {
    const res = negativeCandidates(terms);
    assert.deepEqual(
      res.map((c) => [c.keyword, c.matchType]),
      [["работа", "phrase"], ["как покрасить стены", "exact"], ["renovation yerevan", "exact"]],
    );
    assert.ok(!res.some((c) => c.sourceTerm === "ремонт квартир ереван"));
  });

  it("cpa divides cost by conversions; null without conversions", () => {
    assert.equal(cpa(terms), 186.67);
    assert.equal(cpa([{ cost: 10, conversions: 0 }]), null);
  });
});

describe("funnel", () => {
  it("rejects personal-data fields and values", () => {
    const base = { date: "2026-11-20", stage: "lead", channel: "google-ads" };
    for (const extra of [{ name: "Ani" }, { phone: "+37491000000" }, { email: "a@b.am" }, { Email: "x" }]) {
      assert.throws(() => validateFunnelRecord({ ...base, ...extra }), FunnelValidationError);
    }
    assert.throws(() => validateFunnelRecord({ ...base, reason: "call me +374 91 123 456" }), /phone/);
    assert.throws(() => validateFunnelRecord({ ...base, reason: "write to x@y.com" }), /email/);
    assert.throws(() => validateFunnelRecord({ ...base, stage: "won" }), /stage/);
    assert.deepEqual(validateFunnelRecord({ ...base, service: "capital" }), { ...base, service: "capital" });
  });

  it("aggregates stages and conversion rates, per channel", () => {
    const recs: FunnelRecord[] = [
      ...Array.from({ length: 10 }, (): FunnelRecord => ({ date: "2026-11-01", stage: "lead", channel: "ads" })),
      ...Array.from({ length: 4 }, (): FunnelRecord => ({ date: "2026-11-02", stage: "qualified", channel: "ads" })),
      { date: "2026-11-03", stage: "inspection", channel: "ads" },
      { date: "2026-11-03", stage: "lead", channel: "organic" },
      { date: "2026-10-01", stage: "contract", channel: "organic" },
    ];
    const s = aggregateFunnel(recs, { from: "2026-11-01", groupBy: "channel" });
    assert.equal(s.total, 16);
    assert.equal(s.counts.lead, 11);
    assert.equal(s.counts.contract, 0);
    const rate = (from: string): number | null => s.conversions.find((c) => c.from === from)?.rate ?? null;
    assert.equal(rate("visit"), null);
    assert.equal(rate("lead"), 0.3636);
    assert.equal(rate("qualified"), 0.25);
    assert.equal(s.groups?.ads.counts.lead, 10);
    assert.equal(s.groups?.organic.total, 1);
  });
});

describe("site.siteIssues", () => {
  const page = (p: Partial<CrawlPage> & { url: string }): CrawlPage => ({
    status: 200,
    finalUrl: p.url,
    title: `T ${p.url}`,
    description: "d",
    h1Count: 1,
    canonical: p.url,
    hreflang: [],
    robots: null,
    jsonLdOk: true,
    ...p,
  });

  it("detects non-200, canonical, duplicate title, hreflang reciprocity, noindex in sitemap", () => {
    const S = "https://www.shinex.am";
    const pages = [
      page({ url: `${S}/hy`, hreflang: [{ lang: "ru", href: `${S}/ru` }, { lang: "en", href: `${S}/en` }] }),
      page({ url: `${S}/ru`, hreflang: [{ lang: "hy", href: `${S}/hy` }] }),
      page({ url: `${S}/en`, hreflang: [], title: "Same" }),
      page({ url: `${S}/en/prices`, title: "Same", canonical: `${S}/en` }),
      page({ url: `${S}/old`, status: 404 }),
      page({ url: `${S}/hidden`, robots: "noindex, follow", canonical: null }),
    ];
    const issues = siteIssues(pages, { sitemapUrls: [`${S}/hidden/`, `${S}/hy`] });
    const has = (type: string, url: string): boolean => issues.some((i) => i.type === type && i.url === url);
    assert.ok(has("non-200", `${S}/old`));
    assert.ok(has("canonical-mismatch", `${S}/en/prices`));
    assert.ok(has("missing-canonical", `${S}/hidden`));
    assert.ok(has("duplicate-title", `${S}/en`) && has("duplicate-title", `${S}/en/prices`));
    assert.ok(has("hreflang-not-reciprocal", `${S}/hy`));
    assert.ok(!has("hreflang-not-reciprocal", `${S}/ru`));
    assert.ok(has("noindex-in-sitemap", `${S}/hidden`));
    assert.ok(!issues.some((i) => i.url === `${S}/old` && i.type !== "non-200"));
  });

  it("treats a ?query variant canonicalised to its bare path as correct; real mismatch still found", () => {
    const S = "https://www.shinex.am";
    const pages = [
      page({ url: `${S}/de/calculator`, title: "Rechner", hreflang: [{ lang: "ru", href: `${S}/ru/calculator` }] }),
      page({ url: `${S}/ru/calculator`, hreflang: [{ lang: "de", href: `${S}/de/calculator` }] }),
      page({
        url: `${S}/de/calculator?scenario=x`,
        title: "Rechner",
        canonical: `${S}/de/calculator`,
        hreflang: [{ lang: "ru", href: `${S}/ru/calculator` }],
      }),
    ];
    assert.deepEqual(siteIssues(pages), []);

    const mismatch = siteIssues([...pages, page({ url: `${S}/de/prices`, canonical: `${S}/de` })]);
    assert.deepEqual(mismatch.map((i) => [i.type, i.url]), [["canonical-mismatch", `${S}/de/prices`]]);
  });

  it("reports h1/description/JSON-LD defects once, for the base page, not for its ?query variants", () => {
    const S = "https://www.shinex.am";
    const defect = { h1Count: 2, description: "", jsonLdOk: false };
    const pages = [
      page({ url: `${S}/de/calculator`, ...defect }),
      page({ url: `${S}/de/calculator?scenario=x`, title: "V", canonical: `${S}/de/calculator`, ...defect }),
    ];
    const issues = siteIssues(pages);
    for (const type of ["h1-count", "missing-description", "jsonld-invalid"]) {
      assert.deepEqual(issues.filter((i) => i.type === type).map((i) => i.url), [`${S}/de/calculator`], type);
    }
  });
});

describe("opportunities.rankOpportunities", () => {
  it("ranks by impact × confidence / effort and limits to N", () => {
    const f = (id: string, impact: number, confidence: number, effort: number): Finding => ({
      id, area: "seo", title: id, detail: "", impact, confidence, effort,
    });
    const ranked = rankOpportunities(
      [f("a", 8, 0.5, 4), f("b", 6, 0.9, 1), f("c", 10, 0.9, 9), f("d", 3, 1, 1), f("e", 2, 0.1, 5), f("g", 9, 0.8, 2)],
      3,
    );
    assert.deepEqual(ranked.map((r) => r.id), ["b", "g", "d"]);
    assert.equal(ranked[0].score, 5.4);
  });

  it("converts analysis output to findings", () => {
    const fromAds = findingsFromWastedSpend(wastedSpend([{ term: "free renovation", cost: 500, clicks: 9, conversions: 0 }]).items);
    assert.equal(fromAds[0].area, "ads");
    const fromSite = findingsFromSiteIssues([{ type: "non-200", url: "https://x/a", detail: "HTTP 404" }]);
    assert.equal(fromSite[0].impact, 6);
  });
});

describe("reports.renderReport", () => {
  it("contains every section and marks proposals as requiring approval", () => {
    const findings: Finding[] = [
      { id: "s1", area: "seo", title: "Низкий CTR | цены", detail: "d1", impact: 6, confidence: 0.6, effort: 2 },
      { id: "a1", area: "ads", title: "Расход без конверсий", detail: "d2", impact: 5, confidence: 0.8, effort: 1 },
    ];
    const md = renderReport({
      title: "SHINEX weekly",
      date: "2026-11-22",
      period: "2026-11-15 — 2026-11-21",
      integrations: [
        { name: "GSC", status: "WORKING" },
        { name: "Google Ads", status: "AUTH REQUIRED", detail: "no developer token" },
      ],
      metrics: deltas({ clicks: 120 }, { clicks: 100 }),
      findings,
      proposedChanges: [{ area: "ads", change: "Добавить минус-слово «работа» (фраза)", rationale: "120 без конверсий" }],
    });
    for (const h of [
      "## Интеграции",
      "## Метрики и изменения",
      "## Находки",
      "## Топ-5 возможностей",
      "## Предлагаемые изменения (требуют подтверждения)",
    ]) {
      assert.ok(md.includes(h), `missing section ${h}`);
    }
    assert.ok(md.includes("AUTH REQUIRED"));
    assert.ok(md.includes("+20%"));
    assert.ok(md.includes("Низкий CTR \\| цены") || md.includes("Низкий CTR | цены"));
    assert.match(md, /1\. \*\*Расход без конверсий\*\*/); // score 4 > 1.8
    assert.match(md, /\[ \] \*\*Google Ads:\*\* Добавить минус-слово/);
  });

  it("renders empty states", () => {
    const md = renderReport({ title: "t", date: "2026-11-22", integrations: [], metrics: [], findings: [], proposedChanges: [] });
    assert.ok(md.includes("## Топ-5 возможностей"));
    assert.ok(md.includes("Предложений нет."));
  });
});
