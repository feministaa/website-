import { notFound } from "next/navigation";
import products from "@/data/products.json";
import PDPClient from "./PDPClient";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);
  if (!product) return {};
  const title = `${product.name} — ${product.expression} | Feminista`;
  return {
    title,
    description: product.shortDescription,
    alternates: { canonical: `/fragrances/${product.slug}` },
    openGraph: {
      title,
      description: product.shortDescription,
      url: `/fragrances/${product.slug}`,
      type: "website",
    },
  };
}

export default async function ProductPage({ params }) {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);
  if (!product) notFound();

  const related = products.filter((p) => p.id !== product.id).slice(0, 3);

  return <PDPClient product={product} related={related} />;
}
