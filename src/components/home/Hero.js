"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import styles from "./Hero.module.css";

export default function Hero() {
  return (
    <section className={styles.hero}>
      <video
        className={styles.video}
        src="/videos/hero-banner.mp4"
        poster="/images/banner-hero-video-poster.jpg"
        autoPlay
        muted
        loop
        playsInline
      />
      <div className={styles.scrim} />

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
    </section>
  );
}
