"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import styles from "./PhilosophyPillars.module.css";

const NUMERALS = ["I", "II", "III"];
const AUTOPLAY_MS = 6000;

// Three pillars as large words; hovering, focusing or tapping one brings up its photo and text.
// Left alone, it advances on its own (paused while the visitor is interacting, off for reduced motion).
export default function PhilosophyPillars({ pillars }) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [autoplay, setAutoplay] = useState(false);
  const current = pillars[active];

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setAutoplay(!reduce.matches);
    update();
    reduce.addEventListener("change", update);
    return () => reduce.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!autoplay || paused) return;
    const id = setTimeout(() => setActive((i) => (i + 1) % pillars.length), AUTOPLAY_MS);
    return () => clearTimeout(id);
  }, [autoplay, paused, active, pillars.length]);

  return (
    <section
      className={styles.section}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      style={{ "--autoplay": `${AUTOPLAY_MS}ms` }}
    >
      <div className={styles.inner}>
        <div className={styles.left}>
          <span className={styles.eyebrow}>Our Philosophy</span>
          <h2 className={styles.heading}>
            What Feminista <em>stands for</em>
          </h2>

          <ul className={styles.list}>
            {pillars.map((p, i) => (
              <li key={p.title}>
                <button
                  type="button"
                  className={`${styles.item} ${i === active ? styles.itemActive : ""}`}
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  onClick={() => setActive(i)}
                  aria-pressed={i === active}
                >
                  <span className={styles.numeral}>{NUMERALS[i]}</span>
                  <span className={styles.word}>{p.title}</span>
                </button>
                {i === active && autoplay && (
                  <span
                    key={`progress-${active}`}
                    className={`${styles.progress} ${paused ? styles.progressPaused : ""}`}
                    aria-hidden="true"
                  />
                )}
              </li>
            ))}
          </ul>

          {/* Keyed so the text fades in fresh each time the pillar changes. */}
          <div key={current.title} className={styles.bodyWrap} aria-live="polite">
            <span className={styles.ornament} aria-hidden="true" />
            <p className={styles.body}>{current.body}</p>
          </div>
        </div>

        <div className={styles.media}>
          <div className={styles.glow} aria-hidden="true" />
          <div className={styles.arch}>
            {pillars.map((p, i) => (
              <div key={p.title} className={`${styles.frame} ${i === active ? styles.frameActive : ""}`}>
                <Image src={p.image} alt={p.title} fill className={styles.img} sizes="(max-width: 900px) 100vw, 42vw" />
              </div>
            ))}
            <div className={styles.archShade} aria-hidden="true" />
            <span className={styles.archLine} aria-hidden="true" />
          </div>
          <span className={styles.caption}>
            <span className={styles.captionNum}>{NUMERALS[active]}</span>
            {current.title}
          </span>
        </div>
      </div>
    </section>
  );
}
