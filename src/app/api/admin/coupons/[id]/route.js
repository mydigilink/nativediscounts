import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";




export async function GET(req, { params }) {
  try {
    const { id } = await params;
    const client = await clientPromise;
    const db = client.db(process.env.DB_NAME);

    const brand = await db.collection("coupons").findOne({ _id: new ObjectId(id) });

    if (!brand) {
      return NextResponse.json({ error: "coupons not found" }, { status: 404 });
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

    const result = await db.collection("coupons").deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: "Coupon not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Coupon deleted successfully" });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(req, { params }) {
  try {
    const client = await clientPromise;
    const db = client.db(process.env.DB_NAME);

    const body = await req.json();

    // ❌ Remove _id so MongoDB doesn't try to update it
    const { _id, ...updateData } = body;

    await db.collection("coupons").updateOne(
      { _id: new ObjectId(params.id) },
      {
        $set: {
          ...updateData,
          updatedAt: new Date(),
        },
      }
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}