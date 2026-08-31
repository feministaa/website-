import ProductForm from "@/components/admin/ProductForm";

export const metadata = { title: "Add Product — Feminista Admin" };

export default function NewProductPage() {
  return (
    <div>
      <h1 style={{ fontSize: 28, marginBottom: 4 }}>Add Product</h1>
      <p style={{ fontSize: 13, color: "var(--ink-soft)", marginBottom: 28 }}>Add a new fragrance to the catalogue.</p>
      <ProductForm />
    </div>
  );
}
