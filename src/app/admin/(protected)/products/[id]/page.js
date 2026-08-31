import { notFound } from "next/navigation";
import { getProducts } from "@/lib/dataStore";
import ProductForm from "@/components/admin/ProductForm";

export const metadata = { title: "Edit Product — Feminista Admin" };

export default async function EditProductPage({ params }) {
  const { id } = await params;
  const products = await getProducts();
  const product = products.find((p) => p.id === id);
  if (!product) notFound();

  return (
    <div>
      <h1 style={{ fontSize: 28, marginBottom: 4 }}>Edit {product.name}</h1>
      <p style={{ fontSize: 13, color: "var(--ink-soft)", marginBottom: 28 }}>Update details for this fragrance.</p>
      <ProductForm initialProduct={product} />
    </div>
  );
}
