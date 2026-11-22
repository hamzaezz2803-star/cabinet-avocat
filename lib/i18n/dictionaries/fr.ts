/**
 * Dictionnaire français : référence du typage (`Dictionary`).
 * Aucun chiffre, avis ou résultat garanti inventé (voir .agents/rules/ui-ux.md).
 */

export interface LegalSection {
  heading: string;
  paragraphs?: string[];
  list?: string[];
}

export interface LegalFacts {
  name: string;
  address: string;
  phone: string;
  email: string;
  bar: string | null;
  legalForm: string | null;
  ice: string | null;
  rc: string | null;
  director: string | null;
  host: string | null;
}

const TC = "à compléter";

export const fr = {
  meta: {
    titleSuffix: "Avocat à Casablanca",
    description:
      "Cabinet de Maître Fatna Sabour, avocat à Casablanca : conseil et défense juridique pour les entreprises et les particuliers.",
  },
  common: {
    toComplete: TC,
    newTab: "(nouvel onglet)",
    skipToContent: "Aller au contenu",
    openMenu: "Ouvrir le menu",
    closeMenu: "Fermer le menu",
    menu: "Menu",
    menuDescription: "Navigation du site",
    mainNav: "Navigation principale",
    mobileNav: "Navigation mobile",
    themeToggle: "Changer de thème",
    themeLight: "Passer en mode clair",
    themeDark: "Passer en mode sombre",
    language: "Langue",
    bookCta: "Prendre rendez-vous",
  },
  nav: {
    about: "À propos",
    expertises: "Expertises",
    reviews: "Avis",
    method: "Méthode",
    faq: "Questions",
    access: "Accès",
    contact: "Contact",
  },
  media: {
    alts: [
      "Statue de la Justice tenant une balance",
      "Bibliothèque ancienne bordée de bustes en marbre",
      "Main signant un document au stylo",
      "Colonnes et fronton d'un palais de justice",
      "Marteau de juge en bois",
      "Ouvrages juridiques reliés dans une vitrine",
      "Poignée de main lors d'un rendez-vous",
      "Façade à colonnes d'un tribunal",
      "Codes reliés et carnet de notes",
      "Immeubles de bureaux vus en contre-plongée",
      "Statue de la Justice aux yeux bandés",
    ],
    marqueeLabel: "Photographies du monde juridique",
    pause: "Mettre en pause le défilement des photos",
    play: "Reprendre le défilement des photos",
  },
  hero: {
    tagline: "Cabinet d'avocat à Casablanca",
    title: "Conseil et défense juridique pour les entreprises et les particuliers",
    description:
      "Nous analysons votre situation, vous présentons vos options et vous représentons devant les juridictions, avec la discrétion qu'impose le secret professionnel.",
    cta: "Demander un rendez-vous",
    secondary: "Voir nos expertises",
  },
  about: {
    title: "À propos",
    role: "Avocat à Casablanca",
    paragraphs: [
      "Maître Fatna Sabour exerce à Casablanca, boulevard Mohammed V. Le cabinet accompagne des particuliers et des entreprises, en conseil comme en contentieux.",
      "Chaque dossier commence par une écoute attentive : comprendre les faits, les enjeux et vos priorités, puis expliquer clairement le cadre juridique, les options et leurs délais.",
      "Le cabinet reçoit uniquement sur rendez-vous, pour vous consacrer le temps nécessaire, en toute confidentialité.",
    ],
    factsTitle: "Le cabinet en bref",
    facts: [
      { label: "Adresse", value: "Boulevard Mohammed V, Casablanca" },
      { label: "Réception", value: "Sur rendez-vous, du mardi au jeudi" },
      { label: "Langues du site", value: "Français, arabe, anglais" },
    ],
    credentialsTitle: "Parcours",
    portraitAlt: "Portrait de Maître Fatna Sabour",
    cta: "Prendre rendez-vous",
  },
  expertises: {
    title: "Nos domaines d'intervention",
    intro:
      "Nous conseillons en amont pour éviter le litige, et nous plaidons lorsque le différend ne peut pas se régler autrement.",
    topicsLabel: "Exemples de sujets",
    items: [
      {
        id: "affaires",
        title: "Droit des affaires et des sociétés",
        summary:
          "Création et structuration de sociétés, relations entre associés, contrats commerciaux et opérations de cession.",
        topics: ["Statuts et pactes", "Cessions de parts", "Contrats commerciaux"],
      },
      {
        id: "contentieux",
        title: "Contentieux et arbitrage",
        summary:
          "Représentation devant les juridictions civiles et commerciales, arbitrage, médiation et recouvrement de créances.",
        topics: ["Tribunaux de commerce", "Arbitrage", "Recouvrement"],
      },
      {
        id: "immobilier",
        title: "Droit immobilier",
        summary:
          "Sécurisation des acquisitions, rédaction et renégociation des baux, litiges de copropriété et de construction.",
        topics: ["Acquisitions", "Baux commerciaux", "Copropriété"],
      },
      {
        id: "travail",
        title: "Droit du travail",
        summary:
          "Conseil aux employeurs comme aux salariés : contrats, ruptures, procédures disciplinaires et conflits individuels.",
        topics: ["Contrats de travail", "Ruptures", "Litiges sociaux"],
      },
      {
        id: "famille",
        title: "Droit de la famille",
        summary:
          "Mariage, divorce, garde des enfants et successions, dans le cadre du Code de la famille et avec discrétion.",
        topics: ["Divorce", "Garde et pension", "Successions"],
      },
      {
        id: "penal",
        title: "Droit pénal des affaires",
        summary:
          "Assistance dès l'enquête, défense devant les juridictions pénales, plainte et constitution de partie civile.",
        topics: ["Enquête", "Défense pénale", "Partie civile"],
      },
    ],
  },
  firm: {
    title: "Un cabinet à taille humaine, attentif à chaque dossier",
    intro:
      "Chaque situation juridique est d'abord une situation personnelle ou une décision d'entreprise. Nous prenons le temps de la comprendre avant de proposer une stratégie, et nous vous disons clairement ce qui est possible.",
    imageAlt: "Statue de la Justice aux yeux bandés, tenant une balance",
    principles: [
      {
        title: "Le secret professionnel, dès le premier échange",
        text: "Ce que vous confiez à votre avocat est couvert par le secret professionnel, y compris avant toute signature.",
      },
      {
        title: "Des honoraires annoncés avant tout engagement",
        text: "Le montant ou le mode de calcul vous est présenté au départ, puis fixé dans une convention d'honoraires écrite.",
      },
      {
        title: "Un interlocuteur unique",
        text: "Vous savez qui suit votre affaire et vous êtes informé de chaque étape importante.",
      },
    ],
  },
  reviews: {
    title: "Ce qu'en disent les clients",
    intro: "Avis publiés sur la fiche Google du cabinet.",
    outOf: "sur 5",
    basedOn: (count: number) => `d'après ${count} avis Google`,
    seeAll: "Voir tous les avis sur Google",
    localGuide: "Local Guide",
    authorReviews: (n: number) => (n > 1 ? `${n} avis` : "1 avis"),
    ownerResponse: "Réponse du cabinet",
    /** Langue des avis affichés : texte original. */
    showTranslation: false,
    translatedBy: "",
    originalLanguageNote: "",
  },
  gallery: {
    title: "Le droit en images",
    intro: "Quelques images de l'univers dans lequel nous exerçons.",
    note: "Photographies d'illustration.",
    prev: "Photo précédente",
    next: "Photo suivante",
    slide: (i: number, total: number) => `Photo ${i} sur ${total}`,
  },
  method: {
    title: "Comment se déroule votre dossier",
    intro: "Quatre étapes, du premier contact au suivi de la procédure.",
    stepLabel: "Étape",
    steps: [
      {
        title: "Premier échange",
        text: "Vous décrivez votre situation par téléphone ou par le formulaire. Nous vérifions l'absence de conflit d'intérêts avant de fixer un rendez-vous.",
      },
      {
        title: "Rendez-vous d'analyse",
        text: "Nous étudions vos documents, identifions les risques et vous présentons les options possibles, avec leurs délais.",
      },
      {
        title: "Convention d'honoraires",
        text: "Vous recevez une proposition écrite précisant la mission, le calendrier prévisionnel et les honoraires.",
      },
      {
        title: "Conduite et suivi",
        text: "Nous agissons pour vous et vous consultons avant toute décision importante. Vous recevez chaque acte de la procédure.",
      },
    ],
  },
  confidentiality: {
    title: "Ce que vous nous confiez reste entre vous et votre avocat",
    text: "Le secret professionnel protège vos échanges, vos documents et l'existence même de votre dossier. Il ne peut être levé que par la loi.",
  },
  faq: {
    title: "Questions fréquentes",
    intro: "Les réponses aux questions que l'on nous pose le plus souvent avant un premier rendez-vous.",
    otherTitle: "Une autre question ?",
    otherText: "Le cabinet vous répond par téléphone ou par e-mail.",
    call: "Appeler",
    write: "Écrire un e-mail",
    items: [
      {
        icon: "calendar",
        question: "Comment se déroule le premier rendez-vous ?",
        answer:
          "Vous exposez votre situation et apportez les documents utiles. L'avocat vous explique le cadre juridique, les options possibles et les délais habituels. Les conditions de ce rendez-vous vous sont précisées lors de la prise de contact.",
      },
      {
        icon: "fees",
        question: "Comment sont fixés les honoraires ?",
        answer:
          "Ils dépendent de la nature du dossier, de sa complexité et du temps à y consacrer. Ils peuvent être forfaitaires ou calculés au temps passé, et vous sont toujours présentés avant tout engagement, dans une convention d'honoraires écrite.",
      },
      {
        icon: "secret",
        question: "Mes échanges avec le cabinet sont-ils confidentiels ?",
        answer:
          "Oui. Le secret professionnel couvre vos échanges, vos documents et l'existence même de votre dossier. Évitez toutefois d'envoyer des pièces confidentielles par le formulaire du site : elles vous seront demandées par un canal adapté.",
      },
      {
        icon: "documents",
        question: "Quels documents préparer ?",
        answer:
          "Tout ce qui retrace votre situation : contrats, courriers, décisions déjà rendues, échanges écrits, documents de la société le cas échéant. Une liste précise vous est communiquée lors de la prise de rendez-vous.",
      },
    ],
  },
  location: {
    title: "Venir au cabinet",
    intro:
      "Le cabinet, en plein centre de Casablanca, reçoit uniquement sur rendez-vous le mardi, le mercredi et le jeudi. Appelez ou écrivez pour fixer un créneau.",
    addressTitle: "Adresse",
    routeGoogle: "Itinéraire Google Maps",
    routeWaze: "Ouvrir dans Waze",
    hoursTitle: "Jours de réception",
    today: "Aujourd'hui",
    closed: "Fermé",
    appointmentOnly: "Sur rendez-vous uniquement",
    from: (time: string) => `Dès ${time}`,
    range: (open: string, close: string) => `${open} à ${close}`,
    forAppointment: "Pour un rendez-vous :",
    mapShow: "Afficher la carte",
    mapNote: "La carte est fournie par Google et ne se charge qu'à votre demande.",
    mapTitle: (name: string) => `Carte : ${name}`,
    days: ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"],
  },
  contact: {
    title: "Demander un rendez-vous",
    intro: "Décrivez brièvement votre situation. Le cabinet vous recontacte pour fixer un rendez-vous.",
    warning:
      "N'indiquez pas de détails confidentiels et n'envoyez pas de pièces par ce formulaire : elles vous seront demandées lors du rendez-vous.",
    labels: { address: "Adresse", phone: "Téléphone", email: "E-mail", hours: "Réception" },
    hoursSummary: "Mardi, mercredi et jeudi, sur rendez-vous uniquement",
    form: {
      name: "Nom et prénom",
      email: "Adresse e-mail",
      phone: "Téléphone",
      optional: "(facultatif)",
      phonePlaceholder: "06 12 34 56 78",
      topic: "Domaine concerné",
      topicPlaceholder: "Choisir un domaine",
      otherTopic: "Autre sujet",
      message: "Votre demande",
      messageHint: "Quelques lignes suffisent : la nature du problème et son urgence éventuelle.",
      consentBefore:
        "J'accepte que mes informations soient utilisées par le cabinet pour répondre à ma demande, conformément à la",
      consentLink: "politique de confidentialité",
      submit: "Envoyer ma demande",
      sending: "Envoi en cours",
      honeypot: "Ne pas remplir ce champ",
    },
    status: {
      success: "Demande envoyée. Le cabinet vous recontacte pour fixer un rendez-vous.",
      invalid: "Certains champs sont à corriger.",
      rateLimited:
        "Trop de demandes envoyées depuis cette connexion. Réessayez dans une heure ou appelez le cabinet.",
      failed:
        "La demande n'a pas pu être envoyée. Réessayez dans quelques minutes ou contactez le cabinet par téléphone.",
    },
    errors: {
      name: "Indiquez votre nom.",
      nameMax: "100 caractères maximum.",
      email: "Indiquez votre adresse e-mail.",
      emailInvalid: "Adresse e-mail invalide, par exemple nom@domaine.ma.",
      phone: "Numéro invalide, par exemple 06 12 34 56 78.",
      topic: "Choisissez un domaine.",
      message: "Décrivez votre demande en au moins 20 caractères.",
      messageMax: "2 000 caractères maximum.",
      consent: "Votre accord est nécessaire pour traiter la demande.",
    },
  },
  footer: {
    tagline: "Conseil et défense juridique pour les entreprises et les particuliers.",
    contactTitle: "Coordonnées",
    siteTitle: "Le site",
    legalTitle: "Informations légales",
    rights: "Tous droits réservés.",
    ids: (ice: string, rc: string) => `ICE : ${ice}. RC : ${rc}.`,
  },
  legal: {
    updated: "Dernière mise à jour : 22 nov. 2026",
    draft:
      "Document provisoire : les mentions « à compléter » doivent être renseignées par le cabinet, et le texte relu par un juriste avant la mise en ligne.",
    links: {
      mentions: "Mentions légales",
      privacy: "Politique de confidentialité",
      cookies: "Politique de cookies",
      terms: "Conditions d'utilisation",
    },
    mentions: {
      description: "Informations légales du site du cabinet.",
      sections: (f: LegalFacts): LegalSection[] => [
        {
          heading: "Éditeur du site",
          list: [
            `Nom : ${f.name}`,
            `Forme d'exercice : ${f.legalForm ?? TC}`,
            `Barreau d'inscription : ${f.bar ?? TC}`,
            `Adresse : ${f.address}`,
            `Téléphone : ${f.phone}`,
            `E-mail : ${f.email}`,
            `ICE : ${f.ice ?? TC}`,
            `RC : ${f.rc ?? TC}`,
            `Directeur de la publication : ${f.director ?? TC}`,
          ],
        },
        { heading: "Hébergement", paragraphs: [f.host ?? `Hébergeur : ${TC} (nom, adresse et contact).`] },
        {
          heading: "Déontologie",
          paragraphs: [
            "L'avocat est soumis aux règles de la profession d'avocat au Maroc et au règlement intérieur de son barreau. Les informations de ce site sont générales : elles ne constituent pas une consultation juridique et ne remplacent pas l'avis d'un avocat sur votre situation.",
          ],
        },
        {
          heading: "Propriété intellectuelle",
          paragraphs: [
            "Les textes et la présentation du site appartiennent au cabinet. Les photographies sont des illustrations utilisées sous licence Unsplash.",
          ],
        },
      ],
    },
    privacy: {
      description: "Comment le cabinet traite les données transmises par le formulaire de contact.",
      sections: (f: LegalFacts): LegalSection[] => [
        {
          heading: "Cadre",
          paragraphs: [
            "Cette politique décrit les données collectées par ce site et leur utilisation, conformément à la loi n° 09-08 relative à la protection des personnes physiques à l'égard du traitement des données à caractère personnel.",
          ],
        },
        {
          heading: "Responsable du traitement",
          paragraphs: [`${f.name}, ${f.email}. Numéro de déclaration ou d'autorisation CNDP : ${TC}.`],
        },
        {
          heading: "Données collectées",
          paragraphs: ["Le site ne collecte des données que lorsque vous envoyez le formulaire de contact :"],
          list: [
            "nom et prénom ;",
            "adresse e-mail ;",
            "numéro de téléphone, si vous choisissez de l'indiquer ;",
            "domaine concerné et message.",
          ],
        },
        {
          heading: "Finalité et base légale",
          paragraphs: [
            "Ces données servent uniquement à répondre à votre demande et à organiser un éventuel rendez-vous. Le traitement repose sur votre consentement, exprimé en cochant la case prévue. Aucune prospection commerciale n'est réalisée.",
          ],
        },
        {
          heading: "Destinataires et sous-traitants",
          list: [
            "L'avocat et ses collaborateurs chargés de répondre.",
            `Hébergeur du site : ${f.host ?? TC}.`,
            `Service d'envoi d'e-mails : ${TC}.`,
          ],
        },
        {
          heading: "Durée de conservation",
          paragraphs: [
            `Le site ne stocke pas les demandes : elles sont transmises par e-mail au cabinet. Sans suite donnée, elles sont supprimées au bout de ${TC}. Si un dossier est ouvert, les règles de conservation propres à la profession s'appliquent.`,
          ],
        },
        {
          heading: "Vos droits",
          paragraphs: [
            `Vous disposez d'un droit d'accès, de rectification, d'opposition et de suppression. Pour l'exercer, écrivez à ${f.email}. Vous pouvez également saisir la Commission nationale de contrôle de la protection des données à caractère personnel (CNDP).`,
          ],
        },
        {
          heading: "Sécurité",
          paragraphs: [
            "Le site est servi exclusivement en HTTPS. Les données du formulaire sont validées par le serveur et ne figurent dans aucun journal technique.",
          ],
        },
      ],
    },
    cookies: {
      description: "Le site n'utilise aucun cookie de mesure d'audience ni de publicité.",
      sections: (): LegalSection[] => [
        {
          heading: "Aucun cookie de suivi",
          paragraphs: [
            "Ce site n'utilise aucun cookie de mesure d'audience, de publicité ou de réseau social. C'est pourquoi aucun bandeau de consentement ne vous est présenté.",
          ],
        },
        {
          heading: "Préférences enregistrées",
          paragraphs: [
            "Votre choix de langue est conservé dans un cookie technique (NEXT_LOCALE) et votre choix de thème clair ou sombre dans le stockage local de votre navigateur. Ils servent uniquement à afficher le site comme vous l'avez choisi.",
          ],
        },
        {
          heading: "Ressources tierces",
          paragraphs: [
            "Les polices et les images sont servies directement par le site. Seule exception : la carte de la section « Accès » est fournie par Google Maps et ne se charge que si vous cliquez sur « Afficher la carte ». Google peut alors déposer ses propres cookies, selon sa politique de confidentialité. Les liens d'itinéraire ouvrent Google Maps ou Waze dans un nouvel onglet.",
          ],
        },
      ],
    },
    terms: {
      description: "Conditions d'utilisation du site du cabinet.",
      sections: (): LegalSection[] => [
        {
          heading: "Objet du site",
          paragraphs: [
            "Ce site présente le cabinet, ses domaines d'intervention et permet de demander un rendez-vous. Son utilisation est gratuite.",
          ],
        },
        {
          heading: "Absence de consultation juridique",
          paragraphs: [
            "Les contenus publiés sont fournis à titre d'information générale et ne constituent pas un conseil juridique. L'envoi du formulaire ne crée aucune relation entre vous et le cabinet : celle-ci n'existe qu'après acceptation du dossier et signature d'une convention d'honoraires.",
          ],
        },
        {
          heading: "Utilisation du formulaire",
          paragraphs: [
            "Le formulaire est réservé aux demandes de rendez-vous. Toute utilisation abusive (envois automatisés, contenus illicites) peut être bloquée.",
          ],
        },
        {
          heading: "Responsabilité",
          paragraphs: [
            "Le cabinet veille à l'exactitude des informations publiées mais ne peut garantir qu'elles soient complètes ou à jour à tout moment, la législation évoluant.",
          ],
        },
        { heading: "Droit applicable", paragraphs: ["Les présentes conditions sont régies par le droit marocain."] },
      ],
    },
  },
  notFound: {
    title: "Cette page n'existe pas ou a été déplacée",
    text: "Vérifiez l'adresse saisie, ou revenez à l'accueil pour retrouver nos expertises et nos coordonnées.",
    back: "Revenir à l'accueil",
  },
};

export type Dictionary = typeof fr;
