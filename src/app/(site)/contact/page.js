import Link from "next/link";
import ContactForm from "./ContactForm";
import { SUPPORT_EMAIL } from "@/data/site";
import styles from "./page.module.css";

export const metadata = {
  title: "Contact Us — Feminista",
  description: "Questions about an order, a fragrance or a gift? Write to the House of Feminista.",
  alternates: { canonical: "/contact" },
};

const HELP = [
  { title: "Orders & delivery", body: "Track an order or check its status from your account.", href: "/account", cta: "Go to your account" },
  { title: "Damaged orders", body: "If your order arrives damaged, write to us within 48 hours of delivery.", href: "/returns", cta: "Read the returns policy" },
  { title: "Choosing a fragrance", body: "Not sure which one is yours? Try all three first.", href: "/fragrances/discovery-set", cta: "See the Discovery Set" },
];

export default function ContactPage() {
  return (
    <main className={styles.page}>
      <nav className={styles.crumb} aria-label="Breadcrumb">
        <Link href="/">Home</Link>
        <span>/</span>
        <span>Contact Us</span>
      </nav>

      <section className={styles.main}>
        <div className={styles.info}>
          <h1 className={styles.title}>Contact us</h1>
          <p className={styles.intro}>
            A question about an order, a fragrance or a gift? Write to us and our team will reply within one to two
            business days.
          </p>

          <div className={styles.detail}>
            <span className={styles.label}>Email</span>
            <a href={`mailto:${SUPPORT_EMAIL}`} className={styles.email}>
              {SUPPORT_EMAIL}
            </a>
          </div>
          <div className={styles.detail}>
            <span className={styles.label}>Hours</span>
            <p className={styles.value}>Monday to Saturday, 10am to 6pm IST</p>
          </div>
        </div>

        <ContactForm email={SUPPORT_EMAIL} />
      </section>

      <section className={styles.help}>
        {HELP.map((h) => (
          <div key={h.title} className={styles.helpItem}>
            <h2 className={styles.helpTitle}>{h.title}</h2>
            <p className={styles.helpBody}>{h.body}</p>
            <Link href={h.href} className={styles.helpLink}>
              {h.cta}
            </Link>
          </div>
        ))}
      </section>
    </main>
  );
}
