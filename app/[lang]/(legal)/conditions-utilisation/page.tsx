import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { LegalPage } from "@/components/layout/legal-page";
import { hasLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/get-dictionary";

export async function generateMetadata({ params }: PageProps<"/[lang]/conditions-utilisation">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = getDictionary(lang);
  return {
    title: dict.legal.links.terms,
    description: dict.legal.terms.description,
    alternates: { canonical: `/${lang}/conditions-utilisation` },
  };
}

export default async function ConditionsPage({ params }: PageProps<"/[lang]/conditions-utilisation">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  return <LegalPage locale={lang} dict={getDictionary(lang)} page="terms" />;
}
