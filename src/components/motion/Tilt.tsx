"use client";

/**
 * TILT — a restrained 3D card tilt. The panel leans toward the pointer
 * a few degrees with a soft sheen, giving physical depth to the two
 * demo interfaces. Disabled for touch pointers and reduced motion.
 */

import { useRef, useState } from "react";
import { cn } from "@/lib/utils";

export function Tilt({
  children,
  className,
  max = 4,
}: {
  children: React.ReactNode;
  className?: string;
  max?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState<React.CSSProperties>({});
  const [sheen, setSheen] = useState({ x: 50, y: 50, on: false });

  const onMove = (e: React.PointerEvent) => {
    const el = ref.current;
    if (!el || e.pointerType === "touch") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    setStyle({
      transform: `perspective(1200px) rotateX(${(0.5 - py) * max}deg) rotateY(${
        (px - 0.5) * max
      }deg)`,
      transition: "transform 120ms linear",
    });
    setSheen({ x: px * 100, y: py * 100, on: true });
  };

  const onLeave = () => {
    setStyle({
      transform: "perspective(1200px) rotateX(0deg) rotateY(0deg)",
      transition: "transform 600ms cubic-bezier(0.22, 1, 0.36, 1)",
    });
    setSheen((s) => ({ ...s, on: false }));
  };

  return (
    <div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className={cn("relative [transform-style:preserve-3d]", className)}
      style={style}
    >
      {children}
      {/* Sheen — a faint light that follows the pointer across the surface */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 transition-opacity duration-700"
        style={{
          opacity: sheen.on ? 1 : 0,
          background: `radial-gradient(600px circle at ${sheen.x}% ${sheen.y}%, rgba(198,161,91,0.06), transparent 45%)`,
        }}
      />
    </div>
  );
}
