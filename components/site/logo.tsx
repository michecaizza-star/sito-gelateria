import { cn } from "@/lib/utils";

/**
 * Vector recreation inspired by the MARÌ mark (radial botanical motif
 * around a central triskelion, echoing the Sicilian Trinacria). Drawn
 * as SVG since the source logo file wasn't available to embed directly —
 * swap in the real artwork under /public when ready.
 */
export function LogoMark({ className }: { className?: string }) {
  const petalAngles = Array.from({ length: 8 }, (_, i) => i * 45);
  const dotAngles = Array.from({ length: 8 }, (_, i) => 22.5 + i * 45);
  const legAngles = [0, 120, 240];

  return (
    <svg
      viewBox="0 0 200 200"
      className={className}
      fill="currentColor"
      aria-hidden="true"
    >
      <g transform="translate(100,100)">
        {petalAngles.map((angle) => (
          <ellipse
            key={angle}
            cx="0"
            cy="-58"
            rx="8"
            ry="22"
            transform={`rotate(${angle})`}
            opacity="0.9"
          />
        ))}
        {dotAngles.map((angle) => (
          <circle
            key={angle}
            cx="0"
            cy="-80"
            r="2.6"
            transform={`rotate(${angle})`}
          />
        ))}
        {legAngles.map((angle) => (
          <path
            key={angle}
            d="M0,0 C14,-2 24,-14 22,-28 C20,-40 10,-47 0,-46 C7,-40 10,-32 8,-24 C6,-15 -1,-9 -10,-8 C-4,-4 2,0 0,0 Z"
            transform={`rotate(${angle}) scale(1.15)`}
          />
        ))}
        <circle r="5.5" />
      </g>
    </svg>
  );
}

export function Logo({
  className,
  markClassName,
  variant = "dark",
  showMark = true,
}: {
  className?: string;
  markClassName?: string;
  variant?: "dark" | "light";
  showMark?: boolean;
}) {
  const color = variant === "dark" ? "text-notte" : "text-avorio";
  return (
    <div className={cn("flex flex-col items-center gap-2", color, className)}>
      {showMark && <LogoMark className={cn("h-10 w-10", markClassName)} />}
      <span className="font-display text-2xl tracking-[0.18em]">
        MAR<span className="italic">Ì</span>
      </span>
    </div>
  );
}
