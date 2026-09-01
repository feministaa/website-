import { NextResponse } from "next/server";
import { getUsers, saveUsers } from "@/lib/dataStore";
import { hashPassword, setCustomerSession } from "@/lib/customerAuth";

export const runtime = "nodejs";

export async function POST(request) {
  const { name, email, phone, city, password } = await request.json();

  if (!name || !email || !password) {
    return NextResponse.json({ error: "Name, email and password are required." }, { status: 400 });
  }
  if (password.length < 6) {
    return NextResponse.json({ error: "Password must be at least 6 characters." }, { status: 400 });
  }

  const users = await getUsers();
  const existing = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
  if (existing?.passwordHash) {
    return NextResponse.json({ error: "An account with this email already exists." }, { status: 409 });
  }

  const passwordHash = await hashPassword(password);

  let user;
  if (existing) {
    existing.name = name;
    existing.phone = phone || existing.phone;
    existing.city = city || existing.city;
    existing.passwordHash = passwordHash;
    user = existing;
  } else {
    user = {
      id: `u${Date.now()}`,
      name,
      email,
      phone: phone || "",
      city: city || "",
      orders: 0,
      totalSpent: 0,
      status: "active",
      joined: new Date().toISOString(),
      passwordHash,
    };
    users.push(user);
  }

  await saveUsers(users);
  await setCustomerSession(user.id);

  const { passwordHash: _omit, ...safeUser } = user;
  return NextResponse.json(safeUser, { status: 201 });
}
