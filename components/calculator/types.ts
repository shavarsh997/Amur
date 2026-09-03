import type {
  CalculationType,
  ConstructionMaterial,
  ConstructionPackage,
  DesignPackage,
  FinishLevel,
  HouseShape,
  RenovationCondition,
  RenovationExtra,
  RenovationLevel,
  RenovationType,
  RenovationObjectType,
  LayoutDensity,
  WallWork,
} from "@/config/construction-calculator.config";

export type ConstructionCalculatorValues = {
  calculationType: CalculationType;
  area: string;
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
  renovationType: RenovationType;
  finishLevel: FinishLevel;
  renovationExtras: RenovationExtra[];
  heatedFloorArea: string;
  doorsCount: string;
  ceilingHeight: string;
  roomsCount: string;
  layoutDensity: LayoutDensity;
  selectedWallWorks: WallWork[];
  designPackage: DesignPackage;
};

export type CalculatorFormValues = ConstructionCalculatorValues & {
  renovationObjectType: RenovationObjectType;
};

export type CalculatorFieldId =
  | "area"
  | "basementArea"
  | "garageArea"
  | "terraceArea"
  | "distanceKm"
  | "bathrooms"
  | "heatedFloorArea"
  | "doorsCount"
  | "ceilingHeight"
  | "roomsCount";

export type CalculatorValidationErrors = Partial<
  Record<CalculatorFieldId, string>
>;

export const CALCULATOR_FIELD_ORDER: CalculatorFieldId[] = [
  "area",
  "basementArea",
  "garageArea",
  "terraceArea",
  "distanceKm",
  "bathrooms",
  "heatedFloorArea",
  "doorsCount",
  "ceilingHeight",
  "roomsCount",
];

export function calculatorFieldDomId(field: CalculatorFieldId) {
  return `calculator-field-${field}`;
}
