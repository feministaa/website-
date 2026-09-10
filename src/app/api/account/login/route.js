import { NextResponse } from "next/server";
import { signInCustomer, getCurrentCustomer } from "@/lib/customerAuth";

export const runtime = "nodejs";

export async function POST(request) {
  const { email, password } = await request.json();
  if (!email || !password) {
    return NextResponse.json({ error: "Email and password are required." }, { status: 400 });
  }

  try {
    await signInCustomer({ email, password });
  } catch {
    return NextResponse.json({ error: "Incorrect email or password." }, { status: 401 });
  }

  const user = await getCurrentCustomer();
  return NextResponse.json(user);
}
