"use client";

import Link from "next/link";
import Image from "next/image";
import AnimateIn from "@/components/ui/AnimateIn";
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
    title: "Customer Care",
    links: [
      { href: "/contact", label: "Contact Us" },
      { href: "/shipping", label: "Shipping & Delivery" },
      { href: "/returns", label: "Returns & Exchanges" },
      { href: "/account", label: "Track Your Order" },
      { href: "/faq", label: "FAQs" },
    ],
  },
  {
    title: "The House",
    links: [
      { href: "/our-story", label: "Our Story" },
      { href: "/the-art-of-180", label: "The Art of 180" },
      { href: "/fragrances", label: "Find Your Essence" },
    ],
  },
];

const SOCIALS = [
  {
    href: "https://instagram.com",
    label: "Instagram",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    href: "https://facebook.com",
    label: "Facebook",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M15 8h2V4h-2a4 4 0 0 0-4 4v2H9v4h2v6h4v-6h2.5l.5-4H15V8z" />
      </svg>
    ),
  },
  {
    href: "https://tiktok.com",
    label: "TikTok",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M13 3v11.5a3.5 3.5 0 1 1-3.5-3.5" />
        <path d="M13 3a5 5 0 0 0 5 5" />
      </svg>
    ),
  },
];

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <AnimateIn className={styles.ctaCard}>
        <div className={styles.ctaCopy}>
          <span className={styles.eyebrow}>Join the Circle</span>
          <h2 className={styles.ctaTitle}>Never miss a new scent</h2>
          <p className={styles.ctaText}>
            Be the first to know about new compositions, private launches and stories from the house of Feminista.
          </p>
          <Link href="/account/register" className={styles.ctaBtn}>
            Create an Account ↗
          </Link>
        </div>
      </AnimateIn>

      <div className={styles.lower}>
        <AnimateIn className={styles.brandCol} delay={0.05}>
          <Image src="/feminista-logo-black.png" alt="Feminista" width={110} height={59} className={styles.logo} />
          <p>Created for her. Never adapted to her.</p>
        </AnimateIn>

        {COLUMNS.map((col, i) => (
          <AnimateIn key={col.title} className={styles.linkCol} delay={0.1 + i * 0.05}>
            <span className={styles.colTitle}>{col.title}</span>
            {col.links.map((link) => (
              <Link key={link.href} href={link.href}>
                {link.label}
              </Link>
            ))}
          </AnimateIn>
        ))}

        <AnimateIn className={styles.linkCol} delay={0.1 + COLUMNS.length * 0.05}>
          <span className={styles.colTitle}>Newsletter</span>
          <p className={styles.newsletterText}>Receive product updates, exclusive offers and early access.</p>
          <form className={styles.newsletterForm} onSubmit={(e) => e.preventDefault()}>
            <input type="email" placeholder="Enter your email…" aria-label="Email address" required />
            <button type="submit" aria-label="Subscribe">
              <svg width="14" height="10" viewBox="0 0 15 10" fill="none">
                <path d="M0 5H14M14 5L9.5 0.5M14 5L9.5 9.5" stroke="currentColor" strokeWidth="1.3" />
              </svg>
            </button>
          </form>
        </AnimateIn>
      </div>

      <AnimateIn className={styles.bottom} delay={0.3} y={12}>
        <span>© {new Date().getFullYear()} Feminista · All rights reserved</span>
        <div className={styles.socialRow}>
          {SOCIALS.map((s) => (
            <a key={s.label} href={s.href} target="_blank" rel="noreferrer" aria-label={s.label} className={styles.socialIcon}>
              {s.icon}
            </a>
          ))}
        </div>
        <div className={styles.bottomLinks}>
          <span>Privacy Policy</span>
          <span>Terms of Service</span>
        </div>
      </AnimateIn>
    </footer>
  );
}
