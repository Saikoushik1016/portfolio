import { Section, Container, Eyebrow } from "@/components/layout/Section";
import { Reveal } from "@/components/motion/Reveal";
import { METRICS, type Metric } from "@/content/metrics";

function Transformation({ from, value }: { from?: string; value: string }) {
  if (!from) return <span>{value}</span>;
  return (
    <span className="whitespace-nowrap">
      <span className="mr-3 align-middle font-mono text-[0.35em] tracking-[0.12em] text-midnight/45 line-through decoration-gold/70 decoration-1">
        {from}
      </span>
      <span>{value}</span>
    </span>
  );
}

function HeroMetric({ m }: { m: Metric }) {
  return (
    <Reveal>
      <figure className="group">
        <div className="font-serif leading-none text-midnight">
          <span className="block text-[clamp(6rem,22vw,15rem)] tracking-tight">
            <Transformation from={m.from} value={m.value} />
          </span>
        </div>
        <figcaption className="mt-6 flex flex-wrap items-baseline gap-x-5 gap-y-2">
          <span className="eyebrow text-gold">{m.label}</span>
          <span className="max-w-md text-sm leading-relaxed text-midnight/60 md:max-h-0 md:overflow-hidden md:opacity-0 md:transition-all md:duration-500 md:ease-soft md:group-hover:max-h-24 md:group-hover:opacity-100">
            {m.context}
          </span>
        </figcaption>
      </figure>
    </Reveal>
  );
}

function FeatureMetric({ m }: { m: Metric }) {
  return (
    <Reveal delay={0.1}>
      <figure className="group border-l border-gold/40 pl-6">
        <div className="font-serif text-6xl leading-none text-midnight sm:text-7xl">
          {m.value}
          {m.unit && (
            <span className="ml-2 font-mono text-xs tracking-[0.18em] text-midnight/45">
              {m.unit.toUpperCase()}
            </span>
          )}
        </div>
        <figcaption className="mt-4">
          <span className="eyebrow text-midnight/70">{m.label}</span>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-midnight/55">
            {m.context}
          </p>
        </figcaption>
      </figure>
    </Reveal>
  );
}

function AnnotationMetric({ m }: { m: Metric }) {
  return (
    <Reveal delay={0.05}>
      <figure className="group relative border-t border-midnight/15 py-4">
        <div className="flex items-baseline justify-between gap-6">
          <span className="font-serif text-2xl text-midnight">
            {m.from && (
              <span className="mr-2 font-mono text-[10px] tracking-[0.1em] text-midnight/40 line-through decoration-gold/70">
                {m.from}
              </span>
            )}
            {m.value}
          </span>
          <span className="eyebrow text-midnight/60">{m.label}</span>
        </div>
        <p className="mt-2 max-w-lg text-[13px] leading-relaxed text-midnight/55 transition-all duration-500 ease-soft md:opacity-0 md:group-hover:opacity-100">
          {m.context}
        </p>
      </figure>
    </Reveal>
  );
}

export function EngineeringProof() {
  const hero = METRICS.find((m) => m.scale === "hero")!;
  const features = METRICS.filter((m) => m.scale === "feature");
  const annotations = METRICS.filter((m) => m.scale === "annotation");

  return (
    <Section surface="paper" id="proof">
      <Container className="max-w-6xl">
        <Eyebrow numeral="III.">Engineering Proof</Eyebrow>
        <Reveal>
          <p className="mt-10 max-w-xl font-serif text-3xl leading-snug text-midnight sm:text-4xl">
            Numbers carry their own evidence.
          </p>
        </Reveal>

        {/* Dominant artifact — half the viewport, measured in serif */}
        <div className="mt-20">
          <HeroMetric m={hero} />
        </div>

        {/* Features — asymmetric, hairline-separated */}
        <div className="mt-24 grid gap-16 md:grid-cols-2 md:gap-10">
          {features.map((m) => (
            <FeatureMetric key={m.id} m={m} />
          ))}
        </div>

        {/* Annotations — ledger lines with hover evidence */}
        <div className="mt-24 grid gap-x-20 md:grid-cols-2">
          {annotations.map((m) => (
            <AnnotationMetric key={m.id} m={m} />
          ))}
        </div>

        <Reveal>
          <p className="mt-16 font-mono text-[10px] tracking-[0.22em] text-midnight/40">
            SOURCED FROM PRODUCTION RÉSUMÉ RECORDS — NO ESTIMATES.
          </p>
        </Reveal>
      </Container>
    </Section>
  );
}
