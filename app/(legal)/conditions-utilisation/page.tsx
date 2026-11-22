import type { Metadata } from "next";

import { LegalPage } from "@/components/layout/legal-page";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Conditions d'utilisation",
  description: `Conditions d'utilisation du site ${siteConfig.name}.`,
};

export default function ConditionsPage() {
  return (
    <LegalPage title="Conditions d'utilisation" updatedAt="22 nov. 2026">
      <h2>Objet du site</h2>
      <p>
        Ce site présente le cabinet, ses domaines d&apos;intervention et permet de demander un
        rendez-vous. Son utilisation est gratuite.
      </p>

      <h2>Absence de consultation juridique</h2>
      <p>
        Les contenus publiés sont fournis à titre d&apos;information générale. Ils ne constituent
        pas un conseil juridique. L&apos;envoi du formulaire de contact ne crée aucune relation
        entre vous et le cabinet : celle-ci n&apos;existe qu&apos;après acceptation du dossier et
        signature d&apos;une convention d&apos;honoraires.
      </p>

      <h2>Utilisation du formulaire</h2>
      <p>
        Le formulaire est réservé aux demandes de rendez-vous. Toute utilisation abusive (envois
        automatisés, contenus illicites) peut être bloquée.
      </p>

      <h2>Responsabilité</h2>
      <p>
        Le cabinet veille à l&apos;exactitude des informations publiées mais ne peut garantir
        qu&apos;elles soient complètes ou à jour à tout moment, la législation évoluant.
      </p>

      <h2>Droit applicable</h2>
      <p>Les présentes conditions sont régies par le droit marocain.</p>
    </LegalPage>
  );
}
