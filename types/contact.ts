import type { Dictionary } from "@/types";

/** Only the copy needed by the client-side contact flow crosses the RSC boundary. */
export type LeadFormDictionary = Pick<Dictionary, "estimate"> & {
  common: Pick<Dictionary["common"], "optional" | "website">;
};

export type ContactDialogDictionary = LeadFormDictionary & {
  contacts: Dictionary["contacts"];
  nav: Pick<Dictionary["nav"], "closeMenu">;
  common: Pick<Dictionary["common"], "back" | "loading">;
};
