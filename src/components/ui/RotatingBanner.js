"use client";

import { useEffect, useState } from "react";
import styles from "./RotatingBanner.module.css";

export default function RotatingBanner({ images, interval = 5500 }) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;
    const id = setInterval(() => {
      setActive((a) => (a + 1) % images.length);
    }, interval);
    return () => clearInterval(id);
  }, [images.length, interval]);

  return (
    <div className={styles.wrap}>
      {images.map((src, i) => (
        <div
          key={src}
          className={styles.slide}
          style={{ backgroundImage: `url(${src})`, opacity: i === active ? 1 : 0 }}
        />
      ))}
    </div>
  );
}
