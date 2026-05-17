import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function GET() {
  try {
    // const { slug } = params; // no need to await here
    const client = await clientPromise;
    const db = client.db(process.env.DB_NAME);

    // find all coupons for the brand
    const coupons = await db
      .collection("coupons")
      .find({ })
      .limit(50) // set your limit here
      .toArray();

    if (!coupons || coupons.length === 0) {
      return NextResponse.json(
        { error: "coupons not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(coupons);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
