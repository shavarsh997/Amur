import type { CalculatorFormValues } from "@/components/calculator/types";
import { constructionCalculatorConfig as config } from "@/config/construction-calculator.config";
import { calculateInternalWallArea } from "@/lib/calculator/calculate-internal-wall-area";
import { calculateRenovationSurfaces } from "@/lib/calculator/calculate-renovation-surfaces";
import type { RenovationSurfaceKey } from "@/lib/calculator/calculate-renovation-surfaces";
import {
  calculateWallWorksCost,
  type WallWorkCostLine,
} from "@/lib/calculator/calculate-wall-works-cost";
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
  const area = numberValue(values.area);
  const bathrooms = numberValue(values.bathrooms);
  const lines: EstimateLine[] = [];
  let constructionTotal = 0;
  let renovationTotal = 0;
  let designTotal = 0;
  let wallCalculation: ConstructionEstimate["wallCalculation"] = null;
  let surfaceCalculation: ConstructionEstimate["surfaceCalculation"] = null;
  let wallWorks: WallWorkCostLine[] = [];
  let wallWorksTotal = 0;

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

  if (area && values.calculationType === "renovation") {
    const usesSplitRenovationParameters = Boolean(
      copy.renovation.types && copy.renovation.finishLevels
    );
    const renovationType = config.renovation.types[values.renovationType];
    const finishLevel = config.renovation.finishLevels[values.finishLevel];
    const level = config.renovation.levels[values.renovationLevel];
    const condition = config.renovation.conditions[values.renovationCondition];
    const renovationPricePerSquareMeter = usesSplitRenovationParameters
      ? renovationType.pricePerSquareMeter * finishLevel.multiplier
      : level.pricePerSquareMeter;
    renovationTotal =
      area * renovationPricePerSquareMeter * condition.multiplier;
    wallCalculation = calculateInternalWallArea({
      floorArea: area,
      ceilingHeight: numberValue(values.ceilingHeight),
      roomsCount: numberValue(values.roomsCount),
      layoutDensity: values.layoutDensity,
    });
    surfaceCalculation = calculateRenovationSurfaces({
      floorArea: area,
      ceilingHeight: numberValue(values.ceilingHeight),
      roomsCount: numberValue(values.roomsCount),
      layoutDensity: values.layoutDensity,
    });
    const wallWorksResult = calculateWallWorksCost(
      wallCalculation.netWallArea,
      values.selectedWallWorks
    );
    wallWorks = wallWorksResult.lines;
    wallWorksTotal = wallWorksResult.total;
    const baseRenovationTotal = renovationTotal;
    const selectedWallWorksReplaceBase = wallWorksTotal > 0;
    if (selectedWallWorksReplaceBase) {
      renovationTotal +=
        wallWorksTotal -
        baseRenovationTotal * config.renovation.surfaceAllocation.internalWalls;
    }
    const surfaceQuantities = {
      floor: surfaceCalculation.floorArea,
      ceiling: surfaceCalculation.ceilingArea,
      internalWalls: surfaceCalculation.internalWallArea,
      exteriorWalls: surfaceCalculation.exteriorWallArea,
    } as const;
    for (const [surface, quantity] of Object.entries(surfaceQuantities) as [
      keyof typeof surfaceQuantities,
      number,
    ][]) {
      if (surface === "internalWalls" && selectedWallWorksReplaceBase) continue;
      const amount =
        baseRenovationTotal * config.renovation.surfaceAllocation[surface];
      lines.push({
        label: copy.result.surfaceWorks[surface],
        amount,
        note: usesSplitRenovationParameters
          ? copy.result.renovationParametersLine
              ?.replace(
                "{type}",
                copy.renovation.types?.[values.renovationType] ?? ""
              )
              .replace(
                "{finishLevel}",
                copy.renovation.finishLevels?.[values.finishLevel] ?? ""
              )
          : copy.result.renovationLine.replace(
              "{level}",
              copy.renovation.levels[values.renovationLevel]
            ),
        quantity,
        unit: "squareMeter",
        pricePerUnit: quantity ? amount / quantity : 0,
        surface:
          surface === "floor"
            ? "floorArea"
            : surface === "ceiling"
              ? "ceilingArea"
              : surface === "internalWalls"
                ? "internalWallArea"
                : "exteriorWallArea",
      });
    }
    for (const extraKey of new Set(values.renovationExtras ?? [])) {
      const extra = config.renovation.extras[extraKey];
      const amount =
        "pricePerSquareMeter" in extra
          ? (extraKey === "heatedFloor"
              ? numberValue(values.heatedFloorArea)
              : area) * extra.pricePerSquareMeter
          : "pricePerBathroom" in extra
            ? bathrooms * extra.pricePerBathroom
            : "pricePerItem" in extra
              ? numberValue(values.doorsCount) * extra.pricePerItem
              : 0;
      renovationTotal += amount;
      const quantity =
        extraKey === "plumbing"
          ? bathrooms
          : extraKey === "doors"
            ? numberValue(values.doorsCount)
            : extraKey === "heatedFloor"
              ? numberValue(values.heatedFloorArea)
              : area;
      const pricePerUnit =
        "pricePerSquareMeter" in extra
          ? extra.pricePerSquareMeter
          : "pricePerBathroom" in extra
            ? extra.pricePerBathroom
            : "pricePerItem" in extra
              ? extra.pricePerItem
              : 0;
      lines.push({
        label: copy.renovation.extras[extraKey],
        amount,
        quantity,
        unit:
          extraKey === "plumbing"
            ? "bathroom"
            : extraKey === "doors"
              ? "item"
              : "squareMeter",
        pricePerUnit,
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
