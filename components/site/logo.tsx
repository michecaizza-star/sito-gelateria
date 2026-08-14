import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * Renders the official MARÌ logo file (/public/logo-mari.png) — never
 * recreate or reinterpret this mark. Uses object-contain inside a
 * square box so the real artwork's own aspect ratio is always
 * preserved, however the source file is cropped.
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
    <div className={cn("relative aspect-square", imgClassName)} style={{ height: size }}>
      <Image
        src="/logo-mari.png"
        alt="MARÌ"
        fill
        priority
        sizes={`${size * 3}px`}
        className="object-contain"
      />
    </div>
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
