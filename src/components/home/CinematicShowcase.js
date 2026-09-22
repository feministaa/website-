"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import QuantitySelector from "@/components/ui/QuantitySelector";
import { formatINR } from "@/lib/format";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/context/ToastContext";
import styles from "./CinematicShowcase.module.css";

gsap.registerPlugin(ScrollTrigger);

// All three products currently show the same placeholder Spline scene, so it's loaded once as a
// shared background instead of once per slide (that was loading the same heavy scene 3x at
// once — real load-time cost for identical content). Once each product has its own real scene,
// this can go back to being per-slide so the bottle itself slides with the product transition.
const SPLINE_SCENE = "https://my.spline.design/3dbottlehomeanimation-6ZopeHu37nbQfXKcnQfbjd6v/";

function Slide({ product, layerRef }) {
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
  const layerRefs = useRef([]);
  layerRefs.current = [];
  // The Spline embed is a cross-origin iframe — while it has pointer events, it swallows
  // scroll-wheel input entirely (our page can never get it back). Keep it inert by default so
  // scroll always works, even with the cursor over the bottle, and only "activate" it (for
  // cursor-driven rotation) once the visitor deliberately clicks in. Leaving deactivates again.
  const [bottleActive, setBottleActive] = useState(false);

  useGSAP(
    () => {
      if (products.length < 1) return;

      const layers = layerRefs.current;

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
              // Outgoing content exits left, incoming content enters from the right — same beat, one continuous move.
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

      return () => mm.revert();
    },
    { scope: pinWrapRef, dependencies: [products] }
  );

  return (
    <section className={styles.pinWrap} ref={pinWrapRef}>
      <div className={styles.stage}>
        <div
          className={styles.sharedBottle}
          onClick={() => setBottleActive(true)}
          onMouseLeave={() => setBottleActive(false)}
        >
          <iframe
            src={SPLINE_SCENE}
            title="Interactive Feminista bottle"
            className={styles.bottle3d}
            style={{ pointerEvents: bottleActive ? "auto" : "none" }}
            loading="lazy"
            frameBorder="0"
          />
          {!bottleActive && <span className={styles.bottleHint}>Click to interact</span>}
        </div>
        {products.map((product, i) => (
          <Slide key={product.id} product={product} layerRef={(el) => (layerRefs.current[i] = el)} />
        ))}
      </div>
    </section>
  );
}
