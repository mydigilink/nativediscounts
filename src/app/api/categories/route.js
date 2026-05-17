// src/app/api/categories/route.js
import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET(req) {
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
          ],
        }
      : {};

    // const [categories, total] = await Promise.all([
    //   db.collection("categories").find(query).toArray(),
    // //   db.collection("categories").countDocuments(query),
    // ]);
      const categories = await db.collection("categories").find().toArray();
  return NextResponse.json(categories);
//  db.collection("categories").findAll().toArray();
//     return NextResponse.json({ categories, total });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
