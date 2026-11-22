import "server-only";

import type { Dictionary } from "@/types";

export type LeadInput = {
  /** Optional qualification fields: empty string / null when not provided. */
  objectType: string;
  area: number | null;
  region: string;
  workType: string;
  options: string[];
  name: string;
  phone: string;
  comment: string;
  source?: string;
};

type TelegramResponse = {
  ok: boolean;
  description?: string;
};

function getRequiredEnv(
  name: "TELEGRAM_BOT_TOKEN" | "TELEGRAM_CHAT_ID"
): string {
  const value = process.env[name]?.trim();

  if (!value) {
    throw new Error(`${name} is not configured.`);
  }

  return value;
}

const EMPTY_VALUE = "—";

function orEmpty(value: string): string {
  return value.trim() ? value : EMPTY_VALUE;
}

function formatLeadMessage(
  lead: LeadInput,
  labels: Dictionary["leadNotification"]
): string {
  const lines = [
    labels.title,
    ...(lead.source ? [lead.source] : []),
    "",
    `${labels.name}: ${lead.name}`,
    `${labels.phone}: ${lead.phone}`,
    `${labels.objectType}: ${orEmpty(lead.objectType)}`,
    `${labels.area}: ${lead.area === null ? EMPTY_VALUE : `${lead.area} м²`}`,
    `${labels.region}: ${orEmpty(lead.region)}`,
    `${labels.workType}: ${orEmpty(lead.workType)}`,
  ];

  if (lead.options.length > 0) {
    lines.push(
      `${labels.options}:`,
      ...lead.options.map((option) => `• ${option}`)
    );
  }

  if (lead.comment) {
    lines.push("", `${labels.comment}: ${lead.comment}`);
  }

  return lines.join("\n");
}

export async function submitLead(
  lead: LeadInput,
  labels: Dictionary["leadNotification"]
): Promise<void> {
  const token = getRequiredEnv("TELEGRAM_BOT_TOKEN");
  const chatId = getRequiredEnv("TELEGRAM_CHAT_ID");
  const response = await fetch(
    `https://api.telegram.org/bot${token}/sendMessage`,
    {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text: formatLeadMessage(lead, labels),
      }),
      cache: "no-store",
      signal: AbortSignal.timeout(15_000),
    }
  );
  const result = (await response
    .json()
    .catch(() => null)) as TelegramResponse | null;

  if (!response.ok || !result?.ok) {
    throw new Error(result?.description ?? "Telegram delivery failed.");
  }
}
