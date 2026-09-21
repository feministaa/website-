"use client";

import Image from "next/image";
import styles from "./NewsletterBanner.module.css";

export default function NewsletterBanner() {
  return (
    <section className={styles.section}>
      <Image
        src="/images/products/locken-newsletter.png"
        alt="Locken botanicals by Feminista"
        fill
        className={styles.image}
        sizes="100vw"
      />
      <div className={styles.scrim} />
      <div className={styles.inner}>
        <div className={styles.copy}>
          <span className={styles.eyebrow}>Stay Connected</span>
          <h2 className={styles.title}>Be the first to know</h2>
          <p className={styles.text}>Get exclusive updates, new launches and behind-the-scenes stories from Feminista.</p>
        </div>
        <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
          <input type="email" placeholder="Your email address" aria-label="Email address" required />
          <button type="submit" aria-label="Subscribe">
            <svg width="16" height="12" viewBox="0 0 15 10" fill="none">
              <path d="M0 5H14M14 5L9.5 0.5M14 5L9.5 9.5" stroke="currentColor" strokeWidth="1.3" />
            </svg>
          </button>
        </form>
      </div>
    </section>
  );
}
