"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import styles from "./PhaseCarousel.module.css";

const AUTOPLAY_MS = 6500;

// The five phases as full-screen banners that crossfade. Advances on its own (paused on hover and for
// reduced motion); the tab bar, arrows, keyboard and swipe all change phase directly.
export default function PhaseCarousel({ phases }) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [autoplay, setAutoplay] = useState(false);
  const touchX = useRef(null);
  const count = phases.length;

  const go = (i) => setActive((i + count) % count);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setAutoplay(!reduce.matches);
    update();
    reduce.addEventListener("change", update);
    return () => reduce.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!autoplay || paused) return;
    const id = setTimeout(() => setActive((i) => (i + 1) % count), AUTOPLAY_MS);
    return () => clearTimeout(id);
  }, [autoplay, paused, active, count]);

  return (
    <section
      className={styles.carousel}
      aria-roledescription="carousel"
      aria-label="The five phases of the Art of 180"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") go(active + 1);
        if (e.key === "ArrowLeft") go(active - 1);
      }}
      onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touchX.current == null) return;
        const dx = e.changedTouches[0].clientX - touchX.current;
        if (Math.abs(dx) > 50) go(active + (dx < 0 ? 1 : -1));
        touchX.current = null;
      }}
      style={{ "--autoplay": `${AUTOPLAY_MS}ms` }}
    >
      {phases.map((p, i) => (
        <div
          key={p.title}
          className={`${styles.slide} ${i === active ? styles.slideActive : ""}`}
          role="group"
          aria-roledescription="slide"
          aria-label={`${i + 1} of ${count}: ${p.title}`}
          aria-hidden={i !== active}
        >
          <Image src={p.image} alt={p.alt} fill className={styles.img} sizes="100vw" />
          <div className={styles.shade} />
          <div className={styles.copy}>
            <span className={styles.label}>
              Phase {String(i + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
            </span>
            <h2 className={styles.title}>{p.title}</h2>
            {p.highlight && <p className={styles.highlight}>{p.highlight}</p>}
            <p className={styles.body}>{p.body}</p>
          </div>
        </div>
      ))}

      <div className={styles.arrows}>
        <button type="button" className={styles.arrow} onClick={() => go(active - 1)} aria-label="Previous phase">
          <svg width="18" height="12" viewBox="0 0 18 12" fill="none" aria-hidden="true">
            <path d="M17 6H1M1 6L6 1M1 6L6 11" stroke="currentColor" strokeWidth="1.2" />
          </svg>
        </button>
        <button type="button" className={styles.arrow} onClick={() => go(active + 1)} aria-label="Next phase">
          <svg width="18" height="12" viewBox="0 0 18 12" fill="none" aria-hidden="true">
            <path d="M1 6H17M17 6L12 1M17 6L12 11" stroke="currentColor" strokeWidth="1.2" />
          </svg>
        </button>
      </div>

      <ol className={styles.tabs}>
        {phases.map((p, i) => (
          <li key={p.title}>
            <button
              type="button"
              className={`${styles.tab} ${i === active ? styles.tabActive : ""}`}
              onClick={() => go(i)}
              aria-current={i === active ? "step" : undefined}
            >
              <span className={styles.tabNum}>{String(i + 1).padStart(2, "0")}</span>
              <span className={styles.tabName}>{p.title}</span>
              <span className={styles.track} aria-hidden="true">
                {i === active && autoplay && (
                  <span key={`p-${active}`} className={`${styles.fill} ${paused ? styles.fillPaused : ""}`} />
                )}
                {i === active && !autoplay && <span className={styles.fillStatic} />}
              </span>
            </button>
          </li>
        ))}
      </ol>
    </section>
  );
}
