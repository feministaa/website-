import { NextResponse } from "next/server";
import { getUsers, saveUsers } from "@/lib/dataStore";
import { getCurrentCustomer } from "@/lib/customerAuth";

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
  const users = await getUsers();
  const idx = users.findIndex((u) => u.id === current.id);
  if (idx === -1) return NextResponse.json({ error: "Not found." }, { status: 404 });

  users[idx] = {
    ...users[idx],
    name: body.name ?? users[idx].name,
    phone: body.phone ?? users[idx].phone,
    city: body.city ?? users[idx].city,
  };
  await saveUsers(users);

  const { passwordHash, ...safeUser } = users[idx];
  return NextResponse.json(safeUser);
}
