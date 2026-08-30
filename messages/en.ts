import { projectCatalog } from "@/data/projects";
import type { Dictionary } from "@/types";

const dictionary = {
  localeName: "English",
  metadata: {
    title: "Apartment renovation in Yerevan and Armenia — SHINEX",
    description:
      "SHINEX is a renovation company in Yerevan for apartment renovation, complete apartment renovation, house construction, interior design, and commercial-space work.",
  },
  nav: {
    home: "Home",
    services: "Services",
    projects: "Projects",
    about: "About",
    contacts: "Get a consultation",
    privacy: "Privacy",
    consultation: "Get a consultation",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    language: "Language",
  },
  hero: {
    eyebrow: "Renovation and construction services",
    title: "Apartment renovation in Yerevan and Armenia",
    description:
      "SHINEX is a renovation and construction company in Yerevan. We deliver complete apartment renovation, house construction, interior design, and commercial-space work — from an initial estimate to handover.",
    primaryAction: "Get an initial estimate",
    secondaryAction: "View services",
    trustPoints: [
      "Initial estimate and detailed cost plan",
      "Construction and building-services work",
      "Interior design and material selection",
      "Yerevan and regional projects",
    ],
  },
  services: {
    eyebrow: "Main services",
    title: "Services for apartments, homes, and businesses",
    description:
      "Choose the service you need: renovation, private house construction, interior design, or additional construction work.",
    specializedTitle: "Additional construction services",
    viewAll: "All services",
    learnMore: "View service",
    pageTitle: "Renovation, interior design, and construction services",
    pageDescription:
      "Apartment and house renovation, private house construction, interior design, and individual construction work.",
    detail: {
      overview: "Service overview",
      included: "What the service includes",
      stages: "Work stages",
      audience: "Who it is for",
      customerTypes: "When this service is suitable",
      workTypes: "Work formats",
      estimateRequirements: "For an initial assessment",
      priceFactors: "What affects the cost",
      faq: "Frequently asked questions",
      requestEstimate: "Get an initial estimate",
      relatedProjects: "Related projects",
    },
  },
  projects: {
    eyebrow: "SHINEX portfolio",
    title: "Completed projects",
    description:
      "We publish only verified case studies and work details. The portfolio is expanded as materials are approved with clients.",
    viewAll: "View all projects",
    pageTitle: "Projects",
    pageDescription:
      "Residential, commercial, renovation, and outdoor project examples from Armenia.",
    availabilityTitle: "Our portfolio is taking shape",
    availabilityDescription:
      "As a new company, we do not publish demonstration or unverified projects here. Tell us about your plans and we will discuss the right scope of work.",
    availabilityAction: "Discuss a project",
    filters: {
      all: "All",
      privateHouses: "Private houses",
      commercial: "Commercial",
      renovation: "Renovation",
      inProgress: "In progress",
      completed: "Completed",
    },
    statusLabels: { completed: "Completed", "in-progress": "In progress" },
    detail: {
      location: "Location",
      objectType: "Object type",
      area: "Area",
      year: "Year",
      status: "Status",
      task: "Task",
      completedWorks: "Completed work",
      stages: "Stages",
      materials: "Materials",
      result: "Result",
      gallery: "Gallery",
      discussProject: "Discuss a similar project",
    },
    items: [
      {
        ...projectCatalog[0],
        location: "Dilijan, Tavush",
        title: "Family home in Dilijan",
        area: "To be confirmed by the project",
        year: "Demonstration project",
        task: "Organize a private house build around its site and natural setting.",
        completedWorks: [
          "Preparation and general construction",
          "Building-services and exterior detail coordination",
        ],
        stages: [
          "Design preparation",
          "Structural work",
          "Building services and finishes",
        ],
        materials: [
          "Materials are stated neutrally and are confirmed by approved project documentation.",
        ],
        result:
          "A demonstration of a coordinated home project without unverified price or timeline claims.",
      },
      {
        ...projectCatalog[1],
        location: "Yerevan",
        title: "Apartment renovation in Yerevan",
        area: "To be confirmed after measurement",
        year: "Demonstration project",
        task: "Update an existing apartment and improve everyday use of its layout.",
        completedWorks: [
          "Existing-condition assessment",
          "Building-services preparation",
          "Interior finishing",
        ],
        stages: [
          "Measurement and planning",
          "Preparatory work",
          "Final finishes",
        ],
        materials: [
          "Materials and systems are confirmed by the design and working documentation.",
        ],
        result: "A demonstration of a functionally updated apartment.",
      },
      {
        ...projectCatalog[2],
        location: "Tsaghkadzor, Kotayk",
        title: "Guesthouse in Tsaghkadzor",
        area: "To be confirmed by the project",
        year: "Demonstration project",
        task: "Create guest accommodation with a practical relationship between shared and private areas.",
        completedWorks: [
          "Current construction coordination",
          "Shared-area organization",
        ],
        stages: [
          "Design preparation",
          "Construction — in progress",
          "Finishes and handover — later stages",
        ],
        materials: [
          "Materials are selected and confirmed through the approved design.",
        ],
        result:
          "An in-progress demonstration; the final result will be recorded after completion.",
      },
      {
        ...projectCatalog[3],
        location: "Ashtarak, Aragatsotn",
        title: "Courtyard landscaping in Ashtarak",
        area: "To be confirmed by measurement",
        year: "Demonstration project",
        task: "Renovate a courtyard and the exterior areas connected to the house.",
        completedWorks: [
          "Base preparation",
          "Renewal of surfaces and exterior details",
        ],
        stages: ["Survey", "Preparation", "Execution and inspection"],
        materials: [
          "Specific materials are confirmed by the project and existing property conditions.",
        ],
        result: "A demonstration of a carefully renewed exterior area.",
      },
      {
        ...projectCatalog[4],
        location: "Sevan, Gegharkunik",
        title: "Lakeside home concept in Sevan",
        area: "To be confirmed by the project",
        year: "Demonstration project",
        task: "Deliver a private house responding to views, wind, and its relationship with the site.",
        completedWorks: ["Design preparation", "Initial construction work"],
        stages: [
          "Design",
          "Construction — in progress",
          "Building services and finishes — later stages",
        ],
        materials: [
          "All materials and structural solutions are confirmed by the approved project.",
        ],
        result:
          "An in-progress demonstration without unsupported timeline promises.",
      },
    ],
  },
  whyUs: {
    eyebrow: "Why SHINEX",
    title: "Why trust SHINEX with your project",
    description:
      "We discuss the work terms and changes in advance so every stage remains clear.",
    items: [
      {
        title: "Contract-based work",
        description:
          "The scope, responsibilities, and working procedure are recorded.",
      },
      {
        title: "Estimate agreed in advance",
        description:
          "We show the work list and cost, and agree changes before they are completed.",
      },
      {
        title: "Work organised in stages",
        description:
          "We plan the sequence of work and control the progress of every stage.",
      },
      {
        title: "Quality control",
        description:
          "Critical operations and the outcome of each stage are checked.",
      },
      {
        title: "Changes agreed in advance",
        description:
          "If the scope or solution needs to change during work, we agree it with you first.",
      },
      {
        title: "Working in Yerevan and the regions",
        description:
          "We accept projects in Yerevan and across Armenia, taking account of the property location and scope.",
      },
    ],
  },
  process: {
    eyebrow: "Our process",
    title: "Work stages — from the first call to handover",
    description:
      "At every stage, you know what we do, what you confirm, and what happens next.",
    steps: [
      {
        number: "01",
        title: "Initial consultation",
        description:
          "We clarify your brief and property type, then propose the next practical step.",
      },
      {
        number: "02",
        title: "Property survey and measurements",
        description:
          "We inspect the property or site, take measurements, and collect the data needed for an estimate.",
      },
      {
        number: "03",
        title: "Preparing solutions and an estimate",
        description:
          "We prepare the solutions, work stages, and initial estimate for your approval.",
      },
      {
        number: "04",
        title: "Signing the contract",
        description:
          "We record the agreed scope, terms, and procedure for changes.",
      },
      {
        number: "05",
        title: "Delivery and control of the work",
        description: "We organise and control the work in the agreed sequence.",
      },
      {
        number: "06",
        title: "Inspection and handover",
        description:
          "We inspect the completed work with you, finish agreed adjustments, and hand over the property.",
      },
    ],
  },
  estimate: {
    eyebrow: "Initial estimate",
    title: "Send your project details",
    description:
      "Provide the key property details. A specialist will review your enquiry and contact you to clarify the project.",
    fields: {
      objectType: "Property type",
      area: "Area, m²",
      region: "Region",
      workType: "Work type",
      name: "Name",
      phone: "Phone",
      comment: "Project description",
    },
    placeholders: {
      objectType: "Select a property type",
      area: "Enter an approximate area",
      region: "City or province",
      workType: "Select a work type",
      name: "Your name",
      phone: "+374 …",
      comment: "For example: 85 m² apartment, full renovation needed",
    },
    choices: {
      objectType: {
        privateHouse: "Private house",
        commercial: "Commercial property",
        apartment: "Apartment",
        other: "Other",
      },
      workType: {
        turnkey: "Turnkey construction",
        design: "Design",
        renovation: "Renovation",
        separateWorks: "Separate works",
      },
    },
    required: {
      objectType: true,
      area: true,
      region: true,
      workType: true,
      name: true,
      phone: true,
      comment: false,
    },
    errors: {
      objectTypeRequired: "Select a property type.",
      areaRequired: "Enter the area.",
      areaInvalid: "Enter the area as a positive number.",
      regionRequired: "Enter the region.",
      workTypeRequired: "Select a work type.",
      nameRequired: "Enter your name.",
      phoneRequired: "Enter your phone number.",
      phoneInvalid: "Enter a valid phone number.",
    },
    submit: "Send an initial-estimate enquiry",
    submitting: "Sending…",
    success:
      "Your enquiry has been sent. We will contact you to clarify the details.",
    error:
      "The enquiry could not be sent. Please try again or contact us directly.",
  },
  calculator: {
    eyebrow: "Cost calculator",
    title: "Calculate your project’s initial cost",
    description:
      "The calculator has four steps and does not require a phone number. Enter the property type, area, and required work to receive an initial cost. A precise estimate is prepared after a survey and clarification of the details.",
    steps: {
      objectType: "Property",
      workType: "Work",
      area: "Area",
      location: "Region",
      options: "Details",
      contact: "Contact",
      result: "Result",
    },
    objectType: {
      title: "What type of property is it?",
      description: "Choose the closest option.",
      choices: {
        privateHouse: "Private house",
        commercial: "Commercial property",
        apartment: "Apartment",
        other: "Other",
      },
    },
    workType: {
      title: "What work do you need?",
      description: "This helps select the right basis for your estimate.",
      choices: {
        turnkey: "Turnkey construction",
        design: "Design",
        renovation: "Renovation",
        separateWorks: "Individual works",
      },
    },
    area: {
      title: "Enter the area",
      description:
        "Use an approximate area if the exact figure is not available.",
      label: "Area, m²",
      placeholder: "For example, 120",
    },
    location: {
      title: "Where is the property located?",
      description: "Enter the city or region to help assess logistics.",
      label: "City or region",
      placeholder: "For example, Yerevan",
    },
    options: {
      title: "What else should we consider?",
      description: "Select items that apply. You may skip this step.",
      choices: {
        designDocumentation: "Design documentation is needed",
        materials: "Material selection is needed",
        siteConditions: "The site or property has special conditions",
      },
    },
    contact: {
      title: "How can we reach you?",
      description:
        "Leave your details so we can discuss the estimate and next step.",
      nameLabel: "Name",
      phoneLabel: "Phone",
      commentLabel: "Comment",
      namePlaceholder: "Your name",
      phonePlaceholder: "+374 …",
      commentPlaceholder: "Additional project details",
    },
    result: {
      title: "Preliminary estimate",
      rangeLabel: "Indicative range",
      preliminaryNotice:
        "The calculation is preliminary. The exact cost is determined after clarifying the scope of work, materials, and inspecting the property.",
      pricingUnavailable:
        "Cost ranges have not been published yet. We have your details and will clarify an initial guide with you directly.",
      sendRequest: "Send request",
      sending: "Sending…",
      success: "Thank you! Your request has been received.",
      error: "We could not send the request. Please try again.",
    },
    navigation: { back: "Back", next: "Next", calculate: "Show estimate" },
    errors: {
      objectTypeRequired: "Choose a property type.",
      workTypeRequired: "Choose a work type.",
      areaRequired: "Enter the area.",
      areaInvalid: "Enter a valid area.",
      regionRequired: "Enter a region.",
      nameRequired: "Enter your name.",
      phoneRequired: "Enter your phone number.",
      phoneInvalid: "Enter a valid phone number.",
    },
  },
  constructionCalculator: {
    dialog: {
      eyebrow: "Online calculator",
      title: "Preliminary project cost",
      close: "Close calculator",
      open: "Open calculator",
    },
    steps: {
      scenario: {
        title: "Choose a service",
        description:
          "Choose renovation, home construction, design, or work for a commercial property.",
      },
      parameters: {
        title: "Property details",
        description:
          "Enter approximate details. Exact measurements can be confirmed after a survey.",
      },
      constructionExtras: {
        title: "Additional construction conditions",
        description:
          "Select only the details you already know about the project.",
      },
      renovationExtras: {
        title: "Additional work",
        description:
          "The selected work is immediately included in the indicative cost.",
      },
      wallWorks: {
        title: "Internal wall work",
        description:
          "Select the work to estimate its cost from the approximate wall area.",
      },
    },
    fields: {
      area: "Area, m²",
      bathrooms: "Bathrooms",
      houseShape: "House shape",
      constructionType: "Construction type",
      basementArea: "Basement area, m²",
      garageArea: "Garage area, m²",
      terraceArea: "Terrace area, m²",
      currentCondition: "Current condition",
      renovationLevel: "Renovation level",
      distance: "Distance from the city, km",
      distanceHint: "If the property is outside the city.",
      heatedFloorArea: "Underfloor-heating area, m²",
      doorsCount: "Number of doors",
      ceilingHeight: "Ceiling height, m",
      roomsCount: "Number of rooms",
      layoutDensity: "Layout complexity",
    },
    quickScenarios: {
      apartmentOrPrivateHouseRenovation: {
        title: "Apartment renovation",
        description: "Assess an apartment renovation",
      },
      houseConstruction: {
        title: "House construction",
        description: "Assess construction",
      },
      interiorDesign: {
        title: "Interior design",
        description: "Layouts and interior solutions",
      },
      commercial: {
        title: "Commercial property",
        description: "Office, retail, or service space",
      },
    },
    construction: {
      packages: {
        shell: {
          title: "Structural shell",
          description: "Foundations, walls, floors, and roof.",
        },
        rough: {
          title: "Rough completion",
          description:
            "Shell, windows, building services, plaster, and screed.",
        },
        turnkey: {
          title: "Turnkey",
          description:
            "Construction, building services, and basic interior finishing.",
        },
      },
      materials: {
        aeratedConcrete: "Aerated concrete",
        stone: "Stone",
        monolith: "Monolithic concrete",
        frame: "Frame construction",
      },
      houseShapes: {
        rectangle: "Rectangular",
        lShape: "L-shaped",
        complex: "Complex",
      },
      extras: {
        basement: "Basement",
        garage: "Garage",
        terrace: "Terrace",
        highCeilings: "Ceilings above 3 metres",
        difficultSite: "Complex site",
        distance: "Distance from the city",
      },
    },
    renovation: {
      conditions: {
        newWithoutFinish: "New build without finishes",
        roughFinish: "Rough finish",
        oldRenovation: "Existing old renovation",
        partiallyRenovated: "Partially renovated property",
      },
      levels: {
        cosmetic: "Cosmetic",
        standard: "Standard",
        capital: "Capital",
        premium: "Premium",
      },
      extras: {
        demolition: "Demolition of old finishes",
        electrical: "Electrical replacement",
        plumbing: "Plumbing replacement",
        heatedFloor: "Underfloor heating",
        doors: "Internal door installation",
      },
    },
    wallWorks: {
      layoutDensity: {
        open: "Open layout",
        standard: "Standard layout",
        complex: "Many rooms, partitions, and corridors",
      },
      works: {
        plastering: "Wall plastering",
        putty: "Wall puttying",
        painting: "Wall painting",
        wallpaper: "Wallpaper installation",
        wallDemolition: "Wall-covering removal",
      },
      resultTitle: "Preliminary wall calculation",
      wallAreaLabel: "Approximate internal wall area: {area} m²",
      calculationDetails:
        "Partition length: {length} m; area before openings: {grossArea} m²; openings: −{openingsArea} m².",
      totalLabel: "Total wall work",
      unit: "m²",
      noWorksSelected: "No wall work selected.",
      notice:
        "This calculation is preliminary. The actual wall area and work cost depend on the layout, number of partitions, door openings, surface condition, and chosen materials.",
    },
    design: {
      basic: {
        title: "Basic design",
        description: "Layout and stylistic direction.",
      },
      full: {
        title: "Full design project",
        description: "Drawings, visualizations, and material selection.",
      },
      supervision: {
        title: "With design supervision",
        description: "A design project with implementation support.",
      },
    },
    result: {
      title: "Initial assessment",
      range: "Next step",
      included: "Included",
      empty: "Enter approximate details to prepare for a project discussion.",
      pricingUnavailable:
        "Public cost ranges are not published yet. Leave the key details and we will clarify an initial guide after reviewing the brief.",
      calculate: "Calculate cost",
      calculateDescription:
        "See the preliminary total and a breakdown of the selected work.",
      ready: "Select the button to see the preliminary cost.",
      total: "Estimated total",
      notice:
        "The exact cost is determined after the brief, materials, property conditions, and survey are clarified.",
      constructionIncrease: "+{percentage}% of the construction cost",
      distanceNote: "{distance} km",
      renovationLine: "Renovation: {level}",
      loading: "Calculating estimate…",
      workBreakdownTitle: "Selected work estimate",
      renovationScopeTitle: "Approximate work quantities",
      floorAreaLabel: "Floor and room area",
      units: {
        squareMeter: "m²",
        bathroom: "bathroom",
        item: "pcs",
        kilometer: "km",
      },
      surfaceWorks: {
        floor: "Floor preparation and finishing",
        ceiling: "Ceiling preparation and finishing",
        internalWalls: "Internal walls",
        exteriorWalls: "Exterior walls",
      },
    },
    validation: {
      areaRequired: "Enter the area.",
      areaOutOfRange: "Enter an area from 1 to 100,000 m².",
      basementAreaRequired: "Enter the basement area.",
      garageAreaRequired: "Enter the garage area.",
      terraceAreaRequired: "Enter the terrace area.",
      distanceInvalid:
        "Enter a distance from the city as a non-negative number.",
      bathroomsRequired: "Enter the number of bathrooms.",
      heatedFloorAreaRequired:
        "Enter an underfloor-heating area no larger than the property area.",
      doorsCountRequired: "Enter the number of doors.",
      renovationAreaOutOfRange: "Enter an area from 10 to 2,000 m².",
      ceilingHeightOutOfRange: "Enter a ceiling height from 2 to 6 m.",
      roomsCountOutOfRange: "Enter a number of rooms from 1 to 50.",
    },
    estimateSectionDescription:
      "The calculator shows an initial cost. A precise estimate is prepared after a property survey and clarification of the work.",
  },
  testimonials: {
    eyebrow: "Testimonials",
    title: "The collaboration experience",
    description:
      "Entries in this section are temporary demonstration content and are not statements from real clients.",
    placeholderNotice: "DEMO TESTIMONIAL — replace before publishing",
    items: [
      {
        name: "Demo client",
        role: "Residential project",
        quote:
          "Demonstration copy used only to test the appearance and length of a testimonial card.",
        isPlaceholder: true,
      },
      {
        name: "Demo partner",
        role: "Commercial project",
        quote:
          "A temporary example that must be replaced with a verified testimonial approved for publication.",
        isPlaceholder: true,
      },
      {
        name: "Demo customer",
        role: "Renovation",
        quote:
          "This entry does not represent a real person or their experience of a completed project.",
        isPlaceholder: true,
      },
    ],
  },
  faq: {
    eyebrow: "Frequently asked questions",
    title: "Frequently asked questions about renovation and construction",
    description:
      "Here is what is useful to know before you request an initial estimate.",
    items: [
      {
        question: "What affects the cost of renovation?",
        answer:
          "It depends on the area, property condition, demolition scope, building-services work, finish complexity, and selected materials. A precise estimate follows clarification and a survey.",
      },
      {
        question: "What may be included in a turnkey renovation?",
        answer:
          "The scope depends on the property and the brief. After a survey, we can identify whether demolition, building services, preparation, finishes, and handover are needed.",
      },
      {
        question: "Can I order separate renovation stages?",
        answer:
          "Yes. We discuss the required work and agree a sequence after reviewing the property.",
      },
      {
        question: "How long can renovation take?",
        answer:
          "Timing depends on the area, condition, scope, and material supply. A practical stage plan is discussed after a survey.",
      },
      {
        question: "Who buys the materials?",
        answer:
          "The arrangement is chosen for the project and agreed with the scope. We can discuss what help with selection and purchasing is needed before work starts.",
      },
      {
        question: "Is a design project required?",
        answer:
          "Not always. It is useful when the layout, solutions, and materials need to be worked through in advance; its scope follows the project.",
      },
      {
        question: "How is the cost of house construction calculated?",
        answer:
          "An initial range depends on the area, site, structural and building-services solutions, and selected completion level.",
      },
      {
        question: "Do you work outside Yerevan?",
        answer:
          "We consider properties in Yerevan and the regions of Armenia. Site visits and logistics are confirmed for each project.",
      },
      {
        question: "How do I start?",
        answer:
          "Send the property type, approximate area, location, and a description of the work you need. We will then arrange an initial consultation or property survey.",
      },
    ],
  },
  cta: {
    title: "Planning renovation or construction?",
    description:
      "Send the key project details and we will identify the right next step: an estimate or a site survey.",
    primaryAction: "Send project details",
    secondaryAction: "Request a property survey",
  },
  footer: {
    description: "Renovation, interior design, and construction in Armenia.",
    navigation: "Navigation",
    services: "Services",
    contacts: "Contacts",
    rights: "All rights reserved.",
    privacy: "Privacy policy",
  },
  about: {
    eyebrow: "About SHINEX",
    title: "A clear way to organize renovation and construction",
    intro:
      "SHINEX develops renovation and construction services in Armenia with an emphasis on clear organization, initial assessment, agreed stages, and convenient communication with clients.",
    storyTitle: "How the work is organized",
    story: [
      "We begin by understanding the task, the space, and the expected result rather than starting with a pre-made promise.",
      "We shape the scope so the client can understand the stages, decision points, and each party's responsibilities.",
    ],
    valuesTitle: "Core areas",
    values: [
      {
        title: "Apartment and house renovation",
        description:
          "We help define the work scope and agree the sequence of stages.",
      },
      {
        title: "Private house construction",
        description:
          "We discuss the site, design information, and the next practical step.",
      },
      {
        title: "Commercial and specialist work",
        description:
          "We consider commercial-space projects and individual construction stages.",
      },
    ],
    approachTitle: "How decisions are made",
    approach:
      "We align the design purpose, actual site conditions, and delivery sequence without adding unsupported solutions.",
    team: {
      title: "Team",
      description:
        "Roles join a project according to its task and current stage.",
      placeholderNotice:
        "TEMPORARY CARDS — replace with verified team information before publishing",
      members: [
        {
          role: "Project manager",
          description:
            "Temporary unnamed role: workflow and communication coordination.",
          isPlaceholder: true,
        },
        {
          role: "Engineer / technical specialist",
          description:
            "Temporary unnamed role: technical review of solutions and stages.",
          isPlaceholder: true,
        },
        {
          role: "Architect / designer",
          description:
            "Temporary unnamed role: architectural and planning solutions.",
          isPlaceholder: true,
        },
      ],
    },
  },
  contacts: {
    eyebrow: "Contacts",
    title: "Let's discuss your project",
    description:
      "Write or call with the property's location and a broad description of the work you need.",
    phone: "Phone",
    email: "Email",
    address: "Address",
    hours: "Working hours",
    messengers: "Messengers",
    whatsapp: "WhatsApp",
    telegram: "Telegram",
    mapPlaceholder:
      "Map placeholder — the exact address will appear after contact details are replaced.",
    methodsTitle: "Choose a convenient way to contact us",
    methodsDescription:
      "Call, write in a messenger, or send us a message through the website.",
    formTitle: "Send a message",
    formDescription:
      "We need your contact details and a short description to respond to your enquiry.",
    closeAfterSending: "This window will close automatically.",
  },
  privacy: {
    title: "Privacy policy",
    updated: "Last updated: add the publication date before launch",
    intro:
      "This policy explains how information submitted through the website's forms may be processed.",
    sections: [
      {
        title: "Information we receive",
        paragraphs: [
          "We may receive your name, phone number, email address, and any project information you choose to provide.",
        ],
      },
      {
        title: "Why we process it",
        paragraphs: [
          "The information is used to answer your enquiry, clarify requirements, and discuss potential cooperation.",
        ],
      },
      {
        title: "Storage and disclosure",
        paragraphs: [
          "Information should not be retained longer than necessary or shared with third parties except where required by law or to operate the service technically.",
        ],
      },
      {
        title: "Your rights",
        paragraphs: [
          "You may request correction or deletion of your information using the email address listed on this website.",
        ],
      },
    ],
  },
  common: {
    home: "Home",
    back: "Back",
    next: "Next",
    previous: "Previous",
    readMore: "Read more",
    showMore: "Show more",
    showLess: "Show less",
    loading: "Loading…",
    required: "Required",
    optional: "Optional",
    notFoundTitle: "Page not found",
    notFoundDescription:
      "The address may have changed or the page may no longer be available.",
    returnHome: "Return home",
    breadcrumbs: "Breadcrumbs",
    errors: {
      required: "Complete this required field.",
      invalidEmail: "Enter a valid email address.",
      invalidPhone: "Enter a valid phone number.",
      generic: "Something went wrong. Please try again.",
    },
    success: { sent: "Your message was sent successfully." },
  },
} satisfies Dictionary;

export default dictionary;
