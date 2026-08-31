import { NextResponse } from "next/server";
import { getOrders, saveOrders, getUsers, saveUsers } from "@/lib/dataStore";

export const runtime = "nodejs";

export async function GET() {
  const orders = await getOrders();
  return NextResponse.json(orders);
}

export async function POST(request) {
  const body = await request.json();

  if (!body?.items?.length || !body?.customerName || !body?.total) {
    return NextResponse.json({ error: "Missing required order fields." }, { status: 400 });
  }

  const orders = await getOrders();
  const nextNumber = orders.length ? Math.max(...orders.map((o) => parseInt(o.id.split("-")[1], 10) || 0)) + 1 : 1001;

  const newOrder = {
    id: `FEM-${nextNumber}`,
    userId: body.userId || null,
    customerName: body.customerName,
    email: body.email || "",
    phone: body.phone || "",
    address: body.address || "",
    items: body.items,
    total: body.total,
    status: "pending",
    date: new Date().toISOString(),
  };

  orders.push(newOrder);
  await saveOrders(orders);

  if (body.email) {
    const users = await getUsers();
    const existing = users.find((u) => u.email.toLowerCase() === body.email.toLowerCase());
    if (existing) {
      existing.orders += 1;
      existing.totalSpent += body.total;
    } else {
      users.push({
        id: `u${Date.now()}`,
        name: body.customerName,
        email: body.email,
        phone: body.phone || "",
        city: body.city || "",
        orders: 1,
        totalSpent: body.total,
        status: "active",
        joined: new Date().toISOString(),
      });
    }
    await saveUsers(users);
  }

  return NextResponse.json(newOrder, { status: 201 });
}
