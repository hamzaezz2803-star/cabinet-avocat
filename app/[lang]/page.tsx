import { notFound } from "next/navigation";

import { AboutSection } from "@/components/sections/about-section";
import { ConfidentialityBand } from "@/components/sections/confidentiality-band";
import { ContactSection } from "@/components/sections/contact-section";
import { ExpertisesSection } from "@/components/sections/expertises-section";
import { FaqSection } from "@/components/sections/faq-section";
import { FirmSection } from "@/components/sections/firm-section";
import { GallerySection } from "@/components/sections/gallery-section";
import { LocationSection } from "@/components/sections/location-section";
import { MethodSection } from "@/components/sections/method-section";
import { ReviewsSection } from "@/components/sections/reviews-section";
import { ScrollAnimations } from "@/components/motion/scroll-animations";
import { AnimatedMarqueeHero } from "@/components/ui/hero-3";
import { hasLocale, type Locale } from "@/lib/i18n/config";
import { getDictionary, type Dictionary } from "@/lib/i18n/get-dictionary";
import { heroPhotos, photoKeys, photoSrc } from "@/lib/media";
import { siteConfig } from "@/lib/site-config";

/** Données structurées (schema.org), sérialisées depuis la configuration, `<` échappé. */
function JsonLd({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const { address } = siteConfig;
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "LegalService",
        name: siteConfig.name[locale],
        description: dict.meta.description,
        url: `${siteConfig.url}/${locale}`,
        inLanguage: locale,
        telephone: siteConfig.phone,
        email: siteConfig.email,
        areaServed: "MA",
        knowsAbout: dict.expertises.items.map((e) => e.title),
        address: {
          "@type": "PostalAddress",
          streetAddress: address.street[locale],
          postalCode: address.postalCode,
          addressLocality: address.city[locale],
          addressCountry: "MA",
        },
      },
      {
        "@type": "FAQPage",
        mainEntity: dict.faq.items.map((f) => ({
          "@type": "Question",
          name: f.question,
          acceptedAnswer: { "@type": "Answer", text: f.answer },
        })),
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      // Contenu statique issu de lib/, jamais d'une saisie utilisateur.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

export default async function HomePage({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = getDictionary(lang);

  const heroImages = heroPhotos.map((key) => ({
    src: photoSrc(key),
    alt: dict.media.alts[photoKeys.indexOf(key)] ?? "",
  }));

  return (
    <>
      <JsonLd locale={lang} dict={dict} />
      <AnimatedMarqueeHero
        tagline={dict.hero.tagline}
        title={dict.hero.title}
        description={dict.hero.description}
        ctaText={dict.hero.cta}
        ctaHref={`/${lang}#contact`}
        secondaryText={dict.hero.secondary}
        secondaryHref={`/${lang}#expertises`}
        images={heroImages}
        marqueeLabels={{ list: dict.media.marqueeLabel, pause: dict.media.pause, play: dict.media.play }}
      />
      <AboutSection locale={lang} t={dict.about} />
      <ExpertisesSection t={dict.expertises} />
      <FirmSection t={dict.firm} />
      <ReviewsSection locale={lang} t={dict.reviews} />
      <MethodSection t={dict.method} />
      <GallerySection locale={lang} t={dict.gallery} alts={dict.media.alts} />
      <ConfidentialityBand t={dict.confidentiality} />
      <FaqSection t={dict.faq} />
      <LocationSection locale={lang} t={dict.location} newTab={dict.common.newTab} />
      <ContactSection locale={lang} t={dict.contact} expertises={dict.expertises.items} />
      <ScrollAnimations />
    </>
  );
}
