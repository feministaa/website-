"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import styles from "./AdminSidebar.module.css";

const LINKS = [
  { href: "/admin", label: "Insights", exact: true },
  { href: "/admin/products", label: "Products" },
  { href: "/admin/users", label: "Customers" },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <aside className={styles.sidebar}>
      <div className={styles.logo}>Feminista</div>
      <div className={styles.tag}>Admin Dashboard</div>
      <nav className={styles.nav}>
        {LINKS.map((link) => {
          const active = link.exact ? pathname === link.href : pathname.startsWith(link.href);
          return (
            <Link key={link.href} href={link.href} className={`${styles.link} ${active ? styles.linkActive : ""}`}>
              {link.label}
            </Link>
          );
        })}
      </nav>
      <Link href="/" className={styles.viewSite}>
        ← View Storefront
      </Link>
      <button className={styles.logout} onClick={handleLogout}>
        Sign Out
      </button>
    </aside>
  );
}
