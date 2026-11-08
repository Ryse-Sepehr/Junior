import type { Locale } from "./i18n"

export const company = {
  name: "Déménagement Gérard & Fils",
  short: "Gérard & Fils",
  mobile: "0484 13 16 81",
  mobileHref: "tel:+32484131681",
  phone: "02 215 08 46",
  phoneHref: "tel:+3222150846",
  email: "info@demenagementgerardetfils.be",
  whatsapp: "https://wa.me/32484131681",
  facebook: "https://www.facebook.com/gerardetfils",
  street: "Avenue des Pagodes 352",
  city: "1020 Laeken",
  vat: "BE 0634.631.804",
  since: 1995,
}

export type PageKind = "home" | "service" | "commune" | "post" | "photos" | "blog" | "devis"

/** Every page of the current site, in the same tree. `hero` is always a real job-site photo. */
export const pages: Record<string, { kind: PageKind; hero: string }> = {
  home: { kind: "home", hero: "camion-lift-dernier-etage" },
  "demenagement-piano": { kind: "service", hero: "piano-sur-elevateur-allongee" },
  "demenagement-de-particulier": { kind: "service", hero: "camion-lift-quartier-residentiel-allongee" },
  "demenagement-bureau": { kind: "service", hero: "chargement-camion-colis-rouges" },
  "demenagements-nationaux": { kind: "service", hero: "demenagement-gerard-rue-bruxelles" },
  "demenagements-internationaux": { kind: "service", hero: "camions-gerard-prairie" },
  "garde-meubles": { kind: "service", hero: "garde-meubles-container-allongee" },
  "dechetterie-vide-maison-nettoyage": { kind: "service", hero: "meuble-emcombrants" },
  "location-de-lift": { kind: "service", hero: "lift-demontable-allongee" },
  photos: { kind: "photos", hero: "service-lift-deuxieme-etage-allongee" },
  blog: { kind: "blog", hero: "emballage-tableau" },
  "devis-demenagement": { kind: "devis", hero: "materiel-emballage-valises-penderies" },
  "demenagement-etterbeek": { kind: "commune", hero: "camion-lift-dernier-etage" },
  "demenagement-ixelles": { kind: "commune", hero: "lift-elevateur-immeuble-bruxelles" },
  "demenagement-rhode-saint-genese": { kind: "commune", hero: "lift-service-maison" },
  "demenagement-schaerbeek": { kind: "commune", hero: "demenagement-gerard-rue-bruxelles" },
  auderghem: { kind: "commune", hero: "lift-dernier-etage-haut-immeuble" },
  jette: { kind: "commune", hero: "chargement-lift-deux-camions" },
  uccle: { kind: "commune", hero: "service-lift-jardin" },
  woluwe: { kind: "commune", hero: "emballage-tableau" },
  forest: { kind: "commune", hero: "camion-lift-quartier-residentiel-allongee" },
  "watermael-boitsfort": { kind: "commune", hero: "camions-gerard-prairie" },
  "preparation-demenagement": { kind: "post", hero: "emballage-assiettes-fragiles" },
  "demenagement-pianos-conseils": { kind: "post", hero: "transport-piano-escalier" },
  "pourquoi-louer-garde-meubles": { kind: "post", hero: "entrepot_containers" },
  "preparation-demenagements-complexes": { kind: "post", hero: "piano-emballage-lift-exterieur-allongee" },
  "animal-de-compagnie": { kind: "post", hero: "caisses-valises-rouges-emballage" },
  "quelle-saison-choisir-pour-demenagement": { kind: "post", hero: "stationnement-camion-demenagement-gerard" },
}

export const posts = [
  "quelle-saison-choisir-pour-demenagement",
  "animal-de-compagnie",
  "preparation-demenagements-complexes",
  "pourquoi-louer-garde-meubles",
  "demenagement-pianos-conseils",
  "preparation-demenagement",
]

export const communes = [
  "demenagement-schaerbeek",
  "demenagement-ixelles",
  "jette",
  "demenagement-etterbeek",
  "uccle",
  "woluwe",
  "auderghem",
  "forest",
  "watermael-boitsfort",
  "demenagement-rhode-saint-genese",
]

export const moveServices = [
  "demenagement-piano",
  "demenagement-de-particulier",
  "demenagement-bureau",
  "demenagements-nationaux",
  "demenagements-internationaux",
]
export const otherServices = ["garde-meubles", "dechetterie-vide-maison-nettoyage", "location-de-lift"]

/**
 * The current site uses a few stock photos. The manager wants only real job-site photos,
 * so every stock image is swapped for one of the company's own pictures.
 */
const replace: Record<string, string> = {
  "demenagement-bureaux-vertical": "cartons-bleus-demenagement-camion",
  "demenagement-bureaux": "chargement-camion-colis-rouges",
  "demenagement-office": "materiel-emballage-valises-penderies",
  "entreprise-banner": "demenagement-gerard-rue-bruxelles",
  "entreprot-cartons": "caisses-valises-rouges-emballage",
  "transport-caisses": "demenageur-appartement",
  "parc-containeurs": "dechets-bois",
  "Demenagement-international": "camions-gerard-prairie",
  "lift-dernier-etage-immeuble-bruxelles": "lift-dernier-etage-haut-immeuble",
  "lift-deuxieme-etage-petit": "service-lift-deuxieme-etage",
  "demenagement-gerard-rue-bruxelles-recadre": "demenagement-gerard-rue-bruxelles",
  "chargement-piano-1": "chargement-piano",
  "lift-demontable-1": "lift-demontable",
}

export function media(file: string): string {
  let n = file.replace(/\.(jpe?g|png|webp)$/i, "").replace(/-scaled(-1)?$/, "").replace(/-1$/, "")
  if (file.startsWith("lift-demontable-1")) n = "lift-demontable"
  n = replace[n] ?? n
  return `/media/${n}.webp`
}

/** All real photos, for the gallery. */
export const gallery = [
  "camion-lift-dernier-etage",
  "piano-sur-elevateur",
  "service-lift-vue-plongeante",
  "transport-piano-escalier",
  "chargement-lift-deux-camions",
  "emballage-tableau",
  "lift-demontable-piano",
  "stationnement-camion-demenagement-gerard",
  "emballage-assiettes-fragiles",
  "camion-lift-quartier-residentiel",
  "garde-meubles-container",
  "transport-roulettes-piano",
  "service-lift-jardin",
  "chargement-camion-colis-rouges",
  "demenagement-gerard-rue-bruxelles",
  "lift-dernier-etage-haut-immeuble",
  "emballage-vaisselle-fragile",
  "camions-gerard-prairie",
  "piano-emballage-lift-exterieur",
  "materiel-emballage-valises-penderies",
  "lift-elevateur-immeuble-bruxelles",
  "cartons-bleus-demenagement-camion",
  "chargement-piano",
  "service-lift-deuxieme-etage",
  "caisses-valises-rouges-emballage",
  "lift-service-maison",
  "emballage-cuisine",
  "entrepot_containers",
  "demenageur-appartement",
  "emballage-protection",
  "lift-demontable",
  "meuble-emcombrants",
  "piano",
  "lift",
]

export const videos = [
  { src: "/video/video-demenagement-piano.mp4", poster: "/video/video-demenagement-piano.jpg" },
  { src: "/video/piano-lift-descente.mp4", poster: "/video/piano-lift-descente.jpg" },
  { src: "/video/transport-piano-couloir.mp4", poster: "/video/transport-piano-couloir.jpg" },
]

type Dict = {
  nav: Record<string, string>
  groups: { moving: string; other: string; communes: string; info: string }
  home: string
  menu: string
  call: string
  quote: string
  quoteLong: string
  learnMore: string
  readMore: string
  heroKicker: string
  heroTitle: [string, string]
  heroSub: string
  scroll: string
  stats: { value: string; label: string }[]
  servicesKicker: string
  servicesTitle: string
  otherTitle: string
  videosKicker: string
  videosTitle: string
  videosText: string
  communesKicker: string
  communesTitle: string
  communesText: string
  faqTitle: string
  ctaTitle: string
  ctaText: string
  footerAbout: string
  footerCbd: string
  legal: [string, string, string]
  rights: string
  galleryNote: string
  blogTitle: string
  related: string
  realPhotos: string
  form: {
    title: string
    contact: string
    from: string
    to: string
    details: string
    firstName: string
    lastName: string
    email: string
    phone: string
    street: string
    number: string
    city: string
    zip: string
    building: string
    buildingOpts: [string, string, string]
    elevator: string
    yes: string
    no: string
    floor: string
    area: string
    date: string
    volume: string
    options: string
    optionList: string[]
    liftAccess: string
    liftOpts: [string, string, string]
    help: string
    people: string
    remarks: string
    send: string
    sending: string
    sent: string
    sentText: string
    error: string
    privacy: string
  }
}

export const dict: Record<Locale, Dict> = {
  fr: {
    nav: {
      "demenagement-piano": "Déménagement de pianos",
      "demenagement-de-particulier": "Déménagement de particuliers",
      "demenagement-bureau": "Déménagement de bureaux",
      "demenagements-nationaux": "Déménagements nationaux",
      "demenagements-internationaux": "Déménagements internationaux",
      "garde-meubles": "Garde-meubles",
      "dechetterie-vide-maison-nettoyage": "Déchetterie, vide-maison et nettoyage",
      "location-de-lift": "Nos lifts & lift service",
      photos: "Photos",
      blog: "Blog",
      "devis-demenagement": "Contact",
    },
    groups: { moving: "Déménagement", other: "Autres services", communes: "Nos communes", info: "Informations" },
    home: "Accueil",
    menu: "Menu",
    call: "Appeler",
    quote: "Obtenez un devis",
    quoteLong: "Demandez un devis gratuit",
    learnMore: "En savoir plus",
    readMore: "Lire l’article",
    heroKicker: "Entreprise familiale depuis 1995 · Bruxelles",
    heroTitle: ["Gérard & Fils,", "le partenaire de votre déménagement"],
    heroSub: "À Bruxelles, en Belgique et à l’international. Particuliers, entreprises, pianos, lift et garde-meubles.",
    scroll: "Découvrir",
    stats: [
      { value: "30+", label: "ans d’expérience" },
      { value: "19", label: "communes bruxelloises" },
      { value: "CBD", label: "membre agréé" },
      { value: "EU", label: "partout en Europe" },
    ],
    servicesKicker: "Nos prestations",
    servicesTitle: "Un déménageur pour chaque situation",
    otherTitle: "Nos services complémentaires",
    videosKicker: "Sur le terrain",
    videosTitle: "Nos équipes en action",
    videosText: "Pas de mise en scène : ces vidéos ont été tournées pendant nos propres chantiers à Bruxelles.",
    communesKicker: "Partout à Bruxelles",
    communesTitle: "Votre déménageur dans toute la capitale",
    communesText: "Nous connaissons chaque commune, ses rues étroites, ses règles de stationnement et ses immeubles.",
    faqTitle: "Questions fréquentes",
    ctaTitle: "Un déménagement en vue ?",
    ctaText: "Recevez un devis gratuit, détaillé et sans surprises. Nous répondons rapidement, par téléphone ou par e-mail.",
    footerAbout:
      "Nous gérons de A à Z le déménagement des particuliers et des professionnels à Bruxelles, en Belgique et à l’international.",
    footerCbd:
      "Membre agréé de la Chambre Belge des Déménageurs, association professionnelle dont les membres respectent une charte de qualité.",
    legal: ["Mentions légales", "Politique de confidentialité", "Politique des cookies"],
    rights: "Tous droits réservés",
    galleryNote: "Toutes les photos et vidéos de cette page proviennent de nos propres chantiers.",
    blogTitle: "Articles de blog",
    related: "À lire aussi",
    realPhotos: "Photo de chantier réelle",
    form: {
      title: "Votre demande de devis",
      contact: "Vos coordonnées",
      from: "Adresse de départ",
      to: "Adresse d’arrivée",
      details: "Votre déménagement",
      firstName: "Prénom",
      lastName: "Nom",
      email: "E-mail",
      phone: "Téléphone",
      street: "Rue",
      number: "Numéro",
      city: "Localité",
      zip: "Code postal",
      building: "Type de bâtiment",
      buildingOpts: ["Maison", "Appartement", "Autre"],
      elevator: "Ascenseur",
      yes: "Oui",
      no: "Non",
      floor: "Étage",
      area: "Superficie (m²)",
      date: "Date de déménagement souhaitée",
      volume: "Volume à déménager (m³)",
      options: "Options souhaitées",
      optionList: ["Démontage/remontage", "Emballage du fragile", "Mise en cartons", "Service déchetterie", "Garde-meuble"],
      liftAccess: "Accès pour le lift",
      liftOpts: ["Normal", "Difficile", "Impossible"],
      help: "Aide fournie par vos soins",
      people: "Nombre de personnes",
      remarks: "Remarques",
      send: "Envoyer ma demande",
      sending: "Envoi…",
      sent: "Merci, votre demande est envoyée.",
      sentText: "Nous revenons vers vous très rapidement avec un devis détaillé.",
      error: "L’envoi a échoué. Appelez-nous au 0484 13 16 81 ou écrivez à info@demenagementgerardetfils.be.",
      privacy: "Vos données servent uniquement à établir votre devis.",
    },
  },
  nl: {
    nav: {
      "demenagement-piano": "Pianoverhuizing",
      "demenagement-de-particulier": "Verhuizing voor particulieren",
      "demenagement-bureau": "Kantoorverhuizing",
      "demenagements-nationaux": "Nationale verhuizingen",
      "demenagements-internationaux": "Internationale verhuizingen",
      "garde-meubles": "Meubelopslag",
      "dechetterie-vide-maison-nettoyage": "Containerpark, woningontruiming en schoonmaak",
      "location-de-lift": "Onze verhuisliften & liftservice",
      photos: "Foto’s",
      blog: "Blog",
      "devis-demenagement": "Contact",
    },
    groups: { moving: "Verhuizen", other: "Andere diensten", communes: "Onze gemeenten", info: "Informatie" },
    home: "Home",
    menu: "Menu",
    call: "Bellen",
    quote: "Vraag een offerte",
    quoteLong: "Vraag een gratis offerte",
    learnMore: "Meer weten",
    readMore: "Lees het artikel",
    heroKicker: "Familiebedrijf sinds 1995 · Brussel",
    heroTitle: ["Gérard & Fils,", "uw partner voor uw verhuizing"],
    heroSub: "In Brussel, in heel België en naar het buitenland. Particulieren, bedrijven, piano’s, verhuislift en meubelopslag.",
    scroll: "Ontdekken",
    stats: [
      { value: "30+", label: "jaar ervaring" },
      { value: "19", label: "Brusselse gemeenten" },
      { value: "BKV", label: "erkend lid" },
      { value: "EU", label: "in heel Europa" },
    ],
    servicesKicker: "Onze diensten",
    servicesTitle: "Een verhuizer voor elke situatie",
    otherTitle: "Onze aanvullende diensten",
    videosKicker: "Op het terrein",
    videosTitle: "Onze ploegen aan het werk",
    videosText: "Geen enscenering: deze video’s zijn opgenomen tijdens onze eigen verhuizingen in Brussel.",
    communesKicker: "Overal in Brussel",
    communesTitle: "Uw verhuizer in de hele hoofdstad",
    communesText: "Wij kennen elke gemeente, haar smalle straten, parkeerregels en gebouwen.",
    faqTitle: "Veelgestelde vragen",
    ctaTitle: "Plant u een verhuizing?",
    ctaText: "Ontvang een gratis, gedetailleerde offerte zonder verrassingen. Wij antwoorden snel, telefonisch of per e-mail.",
    footerAbout:
      "Wij regelen de verhuizing van particulieren en professionals van A tot Z, in Brussel, in België en naar het buitenland.",
    footerCbd:
      "Erkend lid van de Belgische Kamer van Verhuizers, een beroepsvereniging waarvan de leden een kwaliteitscharter naleven.",
    legal: ["Wettelijke vermeldingen", "Privacybeleid", "Cookiebeleid"],
    rights: "Alle rechten voorbehouden",
    galleryNote: "Alle foto’s en video’s op deze pagina komen van onze eigen verhuizingen.",
    blogTitle: "Blogartikels",
    related: "Lees ook",
    realPhotos: "Echte werffoto",
    form: {
      title: "Uw offerteaanvraag",
      contact: "Uw gegevens",
      from: "Vertrekadres",
      to: "Aankomstadres",
      details: "Uw verhuizing",
      firstName: "Voornaam",
      lastName: "Naam",
      email: "E-mail",
      phone: "Telefoon",
      street: "Straat",
      number: "Nummer",
      city: "Gemeente",
      zip: "Postcode",
      building: "Type gebouw",
      buildingOpts: ["Huis", "Appartement", "Andere"],
      elevator: "Lift in het gebouw",
      yes: "Ja",
      no: "Nee",
      floor: "Verdieping",
      area: "Oppervlakte (m²)",
      date: "Gewenste verhuisdatum",
      volume: "Te verhuizen volume (m³)",
      options: "Gewenste opties",
      optionList: ["Demontage/montage", "Inpakken van breekbare spullen", "Inpakken in dozen", "Containerparkservice", "Meubelopslag"],
      liftAccess: "Toegang voor de verhuislift",
      liftOpts: ["Normaal", "Moeilijk", "Onmogelijk"],
      help: "Hulp van uw kant",
      people: "Aantal personen",
      remarks: "Opmerkingen",
      send: "Aanvraag versturen",
      sending: "Verzenden…",
      sent: "Bedankt, uw aanvraag is verstuurd.",
      sentText: "Wij nemen snel contact met u op met een gedetailleerde offerte.",
      error: "Verzenden is mislukt. Bel ons op 0484 13 16 81 of mail naar info@demenagementgerardetfils.be.",
      privacy: "Uw gegevens worden enkel gebruikt om uw offerte op te stellen.",
    },
  },
  en: {
    nav: {
      "demenagement-piano": "Piano removals",
      "demenagement-de-particulier": "Home removals",
      "demenagement-bureau": "Office removals",
      "demenagements-nationaux": "National removals",
      "demenagements-internationaux": "International removals",
      "garde-meubles": "Furniture storage",
      "dechetterie-vide-maison-nettoyage": "Waste disposal, house clearance & cleaning",
      "location-de-lift": "Our lifts & lift service",
      photos: "Photos",
      blog: "Blog",
      "devis-demenagement": "Contact",
    },
    groups: { moving: "Removals", other: "Other services", communes: "Where we work", info: "Information" },
    home: "Home",
    menu: "Menu",
    call: "Call",
    quote: "Get a quote",
    quoteLong: "Request a free quote",
    learnMore: "Learn more",
    readMore: "Read the article",
    heroKicker: "Family business since 1995 · Brussels",
    heroTitle: ["Gérard & Fils,", "your partner for a smooth move"],
    heroSub: "In Brussels, across Belgium and abroad. Homes, offices, pianos, furniture lifts and storage.",
    scroll: "Discover",
    stats: [
      { value: "30+", label: "years of experience" },
      { value: "19", label: "Brussels municipalities" },
      { value: "CBD", label: "approved member" },
      { value: "EU", label: "anywhere in Europe" },
    ],
    servicesKicker: "Our services",
    servicesTitle: "A removal company for every situation",
    otherTitle: "Our additional services",
    videosKicker: "On the job",
    videosTitle: "Our teams at work",
    videosText: "Nothing staged: these videos were filmed during our own removals in Brussels.",
    communesKicker: "All over Brussels",
    communesTitle: "Your removal company across the capital",
    communesText: "We know every municipality, its narrow streets, parking rules and buildings.",
    faqTitle: "Frequently asked questions",
    ctaTitle: "Planning a move?",
    ctaText: "Get a free, detailed quote with no surprises. We reply quickly, by phone or by email.",
    footerAbout:
      "We handle home and business removals from start to finish, in Brussels, across Belgium and internationally.",
    footerCbd:
      "Approved member of the Belgian Chamber of Removers, a professional association whose members follow a quality charter.",
    legal: ["Legal notice", "Privacy policy", "Cookie policy"],
    rights: "All rights reserved",
    galleryNote: "Every photo and video on this page comes from our own jobs.",
    blogTitle: "Blog articles",
    related: "Read next",
    realPhotos: "Real job-site photo",
    form: {
      title: "Your quote request",
      contact: "Your details",
      from: "Moving from",
      to: "Moving to",
      details: "Your move",
      firstName: "First name",
      lastName: "Last name",
      email: "Email",
      phone: "Phone",
      street: "Street",
      number: "Number",
      city: "Town",
      zip: "Postcode",
      building: "Type of building",
      buildingOpts: ["House", "Flat", "Other"],
      elevator: "Lift in the building",
      yes: "Yes",
      no: "No",
      floor: "Floor",
      area: "Floor area (m²)",
      date: "Preferred moving date",
      volume: "Volume to move (m³)",
      options: "Options",
      optionList: ["Dismantling/reassembly", "Packing fragile items", "Packing into boxes", "Waste disposal service", "Furniture storage"],
      liftAccess: "Access for the furniture lift",
      liftOpts: ["Normal", "Difficult", "Impossible"],
      help: "Help provided by you",
      people: "Number of people",
      remarks: "Remarks",
      send: "Send my request",
      sending: "Sending…",
      sent: "Thank you, your request has been sent.",
      sentText: "We will get back to you very soon with a detailed quote.",
      error: "Sending failed. Call us on 0484 13 16 81 or email info@demenagementgerardetfils.be.",
      privacy: "Your details are only used to prepare your quote.",
    },
  },
}

/** Short labels for the fold-out menu (one line each). */
export const menuLabels: Record<Locale, Record<string, string>> = {
  fr: {
    home: "Accueil",
    "demenagement-de-particulier": "Particuliers",
    "demenagement-bureau": "Bureaux",
    "demenagement-piano": "Pianos",
    "demenagements-nationaux": "National",
    "demenagements-internationaux": "International",
    "garde-meubles": "Garde-meubles",
    "location-de-lift": "Lift",
    "dechetterie-vide-maison-nettoyage": "Déchetterie",
    photos: "Photos",
    blog: "Blog",
    "devis-demenagement": "Contact",
  },
  nl: {
    home: "Home",
    "demenagement-de-particulier": "Particulieren",
    "demenagement-bureau": "Kantoren",
    "demenagement-piano": "Piano’s",
    "demenagements-nationaux": "Nationaal",
    "demenagements-internationaux": "Internationaal",
    "garde-meubles": "Opslag",
    "location-de-lift": "Verhuislift",
    "dechetterie-vide-maison-nettoyage": "Ontruiming",
    photos: "Foto’s",
    blog: "Blog",
    "devis-demenagement": "Contact",
  },
  en: {
    home: "Home",
    "demenagement-de-particulier": "Homes",
    "demenagement-bureau": "Offices",
    "demenagement-piano": "Pianos",
    "demenagements-nationaux": "National",
    "demenagements-internationaux": "International",
    "garde-meubles": "Storage",
    "location-de-lift": "Lift",
    "dechetterie-vide-maison-nettoyage": "Clearance",
    photos: "Photos",
    blog: "Blog",
    "devis-demenagement": "Contact",
  },
}

export const communeNames: Record<Locale, Record<string, string>> = {
  fr: {
    "demenagement-schaerbeek": "Schaerbeek",
    "demenagement-ixelles": "Ixelles",
    jette: "Jette",
    "demenagement-etterbeek": "Etterbeek",
    uccle: "Uccle",
    woluwe: "Woluwe",
    auderghem: "Auderghem",
    forest: "Forest",
    "watermael-boitsfort": "Watermael-Boitsfort",
    "demenagement-rhode-saint-genese": "Rhode-Saint-Genèse",
  },
  nl: {
    "demenagement-schaerbeek": "Schaarbeek",
    "demenagement-ixelles": "Elsene",
    jette: "Jette",
    "demenagement-etterbeek": "Etterbeek",
    uccle: "Ukkel",
    woluwe: "Woluwe",
    auderghem: "Oudergem",
    forest: "Vorst",
    "watermael-boitsfort": "Watermaal-Bosvoorde",
    "demenagement-rhode-saint-genese": "Sint-Genesius-Rode",
  },
  en: {
    "demenagement-schaerbeek": "Schaerbeek",
    "demenagement-ixelles": "Ixelles",
    jette: "Jette",
    "demenagement-etterbeek": "Etterbeek",
    uccle: "Uccle",
    woluwe: "Woluwe",
    auderghem: "Auderghem",
    forest: "Forest",
    "watermael-boitsfort": "Watermael-Boitsfort",
    "demenagement-rhode-saint-genese": "Rhode-Saint-Genèse",
  },
}
