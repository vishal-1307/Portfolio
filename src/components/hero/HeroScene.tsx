"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { mergeVertices } from "three/examples/jsm/utils/BufferGeometryUtils.js";

/**
 * ───────────────────────────────────────────────────────────────────────────
 *  SIGNAL LATTICE
 * ───────────────────────────────────────────────────────────────────────────
 *  An icosahedral node lattice that breathes. Nodes and edges share one vertex
 *  shader, so displacement is a pure function of position and the two meshes
 *  stay welded together — two draw calls, no lights, no post-processing.
 *
 *  Budget discipline:
 *   - geometry is built once and memoised (642 nodes / ~1,900 edges)
 *   - dpr capped at 1.5
 *   - the whole loop is switched off when the hero scrolls away or the tab
 *     is hidden, via the `frameloop` prop
 */

const PAPER = new THREE.Color("#f2efe8");
const ACCENT = new THREE.Color("#e5123b");

const vertexShader = /* glsl */ `
  uniform float uTime;
  uniform float uAmp;
  uniform float uSize;
  varying float vPulse;

  // Cheap standing-wave field. Not real noise, but deterministic per position,
  // which is exactly what keeps the edges attached to the nodes.
  float wave(vec3 p, float t) {
    return sin(p.x * 2.7 + t) * sin(p.y * 2.3 + t * 0.9) * sin(p.z * 3.1 + t * 1.1);
  }

  void main() {
    vec3 dir = normalize(position);
    float w = wave(position, uTime);
    vec3 displaced = position + dir * w * uAmp;

    vPulse = w * 0.5 + 0.5;

    vec4 mvPosition = modelViewMatrix * vec4(displaced, 1.0);
    gl_PointSize = uSize * (1.0 / max(-mvPosition.z, 0.001));
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const pointsFragmentShader = /* glsl */ `
  uniform vec3 uBase;
  uniform vec3 uAccent;
  varying float vPulse;

  void main() {
    // Round the square point sprite into a soft dot.
    vec2 uv = gl_PointCoord - 0.5;
    float d = length(uv);
    if (d > 0.5) discard;
    float alpha = smoothstep(0.5, 0.18, d);

    // Only the crest of the wave lights up red — a handful of nodes at a time.
    float hot = smoothstep(0.78, 1.0, vPulse);
    vec3 color = mix(uBase, uAccent, hot);

    gl_FragColor = vec4(color, alpha * (0.35 + 0.65 * vPulse));
  }
`;

const linesFragmentShader = /* glsl */ `
  uniform vec3 uBase;
  uniform vec3 uAccent;
  varying float vPulse;

  void main() {
    float hot = smoothstep(0.82, 1.0, vPulse);
    vec3 color = mix(uBase, uAccent, hot);
    gl_FragColor = vec4(color, 0.06 + 0.16 * vPulse);
  }
`;

function Lattice({ pointer }: { pointer: React.RefObject<{ x: number; y: number }> }) {
  const group = useRef<THREE.Group>(null);

  const { nodeGeometry, edgeGeometry } = useMemo(() => {
    const base = new THREE.IcosahedronGeometry(1.75, 3);
    // Weld duplicate vertices so 642 real nodes render instead of 3,840 copies.
    const welded = mergeVertices(base);
    base.dispose();
    const wire = new THREE.WireframeGeometry(welded);
    return { nodeGeometry: welded, edgeGeometry: wire };
  }, []);

  // One uniforms object, shared by both materials — so advancing time once
  // moves the nodes and the edges together. It is written through the material
  // ref inside the frame loop, which keeps the animation off React's render
  // path entirely: no state updates, no reconciliation.
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uAmp: { value: 0.16 },
      uSize: { value: 26 },
      uBase: { value: PAPER },
      uAccent: { value: ACCENT },
    }),
    [],
  );
  const material = useRef<THREE.ShaderMaterial>(null);

  useEffect(() => {
    return () => {
      nodeGeometry.dispose();
      edgeGeometry.dispose();
    };
  }, [nodeGeometry, edgeGeometry]);

  useFrame((state, delta) => {
    const dt = Math.min(delta, 0.05); // clamp so a stalled tab cannot jump the animation

    // three.js types uniforms as an index signature, hence the guard.
    const time = material.current?.uniforms.uTime;
    if (time) time.value += dt * 0.55;

    const g = group.current;
    if (!g) return;

    g.rotation.y += dt * 0.12;

    // Ease toward the pointer rather than snapping — ±7° of parallax.
    const target = pointer.current ?? { x: 0, y: 0 };
    const targetX = target.y * 0.12;
    const targetZ = target.x * 0.06;
    g.rotation.x += (targetX - g.rotation.x) * Math.min(1, dt * 2.5);
    g.rotation.z += (targetZ - g.rotation.z) * Math.min(1, dt * 2.5);

    // A slow drift on the whole body so it never reads as a locked-off render.
    g.position.y = Math.sin(state.clock.elapsedTime * 0.35) * 0.06;
  });

  return (
    <group ref={group}>
      <points geometry={nodeGeometry}>
        <shaderMaterial
          ref={material}
          vertexShader={vertexShader}
          fragmentShader={pointsFragmentShader}
          uniforms={uniforms}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>

      <lineSegments geometry={edgeGeometry}>
        <shaderMaterial
          vertexShader={vertexShader}
          fragmentShader={linesFragmentShader}
          uniforms={uniforms}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </lineSegments>
    </group>
  );
}

export default function HeroScene() {
  const hostRef = useRef<HTMLDivElement>(null);
  const pointer = useRef({ x: 0, y: 0 });
  const [running, setRunning] = useState(true);

  // Stop rendering entirely when the hero leaves the viewport or the tab is
  // backgrounded. This is the difference between a decorative canvas and a
  // battery drain.
  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    let onScreen = true;
    const sync = () => setRunning(onScreen && document.visibilityState === "visible");

    const observer = new IntersectionObserver(
      ([entry]) => {
        onScreen = entry?.isIntersecting ?? false;
        sync();
      },
      { threshold: 0 },
    );
    observer.observe(host);

    document.addEventListener("visibilitychange", sync);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", sync);
    };
  }, []);

  // Pointer parallax is read from the window so it responds to movement across
  // the whole hero band, not just over the canvas.
  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      pointer.current = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: (e.clientY / window.innerHeight) * 2 - 1,
      };
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  return (
    <div ref={hostRef} aria-hidden="true" className="absolute inset-0">
      <Canvas
        frameloop={running ? "always" : "never"}
        dpr={[1, 1.5]}
        gl={{
          antialias: false,
          alpha: true,
          powerPreference: "low-power",
        }}
        camera={{ position: [0, 0, 4.6], fov: 45 }}
      >
        <Lattice pointer={pointer} />
      </Canvas>
    </div>
  );
}
