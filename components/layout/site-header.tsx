"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { Brand } from "@/components/layout/brand";
import { LanguageSwitcher } from "@/components/layout/language-switcher";
import { MobileMenu } from "@/components/layout/mobile-menu";
import { navItems } from "@/components/layout/nav-items";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { Button } from "@/components/ui/button";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionaries/fr";
import { cn } from "@/lib/utils";

interface SiteHeaderProps {
  locale: Locale;
  name: string;
  nav: Dictionary["nav"];
  common: Dictionary["common"];
}

export function SiteHeader({ locale, name, nav, common }: SiteHeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  // Sur l'accueil, tant que l'en-tête survole le héros vert, il reprend ses couleurs.
  const overHero = usePathname() === `/${locale}` && !scrolled;
  const items = navItems(locale, nav);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 h-(--header-height) border-b transition-colors duration-200",
        overHero
          ? "theme-hero border-transparent bg-transparent"
          : scrolled
            ? "border-border bg-background"
            : "border-transparent bg-transparent"
      )}
    >
      <div className="container-site flex h-full items-center justify-between gap-4">
        <Brand locale={locale} name={name} />

        <nav aria-label={common.mainNav} className="hidden xl:block">
          <ul className="flex items-center">
            {items.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="inline-flex min-h-11 items-center rounded-sm px-2.5 text-[0.9375rem] text-muted-foreground transition-colors duration-150 hover:text-foreground"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-1">
          <LanguageSwitcher locale={locale} label={common.language} />
          <ThemeToggle
            labels={{ toggle: common.themeToggle, light: common.themeLight, dark: common.themeDark }}
          />
          <Button asChild variant="outline" size="sm" className="ms-2 hidden sm:inline-flex">
            <Link href={`/${locale}#contact`}>{common.bookCta}</Link>
          </Button>
          <MobileMenu locale={locale} name={name} items={items} common={common} />
        </div>
      </div>
    </header>
  );
}
