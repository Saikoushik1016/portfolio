import { Section, Container, Eyebrow } from "@/components/layout/Section";
import { Reveal } from "@/components/motion/Reveal";
import { LANDSCAPE } from "@/content/layers";

export function EngineeringLandscape() {
  return (
    <Section surface="paper" id="landscape">
      <Container className="max-w-6xl">
        <Eyebrow numeral="X.">Engineering Landscape</Eyebrow>
        <Reveal>
          <h2 className="mt-10 font-serif text-5xl leading-[1.05] text-midnight sm:text-6xl">
            The Landscape
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-midnight/65">
            Capabilities, not percentages. Tools change; the discipline of
            choosing them — and connecting them — is the skill.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-x-14 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {LANDSCAPE.map((g, i) => (
            <Reveal key={g.group} delay={(i % 3) * 0.05}>
              <div className="border-t border-midnight/30 pt-5">
                <h3 className="font-serif text-2xl text-midnight">{g.group}</h3>
                <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-2">
                  {g.items.map((item) => (
                    <li
                      key={item}
                      className="font-mono text-[11px] tracking-[0.1em] text-midnight/60"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
