import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * Renders the original MARÌ logo file. Do not recreate or reinterpret
 * this mark — replace /public/logo-mari.png with the client-provided
 * artwork; this component only controls size and, where needed, a
 * light backing plate for legibility on dark sections.
 */
export function Logo({
  className,
  imgClassName,
  size = 40,
  plate = false,
}: {
  className?: string;
  imgClassName?: string;
  size?: number;
  plate?: boolean;
}) {
  const img = (
    <Image
      src="/logo-mari.png"
      alt="MARÌ"
      width={size * 4}
      height={size * 4.5}
      priority
      className={cn("w-auto object-contain", imgClassName)}
      style={{ height: size }}
    />
  );

  if (!plate) {
    return <div className={className}>{img}</div>;
  }

  return (
    <div
      className={cn(
        "inline-flex items-center justify-center rounded-xl bg-avorio/95 px-3 py-2 shadow-sm",
        className
      )}
    >
      {img}
    </div>
  );
}
