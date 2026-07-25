import "server-only";

export type LeadInput = {
  objectType: string;
  area: number;
  region: string;
  workType: string;
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
  }

  // TODO: Add a Telegram delivery adapter.
  // TODO: Add a PostgreSQL persistence adapter.
  await Promise.resolve();
}
