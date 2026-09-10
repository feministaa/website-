import { NextResponse } from "next/server";
import { isAdminAuthed } from "@/lib/auth";
import { supabaseAdmin } from "@/lib/supabase/admin";

export const runtime = "nodejs";

const ALLOWED_TYPES = {
  "image/jpeg": "jpg",
  "image/jpg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
};

const MAX_BYTES = 8 * 1024 * 1024;
const BUCKET = "product-images";

function slugify(str) {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export async function POST(request) {
  if (!(await isAdminAuthed())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const formData = await request.formData();
  const file = formData.get("file");
  if (!file || typeof file === "string") {
    return NextResponse.json({ error: "No file provided." }, { status: 400 });
  }

  const ext = ALLOWED_TYPES[file.type];
  if (!ext) {
    return NextResponse.json({ error: "Only JPG, PNG or WebP images are allowed." }, { status: 400 });
  }
  if (file.size > MAX_BYTES) {
    return NextResponse.json({ error: "Image must be under 8MB." }, { status: 400 });
  }

  const baseName = slugify(file.name.replace(/\.[^.]+$/, "")) || "image";
  const fileName = `${baseName}-${Date.now()}.${ext}`;
  const bytes = Buffer.from(await file.arrayBuffer());

  const { error } = await supabaseAdmin()
    .storage.from(BUCKET)
    .upload(fileName, bytes, { contentType: file.type, upsert: false });
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const {
    data: { publicUrl },
  } = supabaseAdmin().storage.from(BUCKET).getPublicUrl(fileName);

  return NextResponse.json({ path: publicUrl }, { status: 201 });
}
