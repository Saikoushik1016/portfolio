import { Section, Container, Eyebrow } from "@/components/layout/Section";
import { Reveal } from "@/components/motion/Reveal";
import { RepoStatPanel } from "@/components/sections/RepoStatPanel";

const SYSTEMS = [
  {
    numeral: "01",
    id: "system-01",
    title: "AI Deployment Intelligence",
    descriptor:
      "Applied AI + developer infrastructure. Every pull request understood before it ships.",
    atmosphere: "Emerald / Midnight / futuristic",
    status: "EXPLORE BELOW",
  },
  {
    numeral: "02",
    id: "system-02",
    title: "Money Moves Through Systems",
    descriptor:
      "The flagship distributed systems study — a payment backbone at production scale.",
    atmosphere: "Navy / Midnight / architectural",
    status: "EXPLORE BELOW",
  },
  {
    numeral: "03",
    id: "system-03",
    title: "A Ledger That Remembers Everything",
    descriptor:
      "Classical engineering discipline — deterministic money movement with a perfect audit trail.",
    atmosphere: "Ivory / Antique Gold / classical",
    status: "EXPLORE BELOW",
  },
];

export function SelectedSystems() {
  return (
    <Section surface="midnight" id="work">
      <Container className="max-w-6xl">
        <Eyebrow numeral="IV.">Selected Systems</Eyebrow>
        <Reveal>
          <h2 className="mt-10 font-serif text-5xl leading-[1.05] sm:text-7xl">
            Selected Systems
          </h2>
          <p className="mt-6 font-serif text-2xl italic text-ivory/60 sm:text-3xl">
            Not screenshots. Systems.
          </p>
        </Reveal>

        <div className="mt-20">
          {SYSTEMS.map((s, i) => (
            <Reveal key={s.id} delay={i * 0.08}>
              <a
                href={`#${s.id}`}
                className="group relative block border-t border-gold/20 py-10 transition-colors duration-500 ease-soft last:border-b hover:border-gold/50"
              >
                <div className="grid gap-6 md:grid-cols-[auto_1fr_auto] md:items-baseline md:gap-10">
                  <span className="font-mono text-xs tracking-[0.3em] text-gold/70 transition-colors duration-gesture group-hover:text-gold">
                    {s.numeral}
                  </span>
                  <div>
                    <h3 className="font-serif text-3xl leading-tight text-ivory transition-transform duration-500 ease-soft group-hover:translate-x-2 sm:text-4xl">
                      {s.title}
                    </h3>
                    <p className="mt-3 max-w-xl text-sm leading-relaxed text-ivory/55">
                      {s.descriptor}
                    </p>
                  </div>
                  <div className="flex flex-col items-start gap-2 md:items-end">
                    <span className="font-mono text-[10px] tracking-[0.18em] text-ivory/35">
                      {s.atmosphere.toUpperCase()}
                    </span>
                    <span className="font-mono text-[10px] tracking-[0.18em] text-gold/60 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                      {s.status} →
                    </span>
                  </div>
                </div>
              </a>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <p className="mt-14 max-w-xl text-sm leading-relaxed text-ivory/45">
            Each case study follows the same narrative spine — problem, scale,
            architecture, engineering decisions, impact, technology — because
            that is the order in which real systems are actually built.
          </p>
        </Reveal>

        {/* ── Open Artifacts — the public repositories, live ── */}
        <Reveal>
          <div className="mt-20 border-t border-gold/20 pt-10">
            <p className="eyebrow text-gold/80">Open Artifacts</p>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-ivory/55">
              The systems above have public source. These panels fetch live
              from the GitHub API as this page loads — latest push, HEAD
              commit — and fall back to build-time snapshots when offline.
              Read the code that did the work.
            </p>
            <div className="mt-8 space-y-3">
              <RepoStatPanel repoKey="changeguard" />
              <RepoStatPanel repoKey="bankingCore" />
              <RepoStatPanel repoKey="forensics" />
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
