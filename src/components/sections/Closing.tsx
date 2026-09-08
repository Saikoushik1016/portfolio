import { Section, Container, Eyebrow } from "@/components/layout/Section";
import { Reveal } from "@/components/motion/Reveal";
import { Monogram } from "@/components/brand/Monogram";
import { ABOUT_STATEMENTS, CREDENTIALS } from "@/content/about";
import { LINKS } from "@/content/links";

function About() {
  return (
    <Section surface="paper" id="about">
      <Container className="max-w-4xl">
        <Eyebrow numeral="XIII.">About</Eyebrow>
        <Reveal>
          <h2 className="mt-10 font-serif text-5xl leading-[1.05] text-midnight sm:text-6xl">
            The Engineer Behind the Systems
          </h2>
        </Reveal>
        <div className="mt-12 space-y-8">
          {ABOUT_STATEMENTS.map((s, i) => (
            <Reveal key={s} delay={i * 0.06}>
              <p className="max-w-2xl font-serif text-2xl leading-snug text-midnight/85 sm:text-3xl">
                {s}
              </p>
            </Reveal>
          ))}
        </div>
        <Reveal>
          <p className="mt-16 font-mono text-[9px] tracking-[0.2em] text-midnight/35">
            MORE TO COME — THIS SECTION IS DELIBERATELY UNDERSTATED.
          </p>
        </Reveal>
      </Container>
    </Section>
  );
}

function Credentials() {
  return (
    <Section surface="midnight" className="py-20">
      <Container className="max-w-4xl">
        <Eyebrow>Credentials</Eyebrow>
        <ul className="mt-8">
          {CREDENTIALS.map((c) => (
            <Reveal key={c.name}>
              <li className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-1 border-t border-gold/20 py-5 last:border-b">
                <span className="font-serif text-xl text-ivory">{c.name}</span>
                <span className="font-mono text-[10px] tracking-[0.18em] text-ivory/45">
                  {c.issuer.toUpperCase()}
                  {c.year ? ` · ${c.year}` : ""}
                </span>
              </li>
            </Reveal>
          ))}
        </ul>
      </Container>
    </Section>
  );
}

function Contact() {
  return (
    <Section surface="midnight" id="contact" className="overflow-hidden">
      {/* The hero field quietly reappears, dimmed */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(24,184,132,0.06),transparent_60%)]"
      />
      <Container className="relative max-w-4xl text-center">
        <Reveal>
          <Monogram size={36} className="mx-auto text-gold/80" />
          <h2 className="mt-10 font-serif text-5xl leading-[1.08] text-ivory sm:text-6xl md:text-7xl">
            The best systems disappear into the experience.
          </h2>
          <p className="mx-auto mt-8 max-w-xl text-base leading-relaxed text-ivory/60">
            I&rsquo;m interested in engineering teams where backend depth,
            product thinking, infrastructure, and AI intersect.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <a
            href={LINKS.emailHref}
            className="hairline-gold mt-12 inline-block bg-gold/10 px-10 py-4 font-serif text-2xl text-ivory transition-colors duration-gesture hover:bg-gold/20"
          >
            Start a conversation
          </a>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 font-mono text-[11px] tracking-[0.18em]">
            <a href={LINKS.emailHref} className="text-ivory/55 transition-colors duration-gesture hover:text-gold">
              EMAIL
            </a>
            <a href={LINKS.linkedin} target="_blank" rel="noopener noreferrer" className="text-ivory/55 transition-colors duration-gesture hover:text-gold">
              LINKEDIN
            </a>
            <a href={LINKS.github} target="_blank" rel="noopener noreferrer" className="text-ivory/55 transition-colors duration-gesture hover:text-gold">
              GITHUB
            </a>
            <a href={LINKS.resume} target="_blank" rel="noopener noreferrer" className="text-ivory/55 transition-colors duration-gesture hover:text-gold">
              RÉSUMÉ
            </a>
          </div>
        </Reveal>

        <Reveal delay={0.2}>
          <p className="mt-16 font-mono text-[9px] tracking-[0.3em] text-emerald-imperial/70">
            SYSTEM ONLINE
          </p>
        </Reveal>
      </Container>
    </Section>
  );
}

export function AboutSection() {
  return <About />;
}

export function CredentialsSection() {
  return <Credentials />;
}

export function ContactSection() {
  return <Contact />;
}
