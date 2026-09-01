import { NextResponse } from "next/server";
import { getProducts, saveProducts } from "@/lib/dataStore";
import { isAdminAuthed } from "@/lib/auth";

export const runtime = "nodejs";

function slugify(str) {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export async function GET() {
  const products = await getProducts();
  return NextResponse.json(products);
}

export async function POST(request) {
  if (!(await isAdminAuthed())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  if (!body?.name || !body?.price) {
    return NextResponse.json({ error: "Name and price are required." }, { status: 400 });
  }

  const products = await getProducts();
  const slug = slugify(body.slug || body.name);
  if (products.some((p) => p.slug === slug)) {
    return NextResponse.json({ error: "A product with this slug already exists." }, { status: 409 });
  }

  const newProduct = {
    id: slug,
    slug,
    sku: body.sku || `FEM-${slug.toUpperCase()}`,
    name: body.name,
    expression: body.expression || "",
    family: body.family || "magnetic",
    tagline: body.tagline || "",
    shortDescription: body.shortDescription || "",
    price: Number(body.price),
    compareAtPrice: body.compareAtPrice ? Number(body.compareAtPrice) : null,
    accent: body.accent || "#eb9d1b",
    accentSoft: body.accentSoft || "#f6d9a4",
    sizes: body.sizes?.length ? body.sizes : [{ label: "100 ml", price: Number(body.price) }],
    stock: Number(body.stock) || 0,
    featured: Boolean(body.featured),
    comingSoon: Boolean(body.comingSoon),
    rating: 5,
    reviews: 0,
    notes: body.notes || { top: [], heart: [], base: [] },
    overview: body.overview || [],
    howToWear: body.howToWear || "",
    ingredients: body.ingredients || "",
    cardImage: body.cardImage || null,
    bannerImage: body.bannerImage || null,
    images: body.images?.length ? body.images : [],
    moodLabel: body.moodLabel || "",
    moodDescription: body.moodDescription || "",
    createdAt: new Date().toISOString(),
  };

  products.push(newProduct);
  await saveProducts(products);

  return NextResponse.json(newProduct, { status: 201 });
}
