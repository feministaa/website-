import styles from "./page.module.css";

export default function HeroVisual() {
  return (
    <div
      className={`${styles.heroVisual} fadeInPhoto`}
      aria-label="A faceted crystal perfume bottle"
      role="img"
    />
  );
}
