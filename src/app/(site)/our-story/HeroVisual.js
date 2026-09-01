import styles from "./page.module.css";

export default function HeroVisual() {
  return (
    <div
      className={`${styles.heroVisual} fadeInPhoto`}
      aria-label="A perfume bottle and cosmetic jars in warm light"
      role="img"
    />
  );
}
