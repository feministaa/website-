"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Bottle3D from "@/components/three/Bottle3D";
import QuantitySelector from "@/components/ui/QuantitySelector";
import { formatINR } from "@/lib/format";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/context/ToastContext";
import styles from "./CinematicShowcase.module.css";

gsap.registerPlugin(ScrollTrigger);

// Products with a real 3D model reuse Bottle3D (cursor-driven rotation) instead of the flat photo.
// Vers and Fresca reuse the Locken model as a placeholder until their own scans are ready.
const LOCKEN_MODEL = "/models/locken-bottle-v2.glb";
const MODELS = {
  locken: LOCKEN_MODEL,
  vers: LOCKEN_MODEL,
  fresca: LOCKEN_MODEL,
};

function Slide({ product, layerRef, bottleRef, pointerRef }) {
  const [qty, setQty] = useState(1);
  const { addToCart } = useCart();
  const { showToast } = useToast();
  const size = product.sizes?.[product.sizes.length - 1];
  const topNotes = product.notes?.top || [];

  function handleAdd() {
    if (!size) return;
    addToCart(product, size, qty);
    showToast(`${product.name} (${size.label}) added to your bag`);
  }

  return (
    <div className={styles.layer} ref={layerRef}>
      <div className={styles.heading}>
        <span className={styles.eyebrow}>{product.tagline}</span>
        <h2 className={styles.name}>{product.name}</h2>
      </div>

      <div className={styles.description}>
        {product.shortDescription && <p className={styles.sideText}>{product.shortDescription}</p>}
        <Link href={`/fragrances/${product.slug}`} className={styles.discoverLink}>
          Discover →
        </Link>
      </div>

      {topNotes.length > 0 && (
        <div className={styles.notesPanel}>
          <span className={styles.sideLabel}>Top Notes</span>
          <ul className={styles.notesList}>
            {topNotes.map((note) => (
              <li key={note}>{note}</li>
            ))}
          </ul>
        </div>
      )}

      <div className={styles.bottleStage}>
        <div className={styles.bottleWrap} ref={bottleRef}>
          {MODELS[product.slug] ? (
            <Bottle3D url={MODELS[product.slug]} className={styles.bottle3d} pointer={pointerRef} />
          ) : (
            <Image
              src={product.cardImage || product.images?.[0]}
              alt={product.name}
              fill
              className={styles.bottle}
              sizes="(max-width: 760px) 60vw, 320px"
              priority
            />
          )}
        </div>
      </div>

      <div className={styles.priceRow}>
        {product.comingSoon || !size ? (
          <span className={styles.priceText}>Coming Soon</span>
        ) : (
          <span className={styles.priceText}>
            {product.compareAtPrice && <span className={styles.priceCompareAt}>{formatINR(product.compareAtPrice)}</span>}
            {formatINR(size.price)}
          </span>
        )}
      </div>

      {!product.comingSoon && size && (
        <div className={styles.buyWrap}>
          <div className={styles.shopQty}>
            <QuantitySelector value={qty} onChange={setQty} variant="minimal" />
          </div>
          <button className={styles.shopAddBtn} onClick={handleAdd}>
            Add to Cart
          </button>
        </div>
      )}
    </div>
  );
}

export default function CinematicShowcase({ products }) {
  const pinWrapRef = useRef(null);
  const stageRef = useRef(null);
  const layerRefs = useRef([]);
  const bottleRefs = useRef([]);
  const pointerRef = useRef({ x: 0, y: 0 });
  layerRefs.current = [];
  bottleRefs.current = [];

  useGSAP(
    () => {
      const stage = stageRef.current;
      if (!stage || products.length < 1) return;

      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const layers = layerRefs.current;
      const bottles = bottleRefs.current;

      gsap.set(layers, { xPercent: 100, opacity: 0 });
      gsap.set(layers[0], { xPercent: 0, opacity: 1 });

      let scrollTween;
      const mm = gsap.matchMedia();

      mm.add("(min-width: 761px)", () => {
        if (products.length > 1) {
          const HOLD = 0.55;
          const SLIDE = 0.45;
          const tl = gsap.timeline();
          let cursor = 0;
          products.forEach((_, i) => {
            if (i < products.length - 1) {
              // Outgoing bottle exits left, incoming bottle enters from the right — same beat, one continuous move.
              tl.to(layers[i], { xPercent: -100, opacity: 0, duration: SLIDE, ease: "sine.inOut" }, cursor + HOLD);
              tl.fromTo(
                layers[i + 1],
                { xPercent: 100, opacity: 0 },
                { xPercent: 0, opacity: 1, duration: SLIDE, ease: "sine.inOut" },
                cursor + HOLD
              );
              cursor += HOLD + SLIDE;
            }
          });

          // More scroll distance per transition + a longer scrub lag — slower, smoother slide instead of a snap.
          const PIXELS_PER_TRANSITION = 1100;

          scrollTween = ScrollTrigger.create({
            trigger: pinWrapRef.current,
            start: "top top",
            end: () => "+=" + (products.length - 1) * PIXELS_PER_TRANSITION,
            pin: true,
            scrub: 1.4,
            invalidateOnRefresh: true,
            animation: tl,
          });
        }

        return () => scrollTween?.kill();
      });

      if (!reduceMotion) {
        bottles.forEach((bottle, i) => {
          if (!bottle) return;
          gsap.to(bottle, {
            y: -14,
            duration: 3.2 + i * 0.4,
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true,
          });
        });

        // 3D slides rotate themselves toward the cursor inside the canvas — skip the CSS tilt for those.
        const quickSetters = bottles.map((bottle, i) =>
          bottle && !MODELS[products[i]?.slug]
            ? {
                x: gsap.quickTo(bottle, "rotateY", { duration: 0.7, ease: "power3.out" }),
                y: gsap.quickTo(bottle, "rotateX", { duration: 0.7, ease: "power3.out" }),
              }
            : null
        );

        function handlePointerMove(e) {
          const rect = stage.getBoundingClientRect();
          const px = (e.clientX - rect.left) / rect.width - 0.5;
          const py = (e.clientY - rect.top) / rect.height - 0.5;
          pointerRef.current.x = px * 2;
          pointerRef.current.y = py * -2;
          quickSetters.forEach((setter) => {
            if (!setter) return;
            setter.x(px * 22);
            setter.y(py * -16);
          });
        }

        stage.addEventListener("pointermove", handlePointerMove);
        return () => {
          stage.removeEventListener("pointermove", handlePointerMove);
          mm.revert();
        };
      }

      return () => mm.revert();
    },
    { scope: pinWrapRef, dependencies: [products] }
  );

  return (
    <section className={styles.pinWrap} ref={pinWrapRef}>
      <div className={styles.stage} ref={stageRef}>
        {products.map((product, i) => (
          <Slide
            key={product.id}
            product={product}
            layerRef={(el) => (layerRefs.current[i] = el)}
            bottleRef={(el) => (bottleRefs.current[i] = el)}
            pointerRef={pointerRef}
          />
        ))}
      </div>
    </section>
  );
}
