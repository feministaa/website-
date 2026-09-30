import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CartDrawer from "@/components/layout/CartDrawer";
import styles from "./not-found.module.css";

export const metadata = {
  title: "Page not found — Feminista",
};

// Handles every unmatched URL. It renders outside the (site) layout, so the header and footer are added here.
export default function NotFound() {
  return (
    <>
      <Header />
      <main className={styles.page}>
        <span className={styles.code}>404</span>
        <h1 className={styles.title}>This page has drifted away</h1>
        <p className={styles.text}>
          The page you are looking for may have moved, or never existed. Let us take you somewhere worth remembering.
        </p>
        <div className={styles.actions}>
          <Link href="/" className="btn btn-primary">
            Back to home
          </Link>
          <Link href="/fragrances" className={styles.link}>
            Explore the fragrances
          </Link>
        </div>
      </main>
      <Footer />
      <CartDrawer />
    </>
  );
}
