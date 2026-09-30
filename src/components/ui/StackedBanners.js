import { Children } from "react";
import styles from "./StackedBanners.module.css";

// Full-screen banners that pin to the top in turn, each new one sliding up over the last
// (the same stacking as the Fragrances page rows). Desktop only; phones scroll normally.
export default function StackedBanners({ children }) {
  return (
    <div className={styles.stack}>
      {Children.toArray(children).map((child, i) => (
        <div key={i} className={styles.item} style={{ zIndex: i + 1 }}>
          {child}
        </div>
      ))}
    </div>
  );
}
