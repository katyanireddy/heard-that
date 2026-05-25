import { cn } from "@/lib/utils";

export function SectionTitle({
  eyebrow,
  title,
  description,
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  className?: string;
}) {
  return (
    <div className={cn("max-w-3xl", className)}>
      {eyebrow ? (
        <p className="mb-2 inline-flex rounded-full border-2 border-ink bg-lime px-3 py-1 text-xs font-bold uppercase tracking-[0.14em]">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="font-display text-3xl uppercase leading-tight text-ink md:text-5xl">{title}</h2>
      {description ? <p className="mt-3 text-base leading-relaxed md:text-lg">{description}</p> : null}
    </div>
  );
}
