import { Navigation } from "@/components/navigation/Navigation";
import { Section, Container } from "@/components/layout/Section";
import { Monogram } from "@/components/brand/Monogram";
import { SystemCanvas } from "@/components/hero/SystemCanvas";
import { Reveal } from "@/components/motion/Reveal";
import { EngineeringProof } from "@/components/sections/EngineeringProof";
import { SelectedSystems } from "@/components/sections/SelectedSystems";
import { DeploymentIntelligence } from "@/components/sections/DeploymentIntelligence";
import { PaymentSystems } from "@/components/sections/PaymentSystems";
import { LedgerSystem } from "@/components/sections/LedgerSystem";
import { AiLab } from "@/components/sections/AiLab";
import { DatabaseToPixel } from "@/components/sections/DatabaseToPixel";
import { EngineeringLandscape } from "@/components/sections/EngineeringLandscape";
import { Chapters } from "@/components/sections/Chapters";
import { Philosophy } from "@/components/sections/Philosophy";
import {
  AboutSection,
  CredentialsSection,
  ContactSection,
} from "@/components/sections/Closing";
import { LINKS } from "@/content/links";

export default function Home() {
  return (
    <div id="top" className="scroll-smooth">
      {/* Keyboard users can bypass the navigation */}
      <a
        href="#main"
        className="hairline-gold sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:bg-midnight focus:px-4 focus:py-2 focus:text-sm focus:text-ivory"
      >
        Skip to content
      </a>

      <Navigation />

      <main id="main">
        {/* ── HERO — with the systems visualization (signature interaction № 1) ── */}
        <Section surface="midnight" className="flex min-h-[100vh] items-center overflow-hidden">
          {/* Generative distributed-systems field — decorative, non-interactive by pointer */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 right-0 w-full opacity-60 sm:opacity-80 lg:w-[62%]"
          >
            <SystemCanvas />
          </div>
          {/* Soft vignette keeps type legible over the field */}
          <div
            aria-hidden
            className="absolute inset-0 bg-[radial-gradient(ellipse_at_left,rgba(9,11,16,0.92)_30%,rgba(9,11,16,0.25)_75%)]"
          />

          <Container className="relative z-10">
            <p className="eyebrow text-gold/90">
              Engineer&nbsp;&nbsp;/&nbsp;&nbsp;Builder&nbsp;&nbsp;/&nbsp;&nbsp;Systems Thinker
            </p>
            <h1 className="mt-8 max-w-4xl font-serif text-5xl leading-[1.05] sm:text-7xl md:text-8xl">
              Engineering intelligence into systems that actually&nbsp;ship.
            </h1>
            <p className="mt-8 max-w-2xl text-base leading-relaxed text-ivory/70 sm:text-lg">
              I build across AI, backend systems, infrastructure, and product
              experiences, turning complex technical problems into software
              people can actually use.
            </p>
            <p className="mt-6 font-mono text-[11px] tracking-[0.22em] text-ivory/50">
              SAI KOUSHIK — FULL STACK ENGINEER — CHICAGO, IL
            </p>
            <p className="mt-2 font-mono text-[11px] tracking-[0.22em] text-gold/80">
              AI SYSTEMS • BACKEND • FULL STACK • CLOUD
            </p>

            <div className="mt-12 flex flex-wrap items-center gap-5">
              <a
                href="#work"
                className="hairline-gold bg-gold/10 px-6 py-3 text-sm transition-colors duration-gesture hover:bg-gold/20"
              >
                Explore my work
              </a>
              <a
                href={LINKS.resume}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-ivory/70 underline-offset-4 transition-colors duration-gesture hover:text-gold hover:underline"
              >
                View résumé
              </a>
              <span className="rule-gold hidden h-px w-10 sm:block" aria-hidden />
              <a
                href={LINKS.github}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-[11px] tracking-[0.18em] text-ivory/50 transition-colors duration-gesture hover:text-gold"
              >
                GITHUB ↗
              </a>
              <a
                href={LINKS.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-[11px] tracking-[0.18em] text-ivory/50 transition-colors duration-gesture hover:text-gold"
              >
                LINKEDIN ↗
              </a>
            </div>
          </Container>

          {/* Quiet corner metadata — engraving-inspired linework */}
          <div className="absolute bottom-8 right-8 hidden font-mono text-[10px] tracking-[0.18em] text-ivory/35 md:block">
            41.8781° N / 87.6298° W — CHICAGO
          </div>

          {/* Scroll cue */}
          <div className="absolute bottom-8 left-6 hidden items-center gap-3 sm:left-10 md:flex">
            <span className="font-mono text-[10px] tracking-[0.3em] text-ivory/40">
              SCROLL
            </span>
            <span className="block h-px w-12 bg-gradient-to-r from-gold/50 to-transparent" aria-hidden />
          </div>
        </Section>

        {/* ── OPENING EDITORIAL MOMENT — Midnight → Warm Ivory ── */}
        <Section surface="ivory" className="py-36 md:py-48">
          <Container>
            <Reveal>
              <p className="eyebrow text-midnight/50">Editorial</p>
              <h2 className="mt-10 font-serif text-5xl leading-[1.08] sm:text-6xl md:text-7xl">
                Software should feel simple.
              </h2>
              <p className="mt-4 font-serif text-3xl italic text-midnight/70 sm:text-4xl md:text-5xl">
                Even when the systems underneath it aren&rsquo;t.
              </p>
              <p className="mt-10 max-w-2xl text-base leading-relaxed text-midnight/70">
                I like working where deep engineering and product experience
                meet, where APIs, AI models, infrastructure, data, and
                interfaces must behave like one coherent system.
              </p>
            </Reveal>
          </Container>
        </Section>

        {/* ── ENGINEERING PROOF — metrics as editorial artifacts ── */}
        <EngineeringProof />

        {/* ── SELECTED SYSTEMS — the index of case studies ── */}
        <SelectedSystems />

        {/* ── SYSTEM 01 — AI Deployment Intelligence (signature interaction № 2) ── */}
        <DeploymentIntelligence />

        {/* ── SYSTEM 02 — Money Moves Through Systems ── */}
        <PaymentSystems />

        {/* ── SYSTEM 03 — A Ledger That Remembers Everything ── */}
        <LedgerSystem />

        {/* ── AI LAB — explorations ── */}
        <AiLab />

        {/* ── FROM DATABASE TO PIXEL — full stack journey ── */}
        <DatabaseToPixel />

        {/* ── ENGINEERING LANDSCAPE — the technology map ── */}
        <EngineeringLandscape />

        {/* ── CHAPTERS — experience ── */}
        <Chapters />

        {/* ── HOW I THINK — philosophy + currently exploring ── */}
        <Philosophy />

        {/* ── ABOUT / CREDENTIALS / CONTACT ── */}
        <AboutSection />
        <CredentialsSection />
        <ContactSection />
      </main>

      {/* ── FOOTER — extremely minimal ── */}
      <footer className="bg-midnight px-6 py-16 sm:px-10">
        <Container>
          <div className="flex items-center gap-3">
            <Monogram size={22} />
            <div>
              <p className="text-sm text-ivory/85">Sai Koushik</p>
              <p className="font-mono text-[10px] tracking-[0.18em] text-ivory/40">
                CHICAGO, IL
              </p>
            </div>
          </div>
          <div className="rule-gold my-8" />
          <div className="flex flex-wrap items-center justify-between gap-6">
            <div className="flex gap-6 font-mono text-[11px] tracking-[0.18em]">
              <a href={LINKS.github} target="_blank" rel="noopener noreferrer" className="text-ivory/50 transition-colors duration-gesture hover:text-gold">
                GITHUB
              </a>
              <a href={LINKS.linkedin} target="_blank" rel="noopener noreferrer" className="text-ivory/50 transition-colors duration-gesture hover:text-gold">
                LINKEDIN
              </a>
              <a href={LINKS.emailHref} className="text-ivory/50 transition-colors duration-gesture hover:text-gold">
                EMAIL
              </a>
            </div>
            <p className="font-mono text-[10px] tracking-[0.22em] text-ivory/35">
              DESIGNED AS A SYSTEM. BUILT AS A PRODUCT.
            </p>
          </div>
        </Container>
      </footer>
    </div>
  );
}
