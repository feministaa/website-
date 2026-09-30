import TestimonialsColumn from "@/components/ui/TestimonialsColumn";
import AnimateIn from "@/components/ui/AnimateIn";
import { TESTIMONIALS } from "@/data/testimonials";
import styles from "./Testimonials.module.css";

const firstColumn = TESTIMONIALS.slice(0, 2);
const secondColumn = TESTIMONIALS.slice(2, 4);
const thirdColumn = TESTIMONIALS.slice(4, 6);

export default function Testimonials() {
  return (
    <section className={styles.section}>
      <AnimateIn className={styles.head}>
        <span className={styles.eyebrow}>Testimonials</span>
        <h2 className={styles.title}>In her words</h2>
        <p className={styles.text}>What the women who wear Feminista have to say.</p>
      </AnimateIn>

      <div className={styles.columns}>
        <TestimonialsColumn testimonials={firstColumn} duration={18} />
        <TestimonialsColumn testimonials={secondColumn} duration={22} className={styles.hideMobile} />
        <TestimonialsColumn testimonials={thirdColumn} duration={20} className={styles.hideTablet} />
      </div>
    </section>
  );
}
