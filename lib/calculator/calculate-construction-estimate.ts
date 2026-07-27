import { constructionCalculatorConfig as config } from "@/config/construction-calculator.config";
import type {
  CalculationType,
  ConstructionMaterial,
  ConstructionPackage,
  DesignPackage,
  HouseShape,
  RenovationCondition,
  RenovationExtra,
  RenovationLevel,
} from "@/config/construction-calculator.config";

export type ConstructionCalculatorValues = {
  calculationType: CalculationType;
  area: string;
  floors: string;
  rooms: string;
  bathrooms: string;
  constructionPackage: ConstructionPackage;
  material: ConstructionMaterial;
  houseShape: HouseShape;
  basement: boolean;
  basementArea: string;
  garage: boolean;
  garageArea: string;
  terrace: boolean;
  terraceArea: string;
  highCeilings: boolean;
  difficultSite: boolean;
  distanceKm: string;
  renovationCondition: RenovationCondition;
  renovationLevel: RenovationLevel;
  renovationExtras: RenovationExtra[];
  doorsCount: string;
  airConditionersCount: string;
  designEnabled: boolean;
  designPackage: DesignPackage;
};

export type EstimateLine = { label: string; amount: number; note?: string };
export type ConstructionEstimate = {
  lines: EstimateLine[];
  constructionTotal: number;
  renovationTotal: number;
  designTotal: number;
  total: number;
  min: number;
  max: number;
};

const numberValue = (value: string) => Math.max(0, Number(value.replace(",", ".")) || 0);
const includesConstruction = (type: CalculationType) => type === "construction" || type === "combined";
const includesRenovation = (type: CalculationType) => type === "renovation" || type === "combined";

export function calculateConstructionEstimate(values: ConstructionCalculatorValues): ConstructionEstimate {
  const area = numberValue(values.area);
  const bathrooms = numberValue(values.bathrooms);
  const lines: EstimateLine[] = [];
  let constructionTotal = 0;
  let renovationTotal = 0;
  let designTotal = 0;

  if (area && includesConstruction(values.calculationType)) {
    const packageOption = config.construction.packages[values.constructionPackage];
    const material = config.construction.materials[values.material];
    const shape = config.construction.houseShapes[values.houseShape];
    let mainConstruction = area * packageOption.pricePerSquareMeter * material.multiplier * shape.multiplier;

    if (values.highCeilings) {
      mainConstruction *= config.construction.extras.highCeilings.multiplier;
      lines.push({ label: config.construction.extras.highCeilings.label, amount: 0, note: `+${(config.construction.extras.highCeilings.multiplier - 1) * 100}% к строительной части` });
    }
    if (values.difficultSite) {
      mainConstruction *= config.construction.extras.difficultSite.multiplier;
      lines.push({ label: config.construction.extras.difficultSite.label, amount: 0, note: `+${(config.construction.extras.difficultSite.multiplier - 1) * 100}% к строительной части` });
    }
    constructionTotal = mainConstruction;
    lines.unshift({ label: packageOption.label, amount: mainConstruction, note: `${material.label}, ${shape.label}` });
    if (values.basement) {
      const amount = numberValue(values.basementArea) * config.construction.extras.basement.pricePerSquareMeter;
      constructionTotal += amount;
      lines.push({ label: config.construction.extras.basement.label, amount });
    }
    if (values.garage) {
      const amount = numberValue(values.garageArea) * config.construction.extras.garage.pricePerSquareMeter;
      constructionTotal += amount;
      lines.push({ label: config.construction.extras.garage.label, amount });
    }
    if (values.terrace) {
      const amount = numberValue(values.terraceArea) * config.construction.extras.terrace.pricePerSquareMeter;
      constructionTotal += amount;
      lines.push({ label: config.construction.extras.terrace.label, amount });
    }
    const distanceCost = numberValue(values.distanceKm) * config.construction.extras.distance.pricePerKm;
    if (distanceCost) {
      constructionTotal += distanceCost;
      lines.push({ label: config.construction.extras.distance.label, amount: distanceCost, note: `${numberValue(values.distanceKm)} км` });
    }
  }

  if (area && includesRenovation(values.calculationType)) {
    const level = config.renovation.levels[values.renovationLevel];
    const condition = config.renovation.conditions[values.renovationCondition];
    renovationTotal = area * level.pricePerSquareMeter * condition.multiplier;
    lines.push({ label: `Ремонт: ${level.label}`, amount: renovationTotal, note: condition.label });
    for (const extraKey of values.renovationExtras) {
      const extra = config.renovation.extras[extraKey];
      const amount = "pricePerSquareMeter" in extra ? area * extra.pricePerSquareMeter
        : "pricePerBathroom" in extra ? bathrooms * extra.pricePerBathroom
          : "pricePerItem" in extra ? numberValue(extraKey === "doors" ? values.doorsCount : values.airConditionersCount) * extra.pricePerItem
            : extra.fixedPrice;
      renovationTotal += amount;
      lines.push({ label: extra.label, amount });
    }
  }

  if (area && values.designEnabled) {
    const design = config.design[values.designPackage];
    designTotal = area * design.pricePerSquareMeter;
    lines.push({ label: design.label, amount: designTotal });
  }

  const total = Math.round(constructionTotal + renovationTotal + designTotal);
  return {
    lines,
    constructionTotal: Math.round(constructionTotal),
    renovationTotal: Math.round(renovationTotal),
    designTotal: Math.round(designTotal),
    total,
    min: Math.round(total * config.estimateRange.minMultiplier),
    max: Math.round(total * config.estimateRange.maxMultiplier),
  };
}
