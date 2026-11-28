import { readFile, rename, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { dataDir, ensureDir } from "./paths.ts";

/** Non-secret identifiers only. Every field is optional. */
export type AgentConfig = {
  ga4PropertyId?: string;
  gscSiteUrl?: string;
  adsCustomerId?: string;
  adsLoginCustomerId?: string;
  adsApiVersion?: string;
  siteUrl?: string;
  gcpProject?: string;
  /** GA4 property is shared by several sites: every runReport is filtered to these hostName values. */
  ga4HostNames?: readonly string[];
  /** Model overrides for `ai-visibility run` (defaults in connectors/ai-engines.ts). */
  aiModels?: { openai?: string; perplexity?: string; gemini?: string };
};

export const CONFIG_DEFAULTS = {
  siteUrl: "https://www.shinex.am",
  adsApiVersion: "v23",
  ga4HostNames: ["www.shinex.am", "shinex.am"],
} as const satisfies AgentConfig;

export function configPath(): string {
  return join(dataDir(), "config.json");
}

async function readRaw(): Promise<AgentConfig> {
  let text: string;
  try {
    text = await readFile(configPath(), "utf8");
  } catch (err) {
    if ((err as NodeJS.ErrnoException).code === "ENOENT") return {};
    throw err;
  }
  const parsed: unknown = JSON.parse(text);
  if (parsed === null || typeof parsed !== "object" || Array.isArray(parsed)) {
    throw new Error(`config.json must contain a JSON object: ${configPath()}`);
  }
  return parsed as AgentConfig;
}

/** Missing file → {} plus defaults. */
export async function loadConfig(): Promise<AgentConfig> {
  const raw = await readRaw();
  return { ...CONFIG_DEFAULTS, ...raw };
}

/** Merges patch into the stored file (defaults are not persisted); returns the effective config. */
export async function saveConfig(patch: Partial<AgentConfig>): Promise<AgentConfig> {
  const merged: AgentConfig = { ...(await readRaw()), ...patch };
  await ensureDir(dataDir());
  const target = configPath();
  const tmp = `${target}.${process.pid}.tmp`;
  await writeFile(tmp, JSON.stringify(merged, null, 2) + "\n", "utf8");
  await rename(tmp, target);
  return { ...CONFIG_DEFAULTS, ...merged };
}
