"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import styles from "./Hero.module.css";
import ScentBottle from "@/components/ui/ScentBottle";

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.copy}>
        <motion.span
          className={`eyebrow ${styles.eyebrow}`}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          The House of Feminista
        </motion.span>
        <motion.h1
          className={styles.title}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          For the woman <br /> who needs <em>no introduction.</em>
        </motion.h1>
        <motion.p
          className={styles.subtitle}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
        >
          A presence composed in scent. Three compositions, each matured for nearly 180 days, made for the many expressions of modern femininity.
        </motion.p>
        <motion.div
          className={styles.ctaRow}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <Link href="/fragrances" className="btn btn-primary">
            Discover Feminista
          </Link>
          <Link href="/the-art-of-180" className="btn btn-outline">
            The Art of 180
          </Link>
        </motion.div>
      </div>

      <div className={styles.visual}>
        <motion.div
          className={styles.ring}
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        />
        <div className={`${styles.ring} ${styles.ringTwo}`} />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div animate={{ y: [0, -14, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}>
            <ScentBottle accent="#b8792f" accentSoft="#f1d9ab" size={280} />
          </motion.div>
        </motion.div>
      </div>

      <div className={styles.scrollHint}>
        <span>Scroll</span>
        <span className={styles.scrollLine} />
      </div>
    </section>
  );
}
