"use client";

/**
 * FROM DATABASE TO PIXEL — a vertical architecture journey.
 * As the user scrolls, each layer activates. No logo wall.
 */

import { useEffect, useRef, useState } from "react";
import { Section, Container, Eyebrow } from "@/components/layout/Section";
import { Reveal } from "@/components/motion/Reveal";
import { LAYERS } from "@/content/layers";
import { cn } from "@/lib/utils";

export function DatabaseToPixel() {
  const [active, setActive] = useState(-1);
  const listRef = useRef<HTMLOListElement>(null);

  useEffect(() => {
    const items = listRef.current?.querySelectorAll("li");
    if (!items?.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            const idx = Number((e.target as HTMLElement).dataset.idx ?? -1);
            setActive((prev) => Math.max(prev, idx));
          }
        }
      },
      { rootMargin: "-35% 0px -35% 0px", threshold: 0 }
    );
    items.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <Section surface="royal" id="full-stack" className="overflow-hidden">
      <Container className="relative max-w-4xl">
        <Eyebrow numeral="IX.">Full Stack Engineering</Eyebrow>
        <Reveal>
          <h2 className="mt-10 font-serif text-5xl leading-[1.05] sm:text-6xl">
            From Database to Pixel
          </h2>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-ivory/65">
            Full stack does not mean React + Node. It means understanding how
            the entire product behaves as one system — every layer below the
            interface is someone&rsquo;s experience of it.
          </p>
        </Reveal>

        <ol ref={listRef} className="mt-16">
          {LAYERS.map((layer, i) => {
            const activeLayer = active >= i;
            const isTop = i === 0;
            return (
              <li
                key={layer.id}
                data-idx={i}
                className="relative pl-12 pb-12 last:pb-0"
              >
                {/* connector */}
                {!isTop && (
                  <span
                    aria-hidden
                    className={cn(
                      "absolute left-[13px] top-0 h-8 w-px transition-colors duration-700",
                      activeLayer ? "bg-gold/50" : "bg-ivory/10"
                    )}
                  />
                )}
                {/* node */}
                <span
                  aria-hidden
                  className={cn(
                    "absolute left-[7px] top-2 block h-[15px] w-[15px] rounded-full border transition-all duration-700",
                    activeLayer
                      ? "border-gold bg-gold/30 shadow-[0_0_12px_rgba(198,161,91,0.35)]"
                      : "border-ivory/25 bg-transparent"
                  )}
                />
                <div
                  className={cn(
                    "border-l-2 pl-6 transition-all duration-700",
                    activeLayer ? "border-gold/50" : "border-transparent"
                  )}
                >
                  <div className="flex flex-wrap items-baseline gap-x-5 gap-y-1">
                    <span
                      className={cn(
                        "font-mono text-[10px] tracking-[0.3em] transition-colors duration-700",
                        activeLayer ? "text-gold" : "text-ivory/30"
                      )}
                    >
                      {layer.numeral}
                    </span>
                    <h3
                      className={cn(
                        "font-mono text-sm tracking-[0.22em] transition-colors duration-700",
                        activeLayer ? "text-ivory" : "text-ivory/40"
                      )}
                    >
                      {layer.label}
                    </h3>
                  </div>
                  <p
                    className={cn(
                      "mt-2 max-w-xl text-sm leading-relaxed transition-colors duration-700",
                      activeLayer ? "text-ivory/70" : "text-ivory/30"
                    )}
                  >
                    {layer.meaning}
                  </p>
                  <p
                    className={cn(
                      "mt-2 font-mono text-[10px] tracking-[0.14em] transition-colors duration-700",
                      activeLayer ? "text-sapphire" : "text-ivory/20"
                    )}
                  >
                    {layer.tech.toUpperCase()}
                  </p>
                </div>
              </li>
            );
          })}
        </ol>
      </Container>
    </Section>
  );
}
