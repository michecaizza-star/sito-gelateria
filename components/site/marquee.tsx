import { cn } from "@/lib/utils";

export function Marquee({
  items,
  className,
  textClassName,
}: {
  items: string[];
  className?: string;
  textClassName?: string;
}) {
  const sequence = [...items, ...items];
  return (
    <div className={cn("overflow-hidden whitespace-nowrap", className)}>
      <div className="animate-marquee inline-flex w-max items-center">
        {sequence.map((item, i) => (
          <span
            key={i}
            className={cn(
              "font-display text-4xl italic tracking-tight sm:text-6xl",
              textClassName
            )}
          >
            {item}
            <span className="mx-6 align-middle text-oro not-italic sm:mx-10">·</span>
          </span>
        ))}
      </div>
    </div>
  );
}
