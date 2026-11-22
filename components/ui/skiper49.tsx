"use client";

/**
 * Skiper 49 · Carousel_003 (Skiper UI, auteur @gurvinder-singh02), adapté au projet :
 * images locales via next/image, couleurs issues des jetons, navigation clavier et
 * libellés accessibles traduits, sens de lecture RTL, pas d'animation d'entrée.
 * Attribution requise (version gratuite) : voir docs/licences.md.
 * Construit avec Swiper.js : https://swiperjs.com/
 */

import Image from "next/image";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Swiper as SwiperInstance } from "swiper";
import { A11y, EffectCoverflow, Keyboard, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

import { cn } from "@/lib/utils";

export interface CarouselImage {
  src: string;
  alt: string;
}

interface Carousel003Props {
  images: CarouselImage[];
  labels: { prev: string; next: string; slide: string };
  dir?: "ltr" | "rtl";
  className?: string;
}

export function Carousel_003({ images, labels, dir = "ltr", className }: Carousel003Props) {
  const [swiper, setSwiper] = useState<SwiperInstance | null>(null);

  return (
    <div className={cn("skiper49 relative w-full", className)}>
      <Swiper
        dir={dir}
        onSwiper={setSwiper}
        effect="coverflow"
        grabCursor
        centeredSlides
        slidesPerView="auto"
        loop
        keyboard={{ enabled: true, onlyInViewport: true }}
        coverflowEffect={{ rotate: 36, stretch: 0, depth: 110, modifier: 1, slideShadows: true }}
        pagination={{ clickable: true }}
        a11y={{
          prevSlideMessage: labels.prev,
          nextSlideMessage: labels.next,
          slideLabelMessage: labels.slide,
        }}
        modules={[EffectCoverflow, Pagination, Keyboard, A11y]}
        className="skiper49-swiper"
      >
        {images.map((image, index) => (
          <SwiperSlide key={`${image.src}-${index}`} className="overflow-hidden rounded-lg bg-stone">
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes="(min-width: 768px) 320px, 70vw"
              quality={80}
              className="object-cover saturate-[0.85]"
            />
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="mt-2 flex justify-center gap-3">
        <button
          type="button"
          onClick={() => swiper?.slidePrev()}
          aria-label={labels.prev}
          className="grid size-11 place-items-center rounded-lg border bg-card text-foreground transition-colors duration-150 hover:border-brass hover:text-brass-text"
        >
          <ChevronLeft aria-hidden="true" className="size-5 rtl:rotate-180" strokeWidth={1.5} />
        </button>
        <button
          type="button"
          onClick={() => swiper?.slideNext()}
          aria-label={labels.next}
          className="grid size-11 place-items-center rounded-lg border bg-card text-foreground transition-colors duration-150 hover:border-brass hover:text-brass-text"
        >
          <ChevronRight aria-hidden="true" className="size-5 rtl:rotate-180" strokeWidth={1.5} />
        </button>
      </div>
    </div>
  );
}

export default Carousel_003;
