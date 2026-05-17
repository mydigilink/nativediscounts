import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

export async function POST(req, { params }) {
  try {
    const { path: folder } = params; // e.g. "countries", "authors", "blogs"
    const formData = await req.formData();
    const file = formData.get("file");

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Directory based on param
    const uploadDir = path.join(process.cwd(), "public/uploads", folder);
    await fs.mkdir(uploadDir, { recursive: true });

    // Unique filename
    const filename = `${Date.now()}-${file.name}`;
    const filePath = path.join(uploadDir, filename);

    await fs.writeFile(filePath, buffer);

    return NextResponse.json({
      url: `/uploads/${folder}/${filename}`,
    });
  } catch (error) {
    console.error("File Upload Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
