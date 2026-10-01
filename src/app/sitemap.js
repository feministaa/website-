import { getProducts } from "@/lib/dataStore";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export default async function sitemap() {
  const products = await getProducts();

  const staticRoutes = [
    { path: "/", priority: 1, changeFrequency: "weekly" },
    { path: "/fragrances", priority: 0.9, changeFrequency: "weekly" },
    { path: "/the-art-of-180", priority: 0.7, changeFrequency: "monthly" },
    { path: "/our-story", priority: 0.7, changeFrequency: "monthly" },
    { path: "/contact", priority: 0.4, changeFrequency: "yearly" },
    { path: "/shipping", priority: 0.3, changeFrequency: "yearly" },
    { path: "/returns", priority: 0.3, changeFrequency: "yearly" },
    { path: "/privacy-policy", priority: 0.3, changeFrequency: "yearly" },
  ].map((route) => ({
    url: `${siteUrl}${route.path}`,
    lastModified: new Date(),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  const productRoutes = products.map((product) => ({
    url: `${siteUrl}/fragrances/${product.slug}`,
    lastModified: new Date(product.createdAt || Date.now()),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [...staticRoutes, ...productRoutes];
}
