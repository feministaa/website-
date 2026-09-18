"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import styles from "./SignatureCollection.module.css";
import QuantitySelector from "@/components/ui/QuantitySelector";
import { formatINR } from "@/lib/format";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/context/ToastContext";

gsap.registerPlugin(ScrollTrigger);

const LOCKEN_TURNTABLE = { frameCount: 240, path: (i) => `/turntable/locken/frame-${String(i).padStart(4, "0")}.jpg` };

// Vers and Fresca reuse the Locken frames as a placeholder until their own turntable shoots are ready.
const TURNTABLE = {
  locken: LOCKEN_TURNTABLE,
  vers: LOCKEN_TURNTABLE,
  fresca: LOCKEN_TURNTABLE,
};

function drawContainFrame(ctx, img, canvas) {
  const cw = canvas.width;
  const ch = canvas.height;
  const iw = img.naturalWidth;
  const ih = img.naturalHeight;
  if (!cw || !ch || !iw || !ih) return;
  const scale = Math.min(cw / iw, ch / ih);
  const dw = iw * scale;
  const dh = ih * scale;
  const dx = (cw - dw) / 2;
  const dy = (ch - dh) / 2;
  ctx.clearRect(0, 0, cw, ch);
  ctx.drawImage(img, 0, 0, iw, ih, dx, dy, dw, dh);
}

function Slide({ product, slideRef, innerRef, canvasSetRef, framesSetRef }) {
  const [qty, setQty] = useState(1);
  const { addToCart } = useCart();
  const { showToast } = useToast();
  const size = product.sizes?.[product.sizes.length - 1];
  const turntable = TURNTABLE[product.slug];
  const wrapRef = useRef(null);
  const localCanvasRef = useRef(null);
  const localFramesRef = useRef([]);

  useEffect(() => {
    if (!turntable) return;
    let cancelled = false;
    const frames = new Array(turntable.frameCount);
    localFramesRef.current = frames;
    if (framesSetRef) framesSetRef(frames);

    function sizeCanvas() {
      const canvas = localCanvasRef.current;
      const wrap = wrapRef.current;
      if (!canvas || !wrap) return;
      const rect = wrap.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.max(1, Math.round(rect.width * dpr));
      canvas.height = Math.max(1, Math.round(rect.height * dpr));
    }

    function drawFirstAvailable() {
      const canvas = localCanvasRef.current;
      if (!canvas || !frames[0]) return;
      sizeCanvas();
      const ctx = canvas.getContext("2d");
      drawContainFrame(ctx, frames[0], canvas);
    }

    function loadFrame(i) {
      const img = new window.Image();
      img.src = turntable.path(i + 1);
      img.onload = () => {
        if (cancelled) return;
        frames[i] = img;
        if (i === 0) drawFirstAvailable();
      };
    }
    for (let i = 0; i < turntable.frameCount; i++) loadFrame(i);

    sizeCanvas();
    window.addEventListener("resize", () => {
      sizeCanvas();
      drawFirstAvailable();
    });

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleAdd(e) {
    e.preventDefault();
    e.stopPropagation();
    if (!size) return;
    addToCart(product, size, qty);
    showToast(`${product.name} (${size.label}) added to your bag`);
  }

  return (
    <div className={styles.slide} ref={slideRef}>
      <div className={styles.slideInner} ref={innerRef}>
        <Link href={`/fragrances/${product.slug}`} className={styles.slideLink}>
          {turntable ? (
            <div className={styles.turntableWrap} ref={wrapRef}>
              <canvas
                ref={(el) => {
                  localCanvasRef.current = el;
                  if (canvasSetRef) canvasSetRef(el);
                }}
                className={styles.turntableCanvas}
              />
            </div>
          ) : (
            <Image src={product.cardImage || product.images?.[0]} alt={product.name} fill priority className={styles.slideImage} />
          )}
          <div className={styles.scrim} />
        </Link>

        <div className={styles.slideCopy}>
          <span className={styles.slideTagline}>{product.tagline}</span>
          <h2 className={styles.slideName}>{product.name}</h2>
        </div>

        {product.comingSoon || !size ? (
          <Link href={`/fragrances/${product.slug}`} className={styles.comingSoonPill}>
            Coming Soon
          </Link>
        ) : (
          <div className={styles.shopCard}>
            <div className={styles.shopPrice}>
              {product.compareAtPrice && <span className={styles.shopCompareAt}>{formatINR(product.compareAtPrice)}</span>}
              <span>{formatINR(size.price)}</span>
            </div>
            <span className={styles.shopDivider} />
            <div className={styles.shopQty}>
              <QuantitySelector value={qty} onChange={setQty} variant="minimal" />
            </div>
            <span className={styles.shopDivider} />
            <button className={styles.shopAddBtn} onClick={handleAdd}>
              Add to Cart
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function SignatureCollection({ products }) {
  const pinWrapRef = useRef(null);
  const trackRef = useRef(null);
  const slideRefs = useRef([]);
  const innerRefs = useRef([]);
  const canvasRefs = useRef([]);
  const framesRefs = useRef([]);
  slideRefs.current = [];
  innerRefs.current = [];

  useGSAP(
    () => {
      const track = trackRef.current;
      const pinWrap = pinWrapRef.current;
      if (!track || !pinWrap || products.length < 2) return;

      const mm = gsap.matchMedia();

      mm.add("(min-width: 761px)", () => {
        const slideWidth = window.innerWidth;
        const HOLD_DISTANCE = slideWidth * 2.2;

        // Build an ordered list of scroll segments: a "hold" segment for every turntable
        // slide (track stays put while its frames scrub through) and a "move" segment
        // between consecutive slides (normal horizontal transition).
        const segments = [];
        let cursor = 0;
        products.forEach((product, i) => {
          if (TURNTABLE[product?.slug]) {
            segments.push({ type: "hold", slideIndex: i, start: cursor, end: cursor + HOLD_DISTANCE, x: -i * slideWidth });
            cursor += HOLD_DISTANCE;
          }
          if (i < products.length - 1) {
            segments.push({ type: "move", start: cursor, end: cursor + slideWidth, toX: -(i + 1) * slideWidth });
            cursor += slideWidth;
          }
        });
        const totalDistance = cursor;

        function drawTurntableFrame(slideIndex, progress) {
          const frames = framesRefs.current[slideIndex];
          const canvas = canvasRefs.current[slideIndex];
          if (!frames || !canvas) return;
          const idx = Math.min(frames.length - 1, Math.max(0, Math.round(progress * (frames.length - 1))));
          const img = frames[idx];
          if (!img || !img.complete) return;
          const ctx = canvas.getContext("2d");
          drawContainFrame(ctx, img, canvas);
        }

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: pinWrap,
            start: "top top",
            end: () => "+=" + totalDistance,
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              const posDistance = self.progress * totalDistance;
              const active = segments.find((s) => s.type === "hold" && posDistance >= s.start && posDistance <= s.end);
              if (active) {
                const localP = (posDistance - active.start) / (active.end - active.start);
                drawTurntableFrame(active.slideIndex, Math.min(1, Math.max(0, localP)));
              }
            },
          },
        });

        segments.forEach((seg) => {
          if (seg.type === "hold") {
            tl.to(track, { x: seg.x, duration: HOLD_DISTANCE, ease: "none" });
          } else {
            tl.to(track, { x: seg.toX, duration: slideWidth, ease: "none" });
          }
        });

        slideRefs.current.forEach((slide, i) => {
          const inner = innerRefs.current[i];
          if (!slide || !inner) return;

          gsap.fromTo(
            inner,
            { rotateY: 18, scale: 0.92 },
            {
              rotateY: -18,
              scale: 0.92,
              ease: "none",
              scrollTrigger: {
                containerAnimation: tl,
                trigger: slide,
                start: "left right",
                end: "right left",
                scrub: true,
              },
              keyframes: {
                "0%": { rotateY: 18, scale: 0.92 },
                "50%": { rotateY: 0, scale: 1 },
                "100%": { rotateY: -18, scale: 0.92 },
              },
            }
          );
        });

        return () => tl.scrollTrigger?.kill();
      });

      return () => mm.revert();
    },
    { scope: pinWrapRef, dependencies: [products] }
  );

  return (
    <section className={styles.pinWrap} ref={pinWrapRef}>
      <div className={styles.track} ref={trackRef}>
        {products.map((product, i) => (
          <Slide
            key={product.id}
            product={product}
            slideRef={(el) => (slideRefs.current[i] = el)}
            innerRef={(el) => (innerRefs.current[i] = el)}
            canvasSetRef={(el) => (canvasRefs.current[i] = el)}
            framesSetRef={(frames) => (framesRefs.current[i] = frames)}
          />
        ))}
      </div>
    </section>
  );
}
