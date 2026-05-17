import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET() {
  const client = await clientPromise;
  const db = client.db(process.env.DB_NAME);
  const countries = await db.collection("countries").find().toArray();
  return NextResponse.json(countries);
}

export async function POST(req) {
  const data = await req.json();
  const client = await clientPromise;
  const db = client.db(process.env.DB_NAME);
  const result = await db.collection("countries").insertOne(data);
  return NextResponse.json(result);
}
