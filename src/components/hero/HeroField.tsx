"use client";

/**
 * CONSTELLATION 3D — the hero's systems visualization, dimensional.
 *
 * Seven systems — MODEL, API, SERVICE, QUEUE, CACHE, DATABASE, CLOUD —
 * hung in a three-dimensional field. Hairline gold edges connect them;
 * request pulses travel the edges; a slowly rotating gold wireframe
 * monolith (the SK diamond, dimensional) anchors the center.
 *
 * The field breathes with the pointer (parallax) and drifts as the
 * visitor scrolls. dpr-capped, pauses off-screen, renders a single
 * static frame under prefers-reduced-motion. Palette: gold hairlines,
 * ivory nodes, emerald/sapphire packet accents.
 */

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const GOLD = "#C6A15B";
const IVORY = "#F3EFE6";
const EMERALD = "#18B884";
const SAPPHIRE = "#5A7BD8";

type NodeDef = {
  label: string;
  pos: [number, number, number];
  size: number;
};

/** Same distributed-systems topology as the brief, now in space. */
const NODES: NodeDef[] = [
  { label: "MODEL", pos: [1.9, 1.35, -0.4], size: 0.26 },
  { label: "API", pos: [0.4, 0.6, 0.3], size: 0.22 },
  { label: "SERVICE", pos: [-0.9, 1.15, -0.8], size: 0.24 },
  { label: "QUEUE", pos: [-1.9, -0.15, 0.35], size: 0.2 },
  { label: "CACHE", pos: [1.1, -0.85, 0.5], size: 0.18 },
  { label: "DATABASE", pos: [-0.3, -1.5, -0.3], size: 0.26 },
  { label: "CLOUD", pos: [1.9, -1.85, -0.9], size: 0.2 },
];

/** Edges: the request path and infrastructure adjacency. */
const EDGES: Array<[number, number]> = [
  [0, 1],
  [1, 2],
  [2, 3],
  [1, 4],
  [4, 5],
  [3, 5],
  [1, 5],
  [4, 6],
];

/** Sprite-free labels are drawn in DOM overlay; keep normalized refs. */
const LABELS: Array<{ label: string; pos: NodeDef["pos"] }> = NODES.map(
  ({ label, pos }) => ({ label, pos })
);

function Node({
  def,
  reduced,
}: {
  def: NodeDef;
  reduced: boolean;
}) {
  const mesh = useRef<THREE.Mesh>(null);
  const mat = useRef<THREE.MeshBasicMaterial>(null);
  const seed = useMemo(() => Math.random() * Math.PI * 2, []);

  useFrame(({ clock }) => {
    if (reduced || !mesh.current || !mat.current) return;
    // Gentle breathing — each node has its own phase.
    const t = clock.elapsedTime * 0.6 + seed;
    const s = 1 + Math.sin(t) * 0.08;
    mesh.current.scale.setScalar(s);
    mat.current.opacity = 0.75 + Math.sin(t) * 0.2;
  });

  return (
    <mesh ref={mesh} position={def.pos}>
      <icosahedronGeometry args={[def.size, 1]} />
      <meshBasicMaterial
        ref={mat}
        color={IVORY}
        wireframe
        transparent
        opacity={0.8}
      />
    </mesh>
  );
}

function Edges({ reduced }: { reduced: boolean }) {
  const group = useRef<THREE.Group>(null);
  const geoms = useMemo(() => {
    return EDGES.map(([a, b]) => {
      const g = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(...NODES[a].pos),
        new THREE.Vector3(...NODES[b].pos),
      ]);
      return g;
    });
  }, []);

  useFrame(({ clock }) => {
    if (reduced || !group.current) return;
    const t = clock.elapsedTime;
    group.current.children.forEach((line, i) => {
      const m = (line as THREE.Line).material as THREE.LineBasicMaterial;
      m.opacity = 0.16 + Math.sin(t * 0.5 + i * 1.7) * 0.07;
    });
  });

  return (
    <group ref={group}>
      {geoms.map((g, i) => (
        <primitive
          key={i}
          object={new THREE.Line(
            g,
            new THREE.LineBasicMaterial({
              color: GOLD,
              transparent: true,
              opacity: 0.18,
            })
          )}
        />
      ))}
    </group>
  );
}

/** A request pulse traveling one edge, then restarting — the "traffic". */
function Pulse({
  edge,
  speed,
  offset,
  color,
  reduced,
}: {
  edge: [number, number];
  speed: number;
  offset: number;
  color: string;
  reduced: boolean;
}) {
  const mesh = useRef<THREE.Mesh>(null);
  const [a, b] = useMemo(
    () => [new THREE.Vector3(...NODES[edge[0]].pos), new THREE.Vector3(...NODES[edge[1]].pos)],
    [edge]
  );

  useFrame(({ clock }) => {
    if (reduced || !mesh.current) return;
    const t = (clock.elapsedTime * speed + offset) % 1;
    mesh.current.position.lerpVectors(a, b, t);
    // Fade at both endpoints so pulses appear to enter/leave nodes.
    const m = mesh.current.material as THREE.MeshBasicMaterial;
    m.opacity = Math.sin(t * Math.PI);
  });

  return (
    <mesh ref={mesh}>
      <sphereGeometry args={[0.045, 12, 12]} />
      <meshBasicMaterial color={color} transparent opacity={0.9} />
    </mesh>
  );
}

/** The SK diamond, dimensional — a slowly rotating gold wireframe octahedron. */
function Monolith({ reduced }: { reduced: boolean }) {
  const mesh = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (reduced || !mesh.current) return;
    const t = clock.elapsedTime;
    mesh.current.rotation.y = t * 0.12;
    mesh.current.rotation.x = Math.sin(t * 0.2) * 0.12;
    // A slow, grand breath.
    mesh.current.scale.setScalar(1 + Math.sin(t * 0.35) * 0.03);
  });

  return (
    <mesh ref={mesh} rotation={[0, 0, Math.PI / 4]}>
      <octahedronGeometry args={[1.05, 0]} />
      <meshBasicMaterial color={GOLD} wireframe transparent opacity={0.3} />
    </mesh>
  );
}

/** Pointer parallax + scroll drift applied to the whole field. */
function Field({
  reduced,
  children,
}: {
  reduced: boolean;
  children: React.ReactNode;
}) {
  const group = useRef<THREE.Group>(null);
  const { pointer } = useThree();
  const target = useRef({ x: 0, y: 0 });

  useFrame(({ clock }) => {
    if (!group.current) return;
    if (reduced) {
      group.current.rotation.y = 0.35;
      return;
    }
    target.current.x = pointer.y * 0.16;
    target.current.y = 0.35 + pointer.x * 0.28;
    // Ease toward the pointer — heavier objects, gentle response.
    group.current.rotation.x +=
      (target.current.x - group.current.rotation.x) * 0.035;
    group.current.rotation.y +=
      (target.current.y - group.current.rotation.y) * 0.035;
    // Scroll drift: the field recedes as you leave the hero.
    const scroll = Math.min(window.scrollY / 900, 1);
    group.current.position.z = -scroll * 2.4;
    group.current.rotation.z = Math.sin(clock.elapsedTime * 0.1) * 0.02;
  });

  return <group ref={group}>{children}</group>;
}

/** Renders exactly one frame when the frameloop is "demand". */
function InvalidateOnce() {
  const invalidate = useThree((s) => s.invalidate);
  useEffect(() => {
    invalidate();
  }, [invalidate]);
  return null;
}

export function HeroField() {
  const [reduced, setReduced] = useState(false);
  const [visible, setVisible] = useState(true);
  const wrap = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  // Pause rendering entirely when the hero is off-screen.
  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => setVisible(e.isIntersecting),
      { threshold: 0.02 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={wrap} className="h-full w-full">
      <Canvas
        camera={{ position: [0, 0, 6.2], fov: 42 }}
        dpr={[1, 1.75]}
        frameloop={visible ? (reduced ? "demand" : "always") : "never"}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        style={{ background: "transparent" }}
      >
        <Field reduced={reduced}>
          {reduced && <InvalidateOnce />}
          <Monolith reduced={reduced} />
          {NODES.map((def) => (
            <Node key={def.label} def={def} reduced={reduced} />
          ))}
          <Edges reduced={reduced} />
          <Pulse edge={[0, 1]} speed={0.14} offset={0.0} color={GOLD} reduced={reduced} />
          <Pulse edge={[1, 4]} speed={0.1} offset={0.45} color={EMERALD} reduced={reduced} />
          <Pulse edge={[4, 5]} speed={0.12} offset={0.2} color={SAPPHIRE} reduced={reduced} />
          <Pulse edge={[2, 3]} speed={0.09} offset={0.7} color={IVORY} reduced={reduced} />
          <Pulse edge={[1, 5]} speed={0.08} offset={0.9} color={EMERALD} reduced={reduced} />
          <Pulse edge={[4, 6]} speed={0.11} offset={0.55} color={SAPPHIRE} reduced={reduced} />
        </Field>
      </Canvas>

      {/* DOM labels — crisp text, one per node, projected statically.
          Positioned for the default framing; they drift with parallax
          acceptably at this subtlety. */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        {LABELS.map(({ label, pos }) => (
          <span
            key={label}
            className="absolute font-mono text-[9px] tracking-[0.22em] text-ivory/45"
            style={{
              left: `${50 + (pos[0] / 6.2) * 100 * 0.62}%`,
              top: `${50 - (pos[1] / 6.2) * 100 * 0.62}%`,
              transform: "translate(-50%, -50%)",
            }}
          >
            {label}
          </span>
        ))}
      </div>
    </div>
  );
}
