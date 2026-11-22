import { CONFIG_DEFAULTS, loadConfig, saveConfig, type AgentConfig } from "../core/config.ts";
import { log } from "../core/log.ts";
import { accountSummaries, listProperties } from "../connectors/ga4.ts";
import { listSites } from "../connectors/gsc.ts";
import { DEVELOPER_TOKEN_KEY } from "../connectors/ads.ts";
import { connectorDeps, print, secret, statusOf, tokenOnce, type JobDeps } from "./context.ts";
import { listAccessibleCustomers, matchingSites } from "./health.ts";

type Field = "ga4PropertyId" | "gscSiteUrl" | "adsCustomerId";

/** Finds GA4 property, GSC site and Ads customer visible to the account; saves each one only when unambiguous. */
export async function runDiscover(deps: JobDeps, opts: { force?: boolean } = {}): Promise<number> {
  const cfg = await loadConfig();
  const token = tokenOnce(deps);
  const patch: Partial<AgentConfig> = {};
  const lines: string[] = [];

  const decide = (field: Field, candidates: Array<{ id: string; label: string }>): void => {
    const current = cfg[field];
    const list = candidates.map((c) => `${c.id}${c.label ? ` (${c.label})` : ""}`).join(", ") || "нет";
    if (current && !opts.force) {
      lines.push(`${field}: уже задан ${current}; найдено: ${list}`);
    } else if (candidates.length === 1) {
      patch[field] = candidates[0]!.id;
      lines.push(`${field}: сохранён ${candidates[0]!.id}`);
    } else {
      lines.push(`${field}: ${candidates.length === 0 ? "ничего не найдено" : `неоднозначно, задайте вручную в config.json: ${list}`}`);
    }
  };

  try {
    const cd = connectorDeps(deps, await token());
    const props = listProperties(await accountSummaries(cd));
    decide("ga4PropertyId", props.map((p) => ({ id: p.propertyId, label: [p.accountName, p.displayName].filter(Boolean).join(" / ") })));
  } catch (err) {
    const s = statusOf("ga4", err);
    lines.push(`ga4PropertyId: ${s.status} — ${s.detail}`);
  }

  try {
    const cd = connectorDeps(deps, await token());
    const sites = matchingSites(await listSites(cd), cfg.siteUrl ?? CONFIG_DEFAULTS.siteUrl);
    const domain = sites.filter((s) => s.siteUrl.startsWith("sc-domain:"));
    // A domain property covers all URL-prefix properties of the host, so it wins when it is the only one.
    const chosen = sites.length > 1 && domain.length === 1 ? domain : sites;
    decide("gscSiteUrl", chosen.map((s) => ({ id: s.siteUrl, label: s.permissionLevel })));
  } catch (err) {
    const s = statusOf("gsc", err);
    lines.push(`gscSiteUrl: ${s.status} — ${s.detail}`);
  }

  try {
    const tok = await token();
    // Developer token is optional (GCP project Explorer access).
    const developerToken = await secret(deps, DEVELOPER_TOKEN_KEY);
    const ids = await listAccessibleCustomers(cfg, deps, tok, developerToken);
    decide("adsCustomerId", ids.map((id) => ({ id, label: "" })));
  } catch (err) {
    const s = statusOf("google-ads", err);
    lines.push(`adsCustomerId: ${s.status} — ${s.detail}`);
  }

  if (Object.keys(patch).length) {
    await saveConfig(patch);
    await log("info", "discover.saved", { fields: Object.keys(patch) });
  }
  print(deps, lines.join("\n"));
  return 0;
}
