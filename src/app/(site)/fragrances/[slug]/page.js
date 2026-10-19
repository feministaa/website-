import { notFound } from "next/navigation";
import { getProducts } from "@/lib/dataStore";
import PDPClient from "./PDPClient";

export async function generateStaticParams() {
  const products = await getProducts();
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const products = await getProducts();
  const product = products.find((p) => p.slug === slug);
  if (!product) return {};
  const title = `${product.name} — ${product.expression} | Feminista`;
  // The on-page copy is short and poetic, so the search snippet adds the notes and the shipping promise.
  const topNotes = product.family !== "set" && product.notes?.top?.length ? ` Top notes: ${product.notes.top.join(", ")}.` : "";
  const description = `${product.name} by Feminista. ${product.shortDescription}${topNotes} Complimentary shipping across India.`;
  return {
    title,
    description,
    alternates: { canonical: `/fragrances/${product.slug}` },
    openGraph: {
      title,
      description,
      url: `/fragrances/${product.slug}`,
      type: "website",
    },
  };
}

export default async function ProductPage({ params }) {
  const { slug } = await params;
  const products = await getProducts();
  const product = products.find((p) => p.slug === slug);
  if (!product) notFound();

  const related = products.filter((p) => p.id !== product.id).slice(0, 3);

  return <PDPClient product={product} related={related} />;
}
