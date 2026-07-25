import type { CalculatorObjectType, CalculatorWorkType } from "@/types/config";

export type CalculatorOption = "design-documentation" | "materials" | "site-conditions";

export type CalculatorValues = {
  objectType: CalculatorObjectType | "";
  workType: CalculatorWorkType | "";
  area: string;
  region: string;
  options: CalculatorOption[];
  name: string;
  phone: string;
  comment: string;
};

export type CalculatorStep = "objectType" | "workType" | "area" | "location" | "options" | "contact" | "result";

export type CalculatorField = Exclude<CalculatorStep, "result"> | "name" | "phone";

export type CalculatorErrors = Partial<Record<CalculatorField, string>>;

export type CalculatorRate = {
  objectType: CalculatorObjectType;
  workType: CalculatorWorkType;
  minPerSquareMeter: number;
  maxPerSquareMeter: number;
};

export type EstimateResult =
  | {
      status: "available";
      currency: string;
      min: number;
      max: number;
    }
  | {
      status: "unavailable";
      currency: string;
    };
