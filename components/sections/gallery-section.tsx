import { SectionHeading } from "@/components/sections/section-heading";
import { Carousel003Client } from "@/components/ui/skiper49-client";
import { localeDir, type Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionaries/fr";
import { galleryPhotos, photoKeys, photoSrc } from "@/lib/media";

interface GallerySectionProps {
  locale: Locale;
  t: Dictionary["gallery"];
  alts: string[];
}

/** Galerie en carrousel « coverflow » (Skiper49). Photos d'illustration, signalées comme telles. */
export function GallerySection({ locale, t, alts }: GallerySectionProps) {
  const images = galleryPhotos.map((key) => ({
    src: photoSrc(key),
    alt: alts[photoKeys.indexOf(key)] ?? "",
  }));

  return (
    <section
      id="galerie"
      aria-labelledby="galerie-title"
      className="overflow-hidden border-t bg-secondary py-24 lg:py-32"
    >
      <div className="container-site text-center">
        <SectionHeading id="galerie-title" title={t.title} intro={t.intro} className="mx-auto" />
      </div>
      <div className="mx-auto mt-12 max-w-5xl px-5 lg:mt-16">
        <Carousel003Client
          images={images}
          dir={localeDir(locale)}
          labels={{ prev: t.prev, next: t.next, slide: t.slide }}
        />
        <p className="mt-4 text-center text-sm text-muted-foreground">{t.note}</p>
      </div>
    </section>
  );
}
