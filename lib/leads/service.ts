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

export async function submitLead(lead: LeadInput): Promise<void> {
  if (process.env.NODE_ENV === "development") {
    console.info("[lead] Development submission", {
      ...lead,
      phone: lead.phone.replace(/\d(?=\d{2})/g, "•"),
    });
    return;
  }

  const webhookUrl = process.env.LEAD_WEBHOOK_URL;
  if (!webhookUrl) {
    throw new Error("Lead delivery is not configured.");
  }

  const response = await fetch(webhookUrl, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(lead),
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Lead delivery failed with ${response.status}.`);
  }
}
