import type { CalculatorFormValues } from "@/components/calculator/types";
import { constructionCalculatorConfig as config } from "@/config/construction-calculator.config";
import type { calculateInternalWallArea } from "@/lib/calculator/calculate-internal-wall-area";
import type { calculateRenovationSurfaces } from "@/lib/calculator/calculate-renovation-surfaces";
import type { RenovationSurfaceKey } from "@/lib/calculator/calculate-renovation-surfaces";
import type { WallWorkCostLine } from "@/lib/calculator/calculate-wall-works-cost";
import type { Dictionary } from "@/types";

export type EstimateUnit = "squareMeter" | "bathroom" | "item" | "kilometer";
export type EstimateLine = {
  label: string;
  amount: number;
  note?: string;
  quantity?: number;
  unit?: EstimateUnit;
  pricePerUnit?: number;
  surface?: RenovationSurfaceKey;
};
export type ConstructionEstimate = {
  lines: EstimateLine[];
  floorArea: number;
  surfaceCalculation: ReturnType<typeof calculateRenovationSurfaces> | null;
  wallCalculation: ReturnType<typeof calculateInternalWallArea> | null;
  wallWorks: WallWorkCostLine[];
  wallWorksTotal: number;
  constructionTotal: number;
  renovationTotal: number;
  designTotal: number;
  total: number;
  min: number;
  max: number;
};

const numberValue = (value: string) =>
  Math.max(
    0,
    Number.isFinite(Number(value.replace(",", ".")))
      ? Number(value.replace(",", "."))
      : 0
  );

export function calculateConstructionEstimate(
  values: CalculatorFormValues,
  copy: Dictionary["constructionCalculator"]
): ConstructionEstimate {
  if (values.calculationType === "renovation") {
    throw new Error("Renovation estimates require contacting SHINEX.");
  }
  const area = numberValue(values.area);
  const lines: EstimateLine[] = [];
  let constructionTotal = 0;
  const renovationTotal = 0;
  let designTotal = 0;
  const wallCalculation: ConstructionEstimate["wallCalculation"] = null;
  const surfaceCalculation: ConstructionEstimate["surfaceCalculation"] = null;
  const wallWorks: WallWorkCostLine[] = [];
  const wallWorksTotal = 0;

  if (area && values.calculationType === "construction") {
    const packageOption =
      config.construction.packages[values.constructionPackage];
    const material = config.construction.materials[values.material];
    const shape = config.construction.houseShapes[values.houseShape];
    let mainConstruction =
      area *
      packageOption.pricePerSquareMeter *
      material.multiplier *
      shape.multiplier;

    if (values.highCeilings) {
      mainConstruction *= config.construction.extras.highCeilings.multiplier;
      lines.push({
        label: copy.construction.extras.highCeilings,
        amount: 0,
        note: copy.result.constructionIncrease.replace(
          "{percentage}",
          String((config.construction.extras.highCeilings.multiplier - 1) * 100)
        ),
      });
    }
    if (values.difficultSite) {
      mainConstruction *= config.construction.extras.difficultSite.multiplier;
      lines.push({
        label: copy.construction.extras.difficultSite,
        amount: 0,
        note: copy.result.constructionIncrease.replace(
          "{percentage}",
          String(
            (config.construction.extras.difficultSite.multiplier - 1) * 100
          )
        ),
      });
    }
    constructionTotal = mainConstruction;
    lines.unshift({
      label: copy.construction.packages[values.constructionPackage].title,
      amount: mainConstruction,
      note: `${copy.construction.materials[values.material]}, ${copy.construction.houseShapes[values.houseShape]}`,
      quantity: area,
      unit: "squareMeter",
      pricePerUnit: mainConstruction / area,
    });
    if (values.basement) {
      const amount =
        numberValue(values.basementArea) *
        config.construction.extras.basement.pricePerSquareMeter;
      constructionTotal += amount;
      lines.push({
        label: copy.construction.extras.basement,
        amount,
        quantity: numberValue(values.basementArea),
        unit: "squareMeter",
        pricePerUnit: config.construction.extras.basement.pricePerSquareMeter,
      });
    }
    if (values.garage) {
      const amount =
        numberValue(values.garageArea) *
        config.construction.extras.garage.pricePerSquareMeter;
      constructionTotal += amount;
      lines.push({
        label: copy.construction.extras.garage,
        amount,
        quantity: numberValue(values.garageArea),
        unit: "squareMeter",
        pricePerUnit: config.construction.extras.garage.pricePerSquareMeter,
      });
    }
    if (values.terrace) {
      const amount =
        numberValue(values.terraceArea) *
        config.construction.extras.terrace.pricePerSquareMeter;
      constructionTotal += amount;
      lines.push({
        label: copy.construction.extras.terrace,
        amount,
        quantity: numberValue(values.terraceArea),
        unit: "squareMeter",
        pricePerUnit: config.construction.extras.terrace.pricePerSquareMeter,
      });
    }
    const distanceCost =
      numberValue(values.distanceKm) *
      config.construction.extras.distance.pricePerKm;
    if (distanceCost) {
      constructionTotal += distanceCost;
      lines.push({
        label: copy.construction.extras.distance,
        amount: distanceCost,
        note: copy.result.distanceNote.replace(
          "{distance}",
          String(numberValue(values.distanceKm))
        ),
        quantity: numberValue(values.distanceKm),
        unit: "kilometer",
        pricePerUnit: config.construction.extras.distance.pricePerKm,
      });
    }
  }

  if (area && values.calculationType === "design") {
    const design = config.design[values.designPackage];
    designTotal = area * design.pricePerSquareMeter;
    lines.push({
      label: copy.design[values.designPackage].title,
      amount: designTotal,
      quantity: area,
      unit: "squareMeter",
      pricePerUnit: design.pricePerSquareMeter,
    });
  }

  const total = Math.round(constructionTotal + renovationTotal + designTotal);
  return {
    lines,
    floorArea: area,
    surfaceCalculation,
    wallCalculation,
    wallWorks,
    wallWorksTotal,
    constructionTotal: Math.round(constructionTotal),
    renovationTotal: Math.round(renovationTotal),
    designTotal: Math.round(designTotal),
    total,
    min: Math.round(total * config.estimateRange.minMultiplier),
    max: Math.round(total * config.estimateRange.maxMultiplier),
  };
}
