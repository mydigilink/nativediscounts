import clientPromise from "@/lib/mongodb";import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your_secret_key";

export async function GET(req, { params }) {
      // ✅ params is a Promise-like, so await it first
    const { id } = await params;
  const client = await clientPromise;
  const db = client.db(process.env.DB_NAME);
  const author = await db.collection("authors").findOne({ _id: new ObjectId(id) });
  
    if (!author) {
      return new Response(JSON.stringify({ error: "Author not found" }), { status: 404 });
    }

      delete author.password;
  return new Response(JSON.stringify(author), { status: 200 });
}

export async function PUT(req, { params }) {
  try {
    const body = await req.json();
    delete body._id; // ✅ prevent accidental overwrite of _id

    const client = await clientPromise;
    const db = client.db(process.env.DB_NAME);

    let updateFields = { ...body, lastUpdated: new Date() };

    // ✅ only hash if password is a non-empty string
    if (body.password && typeof body.password === "string" && body.password.trim() !== "") {
      updateFields.password = await bcrypt.hash(body.password, 10);
    } else {
      delete updateFields.password; // don’t overwrite with empty string
    }

    const result = await db.collection("authors").updateOne(
      { _id: new ObjectId(params.id) },
      { $set: updateFields }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: "Author not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
export async function DELETE(req, { params }) {
  const client = await clientPromise;
  const db = client.db(process.env.DB_NAME);
  await db.collection("authors").deleteOne({ _id: new ObjectId(params.id) });
  return new Response(JSON.stringify({ success: true }), { status: 200 });
}
