import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function GET(req) {
  try {
    const client = await clientPromise;
    const db = client.db(process.env.DB_NAME);

    const { searchParams } = new URL(req.url);
    const q = searchParams.get("q") || "";

    if (!q.trim()) {
      return NextResponse.json({
        status: "success",
        query: q,
        data: {
          coupons: [],
          brands: [],
          categories: [],
        },
      });
    }

    const regexQuery = { $regex: q, $options: "i" };

    const [coupons, brands, categories] = await Promise.all([
      db
        .collection("coupons")
        .find({
          $or: [
            { title: regexQuery },
            { couponTitle: regexQuery },
            { shortDescription: regexQuery },
            { description: regexQuery },
            { couponCode: regexQuery },
            { brand: regexQuery },
            { brandName: regexQuery },
            { pageSlug: regexQuery },
            { shortCode: regexQuery },
          ],
        })
        .limit(10)
        .toArray(),

      db
        .collection("brands")
        .find({
          $or: [
            { brandName: regexQuery },
            { brandTitle: regexQuery },
            { brandUrl: regexQuery },
            { pageSlug: regexQuery },
            { aboutCompany: regexQuery },
          ],
        })
        .limit(10)
        .toArray(),

      db
        .collection("categories")
        .find({
        //   $or: [
        //     { categoryTitle: regexQuery },
        //     { seoTitle: regexQuery },
        //     { pageSlug: regexQuery }
        //   ],
        })
        .limit(10)
        .toArray(),
    ]);

    return NextResponse.json({
      status: "success",
      query: q,
      data: {
        coupons,
        brands,
        categories,
      },
    });
  } catch (error) {
    return NextResponse.json(
      {
        status: "error",
        message: error.message,
      },
      { status: 500 }
    );
  }
}