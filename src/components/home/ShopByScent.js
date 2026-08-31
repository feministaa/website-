import Link from "next/link";
import styles from "./ShopByScent.module.css";
import AnimateIn from "@/components/ui/AnimateIn";

const MOODS = [
  {
    label: "Magnetic",
    slug: "locken",
    desc: "Warm, addictive, commanding.",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#a87f3f" strokeWidth="1.4">
        <path d="M12 2l2.4 7.2H22l-6 4.6 2.3 7.2L12 16.4 5.7 21l2.3-7.2-6-4.6h7.6L12 2z" />
      </svg>
    ),
  },
  {
    label: "Intimate",
    slug: "vers",
    desc: "Soft, graceful, whispered.",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#a87f3f" strokeWidth="1.4">
        <path d="M12 21s-6.7-4.35-9.3-8.1C1 10.2 1.8 6.5 5 5.1c2.2-1 4.6-.2 6 1.6 1.4-1.8 3.8-2.6 6-1.6 3.2 1.4 4 5.1 2.3 7.8C18.7 16.65 12 21 12 21z" />
      </svg>
    ),
  },
  {
    label: "Luminous",
    slug: "fresca",
    desc: "Fresh, radiant, effortless.",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#a87f3f" strokeWidth="1.4">
        <circle cx="12" cy="12" r="4.4" />
        <g stroke="#a87f3f" strokeWidth="1.4">
          <line x1="12" y1="1.5" x2="12" y2="4.2" />
          <line x1="12" y1="19.8" x2="12" y2="22.5" />
          <line x1="1.5" y1="12" x2="4.2" y2="12" />
          <line x1="19.8" y1="12" x2="22.5" y2="12" />
          <line x1="4.4" y1="4.4" x2="6.3" y2="6.3" />
          <line x1="17.7" y1="17.7" x2="19.6" y2="19.6" />
          <line x1="4.4" y1="19.6" x2="6.3" y2="17.7" />
          <line x1="17.7" y1="6.3" x2="19.6" y2="4.4" />
        </g>
      </svg>
    ),
  },
];

export default function ShopByScent() {
  return (
    <section className={`section ${styles.section}`}>
      <div className="container">
        <AnimateIn className={styles.header}>
          <span className="eyebrow">Shop by Scent</span>
          <h2 className={styles.title}>Choose the impression you leave.</h2>
        </AnimateIn>
        <div className={styles.grid}>
          {MOODS.map((mood, i) => (
            <AnimateIn key={mood.slug} delay={i * 0.1}>
              <div className={styles.card}>
                <div className={styles.iconWrap}>{mood.icon}</div>
                <h3 className={styles.mood}>{mood.label}</h3>
                <p className={styles.desc}>{mood.desc}</p>
                <Link href={`/fragrances/${mood.slug}`} className="btn btn-outline">
                  Discover {mood.slug === "locken" ? "Locken" : mood.slug === "vers" ? "Vers" : "Fresca"}
                </Link>
              </div>
            </AnimateIn>
          ))}
        </div>
      </div>
    </section>
  );
}
