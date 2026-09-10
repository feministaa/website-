import { NextResponse } from "next/server";
import { getUserById, updateUser, deleteUser } from "@/lib/dataStore";
import { isAdminAuthed } from "@/lib/auth";

export const runtime = "nodejs";

export async function PUT(request, { params }) {
  if (!(await isAdminAuthed())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const existing = await getUserById(id);
  if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const body = await request.json();
  const updated = await updateUser(id, body);
  return NextResponse.json(updated);
}

export async function DELETE(request, { params }) {
  if (!(await isAdminAuthed())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const existing = await getUserById(id);
  if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });

  await deleteUser(id);
  return NextResponse.json({ success: true });
}
