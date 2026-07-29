/**
 * All editable calculator assumptions live here. Amounts are in AMD and are
 * intentionally indicative — update them when commercial rates are approved.
 */
export const calculationTypes = [
  "renovation",
  "construction",
  "design",
] as const;

export const constructionCalculatorConfig = {
  currency: "AMD",
  publicRates: false,
  limits: { minArea: 1, maxArea: 100_000 },
  estimateRange: { minMultiplier: 0.9, maxMultiplier: 1.15 },
  quickScenarios: [
    {
      id: "apartment-or-private-house-renovation",
      calculationType: "renovation",
      renovationObjectType: "apartment",
      labelKey: "apartmentOrPrivateHouseRenovation",
    },
    {
      id: "house-construction",
      calculationType: "construction",
      renovationObjectType: undefined,
      labelKey: "houseConstruction",
    },
    {
      id: "interior-design",
      calculationType: "design",
      renovationObjectType: "apartment",
      labelKey: "interiorDesign",
    },
    {
      id: "commercial",
      calculationType: "renovation",
      renovationObjectType: "commercial",
      labelKey: "commercial",
    },
  ],
  construction: {
    packages: {
      shell: { pricePerSquareMeter: 150_000 },
      rough: { pricePerSquareMeter: 230_000 },
      turnkey: { pricePerSquareMeter: 350_000 },
    },
    materials: {
      aeratedConcrete: { multiplier: 1 },
      stone: { multiplier: 1.18 },
      monolith: { multiplier: 1.3 },
      frame: { multiplier: 0.9 },
    },
    houseShapes: {
      rectangle: { multiplier: 1 },
      lShape: { multiplier: 1.08 },
      complex: { multiplier: 1.15 },
    },
    extras: {
      basement: { pricePerSquareMeter: 180_000 },
      garage: { pricePerSquareMeter: 140_000 },
      terrace: { pricePerSquareMeter: 90_000 },
      highCeilings: { multiplier: 1.05 },
      difficultSite: { multiplier: 1.1 },
      distance: { pricePerKm: 5_000 },
    },
  },
  renovation: {
    internalWalls: {
      layoutCoefficients: {
        open: 0.9,
        standard: 1.2,
        complex: 1.5,
      },
      openingsCoefficient: 0.9,
      works: {
        plastering: { pricePerSquareMeter: 3_500 },
        putty: { pricePerSquareMeter: 2_200 },
        painting: { pricePerSquareMeter: 1_800 },
        wallpaper: { pricePerSquareMeter: 2_500 },
        wallDemolition: { pricePerSquareMeter: 1_200 },
      },
    },
    surfaceAllocation: {
      floor: 0.3,
      ceiling: 0.15,
      internalWalls: 0.35,
      exteriorWalls: 0.2,
    },
    exteriorWalls: {
      perimeterCoefficient: 4,
      openingsCoefficient: 0.78,
    },
    conditions: {
      newWithoutFinish: { multiplier: 1 },
      roughFinish: { multiplier: 0.9 },
      oldRenovation: { multiplier: 1.15 },
      partiallyRenovated: { multiplier: 0.85 },
    },
    levels: {
      cosmetic: { pricePerSquareMeter: 50_000 },
      standard: { pricePerSquareMeter: 100_000 },
      capital: { pricePerSquareMeter: 170_000 },
      premium: { pricePerSquareMeter: 280_000 },
    },
    extras: {
      demolition: { pricePerSquareMeter: 10_000 },
      electrical: { pricePerSquareMeter: 15_000 },
      plumbing: { pricePerBathroom: 250_000 },
      heatedFloor: { pricePerSquareMeter: 20_000 },
      doors: { pricePerItem: 120_000 },
    },
  },
  design: {
    basic: { pricePerSquareMeter: 8_000 },
    full: { pricePerSquareMeter: 15_000 },
    supervision: { pricePerSquareMeter: 22_000 },
  },
} as const;

export type CalculationType = (typeof calculationTypes)[number];
export type CalculatorScenarioId =
  (typeof constructionCalculatorConfig.quickScenarios)[number]["id"];
export type ConstructionPackage =
  keyof typeof constructionCalculatorConfig.construction.packages;
export type ConstructionMaterial =
  keyof typeof constructionCalculatorConfig.construction.materials;
export type HouseShape =
  keyof typeof constructionCalculatorConfig.construction.houseShapes;
export type RenovationObjectType = "apartment" | "privateHouse" | "commercial";
export type RenovationCondition =
  keyof typeof constructionCalculatorConfig.renovation.conditions;
export type RenovationLevel =
  keyof typeof constructionCalculatorConfig.renovation.levels;
export type DesignPackage = keyof typeof constructionCalculatorConfig.design;
export type RenovationExtra =
  keyof typeof constructionCalculatorConfig.renovation.extras;
export type LayoutDensity =
  keyof typeof constructionCalculatorConfig.renovation.internalWalls.layoutCoefficients;
export type WallWork =
  keyof typeof constructionCalculatorConfig.renovation.internalWalls.works;
