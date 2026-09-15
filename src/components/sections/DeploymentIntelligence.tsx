"use client";

/**
 * SYSTEM 01 — AI DEPLOYMENT INTELLIGENCE case study.
 * Signature interaction № 2 — two honest modes:
 *
 *  • LIVE  — fetches a real pull request from the public GitHub API
 *            (changeguard-ai PR #1) and scores it with deterministic,
 *            transparent heuristics. No LLM is called; the analysis
 *            *shape* is demonstrated, labeled as such.
 *  • DEMO  — the simulated PR (PR #184) showing what the production
 *            LLM pipeline returns. Explicitly labeled DEMO DATA.
 *
 * Emerald / Midnight / futuristic atmosphere.
 */

import { useCallback, useEffect, useRef, useState } from "react";
import { Section, Container, Eyebrow } from "@/components/layout/Section";
import { Reveal } from "@/components/motion/Reveal";
import { Tilt } from "@/components/motion/Tilt";
import { RepoStatPanel } from "@/components/sections/RepoStatPanel";
import {
  PIPELINE,
  PR_DEMO,
  RISK_DEMO,
  STACK,
  IMPACT,
} from "@/content/deployment";
import { REPOS } from "@/content/repos";
import {
  fetchRealPr,
  analyzeRealPr,
  LIVE_PR,
  type RealPrData,
  type StageOutput,
} from "@/lib/live-analysis";
import { cn } from "@/lib/utils";

const STAGE_MS = 900;
type Mode = "live" | "demo";

export function DeploymentIntelligence() {
  const [mode, setMode] = useState<Mode>("live");
  const [stageIndex, setStageIndex] = useState(-1); // -1 = idle
  const [running, setRunning] = useState(false);
  const [livePr, setLivePr] = useState<RealPrData | null>(null);
  const [liveResult, setLiveResult] = useState<StageOutput | null>(null);
  const [liveError, setLiveError] = useState<string | null>(null);
  const timers = useRef<Array<ReturnType<typeof setTimeout>>>([]);
  const reduced = useRef(false);

  useEffect(() => {
    reduced.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  const clearTimers = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  };

  useEffect(() => clearTimers, []);

  /** Fan the eight stages out over time; reduced motion → instant. */
  const playStages = useCallback((count: number, onDone: () => void) => {
    clearTimers();
    if (reduced.current) {
      setStageIndex(count - 1);
      onDone();
      return;
    }
    for (let i = 0; i < count; i++) {
      timers.current.push(
        setTimeout(() => {
          setStageIndex(i);
          if (i === count - 1) onDone();
        }, STAGE_MS * (i + 1))
      );
    }
  }, []);

  /** DEMO MODE — simulated PR #184 with the production-shaped outputs. */
  const runDemo = useCallback(() => {
    setMode("demo");
    setLiveError(null);
    setStageIndex(-1);
    setRunning(true);
    playStages(PIPELINE.length, () => setRunning(false));
  }, [playStages]);

  /** LIVE MODE — real PR, deterministic heuristic scoring, staged reveal. */
  const runLive = useCallback(async () => {
    setMode("live");
    setLiveError(null);
    setStageIndex(-1);
    setLiveResult(null);
    setRunning(true);
    try {
      const pr = await Promise.race([
        fetchRealPr(LIVE_PR.repo, LIVE_PR.number),
        new Promise<never>((_, rej) =>
          setTimeout(() => rej(new Error("timeout")), 10000)
        ),
      ]);
      setLivePr(pr);
      const result = analyzeRealPr(pr);
      setLiveResult(result);
      playStages(PIPELINE.length, () => setRunning(false));
    } catch (err) {
      // Honest failure: say why, fall back to the demo run so the
      // visitor still sees the pipeline.
      setLiveError(
        err instanceof Error && err.message === "timeout"
          ? "Live fetch timed out — showing the simulated run instead."
          : "GitHub API unreachable from your network — showing the simulated run instead."
      );
      setStageIndex(-1);
      playStages(PIPELINE.length, () => setRunning(false));
    }
  }, [playStages]);

  const complete = stageIndex >= PIPELINE.length - 1;
  const isLive = mode === "live" && !liveError;
  const live = isLive && liveResult ? liveResult : null;

  // Per-stage output line: live uses real evidence, demo uses the script.
  const stageOutput = (i: number) =>
    live ? live.outputs[i] ?? "" : PIPELINE[i].output;

  // Verdict data depends on mode.
  const verdict = live
    ? {
        score: live.score,
        band: live.band,
        bandLabel: `${live.band} — DETERMINISTIC HEURISTIC ANALYSIS`,
        factors: live.factors,
        recommendation: live.recommendation,
      }
    : {
        score: RISK_DEMO.score,
        band: RISK_DEMO.band,
        bandLabel: `${RISK_DEMO.band} — DEMO DATA`,
        factors: RISK_DEMO.factors,
        recommendation: RISK_DEMO.recommendation,
      };

  const bandColor =
    verdict.band === "HIGH"
      ? "text-red-400/90"
      : verdict.band === "ELEVATED"
        ? "text-gold"
        : "text-emerald-imperial";

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
            {["Problem", "Scale", "Architecture", "Decisions", "Impact", "Technology"].map(
              (s, i, arr) => (
                <li key={s} className="flex items-center gap-6">
                  <span className="font-mono text-[10px] tracking-[0.18em] text-ivory/40">
                    {s.toUpperCase()}
                  </span>
                  {i < arr.length - 1 && (
                    <span aria-hidden className="text-gold/50">
                      ·
                    </span>
                  )}
                </li>
              )
            )}
          </ol>
        </Reveal>

        {/* ── The pipeline interface ── */}
        <Reveal delay={0.1}>
          <Tilt className="mt-14">
            <div className="hairline-gold overflow-hidden rounded-sm bg-royal/60">
            {/* Header strip: live PR data or demo data */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gold/15 px-5 py-3">
              {isLive && livePr ? (
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-[11px] tracking-[0.14em]">
                  <span className="text-emerald-imperial">
                    PR #{livePr.number} · {REPOS.changeguard.name}
                  </span>
                  <span className="text-ivory/50">
                    {livePr.branch} → {livePr.base}
                  </span>
                  <span className="text-emerald-imperial/80">+{livePr.additions}</span>
                  <span className="text-red-400/70">−{livePr.deletions}</span>
                </div>
              ) : (
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-[11px] tracking-[0.14em]">
                  <span className="text-emerald-imperial">{PR_DEMO.id}</span>
                  <span className="text-ivory/50">{PR_DEMO.branch}</span>
                  <span className="text-emerald-imperial/80">+{PR_DEMO.additions}</span>
                  <span className="text-red-400/70">−{PR_DEMO.deletions}</span>
                </div>
              )}
              <span
                className={cn(
                  "font-mono text-[9px] tracking-[0.22em]",
                  isLive && livePr ? "text-emerald-imperial" : "text-gold/80"
                )}
              >
                {isLive && livePr ? "LIVE GITHUB DATA" : "DEMO DATA"}
              </span>
            </div>

            <div className="px-5 py-6">
              <p className="font-mono text-[11px] tracking-[0.14em] text-ivory/45">
                {isLive && livePr
                  ? `OPENED BY ${livePr.author.toUpperCase()} · ${livePr.commits} COMMITS · ${livePr.changedFiles} FILES`
                  : `${PR_DEMO.services} SERVICES AFFECTED · OPENED BY ${PR_DEMO.author.toUpperCase()}`}
              </p>

              {/* Mode toggle + run buttons */}
              <div className="mt-6 flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={runLive}
                  disabled={running}
                  className={cn(
                    "hairline-gold px-5 py-2.5 font-mono text-[11px] tracking-[0.2em] transition-colors duration-gesture",
                    running
                      ? mode === "live"
                        ? "cursor-wait text-ivory/40"
                        : "text-ivory/45"
                      : mode === "live"
                        ? "bg-emerald-imperial/15 text-emerald-imperial hover:bg-emerald-imperial/25"
                        : "text-emerald-imperial/70 hover:bg-emerald-imperial/10"
                  )}
                >
                  {running && mode === "live"
                    ? "ANALYZING LIVE PR…"
                    : mode === "live" && complete
                      ? "RE-RUN ON LIVE PR"
                      : "RUN ON A REAL PULL REQUEST"}
                </button>
                <button
                  type="button"
                  onClick={runDemo}
                  disabled={running}
                  className={cn(
                    "font-mono text-[11px] tracking-[0.2em] transition-colors duration-gesture",
                    running
                      ? mode === "demo"
                        ? "cursor-wait text-ivory/40"
                        : "text-ivory/45"
                      : mode === "demo"
                        ? "text-gold hover:text-gold/80"
                        : "text-ivory/45 hover:text-gold"
                  )}
                >
                  {running && mode === "demo"
                    ? "ANALYZING…"
                    : mode === "demo" && complete
                      ? "RE-RUN DEMO"
                      : "RUN DEMO MODE"}
                </button>
                {!complete && !running && (
                  <span className="font-mono text-[10px] tracking-[0.16em] text-ivory/35">
                    {mode === "live"
                      ? "FETCHES A PUBLIC PR — DETERMINISTIC ANALYSIS, NO LLM CALLED"
                      : "SIMULATION — NO PRODUCTION SYSTEM IS CALLED"}
                  </span>
                )}
              </div>

              {/* Live fetch status / honest failure notice */}
              {mode === "live" && (running || liveError) && (
                <p
                  className={cn(
                    "mt-4 font-mono text-[10px] tracking-[0.16em]",
                    liveError ? "text-gold/80" : "text-emerald-imperial/80"
                  )}
                  role="status"
                >
                  {liveError ??
                    (stageIndex < 0
                      ? "○ FETCHING PULL REQUEST FROM GITHUB…"
                      : "● LIVE PR LOADED — RUNNING PIPELINE")}
                </p>
              )}
              {isLive && livePr && (
                <p className="mt-4 font-mono text-[10px] tracking-[0.16em] text-ivory/40">
                  SOURCE:{" "}
                  <a
                    href={livePr.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gold/80 underline-offset-4 transition-colors duration-gesture hover:text-gold hover:underline"
                  >
                    {livePr.url.replace("https://", "")} ↗
                  </a>
                </p>
              )}

              {/* ── Pipeline stages ── */}
              <ol className="mt-8 grid gap-0 md:grid-cols-2 md:gap-x-10">
                {PIPELINE.map((stage, i) => {
                  const done = stageIndex >= i;
                  const output = stageOutput(i);
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
                      {output && (
                        <p
                          className={cn(
                            "mt-2 font-mono text-[10px] leading-relaxed tracking-[0.1em] transition-all duration-500",
                            done ? "text-emerald-imperial/80" : "text-transparent"
                          )}
                        >
                          {output}
                        </p>
                      )}
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
                      {verdict.score}
                      <span className="ml-2 font-mono text-sm text-ivory/40">
                        /100
                      </span>
                    </p>
                    <p className={cn("mt-3 font-mono text-[10px] tracking-[0.22em]", bandColor)}>
                      {verdict.bandLabel}
                    </p>
                  </div>
                  <div>
                    <p className="eyebrow text-gold/80">Rollout Recommendation</p>
                    <p className="mt-4 max-w-xl text-sm leading-relaxed text-ivory/70">
                      {verdict.recommendation}
                    </p>
                    <dl className="mt-6 grid gap-x-10 gap-y-4 sm:grid-cols-2">
                      {verdict.factors.map((f) => (
                        <div key={f.label} className="border-l border-gold/25 pl-4">
                          <dt className="font-mono text-[10px] tracking-[0.18em] text-ivory/45">
                            {f.label.toUpperCase()} · {f.weight}
                          </dt>
                          <dd className="mt-1 text-[13px] text-ivory/70">{f.value}</dd>
                        </div>
                      ))}
                    </dl>
                    {live && (
                      <p className="mt-6 max-w-xl font-mono text-[9px] leading-relaxed tracking-[0.14em] text-ivory/35">
                        LIVE MODE SCORES A REAL PULL REQUEST WITH TRANSPARENT,
                        DETERMINISTIC RULES. THE PRODUCTION SYSTEM REASONS OVER
                        THE SAME EVIDENCE WITH CLAUDE — SEE THE NARRATIVE BELOW.
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          </Tilt>
        </Reveal>

        {/* ── The repository, live from GitHub ── */}
        <Reveal delay={0.05}>
          <RepoStatPanel repoKey="changeguard" className="mt-6" />
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
