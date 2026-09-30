"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import styles from "./HomeReels.module.css";

const REELS = [
  { id: "r3", poster: "/images/reels/reel-3.jpg", video: "/videos/reels/reel-3.mp4" },
  { id: "r4", poster: "/images/reels/reel-4.jpg", video: "/videos/reels/reel-4.mp4" },
  { id: "r5", poster: "/images/reels/reel-5.jpg", video: "/videos/reels/reel-5.mp4" },
  { id: "r6", poster: "/images/reels/reel-6.jpg", video: "/videos/reels/reel-6.mp4" },
  { id: "r1", poster: "/images/reels/reel-1.jpg", video: "/videos/reels/reel-1.mp4" },
  { id: "r2", poster: "/images/reels/reel-2.jpg", video: "/videos/reels/reel-2.mp4" },
];

const FADE_UP = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 20 } },
};

// Heading above a slow marquee of tilted, muted, looping reel videos. The strip is rendered twice and
// moves by exactly one copy's width, so the loop is seamless.
export default function HomeReels() {
  const strip = [...REELS, ...REELS];

  return (
    <section className={styles.section}>
      <motion.div
        className={styles.head}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.4 }}
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12 } } }}
      >
        <motion.h2 variants={FADE_UP} className={styles.title}>
          For the women who <em>need no introduction</em>
        </motion.h2>
        <motion.p variants={FADE_UP} className={styles.text}>
          Worn on stages, sets and red carpets across India.
        </motion.p>
        <motion.div variants={FADE_UP}>
          <Link href="/fragrances" className={styles.cta}>
            Shop the collection
          </Link>
        </motion.div>
      </motion.div>

      <div className={styles.marquee}>
        {/* CSS keyframes drive the loop (see .strip), so it keeps running regardless of JS timing. */}
        <div className={styles.strip}>
          {strip.map((reel, i) => (
            <div
              key={`${reel.id}-${i}`}
              className={styles.card}
              style={{ rotate: `${i % 2 === 0 ? -2 : 3}deg` }}
              aria-hidden={i >= REELS.length || undefined}
            >
              <video
                className={styles.video}
                src={reel.video}
                poster={reel.poster}
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
