import { NextResponse } from "next/server";
import { getCurrentCustomer } from "@/lib/customerAuth";
import { updateUser } from "@/lib/dataStore";

export const runtime = "nodejs";

export async function GET() {
  const user = await getCurrentCustomer();
  if (!user) return NextResponse.json({ error: "Not signed in." }, { status: 401 });
  return NextResponse.json(user);
}

export async function PUT(request) {
  const current = await getCurrentCustomer();
  if (!current) return NextResponse.json({ error: "Not signed in." }, { status: 401 });

  const body = await request.json();
  const updated = await updateUser(current.id, {
    name: body.name ?? current.name,
    phone: body.phone ?? current.phone,
    city: body.city ?? current.city,
  });

  return NextResponse.json(updated);
}
