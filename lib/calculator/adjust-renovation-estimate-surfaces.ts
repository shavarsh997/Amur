import type { ConstructionEstimate } from "@/lib/calculator/calculate-construction-estimate";
import type { RenovationSurfaceKey } from "@/lib/calculator/calculate-renovation-surfaces";

export type RenovationSurfaceOverrides = Record<RenovationSurfaceKey, number>;

/** Reprices the estimate after the customer refines measured surface areas. */
export function adjustRenovationEstimateSurfaces(
  estimate: ConstructionEstimate,
  overrides: RenovationSurfaceOverrides
) {
  if (!estimate.surfaceCalculation) return estimate;

  const lines = estimate.lines.map((line) => {
    if (!line.surface || line.pricePerUnit === undefined) return line;
    const quantity = overrides[line.surface];
    return { ...line, quantity, amount: quantity * line.pricePerUnit };
  });
  const internalWallArea = overrides.internalWallArea;
  const wallWorks = estimate.wallWorks.map((line) => ({
    ...line,
    quantity: internalWallArea,
    total: internalWallArea * line.pricePerUnit,
  }));
  const wallWorksTotal = wallWorks.reduce((sum, line) => sum + line.total, 0);
  const priorSurfaceTotal = estimate.lines.reduce(
    (sum, line) => sum + (line.surface ? line.amount : 0),
    0
  );
  const updatedSurfaceTotal = lines.reduce(
    (sum, line) => sum + (line.surface ? line.amount : 0),
    0
  );
  const total = Math.round(
    estimate.total -
      priorSurfaceTotal +
      updatedSurfaceTotal -
      estimate.wallWorksTotal +
      wallWorksTotal
  );

  return {
    ...estimate,
    lines,
    wallWorks,
    wallWorksTotal,
    total,
    surfaceCalculation: {
      ...estimate.surfaceCalculation,
      ...overrides,
    },
  };
}
