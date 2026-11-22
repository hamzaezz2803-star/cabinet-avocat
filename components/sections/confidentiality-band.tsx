import { ParallaxImage } from "@/components/motion/parallax-image";
import { confidentiality } from "@/lib/content";

export function ConfidentialityBand() {
  return (
    <section
      aria-labelledby="secret-title"
      className="theme-ink relative isolate overflow-hidden"
    >
      <ParallaxImage
        src="/images/library-busts.jpg"
        alt=""
        sizes="100vw"
        strength={10}
        className="absolute inset-0 -z-10"
        imageClassName="saturate-[0.7]"
      />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-ink/70" />

      <div className="container-site py-28 md:py-40 lg:py-48">
        <h2
          id="secret-title"
          className="max-w-[20ch] text-[2.25rem] leading-[1.08] sm:text-5xl lg:text-[4rem]"
        >
          {confidentiality.title}
        </h2>
        <p className="mt-8 max-w-[52ch] text-lg leading-relaxed text-paper/85">
          {confidentiality.text}
        </p>
      </div>
    </section>
  );
}
