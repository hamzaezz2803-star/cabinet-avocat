"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu } from "lucide-react";

import { Brand } from "@/components/layout/brand";
import type { NavItem } from "@/components/layout/nav-items";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { localeDir, type Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionaries/fr";

interface MobileMenuProps {
  locale: Locale;
  name: string;
  items: NavItem[];
  common: Dictionary["common"];
}

/** Menu mobile : Radix Dialog (piège de focus, Échap, retour du focus). */
export function MobileMenu({ locale, name, items, common }: MobileMenuProps) {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);
  const rtl = localeDir(locale) === "rtl";

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="xl:hidden" aria-label={common.openMenu}>
          <Menu className="size-5" strokeWidth={1.5} aria-hidden="true" />
        </Button>
      </SheetTrigger>
      <SheetContent
        side={rtl ? "left" : "right"}
        closeLabel={common.closeMenu}
        className="w-full max-w-none gap-0 bg-background p-0 sm:max-w-sm"
      >
        <div className="flex h-(--header-height) items-center border-b px-5">
          <Brand locale={locale} name={name} onNavigate={close} />
        </div>
        <SheetTitle className="sr-only">{common.menu}</SheetTitle>
        <SheetDescription className="sr-only">{common.menuDescription}</SheetDescription>
        <nav aria-label={common.mobileNav} className="overflow-y-auto px-5 py-4">
          <ul className="flex flex-col">
            {items.map((item) => (
              <li key={item.href} className="border-b last:border-b-0">
                <Link
                  href={item.href}
                  onClick={close}
                  className="flex min-h-14 items-center font-heading text-[1.625rem] leading-none"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="mt-auto border-t px-5 py-6">
          <Button asChild size="lg" className="w-full">
            <Link href={`/${locale}#contact`} onClick={close}>
              {common.bookCta}
            </Link>
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
