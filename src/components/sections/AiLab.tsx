"use client";

/**
 * AI LAB — four concise visual explorations.
 * Technical education, labeled as explorations, not accomplishments.
 */

import { useState } from "react";
import { Section, Container, Eyebrow } from "@/components/layout/Section";
import { Reveal } from "@/components/motion/Reveal";
import { LAB } from "@/content/ai-lab";
import { cn } from "@/lib/utils";

/** Sample retrieved passages for the RAG inspection — explicitly sample content. */
const RAG_CHUNKS = [
  {
    score: 0.91,
    source: "handbook.md · L442",
    text: "Retrieval quality is bounded by chunking strategy: overlapping windows with metadata filters outperform naive splits on multi-hop questions.",
  },
  {
    score: 0.78,
    source: "evals.md · L17",
    text: "Faithfulness failures cluster where the retrieved context is topically adjacent but not evidential — reranking closes most of the gap.",
  },
];

function RagInspector() {
  const [open, setOpen] = useState(false);
  return (
    <div className="mt-5">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="font-mono text-[10px] tracking-[0.2em] text-gold underline-offset-4 transition-colors duration-gesture hover:text-emerald-imperial hover:underline"
      >
        {open ? "HIDE RETRIEVED CONTEXT" : "INSPECT RETRIEVED CONTEXT"}
      </button>
      {open && (
        <div className="mt-4 space-y-3">
          {RAG_CHUNKS.map((c) => (
            <div key={c.source} className="hairline-gold bg-midnight/60 p-4">
              <p className="font-mono text-[9px] tracking-[0.18em] text-gold/80">
                SCORE {c.score} · {c.source.toUpperCase()} · SAMPLE CONTENT
              </p>
              <p className="mt-2 text-[13px] leading-relaxed text-ivory/70">
                {c.text}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export function AiLab() {
  return (
    <Section surface="midnight" id="ai-lab" className="overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(129,104,255,0.05),transparent_60%)]"
      />
      <Container className="relative max-w-6xl">
        <Eyebrow numeral="VIII.">AI Lab</Eyebrow>
        <Reveal>
          <h2 className="mt-10 font-serif text-5xl leading-[1.05] sm:text-6xl">
            AI Lab
          </h2>
          <p className="mt-5 max-w-2xl font-serif text-2xl italic text-ivory/60">
            Experiments in making software reason, observe, and assist.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-10 md:grid-cols-2">
          {LAB.map((item, idx) => (
            <Reveal key={item.id} delay={idx * 0.06}>
              <article
                className={cn(
                  "group flex h-full flex-col border-t border-gold/25 pt-6 transition-colors duration-500 hover:border-gold/60"
                )}
              >
                <div className="flex items-baseline justify-between">
                  <span className="font-mono text-[10px] tracking-[0.3em] text-gold/70">
                    {item.numeral}
                  </span>
                  <span className="font-mono text-[9px] tracking-[0.18em] text-ivory/35">
                    TECHNICAL EXPLORATION
                  </span>
                </div>
                <h3 className="mt-3 font-serif text-3xl text-ivory">{item.title}</h3>
                <p className="mt-2 font-serif text-base italic text-ivory/55">
                  {item.question}
                </p>

                {/* monospace flow diagram */}
                <div className="mt-5 flex flex-wrap items-center gap-x-2 gap-y-1">
                  {item.flow.map((node, i) => (
                    <span key={node} className="flex items-center gap-2">
                      <span className="hairline-gold px-2.5 py-1 font-mono text-[9px] tracking-[0.14em] text-ivory/70 transition-colors duration-gesture group-hover:text-ivory/90">
                        {node}
                      </span>
                      {i < item.flow.length - 1 && (
                        <span aria-hidden className="font-mono text-[10px] text-gold/60">
                          →
                        </span>
                      )}
                    </span>
                  ))}
                </div>

                <p className="mt-5 text-sm leading-relaxed text-ivory/60">
                  {item.insight}
                </p>

                {item.interactive && <RagInspector />}
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
