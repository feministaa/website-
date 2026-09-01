import { NextResponse } from "next/server";
import { getUsers } from "@/lib/dataStore";
import { verifyPassword, setCustomerSession } from "@/lib/customerAuth";

export const runtime = "nodejs";

export async function POST(request) {
  const { email, password } = await request.json();
  if (!email || !password) {
    return NextResponse.json({ error: "Email and password are required." }, { status: 400 });
  }

  const users = await getUsers();
  const user = users.find((u) => u.email.toLowerCase() === email.toLowerCase());

  if (!user || !(await verifyPassword(password, user.passwordHash))) {
    return NextResponse.json({ error: "Incorrect email or password." }, { status: 401 });
  }

  await setCustomerSession(user.id);
  const { passwordHash, ...safeUser } = user;
  return NextResponse.json(safeUser);
}
