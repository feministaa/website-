import { NextResponse } from "next/server";
import crypto from "crypto";
import { createOrder, upsertGuestCustomer, updateUser } from "@/lib/dataStore";
import { getCurrentCustomer } from "@/lib/customerAuth";

export const runtime = "nodejs";

export async function POST(request) {
  const body = await request.json();
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature, order } = body || {};

  if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !order) {
    return NextResponse.json({ error: "Missing payment details." }, { status: 400 });
  }
  if (!order?.items?.length || !order?.customerName || !order?.total) {
    return NextResponse.json({ error: "Missing required order fields." }, { status: 400 });
  }

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(`${razorpay_order_id}|${razorpay_payment_id}`)
    .digest("hex");

  if (expectedSignature !== razorpay_signature) {
    return NextResponse.json({ error: "Payment verification failed." }, { status: 400 });
  }

  const signedInCustomer = await getCurrentCustomer();

  let customerId = signedInCustomer?.id || null;
  if (customerId) {
    await updateUser(customerId, {
      orders: signedInCustomer.orders + 1,
      totalSpent: signedInCustomer.totalSpent + order.total,
    });
  } else if (order.email) {
    const customer = await upsertGuestCustomer({
      name: order.customerName,
      email: order.email,
      phone: order.phone,
      city: order.city,
      orderTotal: order.total,
    });
    customerId = customer.id;
  }

  const newOrder = await createOrder({
    customerId,
    customerName: order.customerName,
    email: order.email,
    phone: order.phone,
    address: order.address,
    items: order.items,
    total: order.total,
    razorpayOrderId: razorpay_order_id,
    razorpayPaymentId: razorpay_payment_id,
    paymentStatus: "paid",
  });

  return NextResponse.json(newOrder, { status: 201 });
}
