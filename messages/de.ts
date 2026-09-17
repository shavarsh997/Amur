import { projectCatalog } from "@/data/projects";
import type { Dictionary } from "@/types";

const dictionary = {
  localeName: "Deutsch",
  metadata: {
    title: "Bau- und Renovierungsunternehmen in Armenien — SHINEX",
    description:
      "SHINEX baut Häuser, renoviert Wohn- und Gewerbeimmobilien und gestaltet Innenräume in Eriwan und ganz Armenien. Besprechen Sie Ihr Projekt mit uns.",
    manifestDescription:
      "Wohnungs- und Hausrenovierung, Bau und Innenraumgestaltung in Armenien.",
  },
  nav: {
    home: "Startseite",
    services: "Leistungen",
    projects: "Projekte",
    about: "Über uns",
    contacts: "Beratung anfragen",
    privacy: "Datenschutz",
    consultation: "Beratung anfragen",
    openMenu: "Menü öffnen",
    closeMenu: "Menü schließen",
    language: "Sprache",
  },
  hero: {
    eyebrow: "Renovierungs- und Bauleistungen",
    title: "Bau, Renovierung und Innenraumgestaltung in Armenien",
    description:
      "Vom Hausbau bis zur Renovierung einer Wohnung oder von Geschäftsräumen begleitet SHINEX die Planung und Umsetzung Ihres Projekts. Zunächst prüfen wir das Objekt und Ihren Bedarf, dann erstellen wir eine erste Kostenschätzung.",
    primaryAction: "Beratung anfragen",
    secondaryAction: "Leistungen ansehen",
    trustPoints: [
      "Erste Kostenschätzung und detaillierte Kostenplanung",
      "Bauarbeiten und Gebäudetechnik",
      "Innenraumgestaltung und Materialauswahl",
      "Projekte in ganz Armenien",
    ],
  },
  services: {
    eyebrow: "Unsere Hauptleistungen",
    title: "Leistungen für Wohnungen, Häuser und Unternehmen",
    description:
      "Wählen Sie die passende Leistung: Renovierung, Hausbau, Innenraumgestaltung oder ergänzende Bauarbeiten.",
    specializedTitle: "Ergänzende Bauleistungen",
    viewAll: "Alle Leistungen",
    learnMore: "Leistung ansehen",
    pageTitle: "Renovierung, Innenraumgestaltung und Bauleistungen",
    pageDescription:
      "Wohnungs- und Hausrenovierung, Hausbau, Innenraumgestaltung und einzelne Bauarbeiten.",
    detail: {
      overview: "Leistungsübersicht",
      included: "Was die Leistung umfasst",
      stages: "Arbeitsphasen",
      audience: "Für wen ist die Leistung geeignet?",
      customerTypes: "Wann diese Leistung sinnvoll ist",
      workTypes: "Leistungsumfang",
      estimateRequirements: "Für eine erste Einschätzung",
      priceFactors: "Was die Kosten beeinflusst",
      faq: "Häufig gestellte Fragen",
      requestEstimate: "Erste Kostenschätzung anfragen",
      relatedProjects: "Ähnliche Projekte",
    },
  },
  projects: {
    eyebrow: "SHINEX-Portfolio",
    title: "Abgeschlossene Projekte",
    description:
      "Wir veröffentlichen nur geprüfte Projektberichte und Angaben zu ausgeführten Arbeiten. Das Portfolio wächst, sobald die Inhalte mit unseren Kunden abgestimmt sind.",
    viewAll: "Alle Projekte ansehen",
    pageTitle: "Projekte",
    pageDescription:
      "Beispiele für Wohn-, Gewerbe-, Renovierungs- und Außenprojekte in Armenien.",
    availabilityTitle: "Unser Portfolio entsteht",
    availabilityDescription:
      "Als junges Unternehmen veröffentlichen wir hier keine Demonstrationsprojekte oder ungeprüften Referenzen. Erzählen Sie uns von Ihren Plänen, damit wir den passenden Leistungsumfang besprechen können.",
    availabilityAction: "Projekt besprechen",
    filters: {
      all: "Alle",
      privateHouses: "Privathäuser",
      commercial: "Gewerbe",
      renovation: "Renovierung",
      inProgress: "In Arbeit",
      completed: "Abgeschlossen",
    },
    statusLabels: { completed: "Abgeschlossen", "in-progress": "In Arbeit" },
    detail: {
      location: "Standort",
      objectType: "Objektart",
      area: "Fläche",
      year: "Jahr",
      status: "Status",
      task: "Aufgabe",
      completedWorks: "Ausgeführte Arbeiten",
      stages: "Phasen",
      materials: "Materialien",
      result: "Ergebnis",
      gallery: "Galerie",
      discussProject: "Ähnliches Projekt besprechen",
    },
    items: [
      {
        ...projectCatalog[0],
        location: "Dilidschan, Tawusch",
        title: "Familienhaus in Dilidschan",
        area: "Gemäß Projekt zu bestätigen",
        year: "Demonstrationsprojekt",
        task: "Den Bau eines Privathauses auf das Grundstück und die natürliche Umgebung abstimmen.",
        completedWorks: [
          "Vorbereitung und allgemeine Bauarbeiten",
          "Abstimmung von Gebäudetechnik und Außendetails",
        ],
        stages: [
          "Projektvorbereitung",
          "Rohbauarbeiten",
          "Gebäudetechnik und Ausbau",
        ],
        materials: [
          "Die Materialien werden neutral beschrieben und anhand der freigegebenen Projektunterlagen bestätigt.",
        ],
        result:
          "Ein Beispiel für ein abgestimmtes Hausprojekt ohne ungeprüfte Preis- oder Terminangaben.",
      },
      {
        ...projectCatalog[1],
        location: "Eriwan",
        title: "Wohnungsrenovierung in Eriwan",
        area: "Nach Aufmaß zu bestätigen",
        year: "Demonstrationsprojekt",
        task: "Eine bestehende Wohnung erneuern und ihren Grundriss alltagstauglicher gestalten.",
        completedWorks: [
          "Bestandsaufnahme",
          "Vorbereitung der Gebäudetechnik",
          "Innenausbau",
        ],
        stages: ["Aufmaß und Planung", "Vorbereitende Arbeiten", "Endausbau"],
        materials: [
          "Materialien und Systeme werden in den Planungs- und Ausführungsunterlagen festgelegt.",
        ],
        result: "Ein Beispiel für eine funktional modernisierte Wohnung.",
      },
      {
        ...projectCatalog[2],
        location: "Zaghkadsor, Kotajk",
        title: "Gästehaus in Zaghkadsor",
        area: "Gemäß Projekt zu bestätigen",
        year: "Demonstrationsprojekt",
        task: "Eine Gästeunterkunft mit einer sinnvollen Aufteilung zwischen gemeinschaftlichen und privaten Bereichen schaffen.",
        completedWorks: [
          "Koordination der laufenden Bauarbeiten",
          "Gestaltung der Gemeinschaftsbereiche",
        ],
        stages: [
          "Projektvorbereitung",
          "Bauarbeiten — in Arbeit",
          "Ausbau und Übergabe — spätere Phasen",
        ],
        materials: [
          "Die Materialien werden im Rahmen der freigegebenen Planung ausgewählt und bestätigt.",
        ],
        result:
          "Ein Demonstrationsprojekt in Arbeit; das endgültige Ergebnis wird nach Abschluss dokumentiert.",
      },
      {
        ...projectCatalog[3],
        location: "Aschtarak, Aragazotn",
        title: "Hofgestaltung in Aschtarak",
        area: "Durch Aufmaß zu bestätigen",
        year: "Demonstrationsprojekt",
        task: "Einen Hof und die an das Haus angrenzenden Außenbereiche erneuern.",
        completedWorks: [
          "Untergrundvorbereitung",
          "Erneuerung von Oberflächen und Außendetails",
        ],
        stages: ["Besichtigung", "Vorbereitung", "Ausführung und Prüfung"],
        materials: [
          "Die konkreten Materialien werden anhand der Planung und des vorhandenen Zustands festgelegt.",
        ],
        result: "Ein Beispiel für einen sorgfältig erneuerten Außenbereich.",
      },
      {
        ...projectCatalog[4],
        location: "Sewan, Gegharkunik",
        title: "Hauskonzept am See in Sewan",
        area: "Gemäß Projekt zu bestätigen",
        year: "Demonstrationsprojekt",
        task: "Ein Privathaus unter Berücksichtigung der Aussicht, des Windes und der Einbindung in das Grundstück realisieren.",
        completedWorks: ["Projektvorbereitung", "Erste Bauarbeiten"],
        stages: [
          "Planung",
          "Bauarbeiten — in Arbeit",
          "Gebäudetechnik und Ausbau — spätere Phasen",
        ],
        materials: [
          "Alle Materialien und konstruktiven Lösungen werden in der freigegebenen Planung bestätigt.",
        ],
        result:
          "Ein Demonstrationsprojekt in Arbeit ohne unbelegte Terminzusagen.",
      },
    ],
  },
  whyUs: {
    eyebrow: "Warum SHINEX",
    title: "Warum Sie SHINEX Ihr Projekt anvertrauen können",
    description:
      "Wir besprechen Arbeitsbedingungen und Änderungen im Voraus, damit jede Phase nachvollziehbar bleibt.",
    items: [
      {
        title: "Arbeiten auf Vertragsbasis",
        description:
          "Umfang, Verantwortlichkeiten und Arbeitsablauf werden schriftlich festgehalten.",
      },
      {
        title: "Vorab abgestimmte Kostenschätzung",
        description:
          "Wir legen die Arbeiten und Kosten offen und stimmen Änderungen vor ihrer Ausführung ab.",
      },
      {
        title: "Arbeiten in klaren Phasen",
        description:
          "Wir planen die Reihenfolge der Arbeiten und kontrollieren den Fortschritt jeder Phase.",
      },
      {
        title: "Qualitätskontrolle",
        description:
          "Wichtige Arbeitsschritte und das Ergebnis jeder Phase werden geprüft.",
      },
      {
        title: "Änderungen vorab vereinbaren",
        description:
          "Müssen sich Umfang oder Lösungen während der Arbeiten ändern, stimmen wir dies zuerst mit Ihnen ab.",
      },
      {
        title: "In ganz Armenien tätig",
        description:
          "Wir übernehmen Projekte in ganz Armenien, einschließlich Eriwan, und berücksichtigen dabei Standort und Umfang.",
      },
    ],
  },
  process: {
    eyebrow: "Unser Ablauf",
    title: "Arbeitsphasen — vom ersten Gespräch bis zur Übergabe",
    description:
      "In jeder Phase wissen Sie, was wir tun, was Sie freigeben und welcher Schritt folgt.",
    steps: [
      {
        number: "01",
        title: "Erstberatung",
        description:
          "Wir klären Ihren Bedarf und die Objektart und schlagen dann den nächsten konkreten Schritt vor.",
      },
      {
        number: "02",
        title: "Objektbesichtigung und Aufmaß",
        description:
          "Wir besichtigen das Objekt oder Grundstück, nehmen Maße auf und sammeln die für eine Kostenschätzung benötigten Angaben.",
      },
      {
        number: "03",
        title: "Lösungen und Kostenschätzung vorbereiten",
        description:
          "Wir erarbeiten die Lösungen, Arbeitsphasen und eine erste Kostenschätzung zur Abstimmung mit Ihnen.",
      },
      {
        number: "04",
        title: "Vertrag abschließen",
        description:
          "Wir halten den vereinbarten Umfang, die Bedingungen und das Vorgehen bei Änderungen fest.",
      },
      {
        number: "05",
        title: "Ausführung und Kontrolle der Arbeiten",
        description:
          "Wir organisieren und kontrollieren die Arbeiten in der vereinbarten Reihenfolge.",
      },
      {
        number: "06",
        title: "Prüfung und Übergabe",
        description:
          "Wir prüfen die fertigen Arbeiten gemeinsam mit Ihnen, erledigen vereinbarte Nachbesserungen und übergeben das Objekt.",
      },
    ],
  },
  estimate: {
    eyebrow: "Erste Kostenschätzung",
    title: "Senden Sie uns Ihre Projektdaten",
    description:
      "Geben Sie die wichtigsten Objektdaten an. Ein Fachmitarbeiter prüft Ihre Anfrage und meldet sich, um das Projekt zu präzisieren.",
    fields: {
      objectType: "Objektart",
      area: "Fläche, m²",
      region: "Region",
      workType: "Art der Arbeiten",
      name: "Name",
      phone: "Telefon",
      comment: "Projektbeschreibung",
    },
    placeholders: {
      objectType: "Objektart auswählen",
      area: "Ungefähre Fläche eingeben",
      region: "Stadt oder Provinz",
      workType: "Art der Arbeiten auswählen",
      name: "Ihr Name",
      phone: "+374 …",
      comment:
        "Zum Beispiel: Wohnung mit 85 m², komplette Renovierung erforderlich",
    },
    choices: {
      objectType: {
        privateHouse: "Privathaus",
        commercial: "Gewerbeimmobilie",
        apartment: "Wohnung",
        other: "Sonstiges",
      },
      workType: {
        turnkey: "Schlüsselfertiger Bau",
        design: "Planung",
        renovation: "Renovierung",
        separateWorks: "Einzelne Arbeiten",
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
      objectTypeRequired: "Wählen Sie eine Objektart aus.",
      areaRequired: "Geben Sie die Fläche ein.",
      areaInvalid: "Geben Sie die Fläche als positive Zahl ein.",
      regionRequired: "Geben Sie die Region ein.",
      workTypeRequired: "Wählen Sie die Art der Arbeiten aus.",
      nameRequired: "Geben Sie Ihren Namen ein.",
      phoneRequired: "Geben Sie Ihre Telefonnummer ein.",
      phoneInvalid: "Geben Sie eine gültige Telefonnummer ein.",
    },
    submit: "Erste Kostenschätzung anfragen",
    submitting: "Wird gesendet…",
    success:
      "Ihre Anfrage wurde gesendet. Wir melden uns bei Ihnen, um die Einzelheiten zu klären.",
    error:
      "Die Anfrage konnte nicht gesendet werden. Versuchen Sie es erneut oder kontaktieren Sie uns direkt.",
  },
  calculator: {
    eyebrow: "Lassen Sie uns Ihr Projekt besprechen",
    title: "Planen Sie eine Renovierung oder ein Bauprojekt?",
    description:
      "Erzählen Sie uns von Ihrem Objekt und den geplanten Arbeiten. Kontaktieren Sie uns auf dem für Sie passenden Weg, um die Details und nächsten Schritte zu besprechen.",
    steps: {
      objectType: "Objekt",
      workType: "Arbeiten",
      area: "Fläche",
      location: "Region",
      options: "Details",
      contact: "Kontakt",
      result: "Ergebnis",
    },
    objectType: {
      title: "Um welche Art von Objekt handelt es sich?",
      description: "Wählen Sie die am besten passende Option.",
      choices: {
        privateHouse: "Privathaus",
        commercial: "Gewerbeimmobilie",
        apartment: "Wohnung",
        other: "Sonstiges",
      },
    },
    workType: {
      title: "Welche Arbeiten benötigen Sie?",
      description:
        "So wählen wir die passende Grundlage für Ihre Kostenschätzung.",
      choices: {
        turnkey: "Schlüsselfertiger Bau",
        design: "Planung",
        renovation: "Renovierung",
        separateWorks: "Einzelne Arbeiten",
      },
    },
    area: {
      title: "Fläche eingeben",
      description:
        "Geben Sie eine ungefähre Fläche an, wenn das genaue Maß nicht bekannt ist.",
      label: "Fläche, m²",
      placeholder: "Zum Beispiel 120",
    },
    location: {
      title: "Wo befindet sich das Objekt?",
      description:
        "Geben Sie die Stadt oder Region an, damit wir die Logistik einschätzen können.",
      label: "Stadt oder Region",
      placeholder: "Zum Beispiel Eriwan",
    },
    options: {
      title: "Was sollten wir außerdem berücksichtigen?",
      description:
        "Wählen Sie die zutreffenden Punkte. Sie können diesen Schritt überspringen.",
      choices: {
        designDocumentation: "Planungsunterlagen werden benötigt",
        materials: "Unterstützung bei der Materialauswahl wird benötigt",
        siteConditions: "Das Grundstück oder Objekt hat besondere Bedingungen",
      },
    },
    contact: {
      title: "Wie können wir Sie erreichen?",
      description:
        "Hinterlassen Sie Ihre Kontaktdaten, damit wir die Kostenschätzung und den nächsten Schritt besprechen können.",
      nameLabel: "Name",
      phoneLabel: "Telefon",
      commentLabel: "Anmerkung",
      namePlaceholder: "Ihr Name",
      phonePlaceholder: "+374 …",
      commentPlaceholder: "Weitere Projektdetails",
    },
    result: {
      title: "Vorläufige Kostenschätzung",
      rangeLabel: "Unverbindlicher Kostenrahmen",
      preliminaryNotice:
        "Die Berechnung ist vorläufig. Die genauen Kosten ergeben sich nach Klärung des Leistungsumfangs, der Materialien und einer Objektbesichtigung.",
      pricingUnavailable:
        "Kostenrahmen wurden noch nicht veröffentlicht. Ihre Angaben liegen uns vor; wir besprechen eine erste Orientierung direkt mit Ihnen.",
      sendRequest: "Anfrage senden",
      sending: "Wird gesendet…",
      success: "Vielen Dank! Ihre Anfrage ist eingegangen.",
      error:
        "Die Anfrage konnte nicht gesendet werden. Bitte versuchen Sie es erneut.",
    },
    navigation: {
      back: "Zurück",
      next: "Weiter",
      calculate: "Kostenschätzung anzeigen",
    },
    errors: {
      objectTypeRequired: "Wählen Sie eine Objektart.",
      workTypeRequired: "Wählen Sie die Art der Arbeiten.",
      areaRequired: "Geben Sie die Fläche ein.",
      areaInvalid: "Geben Sie eine gültige Fläche ein.",
      regionRequired: "Geben Sie eine Region ein.",
      nameRequired: "Geben Sie Ihren Namen ein.",
      phoneRequired: "Geben Sie Ihre Telefonnummer ein.",
      phoneInvalid: "Geben Sie eine gültige Telefonnummer ein.",
    },
  },
  constructionCalculator: {
    renovationContact: {
      title: "Renovierung besprechen",
      description:
        "Kontaktieren Sie SHINEX und beschreiben Sie Ihr Renovierungsvorhaben. Wir besprechen den Zustand des Objekts, die gewünschten Arbeiten und die nächsten Schritte für eine Besichtigung und Kostenschätzung.",
      action: "Renovierung besprechen",
    },
    dialog: {
      eyebrow: "Online-Rechner",
      title: "Vorläufige Projektkosten",
      close: "Rechner schließen",
      open: "Rechner öffnen",
    },
    steps: {
      scenario: {
        title: "Leistung auswählen",
        description:
          "Kontaktieren Sie uns bei Renovierungsanfragen oder erhalten Sie eine erste Berechnung für Hausbau und Planung.",
      },
      parameters: {
        title: "Objektdaten",
        description:
          "Geben Sie ungefähre Daten ein. Genaue Maße lassen sich nach einer Besichtigung bestätigen.",
      },
      constructionExtras: {
        title: "Zusätzliche Baubedingungen",
        description:
          "Wählen Sie nur die Projektdetails, die Ihnen bereits bekannt sind.",
      },
      renovationExtras: {
        title: "Zusätzliche Arbeiten",
        description:
          "Die ausgewählten Arbeiten werden sofort in den Richtpreis eingerechnet.",
      },
      wallWorks: {
        title: "Arbeiten an Innenwänden",
        description:
          "Wählen Sie die Arbeiten aus, um deren Kosten anhand der ungefähren Wandfläche zu schätzen.",
      },
    },
    fields: {
      finishLevel: "Ausbauqualität",
      renovationType: "Renovierungsumfang",
      area: "Fläche, m²",
      bathrooms: "Badezimmer",
      houseShape: "Hausform",
      constructionType: "Bauweise",
      basementArea: "Kellerfläche, m²",
      garageArea: "Garagenfläche, m²",
      terraceArea: "Terrassenfläche, m²",
      currentCondition: "Aktueller Zustand",
      renovationLevel: "Renovierungsniveau",
      distance: "Entfernung zur Stadt, km",
      distanceHint: "Wenn sich das Objekt außerhalb der Stadt befindet.",
      heatedFloorArea: "Fläche der Fußbodenheizung, m²",
      doorsCount: "Anzahl der Türen",
      ceilingHeight: "Deckenhöhe, m",
      roomsCount: "Anzahl der Räume",
      layoutDensity: "Komplexität des Grundrisses",
    },
    quickScenarios: {
      apartmentOrPrivateHouseRenovation: {
        title: "Wohnungsrenovierung",
        description:
          "Kontaktieren Sie uns, um Arbeiten und Kosten zu besprechen",
      },
      houseConstruction: {
        title: "Hausbau",
        description: "Baukosten schätzen",
      },
      interiorDesign: {
        title: "Innenraumgestaltung",
        description: "Grundrisse und Innenraumkonzepte",
      },
      commercial: {
        title: "Gewerbeimmobilie",
        description:
          "Kontaktieren Sie uns, um Arbeiten und Kosten zu besprechen",
      },
    },
    construction: {
      packages: {
        shell: {
          title: "Rohbau",
          description: "Fundamente, Wände, Geschossdecken und Dach.",
        },
        rough: {
          title: "Vorbereiteter Ausbau",
          description: "Rohbau, Fenster, Gebäudetechnik, Putz und Estrich.",
        },
        turnkey: {
          title: "Schlüsselfertig",
          description: "Bau, Gebäudetechnik und einfacher Innenausbau.",
        },
      },
      materials: {
        aeratedConcrete: "Porenbeton",
        stone: "Stein",
        monolith: "Ortbeton",
        frame: "Skelettbau",
      },
      houseShapes: {
        rectangle: "Rechteckig",
        lShape: "L-förmig",
        complex: "Komplex",
      },
      extras: {
        basement: "Keller",
        garage: "Garage",
        terrace: "Terrasse",
        highCeilings: "Decken über 3 Meter",
        difficultSite: "Schwieriges Grundstück",
        distance: "Entfernung zur Stadt",
      },
    },
    renovation: {
      finishLevels: {
        standard: "Standard",
        high: "Gehoben",
        premium: "Premium",
      },
      types: {
        cosmetic: "Optische Auffrischung",
        capital: "Umfassende Sanierung",
        complete: "Komplettrenovierung",
      },
      conditions: {
        newWithoutFinish: "Neubau ohne Ausbau",
        roughFinish: "Einfacher, unfertiger Innenausbau",
        oldRenovation: "Älteres Objekt mit vorhandenem Ausbau",
        partiallyRenovated: "Teilweise renoviertes Objekt",
      },
      levels: {
        cosmetic: "Oberflächliche Renovierung",
        standard: "Standard",
        capital: "Umfassende Sanierung",
        premium: "Premium",
      },
      extras: {
        demolition: "Entfernung alter Oberflächen",
        electrical: "Erneuerung der Elektroinstallation",
        plumbing: "Erneuerung der Sanitärinstallation",
        heatedFloor: "Fußbodenheizung",
        doors: "Einbau von Innentüren",
      },
    },
    wallWorks: {
      layoutDensity: {
        open: "Offener Grundriss",
        standard: "Standardgrundriss",
        complex: "Viele Räume, Trennwände und Flure",
      },
      works: {
        plastering: "Wände verputzen",
        putty: "Wände spachteln",
        painting: "Wände streichen",
        wallpaper: "Tapezieren",
        wallDemolition: "Wandbeläge entfernen",
      },
      resultTitle: "Vorläufige Wandberechnung",
      wallAreaLabel: "Ungefähre Innenwandfläche: {area} m²",
      calculationDetails:
        "Trennwandlänge: {length} m; Fläche vor Abzug der Öffnungen: {grossArea} m²; Öffnungen: −{openingsArea} m².",
      totalLabel: "Gesamtkosten der Wandarbeiten",
      unit: "m²",
      noWorksSelected: "Keine Wandarbeiten ausgewählt.",
      notice:
        "Diese Berechnung ist vorläufig. Die tatsächliche Wandfläche und die Kosten hängen vom Grundriss, der Anzahl der Trennwände, den Türöffnungen, dem Oberflächenzustand und den gewählten Materialien ab.",
    },
    design: {
      basic: {
        title: "Basisplanung",
        description: "Grundriss und gestalterische Ausrichtung.",
      },
      full: {
        title: "Vollständige Innenraumplanung",
        description: "Zeichnungen, Visualisierungen und Materialauswahl.",
      },
      supervision: {
        title: "Mit gestalterischer Begleitung",
        description: "Ein Planungsprojekt mit Unterstützung bei der Umsetzung.",
      },
    },
    result: {
      renovationParametersLine:
        "Renovierungsumfang: {type}; Ausbau: {finishLevel}",
      title: "Erste Einschätzung",
      range: "Nächster Schritt",
      included: "Enthalten",
      empty:
        "Geben Sie ungefähre Angaben ein, um das Projektgespräch vorzubereiten.",
      pricingUnavailable:
        "Öffentliche Kostenrahmen sind noch nicht verfügbar. Hinterlassen Sie die wichtigsten Angaben; nach Prüfung Ihres Vorhabens geben wir Ihnen eine erste Orientierung.",
      calculate: "Kosten berechnen",
      calculateDescription:
        "Sehen Sie die vorläufige Gesamtsumme und eine Aufschlüsselung der gewählten Arbeiten.",
      ready:
        "Klicken Sie auf die Schaltfläche, um die vorläufigen Kosten anzuzeigen.",
      total: "Geschätzte Gesamtkosten",
      notice:
        "Die genauen Kosten werden nach Klärung des Vorhabens, der Materialien, des Objektzustands und der Besichtigung bestimmt.",
      constructionIncrease: "+{percentage}% der Baukosten",
      distanceNote: "{distance} km",
      renovationLine: "Renovierung: {level}",
      loading: "Kostenschätzung wird berechnet…",
      workBreakdownTitle: "Kostenschätzung der gewählten Arbeiten",
      renovationScopeTitle: "Ungefähre Arbeitsmengen",
      floorAreaLabel: "Boden- und Raumfläche",
      units: {
        squareMeter: "m²",
        bathroom: "Badezimmer",
        item: "Stk.",
        kilometer: "km",
      },
      surfaceWorks: {
        floor: "Bodenvorbereitung und Bodenbelag",
        ceiling: "Deckenvorbereitung und Deckenfinish",
        internalWalls: "Innenwände",
        exteriorWalls: "Außenwände",
      },
    },
    validation: {
      areaRequired: "Geben Sie die Fläche ein.",
      areaOutOfRange: "Geben Sie eine Fläche von 1 bis 100.000 m² ein.",
      basementAreaRequired: "Geben Sie die Kellerfläche ein.",
      garageAreaRequired: "Geben Sie die Garagenfläche ein.",
      terraceAreaRequired: "Geben Sie die Terrassenfläche ein.",
      distanceInvalid:
        "Geben Sie die Entfernung zur Stadt als nichtnegative Zahl ein.",
      bathroomsRequired: "Geben Sie die Anzahl der Badezimmer ein.",
      heatedFloorAreaRequired:
        "Die Fläche der Fußbodenheizung darf die Objektfläche nicht überschreiten.",
      doorsCountRequired: "Geben Sie die Anzahl der Türen ein.",
      renovationAreaOutOfRange:
        "Geben Sie eine Fläche von 10 bis 2.000 m² ein.",
      ceilingHeightOutOfRange: "Geben Sie eine Deckenhöhe von 2 bis 6 m ein.",
      roomsCountOutOfRange: "Geben Sie eine Raumanzahl von 1 bis 50 ein.",
    },
    estimateSectionDescription:
      "Kontaktieren Sie uns, um Renovierungskosten zu besprechen. Wir klären Ihren Bedarf und stimmen die Angaben sowie die Besichtigung ab, die für eine Kostenschätzung nötig sind.",
  },
  testimonials: {
    eyebrow: "Kundenstimmen",
    title: "Erfahrungen aus der Zusammenarbeit",
    description:
      "Die Einträge in diesem Abschnitt sind vorläufige Demonstrationsinhalte und keine Aussagen echter Kunden.",
    placeholderNotice: "DEMO-KUNDENSTIMME — vor Veröffentlichung ersetzen",
    items: [
      {
        name: "Demo-Kunde",
        role: "Wohnprojekt",
        quote:
          "Demonstrationstext zur Prüfung der Darstellung und Textlänge einer Kundenstimmenkarte.",
        isPlaceholder: true,
      },
      {
        name: "Demo-Partner",
        role: "Gewerbeprojekt",
        quote:
          "Ein vorläufiges Beispiel, das durch eine geprüfte und zur Veröffentlichung freigegebene Kundenstimme ersetzt werden muss.",
        isPlaceholder: true,
      },
      {
        name: "Demo-Auftraggeber",
        role: "Renovierung",
        quote:
          "Dieser Eintrag beschreibt weder eine echte Person noch deren Erfahrung mit einem abgeschlossenen Projekt.",
        isPlaceholder: true,
      },
    ],
  },
  faq: {
    eyebrow: "Häufig gestellte Fragen",
    title: "Häufige Fragen zu Renovierung und Bau",
    description:
      "Das sollten Sie wissen, bevor Sie eine erste Kostenschätzung anfragen.",
    items: [
      {
        question: "Was beeinflusst die Renovierungskosten?",
        answer:
          "Die Kosten hängen von der Fläche, dem Objektzustand, dem Rückbauumfang, der Gebäudetechnik, der Komplexität des Ausbaus und den Materialien ab. Eine genaue Kostenschätzung folgt nach Klärung und Besichtigung.",
      },
      {
        question: "Was kann eine schlüsselfertige Renovierung umfassen?",
        answer:
          "Der Umfang hängt vom Objekt und Ihrem Bedarf ab. Nach einer Besichtigung klären wir, ob Rückbau, Gebäudetechnik, Vorbereitung, Ausbau und Übergabe benötigt werden.",
      },
      {
        question: "Kann ich einzelne Renovierungsphasen beauftragen?",
        answer:
          "Ja. Nach Prüfung des Objekts besprechen wir die gewünschten Arbeiten und vereinbaren ihre Reihenfolge.",
      },
      {
        question: "Wie lange kann eine Renovierung dauern?",
        answer:
          "Die Dauer hängt von Fläche, Zustand, Leistungsumfang und Materiallieferungen ab. Nach der Besichtigung besprechen wir einen realistischen Etappenplan.",
      },
      {
        question: "Wer kauft die Materialien?",
        answer:
          "Die Regelung wird für das Projekt gewählt und mit dem Leistungsumfang vereinbart. Vor Beginn besprechen wir, welche Unterstützung bei Auswahl und Einkauf erforderlich ist.",
      },
      {
        question: "Ist ein Planungsprojekt erforderlich?",
        answer:
          "Nicht immer. Es ist sinnvoll, wenn Grundriss, Lösungen und Materialien vorab ausgearbeitet werden sollen; der Umfang richtet sich nach dem Projekt.",
      },
      {
        question: "Wie werden die Hausbaukosten berechnet?",
        answer:
          "Ein erster Kostenrahmen hängt von Fläche, Grundstück, Tragwerk, Gebäudetechnik sowie dem vorgesehenen Bau- und Ausbaustandard ab.",
      },
      {
        question: "Arbeiten Sie in ganz Armenien?",
        answer:
          "Ja. Wir arbeiten in ganz Armenien, einschließlich Eriwan. Die Arbeitsbedingungen werden je nach Standort und Umfang vereinbart.",
      },
      {
        question: "Wie fange ich an?",
        answer:
          "Senden Sie uns die Objektart, die ungefähre Fläche, den Standort und eine Beschreibung der gewünschten Arbeiten. Danach vereinbaren wir eine Erstberatung oder Besichtigung.",
      },
    ],
  },
  cta: {
    title: "Planen Sie Renovierungs- oder Bauarbeiten?",
    description:
      "Senden Sie die wichtigsten Projektdaten. Wir bestimmen den passenden nächsten Schritt: eine Kostenschätzung oder eine Besichtigung.",
    primaryAction: "Projektdaten senden",
    secondaryAction: "Objektbesichtigung anfragen",
  },
  footer: {
    description: "Renovierung, Innenraumgestaltung und Bau in Armenien.",
    navigation: "Navigation",
    services: "Leistungen",
    contacts: "Kontakt",
    rights: "Alle Rechte vorbehalten.",
    privacy: "Datenschutzerklärung",
    location: "Eriwan · Armenien",
  },
  about: {
    eyebrow: "Über SHINEX",
    title: "Renovierung und Bau klar organisieren",
    intro:
      "SHINEX entwickelt Renovierungs- und Bauleistungen in Armenien mit klarer Organisation, einer ersten Einschätzung, abgestimmten Phasen und unkomplizierter Kommunikation mit Kunden.",
    storyTitle: "So organisieren wir die Arbeiten",
    story: [
      "Wir beginnen damit, die Projektanforderungen, die Räume und das gewünschte Ergebnis zu verstehen, statt vorgefertigte Versprechen zu geben.",
      "Wir gestalten den Leistungsumfang so, dass Kunden die Phasen, Entscheidungspunkte und Verantwortlichkeiten aller Beteiligten nachvollziehen können.",
    ],
    valuesTitle: "Schwerpunkte",
    values: [
      {
        title: "Wohnungs- und Hausrenovierung",
        description:
          "Wir helfen, den Leistungsumfang festzulegen und die Reihenfolge der Arbeiten abzustimmen.",
      },
      {
        title: "Bau von Privathäusern",
        description:
          "Wir besprechen das Grundstück, die Planungsunterlagen und den nächsten konkreten Schritt.",
      },
      {
        title: "Gewerbe- und Facharbeiten",
        description:
          "Wir prüfen Projekte für Gewerberäume und einzelne Bauphasen.",
      },
    ],
    approachTitle: "So treffen wir Entscheidungen",
    approach:
      "Wir stimmen Planungsziel, tatsächliche Bedingungen vor Ort und Ausführungsfolge aufeinander ab, ohne unbegründete Lösungen hinzuzufügen.",
    team: {
      title: "Team",
      description:
        "Die benötigten Fachkräfte kommen entsprechend der Aufgabe und der aktuellen Projektphase hinzu.",
      placeholderNotice:
        "VORLÄUFIGE KARTEN — vor Veröffentlichung durch geprüfte Teamangaben ersetzen",
      members: [
        {
          role: "Projektleitung",
          description:
            "Vorläufige, unbesetzte Rolle: Koordination von Arbeitsabläufen und Kommunikation.",
          isPlaceholder: true,
        },
        {
          role: "Ingenieur / technischer Spezialist",
          description:
            "Vorläufige, unbesetzte Rolle: technische Prüfung der Lösungen und Phasen.",
          isPlaceholder: true,
        },
        {
          role: "Architekt / Gestalter",
          description:
            "Vorläufige, unbesetzte Rolle: Architektur- und Planungslösungen.",
          isPlaceholder: true,
        },
      ],
    },
  },
  contacts: {
    eyebrow: "Kontakt",
    title: "Kontaktieren Sie unser Bauunternehmen in Eriwan",
    description:
      "Kontaktieren Sie SHINEX telefonisch, per WhatsApp oder E-Mail, um Bau, Renovierung und Innenraumgestaltung in Eriwan und ganz Armenien zu besprechen.",
    phone: "Telefon",
    email: "E-Mail",
    address: "Adresse",
    hours: "Öffnungszeiten",
    messengers: "Messenger",
    whatsapp: "WhatsApp",
    telegram: "Telegram",
    mapPlaceholder:
      "Kartenplatzhalter — die genaue Adresse erscheint nach Aktualisierung der Kontaktdaten.",
    methodsTitle: "Wählen Sie Ihren bevorzugten Kontaktweg",
    methodsDescription:
      "Rufen Sie uns an, schreiben Sie über WhatsApp oder senden Sie eine Nachricht über die Website.",
    formTitle: "Nachricht senden",
    formDescription:
      "Wir benötigen Ihre Kontaktdaten und eine kurze Beschreibung, um Ihre Anfrage zu beantworten.",
    closeAfterSending: "Dieses Fenster schließt sich automatisch.",
  },
  privacy: {
    title: "Datenschutzerklärung",
    updated:
      "Zuletzt aktualisiert: Veröffentlichungsdatum vor dem Start ergänzen",
    intro:
      "Diese Erklärung erläutert, wie Angaben aus den Formularen dieser Website verarbeitet werden können.",
    sections: [
      {
        title: "Welche Angaben wir erhalten",
        paragraphs: [
          "Wir können Ihren Namen, Ihre Telefonnummer, Ihre E-Mail-Adresse und die von Ihnen freiwillig übermittelten Projektdaten erhalten.",
        ],
      },
      {
        title: "Zweck der Verarbeitung",
        paragraphs: [
          "Die Angaben dienen dazu, Ihre Anfrage zu beantworten, Anforderungen zu klären und eine mögliche Zusammenarbeit zu besprechen.",
        ],
      },
      {
        title: "Speicherung und Weitergabe",
        paragraphs: [
          "Angaben sollen nur so lange wie nötig gespeichert und nicht an Dritte weitergegeben werden, außer wenn dies gesetzlich vorgeschrieben oder für den technischen Betrieb des Dienstes erforderlich ist.",
        ],
      },
      {
        title: "Ihre Rechte",
        paragraphs: [
          "Über die auf dieser Website angegebene E-Mail-Adresse können Sie die Berichtigung oder Löschung Ihrer Angaben anfragen.",
        ],
      },
    ],
  },
  blog: {
    label: "Blog",
    title: "Renovierungsratgeber für Armenien",
    description:
      "Geprüfte Ratgeber zu Vorbereitung, Zeitplanung und Renovierungskostenschätzungen.",
    metadataDescription:
      "Praktische SHINEX-Ratgeber zur Renovierungsplanung, Kostenschätzung und Objektvorbereitung in ganz Armenien.",
  },
  seo: {
    serviceCoverage: {
      title: "In ganz Armenien tätig",
      description:
        "Wir arbeiten in Eriwan, Gjumri, Wanadsor, Dilidschan und weiteren armenischen Städten. Die Bedingungen werden nach Standort und Umfang vereinbart.",
    },
    calculatorEstimateNotice:
      "Der Rechner bietet eine erste Orientierung. Eine genaue Kostenschätzung erfolgt nach einer Objektbesichtigung.",
    faqTitle: "Häufig gestellte Fragen",
    relatedPlanningTitle: "Möglichkeiten ansehen",
    calculatorPriceLink: "Preise für Wohnungsrenovierung in Eriwan",
    fallbackFaqs: [
      {
        question: "Wie erhalte ich eine genaue Kostenschätzung?",
        answer:
          "Eine erste Orientierung ist online verfügbar; eine genaue Kostenschätzung erstellen wir nach Klärung der Anforderungen und Besichtigung des Objekts.",
      },
      {
        question: "Ist eine Objektbesichtigung nötig?",
        answer:
          "Eine Besichtigung hilft, den Ausgangszustand einzuschätzen, den Leistungsumfang zu klären und eine realistische Kostenschätzung vorzubereiten.",
      },
      {
        question: "Kann der Leistungsumfang vor Beginn vereinbart werden?",
        answer:
          "Ja. Vor Beginn besprechen wir Anforderungen, Umfang und Reihenfolge der Arbeiten, um einen passenden Projektrahmen zu vereinbaren.",
      },
      {
        question:
          "Welche Angaben werden für eine erste Kostenschätzung benötigt?",
        answer:
          "Hilfreich sind Objektart, Fläche und die gewünschten Arbeiten sowie ein Plan oder Fotos, sofern vorhanden.",
      },
    ],
  },
  calculatorPage: {
    title: "Bau- und Planungskostenrechner für Armenien",
    description:
      "Erhalten Sie eine erste Kostenschätzung für Hausbau oder Planung in AMD. Für Renovierungskosten kontaktieren Sie SHINEX telefonisch, per WhatsApp oder über das Anfrageformular.",
    intro:
      "Der Rechner liefert erste Kostenschätzungen für Hausbau und Planung. Bei Wohnungs-, Haus- oder Gewerberenovierungen kontaktieren Sie uns, um das Objekt, die nötigen Arbeiten und den Weg zur Kostenschätzung zu besprechen.",
    faqTitle: "Berechnungen und Kostenanfragen",
    faqs: [
      {
        question: "Wie erfahre ich die Kosten einer Renovierung?",
        answer:
          "Kontaktieren Sie SHINEX auf dem für Sie passenden Weg und erzählen Sie uns von Ihrem Projekt. Wir klären die Details und vereinbaren die nächsten Schritte zur Kostenschätzung.",
      },
      {
        question: "Was umfasst der Rechner?",
        answer:
          "Er bietet eine erste Orientierung für Hausbau und Planung. Der endgültige Umfang und die Kosten werden nach Prüfung der Projektdetails vereinbart.",
      },
    ],
  },
  leadNotification: {
    title: "Neue Website-Anfrage",
    name: "Name",
    phone: "Telefon",
    objectType: "Objektart",
    area: "Fläche",
    region: "Region",
    workType: "Art der Arbeiten",
    options: "Zusätzliche Optionen",
    comment: "Anmerkung",
  },
  common: {
    home: "Startseite",
    back: "Zurück",
    next: "Weiter",
    previous: "Zurück",
    readMore: "Mehr erfahren",
    showMore: "Mehr anzeigen",
    showLess: "Weniger anzeigen",
    loading: "Wird geladen…",
    required: "Erforderlich",
    optional: "Optional",
    notFoundTitle: "Seite nicht gefunden",
    notFoundDescription:
      "Die Adresse hat sich möglicherweise geändert oder die Seite ist nicht mehr verfügbar.",
    returnHome: "Zur Startseite",
    breadcrumbs: "Brotkrümelnavigation",
    skipToContent: "Zum Hauptinhalt springen",
    website: "Website",
    errors: {
      required: "Füllen Sie dieses Pflichtfeld aus.",
      invalidEmail: "Geben Sie eine gültige E-Mail-Adresse ein.",
      invalidPhone: "Geben Sie eine gültige Telefonnummer ein.",
      generic: "Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut.",
    },
    success: { sent: "Ihre Nachricht wurde erfolgreich gesendet." },
  },
} satisfies Dictionary;

export default dictionary;
