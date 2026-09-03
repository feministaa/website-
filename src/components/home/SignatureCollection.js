import styles from "./SignatureCollection.module.css";
import ProductCard from "@/components/ui/ProductCard";
import AnimateIn from "@/components/ui/AnimateIn";

export default function SignatureCollection({ products }) {
  return (
    <section className={`section ${styles.section}`}>
      <div className={styles.grid}>
        {products.map((product, i) => (
          <AnimateIn key={product.id} delay={i * 0.12}>
            <ProductCard product={product} index={i} minimal />
          </AnimateIn>
        ))}
      </div>
    </section>
  );
}
