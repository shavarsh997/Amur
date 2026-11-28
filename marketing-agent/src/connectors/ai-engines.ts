import { HttpError, withRetry, type RetryOptions } from "../core/retry.ts";
import type { AiApiEngine, AiCitation } from "../analysis/ai-visibility.ts";
import { USER_AGENT, jsonVia, type FetchFn } from "./http.ts";

/**
 * AI answer engines with web search: OpenAI Responses API (web_search tool), Perplexity Sonar,
 * Gemini generateContent (google_search grounding). Keys come from the Keychain only and are never logged.
 */

export const AI_KEY_NAMES: Record<AiApiEngine, string> = {
  openai: "openai-api-key",
  perplexity: "perplexity-api-key",
  gemini: "gemini-api-key",
};

export const AI_DEFAULT_MODELS: Record<AiApiEngine, string> = {
  openai: "gpt-5-mini",
  perplexity: "sonar",
  gemini: "gemini-2.5-flash",
};

export const OPENAI_BASE = "https://api.openai.com/v1";
export const PERPLEXITY_BASE = "https://api.perplexity.ai";
export const GEMINI_BASE = "https://generativelanguage.googleapis.com/v1beta";

export type AiEngineDeps = {
  apiKey: string;
  model?: string;
  fetch?: FetchFn;
  retry?: RetryOptions;
  timeoutMs?: number;
};

export type AiAnswer = { engine: AiApiEngine; model: string; text: string; citations: AiCitation[] };

const MODEL_RE = /^[a-z0-9][a-z0-9._-]*$/i;

function modelOf(engine: AiApiEngine, deps: AiEngineDeps): string {
  const model = deps.model ?? AI_DEFAULT_MODELS[engine];
  if (!MODEL_RE.test(model)) throw new Error(`invalid ${engine} model: ${model}`);
  return model;
}

/**
 * JSON call. Paid answer requests (POST) are never retried: a timeout or 5xx may still have been billed,
 * and a failed prompt is simply re-asked by the next run. Free GET probes keep the usual retry.
 */
async function aiJson<T>(url: string, init: { method?: "GET" | "POST"; headers: Record<string, string>; body?: unknown }, deps: AiEngineDeps): Promise<T> {
  const headers: Record<string, string> = { accept: "application/json", "user-agent": USER_AGENT, ...init.headers };
  if (init.body !== undefined) headers["content-type"] = "application/json";
  const method = init.method ?? (init.body !== undefined ? "POST" : "GET");
  const req: RequestInit = { method, headers, body: init.body !== undefined ? JSON.stringify(init.body) : undefined };
  const call = (): Promise<T> => jsonVia<T>(deps.fetch, url, { ...req, signal: AbortSignal.timeout(deps.timeoutMs ?? 180_000) });
  return method === "POST" ? call() : withRetry(call, deps.retry);
}

const bearer = (key: string): Record<string, string> => ({ authorization: `Bearer ${key}` });

const dedupe = (list: AiCitation[]): AiCitation[] => {
  const seen = new Set<string>();
  return list.filter((c) => c.url && !seen.has(c.url) && (seen.add(c.url), true));
};

// ---------- OpenAI Responses API ----------

type OpenAiRaw = {
  model?: string;
  output_text?: string;
  output?: Array<{
    type?: string;
    content?: Array<{ type?: string; text?: string; annotations?: Array<{ type?: string; url?: string; title?: string }> }>;
  }>;
};

export function parseOpenAI(raw: OpenAiRaw | null, model: string): AiAnswer {
  const texts: string[] = [];
  const citations: AiCitation[] = [];
  for (const item of raw?.output ?? []) {
    if (item.type !== "message") continue;
    for (const c of item.content ?? []) {
      if (c.type !== "output_text" || typeof c.text !== "string") continue;
      texts.push(c.text);
      for (const a of c.annotations ?? []) {
        if (a.type === "url_citation" && a.url) citations.push({ url: a.url, title: a.title });
      }
    }
  }
  const text = texts.length ? texts.join("\n\n") : (raw?.output_text ?? "");
  return { engine: "openai", model: raw?.model ?? model, text, citations: dedupe(citations) };
}

export async function askOpenAI(prompt: string, deps: AiEngineDeps): Promise<AiAnswer> {
  const model = modelOf("openai", deps);
  const body = {
    model,
    input: prompt,
    tools: [{ type: "web_search", user_location: { type: "approximate", country: "AM", city: "Yerevan", timezone: "Asia/Yerevan" } }],
    store: false,
  };
  const raw = await aiJson<OpenAiRaw | null>(`${OPENAI_BASE}/responses`, { headers: bearer(deps.apiKey), body }, deps);
  return parseOpenAI(raw, model);
}

// ---------- Perplexity Sonar ----------

type PerplexityRaw = {
  model?: string;
  choices?: Array<{ message?: { content?: string } }>;
  citations?: string[];
  search_results?: Array<{ url?: string; title?: string }>;
};

export function parsePerplexity(raw: PerplexityRaw | null, model: string): AiAnswer {
  const text = raw?.choices?.[0]?.message?.content ?? "";
  const citations: AiCitation[] = [
    ...(raw?.search_results ?? []).filter((r) => r.url).map((r) => ({ url: r.url!, title: r.title })),
    ...(raw?.citations ?? []).map((url) => ({ url })),
  ];
  return { engine: "perplexity", model: raw?.model ?? model, text, citations: dedupe(citations) };
}

export async function askPerplexity(prompt: string, deps: AiEngineDeps): Promise<AiAnswer> {
  const model = modelOf("perplexity", deps);
  const body = {
    model,
    messages: [{ role: "user", content: prompt }],
    web_search_options: { user_location: { country: "AM" } },
  };
  const raw = await aiJson<PerplexityRaw | null>(`${PERPLEXITY_BASE}/chat/completions`, { headers: bearer(deps.apiKey), body }, deps);
  return parsePerplexity(raw, model);
}

// ---------- Gemini (google_search grounding) ----------

type GeminiRaw = {
  modelVersion?: string;
  candidates?: Array<{
    content?: { parts?: Array<{ text?: string }> };
    groundingMetadata?: { groundingChunks?: Array<{ web?: { uri?: string; title?: string } }> };
  }>;
};

export function parseGemini(raw: GeminiRaw | null, model: string): AiAnswer {
  const cand = raw?.candidates?.[0];
  const text = (cand?.content?.parts ?? []).map((p) => p.text ?? "").join("");
  const citations = (cand?.groundingMetadata?.groundingChunks ?? [])
    .filter((c) => c.web?.uri)
    .map((c) => ({ url: c.web!.uri!, title: c.web!.title }));
  return { engine: "gemini", model: raw?.modelVersion ?? model, text, citations: dedupe(citations) };
}

export async function askGemini(prompt: string, deps: AiEngineDeps): Promise<AiAnswer> {
  const model = modelOf("gemini", deps);
  const body = { contents: [{ role: "user", parts: [{ text: prompt }] }], tools: [{ google_search: {} }] };
  const raw = await aiJson<GeminiRaw | null>(
    `${GEMINI_BASE}/models/${model}:generateContent`,
    { headers: { "x-goog-api-key": deps.apiKey }, body },
    deps,
  );
  return parseGemini(raw, model);
}

export function askEngine(engine: AiApiEngine, prompt: string, deps: AiEngineDeps): Promise<AiAnswer> {
  if (engine === "openai") return askOpenAI(prompt, deps);
  if (engine === "perplexity") return askPerplexity(prompt, deps);
  return askGemini(prompt, deps);
}

/**
 * Health check without paid requests. OpenAI and Gemini: free model lookup that proves the key works.
 * Perplexity has no free endpoint, so only the presence of the key is reported (no network call).
 */
export async function probeEngine(engine: AiApiEngine, deps: AiEngineDeps): Promise<string> {
  const model = modelOf(engine, deps);
  if (engine === "openai") {
    const r = await aiJson<{ id?: string } | null>(`${OPENAI_BASE}/models/${model}`, { method: "GET", headers: bearer(deps.apiKey) }, deps);
    return `ключ принят; модель ${r?.id ?? model} доступна (web_search)`;
  }
  if (engine === "gemini") {
    const r = await aiJson<{ name?: string } | null>(`${GEMINI_BASE}/models/${model}`, { method: "GET", headers: { "x-goog-api-key": deps.apiKey } }, deps);
    return `ключ принят; модель ${(r?.name ?? model).replace(/^models\//, "")} доступна (google_search)`;
  }
  return `ключ есть, не проверялся запросом (у Perplexity нет бесплатной проверки; модель ${model})`;
}

const BAD_KEY_RE = /API key not valid|invalid[_ ]api[_ ]key|Incorrect API key|API_KEY_INVALID|invalid.{0,20}(?:api )?key|unauthori[sz]ed/i;

/** True when an HTTP error means the key itself was rejected (Gemini returns 400 for that). */
export function isRejectedKey(err: unknown): boolean {
  return err instanceof HttpError && (err.status === 401 || ((err.status === 400 || err.status === 403) && BAD_KEY_RE.test(err.body)));
}
