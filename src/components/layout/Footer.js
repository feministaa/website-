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
];

const SOCIALS = [
  { href: "https://instagram.com", label: "Instagram" },
  { href: "https://facebook.com", label: "Facebook" },
  { href: "https://tiktok.com", label: "TikTok" },
];

const ORBIT_FACES = [
  "/images/testimonials/testimonial-1.jpg",
  "/images/testimonials/testimonial-2.jpg",
  "/images/testimonials/testimonial-3.jpg",
  "/images/testimonials/testimonial-1.jpg",
  "/images/testimonials/testimonial-2.jpg",
];

function OrbitGraphic() {
  const innerDots = [
    { angle: -35, size: 44 },
    { angle: 150, size: 38 },
  ];
  const outerDots = [
    { angle: 20, size: 40 },
    { angle: 195, size: 36 },
    { angle: 270, size: 46 },
  ];
  return (
    <div className={styles.orbit}>
      <span className={styles.orbitRing} style={{ width: 156, height: 156 }} />
      <span className={styles.orbitRing} style={{ width: 264, height: 264 }} />
      <span className={styles.orbitCenter}>
        <Image src="/feminista-logo-black.png" alt="Feminista" width={54} height={29} />
      </span>

      <span className={styles.orbitGroupA}>
        {innerDots.map((d, i) => {
          const rad = (d.angle * Math.PI) / 180;
          const x = Math.cos(rad) * 78;
          const y = Math.sin(rad) * 78;
          return (
            <span
              key={i}
              className={styles.orbitSat}
              style={{ transform: `translate(calc(${x}px - 50%), calc(${y}px - 50%))` }}
            >
              <span className={styles.orbitSatInnerA} style={{ width: d.size, height: d.size }}>
                <Image src={ORBIT_FACES[i]} alt="Feminista customer" fill className={styles.orbitFace} />
              </span>
            </span>
          );
        })}
      </span>

      <span className={styles.orbitGroupB}>
        {outerDots.map((d, i) => {
          const rad = (d.angle * Math.PI) / 180;
          const x = Math.cos(rad) * 132;
          const y = Math.sin(rad) * 132;
          return (
            <span
              key={i}
              className={styles.orbitSat}
              style={{ transform: `translate(calc(${x}px - 50%), calc(${y}px - 50%))` }}
            >
              <span className={styles.orbitSatInnerB} style={{ width: d.size, height: d.size }}>
                <Image src={ORBIT_FACES[i + 2]} alt="Feminista customer" fill className={styles.orbitFace} />
              </span>
            </span>
          );
        })}
      </span>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.ctaCard}>
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
        <OrbitGraphic />
      </div>

      <div className={styles.lower}>
        <div className={styles.brandCol}>
          <Image src="/feminista-logo-black.png" alt="Feminista" width={110} height={59} className={styles.logo} />
          <p>Created for her. Never adapted to her.</p>
        </div>

        {COLUMNS.map((col) => (
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

        <div className={styles.linkCol}>
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
        </div>
      </div>

      <div className={styles.bottom}>
        <span>© {new Date().getFullYear()} Feminista · All rights reserved</span>
        <div className={styles.bottomLinks}>
          <span>Privacy Policy</span>
          <span>Terms of Service</span>
        </div>
      </div>
    </footer>
  );
}
