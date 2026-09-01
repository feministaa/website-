"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import styles from "./Hero.module.css";

const SLIDES = ["/images/banner-hero-campaign.jpg", "/images/banner-fresca-campaign.jpg"];

export default function Hero() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setActive((a) => (a + 1) % SLIDES.length);
    }, 5500);
    return () => clearInterval(id);
  }, []);

  return (
    <section className={styles.hero}>
      {SLIDES.map((src, i) => (
        <div
          key={src}
          className={styles.slide}
          style={{ backgroundImage: `url(${src})`, opacity: i === active ? 1 : 0 }}
        />
      ))}

      <div className={styles.copy}>
        <motion.div
          className={styles.ctaRow}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <Link href="/fragrances" className="btn btn-gold">
            Discover Feminista
          </Link>
          <Link href="/the-art-of-180" className="btn btn-light">
            The Art of 180
          </Link>
        </motion.div>
      </div>

      <div className={styles.dots}>
        {SLIDES.map((src, i) => (
          <button
            key={src}
            className={`${styles.dot} ${i === active ? styles.dotActive : ""}`}
            onClick={() => setActive(i)}
            aria-label={`Show slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
