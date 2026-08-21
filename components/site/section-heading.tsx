import { cn } from "@/lib/utils";
import { Reveal } from "@/components/site/reveal";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  tone = "dark",
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  tone?: "dark" | "light";
  className?: string;
}) {
  return (
    <Reveal
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      {eyebrow && (
        <p
          className={cn(
            "mb-3 text-xs font-medium uppercase tracking-[0.25em]",
            tone === "dark" ? "text-oro" : "text-oro"
          )}
        >
          {eyebrow}
        </p>
      )}
      <h2
        className={cn(
          "font-display text-4xl leading-[1.05] tracking-tight text-balance sm:text-5xl",
          tone === "dark" ? "text-notte" : "text-avorio"
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "mt-5 text-base leading-relaxed sm:text-lg",
            tone === "dark" ? "text-testo/75" : "text-avorio/80"
          )}
        >
          {description}
        </p>
      )}
    </Reveal>
  );
}
