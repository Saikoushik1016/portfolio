import { cn } from "@/lib/utils";

type MonogramSize = "sm" | "md" | "lg";

const sizePx: Record<MonogramSize, number> = { sm: 22, md: 30, lg: 44 };

export function Monogram({
  size = "md",
  className,
}: {
  size?: MonogramSize | number;
  className?: string;
}) {
  const s = typeof size === "number" ? size : sizePx[size];
  return (
    <svg
      viewBox="0 0 64 64"
      width={s}
      height={s}
      role="img"
      aria-label="SK monogram"
      className={cn("shrink-0", className)}
    >
      <rect
        x="15"
        y="15"
        width="34"
        height="34"
        transform="rotate(45 32 32)"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        className="text-gold/70"
      />
      <text
        x="32"
        y="38.5"
        textAnchor="middle"
        fontSize="17"
        letterSpacing="1"
        fill="currentColor"
        className="font-serif"
      >
        SK
      </text>
    </svg>
  );
}
