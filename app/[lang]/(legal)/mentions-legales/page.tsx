import type { Metadata } from "next";

import { LegalPage } from "@/components/layout/legal-page";
import { formatPhoneMa, siteConfig, TO_COMPLETE } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Mentions légales",
  description: `Informations légales du site ${siteConfig.name}.`,
};

export default function MentionsLegalesPage() {
  const { address, legal, phone, email, bar } = siteConfig;
  const fullAddress =
    [address.street, [address.postalCode, address.city].filter(Boolean).join(" "), address.country]
      .filter(Boolean)
      .join(", ") || TO_COMPLETE;

  return (
    <LegalPage title="Mentions légales" updatedAt="22 nov. 2026">
      <h2>Éditeur du site</h2>
      <ul>
        <li>Raison sociale : {siteConfig.name}</li>
        <li>Forme d&apos;exercice : {legal.legalForm ?? TO_COMPLETE}</li>
        <li>Barreau d&apos;inscription : {bar ?? TO_COMPLETE}</li>
        <li>Adresse : {fullAddress}</li>
        <li>Téléphone : {phone ? formatPhoneMa(phone) : TO_COMPLETE}</li>
        <li>E-mail : {email ?? TO_COMPLETE}</li>
        <li>ICE : {legal.ice ?? TO_COMPLETE}</li>
        <li>RC : {legal.rc ?? TO_COMPLETE}</li>
        <li>Directeur de la publication : {legal.publicationDirector ?? TO_COMPLETE}</li>
      </ul>

      <h2>Hébergement</h2>
      <p>{legal.host ?? `Hébergeur : ${TO_COMPLETE} (nom, adresse et contact).`}</p>

      <h2>Déontologie</h2>
      <p>
        Les avocats du cabinet sont soumis aux règles de la profession d&apos;avocat au Maroc et au
        règlement intérieur de leur barreau. Les informations de ce site sont générales : elles ne
        constituent pas une consultation juridique et ne remplacent pas l&apos;avis d&apos;un avocat
        sur votre situation.
      </p>

      <h2>Propriété intellectuelle</h2>
      <p>
        Les textes et la présentation du site appartiennent au cabinet. Les photographies sont
        utilisées sous licence Unsplash ; leur liste figure dans la documentation du projet.
      </p>
    </LegalPage>
  );
}
