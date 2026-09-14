"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./SignatureCollection.module.css";
import AnimateIn from "@/components/ui/AnimateIn";

export default function SignatureCollection({ products }) {
  const rowRef = useRef(null);

  function scroll(direction) {
    const row = rowRef.current;
    if (!row) return;
    const card = row.querySelector("a");
    const gap = 24;
    const amount = card ? card.getBoundingClientRect().width + gap : 400;
    row.scrollBy({ left: direction * amount, behavior: "smooth" });
  }

  return (
    <section className={styles.section}>
      <AnimateIn className={styles.panel}>
        <h2 className={styles.title}>
          Her, in
          <br />
          Three Acts
        </h2>
        <p className={styles.desc}>
          Three expressions of modern femininity — Locken, Vers and Fresca. Each composed, matured and made entirely
          her own.
        </p>

        <div className={styles.arrows}>
          <button className={styles.arrowBtn} onClick={() => scroll(-1)} aria-label="Scroll left">
            <svg width="16" height="12" viewBox="0 0 15 10" fill="none">
              <path d="M15 5H1M1 5L5.5 0.5M1 5L5.5 9.5" stroke="currentColor" strokeWidth="1.3" />
            </svg>
          </button>
          <button className={styles.arrowBtn} onClick={() => scroll(1)} aria-label="Scroll right">
            <svg width="16" height="12" viewBox="0 0 15 10" fill="none">
              <path d="M0 5H14M14 5L9.5 0.5M14 5L9.5 9.5" stroke="currentColor" strokeWidth="1.3" />
            </svg>
          </button>
        </div>
      </AnimateIn>

      <AnimateIn delay={0.1} className={styles.rowWrap}>
        <div className={styles.row} ref={rowRef}>
          {products.map((product) => (
            <div key={product.id} className={styles.card}>
              <Link href={`/fragrances/${product.slug}`} className={styles.cardLink}>
                <Image
                  src={product.cardImage || product.images?.[0]}
                  alt={product.name}
                  fill
                  className={styles.cardImage}
                />
                <div className={styles.scrim} />
                <div className={styles.cardCopy}>
                  <span className={styles.cardTagline}>{product.tagline}</span>
                  <span className={styles.cardLabel}>{product.name}</span>
                  <span className={styles.discover}>{product.comingSoon ? "Coming Soon" : `Discover ${product.name}`}</span>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </AnimateIn>
    </section>
  );
}
