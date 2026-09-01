import { NextResponse } from "next/server";
import { clearCustomerSession } from "@/lib/customerAuth";

export const runtime = "nodejs";

export async function POST() {
  await clearCustomerSession();
  return NextResponse.json({ success: true });
}
