import Link from "next/link";
import { getProducts } from "@/lib/dataStore";
import styles from "./page.module.css";
import ProductsTableClient from "./ProductsTableClient";

export const metadata = { title: "Products — Feminista Admin" };

export default async function AdminProductsPage() {
  const products = await getProducts();

  return (
    <div>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Products</h1>
          <p className={styles.sub}>{products.length} SKU(s) in the catalogue.</p>
        </div>
        <Link href="/admin/products/new" className="btn btn-primary">
          + Add Product
        </Link>
      </div>
      <ProductsTableClient products={products} />
    </div>
  );
}
