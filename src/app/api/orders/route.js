import { NextResponse } from "next/server";
import { getOrders, createOrder, upsertGuestCustomer, updateUser } from "@/lib/dataStore";
import { getCurrentCustomer } from "@/lib/customerAuth";

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

  const signedInCustomer = await getCurrentCustomer();

  let customerId = signedInCustomer?.id || null;
  if (customerId) {
    await updateUser(customerId, {
      orders: signedInCustomer.orders + 1,
      totalSpent: signedInCustomer.totalSpent + body.total,
    });
  } else if (body.email) {
    const customer = await upsertGuestCustomer({
      name: body.customerName,
      email: body.email,
      phone: body.phone,
      city: body.city,
      orderTotal: body.total,
    });
    customerId = customer.id;
  }

  const newOrder = await createOrder({
    customerId,
    customerName: body.customerName,
    email: body.email,
    phone: body.phone,
    address: body.address,
    items: body.items,
    total: body.total,
  });

  return NextResponse.json(newOrder, { status: 201 });
}
