import type { WastedItem } from "./ads.ts";
import type { CannibalItem, LowCtrItem, StrikingItem } from "./seo.ts";
import type { SiteIssue, SiteIssueType } from "./site.ts";
import type { Finding, RankedFinding } from "./types.ts";

const clamp = (n: number, lo: number, hi: number): number => Math.min(hi, Math.max(lo, n));

/** score = impact × confidence / effort. Returns the top `limit` findings, highest score first. */
export function rankOpportunities(findings: Finding[], limit = 5): RankedFinding[] {
  return findings
    .map((f) => {
      const impact = clamp(f.impact, 0, 10);
      const confidence = clamp(f.confidence, 0, 1);
      const effort = clamp(f.effort, 1, 10);
      return { ...f, score: Math.round(((impact * confidence) / effort) * 1000) / 1000 };
    })
    .sort((a, b) => b.score - a.score || b.impact - a.impact || a.id.localeCompare(b.id))
    .slice(0, limit);
}

/** Maps a count (clicks, currency) to impact 1..10 on a log scale: 1→~1, 10→~3, 100→~6, 1000→~9. */
export function impactFromVolume(n: number): number {
  return clamp(Math.round(Math.log10(Math.max(0, n) + 1) * 3), 1, 10);
}

export function findingsFromLowCtr(items: LowCtrItem[]): Finding[] {
  return items.map((i) => ({
    id: `seo:low-ctr:${i.query}`,
    area: "seo",
    title: `Низкий CTR: «${i.query}»`,
    detail: `CTR ${(i.ctr * 100).toFixed(1)}% при позиции ${i.position.toFixed(1)} (ожидается ~${(i.expectedCtr * 100).toFixed(1)}%), ${i.impressions} показов${i.page ? `, ${i.page}` : ""}; недобор ~${i.missedClicks} кликов.`,
    impact: impactFromVolume(i.missedClicks),
    confidence: 0.6,
    effort: 2,
  }));
}

export function findingsFromStrikingDistance(items: StrikingItem[]): Finding[] {
  return items.map((i) => ({
    id: `seo:striking:${i.query}`,
    area: "seo",
    title: `Близко к топу: «${i.query}»`,
    detail: `Позиция ${i.position.toFixed(1)}, ${i.impressions} показов${i.page ? `, ${i.page}` : ""}; при выходе в топ-3 ~+${i.potentialClicks} кликов.`,
    impact: impactFromVolume(i.potentialClicks),
    confidence: 0.4,
    effort: 4,
  }));
}

export function findingsFromCannibalization(items: CannibalItem[]): Finding[] {
  return items.map((i) => ({
    id: `seo:cannibal:${i.query}`,
    area: "seo",
    title: `Каннибализация: «${i.query}»`,
    detail: `${i.pages.length} страниц делят ${i.totalImpressions} показов: ${i.pages.map((p) => p.page).join(", ")}.`,
    impact: impactFromVolume(i.totalImpressions / 10),
    confidence: 0.5,
    effort: 3,
  }));
}

export function findingsFromWastedSpend(items: WastedItem[]): Finding[] {
  return items.map((i) => ({
    id: `ads:wasted:${i.term}`,
    area: "ads",
    title: `Расход без конверсий: «${i.term}»`,
    detail: `${i.cost} за ${i.clicks} кликов, 0 конверсий (${i.reasons.join(", ")}).`,
    impact: impactFromVolume(i.cost / 100),
    confidence: i.reasons.length > 1 ? 0.8 : 0.5,
    effort: 1,
  }));
}

const SITE_WEIGHTS: Record<SiteIssueType, { impact: number; confidence: number; effort: number }> = {
  "non-200": { impact: 6, confidence: 0.9, effort: 2 },
  "noindex-in-sitemap": { impact: 5, confidence: 0.9, effort: 1 },
  "canonical-mismatch": { impact: 5, confidence: 0.7, effort: 2 },
  "missing-canonical": { impact: 3, confidence: 0.6, effort: 1 },
  "hreflang-not-reciprocal": { impact: 4, confidence: 0.7, effort: 2 },
  "duplicate-title": { impact: 3, confidence: 0.6, effort: 2 },
  "missing-title": { impact: 4, confidence: 0.8, effort: 1 },
  "missing-description": { impact: 2, confidence: 0.5, effort: 1 },
  "h1-count": { impact: 2, confidence: 0.5, effort: 1 },
  "jsonld-invalid": { impact: 2, confidence: 0.7, effort: 1 },
};

export function findingsFromSiteIssues(issues: SiteIssue[]): Finding[] {
  return issues.map((i) => ({
    id: `site:${i.type}:${i.url}`,
    area: "site",
    title: `${i.type}: ${i.url}`,
    detail: i.detail,
    ...SITE_WEIGHTS[i.type],
  }));
}
