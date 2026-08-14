import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * Renders the official MARÌ logo file (/public/logo-mari.png) — never
 * recreate or reinterpret this mark. The file has been processed to a
 * transparent background so it blends directly into any section
 * background instead of sitting in a visible box.
 */
export function Logo({
  className,
  size = 40,
}: {
  className?: string;
  size?: number;
}) {
  return (
    <div className={cn("relative aspect-square", className)} style={{ height: size }}>
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
}
