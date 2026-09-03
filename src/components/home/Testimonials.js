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
      "I've bought perfume from every brand you can name and Locken is the first one that made a stranger stop me in an elevator. Worth every rupee, and the bottle looks incredible on my dresser.",
    name: "Simran K.",
    meta: "Verified Purchase · Locken",
    initial: "S",
    image: "/images/testimonials/testimonial-2.jpg",
  },
];

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
  const [active, setActive] = useState(0);
  const n = TESTIMONIALS.length;

  useEffect(() => {
    const id = setInterval(() => {
      setActive((a) => (a + 1) % n);
    }, 2000);
    return () => clearInterval(id);
  }, [n]);

  function offsetOf(i) {
    const raw = i - active;
    if (raw > n / 2) return raw - n;
    if (raw < -n / 2) return raw + n;
    return raw;
  }

  function go(dir) {
    setActive((a) => (a + dir + n) % n);
  }

  return (
    <section className={styles.section}>
      <AnimateIn className={styles.header}>
        <span className="eyebrow">In Her Words</span>
        <h2 className={styles.title}>Loved, and worn daily</h2>
      </AnimateIn>

      <div className={styles.carousel}>
        <button className={`${styles.arrow} ${styles.arrowLeft}`} onClick={() => go(-1)} aria-label="Previous testimonial">
          <svg width="16" height="12" viewBox="0 0 15 10" fill="none">
            <path d="M15 5H1M1 5L5.5 0.5M1 5L5.5 9.5" stroke="currentColor" strokeWidth="1.3" />
          </svg>
        </button>

        <div className={styles.stage}>
          {TESTIMONIALS.map((t, i) => {
            const offset = offsetOf(i);
            const abs = Math.abs(offset);
            const visible = abs <= 2;
            const scale = offset === 0 ? 1 : abs === 1 ? 0.87 : 0.74;
            const opacity = visible ? 1 : 0;
            return (
              <div
                key={t.name}
                className={`${styles.card} ${offset === 0 ? styles.cardActive : ""}`}
                style={{
                  backgroundImage: `linear-gradient(0deg, rgba(10,9,7,0.86) 0%, rgba(10,9,7,0.35) 42%, rgba(10,9,7,0.08) 62%), url(${t.image})`,
                  transform: `translateX(calc(-50% + ${offset * 60}%)) scale(${scale}) rotate(${offset * 2.5}deg)`,
                  opacity,
                  zIndex: offset === 0 ? 3 : 3 - abs,
                  pointerEvents: offset === 0 ? "auto" : "none",
                }}
              >
                <Stars />
                <p className={styles.quote}>{t.quote}</p>
                <div className={styles.attribution}>
                  <div className={styles.name}>{t.name}</div>
                  <div className={styles.meta}>{t.meta}</div>
                </div>
              </div>
            );
          })}
        </div>

        <button className={`${styles.arrow} ${styles.arrowRight}`} onClick={() => go(1)} aria-label="Next testimonial">
          <svg width="16" height="12" viewBox="0 0 15 10" fill="none">
            <path d="M0 5H14M14 5L9.5 0.5M14 5L9.5 9.5" stroke="currentColor" strokeWidth="1.3" />
          </svg>
        </button>
      </div>

      <div className={styles.dots}>
        {TESTIMONIALS.map((t, i) => (
          <button
            key={t.name}
            className={`${styles.dot} ${i === active ? styles.dotActive : ""}`}
            onClick={() => setActive(i)}
            aria-label={`Go to testimonial ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
