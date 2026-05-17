import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

// --- In-memory cache ---
const cache = new Map();
// Cache TTL in milliseconds (e.g., 60 seconds)
const CACHE_TTL = 60 * 1000;

export async function GET(req, { params }) {
  const { slug } = params;

  try {
    const { searchParams } = new URL(req.url);

    const limit = parseInt(searchParams.get("limit")) || 20;
    const page = parseInt(searchParams.get("page")) || 1;
    const field = searchParams.get("field");
    const value = searchParams.get("value");
    const order = searchParams.get("order") || "desc";
    const ordername = searchParams.get("ordername") || "dates.addedDate";

    // --- Generate cache key based on all query params ---
    const cacheKey = `${slug}|${field || ""}|${value || ""}|${order}|${ordername}|${limit}|${page}`;
    const cached = cache.get(cacheKey);
    if (cached && cached.expiry > Date.now()) {
      return NextResponse.json(cached.data);
    }

    const client = await clientPromise;
    const db = client.db(process.env.DB_NAME);

    // Build dynamic filter
    let filter = {};
    if (field && value !== null) {
      let parsedValue = value;

      if (value === "true") parsedValue = true;
      else if (value === "false") parsedValue = false;
      else if (!isNaN(value)) parsedValue = Number(value);

      filter[field] = parsedValue;
    }

    const skip = (page - 1) * limit;
    const sortOrder = order.toLowerCase() === "asc" ? 1 : -1;

    const cursor = db.collection(slug).aggregate([
      { $match: filter },
      {
        $lookup: {
          from: "coupons",
          localField: "pageSlug",
          foreignField: "brand",
          as: "brandCoupons"
        }
      },
      {
        $addFields: {
          couponCount: { $size: "$brandCoupons" },
          firstCoupon: { $arrayElemAt: ["$brandCoupons", 0] }
        }
      },
      {
        $project: {
          _id: 0,
          brandCoupons: 0
        }
      },
      { $sort: { [ordername]: sortOrder } },
      { $skip: skip },
      { $limit: limit }
    ]);

    const docs = await cursor.toArray();

    // --- Store result in cache ---
    cache.set(cacheKey, {
      data: docs,
      expiry: Date.now() + CACHE_TTL
    });

    return NextResponse.json(docs);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
