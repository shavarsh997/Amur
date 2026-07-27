/**
 * All editable calculator assumptions live here. Amounts are in AMD and are
 * intentionally indicative — update them when commercial rates are approved.
 */
export const constructionCalculatorConfig = {
  currency: "AMD",
  estimateRange: { minMultiplier: 0.9, maxMultiplier: 1.15 },
  calculationTypes: {
    construction: { label: "Строительство дома", description: "Новый дом от фундамента до выбранной комплектации." },
    renovation: { label: "Ремонт дома", description: "Обновление существующего дома, квартиры или коммерческого помещения." },
    combined: { label: "Строительство + ремонт", description: "Строительство дома и последующая внутренняя отделка." },
  },
  construction: {
    packages: {
      shell: { label: "Коробка", description: "Фундамент, стены, перекрытия и кровля.", pricePerSquareMeter: 150_000 },
      rough: { label: "Черновая готовность", description: "Коробка, окна, инженерные сети, штукатурка и стяжка.", pricePerSquareMeter: 230_000 },
      turnkey: { label: "Под ключ", description: "Строительство, инженерия и базовая внутренняя отделка.", pricePerSquareMeter: 350_000 },
    },
    materials: {
      aeratedConcrete: { label: "Газоблок", multiplier: 1 },
      brick: { label: "Кирпич", multiplier: 1.18 },
      monolith: { label: "Монолит", multiplier: 1.3 },
      frame: { label: "Каркас", multiplier: 0.9 },
    },
    houseShapes: {
      rectangle: { label: "Прямоугольная", multiplier: 1 },
      lShape: { label: "Г-образная", multiplier: 1.08 },
      complex: { label: "Сложная", multiplier: 1.15 },
    },
    extras: {
      basement: { label: "Подвал", pricePerSquareMeter: 180_000 },
      garage: { label: "Гараж", pricePerSquareMeter: 140_000 },
      terrace: { label: "Терраса", pricePerSquareMeter: 90_000 },
      highCeilings: { label: "Потолки выше 3 метров", multiplier: 1.05 },
      difficultSite: { label: "Сложный участок", multiplier: 1.1 },
      distance: { label: "Удалённость от города", pricePerKm: 5_000 },
    },
  },
  renovation: {
    objectTypes: {
      apartment: { label: "Квартира" },
      privateHouse: { label: "Частный дом" },
      commercial: { label: "Коммерческое помещение" },
    },
    conditions: {
      newWithoutFinish: { label: "Новостройка без отделки", multiplier: 1 },
      roughFinish: { label: "Черновая отделка", multiplier: 0.9 },
      oldRenovation: { label: "Старый ремонт", multiplier: 1.15 },
      partiallyRenovated: { label: "Частично отремонтированный объект", multiplier: 0.85 },
    },
    levels: {
      cosmetic: { label: "Косметический", pricePerSquareMeter: 50_000 },
      standard: { label: "Стандартный", pricePerSquareMeter: 100_000 },
      capital: { label: "Капитальный", pricePerSquareMeter: 170_000 },
      premium: { label: "Премиальный", pricePerSquareMeter: 280_000 },
    },
    extras: {
      demolition: { label: "Демонтаж старого ремонта", pricePerSquareMeter: 10_000 },
      electrical: { label: "Замена электрики", pricePerSquareMeter: 15_000 },
      plumbing: { label: "Замена сантехники", pricePerBathroom: 250_000 },
      heatedFloor: { label: "Тёплый пол", pricePerSquareMeter: 20_000 },
      soundproofing: { label: "Шумоизоляция", pricePerSquareMeter: 18_000 },
      doors: { label: "Установка межкомнатных дверей", pricePerItem: 120_000 },
      airConditioners: { label: "Установка кондиционеров", pricePerItem: 180_000 },
      furnishing: { label: "Базовая меблировка", pricePerSquareMeter: 70_000 },
      cleaning: { label: "Уборка после ремонта", fixedPrice: 150_000 },
    },
  },
  design: {
    basic: { label: "Базовый дизайн", description: "Планировка и стилистическое направление.", pricePerSquareMeter: 8_000 },
    full: { label: "Полный дизайн-проект", description: "Чертежи, визуализации и подбор материалов.", pricePerSquareMeter: 15_000 },
    supervision: { label: "С авторским надзором", description: "Дизайн-проект и сопровождение реализации.", pricePerSquareMeter: 22_000 },
  },
} as const;

export type CalculationType = keyof typeof constructionCalculatorConfig.calculationTypes;
export type ConstructionPackage = keyof typeof constructionCalculatorConfig.construction.packages;
export type ConstructionMaterial = keyof typeof constructionCalculatorConfig.construction.materials;
export type HouseShape = keyof typeof constructionCalculatorConfig.construction.houseShapes;
export type RenovationObjectType = keyof typeof constructionCalculatorConfig.renovation.objectTypes;
export type RenovationCondition = keyof typeof constructionCalculatorConfig.renovation.conditions;
export type RenovationLevel = keyof typeof constructionCalculatorConfig.renovation.levels;
export type DesignPackage = keyof typeof constructionCalculatorConfig.design;
export type RenovationExtra = keyof typeof constructionCalculatorConfig.renovation.extras;
