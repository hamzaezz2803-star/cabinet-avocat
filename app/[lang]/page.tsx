import { ConfidentialityBand } from "@/components/sections/confidentiality-band";
import { ContactSection } from "@/components/sections/contact-section";
import { ExpertisesSection } from "@/components/sections/expertises-section";
import { FaqSection } from "@/components/sections/faq-section";
import { FirmSection } from "@/components/sections/firm-section";
import { LocationSection } from "@/components/sections/location-section";
import { MethodSection } from "@/components/sections/method-section";
import { ReviewsSection } from "@/components/sections/reviews-section";
import { AnimatedMarqueeHero } from "@/components/ui/hero-3";
import { expertises, faqs, hero } from "@/lib/content";
import { siteConfig } from "@/lib/site-config";

/** Données structurées (schema.org). Sérialisées depuis la configuration, `<` échappé. */
function JsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "LegalService",
        name: siteConfig.name,
        description: siteConfig.description,
        url: siteConfig.url,
        areaServed: "MA",
        knowsAbout: expertises.map((e) => e.title),
        ...(siteConfig.phone ? { telephone: siteConfig.phone } : {}),
        ...(siteConfig.email ? { email: siteConfig.email } : {}),
        ...(siteConfig.address.city
          ? {
              address: {
                "@type": "PostalAddress",
                streetAddress: siteConfig.address.street ?? undefined,
                postalCode: siteConfig.address.postalCode ?? undefined,
                addressLocality: siteConfig.address.city,
                addressCountry: "MA",
              },
            }
          : {}),
      },
      {
        "@type": "FAQPage",
        mainEntity: faqs.map((f) => ({
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

export default function HomePage() {
  return (
    <>
      <JsonLd />
      <AnimatedMarqueeHero
        tagline={hero.tagline}
        title={hero.title}
        description={hero.description}
        ctaText={hero.ctaText}
        ctaHref="/#contact"
        secondaryText={hero.secondaryText}
        secondaryHref="/#expertises"
        images={hero.images}
      />
      <ExpertisesSection />
      <FirmSection />
      <ReviewsSection />
      <MethodSection />
      <ConfidentialityBand />
      <FaqSection />
      <LocationSection />
      <ContactSection />
    </>
  );
}
