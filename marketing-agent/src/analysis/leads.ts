/** Lead funnel from GA4 events (pure functions; GA4 requests live in jobs/collect.ts). */

/** Funnel steps in display order. Only generate_lead is a lead; whatsapp/phone clicks are micro-conversions. */
export const LEAD_EVENTS = ["form_start", "form_submit", "generate_lead", "whatsapp_click", "phone_click"] as const;

/** sessionSource substrings of AI assistants (case-insensitive). */
export const AI_SOURCES = ["chatgpt", "perplexity", "gemini", "copilot", "claude"] as const;
/** sessionMedium values (exact, case-insensitive) used for AI assistant traffic. */
export const AI_MEDIUMS = ["ai", "ai-assistant"] as const;

export function isAiTraffic(source: unknown, medium: unknown): boolean {
  const s = String(source ?? "").toLowerCase();
  const m = String(medium ?? "").trim().toLowerCase();
  return AI_SOURCES.some((x) => s.includes(x)) || (AI_MEDIUMS as readonly string[]).includes(m);
}

/** GA4 dimensionFilter matching AI assistant sessions (same rule as isAiTraffic). */
export function aiTrafficFilter(): Record<string, unknown> {
  return {
    orGroup: {
      expressions: [
        ...AI_SOURCES.map((value) => ({
          filter: { fieldName: "sessionSource", stringFilter: { matchType: "CONTAINS", value, caseSensitive: false } },
        })),
        { filter: { fieldName: "sessionMedium", inListFilter: { values: [...AI_MEDIUMS], caseSensitive: false } } },
      ],
    },
  };
}

type Row = Record<string, string | number>;

const num = (v: unknown): number => {
  const n = Number(v ?? 0);
  return Number.isFinite(n) ? n : 0;
};

const inRange = (r: Row, range: string): boolean => (r.dateRange ?? "current") === range;

export const FUNNEL_RATE_METRIC = "GA4 form_start→generate_lead %";
export const AI_SESSIONS_METRIC = "GA4 AI sessions";
export const AI_LEADS_METRIC = "GA4 AI generate_lead";

/**
 * Funnel values for one date range.
 * eventRows: eventName [+ sessionSource, sessionMedium] × eventCount (already limited to LEAD_EVENTS).
 * aiSessionRows: sessionSource × sessionMedium × sessions; non-AI rows are ignored.
 */
export function leadFunnelValues(eventRows: Row[], aiSessionRows: Row[], range: string): Record<string, number> {
  const count = (event: string, onlyAi = false): number =>
    eventRows
      .filter((r) => inRange(r, range) && r.eventName === event && (!onlyAi || isAiTraffic(r.sessionSource, r.sessionMedium)))
      .reduce((s, r) => s + num(r.eventCount), 0);
  const out: Record<string, number> = {};
  for (const e of LEAD_EVENTS) out[`GA4 ${e}`] = count(e);
  const starts = out["GA4 form_start"] ?? 0;
  out[FUNNEL_RATE_METRIC] = starts > 0 ? Math.round(((out["GA4 generate_lead"] ?? 0) / starts) * 10000) / 100 : 0;
  out[AI_SESSIONS_METRIC] = aiSessionRows
    .filter((r) => inRange(r, range) && isAiTraffic(r.sessionSource, r.sessionMedium))
    .reduce((s, r) => s + num(r.sessions), 0);
  out[AI_LEADS_METRIC] = count("generate_lead", true);
  return out;
}

export type AiSourceRow = { source: string; medium: string; sessions: number; prevSessions: number; leads: number; prevLeads: number };

/** AI traffic per source/medium, sorted by current sessions. */
export function aiSources(eventRows: Row[], aiSessionRows: Row[]): AiSourceRow[] {
  const map = new Map<string, AiSourceRow>();
  const get = (r: Row): AiSourceRow => {
    const source = String(r.sessionSource ?? "(not set)");
    const medium = String(r.sessionMedium ?? "(not set)");
    const key = `${source}\u0000${medium}`;
    const e = map.get(key) ?? { source, medium, sessions: 0, prevSessions: 0, leads: 0, prevLeads: 0 };
    map.set(key, e);
    return e;
  };
  for (const r of aiSessionRows) {
    if (!isAiTraffic(r.sessionSource, r.sessionMedium)) continue;
    const e = get(r);
    if (inRange(r, "previous")) e.prevSessions += num(r.sessions);
    else e.sessions += num(r.sessions);
  }
  for (const r of eventRows) {
    if (r.eventName !== "generate_lead" || !isAiTraffic(r.sessionSource, r.sessionMedium)) continue;
    const e = get(r);
    if (inRange(r, "previous")) e.prevLeads += num(r.eventCount);
    else e.leads += num(r.eventCount);
  }
  return [...map.values()].sort((a, b) => b.sessions - a.sessions || b.leads - a.leads);
}
