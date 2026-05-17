import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function GET(req, context) {
  try {
    // ✅ params must be awaited
    const { slug } = await context.params;

    // get country from query string
    const { searchParams } = new URL(req.url);
    const country = searchParams.get("country");

    const client = await clientPromise;
    const db = client.db(process.env.DB_NAME);

    // match both slug + country
    const brand = await db.collection("brands").findOne({
      pageSlug: slug,
      country: country,
    });

    if (!brand) {
      return NextResponse.json(
        { error: "Brand not found" },
        { status: 404 }
      );
    }

    // optional: make _id a string
    brand._id = brand._id.toString();

    return NextResponse.json(brand);
  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
