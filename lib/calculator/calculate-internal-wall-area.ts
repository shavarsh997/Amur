import { constructionCalculatorConfig as config } from "@/config/construction-calculator.config";
import type { LayoutDensity } from "@/config/construction-calculator.config";

export type InternalWallCalculationParams = {
  floorArea: number;
  ceilingHeight: number;
  roomsCount: number;
  layoutDensity: LayoutDensity | string;
};

export type InternalWallCalculationResult = {
  partitionLength: number;
  grossWallArea: number;
  openingsArea: number;
  netWallArea: number;
};

const positiveNumber = (value: number) =>
  Number.isFinite(value) && value > 0 ? value : 0;

function layoutDensityOrDefault(value: unknown): LayoutDensity {
  return typeof value === "string" &&
    value in config.renovation.internalWalls.layoutCoefficients
    ? (value as LayoutDensity)
    : "standard";
}

/**
 * Estimates the two-sided surface of internal partitions. It is deliberately
 * independent from the form so that the same calculation can be reused later.
 */
export function calculateInternalWallArea({
  floorArea,
  ceilingHeight,
  roomsCount,
  layoutDensity,
}: InternalWallCalculationParams): InternalWallCalculationResult {
  const safeFloorArea = positiveNumber(floorArea);
  const safeCeilingHeight = positiveNumber(ceilingHeight);
  const safeRoomsCount = positiveNumber(roomsCount);
  const density = layoutDensityOrDefault(layoutDensity);

  const partitionLength =
    config.renovation.internalWalls.layoutCoefficients[density] *
    Math.sqrt(safeFloorArea * safeRoomsCount);
  const grossWallArea = partitionLength * safeCeilingHeight * 2;
  const netWallArea = Math.round(
    grossWallArea * config.renovation.internalWalls.openingsCoefficient
  );

  return {
    partitionLength,
    grossWallArea,
    openingsArea:
      grossWallArea * (1 - config.renovation.internalWalls.openingsCoefficient),
    netWallArea,
  };
}
