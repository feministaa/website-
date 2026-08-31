import styles from "./SignatureCollection.module.css";
import ProductCard from "@/components/ui/ProductCard";
import AnimateIn from "@/components/ui/AnimateIn";

export default function SignatureCollection({ products }) {
  return (
    <section className="section">
      <div className="container">
        <AnimateIn className={styles.header}>
          <span className="eyebrow">The Signature Collection</span>
          <h2 className={styles.title}>Her, in Three Acts</h2>
          <p className={styles.sub}>Three compositions. Three expressions of her.</p>
        </AnimateIn>
        <div className={styles.grid}>
          {products.map((product, i) => (
            <AnimateIn key={product.id} delay={i * 0.12}>
              <ProductCard product={product} index={i} />
            </AnimateIn>
          ))}
        </div>
      </div>
    </section>
  );
}
