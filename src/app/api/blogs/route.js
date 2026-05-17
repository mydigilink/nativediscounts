import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db(process.env.DB_NAME); // change DB name as needed
    const blogs = await db.collection("blogs").find().toArray();
    return NextResponse.json(blogs);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const client = await clientPromise;
    const db = client.db(process.env.DB_NAME);
    const body = await req.json();
    const result = await db.collection("blogs").insertOne(body);
    return NextResponse.json({ _id: result.insertedId, ...body });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
