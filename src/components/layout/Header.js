"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import styles from "./Header.module.css";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";

const NAV_LINKS = [
  { href: "/fragrances", label: "Fragrances" },
  { href: "/the-collection", label: "The Collection" },
  { href: "/the-art-of-180", label: "The Art of 180" },
  { href: "/our-story", label: "Our Story" },
];

export default function Header() {
  const pathname = usePathname();
  const { count, openDrawer } = useCart();
  const { count: wishCount } = useWishlist();
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setSearchOpen(false);
  }, [pathname]);

  return (
    <>
      <div className={styles.announce}>Complimentary shipping across India</div>
      <header className={`${styles.header} ${scrolled ? styles.headerScrolled : ""}`}>
        <div className={styles.inner}>
          <button className={styles.menuBtn} aria-label="Open menu" onClick={() => setMobileOpen(true)}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>

          <Link href="/" className={styles.logo}>
            Feminista
          </Link>

          <nav className={styles.nav}>
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`${styles.navLink} ${pathname === link.href ? styles.navLinkActive : ""}`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className={styles.icons}>
            <button className={styles.iconBtn} aria-label="Search" onClick={() => setSearchOpen((s) => !s)}>
              <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="11" cy="11" r="7" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </button>
            <Link href="/wishlist" className={styles.iconBtn} aria-label="Wishlist">
              <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M12 21s-6.7-4.35-9.3-8.1C1 10.2 1.8 6.5 5 5.1c2.2-1 4.6-.2 6 1.6 1.4-1.8 3.8-2.6 6-1.6 3.2 1.4 4 5.1 2.3 7.8C18.7 16.65 12 21 12 21z" />
              </svg>
              {wishCount > 0 && <span className={styles.badge}>{wishCount}</span>}
            </Link>
            <button className={styles.iconBtn} aria-label="Open cart" onClick={openDrawer}>
              <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M6 8h12l-1 12H7L6 8z" />
                <path d="M9 8V6a3 3 0 016 0v2" />
              </svg>
              {count > 0 && <span className={styles.badge}>{count}</span>}
            </button>
          </div>
        </div>

        <AnimatePresence initial={false}>
          {searchOpen && (
            <motion.div
              className={styles.searchBar}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className={styles.searchInner}>
                <input className={styles.searchInput} placeholder="Search Locken, Vers, Fresca…" autoFocus />
                <button className="btn btn-outline" onClick={() => setSearchOpen(false)}>
                  Close
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ position: "fixed", inset: 0, background: "rgba(13,12,10,0.4)", zIndex: 200 }}
            onClick={() => setMobileOpen(false)}
          >
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              style={{
                background: "var(--bg)",
                width: 300,
                maxWidth: "82vw",
                height: "100%",
                padding: "28px 26px",
                display: "flex",
                flexDirection: "column",
                gap: 22,
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span className={styles.logo}>Feminista</span>
                <button aria-label="Close menu" onClick={() => setMobileOpen(false)}>
                  ✕
                </button>
              </div>
              {NAV_LINKS.map((link) => (
                <Link key={link.href} href={link.href} style={{ fontSize: 18, fontFamily: "var(--font-serif)" }}>
                  {link.label}
                </Link>
              ))}
              <Link href="/cart" style={{ fontSize: 14, letterSpacing: "0.06em", textTransform: "uppercase", marginTop: "auto" }}>
                View Cart
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
