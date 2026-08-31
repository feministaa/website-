import { NextResponse } from "next/server";
import { getUsers, saveUsers } from "@/lib/dataStore";
import { isAdminAuthed } from "@/lib/auth";

export const runtime = "nodejs";

export async function PUT(request, { params }) {
  if (!(await isAdminAuthed())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const body = await request.json();
  const users = await getUsers();
  const idx = users.findIndex((u) => u.id === id);
  if (idx === -1) return NextResponse.json({ error: "Not found" }, { status: 404 });

  users[idx] = { ...users[idx], ...body };
  await saveUsers(users);
  return NextResponse.json(users[idx]);
}

export async function DELETE(request, { params }) {
  if (!(await isAdminAuthed())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const users = await getUsers();
  const next = users.filter((u) => u.id !== id);
  if (next.length === users.length) return NextResponse.json({ error: "Not found" }, { status: 404 });

  await saveUsers(next);
  return NextResponse.json({ success: true });
}
