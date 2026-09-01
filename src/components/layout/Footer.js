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
  { href: "https://instagram.com", label: "Instagram" },
  { href: "https://facebook.com", label: "Facebook" },
  { href: "https://tiktok.com", label: "TikTok" },
];

function OrbitGraphic() {
  const dots = [
    { r: 78, angle: -35, size: 9 },
    { r: 78, angle: 150, size: 7 },
    { r: 132, angle: 20, size: 8 },
    { r: 132, angle: 195, size: 6 },
    { r: 132, angle: 270, size: 9 },
  ];
  return (
    <div className={styles.orbit}>
      <span className={styles.orbitRing} style={{ width: 156, height: 156 }} />
      <span className={styles.orbitRing} style={{ width: 264, height: 264 }} />
      <span className={styles.orbitCenter}>
        <Image src="/feminista-logo-black.png" alt="" width={30} height={16} />
      </span>
      {dots.map((d, i) => {
        const rad = (d.angle * Math.PI) / 180;
        const x = Math.cos(rad) * d.r;
        const y = Math.sin(rad) * d.r;
        return (
          <span
            key={i}
            className={styles.orbitDot}
            style={{ width: d.size, height: d.size, transform: `translate(${x}px, ${y}px)` }}
          />
        );
      })}
    </div>
  );
}

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.ctaCard}>
        <div className={styles.ctaCopy}>
          <span className="eyebrow" style={{ color: "var(--gold-light)" }}>
            Join the Circle
          </span>
          <h2 className={styles.ctaTitle}>Private access, always.</h2>
          <p className={styles.ctaText}>New compositions, exclusive offers and stories from the house — before anyone else.</p>
          <form className={styles.ctaForm} onSubmit={(e) => e.preventDefault()}>
            <input type="email" placeholder="Enter your email" aria-label="Email address" required />
            <button type="submit" aria-label="Join">
              <svg width="15" height="10" viewBox="0 0 15 10" fill="none">
                <path d="M0 5H14M14 5L9.5 0.5M14 5L9.5 9.5" stroke="currentColor" strokeWidth="1.3" />
              </svg>
            </button>
          </form>
        </div>
        <OrbitGraphic />
      </div>

      <div className={styles.lower}>
        <div className={styles.brandCol}>
          <Image src="/feminista-logo.png" alt="Feminista" width={110} height={59} className={styles.logo} />
          <p>Created for her. Never adapted to her. The many expressions of modern femininity, in fragrance.</p>
        </div>

        {COLUMNS.slice(0, 2).map((col) => (
          <div key={col.title} className={styles.linkCol}>
            <span className={styles.colTitle}>{col.title}</span>
            {col.links.map((link) => (
              <Link key={link.href} href={link.href}>
                {link.label}
              </Link>
            ))}
          </div>
        ))}

        <div className={styles.linkCol}>
          <span className={styles.colTitle}>Socials</span>
          {SOCIALS.map((s) => (
            <a key={s.label} href={s.href} target="_blank" rel="noreferrer">
              {s.label} ↗
            </a>
          ))}
        </div>
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
