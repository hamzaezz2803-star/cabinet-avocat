import type { Metadata } from "next";

import { LegalPage } from "@/components/layout/legal-page";

export const metadata: Metadata = {
  title: "Politique de cookies",
  description: "Le site n'utilise aucun cookie de mesure d'audience ni de publicité.",
};

export default function CookiesPage() {
  return (
    <LegalPage title="Politique de cookies" updatedAt="22 nov. 2026">
      <h2>Aucun cookie de suivi</h2>
      <p>
        Ce site n&apos;utilise aucun cookie de mesure d&apos;audience, de publicité ou de réseau
        social. C&apos;est pourquoi aucun bandeau de consentement ne vous est présenté.
      </p>

      <h2>Ressources tierces</h2>
      <p>
        Les polices de caractères et les images sont servies directement par le site. Votre
        navigation n&apos;entraîne aucune requête vers un service tiers.
      </p>
      <p>
        Seule exception : la carte de la section « Accès » est fournie par Google Maps. Elle ne se
        charge que si vous cliquez sur « Afficher la carte ». Google peut alors déposer ses propres
        cookies, selon sa{" "}
        <a href="https://policies.google.com/privacy?hl=fr" target="_blank" rel="noopener noreferrer">
          politique de confidentialité
        </a>
        . Les liens d&apos;itinéraire ouvrent Google Maps ou Waze dans un nouvel onglet.
      </p>

      <h2>Évolution</h2>
      <p>
        Si un outil de mesure d&apos;audience était ajouté, il ne serait activé qu&apos;après votre
        accord, et cette page serait mise à jour.
      </p>
    </LegalPage>
  );
}
