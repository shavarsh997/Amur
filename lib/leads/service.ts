import "server-only";

export type LeadInput = {
  objectType: string;
  area: number;
  region: string;
  workType: string;
  options: string[];
  name: string;
  phone: string;
  comment: string;
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

function formatLeadMessage(lead: LeadInput): string {
  const lines = [
    "Новая заявка с сайта",
    "",
    `Имя: ${lead.name}`,
    `Телефон: ${lead.phone}`,
    `Тип объекта: ${lead.objectType}`,
    `Площадь: ${lead.area} м²`,
    `Регион: ${lead.region}`,
    `Вид работ: ${lead.workType}`,
  ];

  if (lead.options.length > 0) {
    lines.push(`Дополнительно: ${lead.options.join(", ")}`);
  }

  if (lead.comment) {
    lines.push("", `Комментарий: ${lead.comment}`);
  }

  return lines.join("\n");
}

export async function submitLead(lead: LeadInput): Promise<void> {
  const token = getRequiredEnv("TELEGRAM_BOT_TOKEN");
  const chatId = getRequiredEnv("TELEGRAM_CHAT_ID");
  const response = await fetch(
    `https://api.telegram.org/bot${token}/sendMessage`,
    {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text: formatLeadMessage(lead),
      }),
      cache: "no-store",
    }
  );
  const result = (await response
    .json()
    .catch(() => null)) as TelegramResponse | null;

  if (!response.ok || !result?.ok) {
    throw new Error(result?.description ?? "Telegram delivery failed.");
  }
}
