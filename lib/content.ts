/**
 * Textes du site. Aucun chiffre, avis ou résultat garanti : voir .agents/rules/ui-ux.md.
 * Les engagements décrits ici (méthode, honoraires) sont à valider par le cabinet.
 */

export interface NavItem {
  label: string;
  href: string;
}

export const navItems: NavItem[] = [
  { label: "Expertises", href: "/#expertises" },
  { label: "Le cabinet", href: "/#cabinet" },
  { label: "Méthode", href: "/#methode" },
  { label: "Questions", href: "/#questions" },
  { label: "Contact", href: "/#contact" },
];

export interface HeroImage {
  src: string;
  alt: string;
}

export const hero = {
  tagline: "Cabinet d'avocat à Casablanca",
  title: "Conseil et défense juridique pour les entreprises et les particuliers",
  description:
    "Nous analysons votre situation, vous présentons vos options et vous représentons devant les juridictions, avec la discrétion qu'impose le secret professionnel.",
  ctaText: "Demander un rendez-vous",
  secondaryText: "Voir nos expertises",
  images: [
    { src: "/images/justice-statue-wood.jpg", alt: "Statue de la Justice tenant une balance" },
    { src: "/images/library-busts.jpg", alt: "Bibliothèque ancienne bordée de bustes en marbre" },
    { src: "/images/signing.jpg", alt: "Main signant un document au stylo" },
    { src: "/images/courthouse-columns.jpg", alt: "Colonnes et fronton d'un palais de justice" },
    { src: "/images/gavel.jpg", alt: "Marteau de juge en bois" },
    { src: "/images/bookcase.jpg", alt: "Ouvrages juridiques reliés dans une vitrine" },
    { src: "/images/handshake.jpg", alt: "Poignée de main lors d'un rendez-vous" },
    { src: "/images/courthouse.jpg", alt: "Façade à colonnes d'un tribunal" },
    { src: "/images/books-pen.jpg", alt: "Codes reliés et carnet de notes" },
    { src: "/images/towers.jpg", alt: "Immeubles de bureaux vus en contre-plongée" },
  ] satisfies HeroImage[],
};

export interface Expertise {
  id: string;
  title: string;
  summary: string;
  topics: string[];
}

export const expertises: Expertise[] = [
  {
    id: "affaires",
    title: "Droit des affaires et des sociétés",
    summary:
      "Création et structuration de sociétés, relations entre associés, contrats commerciaux et opérations de cession.",
    topics: ["Statuts et pactes d'associés", "Cessions de parts", "Contrats commerciaux"],
  },
  {
    id: "contentieux",
    title: "Contentieux et arbitrage",
    summary:
      "Représentation devant les juridictions civiles et commerciales, procédures d'arbitrage et de médiation, recouvrement de créances.",
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
      "Mariage, divorce, garde des enfants et successions, dans le cadre du Code de la famille et avec la plus grande discrétion.",
    topics: ["Divorce", "Garde et pension", "Successions"],
  },
  {
    id: "penal",
    title: "Droit pénal des affaires",
    summary:
      "Assistance dès l'enquête, défense devant les juridictions pénales, dépôt de plainte et constitution de partie civile.",
    topics: ["Enquête et garde à vue", "Défense pénale", "Partie civile"],
  },
];

export interface Principle {
  title: string;
  text: string;
}

export const firm = {
  title: "Un cabinet à taille humaine, attentif à chaque dossier",
  intro:
    "Chaque situation juridique est d'abord une situation personnelle ou une décision d'entreprise. Nous prenons le temps de la comprendre avant de proposer une stratégie, et nous vous disons clairement ce qui est possible.",
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
      title: "Un avocat référent pour votre dossier",
      text: "Vous savez qui suit votre affaire et vous êtes informé de chaque étape importante.",
    },
  ] satisfies Principle[],
};

export interface Step {
  title: string;
  text: string;
}

export const method = {
  title: "Comment se déroule votre dossier",
  intro: "Quatre étapes, du premier contact au suivi de la procédure.",
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
  ] satisfies Step[],
};

export const confidentiality = {
  title: "Ce que vous nous confiez reste entre vous et votre avocat",
  text: "Le secret professionnel protège vos échanges, vos documents et l'existence même de votre dossier. Il ne peut être levé que par la loi.",
};

export interface Faq {
  question: string;
  answer: string;
}

export const faqs: Faq[] = [
  {
    question: "Comment se déroule le premier rendez-vous ?",
    answer:
      "Vous exposez votre situation et apportez les documents utiles. L'avocat vous explique le cadre juridique, les options possibles et les délais habituels. Les conditions de ce rendez-vous vous sont précisées au moment de la prise de contact.",
  },
  {
    question: "Comment sont fixés les honoraires ?",
    answer:
      "Ils dépendent de la nature du dossier, de sa complexité et du temps à y consacrer. Ils peuvent être forfaitaires ou calculés au temps passé. Ils vous sont toujours présentés avant tout engagement, dans une convention d'honoraires écrite.",
  },
  {
    question: "Mes échanges avec le cabinet sont-ils confidentiels ?",
    answer:
      "Oui. Le secret professionnel couvre vos échanges, vos documents et l'existence même de votre dossier. Nous vous conseillons toutefois de ne pas envoyer de pièces confidentielles par le formulaire du site : elles vous seront demandées par un canal adapté.",
  },
  {
    question: "Quels documents préparer ?",
    answer:
      "Tout ce qui retrace votre situation : contrats, courriers, décisions déjà rendues, échanges écrits, pièces d'identité de la société le cas échéant. Une liste précise vous est communiquée lors de la prise de rendez-vous.",
  },
];

export const contact = {
  title: "Demander un rendez-vous",
  intro:
    "Décrivez brièvement votre situation. Le cabinet vous recontacte pour fixer un rendez-vous.",
  warning:
    "N'indiquez pas de détails confidentiels et n'envoyez pas de pièces par ce formulaire : elles vous seront demandées lors du rendez-vous.",
};

export const contactTopics = [
  ...expertises.map((e) => ({ value: e.id, label: e.title })),
  { value: "autre", label: "Autre sujet" },
];
