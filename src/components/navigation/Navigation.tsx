"use client";

import { useEffect, useState } from "react";
import { Monogram } from "@/components/brand/Monogram";
import { cn } from "@/lib/utils";
import { LINKS } from "@/content/links";

const CENTER_LINKS = [
  { label: "Work", href: "#work" },
  { label: "AI Lab", href: "#ai-lab" },
  { label: "Systems", href: "#systems" },
  { label: "About", href: "#about" },
];

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-4 z-50 flex justify-center px-4">
      <nav
        aria-label="Primary"
        className={cn(
          "hairline-gold flex w-full max-w-3xl items-center justify-between rounded-sm",
          "bg-midnight/70 text-ivory backdrop-blur-md",
          "transition-all duration-500 ease-soft",
          scrolled ? "px-3 py-1.5 text-[13px]" : "px-4 py-3 text-sm"
        )}
      >
        <a
          href="#top"
          aria-label="Sai Koushik — home"
          className="flex items-center gap-2.5"
        >
          <Monogram size={scrolled ? 20 : 26} className="transition-all duration-500 ease-soft" />
          <span className="hidden font-serif text-base tracking-wide sm:inline">
            Sai Koushik
          </span>
        </a>

        <ul className="hidden items-center gap-7 md:flex">
          {CENTER_LINKS.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                className="text-ivory/75 transition-colors duration-gesture hover:text-gold"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-5 md:flex">
          <a
            href={LINKS.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-1 text-ivory/85 transition-colors duration-gesture hover:text-gold"
          >
            Resume
            <span aria-hidden className="text-gold/80 transition-transform duration-gesture group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
              ↗
            </span>
          </a>
          <a
            href="#contact"
            className="hairline-gold rounded-sm px-3 py-1 transition-colors duration-gesture hover:bg-gold/10"
          >
            Contact
          </a>
        </div>

        {/* Mobile */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          className="font-mono text-[11px] tracking-[0.2em] text-gold md:hidden"
        >
          {open ? "CLOSE" : "MENU"}
        </button>

        {open && (
          <div className="hairline-gold absolute inset-x-0 top-full mt-2 rounded-sm bg-midnight/95 p-5 backdrop-blur-md md:hidden">
            <ul className="flex flex-col gap-4">
              {CENTER_LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="text-sm text-ivory/85"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li className="rule-gold my-1" />
              <li>
                <a href={LINKS.resume} target="_blank" rel="noopener noreferrer" onClick={() => setOpen(false)} className="text-sm text-ivory/85">
                  Resume ↗
                </a>
              </li>
              <li>
                <a href="#contact" onClick={() => setOpen(false)} className="text-sm text-ivory/85">
                  Contact
                </a>
              </li>
            </ul>
          </div>
        )}
      </nav>
    </header>
  );
}
