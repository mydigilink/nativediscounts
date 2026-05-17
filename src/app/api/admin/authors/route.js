
import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import bcrypt from "bcryptjs";
export async function GET() {
  const client = await clientPromise;
  const db = client.db(process.env.DB_NAME);
  const authors = await db.collection("authors").find().sort({ sortOrder: 1 }).toArray();
  return new Response(JSON.stringify(authors), { status: 200 });
}

export async function POST(req) {
  try {
    const client = await clientPromise;
    const db = client.db(process.env.DB_NAME);

    const body = await req.json();

    let authorData = { ...body, lastUpdated: new Date() };

    // ✅ Hash password if provided
    if (body.password && typeof body.password === "string" && body.password.trim() !== "") {
      authorData.password = await bcrypt.hash(body.password, 10);
    }

    const result = await db.collection("authors").insertOne(authorData);

    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// export async function POST(req) {
//   const client = await clientPromise;
//   const db = client.db(process.env.DB_NAME);

//   const formData = await req.formData();
//   const body = Object.fromEntries(formData.entries()); // convert to object

//   const result = await db.collection("authors").insertOne({
//     ...body,
//     lastUpdated: new Date(),
//   });

//   return NextResponse.json({ success: true, result });
// }