import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";

export async function GET(req, { params }) {
     const { id } = await params; // ✅ await the params

  const client = await clientPromise;
  const db = client.db(process.env.DB_NAME);
  const country = await db.collection("countries").findOne({
    _id: new ObjectId(id),
  });
  return NextResponse.json(country);
}

export async function PUT(req, { params }) {
  const { id } = params; // no need for await

  try {
    const client = await clientPromise;
    const db = client.db(process.env.DB_NAME);

    const body = await req.json();
    const { _id, ...updateData } = body;

    // Perform the update
    const result = await db.collection("countries").updateOne(
      { _id: new ObjectId(id) },
      { $set: updateData }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: "Country not found" }, { status: 404 });
    }

    // Fetch the updated document explicitly
    const updatedCountry = await db
      .collection("countries")
      .findOne({ _id: new ObjectId(id) });

    return NextResponse.json(updatedCountry);
  } catch (error) {
    console.error("PUT /countries error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
export async function DELETE(req, { params }) {
  const client = await clientPromise;
  const db = client.db(process.env.DB_NAME);
  const result = await db
    .collection("countries")
    .deleteOne({ _id: new ObjectId(params.id) });
  return NextResponse.json(result);
}
