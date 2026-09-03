"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./FinishingTouch.module.css";
import AnimateIn from "@/components/ui/AnimateIn";

const CARDS = [
  {
    label: "The Art of Gifting",
    image: "/images/products/locken-silk.jpg",
    href: "/fragrances",
  },
  {
    label: "The Art of 180",
    image: "/images/banner-gold-liquid.jpg",
    href: "/the-art-of-180",
  },
  {
    label: "The Discovery Ritual",
    image: "/images/products/discovery-set.jpg",
    href: "/fragrances/discovery-set",
  },
  {
    label: "The Fresca Ritual",
    image: "/images/products/fresca-frame.jpg",
    href: "/fragrances/fresca",
  },
  {
    label: "The Vers Ritual",
    image: "/images/products/vers-coming-soon.jpg",
    href: "/fragrances",
  },
];

export default function FinishingTouch() {
  const rowRef = useRef(null);

  function scroll(direction) {
    const row = rowRef.current;
    if (!row) return;
    const card = row.querySelector("a");
    const gap = 28;
    const amount = card ? card.getBoundingClientRect().width + gap : 400;
    row.scrollBy({ left: direction * amount, behavior: "smooth" });
  }

  return (
    <section className={styles.section}>
      <div className={styles.pattern} aria-hidden="true" />
      <AnimateIn className={styles.panel}>
        <span className="eyebrow">Beyond the Bottle</span>
        <h2 className={styles.title}>
          The Finishing
          <br />
          Ritual
        </h2>
        <p className={styles.desc}>
          Perfection lives in the details. Explore the rituals that turn a bottle of Feminista into something entirely
          yours.
        </p>
      </AnimateIn>

      <AnimateIn delay={0.1} className={styles.rowWrap}>
        <div className={styles.row} ref={rowRef}>
          {CARDS.map((card) => (
            <div key={card.label} className={styles.card}>
              <Link href={card.href} className={styles.cardLink}>
                <Image src={card.image} alt={card.label} fill className={styles.cardImage} />
                <div className={styles.scrim} />
                <div className={styles.cardCopy}>
                  <span className={styles.cardLabel}>{card.label}</span>
                  <span className={styles.discover}>Discover</span>
                </div>
              </Link>
            </div>
          ))}
        </div>

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
    </section>
  );
}
