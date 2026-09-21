"use client";

import { Suspense, useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, Center, Bounds, Environment } from "@react-three/drei";

// Blender scenes often ship with studio floor/backdrop planes used only for
// render setup — strip anything named like that so the auto-fit camera frames
// just the bottle instead of zooming out to include a giant flat plane.
function stripStudioProps(scene) {
  const clone = scene.clone(true);
  const toRemove = [];
  clone.traverse((obj) => {
    if (/studio/i.test(obj.name)) toRemove.push(obj);
  });
  toRemove.forEach((obj) => obj.parent?.remove(obj));
  return clone;
}

function Model({ url, pointer, reduceMotion }) {
  const group = useRef(null);
  const { scene } = useGLTF(url);
  const cleanedScene = useMemo(() => stripStudioProps(scene), [scene]);

  useFrame((_, delta) => {
    if (!group.current || reduceMotion) return;
    // Amplify small cursor movements (sqrt curve) so you don't have to sweep the whole
    // screen to see the bottle's sides — a short move near center still swings it a lot.
    const amplify = (v) => Math.sign(v) * Math.sqrt(Math.min(1, Math.abs(v)));
    const targetY = amplify(pointer.current.x) * 2.6;
    const targetX = amplify(pointer.current.y) * -0.4;
    // Frame-rate independent smoothing (exponential decay, ~0.3s time constant) — same gentle feel regardless of refresh rate.
    const smoothing = 1 - Math.exp(-delta / 0.3);
    group.current.rotation.y += (targetY - group.current.rotation.y) * smoothing;
    group.current.rotation.x += (targetX - group.current.rotation.x) * smoothing;
  });

  return (
    <Bounds fit clip observe margin={4.6}>
      <Center>
        <group ref={group}>
          <primitive object={cleanedScene} />
        </group>
      </Center>
    </Bounds>
  );
}

export default function Bottle3D({ url, className, pointer: externalPointer }) {
  const localPointer = useRef({ x: 0, y: 0 });
  const pointer = externalPointer || localPointer;
  const reduceMotion =
    typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function handlePointerMove(e) {
    if (externalPointer) return;
    const rect = e.currentTarget.getBoundingClientRect();
    pointer.current.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    pointer.current.y = ((e.clientY - rect.top) / rect.height) * 2 - 1;
  }

  useEffect(() => {
    // R3F sizes the canvas off a ResizeObserver on this wrapper. When it mounts off-screen
    // (translated out via xPercent for the slide-in), some browsers report a stale/empty
    // measurement that never gets corrected. A nudged resize event forces react-use-measure's
    // window-resize fallback to re-measure once real layout has settled.
    const id = setTimeout(() => window.dispatchEvent(new Event("resize")), 60);
    return () => clearTimeout(id);
  }, []);

  return (
    <div className={className} onPointerMove={externalPointer ? undefined : handlePointerMove}>
      <Canvas
        camera={{ position: [0, 0, 3.4], fov: 32 }}
        dpr={[1, 2]}
        gl={{ alpha: true, antialias: true }}
        onCreated={({ gl }) => {
          // Let the browser auto-restore the context instead of leaving the canvas permanently blank
          // (transient GPU resets, backgrounded mobile tabs, or too many WebGL contexts on the page).
          gl.domElement.addEventListener("webglcontextlost", (e) => e.preventDefault());
        }}
      >
        {/* This background is now the section's actual full-bleed backdrop (not just behind the
            bottle) — the glass also needs something real here to refract, so removing it would
            both bring back a mismatched box AND wash the glass out to white. */}
        <color attach="background" args={["#0d0b0a"]} />
        <ambientLight intensity={0.7} />
        <directionalLight position={[3, 4, 5]} intensity={1.6} />
        <directionalLight position={[-4, -1, -3]} intensity={0.5} />
        <Suspense fallback={null}>
          <Model url={url} pointer={pointer} reduceMotion={reduceMotion} />
          <Environment preset="apartment" environmentIntensity={0.6} />
        </Suspense>
      </Canvas>
    </div>
  );
}
