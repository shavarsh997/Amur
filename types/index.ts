export type Locale = "hy" | "ru" | "en";

export interface LocalizedText {
  title: string;
  description: string;
}

export interface Service {
  slug: string;
  icon: string;
  image: string;
  category: string;
  title: string;
  shortDescription: string;
  description: string;
  included: string[];
  stages: string[];
  audience: string[];
  cta: string;
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

export interface SocialLink {
  label: string;
  url: string;
}

export interface ContactConfig {
  phone: string;
  phoneHref: string;
  email: string;
  address: string;
  hours: string;
  telegramUrl: string;
  whatsappUrl: string;
  socials: readonly SocialLink[];
}

export interface SiteConfig {
  siteUrl: string;
  brand: string;
  contacts: ContactConfig;
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
    viewAll: string;
    learnMore: string;
    pageTitle: string;
    pageDescription: string;
    detail: {
      overview: string;
      included: string;
      stages: string;
      audience: string;
      requestEstimate: string;
      relatedProjects: string;
    };
    items: [Service, Service, Service, Service, Service, Service];
  };
  projects: {
    eyebrow: string;
    title: string;
    description: string;
    viewAll: string;
    pageTitle: string;
    pageDescription: string;
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
    items: [LocalizedText, LocalizedText, LocalizedText, LocalizedText, LocalizedText, LocalizedText];
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
    items: [FAQ, FAQ, FAQ, FAQ, FAQ, FAQ, FAQ];
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
