import Link from "next/link";
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
  {
    title: "Connect",
    links: [
      { href: "https://instagram.com", label: "Instagram" },
      { href: "https://facebook.com", label: "Facebook" },
      { href: "https://tiktok.com", label: "TikTok" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.top}>
        <div className={styles.brandCol}>
          <div className={styles.logo}>Feminista</div>
          <p>Created for her. Never adapted to her. Celebrating the many expressions of modern femininity through fragrance.</p>
        </div>
        {COLUMNS.map((col) => (
          <div key={col.title}>
            <div className={styles.colTitle}>{col.title}</div>
            <div className={styles.colLinks}>
              {col.links.map((link) => (
                <Link key={link.href} href={link.href}>
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        ))}
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
