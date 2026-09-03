import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * Renders the official MARÌ logo as a vector (/public/logo-mari.svg) —
 * never recreate or reinterpret this mark. Traced from the client's
 * source artwork so it stays crisp at any size, unlike the old raster
 * PNG which went grainy when scaled up (e.g. the Hero watermark).
 */
export function Logo({
  className,
  size = 40,
  invert = false,
}: {
  className?: string;
  size?: number;
  /** Render as a white emboss (display-only filter, same artwork) for legibility on dark backgrounds. */
  invert?: boolean;
}) {
  return (
    <div className={cn("relative aspect-square", className)} style={{ height: size }}>
      <Image
        src="/logo-mari.svg"
        alt="MARÌ"
        fill
        priority
        sizes={`${size * 3}px`}
        className="object-contain"
        style={invert ? { filter: "brightness(0) invert(1)" } : undefined}
      />
    </div>
  );
}
