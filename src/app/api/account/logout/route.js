import { NextResponse } from "next/server";
import { signOutCustomer } from "@/lib/customerAuth";

export const runtime = "nodejs";

export async function POST() {
  await signOutCustomer();
  return NextResponse.json({ success: true });
}
