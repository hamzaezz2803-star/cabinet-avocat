import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  id: string;
  title: string;
  intro?: string;
  className?: string;
}

/** Titre de section (h2) + introduction, alignés à gauche. */
export function SectionHeading({ id, title, intro, className }: SectionHeadingProps) {
  return (
    <div className={cn("max-w-[34rem]", className)}>
      <h2 id={id} className="text-[2.125rem] leading-[1.08] sm:text-5xl lg:text-[3.5rem]">
        {title}
      </h2>
      {intro ? (
        <p className="mt-6 text-lg leading-relaxed text-muted-foreground">{intro}</p>
      ) : null}
    </div>
  );
}
