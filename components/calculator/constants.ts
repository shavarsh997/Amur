import type { CalculatorFormValues } from "@/components/calculator/types";

export const initialValues: CalculatorFormValues = {
  calculationType: "renovation",
  area: "",
  bathrooms: "1",
  constructionPackage: "rough",
  material: "aeratedConcrete",
  houseShape: "rectangle",
  basement: false,
  basementArea: "",
  garage: false,
  garageArea: "",
  terrace: false,
  terraceArea: "",
  highCeilings: false,
  difficultSite: false,
  distanceKm: "",
  renovationObjectType: "apartment",
  renovationCondition: "newWithoutFinish",
  renovationLevel: "standard",
  renovationExtras: [],
  heatedFloorArea: "",
  doorsCount: "0",
  designPackage: "full",
};

export const selectionClass = (selected: boolean) =>
  `rounded-2xl border p-4 text-left transition ${selected ? "border-[var(--text-primary)] bg-[var(--background-warm)] shadow-[0_10px_24px_-22px_rgb(24_33_42/0.55)]" : "border-[var(--border)] bg-white hover:border-[var(--border-strong)] hover:bg-[var(--surface-muted)]"}`;
