"use client";

import { useEffect, useState } from "react";
import styles from "./Testimonials.module.css";
import AnimateIn from "@/components/ui/AnimateIn";

const TESTIMONIALS = [
  {
    quote:
      "Locken doesn't just smell expensive, it feels considered. I've had three people stop me on the street to ask what I'm wearing. That has never happened before.",
    name: "Ananya R.",
    meta: "Verified Purchase · Locken",
    initial: "A",
    image: "/images/testimonials/testimonial-1.jpg",
  },
  {
    quote:
      "Vers is the first fragrance I've worn daily without getting tired of it. Soft, warm, never shouting. It genuinely feels like it was made for how I actually want to smell.",
    name: "Meera S.",
    meta: "Verified Purchase · Vers",
    initial: "M",
    image: "/images/testimonials/testimonial-2.jpg",
  },
  {
    quote:
      "The Discovery Set sold me instantly. Ended up buying full bottles of two. The packaging alone feels like a gift, and the 180-day story genuinely comes through on skin.",
    name: "Kavya N.",
    meta: "Verified Purchase · Discovery Set",
    initial: "K",
    image: "/images/testimonials/testimonial-3.jpg",
  },
  {
    quote:
      "Fresca is what I reach for on days I need to feel like myself again. It's fresh without being thin, and it actually lasts. I've already recommended it to half my office.",
    name: "Riya P.",
    meta: "Verified Purchase · Fresca",
    initial: "R",
    image: "/images/testimonials/testimonial-1.jpg",
  },
  {
    quote:
      "I've bought perfume from every brand you can name and Locken is the first one that made a stranger stop me in an elevator. Worth every rupee.",
    name: "Simran K.",
    meta: "Verified Purchase · Locken",
    initial: "S",
    image: "/images/testimonials/testimonial-2.jpg",
  },
  {
    quote:
      "Matured for 180 days and it genuinely shows on skin. Vers has become the one thing people ask me about every single time I wear it.",
    name: "Priya D.",
    meta: "Verified Purchase · Vers",
    initial: "P",
    image: "/images/testimonials/testimonial-3.jpg",
  },
];

// Render many back-to-back copies of the testimonials so the fan always has
// a deep buffer of cards waiting off-screen on both sides. `pointer` only
// ever increases (or decreases for the back arrow) through this long strip
// — it never wraps back to a small range — so a card already on screen is
// never suddenly reused at the opposite edge. Every so often we quietly
// re-center the pointer by a whole number of cycles; that recentring only
// ever touches cards deep off-screen (opacity 0), so nothing visible jumps.
const N = TESTIMONIALS.length;
const COPIES = 9;
const LOOPED = Array.from({ length: N * COPIES }, (_, i) => TESTIMONIALS[i % N]);
const START = N * Math.floor(COPIES / 2);

function Stars() {
  return (
    <div className={styles.stars}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="13" height="13" viewBox="0 0 24 24" fill="#c9a153">
          <path d="M12 2l2.9 6.6L22 9.2l-5 4.9L18.2 21 12 17.4 5.8 21 7 14.1l-5-4.9 7.1-0.6L12 2z" />
        </svg>
      ))}
    </div>
  );
}

export default function Testimonials() {
  const [pointer, setPointer] = useState(START);
  const [instant, setInstant] = useState(false);

  useEffect(() => {
    const id = setInterval(() => step(1), 2000);
    return () => clearInterval(id);
  }, []);

  function step(dir) {
    setPointer((p) => {
      let next = p + dir;
      let wrapped = false;
      if (next >= START + N * 3) {
        next -= N * 3;
        wrapped = true;
      }
      if (next < START - N * 3) {
        next += N * 3;
        wrapped = true;
      }
      if (wrapped) {
        // The strip just got silently re-centered by a full cycle. The
        // content on screen is identical before and after, but the
        // transform values jumped, so skip the transition for this one
        // frame — otherwise every card visibly animates through that
        // jump before settling back, which looks like the carousel
        // "restarting".
        setInstant(true);
        requestAnimationFrame(() => requestAnimationFrame(() => setInstant(false)));
      }
      return next;
    });
  }

  return (
    <section className={styles.section}>
      <AnimateIn className={styles.header}>
        <span className="eyebrow">In Her Words</span>
        <h2 className={styles.title}>Loved, and worn daily</h2>
      </AnimateIn>

      <div className={styles.carousel}>
        <button className={`${styles.arrow} ${styles.arrowLeft}`} onClick={() => step(-1)} aria-label="Previous testimonial">
          <svg width="16" height="12" viewBox="0 0 15 10" fill="none">
            <path d="M15 5H1M1 5L5.5 0.5M1 5L5.5 9.5" stroke="currentColor" strokeWidth="1.3" />
          </svg>
        </button>

        <div className={styles.stage}>
          {LOOPED.map((t, i) => {
            const offset = i - pointer;
            const abs = Math.abs(offset);
            // Mount one extra card just past each edge (abs 3) and keep it
            // invisible. That way, when the pointer advances, that card is
            // already in the DOM and can transition smoothly into the
            // visible fan instead of popping in with no entrance animation.
            if (abs > 3) return null;
            const opacity = abs <= 2 ? 1 : 0;
            return (
              <div
                key={i}
                className={`${styles.card} ${offset === 0 ? styles.cardActive : ""}`}
                style={{
                  backgroundImage: `linear-gradient(0deg, rgba(10,9,7,0.8) 0%, rgba(10,9,7,0.32) 26%, rgba(10,9,7,0) 45%), url(${t.image})`,
                  transform: `translateX(calc(-50% + ${offset * 92}%)) rotateY(${offset * -18}deg) translateZ(${-abs * 220}px)`,
                  opacity,
                  zIndex: offset === 0 ? 3 : 3 - abs,
                  pointerEvents: offset === 0 ? "auto" : "none",
                  transition: instant ? "none" : undefined,
                }}
              >
                <div className={styles.attribution}>
                  <Stars />
                  <p className={styles.quote}>{t.quote}</p>
                  <div className={styles.nameRow}>
                    <span className={styles.name}>{t.name}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <button className={`${styles.arrow} ${styles.arrowRight}`} onClick={() => step(1)} aria-label="Next testimonial">
          <svg width="16" height="12" viewBox="0 0 15 10" fill="none">
            <path d="M0 5H14M14 5L9.5 0.5M14 5L9.5 9.5" stroke="currentColor" strokeWidth="1.3" />
          </svg>
        </button>
      </div>

      <div className={styles.dots}>
        {TESTIMONIALS.map((t, i) => (
          <button
            key={t.name}
            className={`${styles.dot} ${i === ((pointer % N) + N) % N ? styles.dotActive : ""}`}
            onClick={() => setPointer(START + i)}
            aria-label={`Go to testimonial ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
