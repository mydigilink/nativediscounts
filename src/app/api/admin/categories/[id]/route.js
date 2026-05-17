// src/app/api/categories/route.js
import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";


export async function GET(req, { params }) {
  try {
    const { id } = await params;
    const client = await clientPromise;
    const db = client.db(process.env.DB_NAME);

    const brand = await db.collection("categories").findOne({ _id: new ObjectId(id) });

    if (!brand) {
      return NextResponse.json({ error: "categories not found" }, { status: 404 });
    }

    return NextResponse.json(brand);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
export async function GET__(req) {
  console.log(req)
  try {
    const client = await clientPromise;
    const db = client.db(process.env.DB_NAME);

    const { search, page = 1, limit = 5 } = Object.fromEntries(
      req.nextUrl.searchParams
    );

    const skip = (page - 1) * limit;

    const query = search
      ? {
          $or: [
            { categoryTitle: { $regex: search, $options: "i" } },
            { pageSlug: { $regex: search, $options: "i" } },
            { _id: { $regex: search, $options: "i" } },
          ],
        }
      : {};

    const [categories, total] = await Promise.all([
      db.collection("categories").find(query).skip(skip).limit(Number(limit)).toArray(),
      db.collection("categories").countDocuments(query),
    ]);

    return NextResponse.json({ categories, total });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req) {
  const client = await clientPromise;
  const db = client.db(process.env.DB_NAME);

  const body = await req.json();
  const result = await db.collection("categories").insertOne({
    ...body,
    lastUpdated: new Date(),
  });

  return NextResponse.json(result);
}
import { ObjectId } from "mongodb";


export async function PUT(req, { params }) {
  try {
    const { id } = params;
    const client = await clientPromise;
    const db = client.db(process.env.DB_NAME);

    const body = await req.json();
    const { _id, ...updateData } = body;

    const result = await db
      .collection("categories")
      .updateOne({ _id: new ObjectId(id) }, { $set: updateData });

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: "Category not found" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: "Category updated successfully",
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
export async function PUT__(req, { params }) {
  const { id } = params;
  const client = await clientPromise;
  const db = client.db(process.env.DB_NAME);

  const body = await req.json();
  const { _id, ...updateData } = body;

  const result = await db
    .collection("categories")
    .updateOne({ _id: new ObjectId(id) }, { $set: updateData });

  if (result.matchedCount === 0) {
    return NextResponse.json({ error: "Category not found" }, { status: 404 });
  }

  const updated = await db
    .collection("categories")
    .findOne({ _id: new ObjectId(id) });

  return NextResponse.json(updated);
}
export async function DELETE(req, { params }) {
  const { id } = params;
  const client = await clientPromise;
  const db = client.db(process.env.DB_NAME);

  const result = await db
    .collection("categories")
    .deleteOne({ _id: new ObjectId(id) });
return NextResponse.json({
      success: true,
      message: "Category Deleted successfully",
    });
  //return NextResponse.json(result);
}
