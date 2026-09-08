"use client";

/**
 * SYSTEM 02 — MONEY MOVES THROUGH SYSTEMS case study.
 * Animated transaction journey + Optimization Room.
 * Navy / Midnight / architectural atmosphere.
 */

import { useEffect, useRef, useState } from "react";
import { Section, Container, Eyebrow } from "@/components/layout/Section";
import { Reveal } from "@/components/motion/Reveal";
import { JOURNEY, TXN_DEMO, TRANSFORMATIONS } from "@/content/payments";
import { cn } from "@/lib/utils";

const STEP_MS = 1100;

function useInViewOnce<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || seen) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setSeen(true);
          io.disconnect();
        }
      },
      { threshold: 0.25 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [seen]);
  return { ref, seen };
}

export function PaymentSystems() {
  const [step, setStep] = useState(-1);
  const journey = useInViewOnce<HTMLDivElement>();
  const reduced = useRef(false);

  useEffect(() => {
    reduced.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
  }, []);

  // Auto-play the journey once, when it scrolls into view.
  useEffect(() => {
    if (!journey.seen) return;
    if (reduced.current) {
      setStep(JOURNEY.length - 1);
      return;
    }
    const timers: Array<ReturnType<typeof setTimeout>> = [];
    JOURNEY.forEach((_, i) => {
      timers.push(setTimeout(() => setStep(i), STEP_MS * (i + 1)));
    });
    return () => timers.forEach(clearTimeout);
  }, [journey.seen]);

  const txnActive = step >= 0;

  return (
    <Section surface="royal" id="system-02" className="overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(65,105,225,0.08),transparent_55%)]"
      />

      <Container className="relative max-w-6xl">
        <Eyebrow numeral="VI.">System 02</Eyebrow>

        <Reveal>
          <p className="mt-10 font-mono text-[11px] tracking-[0.22em] text-sapphire">
            DISTRIBUTED SYSTEMS · EVENT-DRIVEN ARCHITECTURE · RELIABILITY
          </p>
          <h2 className="mt-4 max-w-3xl font-serif text-5xl leading-[1.05] sm:text-6xl">
            Money Moves Through Systems
          </h2>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-ivory/65">
            The flagship distributed systems study. A payment is not a database
            row — it is a story told through events, each chapter verified
            before the next begins. This is the architecture that carried
            10K+ daily transactions and half a million monthly records.
          </p>
        </Reveal>

        {/* ── Transaction journey — DEMO DATA ── */}
        <Reveal delay={0.1}>
          <div ref={journey.ref} className="hairline-gold mt-14 bg-midnight/50 p-6 sm:p-8">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-baseline gap-4 font-mono text-[11px] tracking-[0.16em]">
                <span className="text-gold">{TXN_DEMO.id}</span>
                <span className="text-ivory/60">{TXN_DEMO.amount}</span>
              </div>
              <span className="font-mono text-[9px] tracking-[0.22em] text-gold/80">
                DEMO DATA
              </span>
            </div>

            {/* status ticker */}
            <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1">
              {TXN_DEMO.statusFlow.map((s, i) => (
                <span
                  key={s}
                  className={cn(
                    "font-mono text-[10px] tracking-[0.14em] transition-colors duration-500",
                    txnActive && step >= Math.floor((i * (JOURNEY.length - 1)) / (TXN_DEMO.statusFlow.length - 1))
                      ? "text-emerald-imperial"
                      : "text-ivory/25"
                  )}
                >
                  {s}
                  {i < TXN_DEMO.statusFlow.length - 1 && (
                    <span aria-hidden className="ml-4 text-ivory/20">
                      →
                    </span>
                  )}
                </span>
              ))}
            </div>

            {/* journey nodes */}
            <ol className="mt-8 space-y-0">
              {JOURNEY.map((j, i) => {
                const active = txnActive && step >= i;
                const isCurrent = txnActive && step === i;
                return (
                  <li key={j.id} className="relative">
                    {i < JOURNEY.length - 1 && (
                      <span
                        aria-hidden
                        className={cn(
                          "absolute left-[7px] top-5 h-[calc(100%-8px)] w-px transition-colors duration-500",
                          active ? "bg-sapphire/60" : "bg-ivory/10"
                        )}
                      />
                    )}
                    <div className="flex items-baseline gap-4 py-3">
                      <span
                        aria-hidden
                        className={cn(
                          "mt-1.5 block h-[15px] w-[15px] shrink-0 rounded-full border transition-all duration-500",
                          active
                            ? "border-sapphire bg-sapphire/30"
                            : "border-ivory/20 bg-transparent",
                          isCurrent && "scale-125 border-gold bg-gold/30"
                        )}
                      />
                      <div className="flex-1">
                        <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                          <span
                            className={cn(
                              "font-mono text-[11px] tracking-[0.18em] transition-colors duration-500",
                              active ? "text-ivory/85" : "text-ivory/35"
                            )}
                          >
                            {j.label}
                          </span>
                          <span
                            className={cn(
                              "font-mono text-[10px] tracking-[0.12em] transition-colors duration-500",
                              active ? "text-emerald-imperial/85" : "text-transparent"
                            )}
                          >
                            {j.event}
                          </span>
                        </div>
                        <p
                          className={cn(
                            "mt-1 max-w-xl text-[13px] leading-relaxed transition-all duration-500",
                            active ? "text-ivory/55" : "text-ivory/25"
                          )}
                        >
                          {j.note}
                        </p>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ol>

            <button
              type="button"
              onClick={() => {
                setStep(-1);
                JOURNEY.forEach((_, i) => {
                  setTimeout(() => setStep(i), STEP_MS * (i + 1));
                });
              }}
              className="mt-6 font-mono text-[10px] tracking-[0.2em] text-gold/70 underline-offset-4 transition-colors duration-gesture hover:text-gold hover:underline"
            >
              ↻ REPLAY TRANSACTION
            </button>
          </div>
        </Reveal>

        {/* ── Optimization Room ── */}
        <div className="mt-24">
          <Reveal>
            <h3 className="font-serif text-4xl text-ivory">Optimization Room</h3>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-ivory/55">
              Engineering improvements shown as transformations — each pair is a
              measured before and after, not a target.
            </p>
          </Reveal>

          <div className="mt-12 space-y-0">
            {TRANSFORMATIONS.map((t, i) => (
              <Reveal key={t.id} delay={i * 0.05}>
                <figure className="group grid gap-4 border-t border-gold/20 py-8 transition-colors duration-500 last:border-b hover:border-gold/50 md:grid-cols-[1fr_auto_1fr_auto] md:items-baseline md:gap-8">
                  <span className="font-mono text-xl text-ivory/35 line-through decoration-red-400/50 decoration-1">
                    {t.before}
                  </span>
                  <span aria-hidden className="hidden font-serif text-2xl text-gold md:block">
                    →
                  </span>
                  <span className="font-serif text-4xl text-ivory sm:text-5xl">
                    {t.after}
                  </span>
                  <div className="md:text-right">
                    <figcaption className="eyebrow text-gold/80">{t.label}</figcaption>
                    <p className="mt-2 text-[13px] leading-relaxed text-ivory/50 md:ml-auto md:max-w-xs">
                      {t.how}
                    </p>
                  </div>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>

        {/* ── Full-stack breadth of this system ── */}
        <div className="mt-20 grid gap-14 md:grid-cols-2 md:gap-10">
          <Reveal>
            <h3 className="font-serif text-2xl text-ivory">What this system demanded</h3>
            <p className="mt-4 text-sm leading-relaxed text-ivory/60">
              Event-driven architecture on Kafka. API design and validation at
              the edge. Database optimization under nine-figure datasets. Redis
              caching for hot paths. AWS infrastructure codified in Terraform.
              OAuth2 and Okta at the security boundary. CI/CD with health-gated
              rollouts. Testcontainers for integration confidence. Dashboards
              that made the data legible to the people relying on it.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <h3 className="font-serif text-2xl text-ivory">Why events, not calls</h3>
            <p className="mt-4 text-sm leading-relaxed text-ivory/60">
              Synchronous chains fail together; event-driven systems fail
              independently. When reconciliation lags, payments still flow.
              When settlement retries, nothing is double-counted — the ledger
              event is immutable, consumers are idempotent, and the audit
              trail is complete by construction rather than by discipline.
            </p>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
