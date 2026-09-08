import { Section, Container, Eyebrow } from "@/components/layout/Section";
import { Reveal } from "@/components/motion/Reveal";
import { PHILOSOPHY, EXPLORING } from "@/content/chapters";

export function Philosophy() {
  return (
    <Section surface="ivory" id="philosophy">
      <Container className="max-w-5xl">
        <Eyebrow numeral="XII.">How I Think</Eyebrow>
        <Reveal>
          <h2 className="mt-10 font-serif text-5xl leading-[1.05] text-midnight sm:text-6xl">
            How I Think
          </h2>
        </Reveal>

        <ol className="mt-16">
          {PHILOSOPHY.map((p, i) => (
            <Reveal key={p.numeral} delay={i * 0.04}>
              <li className="grid items-baseline gap-3 border-t border-midnight/20 py-8 sm:grid-cols-[auto_1fr] sm:gap-10">
                <span className="font-serif text-5xl italic text-gold sm:text-6xl">
                  {p.numeral}
                </span>
                <p className="max-w-2xl font-serif text-2xl leading-snug text-midnight sm:text-3xl">
                  {p.principle}
                </p>
              </li>
            </Reveal>
          ))}
        </ol>

        {/* Currently Exploring */}
        <Reveal>
          <div className="mt-24 border-t-2 border-gold/50 pt-8">
            <p className="eyebrow text-midnight/60">Currently Exploring</p>
            <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
              {EXPLORING.map((e) => (
                <li key={e} className="font-serif text-lg italic text-midnight/70">
                  {e}
                </li>
              ))}
            </ul>
            <p className="mt-4 font-mono text-[9px] tracking-[0.2em] text-midnight/40">
              INTERESTS AND EXPLORATIONS — DOCUMENTED CAPABILITIES LIVE ABOVE.
            </p>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
