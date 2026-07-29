import { constructionCalculatorConfig as config } from "@/config/construction-calculator.config";
import {
  calculateInternalWallArea,
  type InternalWallCalculationParams,
} from "@/lib/calculator/calculate-internal-wall-area";

export type RenovationSurfaceCalculation = {
  floorArea: number;
  ceilingArea: number;
  internalWallArea: number;
  exteriorWallArea: number;
  exteriorWallPerimeter: number;
};

export type RenovationSurfaceKey = keyof Pick<
  RenovationSurfaceCalculation,
  "floorArea" | "ceilingArea" | "internalWallArea" | "exteriorWallArea"
>;

/** Estimates finishable surfaces from the floor area and layout inputs. */
export function calculateRenovationSurfaces(
  params: InternalWallCalculationParams
): RenovationSurfaceCalculation {
  const floorArea =
    Number.isFinite(params.floorArea) && params.floorArea > 0
      ? params.floorArea
      : 0;
  const ceilingHeight =
    Number.isFinite(params.ceilingHeight) && params.ceilingHeight > 0
      ? params.ceilingHeight
      : 0;
  const internalWalls = calculateInternalWallArea(params);
  const exteriorWallPerimeter =
    config.renovation.exteriorWalls.perimeterCoefficient * Math.sqrt(floorArea);
  const exteriorWallArea = Math.round(
    exteriorWallPerimeter *
      ceilingHeight *
      config.renovation.exteriorWalls.openingsCoefficient
  );

  return {
    floorArea,
    ceilingArea: floorArea,
    internalWallArea: internalWalls.netWallArea,
    exteriorWallArea,
    exteriorWallPerimeter,
  };
}
