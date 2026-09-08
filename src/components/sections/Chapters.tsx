import { Section, Container, Eyebrow } from "@/components/layout/Section";
import { Reveal } from "@/components/motion/Reveal";
import { CHAPTERS } from "@/content/chapters";
import { LINKS } from "@/content/links";

export function Chapters() {
  return (
    <Section surface="royal" id="experience">
      <Container className="max-w-5xl">
        <Eyebrow numeral="XI.">Experience</Eyebrow>
        <Reveal>
          <h2 className="mt-10 font-serif text-5xl leading-[1.05] sm:text-6xl">
            Chapters
          </h2>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-ivory/60">
            Two systems-centric roles. One thread: intelligent, production-grade
            engineering.
          </p>
        </Reveal>

        <div className="mt-16 space-y-20">
          {CHAPTERS.map((c) => (
            <Reveal key={c.numeral}>
              <article className="border-t border-gold/25 pt-8">
                <div className="flex flex-wrap items-baseline justify-between gap-4">
                  <div>
                    <p className="font-mono text-[10px] tracking-[0.3em] text-gold/80">
                      CHAPTER {c.numeral}
                    </p>
                    <h3 className="mt-2 font-serif text-4xl text-ivory">
                      {c.company}
                    </h3>
                    <p className="mt-1 text-sm text-ivory/60">{c.role}</p>
                  </div>
                  <p className="font-mono text-[11px] tracking-[0.18em] text-ivory/45">
                    {c.period.toUpperCase()}
                  </p>
                </div>

                <p className="mt-4 max-w-2xl font-serif text-lg italic text-ivory/70">
                  {c.focus}
                </p>

                <dl className="mt-8 grid gap-8 md:grid-cols-2">
                  <div>
                    <dt className="eyebrow text-gold/70">Mission</dt>
                    <dd className="mt-2 text-sm leading-relaxed text-ivory/65">
                      {c.mission}
                    </dd>

                    <dt className="eyebrow mt-6 text-gold/70">Systems</dt>
                    <dd className="mt-2">
                      <ul className="space-y-1.5">
                        {c.systems.map((s) => (
                          <li key={s} className="flex gap-3 text-sm text-ivory/65">
                            <span aria-hidden className="mt-2.5 block h-px w-3 shrink-0 bg-gold/60" />
                            {s}
                          </li>
                        ))}
                      </ul>
                    </dd>
                  </div>

                  <div>
                    <dt className="eyebrow text-gold/70">Scale</dt>
                    <dd className="mt-2 font-mono text-[11px] leading-relaxed tracking-[0.08em] text-ivory/70">
                      {c.scale}
                    </dd>

                    <dt className="eyebrow mt-6 text-gold/70">Impact</dt>
                    <dd className="mt-2">
                      <ul className="space-y-1.5">
                        {c.impact.map((i) => (
                          <li key={i} className="font-mono text-[11px] leading-relaxed tracking-[0.06em] text-emerald-imperial/90">
                            {i}
                          </li>
                        ))}
                      </ul>
                    </dd>

                    <dt className="eyebrow mt-6 text-gold/70">Technology</dt>
                    <dd className="mt-2">
                      <ul className="flex flex-wrap gap-2">
                        {c.tech.map((t) => (
                          <li
                            key={t}
                            className="hairline-gold px-2.5 py-1 font-mono text-[9px] tracking-[0.12em] text-ivory/55"
                          >
                            {t.toUpperCase()}
                          </li>
                        ))}
                      </ul>
                    </dd>
                  </div>
                </dl>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <a
            href={LINKS.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="group mt-16 inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.2em] text-gold transition-colors duration-gesture hover:text-ivory"
          >
            VIEW COMPLETE RÉSUMÉ ↗
            <span aria-hidden className="transition-transform duration-gesture group-hover:translate-x-1">
              →
            </span>
          </a>
        </Reveal>
      </Container>
    </Section>
  );
}
