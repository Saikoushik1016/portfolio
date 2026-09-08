import { cn } from "@/lib/utils";

/**
 * Section shell implementing the light/dark rhythm of the design constitution.
 * Surfaces: midnight, royal, ivory, paper.
 */
type Surface = "midnight" | "royal" | "ivory" | "paper";

const surfaceStyles: Record<Surface, string> = {
  midnight: "bg-midnight text-ivory",
  royal: "bg-royal text-ivory",
  ivory: "bg-ivory text-midnight",
  paper: "bg-paper text-midnight",
};

export function Section({
  surface = "midnight",
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLElement> & { surface?: Surface }) {
  return (
    <section
      className={cn("relative px-6 py-24 sm:px-10 md:py-32", surfaceStyles[surface], className)}
      {...props}
    >
      {children}
    </section>
  );
}

export function Container({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return <div className={cn("mx-auto w-full max-w-5xl", className)}>{children}</div>;
}

/** Tiny tracked monospace section marker with a fine gold rule. */
export function Eyebrow({
  children,
  numeral,
  className,
}: {
  children: React.ReactNode;
  numeral?: string;
  className?: string;
}) {
  return (
    <div className={cn("flex items-center gap-4", className)}>
      {numeral && (
        <span className="font-serif text-sm italic text-gold">{numeral}</span>
      )}
      <span className="eyebrow opacity-80">{children}</span>
      <span className="rule-gold w-16" aria-hidden />
    </div>
  );
}
