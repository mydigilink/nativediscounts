import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";
export async function PUT(req, { params }) {
  try {
       const { id } = await params; // params is already available, no need for await
    const client = await clientPromise;
    const db = client.db(process.env.DB_NAME);

    const body = await req.json();
    const { _id, ...updateData } = body;

    const result = await db.collection("brands").findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: updateData },
      { returnDocument: "after" } // returns updated doc
    );
console.log(result,"result value");
       if (!result) {
      return NextResponse.json({ error: "Brand not found" }, { status: 404 });
    }

    // Convert ObjectId to string
    return NextResponse.json(serializeDoc(result));
  } catch (error) {
    console.error("PUT /brands error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}


export async function GET(req, { params }) {
  try {
    const { id } = await params;
    const client = await clientPromise;
    const db = client.db(process.env.DB_NAME);

    const brand = await db.collection("brands").findOne({ _id: new ObjectId(id) });

    if (!brand) {
      return NextResponse.json({ error: "Brand not found" }, { status: 404 });
    }

    return NextResponse.json(brand);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  try {
    const { id } = await params;
    const client = await clientPromise;
    const db = client.db(process.env.DB_NAME);

    const result = await db.collection("brands").deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: "Brand not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Brand deleted successfully" });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}


function serializeDoc(doc) {
  return {
    ...doc,
    _id: doc._id.toString(),
    // also handle nested ObjectIds if needed
  };
}