import { NextResponse } from "next/server";
import { getProducts, saveProducts } from "@/lib/dataStore";
import { isAdminAuthed } from "@/lib/auth";

export const runtime = "nodejs";

export async function GET(request, { params }) {
  const { id } = await params;
  const products = await getProducts();
  const product = products.find((p) => p.id === id);
  if (!product) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(product);
}

export async function PUT(request, { params }) {
  if (!(await isAdminAuthed())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const body = await request.json();
  const products = await getProducts();
  const idx = products.findIndex((p) => p.id === id);
  if (idx === -1) return NextResponse.json({ error: "Not found" }, { status: 404 });

  products[idx] = {
    ...products[idx],
    ...body,
    price: body.price !== undefined ? Number(body.price) : products[idx].price,
    compareAtPrice: body.compareAtPrice !== undefined ? (body.compareAtPrice ? Number(body.compareAtPrice) : null) : products[idx].compareAtPrice,
    stock: body.stock !== undefined ? Number(body.stock) : products[idx].stock,
  };

  await saveProducts(products);
  return NextResponse.json(products[idx]);
}

export async function DELETE(request, { params }) {
  if (!(await isAdminAuthed())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const products = await getProducts();
  const next = products.filter((p) => p.id !== id);
  if (next.length === products.length) return NextResponse.json({ error: "Not found" }, { status: 404 });

  await saveProducts(next);
  return NextResponse.json({ success: true });
}
