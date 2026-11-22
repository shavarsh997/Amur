import { rankOpportunities } from "../analysis/opportunities.ts";
import type {
  Finding,
  IntegrationStatus,
  MetricDelta,
  ProposedChange,
  RankedFinding,
} from "../analysis/types.ts";

export type ReportInput = {
  title: string;
  date: string;
  /** e.g. "2026-11-15 — 2026-11-21" */
  period?: string;
  integrations: IntegrationStatus[];
  metrics: MetricDelta[];
  findings: Finding[];
  /** Top opportunities; computed from findings (top 5) when omitted. */
  opportunities?: RankedFinding[];
  proposedChanges: ProposedChange[];
};

/** Escapes table-breaking characters in a Markdown table cell. */
const cell = (v: unknown): string => String(v ?? "").replace(/\|/g, "\\|").replace(/\r?\n/g, " ");

const num = (n: number | null): string => {
  if (n === null) return "—";
  if (Number.isInteger(n)) return String(n);
  return String(Number(n.toFixed(Math.abs(n) < 1 ? 4 : 2)));
};

const signed = (n: number | null, suffix = ""): string => (n === null ? "—" : `${n > 0 ? "+" : ""}${num(n)}${suffix}`);

function table(header: string[], rows: unknown[][]): string[] {
  return [
    `| ${header.map(cell).join(" | ")} |`,
    `| ${header.map(() => "---").join(" | ")} |`,
    ...rows.map((r) => `| ${r.map(cell).join(" | ")} |`),
  ];
}

const AREA_LABEL: Record<string, string> = {
  seo: "SEO",
  ads: "Google Ads",
  site: "Сайт",
  funnel: "Воронка",
  analytics: "Аналитика",
};

/** Markdown report. Ads changes appear only as proposals that require human approval. */
export function renderReport(input: ReportInput): string {
  const out: string[] = [`# ${input.title}`, "", `Дата: ${input.date}${input.period ? ` · Период: ${input.period}` : ""}`, ""];

  out.push("## Интеграции", "");
  if (input.integrations.length === 0) out.push("Нет данных об интеграциях.");
  else out.push(...table(["Источник", "Статус", "Детали"], input.integrations.map((i) => [i.name, i.status, i.detail ?? ""])));
  out.push("");

  out.push("## Метрики и изменения", "");
  if (input.metrics.length === 0) out.push("Нет метрик за период.");
  else
    out.push(
      ...table(
        ["Метрика", "Сейчас", "Было", "Изменение", "%"],
        input.metrics.map((m) => [m.metric, num(m.current), num(m.previous), signed(m.change), signed(m.changePct, "%")]),
      ),
    );
  out.push("");

  out.push("## Находки", "");
  if (input.findings.length === 0) out.push("Существенных находок нет.");
  else {
    const byArea = new Map<string, Finding[]>();
    for (const f of input.findings) byArea.set(f.area, [...(byArea.get(f.area) ?? []), f]);
    for (const [area, list] of byArea) {
      out.push(`### ${AREA_LABEL[area] ?? area} (${list.length})`, "");
      for (const f of list) out.push(`- **${f.title}** — ${f.detail}`);
      out.push("");
    }
    out.pop();
  }
  out.push("");

  out.push("## Топ-5 возможностей", "");
  const top = (input.opportunities ?? rankOpportunities(input.findings, 5)).slice(0, 5);
  if (top.length === 0) out.push("Нет возможностей для ранжирования.");
  else
    top.forEach((o, i) => {
      out.push(`${i + 1}. **${o.title}** (score ${o.score}; влияние ${o.impact}, уверенность ${o.confidence}, усилие ${o.effort}) — ${o.detail}`);
    });
  out.push("");

  out.push("## Предлагаемые изменения (требуют подтверждения)", "");
  out.push("Агент ничего не меняет сам: изменения в Google Ads, GA4, GSC и на сайте применяются только после подтверждения человеком.", "");
  if (input.proposedChanges.length === 0) out.push("Предложений нет.");
  else
    input.proposedChanges.forEach((c, i) => {
      out.push(`${i + 1}. [ ] **${AREA_LABEL[c.area] ?? c.area}:** ${c.change} — ${c.rationale}`);
    });
  out.push("");

  return out.join("\n");
}
