"use client";

/**
 * SYSTEM 01 — AI DEPLOYMENT INTELLIGENCE case study.
 * Signature interaction № 2: simulated PR risk pipeline.
 * Emerald / Midnight / futuristic atmosphere.
 */

import { useCallback, useEffect, useRef, useState } from "react";
import { Section, Container, Eyebrow } from "@/components/layout/Section";
import { Reveal } from "@/components/motion/Reveal";
import {
  PIPELINE,
  PR_DEMO,
  RISK_DEMO,
  STACK,
  IMPACT,
} from "@/content/deployment";
import { cn } from "@/lib/utils";

const STAGE_MS = 900;

const SPINE = [
  "Problem",
  "Scale",
  "Architecture",
  "Decisions",
  "Impact",
  "Technology",
] as const;

export function DeploymentIntelligence() {
  const [stageIndex, setStageIndex] = useState(-1); // -1 = idle
  const [running, setRunning] = useState(false);
  const timers = useRef<Array<ReturnType<typeof setTimeout>>>([]);

  const clearTimers = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  };

  useEffect(() => clearTimers, []);

  const runAnalysis = useCallback(() => {
    clearTimers();
    setStageIndex(-1);
    setRunning(true);
    PIPELINE.forEach((_, i) => {
      timers.current.push(
        setTimeout(() => {
          setStageIndex(i);
          if (i === PIPELINE.length - 1) setRunning(false);
        }, STAGE_MS * (i + 1))
      );
    });
  }, []);

  const complete = stageIndex >= PIPELINE.length - 1;

  return (
    <Section surface="midnight" id="system-01" className="overflow-hidden">
      {/* emerald field accents */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(24,184,132,0.07),transparent_55%)]"
      />

      <Container className="relative max-w-6xl">
        <Eyebrow numeral="V.">System 01</Eyebrow>

        <Reveal>
          <p className="mt-10 font-mono text-[11px] tracking-[0.22em] text-emerald-imperial">
            APPLIED AI · DEVELOPER INFRASTRUCTURE · BACKEND
          </p>
          <h2 className="mt-4 max-w-3xl font-serif text-5xl leading-[1.05] sm:text-6xl">
            AI Deployment Intelligence
          </h2>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-ivory/65">
            Every pull request understood before it ships. An analysis pipeline
            that reads the change, maps the blast radius, consults incident
            history, and returns a risk verdict — in seconds, not meetings.
          </p>
        </Reveal>

        {/* ── Narrative spine ── */}
        <Reveal>
          <ol className="mt-12 flex flex-wrap gap-x-6 gap-y-2">
            {SPINE.map((s, i) => (
              <li key={s} className="flex items-center gap-6">
                <span className="font-mono text-[10px] tracking-[0.18em] text-ivory/40">
                  {s.toUpperCase()}
                </span>
                {i < SPINE.length - 1 && (
                  <span aria-hidden className="text-gold/50">
                    ·
                  </span>
                )}
              </li>
            ))}
          </ol>
        </Reveal>

        {/* ── The simulated PR — DEMO DATA ── */}
        <Reveal delay={0.1}>
          <div className="hairline-gold mt-14 overflow-hidden rounded-sm bg-royal/60">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gold/15 px-5 py-3">
              <div className="flex items-center gap-4 font-mono text-[11px] tracking-[0.14em]">
                <span className="text-emerald-imperial">{PR_DEMO.id}</span>
                <span className="text-ivory/50">{PR_DEMO.branch}</span>
                <span className="text-emerald-imperial/80">+{PR_DEMO.additions}</span>
                <span className="text-red-400/70">−{PR_DEMO.deletions}</span>
              </div>
              <span className="font-mono text-[9px] tracking-[0.22em] text-gold/80">
                DEMO DATA
              </span>
            </div>

            <div className="px-5 py-6">
              <p className="font-mono text-[11px] tracking-[0.14em] text-ivory/45">
                {PR_DEMO.services} SERVICES AFFECTED · OPENED BY {PR_DEMO.author.toUpperCase()}
              </p>

              {/* Run analysis */}
              <div className="mt-6 flex flex-wrap items-center gap-5">
                <button
                  type="button"
                  onClick={runAnalysis}
                  disabled={running}
                  className={cn(
                    "hairline-gold px-5 py-2.5 font-mono text-[11px] tracking-[0.2em] transition-colors duration-gesture",
                    running
                      ? "cursor-wait text-ivory/40"
                      : "bg-emerald-imperial/10 text-emerald-imperial hover:bg-emerald-imperial/20"
                  )}
                >
                  {running ? "ANALYZING…" : complete ? "RE-RUN ANALYSIS" : "RUN ANALYSIS"}
                </button>
                {!complete && !running && (
                  <span className="font-mono text-[10px] tracking-[0.16em] text-ivory/35">
                    SIMULATION — NO PRODUCTION SYSTEM IS CALLED
                  </span>
                )}
              </div>

              {/* ── Pipeline stages ── */}
              <ol className="mt-8 grid gap-0 md:grid-cols-2 md:gap-x-10">
                {PIPELINE.map((stage, i) => {
                  const done = stageIndex >= i;
                  return (
                    <li
                      key={stage.id}
                      className={cn(
                        "border-t border-ivory/8 py-4 transition-colors duration-500",
                        done && "border-emerald-imperial/30"
                      )}
                    >
                      <div className="flex items-baseline justify-between gap-4">
                        <span
                          className={cn(
                            "font-mono text-[11px] tracking-[0.16em] transition-colors duration-gesture",
                            done ? "text-ivory/85" : "text-ivory/35"
                          )}
                        >
                          <span className="mr-3 text-gold/60">
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          {stage.label.toUpperCase()}
                        </span>
                        <span
                          aria-hidden
                          className={cn(
                            "font-mono text-[10px] transition-colors duration-gesture",
                            done ? "text-emerald-imperial" : "text-ivory/20"
                          )}
                        >
                          {done ? "✓" : "·"}
                        </span>
                      </div>
                      <p
                        className={cn(
                          "mt-2 text-[13px] leading-relaxed transition-colors duration-500",
                          done ? "text-ivory/55" : "text-ivory/25"
                        )}
                      >
                        {stage.detail}
                      </p>
                      <p
                        className={cn(
                          "mt-2 font-mono text-[10px] tracking-[0.1em] transition-all duration-500",
                          done ? "text-emerald-imperial/80" : "text-transparent"
                        )}
                      >
                        {stage.output}
                      </p>
                    </li>
                  );
                })}
              </ol>

              {/* ── Verdict ── */}
              <div
                className={cn(
                  "mt-8 border-t border-gold/15 pt-8 transition-opacity duration-700",
                  complete ? "opacity-100" : "pointer-events-none opacity-30"
                )}
                aria-hidden={!complete}
              >
                <div className="grid gap-10 md:grid-cols-[auto_1fr] md:gap-16">
                  <div>
                    <p className="eyebrow text-gold/80">Deployment Risk</p>
                    <p className="mt-4 font-serif text-7xl leading-none text-ivory sm:text-8xl">
                      {RISK_DEMO.score}
                      <span className="ml-2 font-mono text-sm text-ivory/40">
                        /100
                      </span>
                    </p>
                    <p className="mt-3 font-mono text-[10px] tracking-[0.22em] text-red-400/80">
                      {RISK_DEMO.band} — DEMO DATA
                    </p>
                  </div>
                  <div>
                    <p className="eyebrow text-gold/80">Rollout Recommendation</p>
                    <p className="mt-4 max-w-xl text-sm leading-relaxed text-ivory/70">
                      {RISK_DEMO.recommendation}
                    </p>
                    <dl className="mt-6 grid gap-x-10 gap-y-4 sm:grid-cols-2">
                      {RISK_DEMO.factors.map((f) => (
                        <div key={f.label} className="border-l border-gold/25 pl-4">
                          <dt className="font-mono text-[10px] tracking-[0.18em] text-ivory/45">
                            {f.label.toUpperCase()} · {f.weight}
                          </dt>
                          <dd className="mt-1 text-[13px] text-ivory/70">{f.value}</dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        {/* ── Engineering narrative ── */}
        <div className="mt-20 grid gap-14 md:grid-cols-2 md:gap-10">
          <Reveal>
            <h3 className="font-serif text-2xl text-ivory">The System</h3>
            <p className="mt-4 text-sm leading-relaxed text-ivory/60">
              A FastAPI service receives GitHub webhooks, acknowledges them with
              low latency, and assembles evidence from modular analysis
              components — code change, infrastructure plan, blast radius,
              incident context. Claude reasons over the assembled evidence;
              LangChain structures the workflow; Langfuse traces every prompt,
              token and latency figure so the reasoning itself is observable.
            </p>
            <h3 className="mt-10 font-serif text-2xl text-ivory">Security &amp; Reliability</h3>
            <p className="mt-4 text-sm leading-relaxed text-ivory/60">
              Webhook signatures are verified before anything executes. Secrets
              never reach the model context. Acknowledgement happens before
              heavy analysis so GitHub never times out — the pipeline is
              asynchronous by design.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <h3 className="font-serif text-2xl text-ivory">Impact</h3>
            <ul className="mt-4 space-y-3">
              {IMPACT.map((line) => (
                <li key={line} className="flex gap-3 text-sm leading-relaxed text-ivory/60">
                  <span aria-hidden className="mt-2 block h-px w-4 shrink-0 bg-gold/60" />
                  {line}
                </li>
              ))}
            </ul>
            <h3 className="mt-10 font-serif text-2xl text-ivory">Technology</h3>
            <ul className="mt-4 flex flex-wrap gap-2">
              {STACK.map((t) => (
                <li
                  key={t}
                  className="hairline-gold px-3 py-1 font-mono text-[10px] tracking-[0.14em] text-ivory/60"
                >
                  {t.toUpperCase()}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
