import Link from "next/link";
import { lang as rootLang } from "next/root-params";

import { Button } from "@/components/ui/button";
import { defaultLocale, hasLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/get-dictionary";

export default async function NotFound() {
  const value = await rootLang();
  const locale = value && hasLocale(value) ? value : defaultLocale;
  const t = getDictionary(locale).notFound;

  return (
    <section className="container-site flex min-h-[70svh] flex-col justify-center pt-(--header-height)">
      <h1 className="max-w-[18ch] text-[2.5rem] leading-[1.06] sm:text-6xl">{t.title}</h1>
      <p className="mt-6 max-w-[48ch] text-lg text-muted-foreground">{t.text}</p>
      <div className="mt-10">
        <Button asChild size="lg">
          <Link href={`/${locale}`}>{t.back}</Link>
        </Button>
      </div>
    </section>
  );
}
