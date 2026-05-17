import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";


export async function GET(req, { params }) {
  const { slug } = await params; // ✅ await the params
  try {
    const client = await clientPromise;
    const db = client.db(process.env.DB_NAME); // change DB name as needed
    const blogs = await db.collection(slug).find({}, { projection: { _id: 0 } }).toArray();
    return NextResponse.json(blogs);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
