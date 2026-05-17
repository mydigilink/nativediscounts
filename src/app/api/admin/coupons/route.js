import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

// Helper: Convert ObjectId → 7-digit number
function objectIdTo7DigitNumber(objectId) {
  const hex = objectId.toString();
  const num = parseInt(hex.substring(0, 12), 16);
  return (num % 10000000).toString().padStart(7, "0");
}

/* =========================
   CREATE Coupon
========================= */
export async function POST(req) {
  const client = await clientPromise;
  const db = client.db(process.env.DB_NAME);

  const body = await req.json();

  const result = await db.collection("coupons").insertOne({
    ...body,
    enabled: body.enabled ?? true,
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  const shortCode = objectIdTo7DigitNumber(result.insertedId);

  await db.collection("coupons").updateOne(
    { _id: result.insertedId },
    { $set: { shortCode } }
  );

  // ❌ Do NOT cache mutations
  return NextResponse.json(
    { success: true, id: result.insertedId, shortCode },
    { status: 201 }
  );
}

/* =========================
   READ Coupons (CACHED)
========================= */
// export async function GET() {
//   const client = await clientPromise;
//   const db = client.db(process.env.DB_NAME);

//   const coupons = await db
//     .collection("coupons")
//     .find()
//     .sort({ createdAt: -1 })
//     .toArray();

//   return NextResponse.json(coupons, {
//     headers: {
//       // 🔥 Cache for 60s (Browser + CDN)
//       "Cache-Control": "public, s-maxage=60, stale-while-revalidate=30",
//     },
//   });
// }

export async function GET(req) {
  try {
    const client = await clientPromise;
    const db = client.db(process.env.DB_NAME);

    const { searchParams } = new URL(req.url);

    const page = Number(searchParams.get("page")) || 1;
    const limit = Number(searchParams.get("limit")) || 10;
    const skip = (page - 1) * limit;

    const brand = searchParams.get("brand");
    const offerType = searchParams.get("offerType");
    const country = searchParams.get("country");

    // 🔹 Build filter
    const filter = {};
    if (brand) filter.brand = { $regex: brand, $options: "i" };
    if (offerType) filter.offerType = offerType;
    if (country) filter.country = country;

    const [coupons, total] = await Promise.all([
      db
        .collection("coupons")
        .find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .toArray(),

      db.collection("coupons").countDocuments(filter),
    ]);

    return NextResponse.json(
      { coupons, total, page, limit },
      {
        headers: {
          // 🔥 cache GET safely
          "Cache-Control": "public, s-maxage=60, stale-while-revalidate=30",
        },
      }
    );
  } catch (error) {
    console.error("Coupons GET error:", error);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}

/* =========================
   UPDATE Coupon
========================= */
export async function PUT(req) {
  const client = await clientPromise;
  const db = client.db(process.env.DB_NAME);

  const { id, ...body } = await req.json();

  await db.collection("coupons").updateOne(
    { _id: new ObjectId(id) },
    { $set: { ...body, updatedAt: new Date() } }
  );

  return NextResponse.json({ success: true });
}

/* =========================
   DELETE Coupon
========================= */
export async function DELETE(req) {
  const client = await clientPromise;
  const db = client.db(process.env.DB_NAME);

  const { id } = await req.json();

  await db.collection("coupons").deleteOne({
    _id: new ObjectId(id),
  });

  return NextResponse.json({ success: true });
}
