import { NextResponse } from "next/server";
import { razorpayClient } from "@/lib/razorpay";

export const runtime = "nodejs";

export async function POST(request) {
  const body = await request.json();
  const amount = Number(body?.amount);

  if (!amount || amount <= 0) {
    return NextResponse.json({ error: "Invalid amount." }, { status: 400 });
  }

  const order = await razorpayClient().orders.create({
    amount: Math.round(amount * 100), // paise
    currency: "INR",
    receipt: `fem_${Date.now()}`,
  });

  return NextResponse.json({
    orderId: order.id,
    amount: order.amount,
    currency: order.currency,
    keyId: process.env.RAZORPAY_KEY_ID,
  });
}
