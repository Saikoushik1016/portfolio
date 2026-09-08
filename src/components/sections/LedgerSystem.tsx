"use client";

/**
 * SYSTEM 03 — A LEDGER THAT REMEMBERS EVERYTHING case study.
 * Antique accounting ledger transforms into a modern digital system.
 * Ivory / Antique Gold / classical atmosphere.
 */

import { useEffect, useRef, useState } from "react";
import { Section, Container, Eyebrow } from "@/components/layout/Section";
import { Reveal } from "@/components/motion/Reveal";
import { TRANSFER_DEMO, LEDGER_STEPS, LEDGER_STACK } from "@/content/ledger";
import { LINKS } from "@/content/links";
import { cn } from "@/lib/utils";

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
      { threshold: 0.2 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [seen]);
  return { ref, seen };
}

export function LedgerSystem() {
  const [step, setStep] = useState(-1);
  const demo = useInViewOnce<HTMLDivElement>();
  const reduced = useRef(false);

  useEffect(() => {
    reduced.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  useEffect(() => {
    if (!demo.seen) return;
    if (reduced.current) {
      setStep(LEDGER_STEPS.length - 1);
      return;
    }
    const timers: Array<ReturnType<typeof setTimeout>> = [];
    LEDGER_STEPS.forEach((_, i) => {
      timers.push(setTimeout(() => setStep(i), 1000 * (i + 1)));
    });
    return () => timers.forEach(clearTimeout);
  }, [demo.seen]);

  const balanced = step >= LEDGER_STEPS.length - 1;

  return (
    <Section surface="ivory" id="system-03" className="overflow-hidden">
      <Container className="relative max-w-6xl">
        <Eyebrow numeral="VII.">System 03</Eyebrow>

        <Reveal>
          <p className="mt-10 font-mono text-[11px] tracking-[0.22em] text-gold">
            FINANCIAL CORRECTNESS · DETERMINISTIC STATE · AUDIT
          </p>
          <h2 className="mt-4 max-w-3xl font-serif text-5xl leading-[1.05] sm:text-6xl">
            A Ledger That Remembers Everything
          </h2>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-midnight/70">
            Banking systems began as bound books — every entry in ink, every
            correction accounted. This project borrows that discipline: a
            transfer is not a mutation, it is an entry in an append-only
            history that must always balance.
          </p>
        </Reveal>

        {/* ── Antique → digital transformation strip ── */}
        <Reveal delay={0.05}>
          <div className="mt-14 grid items-center gap-6 border-y border-gold/40 py-6 md:grid-cols-[1fr_auto_1fr]">
            <div className="text-center md:text-left">
              <p className="font-serif text-2xl italic text-midnight/80">
                &ldquo;Dr. Cash&nbsp;…&nbsp;Cr. Revenue&rdquo;
              </p>
              <p className="mt-1 font-mono text-[9px] tracking-[0.22em] text-midnight/40">
                THE BOUND LEDGER — 1892
              </p>
            </div>
            <span aria-hidden className="font-serif text-3xl text-gold">
              ⟶
            </span>
            <div className="text-center md:text-right">
              <p className="font-mono text-sm tracking-[0.1em] text-midnight/80">
                INSERT INTO ledger_entry (…)
              </p>
              <p className="mt-1 font-mono text-[9px] tracking-[0.22em] text-midnight/40">
                THE APPEND-ONLY TABLE — TODAY
              </p>
            </div>
          </div>
        </Reveal>

        {/* ── Balanced transfer demo — DEMO DATA ── */}
        <Reveal delay={0.1}>
          <div ref={demo.ref} className="hairline-gold relative mt-14 bg-paper/70 p-6 sm:p-8">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <span className="font-mono text-[11px] tracking-[0.16em] text-midnight/60">
                {TRANSFER_DEMO.txn}
              </span>
              <span className="font-mono text-[9px] tracking-[0.22em] text-gold">
                DEMO DATA
              </span>
            </div>

            {/* T-accounts */}
            <div className="mt-8 grid gap-8 sm:grid-cols-2">
              {[
                { acc: TRANSFER_DEMO.accountA, side: "DEBIT" },
                { acc: TRANSFER_DEMO.accountB, side: "CREDIT" },
              ].map(({ acc, side }) => (
                <figure key={acc.name} className="border-t-2 border-midnight/70 pt-4">
                  <figcaption className="font-serif text-xl text-midnight">
                    {acc.name}
                  </figcaption>
                  <p className="mt-1 font-mono text-[9px] tracking-[0.22em] text-midnight/45">
                    {side} SIDE
                  </p>
                  <div className="mt-4 space-y-2 font-mono text-sm">
                    <p className="text-midnight/55">
                      opening <span className="float-right text-midnight/80">{acc.before}</span>
                    </p>
                    <p
                      className={cn(
                        "transition-colors duration-700",
                        step >= 3 ? "text-emerald-700" : "text-transparent"
                      )}
                    >
                      transfer <span className="float-right">{acc.delta}</span>
                    </p>
                  </div>
                </figure>
              ))}
            </div>

            {/* ledger steps */}
            <ol className="mt-10">
              {LEDGER_STEPS.map((s, i) => {
                const active = step >= i;
                const isCurrent = step === i;
                return (
                  <li key={s.id} className="relative">
                    {i < LEDGER_STEPS.length - 1 && (
                      <span
                        aria-hidden
                        className={cn(
                          "absolute left-[7px] top-5 h-[calc(100%-8px)] w-px transition-colors duration-500",
                          active ? "bg-gold" : "bg-midnight/15"
                        )}
                      />
                    )}
                    <div className="flex items-baseline gap-4 py-3">
                      <span
                        aria-hidden
                        className={cn(
                          "mt-1.5 block h-[15px] w-[15px] shrink-0 rounded-full border transition-all duration-500",
                          active ? "border-gold bg-gold/25" : "border-midnight/25",
                          isCurrent && "scale-125"
                        )}
                      />
                      <div className="flex-1">
                        <div className="flex flex-wrap items-baseline justify-between gap-x-6">
                          <span
                            className={cn(
                              "font-mono text-[11px] tracking-[0.18em] transition-colors duration-500",
                              active ? "text-midnight/85" : "text-midnight/35"
                            )}
                          >
                            {s.label}
                          </span>
                          <span
                            className={cn(
                              "font-mono text-[10px] tracking-[0.12em] transition-colors duration-500",
                              active ? "text-emerald-700" : "text-transparent"
                            )}
                          >
                            {s.entry}
                          </span>
                        </div>
                        <p
                          className={cn(
                            "mt-1 max-w-xl text-[13px] leading-relaxed transition-colors duration-500",
                            active ? "text-midnight/60" : "text-midnight/30"
                          )}
                        >
                          {s.detail}
                        </p>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ol>

            {/* balance verdict */}
            <div
              className={cn(
                "mt-8 flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-midnight/20 pt-6 transition-opacity duration-700",
                balanced ? "opacity-100" : "opacity-30"
              )}
            >
              <p className="font-serif text-2xl text-emerald-700">
                BALANCED ✓
              </p>
              <p className="font-mono text-[10px] tracking-[0.2em] text-midnight/50">
                AUDIT ENTRY CREATED — {TRANSFER_DEMO.amount} MOVED, NOTHING LOST
              </p>
            </div>
          </div>
        </Reveal>

        {/* ── Narrative ── */}
        <div className="mt-20 grid gap-14 md:grid-cols-2 md:gap-10">
          <Reveal>
            <h3 className="font-serif text-2xl text-midnight">
              Why deterministic money is hard
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-midnight/65">
              A transfer touches at least two balances and must succeed or fail
              as one unit. Concurrency means two transfers racing the same
              account; failure means an operation that half-happened. The
              answers — transaction boundaries, idempotency keys, append-only
              history — are the same answers the bound book implied a century
              ago.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <h3 className="font-serif text-2xl text-midnight">The Stack</h3>
            <p className="mt-4 text-sm leading-relaxed text-midnight/65">
              REST APIs with strict validation. A schema designed around the
              ledger, not the object. A React and TypeScript frontend that
              makes balances and history legible. Dockerized, deployed to the
              cloud — a small system built with production discipline.
            </p>
            <ul className="mt-5 flex flex-wrap gap-2">
              {LEDGER_STACK.map((t) => (
                <li
                  key={t}
                  className="hairline-gold px-3 py-1 font-mono text-[10px] tracking-[0.14em] text-midnight/60"
                >
                  {t.toUpperCase()}
                </li>
              ))}
            </ul>
            <a
              href={LINKS.github}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-8 inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.2em] text-gold transition-colors duration-gesture hover:text-midnight"
            >
              VIEW SOURCE ↗
              <span aria-hidden className="transition-transform duration-gesture group-hover:translate-x-1">
                →
              </span>
            </a>
            <p className="mt-3 font-mono text-[9px] tracking-[0.18em] text-midnight/40">
              EDUCATIONAL PROJECT — NOT A PRODUCTION FINANCIAL PRODUCT
            </p>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
