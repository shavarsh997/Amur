export type Locale = "hy" | "ru" | "en";

export interface LocalizedText {
  title: string;
  description: string;
}

export interface Project {
  slug: string;
  image: string;
  gallery: readonly string[];
  objectType: "private-house" | "commercial" | "renovation";
  status: "completed" | "in-progress";
  isDemo: true;
  location: string;
  title: string;
  area: string;
  year: string;
  task: string;
  completedWorks: string[];
  stages: string[];
  materials: string[];
  result: string;
}

export interface WorkStep {
  number: string;
  title: string;
  description: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface Testimonial {
  name: string;
  role: string;
  quote: string;
  isPlaceholder: boolean;
}

export interface TeamMember {
  role: string;
  description: string;
  isPlaceholder: boolean;
}

export interface Dictionary {
  localeName: string;
  metadata: {
    title: string;
    description: string;
  };
  nav: {
    home: string;
    services: string;
    projects: string;
    about: string;
    contacts: string;
    privacy: string;
    consultation: string;
    openMenu: string;
    closeMenu: string;
    language: string;
  };
  hero: {
    eyebrow: string;
    title: string;
    description: string;
    primaryAction: string;
    secondaryAction: string;
    trustPoints: [string, string, string, string];
  };
  services: {
    eyebrow: string;
    title: string;
    description: string;
    specializedTitle: string;
    viewAll: string;
    learnMore: string;
    pageTitle: string;
    pageDescription: string;
    detail: {
      overview: string;
      included: string;
      stages: string;
      audience: string;
      customerTypes: string;
      workTypes: string;
      estimateRequirements: string;
      priceFactors: string;
      faq: string;
      requestEstimate: string;
      relatedProjects: string;
    };
  };
  projects: {
    eyebrow: string;
    title: string;
    description: string;
    viewAll: string;
    pageTitle: string;
    pageDescription: string;
    availabilityTitle: string;
    availabilityDescription: string;
    availabilityAction: string;
    filters: {
      all: string;
      privateHouses: string;
      commercial: string;
      renovation: string;
      inProgress: string;
      completed: string;
    };
    statusLabels: Record<Project["status"], string>;
    detail: {
      location: string;
      objectType: string;
      area: string;
      year: string;
      status: string;
      task: string;
      completedWorks: string;
      stages: string;
      materials: string;
      result: string;
      gallery: string;
      discussProject: string;
    };
    items: Project[];
  };
  whyUs: {
    eyebrow: string;
    title: string;
    description: string;
    items: [
      LocalizedText,
      LocalizedText,
      LocalizedText,
      LocalizedText,
      LocalizedText,
      LocalizedText,
    ];
  };
  process: {
    eyebrow: string;
    title: string;
    description: string;
    steps: [WorkStep, WorkStep, WorkStep, WorkStep, WorkStep, WorkStep];
  };
  estimate: {
    eyebrow: string;
    title: string;
    description: string;
    fields: {
      objectType: string;
      area: string;
      region: string;
      workType: string;
      name: string;
      phone: string;
      comment: string;
    };
    placeholders: {
      objectType: string;
      area: string;
      region: string;
      workType: string;
      name: string;
      phone: string;
      comment: string;
    };
    choices: {
      objectType: {
        privateHouse: string;
        commercial: string;
        apartment: string;
        other: string;
      };
      workType: {
        turnkey: string;
        design: string;
        renovation: string;
        separateWorks: string;
      };
    };
    required: {
      objectType: boolean;
      area: boolean;
      region: boolean;
      workType: boolean;
      name: boolean;
      phone: boolean;
      comment: boolean;
    };
    errors: {
      objectTypeRequired: string;
      areaRequired: string;
      areaInvalid: string;
      regionRequired: string;
      workTypeRequired: string;
      nameRequired: string;
      phoneRequired: string;
      phoneInvalid: string;
    };
    submit: string;
    submitting: string;
    success: string;
    error: string;
  };
  calculator: {
    eyebrow: string;
    title: string;
    description: string;
    steps: {
      objectType: string;
      workType: string;
      area: string;
      location: string;
      options: string;
      contact: string;
      result: string;
    };
    objectType: {
      title: string;
      description: string;
      choices: {
        privateHouse: string;
        commercial: string;
        apartment: string;
        other: string;
      };
    };
    workType: {
      title: string;
      description: string;
      choices: {
        turnkey: string;
        design: string;
        renovation: string;
        separateWorks: string;
      };
    };
    area: {
      title: string;
      description: string;
      label: string;
      placeholder: string;
    };
    location: {
      title: string;
      description: string;
      label: string;
      placeholder: string;
    };
    options: {
      title: string;
      description: string;
      choices: {
        designDocumentation: string;
        materials: string;
        siteConditions: string;
      };
    };
    contact: {
      title: string;
      description: string;
      nameLabel: string;
      phoneLabel: string;
      commentLabel: string;
      namePlaceholder: string;
      phonePlaceholder: string;
      commentPlaceholder: string;
    };
    result: {
      title: string;
      rangeLabel: string;
      preliminaryNotice: string;
      pricingUnavailable: string;
      sendRequest: string;
      sending: string;
      success: string;
      error: string;
    };
    navigation: {
      back: string;
      next: string;
      calculate: string;
    };
    errors: {
      objectTypeRequired: string;
      workTypeRequired: string;
      areaRequired: string;
      areaInvalid: string;
      regionRequired: string;
      nameRequired: string;
      phoneRequired: string;
      phoneInvalid: string;
    };
  };
  constructionCalculator: {
    dialog: { eyebrow: string; title: string; close: string; open: string };
    steps: {
      scenario: { title: string; description: string };
      parameters: { title: string; description: string };
      construction: { title: string; description: string };
      constructionExtras: { title: string; description: string };
      renovationExtras: { title: string; description: string };
      design: { title: string; description: string };
    };
    fields: {
      area: string;
      floors: string;
      rooms: string;
      bathrooms: string;
      houseParameters: string;
      houseShape: string;
      constructionType: string;
      basementArea: string;
      garageArea: string;
      terraceArea: string;
      propertyCondition: string;
      propertyType: string;
      currentCondition: string;
      renovationLevel: string;
      distance: string;
      distanceHint: string;
      doorsCount: string;
      airConditionersCount: string;
    };
    calculationTypes: Record<
      "construction" | "renovation" | "combined",
      LocalizedText
    >;
    quickScenarios: Record<
      | "apartmentRenovation"
      | "houseRenovation"
      | "houseConstruction"
      | "interiorDesign"
      | "commercial",
      LocalizedText
    >;
    construction: {
      packages: Record<"shell" | "rough" | "turnkey", LocalizedText>;
      materials: Record<
        "aeratedConcrete" | "brick" | "monolith" | "frame",
        string
      >;
      houseShapes: Record<"rectangle" | "lShape" | "complex", string>;
      extras: Record<
        | "basement"
        | "garage"
        | "terrace"
        | "highCeilings"
        | "difficultSite"
        | "distance",
        string
      >;
    };
    renovation: {
      objectTypes: Record<"apartment" | "privateHouse" | "commercial", string>;
      conditions: Record<
        | "newWithoutFinish"
        | "roughFinish"
        | "oldRenovation"
        | "partiallyRenovated",
        string
      >;
      levels: Record<"cosmetic" | "standard" | "capital" | "premium", string>;
      extras: Record<
        | "demolition"
        | "electrical"
        | "plumbing"
        | "heatedFloor"
        | "soundproofing"
        | "doors"
        | "airConditioners"
        | "furnishing"
        | "cleaning",
        string
      >;
    };
    design: Record<"basic" | "full" | "supervision", LocalizedText> & {
      enabled: string;
      enabledDescription: string;
    };
    result: {
      title: string;
      range: string;
      enterArea: string;
      included: string;
      empty: string;
      pricingUnavailable: string;
      total: string;
      notice: string;
      constructionIncrease: string;
      distanceNote: string;
      renovationLine: string;
    };
    estimateSectionDescription: string;
  };
  testimonials: {
    eyebrow: string;
    title: string;
    description: string;
    placeholderNotice: string;
    items: Testimonial[];
  };
  faq: {
    eyebrow: string;
    title: string;
    description: string;
    items: FAQ[];
  };
  cta: {
    title: string;
    description: string;
    primaryAction: string;
    secondaryAction: string;
  };
  footer: {
    description: string;
    navigation: string;
    services: string;
    contacts: string;
    rights: string;
    privacy: string;
  };
  about: {
    eyebrow: string;
    title: string;
    intro: string;
    storyTitle: string;
    story: string[];
    valuesTitle: string;
    values: LocalizedText[];
    approachTitle: string;
    approach: string;
    team: {
      title: string;
      description: string;
      placeholderNotice: string;
      members: [TeamMember, TeamMember, TeamMember];
    };
  };
  contacts: {
    eyebrow: string;
    title: string;
    description: string;
    phone: string;
    email: string;
    address: string;
    hours: string;
    messengers: string;
    whatsapp: string;
    telegram: string;
    mapPlaceholder: string;
    formTitle: string;
    formDescription: string;
  };
  privacy: {
    title: string;
    updated: string;
    intro: string;
    sections: Array<{
      title: string;
      paragraphs: string[];
    }>;
  };
  common: {
    home: string;
    back: string;
    next: string;
    previous: string;
    readMore: string;
    showMore: string;
    showLess: string;
    loading: string;
    required: string;
    optional: string;
    notFoundTitle: string;
    notFoundDescription: string;
    returnHome: string;
    breadcrumbs: string;
    errors: {
      required: string;
      invalidEmail: string;
      invalidPhone: string;
      generic: string;
    };
    success: {
      sent: string;
    };
  };
}
