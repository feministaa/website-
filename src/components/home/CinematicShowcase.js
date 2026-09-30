"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import QuantitySelector from "@/components/ui/QuantitySelector";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/context/ToastContext";
import styles from "./CinematicShowcase.module.css";

gsap.registerPlugin(ScrollTrigger);

// Each product's notes, staged as a full-bleed backdrop. It lives inside the slide layer so it
// slides in and out together with that product's content, cropped to fill the slide. `position` sets
// which part of a non-widescreen image survives the crop (default: centre).
const BACKGROUNDS = {
  locken: { src: "/images/showcase/locken-driftwood-bg.webp" },
  vers: { src: "/images/showcase/vers-stone-bg.webp" },
  fresca: { src: "/images/showcase/fresca-true-bg.webp" },
};

function Slide({ product, layerRef, priority }) {
  const [qty, setQty] = useState(1);
  const { addToCart } = useCart();
  const { showToast } = useToast();
  // Each fragrance is sold as a single variant; use it without showing a size or price on the banner.
  const size = product.sizes?.[product.sizes.length - 1];
  const topNotes = product.notes?.top || [];

  const backdrop = BACKGROUNDS[product.slug];

  function handleAdd() {
    if (!size) return;
    addToCart(product, size, qty);
    showToast(`${product.name} added to your bag`);
  }

  return (
    <div className={styles.layer} ref={layerRef}>
      {backdrop && (
        <div className={styles.backdrop}>
          <Image
            src={backdrop.src}
            alt=""
            fill
            sizes="100vw"
            priority={priority}
            className={styles.backdropImg}
            style={backdrop.position ? { objectPosition: backdrop.position } : undefined}
          />
        </div>
      )}

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

      {product.comingSoon && (
        <div className={styles.priceRow}>
          <span className={styles.priceText}>Coming Soon</span>
        </div>
      )}

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

  useGSAP(
    () => {
      if (products.length < 1) return;

      const layers = layerRefs.current;

      // `x: 0` explicitly: GSAP otherwise reads a leftover inline translate as a pixel offset and adds it
      // on top of xPercent, pushing the waiting slides a full screen further right (a gap mid-transition).
      gsap.set(layers, { x: 0, xPercent: 100 });
      gsap.set(layers[0], { xPercent: 0 });

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
              // Outgoing slide exits left while the next enters from the right, edge to edge, so the
              // three backdrops read as one continuous strip.
              tl.to(layers[i], { xPercent: -100, duration: SLIDE, ease: "sine.inOut" }, cursor + HOLD);
              tl.fromTo(layers[i + 1], { x: 0, xPercent: 100 }, { x: 0, xPercent: 0, duration: SLIDE, ease: "sine.inOut" }, cursor + HOLD);
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
    <section className={styles.pinWrap} ref={pinWrapRef} data-hide-header>
      <div className={styles.stage}>
        {products.map((product, i) => (
          <Slide
            key={product.id}
            product={product}
            priority={i === 0}
            layerRef={(el) => (layerRefs.current[i] = el)}
          />
        ))}
      </div>
    </section>
  );
}
