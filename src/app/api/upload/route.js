import { promises as fs } from "fs";
import path from "path";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const uploadDir = path.join(process.cwd(), "public/featured");
    await fs.mkdir(uploadDir, { recursive: true });

    // Parse formData (App Router supports this natively)
    const formData = await req.formData();
    const file = formData.get("file");

    if (!file || typeof file === "string") {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    // Convert file to buffer
    const bytes = Buffer.from(await file.arrayBuffer());

    // Save with unique filename
    const filename = Date.now() + "-" + file.name;
    await fs.writeFile(path.join(uploadDir, filename), bytes);

    // Return public URL
    return NextResponse.json({ url: `/featured/${filename}` });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
