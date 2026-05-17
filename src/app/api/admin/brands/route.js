import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function GET(req) {
  try {
    const client = await clientPromise;
    const db = client.db(process.env.DB_NAME);

    const { searchParams } = new URL(req.url);

    const page = Number(searchParams.get("page")) || 1;
    const limit = Number(searchParams.get("limit")) || 10;
  //  const letter = searchParams.get("letter") || "";
const letter = searchParams.get("letter") || "";

let matchStage = {};

if (letter === "0-9") {
  matchStage = {
    brandName: { $regex: "^[0-9]", $options: "i" },
  };
} else if (letter) {
  matchStage = {
    brandName: { $regex: `^${letter}`, $options: "i" },
  };
}
    const skip = (page - 1) * limit;

    // 🔥 Create filter
  //  let matchStage = {};

    // if (letter) {
    //   matchStage = {
    //     brandName: { $regex: `^${letter}`, $options: "i" },
    //   };
    // }

    const pipeline = [
      { $match: matchStage }, // ✅ Apply A-Z filter FIRST
      {
        $lookup: {
          from: "coupons",
          localField: "pageSlug",
          foreignField: "brand",
          as: "brandCoupons",
        },
      },
      {
        $addFields: {
          couponCount: { $size: "$brandCoupons" },
        },
      },
      {
        $project: {
          brandCoupons: 0,
        },
      },
      { $sort: { _id: -1 } },
      { $skip: skip },
      { $limit: limit },
    ];

    const [brands, total] = await Promise.all([
      db.collection("brands").aggregate(pipeline).toArray(),
      db.collection("brands").countDocuments(matchStage), // ✅ Apply same filter here
    ]);

    return NextResponse.json(
      { brands, total, page, limit },
      {
        headers: {
          "Cache-Control": "public, s-maxage=60, stale-while-revalidate=30",
        },
      }
    );
  } catch (error) {
    console.error("Brands API error:", error);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
export async function POST(req) {
  try {
    const client = await clientPromise;
    const db = client.db(process.env.DB_NAME);

    const data = await req.json();

    const result = await db.collection("brands").insertOne({
      ...data,
      dates: {
        addedDate: new Date(),
        lastUpdatedDate: new Date(),
      },
    });

    return NextResponse.json(
      { success: true, insertedId: result.insertedId },
      { status: 201 }
    );
  } catch (error) {
    console.error("Brand POST error:", error);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
