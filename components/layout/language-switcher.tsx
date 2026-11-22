"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Check, Globe } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  LOCALE_COOKIE,
  localeDir,
  localeNames,
  locales,
  switchLocalePath,
  type Locale,
} from "@/lib/i18n/config";

interface LanguageSwitcherProps {
  locale: Locale;
  label: string;
}

/** Sélecteur de langue : conserve la page courante et mémorise le choix (cookie technique). */
export function LanguageSwitcher({ locale, label }: LanguageSwitcherProps) {
  const pathname = usePathname() ?? `/${locale}`;

  const remember = (target: Locale) => {
    document.cookie = `${LOCALE_COOKIE}=${target}; path=/; max-age=31536000; samesite=lax`;
  };

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="gap-1.5 px-2.5" aria-label={`${label} : ${localeNames[locale]}`}>
          <Globe aria-hidden="true" className="size-[1.125rem]" strokeWidth={1.5} />
          <span className="text-sm font-semibold uppercase">{locale}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-40">
        {locales.map((target) => (
          <DropdownMenuItem key={target} asChild>
            <Link
              href={switchLocalePath(pathname, target)}
              hrefLang={target}
              lang={target}
              dir={localeDir(target)}
              onClick={() => remember(target)}
              aria-current={target === locale ? "true" : undefined}
              className="flex min-h-11 cursor-pointer items-center justify-between gap-4 text-base"
            >
              {localeNames[target]}
              {target === locale ? (
                <Check aria-hidden="true" className="size-4 text-brass" strokeWidth={1.75} />
              ) : null}
            </Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
