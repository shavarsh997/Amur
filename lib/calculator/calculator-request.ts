import type { CalculatorFormValues } from "@/components/calculator/types";
import {
  constructionCalculatorConfig as config,
  type ConstructionPackage,
  type ConstructionMaterial,
  type HouseShape,
  type DesignPackage,
} from "@/config/construction-calculator.config";
import type { Dictionary, Locale } from "@/types";

export type CalculatorRequest =
  | { calculationType: "design"; area: number; designPackage: DesignPackage }
  | {
      calculationType: "construction";
      area: number;
      constructionPackage: ConstructionPackage;
      material: ConstructionMaterial;
      houseShape: HouseShape;
      basementArea: number | null;
      garageArea: number | null;
      terraceArea: number | null;
      highCeilings: boolean;
      difficultSite: boolean;
      distanceKm: number | null;
    };

export type CalculatorRequestContext = {
  request: CalculatorRequest;
  summary: { label: string; value: string }[];
};

function hasKey<T extends object>(object: T, key: unknown): key is keyof T {
  return typeof key === "string" && Object.hasOwn(object, key);
}

function positiveNumber(value: unknown): value is number {
  return typeof value === "number" && Number.isFinite(value) && value > 0;
}

/** Validate the untrusted form payload and copy only supported parameters. */
export function parseCalculatorRequest(raw: unknown): CalculatorRequest | null {
  if (typeof raw !== "object" || raw === null || Array.isArray(raw))
    return null;
  const value = raw as Record<string, unknown>;
  if (
    !positiveNumber(value.area) ||
    value.area < config.limits.minArea ||
    value.area > config.limits.maxArea
  )
    return null;
  if (value.calculationType === "design") {
    return hasKey(config.design, value.designPackage)
      ? {
          calculationType: "design",
          area: value.area,
          designPackage: value.designPackage,
        }
      : null;
  }
  if (
    value.calculationType !== "construction" ||
    !hasKey(config.construction.packages, value.constructionPackage) ||
    !hasKey(config.construction.materials, value.material) ||
    !hasKey(config.construction.houseShapes, value.houseShape) ||
    typeof value.highCeilings !== "boolean" ||
    typeof value.difficultSite !== "boolean"
  )
    return null;
  const { basementArea, garageArea, terraceArea, distanceKm } = value;
  if (basementArea !== null && !positiveNumber(basementArea)) return null;
  if (garageArea !== null && !positiveNumber(garageArea)) return null;
  if (terraceArea !== null && !positiveNumber(terraceArea)) return null;
  if (
    distanceKm !== null &&
    (typeof distanceKm !== "number" ||
      !Number.isFinite(distanceKm) ||
      distanceKm < 0)
  )
    return null;
  return {
    calculationType: "construction",
    area: value.area,
    constructionPackage: value.constructionPackage,
    material: value.material,
    houseShape: value.houseShape,
    basementArea,
    garageArea,
    terraceArea,
    highCeilings: value.highCeilings,
    difficultSite: value.difficultSite,
    distanceKm,
  };
}

export function calculatorRequestFromValues(
  values: CalculatorFormValues
): CalculatorRequest | null {
  const number = (value: string) => Number(value.trim().replace(",", "."));
  return parseCalculatorRequest(
    values.calculationType === "design"
      ? {
          calculationType: "design",
          area: number(values.area),
          designPackage: values.designPackage,
        }
      : {
          calculationType: values.calculationType,
          area: number(values.area),
          constructionPackage: values.constructionPackage,
          material: values.material,
          houseShape: values.houseShape,
          basementArea: values.basement ? number(values.basementArea) : null,
          garageArea: values.garage ? number(values.garageArea) : null,
          terraceArea: values.terrace ? number(values.terraceArea) : null,
          highCeilings: values.highCeilings,
          difficultSite: values.difficultSite,
          distanceKm: values.distanceKm.trim()
            ? number(values.distanceKm)
            : null,
        }
  );
}

/** Used for the visible review and rebuilt on the server for Telegram. */
export function calculatorRequestSummary(
  request: CalculatorRequest,
  copy: Dictionary["constructionCalculator"],
  locale: Locale
): CalculatorRequestContext["summary"] {
  const number = (value: number) =>
    value.toLocaleString(locale, { maximumFractionDigits: 20 });
  const rows = [{ label: copy.fields.area, value: number(request.area) }];
  if (request.calculationType === "design") {
    rows.push({
      label: copy.quickScenarios.interiorDesign.title,
      value: copy.design[request.designPackage].title,
    });
    return rows;
  }
  rows.push(
    {
      label: copy.quickScenarios.houseConstruction.title,
      value: copy.construction.packages[request.constructionPackage].title,
    },
    {
      label: copy.fields.constructionType,
      value: copy.construction.materials[request.material],
    },
    {
      label: copy.fields.houseShape,
      value: copy.construction.houseShapes[request.houseShape],
    }
  );
  for (const key of ["basement", "garage", "terrace"] as const) {
    const area = request[`${key}Area`];
    rows.push({
      label: copy.construction.extras[key],
      value:
        area === null
          ? copy.request.no
          : `${number(area)} ${copy.result.units.squareMeter}`,
    });
  }
  for (const key of ["highCeilings", "difficultSite"] as const) {
    rows.push({
      label: copy.construction.extras[key],
      value: request[key] ? copy.request.yes : copy.request.no,
    });
  }
  if (request.distanceKm !== null)
    rows.push({
      label: copy.fields.distance,
      value: `${number(request.distanceKm)} ${copy.result.units.kilometer}`,
    });
  return rows;
}
