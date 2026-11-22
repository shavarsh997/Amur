import { execFile } from "node:child_process";
import { readFile } from "node:fs/promises";
import { homedir } from "node:os";
import { join } from "node:path";
import { loadConfig } from "./config.ts";
import { fetchJson, withRetry } from "./retry.ts";

export const TOKEN_URL = "https://oauth2.googleapis.com/token";
const KEYCHAIN_SERVICE = "shinex-marketing";
const EXPIRY_MARGIN_MS = 60_000;

export class AuthRequiredError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "AuthRequiredError";
  }
}

type Adc = {
  type?: string;
  client_id?: string;
  client_secret?: string;
  refresh_token?: string;
  quota_project_id?: string;
};

/** ADC file path: $SHINEX_MA_ADC_PATH or ~/.config/gcloud/application_default_credentials.json. */
export function adcPath(): string {
  const fromEnv = process.env.SHINEX_MA_ADC_PATH;
  if (fromEnv && fromEnv.trim() !== "") return fromEnv;
  return join(homedir(), ".config", "gcloud", "application_default_credentials.json");
}

const LOGIN_HINT = "run `gcloud auth application-default login`";

async function readAdc(): Promise<Adc | null> {
  let text: string;
  try {
    text = await readFile(adcPath(), "utf8");
  } catch (err) {
    if ((err as NodeJS.ErrnoException).code === "ENOENT") return null;
    throw err;
  }
  try {
    return JSON.parse(text) as Adc;
  } catch {
    throw new AuthRequiredError(`ADC file is not valid JSON (${adcPath()}); ${LOGIN_HINT}`);
  }
}

let cached: { token: string; expiresAt: number } | null = null;

/** Test helper: drop the in-memory token cache. */
export function resetTokenCache(): void {
  cached = null;
}

/** Exchanges ADC authorized_user refresh token for an access token; cached until shortly before expiry. */
export async function getAccessToken(): Promise<string> {
  if (cached && Date.now() < cached.expiresAt - EXPIRY_MARGIN_MS) return cached.token;
  const adc = await readAdc();
  if (!adc) throw new AuthRequiredError(`Google ADC not found at ${adcPath()}; ${LOGIN_HINT}`);
  if (adc.type !== "authorized_user" || !adc.refresh_token || !adc.client_id || !adc.client_secret) {
    throw new AuthRequiredError(`ADC must be type authorized_user with refresh_token/client_id/client_secret; ${LOGIN_HINT}`);
  }
  const body = new URLSearchParams({
    grant_type: "refresh_token",
    refresh_token: adc.refresh_token,
    client_id: adc.client_id,
    client_secret: adc.client_secret,
  });
  const res = await withRetry(() =>
    fetchJson<{ access_token?: string; expires_in?: number }>(TOKEN_URL, {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      body,
    }),
  ).catch((err: unknown) => {
    const status = (err as { status?: unknown }).status;
    if (status === 400 || status === 401) {
      throw new AuthRequiredError(`ADC refresh token rejected (HTTP ${status}); ${LOGIN_HINT}`);
    }
    throw err;
  });
  if (!res?.access_token) throw new AuthRequiredError(`token endpoint returned no access_token; ${LOGIN_HINT}`);
  cached = { token: res.access_token, expiresAt: Date.now() + (res.expires_in ?? 3600) * 1000 };
  return cached.token;
}

/** macOS Keychain generic password (service shinex-marketing, account name) or null. */
export function keychainSecret(name: string): Promise<string | null> {
  if (process.platform !== "darwin") return Promise.resolve(null);
  return new Promise((resolve) => {
    execFile(
      "security",
      ["find-generic-password", "-s", KEYCHAIN_SERVICE, "-a", name, "-w"],
      { timeout: 10_000 },
      (err, stdout) => {
        const value = err ? "" : String(stdout).trim();
        resolve(value === "" ? null : value);
      },
    );
  });
}

/** Quota project: ADC quota_project_id, else config.gcpProject, else null. */
export async function quotaProject(): Promise<string | null> {
  let adc: Adc | null = null;
  try {
    adc = await readAdc();
  } catch {
    adc = null;
  }
  if (adc?.quota_project_id) return adc.quota_project_id;
  return (await loadConfig()).gcpProject ?? null;
}
