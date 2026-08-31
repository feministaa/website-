import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { checkAdminPassword, ADMIN_COOKIE, adminSessionValue } from "@/lib/auth";

export const runtime = "nodejs";

export async function POST(request) {
  const { password } = await request.json();

  if (!checkAdminPassword(password)) {
    return NextResponse.json({ error: "Incorrect password." }, { status: 401 });
  }

  const store = await cookies();
  store.set(ADMIN_COOKIE, adminSessionValue(), {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 8,
  });

  return NextResponse.json({ success: true });
}
