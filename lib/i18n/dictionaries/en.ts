import type { Dictionary, LegalFacts, LegalSection } from "./fr";

const TC = "to be completed";

export const en: Dictionary = {
  meta: {
    titleSuffix: "Lawyer in Casablanca",
    description:
      "The law office of Maître Fatna Sabour, lawyer in Casablanca: legal advice and representation for businesses and individuals.",
  },
  common: {
    toComplete: TC,
    newTab: "(opens in a new tab)",
    skipToContent: "Skip to content",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    menu: "Menu",
    menuDescription: "Site navigation",
    mainNav: "Main navigation",
    mobileNav: "Mobile navigation",
    themeToggle: "Change theme",
    themeLight: "Switch to light mode",
    themeDark: "Switch to dark mode",
    language: "Language",
    bookCta: "Book an appointment",
  },
  nav: {
    about: "About",
    expertises: "Practice areas",
    reviews: "Reviews",
    method: "Process",
    faq: "FAQ",
    access: "Location",
    contact: "Contact",
  },
  media: {
    alts: [
      "Statue of Justice holding scales",
      "Old library lined with marble busts",
      "Hand signing a document with a pen",
      "Columns and pediment of a courthouse",
      "Wooden judge's gavel",
      "Bound law books in a glass cabinet",
      "Handshake during a meeting",
      "Columned facade of a court building",
      "Bound legal codes and a notebook",
      "Office towers seen from below",
      "Blindfolded statue of Justice",
    ],
    marqueeLabel: "Photographs from the world of law",
    pause: "Pause the photo carousel",
    play: "Resume the photo carousel",
  },
  hero: {
    tagline: "Law office in Casablanca",
    title: "Legal advice and representation for businesses and individuals",
    description:
      "We review your situation, explain your options and represent you before the courts, with the discretion that professional secrecy requires.",
    cta: "Request an appointment",
    secondary: "See our practice areas",
  },
  about: {
    title: "About",
    role: "Lawyer in Casablanca",
    paragraphs: [
      "Maître Fatna Sabour practises in Casablanca, on Boulevard Mohammed V. The office advises and represents individuals and businesses, both in advisory matters and in litigation.",
      "Every case starts with careful listening: understanding the facts, what is at stake and your priorities, then clearly explaining the legal framework, your options and their timeframes.",
      "The office sees clients by appointment only, so that each meeting gets the time it needs, in complete confidentiality.",
    ],
    factsTitle: "The office at a glance",
    facts: [
      { label: "Address", value: "Boulevard Mohammed V, Casablanca" },
      { label: "Meetings", value: "By appointment, Tuesday to Thursday" },
      { label: "Site languages", value: "French, Arabic, English" },
    ],
    credentialsTitle: "Background",
    portraitAlt: "Portrait of Maître Fatna Sabour",
    cta: "Book an appointment",
  },
  expertises: {
    title: "Our practice areas",
    intro:
      "We advise early to prevent disputes, and we go to court when a disagreement cannot be settled any other way.",
    topicsLabel: "Typical matters",
    items: [
      {
        id: "affaires",
        title: "Business and corporate law",
        summary:
          "Company formation and structuring, shareholder relations, commercial contracts and share transfers.",
        topics: ["Articles and agreements", "Share transfers", "Commercial contracts"],
      },
      {
        id: "contentieux",
        title: "Litigation and arbitration",
        summary:
          "Representation before civil and commercial courts, arbitration, mediation and debt recovery.",
        topics: ["Commercial courts", "Arbitration", "Debt recovery"],
      },
      {
        id: "immobilier",
        title: "Real estate law",
        summary:
          "Securing acquisitions, drafting and renegotiating leases, co-ownership and construction disputes.",
        topics: ["Acquisitions", "Commercial leases", "Co-ownership"],
      },
      {
        id: "travail",
        title: "Employment law",
        summary:
          "Advice to employers and employees alike: contracts, terminations, disciplinary procedures and individual disputes.",
        topics: ["Employment contracts", "Terminations", "Labour disputes"],
      },
      {
        id: "famille",
        title: "Family law",
        summary:
          "Marriage, divorce, child custody and inheritance, under the Moroccan Family Code and with discretion.",
        topics: ["Divorce", "Custody and support", "Inheritance"],
      },
      {
        id: "penal",
        title: "Business criminal law",
        summary:
          "Assistance from the investigation stage, defence before criminal courts, complaints and civil-party claims.",
        topics: ["Investigation", "Criminal defence", "Civil-party claims"],
      },
    ],
  },
  firm: {
    title: "A small office that gives every case full attention",
    intro:
      "Every legal issue is first a personal situation or a business decision. We take the time to understand it before proposing a strategy, and we tell you plainly what is possible.",
    imageAlt: "Blindfolded statue of Justice holding scales",
    principles: [
      {
        title: "Professional secrecy from the very first contact",
        text: "What you tell your lawyer is covered by professional secrecy, even before anything is signed.",
      },
      {
        title: "Fees agreed before any commitment",
        text: "The amount or the way it is calculated is explained at the outset, then set out in a written fee agreement.",
      },
      {
        title: "A single point of contact",
        text: "You know who is handling your case and you are kept informed at every important stage.",
      },
    ],
  },
  reviews: {
    title: "What clients say",
    intro: "Reviews published on the office's Google listing.",
    outOf: "out of 5",
    basedOn: (count: number) => `based on ${count} Google reviews`,
    seeAll: "See all reviews on Google",
    localGuide: "Local Guide",
    authorReviews: (n: number) => (n > 1 ? `${n} reviews` : "1 review"),
    ownerResponse: "Response from the office",
    showTranslation: true,
    translatedBy: "Translated by Google",
    originalLanguageNote: "Original in French",
  },
  gallery: {
    title: "Law in pictures",
    intro: "A few images from the world we work in.",
    note: "Illustrative photographs.",
    prev: "Previous photo",
    next: "Next photo",
    slide: (i: number, total: number) => `Photo ${i} of ${total}`,
  },
  method: {
    title: "How your case is handled",
    intro: "Four steps, from first contact to following up the proceedings.",
    stepLabel: "Step",
    steps: [
      {
        title: "First contact",
        text: "You describe your situation by phone or through the form. We check for any conflict of interest before setting an appointment.",
      },
      {
        title: "Review meeting",
        text: "We study your documents, identify the risks and present the available options, with their timeframes.",
      },
      {
        title: "Fee agreement",
        text: "You receive a written proposal setting out the scope of work, the expected timeline and the fees.",
      },
      {
        title: "Handling and follow-up",
        text: "We act on your behalf and consult you before any important decision. You receive every document in the proceedings.",
      },
    ],
  },
  confidentiality: {
    title: "What you share stays between you and your lawyer",
    text: "Professional secrecy protects your communications, your documents and the very existence of your case. Only the law can lift it.",
  },
  faq: {
    title: "Frequently asked questions",
    intro: "Answers to the questions we are asked most often before a first meeting.",
    otherTitle: "Another question?",
    otherText: "The office will answer you by phone or by email.",
    call: "Call",
    write: "Send an email",
    items: [
      {
        icon: "calendar",
        question: "How does the first meeting work?",
        answer:
          "You explain your situation and bring the relevant documents. The lawyer explains the legal framework, the possible options and the usual timeframes. The terms of this meeting are confirmed when you get in touch.",
      },
      {
        icon: "fees",
        question: "How are fees set?",
        answer:
          "They depend on the nature of the case, its complexity and the time it requires. They can be a fixed amount or based on time spent, and they are always presented before any commitment, in a written fee agreement.",
      },
      {
        icon: "secret",
        question: "Are my communications with the office confidential?",
        answer:
          "Yes. Professional secrecy covers your communications, your documents and the very existence of your case. Please do not send confidential documents through the website form: they will be requested through an appropriate channel.",
      },
      {
        icon: "documents",
        question: "Which documents should I prepare?",
        answer:
          "Anything that describes your situation: contracts, letters, previous decisions, written exchanges and company documents where relevant. A precise list is sent to you when the appointment is booked.",
      },
    ],
  },
  location: {
    title: "Visiting the office",
    intro:
      "The office, in central Casablanca, sees clients by appointment only on Tuesday, Wednesday and Thursday. Call or write to book a time.",
    addressTitle: "Address",
    routeGoogle: "Directions in Google Maps",
    routeWaze: "Open in Waze",
    hoursTitle: "Meeting days",
    today: "Today",
    closed: "Closed",
    appointmentOnly: "By appointment only",
    from: (time: string) => `From ${time}`,
    range: (open: string, close: string) => `${open} to ${close}`,
    forAppointment: "To book:",
    mapShow: "Show the map",
    mapNote: "The map is provided by Google and only loads when you ask for it.",
    mapTitle: (name: string) => `Map: ${name}`,
    days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
  },
  contact: {
    title: "Request an appointment",
    intro: "Briefly describe your situation. The office will contact you to arrange a meeting.",
    warning:
      "Do not include confidential details or attach documents through this form: they will be requested at the meeting.",
    labels: { address: "Address", phone: "Phone", email: "Email", hours: "Meetings" },
    hoursSummary: "Tuesday, Wednesday and Thursday, by appointment only",
    form: {
      name: "Full name",
      email: "Email address",
      phone: "Phone",
      optional: "(optional)",
      phonePlaceholder: "06 12 34 56 78",
      topic: "Area of law",
      topicPlaceholder: "Choose an area",
      otherTopic: "Other matter",
      message: "Your request",
      messageHint: "A few lines are enough: what the issue is and how urgent it is.",
      consentBefore:
        "I agree that the office may use my information to answer my request, in accordance with the",
      consentLink: "privacy policy",
      submit: "Send my request",
      sending: "Sending",
      honeypot: "Leave this field empty",
    },
    status: {
      success: "Request sent. The office will contact you to arrange a meeting.",
      invalid: "Some fields need correcting.",
      rateLimited:
        "Too many requests from this connection. Try again in an hour or call the office.",
      failed: "The request could not be sent. Try again in a few minutes or call the office.",
    },
    errors: {
      name: "Enter your name.",
      nameMax: "100 characters maximum.",
      email: "Enter your email address.",
      emailInvalid: "Invalid email address, for example name@domain.com.",
      phone: "Invalid number, for example 06 12 34 56 78.",
      topic: "Choose an area of law.",
      message: "Describe your request in at least 20 characters.",
      messageMax: "2,000 characters maximum.",
      consent: "Your consent is needed to process the request.",
    },
  },
  footer: {
    tagline: "Legal advice and representation for businesses and individuals.",
    contactTitle: "Contact details",
    siteTitle: "Site",
    legalTitle: "Legal information",
    rights: "All rights reserved.",
    ids: (ice: string, rc: string) => `ICE: ${ice}. Trade register: ${rc}.`,
  },
  legal: {
    updated: "Last updated: 22 Nov 2026",
    draft:
      "Draft document: items marked “to be completed” must be filled in by the office, and the text reviewed by a legal professional before publication.",
    links: {
      mentions: "Legal notice",
      privacy: "Privacy policy",
      cookies: "Cookie policy",
      terms: "Terms of use",
    },
    mentions: {
      description: "Legal information about the office's website.",
      sections: (f: LegalFacts): LegalSection[] => [
        {
          heading: "Publisher",
          list: [
            `Name: ${f.name}`,
            `Practice structure: ${f.legalForm ?? TC}`,
            `Bar: ${f.bar ?? TC}`,
            `Address: ${f.address}`,
            `Phone: ${f.phone}`,
            `Email: ${f.email}`,
            `ICE: ${f.ice ?? TC}`,
            `Trade register: ${f.rc ?? TC}`,
            `Publication director: ${f.director ?? TC}`,
          ],
        },
        { heading: "Hosting", paragraphs: [f.host ?? `Hosting provider: ${TC} (name, address and contact).`] },
        {
          heading: "Professional rules",
          paragraphs: [
            "The lawyer is bound by the rules of the legal profession in Morocco and by the internal rules of their bar. The information on this site is general: it is not legal advice and does not replace a lawyer's opinion on your situation.",
          ],
        },
        {
          heading: "Intellectual property",
          paragraphs: [
            "The texts and design of this site belong to the office. The photographs are illustrations used under the Unsplash licence.",
          ],
        },
      ],
    },
    privacy: {
      description: "How the office handles the data sent through the contact form.",
      sections: (f: LegalFacts): LegalSection[] => [
        {
          heading: "Scope",
          paragraphs: [
            "This policy describes the data collected by this site and how it is used, in accordance with Moroccan Law No. 09-08 on the protection of individuals with regard to the processing of personal data.",
          ],
        },
        {
          heading: "Data controller",
          paragraphs: [`${f.name}, ${f.email}. CNDP declaration or authorisation number: ${TC}.`],
        },
        {
          heading: "Data collected",
          paragraphs: ["The site only collects data when you send the contact form:"],
          list: [
            "full name;",
            "email address;",
            "phone number, if you choose to provide it;",
            "area of law and message.",
          ],
        },
        {
          heading: "Purpose and legal basis",
          paragraphs: [
            "This data is used only to answer your request and arrange a possible meeting. Processing is based on your consent, given by ticking the box provided. No marketing is carried out.",
          ],
        },
        {
          heading: "Recipients and processors",
          list: [
            "The lawyer and the staff responsible for answering.",
            `Website hosting provider: ${f.host ?? TC}.`,
            `Email delivery service: ${TC}.`,
          ],
        },
        {
          heading: "Retention",
          paragraphs: [
            `The site does not store requests: they are sent to the office by email. If no follow-up is needed, they are deleted after ${TC}. If a case is opened, the retention rules of the profession apply.`,
          ],
        },
        {
          heading: "Your rights",
          paragraphs: [
            `You have the right to access, correct, object to and delete your data. To exercise it, write to ${f.email}. You may also contact the Moroccan data protection authority (CNDP).`,
          ],
        },
        {
          heading: "Security",
          paragraphs: [
            "The site is served over HTTPS only. Form data is validated by the server and never appears in technical logs.",
          ],
        },
      ],
    },
    cookies: {
      description: "This site uses no analytics or advertising cookies.",
      sections: (): LegalSection[] => [
        {
          heading: "No tracking cookies",
          paragraphs: [
            "This site uses no analytics, advertising or social media cookies. That is why no consent banner is shown.",
          ],
        },
        {
          heading: "Saved preferences",
          paragraphs: [
            "Your language choice is kept in a technical cookie (NEXT_LOCALE) and your light or dark theme choice in your browser's local storage. They are only used to display the site the way you chose.",
          ],
        },
        {
          heading: "Third-party resources",
          paragraphs: [
            "Fonts and images are served by the site itself. The only exception is the map in the “Location” section, provided by Google Maps, which only loads if you click “Show the map”. Google may then set its own cookies under its privacy policy. Direction links open Google Maps or Waze in a new tab.",
          ],
        },
      ],
    },
    terms: {
      description: "Terms of use of the office's website.",
      sections: (): LegalSection[] => [
        {
          heading: "Purpose of the site",
          paragraphs: [
            "This site presents the office and its practice areas and lets you request an appointment. It is free to use.",
          ],
        },
        {
          heading: "No legal advice",
          paragraphs: [
            "The content is provided for general information and is not legal advice. Sending the form does not create a lawyer-client relationship: that only exists once the case is accepted and a fee agreement is signed.",
          ],
        },
        {
          heading: "Use of the form",
          paragraphs: [
            "The form is for appointment requests only. Any abuse (automated submissions, unlawful content) may be blocked.",
          ],
        },
        {
          heading: "Liability",
          paragraphs: [
            "The office takes care that the information published is accurate but cannot guarantee that it is complete or up to date at all times, as the law changes.",
          ],
        },
        { heading: "Governing law", paragraphs: ["These terms are governed by Moroccan law."] },
      ],
    },
  },
  notFound: {
    title: "This page does not exist or has moved",
    text: "Check the address you entered, or go back to the home page to find our practice areas and contact details.",
    back: "Back to the home page",
  },
};
