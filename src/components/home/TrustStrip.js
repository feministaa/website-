import styles from "./TrustStrip.module.css";

const ITEMS = [
  { title: "Free shipping", text: "Across India, in 2–4 days" },
  { title: "14-day returns", text: "On unopened bottles" },
  { title: "100% authentic", text: "Direct from the House" },
  { title: "Matured 180 days", text: "Before it reaches you" },
];

export default function TrustStrip() {
  return (
    <section className={styles.strip} aria-label="Why shop with Feminista">
      {ITEMS.map((item) => (
        <div key={item.title} className={styles.item}>
          <span className={styles.title}>{item.title}</span>
          <span className={styles.text}>{item.text}</span>
        </div>
      ))}
    </section>
  );
}
