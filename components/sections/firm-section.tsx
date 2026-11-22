import { LockKeyhole, ScrollText, UserRound, type LucideIcon } from "lucide-react";

import { ParallaxImage } from "@/components/motion/parallax-image";
import { SectionHeading } from "@/components/sections/section-heading";
import { firm } from "@/lib/content";

const ICONS: LucideIcon[] = [LockKeyhole, ScrollText, UserRound];

export function FirmSection() {
  return (
    <section
      id="cabinet"
      aria-labelledby="cabinet-title"
      className="border-t bg-card py-24 lg:py-36"
    >
      <div className="container-site grid gap-14 lg:grid-cols-12 lg:gap-10">
        <ParallaxImage
          src="/images/justice-statue.jpg"
          alt="Statue de la Justice aux yeux bandés, tenant une balance"
          sizes="(min-width: 1024px) 40vw, 100vw"
          className="aspect-[4/5] rounded-sm bg-stone sm:aspect-[16/11] lg:col-span-5 lg:aspect-[4/5]"
          imageClassName="saturate-[0.85]"
        />

        <div className="lg:col-span-6 lg:col-start-7 lg:self-center">
          <SectionHeading id="cabinet-title" title={firm.title} intro={firm.intro} />

          <dl className="mt-12 space-y-8">
            {firm.principles.map((principle, i) => {
              const Icon = ICONS[i % ICONS.length];
              return (
                <div key={principle.title} className="grid grid-cols-[auto_1fr] gap-x-5 border-t pt-6">
                  <Icon aria-hidden="true" className="mt-1 size-5 text-brass" strokeWidth={1.5} />
                  <dt className="font-heading text-[1.375rem] leading-snug">{principle.title}</dt>
                  <dd className="col-start-2 mt-2 max-w-[52ch] text-muted-foreground">
                    {principle.text}
                  </dd>
                </div>
              );
            })}
          </dl>
        </div>
      </div>
    </section>
  );
}
