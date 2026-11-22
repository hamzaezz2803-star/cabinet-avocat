"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu } from "lucide-react";

import { Brand } from "@/components/layout/brand";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { navItems } from "@/lib/content";

/** Menu mobile : Radix Dialog (piège de focus, Échap, retour du focus). */
export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="lg:hidden" aria-label="Ouvrir le menu">
          <Menu className="size-5" strokeWidth={1.5} aria-hidden="true" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-full max-w-none gap-0 bg-background p-0 sm:max-w-sm">
        <div className="flex h-(--header-height) items-center border-b px-5">
          <Brand onNavigate={close} />
        </div>
        <SheetTitle className="sr-only">Menu</SheetTitle>
        <SheetDescription className="sr-only">Navigation du site</SheetDescription>
        <nav aria-label="Navigation mobile" className="px-5 py-6">
          <ul className="flex flex-col">
            {navItems.map((item) => (
              <li key={item.href} className="border-b last:border-b-0">
                <Link
                  href={item.href}
                  onClick={close}
                  className="flex min-h-14 items-center font-heading text-[1.75rem] leading-none"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="mt-auto border-t px-5 py-6">
          <Button asChild size="lg" className="w-full">
            <Link href="/#contact" onClick={close}>
              Demander un rendez-vous
            </Link>
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
