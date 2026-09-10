import { NextResponse } from "next/server";
import { getProduct, updateProduct, deleteProduct } from "@/lib/dataStore";
import { isAdminAuthed } from "@/lib/auth";

export const runtime = "nodejs";

export async function GET(request, { params }) {
  const { id } = await params;
  const product = await getProduct(id);
  if (!product) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(product);
}

export async function PUT(request, { params }) {
  if (!(await isAdminAuthed())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const body = await request.json();
  const existing = await getProduct(id);
  if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const updated = await updateProduct(id, {
    ...body,
    price: body.price !== undefined ? Number(body.price) : undefined,
    compareAtPrice: body.compareAtPrice !== undefined ? (body.compareAtPrice ? Number(body.compareAtPrice) : null) : undefined,
    stock: body.stock !== undefined ? Number(body.stock) : undefined,
  });

  return NextResponse.json(updated);
}

export async function DELETE(request, { params }) {
  if (!(await isAdminAuthed())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const existing = await getProduct(id);
  if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });

  await deleteProduct(id);
  return NextResponse.json({ success: true });
}
