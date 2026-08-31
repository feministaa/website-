import styles from "./StatCard.module.css";

export default function StatCard({ label, value, delta, trend = "up" }) {
  return (
    <div className={styles.card}>
      <div className={styles.label}>{label}</div>
      <div className={styles.value}>{value}</div>
      {delta && (
        <span className={`${styles.delta} ${trend === "up" ? styles.up : styles.down}`}>
          {trend === "up" ? "▲" : "▼"} {delta}
        </span>
      )}
    </div>
  );
}
