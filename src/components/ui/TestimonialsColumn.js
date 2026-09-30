import { Fragment } from "react";
import Image from "next/image";
import styles from "./TestimonialsColumn.module.css";

// A vertical column of review cards that scrolls upward forever. The list is rendered twice and the
// column moves by exactly half its height, so the loop is seamless.
export default function TestimonialsColumn({ testimonials, duration = 15, className = "" }) {
  return (
    <div className={`${styles.column} ${className}`}>
      <div className={styles.track} style={{ animationDuration: `${duration}s` }}>
        {[0, 1].map((copy) => (
          <Fragment key={copy}>
            {testimonials.map(({ text, image, name, role }) => (
              <figure key={`${copy}-${name}`} className={styles.card} aria-hidden={copy === 1 || undefined}>
                <blockquote className={styles.text}>{text}</blockquote>
                <figcaption className={styles.author}>
                  <Image src={image} alt="" width={40} height={40} className={styles.avatar} />
                  <span>
                    <span className={styles.name}>{name}</span>
                    <span className={styles.role}>{role}</span>
                  </span>
                </figcaption>
              </figure>
            ))}
          </Fragment>
        ))}
      </div>
    </div>
  );
}
