import { projectCatalog } from "@/data/projects";
import type { Dictionary } from "@/types";

const dictionary = {
  localeName: "Français",
  metadata: {
    title: "Entreprise de construction et de rénovation en Arménie — SHINEX",
    description:
      "SHINEX construit des maisons, rénove des logements et des locaux professionnels et conçoit des intérieurs à Erevan et dans toute l’Arménie. Parlons de votre projet.",
    manifestDescription:
      "Rénovation d’appartements et de maisons, construction et aménagement intérieur en Arménie.",
  },
  nav: {
    home: "Accueil",
    services: "Services",
    projects: "Projets",
    about: "À propos",
    contacts: "Demander conseil",
    privacy: "Confidentialité",
    consultation: "Demander conseil",
    openMenu: "Ouvrir le menu",
    closeMenu: "Fermer le menu",
    language: "Langue",
  },
  hero: {
    eyebrow: "Services de rénovation et de construction",
    title: "Construction, rénovation et aménagement intérieur en Arménie",
    description:
      "De la construction d’une maison à la rénovation d’un appartement ou de locaux professionnels, SHINEX vous accompagne dans la préparation et la réalisation de votre projet. Nous étudions d’abord le bien et les travaux souhaités, puis établissons une première estimation.",
    primaryAction: "Demander conseil",
    secondaryAction: "Voir les services",
    trustPoints: [
      "Première estimation et budget détaillé",
      "Construction et équipements techniques du bâtiment",
      "Aménagement intérieur et choix des matériaux",
      "Projets dans toute l’Arménie",
    ],
  },
  services: {
    eyebrow: "Nos principaux services",
    title: "Des services pour les appartements, les maisons et les entreprises",
    description:
      "Choisissez le service dont vous avez besoin : rénovation, construction de maison, aménagement intérieur ou travaux complémentaires.",
    specializedTitle: "Travaux de construction complémentaires",
    viewAll: "Tous les services",
    learnMore: "Voir le service",
    pageTitle:
      "Services de rénovation, d’aménagement intérieur et de construction",
    pageDescription:
      "Rénovation d’appartements et de maisons, construction de maisons, aménagement intérieur et travaux spécifiques.",
    detail: {
      overview: "Présentation du service",
      included: "Ce que comprend le service",
      stages: "Étapes des travaux",
      audience: "À qui s’adresse ce service ?",
      customerTypes: "Dans quels cas choisir ce service ?",
      workTypes: "Étendue des travaux",
      estimateRequirements: "Pour une première évaluation",
      priceFactors: "Ce qui influence le coût",
      faq: "Questions fréquentes",
      requestEstimate: "Demander une première estimation",
      relatedProjects: "Projets similaires",
    },
  },
  projects: {
    eyebrow: "Réalisations SHINEX",
    title: "Projets réalisés",
    description:
      "Nous publions uniquement des projets et des détails de travaux vérifiés. Le portfolio s’enrichit à mesure que les contenus sont validés avec nos clients.",
    viewAll: "Voir tous les projets",
    pageTitle: "Projets",
    pageDescription:
      "Exemples de projets résidentiels, commerciaux, de rénovation et d’aménagement extérieur en Arménie.",
    availabilityTitle: "Notre portfolio prend forme",
    availabilityDescription:
      "Notre entreprise étant récente, nous ne publions ici ni projets de démonstration ni références non vérifiées. Faites-nous part de vos projets pour définir ensemble les travaux adaptés.",
    availabilityAction: "Discuter d’un projet",
    filters: {
      all: "Tous",
      privateHouses: "Maisons individuelles",
      commercial: "Locaux professionnels",
      renovation: "Rénovation",
      inProgress: "En cours",
      completed: "Terminé",
    },
    statusLabels: { completed: "Terminé", "in-progress": "En cours" },
    detail: {
      location: "Localisation",
      objectType: "Type de bien",
      area: "Surface",
      year: "Année",
      status: "État",
      task: "Objectif",
      completedWorks: "Travaux réalisés",
      stages: "Étapes",
      materials: "Matériaux",
      result: "Résultat",
      gallery: "Galerie",
      discussProject: "Discuter d’un projet similaire",
    },
    items: [
      {
        ...projectCatalog[0],
        location: "Dilidjan, Tavouch",
        title: "Maison familiale à Dilidjan",
        area: "À confirmer selon le projet",
        year: "Projet de démonstration",
        task: "Organiser la construction d’une maison en tenant compte du terrain et de son environnement naturel.",
        completedWorks: [
          "Préparation et travaux de construction générale",
          "Coordination des équipements techniques et des détails extérieurs",
        ],
        stages: [
          "Préparation du projet",
          "Gros œuvre",
          "Équipements techniques et finitions",
        ],
        materials: [
          "Les matériaux sont décrits de façon neutre et confirmés dans les documents de projet approuvés.",
        ],
        result:
          "Un exemple de projet de maison coordonné, sans indication de prix ou de délais non vérifiée.",
      },
      {
        ...projectCatalog[1],
        location: "Erevan",
        title: "Rénovation d’appartement à Erevan",
        area: "À confirmer après les mesures",
        year: "Projet de démonstration",
        task: "Rénover un appartement existant et rendre son agencement plus pratique au quotidien.",
        completedWorks: [
          "Évaluation de l’état existant",
          "Préparation des réseaux techniques",
          "Finitions intérieures",
        ],
        stages: [
          "Mesures et planification",
          "Travaux préparatoires",
          "Finitions finales",
        ],
        materials: [
          "Les matériaux et les systèmes sont confirmés dans les documents de conception et d’exécution.",
        ],
        result:
          "Un exemple d’appartement rénové pour un usage plus fonctionnel.",
      },
      {
        ...projectCatalog[2],
        location: "Tsaghkadzor, Kotayk",
        title: "Maison d’hôtes à Tsaghkadzor",
        area: "À confirmer selon le projet",
        year: "Projet de démonstration",
        task: "Créer un hébergement avec une articulation pratique entre espaces communs et privés.",
        completedWorks: [
          "Coordination des travaux en cours",
          "Organisation des espaces communs",
        ],
        stages: [
          "Préparation du projet",
          "Construction — en cours",
          "Finitions et livraison — étapes ultérieures",
        ],
        materials: [
          "Les matériaux sont sélectionnés et confirmés dans le cadre du projet approuvé.",
        ],
        result:
          "Un projet de démonstration en cours ; le résultat final sera documenté à l’achèvement.",
      },
      {
        ...projectCatalog[3],
        location: "Achtarak, Aragatsotn",
        title: "Aménagement d’une cour à Achtarak",
        area: "À confirmer par les mesures",
        year: "Projet de démonstration",
        task: "Rénover une cour et les espaces extérieurs attenants à la maison.",
        completedWorks: [
          "Préparation du support",
          "Rénovation des surfaces et des éléments extérieurs",
        ],
        stages: ["Visite sur place", "Préparation", "Exécution et contrôle"],
        materials: [
          "Les matériaux précis sont confirmés selon le projet et l’état existant du bien.",
        ],
        result: "Un exemple d’espace extérieur rénové avec soin.",
      },
      {
        ...projectCatalog[4],
        location: "Sevan, Gegharkounik",
        title: "Concept de maison au bord du lac à Sevan",
        area: "À confirmer selon le projet",
        year: "Projet de démonstration",
        task: "Réaliser une maison en tenant compte des vues, du vent et de son implantation sur le terrain.",
        completedWorks: [
          "Préparation du projet",
          "Premiers travaux de construction",
        ],
        stages: [
          "Conception",
          "Construction — en cours",
          "Équipements techniques et finitions — étapes ultérieures",
        ],
        materials: [
          "Tous les matériaux et les solutions structurelles sont confirmés dans le projet approuvé.",
        ],
        result:
          "Un projet de démonstration en cours, sans promesses de délais non étayées.",
      },
    ],
  },
  whyUs: {
    eyebrow: "Pourquoi SHINEX",
    title: "Pourquoi confier votre projet à SHINEX",
    description:
      "Nous discutons à l’avance des modalités des travaux et des modifications pour que chaque étape reste claire.",
    items: [
      {
        title: "Travaux encadrés par un contrat",
        description:
          "L’étendue des travaux, les responsabilités et les modalités d’exécution sont consignées.",
      },
      {
        title: "Devis convenu à l’avance",
        description:
          "Nous détaillons les travaux et leur coût, et convenons des modifications avant leur exécution.",
      },
      {
        title: "Des travaux organisés par étapes",
        description:
          "Nous planifions l’ordre des travaux et suivons l’avancement de chaque étape.",
      },
      {
        title: "Contrôle qualité",
        description:
          "Les opérations essentielles et le résultat de chaque étape sont contrôlés.",
      },
      {
        title: "Des modifications validées à l’avance",
        description:
          "Si l’étendue des travaux ou les solutions doivent évoluer en cours de chantier, nous en convenons d’abord avec vous.",
      },
      {
        title: "Interventions dans toute l’Arménie",
        description:
          "Nous prenons en charge des projets dans toute l’Arménie, notamment à Erevan, en tenant compte de la localisation du bien et des travaux prévus.",
      },
    ],
  },
  process: {
    eyebrow: "Notre méthode",
    title: "Les étapes des travaux, du premier appel à la livraison",
    description:
      "À chaque étape, vous savez ce que nous faisons, ce que vous validez et ce qui vient ensuite.",
    steps: [
      {
        number: "01",
        title: "Premier échange",
        description:
          "Nous précisons votre besoin et le type de bien, puis proposons la prochaine étape concrète.",
      },
      {
        number: "02",
        title: "Visite du bien et prise de mesures",
        description:
          "Nous visitons le bien ou le terrain, prenons les mesures et réunissons les informations nécessaires à l’estimation.",
      },
      {
        number: "03",
        title: "Préparation des solutions et du devis",
        description:
          "Nous préparons les solutions, les étapes des travaux et une première estimation à vous soumettre.",
      },
      {
        number: "04",
        title: "Signature du contrat",
        description:
          "Nous consignons le périmètre convenu, les modalités et la procédure de modification.",
      },
      {
        number: "05",
        title: "Réalisation et suivi des travaux",
        description:
          "Nous organisons et contrôlons les travaux dans l’ordre convenu.",
      },
      {
        number: "06",
        title: "Contrôle et livraison",
        description:
          "Nous vérifions les travaux achevés avec vous, effectuons les ajustements convenus et livrons le bien.",
      },
    ],
  },
  estimate: {
    eyebrow: "Première estimation",
    title: "Envoyez les détails de votre projet",
    description:
      "Indiquez les principales caractéristiques du bien. Un spécialiste étudiera votre demande et vous contactera pour préciser le projet.",
    fields: {
      objectType: "Type de bien",
      area: "Surface, m²",
      region: "Région",
      workType: "Type de travaux",
      name: "Nom",
      phone: "Téléphone",
      comment: "Description du projet",
    },
    placeholders: {
      objectType: "Sélectionnez un type de bien",
      area: "Indiquez une surface approximative",
      region: "Ville ou province",
      workType: "Sélectionnez un type de travaux",
      name: "Votre nom",
      phone: "+374 …",
      comment: "Par exemple : appartement de 85 m² à rénover entièrement",
    },
    choices: {
      objectType: {
        privateHouse: "Maison individuelle",
        commercial: "Local professionnel",
        apartment: "Appartement",
        other: "Autre",
      },
      workType: {
        turnkey: "Construction clé en main",
        design: "Conception",
        renovation: "Rénovation",
        separateWorks: "Travaux spécifiques",
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
      objectTypeRequired: "Sélectionnez un type de bien.",
      areaRequired: "Indiquez la surface.",
      areaInvalid: "Indiquez la surface sous forme de nombre positif.",
      regionRequired: "Indiquez la région.",
      workTypeRequired: "Sélectionnez un type de travaux.",
      nameRequired: "Indiquez votre nom.",
      phoneRequired: "Indiquez votre numéro de téléphone.",
      phoneInvalid: "Indiquez un numéro de téléphone valide.",
    },
    submit: "Envoyer une demande d’estimation",
    submitting: "Envoi en cours…",
    success:
      "Votre demande a été envoyée. Nous vous contacterons pour préciser les détails.",
    error:
      "La demande n’a pas pu être envoyée. Réessayez ou contactez-nous directement.",
  },
  calculator: {
    eyebrow: "Parlons de votre projet",
    title: "Vous prévoyez une rénovation ou une construction ?",
    description:
      "Parlez-nous de votre bien et des travaux envisagés. Contactez-nous par le moyen qui vous convient pour discuter des détails et des prochaines étapes.",
    steps: {
      objectType: "Bien",
      workType: "Travaux",
      area: "Surface",
      location: "Région",
      options: "Détails",
      contact: "Contact",
      result: "Résultat",
    },
    objectType: {
      title: "De quel type de bien s’agit-il ?",
      description: "Choisissez l’option la plus proche.",
      choices: {
        privateHouse: "Maison individuelle",
        commercial: "Local professionnel",
        apartment: "Appartement",
        other: "Autre",
      },
    },
    workType: {
      title: "Quels travaux souhaitez-vous réaliser ?",
      description:
        "Cela permet de choisir la bonne base pour votre estimation.",
      choices: {
        turnkey: "Construction clé en main",
        design: "Conception",
        renovation: "Rénovation",
        separateWorks: "Travaux spécifiques",
      },
    },
    area: {
      title: "Indiquez la surface",
      description:
        "Indiquez une surface approximative si vous ne connaissez pas la valeur exacte.",
      label: "Surface, m²",
      placeholder: "Par exemple, 120",
    },
    location: {
      title: "Où se situe le bien ?",
      description:
        "Indiquez la ville ou la région pour nous aider à évaluer la logistique.",
      label: "Ville ou région",
      placeholder: "Par exemple, Erevan",
    },
    options: {
      title: "Que devons-nous prendre en compte d’autre ?",
      description:
        "Sélectionnez les éléments pertinents. Vous pouvez passer cette étape.",
      choices: {
        designDocumentation: "Des documents de conception sont nécessaires",
        materials: "Une aide au choix des matériaux est nécessaire",
        siteConditions:
          "Le terrain ou le bien présente des contraintes particulières",
      },
    },
    contact: {
      title: "Comment vous joindre ?",
      description:
        "Laissez vos coordonnées pour discuter de l’estimation et de la prochaine étape.",
      nameLabel: "Nom",
      phoneLabel: "Téléphone",
      commentLabel: "Commentaire",
      namePlaceholder: "Votre nom",
      phonePlaceholder: "+374 …",
      commentPlaceholder: "Informations complémentaires sur le projet",
    },
    result: {
      title: "Estimation préliminaire",
      rangeLabel: "Fourchette indicative",
      preliminaryNotice:
        "Le calcul est préliminaire. Le coût exact est déterminé après avoir précisé les travaux, les matériaux et visité le bien.",
      pricingUnavailable:
        "Les fourchettes de prix ne sont pas encore publiées. Nous disposons de vos informations et vous communiquerons directement une première indication.",
      sendRequest: "Envoyer la demande",
      sending: "Envoi en cours…",
      success: "Merci ! Votre demande a bien été reçue.",
      error: "Nous n’avons pas pu envoyer la demande. Veuillez réessayer.",
    },
    navigation: {
      back: "Retour",
      next: "Suivant",
      calculate: "Afficher l’estimation",
    },
    errors: {
      objectTypeRequired: "Choisissez un type de bien.",
      workTypeRequired: "Choisissez un type de travaux.",
      areaRequired: "Indiquez la surface.",
      areaInvalid: "Indiquez une surface valide.",
      regionRequired: "Indiquez une région.",
      nameRequired: "Indiquez votre nom.",
      phoneRequired: "Indiquez votre numéro de téléphone.",
      phoneInvalid: "Indiquez un numéro de téléphone valide.",
    },
  },
  constructionCalculator: {
    renovationContact: {
      title: "Discuter de votre rénovation",
      description:
        "Contactez SHINEX et décrivez ce que vous souhaitez rénover. Nous discuterons de l’état du bien, des travaux souhaités et des prochaines étapes pour une visite et un devis.",
      action: "Discuter de votre rénovation",
    },
    dialog: {
      eyebrow: "Calculateur en ligne",
      title: "Coût préliminaire du projet",
      close: "Fermer le calculateur",
      open: "Ouvrir le calculateur",
    },
    steps: {
      scenario: {
        title: "Choisissez un service",
        description:
          "Contactez-nous pour une rénovation ou obtenez un premier calcul pour la construction d’une maison et la conception.",
      },
      parameters: {
        title: "Caractéristiques du bien",
        description:
          "Indiquez des données approximatives. Les mesures exactes pourront être confirmées après une visite.",
      },
      constructionExtras: {
        title: "Conditions de construction supplémentaires",
        description:
          "Sélectionnez uniquement les détails du projet que vous connaissez déjà.",
      },
      renovationExtras: {
        title: "Travaux supplémentaires",
        description:
          "Les travaux sélectionnés sont immédiatement inclus dans le coût indicatif.",
      },
      wallWorks: {
        title: "Travaux sur les murs intérieurs",
        description:
          "Sélectionnez les travaux pour estimer leur coût à partir de la surface approximative des murs.",
      },
    },
    fields: {
      finishLevel: "Qualité des finitions",
      renovationType: "Étendue de la rénovation",
      area: "Surface, m²",
      bathrooms: "Salles de bains",
      houseShape: "Forme de la maison",
      constructionType: "Type de construction",
      basementArea: "Surface du sous-sol, m²",
      garageArea: "Surface du garage, m²",
      terraceArea: "Surface de la terrasse, m²",
      currentCondition: "État actuel",
      renovationLevel: "Niveau de rénovation",
      distance: "Distance de la ville, km",
      distanceHint: "Si le bien est situé hors de la ville.",
      heatedFloorArea: "Surface du chauffage au sol, m²",
      doorsCount: "Nombre de portes",
      ceilingHeight: "Hauteur sous plafond, m",
      roomsCount: "Nombre de pièces",
      layoutDensity: "Complexité de l’agencement",
    },
    quickScenarios: {
      apartmentOrPrivateHouseRenovation: {
        title: "Rénovation d’appartement",
        description: "Contactez-nous pour discuter des travaux et du coût",
      },
      houseConstruction: {
        title: "Construction de maison",
        description: "Estimer la construction",
      },
      interiorDesign: {
        title: "Aménagement intérieur",
        description: "Plans d’agencement et solutions d’intérieur",
      },
      commercial: {
        title: "Local professionnel",
        description: "Contactez-nous pour discuter des travaux et du coût",
      },
    },
    construction: {
      packages: {
        shell: {
          title: "Gros œuvre",
          description: "Fondations, murs, planchers et toiture.",
        },
        rough: {
          title: "Second œuvre préparatoire",
          description:
            "Gros œuvre, fenêtres, réseaux techniques, enduits et chape.",
        },
        turnkey: {
          title: "Clé en main",
          description:
            "Construction, réseaux techniques et finitions intérieures de base.",
        },
      },
      materials: {
        aeratedConcrete: "Béton cellulaire",
        stone: "Pierre",
        monolith: "Béton monolithique",
        frame: "Construction à ossature",
      },
      houseShapes: {
        rectangle: "Rectangulaire",
        lShape: "En L",
        complex: "Complexe",
      },
      extras: {
        basement: "Sous-sol",
        garage: "Garage",
        terrace: "Terrasse",
        highCeilings: "Plafonds de plus de 3 mètres",
        difficultSite: "Terrain complexe",
        distance: "Distance de la ville",
      },
    },
    renovation: {
      finishLevels: {
        standard: "Standard",
        high: "Amélioré",
        premium: "Haut de gamme",
      },
      types: {
        cosmetic: "Rafraîchissement",
        capital: "Rénovation lourde",
        complete: "Rénovation complète",
      },
      conditions: {
        newWithoutFinish: "Construction neuve sans finitions",
        roughFinish: "Intérieur brut partiellement préparé",
        oldRenovation: "Bien ancien avec finitions existantes",
        partiallyRenovated: "Bien partiellement rénové",
      },
      levels: {
        cosmetic: "Rafraîchissement",
        standard: "Standard",
        capital: "Rénovation lourde",
        premium: "Haut de gamme",
      },
      extras: {
        demolition: "Dépose des anciennes finitions",
        electrical: "Réfection de l’installation électrique",
        plumbing: "Remplacement de la plomberie",
        heatedFloor: "Chauffage au sol",
        doors: "Pose de portes intérieures",
      },
    },
    wallWorks: {
      layoutDensity: {
        open: "Plan ouvert",
        standard: "Agencement standard",
        complex: "Nombreuses pièces, cloisons et couloirs",
      },
      works: {
        plastering: "Enduit des murs",
        putty: "Lissage des murs",
        painting: "Peinture des murs",
        wallpaper: "Pose de papier peint",
        wallDemolition: "Dépose des revêtements muraux",
      },
      resultTitle: "Calcul préliminaire des murs",
      wallAreaLabel: "Surface approximative des murs intérieurs : {area} m²",
      calculationDetails:
        "Longueur des cloisons : {length} m ; surface avant déduction des ouvertures : {grossArea} m² ; ouvertures : −{openingsArea} m².",
      totalLabel: "Total des travaux sur les murs",
      unit: "m²",
      noWorksSelected: "Aucun travail sur les murs sélectionné.",
      notice:
        "Ce calcul est préliminaire. La surface réelle des murs et le coût des travaux dépendent de l’agencement, du nombre de cloisons, des ouvertures de portes, de l’état des surfaces et des matériaux choisis.",
    },
    design: {
      basic: {
        title: "Conception de base",
        description: "Agencement et orientation stylistique.",
      },
      full: {
        title: "Projet de conception complet",
        description: "Plans, visualisations et choix des matériaux.",
      },
      supervision: {
        title: "Avec suivi de conception",
        description:
          "Un projet de conception accompagné d’un suivi de réalisation.",
      },
    },
    result: {
      renovationParametersLine:
        "Étendue de la rénovation : {type} ; finitions : {finishLevel}",
      title: "Première évaluation",
      range: "Prochaine étape",
      included: "Inclus",
      empty:
        "Indiquez des données approximatives pour préparer l’échange sur votre projet.",
      pricingUnavailable:
        "Les fourchettes de prix publiques ne sont pas encore disponibles. Indiquez les informations essentielles ; nous vous donnerons une première indication après étude de votre besoin.",
      calculate: "Calculer le coût",
      calculateDescription:
        "Consultez le total préliminaire et le détail des travaux sélectionnés.",
      ready: "Cliquez sur le bouton pour afficher le coût préliminaire.",
      total: "Total estimé",
      notice:
        "Le coût exact est déterminé après clarification du besoin, des matériaux, de l’état du bien et de la visite.",
      constructionIncrease: "+{percentage}% du coût de construction",
      distanceNote: "{distance} km",
      renovationLine: "Rénovation : {level}",
      loading: "Calcul de l’estimation…",
      workBreakdownTitle: "Estimation des travaux sélectionnés",
      renovationScopeTitle: "Quantités approximatives des travaux",
      floorAreaLabel: "Surface du sol et des pièces",
      units: {
        squareMeter: "m²",
        bathroom: "salle de bains",
        item: "u.",
        kilometer: "km",
      },
      surfaceWorks: {
        floor: "Préparation et finition du sol",
        ceiling: "Préparation et finition du plafond",
        internalWalls: "Murs intérieurs",
        exteriorWalls: "Murs extérieurs",
      },
    },
    validation: {
      areaRequired: "Indiquez la surface.",
      areaOutOfRange: "Indiquez une surface de 1 à 100 000 m².",
      basementAreaRequired: "Indiquez la surface du sous-sol.",
      garageAreaRequired: "Indiquez la surface du garage.",
      terraceAreaRequired: "Indiquez la surface de la terrasse.",
      distanceInvalid:
        "Indiquez une distance de la ville supérieure ou égale à zéro.",
      bathroomsRequired: "Indiquez le nombre de salles de bains.",
      heatedFloorAreaRequired:
        "Indiquez une surface de chauffage au sol ne dépassant pas celle du bien.",
      doorsCountRequired: "Indiquez le nombre de portes.",
      renovationAreaOutOfRange: "Indiquez une surface de 10 à 2 000 m².",
      ceilingHeightOutOfRange: "Indiquez une hauteur sous plafond de 2 à 6 m.",
      roomsCountOutOfRange: "Indiquez un nombre de pièces de 1 à 50.",
    },
    estimateSectionDescription:
      "Contactez-nous pour discuter du coût de rénovation. Nous préciserons vos besoins et conviendrons des informations et de la visite nécessaires pour établir un devis.",
  },
  testimonials: {
    eyebrow: "Témoignages",
    title: "L’expérience de collaboration",
    description:
      "Les contenus de cette section sont des exemples temporaires et ne proviennent pas de vrais clients.",
    placeholderNotice:
      "TÉMOIGNAGE DE DÉMONSTRATION — à remplacer avant publication",
    items: [
      {
        name: "Client fictif",
        role: "Projet résidentiel",
        quote:
          "Texte de démonstration servant uniquement à tester l’apparence et la longueur d’une carte de témoignage.",
        isPlaceholder: true,
      },
      {
        name: "Partenaire fictif",
        role: "Projet commercial",
        quote:
          "Un exemple temporaire à remplacer par un témoignage vérifié et approuvé pour publication.",
        isPlaceholder: true,
      },
      {
        name: "Commanditaire fictif",
        role: "Rénovation",
        quote:
          "Ce contenu ne représente ni une personne réelle ni son expérience d’un projet réalisé.",
        isPlaceholder: true,
      },
    ],
  },
  faq: {
    eyebrow: "Questions fréquentes",
    title: "Questions fréquentes sur la rénovation et la construction",
    description:
      "Voici ce qu’il est utile de savoir avant de demander une première estimation.",
    items: [
      {
        question: "Qu’est-ce qui influence le coût d’une rénovation ?",
        answer:
          "Le coût dépend de la surface, de l’état du bien, des démolitions, des réseaux techniques, de la complexité des finitions et des matériaux choisis. Un devis précis suit l’étude du besoin et la visite.",
      },
      {
        question: "Que peut comprendre une rénovation clé en main ?",
        answer:
          "Le périmètre dépend du bien et de votre besoin. Après une visite, nous déterminons si des travaux de démolition, de réseaux, de préparation, de finition et de livraison sont nécessaires.",
      },
      {
        question:
          "Puis-je commander certaines étapes de rénovation seulement ?",
        answer:
          "Oui. Nous discutons des travaux nécessaires et convenons de leur ordre après avoir étudié le bien.",
      },
      {
        question: "Combien de temps peut durer une rénovation ?",
        answer:
          "La durée dépend de la surface, de l’état du bien, des travaux et de l’approvisionnement. Un planning réaliste par étapes est discuté après la visite.",
      },
      {
        question: "Qui achète les matériaux ?",
        answer:
          "L’organisation des achats est définie pour le projet et convenue avec le périmètre des travaux. Nous pouvons discuter de l’aide nécessaire pour le choix et l’achat avant le démarrage.",
      },
      {
        question: "Un projet de conception est-il nécessaire ?",
        answer:
          "Pas toujours. Il est utile pour étudier à l’avance l’agencement, les solutions et les matériaux ; son périmètre dépend du projet.",
      },
      {
        question: "Comment est calculé le coût de construction d’une maison ?",
        answer:
          "Une première fourchette dépend de la surface, du terrain, des solutions structurelles et techniques, ainsi que du niveau de travaux et de finitions prévu.",
      },
      {
        question: "Intervenez-vous dans toute l’Arménie ?",
        answer:
          "Oui. Nous intervenons dans toute l’Arménie, notamment à Erevan. Les modalités sont convenues selon la localisation du bien et les travaux prévus.",
      },
      {
        question: "Par où commencer ?",
        answer:
          "Envoyez le type de bien, sa surface approximative, sa localisation et une description des travaux souhaités. Nous organiserons ensuite un premier échange ou une visite.",
      },
    ],
  },
  cta: {
    title: "Vous prévoyez des travaux de rénovation ou de construction ?",
    description:
      "Envoyez les informations essentielles du projet ; nous définirons la prochaine étape adaptée : estimation ou visite sur place.",
    primaryAction: "Envoyer les détails du projet",
    secondaryAction: "Demander une visite du bien",
  },
  footer: {
    description:
      "Rénovation, aménagement intérieur et construction en Arménie.",
    navigation: "Navigation",
    services: "Services",
    contacts: "Coordonnées",
    rights: "Tous droits réservés.",
    privacy: "Politique de confidentialité",
    location: "Erevan · Arménie",
  },
  about: {
    eyebrow: "À propos de SHINEX",
    title: "Une organisation claire pour la rénovation et la construction",
    intro:
      "SHINEX développe ses services de rénovation et de construction en Arménie autour d’une organisation claire, d’une première évaluation, d’étapes convenues et d’échanges simples avec les clients.",
    storyTitle: "Comment les travaux sont organisés",
    story: [
      "Nous commençons par comprendre les exigences du projet, l’espace et le résultat attendu, plutôt que par une promesse toute faite.",
      "Nous définissons le périmètre pour que le client comprenne les étapes, les décisions à prendre et les responsabilités de chacun.",
    ],
    valuesTitle: "Nos domaines principaux",
    values: [
      {
        title: "Rénovation d’appartements et de maisons",
        description:
          "Nous aidons à définir les travaux et à convenir de l’ordre des étapes.",
      },
      {
        title: "Construction de maisons individuelles",
        description:
          "Nous discutons du terrain, des données de conception et de la prochaine étape concrète.",
      },
      {
        title: "Travaux commerciaux et spécialisés",
        description:
          "Nous étudions les projets de locaux professionnels et les étapes de construction spécifiques.",
      },
    ],
    approachTitle: "Comment les décisions sont prises",
    approach:
      "Nous mettons en cohérence l’objectif de conception, les conditions réelles du site et l’ordre de réalisation, sans ajouter de solutions non justifiées.",
    team: {
      title: "Équipe",
      description:
        "Les intervenants rejoignent le projet selon ses besoins et son étape en cours.",
      placeholderNotice:
        "FICHES TEMPORAIRES — à remplacer par des informations d’équipe vérifiées avant publication",
      members: [
        {
          role: "Responsable de projet",
          description:
            "Rôle temporaire sans nom : coordination du déroulement des travaux et de la communication.",
          isPlaceholder: true,
        },
        {
          role: "Ingénieur / spécialiste technique",
          description:
            "Rôle temporaire sans nom : examen technique des solutions et des étapes.",
          isPlaceholder: true,
        },
        {
          role: "Architecte / concepteur",
          description:
            "Rôle temporaire sans nom : solutions architecturales et d’agencement.",
          isPlaceholder: true,
        },
      ],
    },
  },
  contacts: {
    eyebrow: "Coordonnées",
    title: "Contactez notre entreprise de construction à Erevan",
    description:
      "Contactez SHINEX par téléphone, WhatsApp ou e-mail pour discuter de construction, de rénovation et d’aménagement intérieur à Erevan et dans toute l’Arménie.",
    phone: "Téléphone",
    email: "E-mail",
    address: "Adresse",
    hours: "Horaires",
    messengers: "Messageries",
    whatsapp: "WhatsApp",
    telegram: "Telegram",
    mapPlaceholder:
      "Emplacement de la carte — l’adresse exacte apparaîtra après la mise à jour des coordonnées.",
    methodsTitle: "Choisissez le moyen de contact qui vous convient",
    methodsDescription:
      "Appelez-nous, écrivez-nous sur WhatsApp ou envoyez un message via le site.",
    formTitle: "Envoyer un message",
    formDescription:
      "Nous avons besoin de vos coordonnées et d’une brève description pour répondre à votre demande.",
    closeAfterSending: "Cette fenêtre se fermera automatiquement.",
  },
  privacy: {
    title: "Politique de confidentialité",
    updated:
      "Dernière mise à jour : ajouter la date de publication avant la mise en ligne",
    intro:
      "Cette politique explique comment les informations transmises via les formulaires du site peuvent être traitées.",
    sections: [
      {
        title: "Informations que nous recevons",
        paragraphs: [
          "Nous pouvons recevoir votre nom, votre numéro de téléphone, votre adresse e-mail et les informations de projet que vous choisissez de fournir.",
        ],
      },
      {
        title: "Pourquoi nous les traitons",
        paragraphs: [
          "Ces informations servent à répondre à votre demande, à préciser vos besoins et à discuter d’une éventuelle collaboration.",
        ],
      },
      {
        title: "Conservation et communication",
        paragraphs: [
          "Les informations ne doivent pas être conservées plus longtemps que nécessaire ni communiquées à des tiers, sauf obligation légale ou nécessité technique liée au fonctionnement du service.",
        ],
      },
      {
        title: "Vos droits",
        paragraphs: [
          "Vous pouvez demander la rectification ou la suppression de vos informations à l’adresse e-mail indiquée sur ce site.",
        ],
      },
    ],
  },
  blog: {
    label: "Blog",
    title: "Guides de rénovation en Arménie",
    description:
      "Des guides relus sur la préparation, les délais et les devis de rénovation.",
    metadataDescription:
      "Des guides pratiques SHINEX pour planifier une rénovation, établir un budget et préparer un bien dans toute l’Arménie.",
  },
  seo: {
    serviceCoverage: {
      title: "Interventions dans toute l’Arménie",
      description:
        "Nous intervenons à Erevan, Gyumri, Vanadzor, Dilidjan et dans d’autres villes d’Arménie. Les modalités sont convenues selon la localisation du bien et les travaux prévus.",
    },
    calculatorEstimateNotice:
      "Le calculateur fournit une première indication. Un devis précis suit la visite du bien.",
    faqTitle: "Questions fréquentes",
    relatedPlanningTitle: "Découvrez vos options",
    calculatorPriceLink: "Prix de rénovation d’appartement à Erevan",
    fallbackFaqs: [
      {
        question: "Comment obtenir un devis précis ?",
        answer:
          "Une première indication est disponible en ligne ; un devis précis est établi après clarification des besoins du projet et visite du bien.",
      },
      {
        question: "Une visite du bien est-elle nécessaire ?",
        answer:
          "Une visite permet d’évaluer l’état initial, de préciser les travaux et de préparer un devis réaliste.",
      },
      {
        question: "Peut-on convenir des travaux avant le démarrage ?",
        answer:
          "Oui. Avant le démarrage, nous discutons des besoins, du périmètre et de l’ordre des étapes pour convenir d’un cadre de projet adapté.",
      },
      {
        question: "Quelles informations faut-il pour une première estimation ?",
        answer:
          "Il est utile de préciser le type de bien, sa surface et les travaux souhaités, avec un plan ou des photos si vous en avez.",
      },
    ],
  },
  calculatorPage: {
    title: "Calculateur de coûts de construction et de conception en Arménie",
    description:
      "Obtenez une première estimation de construction de maison ou de conception en AMD. Pour une rénovation, contactez SHINEX par téléphone, WhatsApp ou le formulaire de demande.",
    intro:
      "Le calculateur fournit des premières estimations pour la construction de maisons et la conception. Pour rénover un appartement, une maison ou un local professionnel, contactez-nous afin de discuter du bien, des travaux et de la préparation d’un devis.",
    faqTitle: "Calculs et demandes de prix",
    faqs: [
      {
        question: "Comment connaître le coût d’une rénovation ?",
        answer:
          "Contactez SHINEX par le moyen qui vous convient et parlez-nous de votre projet. Nous préciserons les détails et conviendrons des prochaines étapes pour établir un devis.",
      },
      {
        question: "Que couvre le calculateur ?",
        answer:
          "Il fournit une première indication pour la construction de maisons et la conception. Le périmètre et le coût définitifs sont convenus après étude des détails du projet.",
      },
    ],
  },
  leadNotification: {
    title: "Nouvelle demande via le site",
    name: "Nom",
    phone: "Téléphone",
    objectType: "Type de bien",
    area: "Surface",
    region: "Région",
    workType: "Type de travaux",
    options: "Options supplémentaires",
    comment: "Commentaire",
  },
  common: {
    home: "Accueil",
    back: "Retour",
    next: "Suivant",
    previous: "Précédent",
    readMore: "En savoir plus",
    showMore: "Afficher plus",
    showLess: "Afficher moins",
    loading: "Chargement…",
    required: "Obligatoire",
    optional: "Facultatif",
    notFoundTitle: "Page introuvable",
    notFoundDescription:
      "L’adresse a peut-être changé ou la page n’est plus disponible.",
    returnHome: "Retour à l’accueil",
    breadcrumbs: "Fil d’Ariane",
    skipToContent: "Aller au contenu principal",
    website: "Site web",
    errors: {
      required: "Remplissez ce champ obligatoire.",
      invalidEmail: "Indiquez une adresse e-mail valide.",
      invalidPhone: "Indiquez un numéro de téléphone valide.",
      generic: "Une erreur est survenue. Veuillez réessayer.",
    },
    success: { sent: "Votre message a bien été envoyé." },
  },
} satisfies Dictionary;

export default dictionary;
