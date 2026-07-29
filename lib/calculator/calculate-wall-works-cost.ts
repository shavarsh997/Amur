import { constructionCalculatorConfig as config } from "@/config/construction-calculator.config";
import type { WallWork } from "@/config/construction-calculator.config";

export type WallWorkCostLine = {
  key: WallWork;
  quantity: number;
  pricePerUnit: number;
  total: number;
};

export type WallWorksCostResult = {
  lines: WallWorkCostLine[];
  total: number;
};

function isWallWork(value: string): value is WallWork {
  return value in config.renovation.internalWalls.works;
}

/** Calculates selected wall work without relying on UI or translated labels. */
export function calculateWallWorksCost(
  netWallArea: number,
  selectedWorks: readonly string[]
): WallWorksCostResult {
  const quantity =
    Number.isFinite(netWallArea) && netWallArea > 0
      ? Math.round(netWallArea)
      : 0;
  const selected = new Set(selectedWorks.filter(isWallWork));
  const lines = [...selected].map((key) => {
    const pricePerUnit = Math.max(
      0,
      config.renovation.internalWalls.works[key].pricePerSquareMeter
    );

    return {
      key,
      quantity,
      pricePerUnit,
      total: quantity * pricePerUnit,
    };
  });

  return {
    lines,
    total: lines.reduce((sum, line) => sum + line.total, 0),
  };
}
