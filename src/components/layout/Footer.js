"use client";

import Link from "next/link";
import Image from "next/image";
import styles from "./Footer.module.css";

const COLUMNS = [
  {
    title: "Fragrances",
    links: [
      { href: "/fragrances", label: "Shop All" },
      { href: "/fragrances/locken", label: "Locken" },
      { href: "/fragrances/vers", label: "Vers" },
      { href: "/fragrances/fresca", label: "Fresca" },
      { href: "/fragrances/discovery-set", label: "Discovery Set" },
    ],
  },
  {
    title: "The House",
    links: [
      { href: "/our-story", label: "Our Story" },
      { href: "/the-art-of-180", label: "The Art of 180" },
      { href: "/the-collection", label: "The Collection" },
    ],
  },
  {
    title: "Client Care",
    links: [
      { href: "/cart", label: "Your Bag" },
      { href: "/wishlist", label: "Wishlist" },
      { href: "/checkout", label: "Track Order" },
    ],
  },
];

const SOCIALS = [
  {
    href: "https://instagram.com",
    label: "Instagram",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    href: "https://facebook.com",
    label: "Facebook",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
        <path d="M15 8.5h-2c-1.1 0-2 .9-2 2V22M9 13h6" strokeLinecap="round" />
        <circle cx="12" cy="12" r="9.5" />
      </svg>
    ),
  },
  {
    href: "https://tiktok.com",
    label: "TikTok",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
        <path d="M14 3.5c.4 2 1.9 3.4 4 3.6v2.4c-1.5 0-2.9-.5-4-1.4V15a5 5 0 1 1-4.8-5v2.4a2.6 2.6 0 1 0 2.6 2.6V3.5H14z" />
      </svg>
    ),
  },
];

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.upper}>
        <div className={styles.brandCol}>
          <Image src="/feminista-logo.png" alt="Feminista" width={120} height={64} className={styles.logo} />
          <p>Created for her. Never adapted to her. Celebrating the many expressions of modern femininity through fragrance.</p>
          <div className={styles.socials}>
            {SOCIALS.map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noreferrer" aria-label={s.label} className={styles.socialBtn}>
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        <div
          className={styles.newsletterPanel}
          style={{
            backgroundImage: `linear-gradient(160deg, rgba(9,9,9,0.82), rgba(9,9,9,0.55)), url(/images/banner-circle-cat.jpg)`,
          }}
        >
          <span className={styles.cornerTL} />
          <span className={styles.cornerBR} />
          <span className="eyebrow" style={{ color: "var(--gold-light)" }}>
            Join the Circle
          </span>
          <h3 className={styles.newsletterTitle}>Private access, always.</h3>
          <p className={styles.newsletterText}>New compositions, exclusive offers and stories from the house — before anyone else.</p>
          <form className={styles.newsletterForm} onSubmit={(e) => e.preventDefault()}>
            <input type="email" placeholder="Your email address" aria-label="Email address" required />
            <button type="submit" className="btn btn-gold btn-block">
              Join the Circle
            </button>
          </form>
        </div>
      </div>

      <nav className={styles.navRow}>
        {COLUMNS.map((col) => (
          <div key={col.title} className={styles.navGroup}>
            <span className={styles.navGroupTitle}>{col.title}</span>
            {col.links.map((link) => (
              <Link key={link.href} href={link.href}>
                {link.label}
              </Link>
            ))}
          </div>
        ))}
      </nav>

      <div className={styles.brandBand}>
        <Image src="/feminista-logo.png" alt="Feminista" width={220} height={118} className={styles.brandBandLogo} />
      </div>

      <div className={styles.bottom}>
        <span>© {new Date().getFullYear()} Feminista. All rights reserved.</span>
        <div className={styles.bottomLinks}>
          <span>Privacy Policy</span>
          <span>Terms of Service</span>
        </div>
      </div>
    </footer>
  );
}
