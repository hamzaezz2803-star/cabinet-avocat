import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { LegalPage } from "@/components/layout/legal-page";
import { hasLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/get-dictionary";

export async function generateMetadata({ params }: PageProps<"/[lang]/mentions-legales">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = getDictionary(lang);
  return {
    title: dict.legal.links.mentions,
    description: dict.legal.mentions.description,
    alternates: { canonical: `/${lang}/mentions-legales` },
  };
}

export default async function MentionsLegalesPage({ params }: PageProps<"/[lang]/mentions-legales">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  return <LegalPage locale={lang} dict={getDictionary(lang)} page="mentions" />;
}
