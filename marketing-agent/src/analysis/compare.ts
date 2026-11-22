import type { MetricDelta, MetricValues } from "./types.ts";

const round = (n: number, digits = 2): number => {
  const f = 10 ** digits;
  return Math.round(n * f) / f;
};

/** Per-metric change for every metric in `current`. Missing previous → nulls; previous 0 → changePct null. */
export function deltas(current: MetricValues, previous: MetricValues | null | undefined): MetricDelta[] {
  return Object.entries(current).map(([metric, cur]) => {
    const prev = previous?.[metric];
    if (prev === undefined || !Number.isFinite(prev)) {
      return { metric, current: cur, previous: null, change: null, changePct: null };
    }
    const change = round(cur - prev, 6);
    const changePct = prev === 0 ? null : round((change / Math.abs(prev)) * 100);
    return { metric, current: cur, previous: prev, change, changePct };
  });
}
