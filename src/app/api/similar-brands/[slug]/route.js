import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function GET(req, { params }) {
  try {
    const slug = params.slug;

    // Get country from query params
    const { searchParams } = new URL(req.url);
    const country = searchParams.get("country") || "us";

    const client = await clientPromise;
    const db = client.db(process.env.DB_NAME);
//console.log("Country:", country, "Slug:", slug); // Debugging log
    // STEP 1: Find the main brand using brandSlug
    const mainBrand = await db.collection("brands").findOne({
      pageSlug: slug,
      country: country,
    });

    if (!mainBrand) {
      return NextResponse.json(
        { error: "Brand not found" },
        { status: 404 }
      );
    }

    // STEP 2: Get category from brand
    const category = mainBrand.category;

    if (!category) {
      return NextResponse.json(
        { error: "Brand has no category" },
        { status: 400 }
      );
    }

    // STEP 3: Find similar brands with same category
const similarBrands = await db.collection("brands")
  .find({
    category: category,
    country: country, 
      pageSlug: { $ne: slug }, // exclude main brand by pageSlug
    brandName: { $ne: mainBrand.brandName }, // extra check (brandName)
  })
  .project({
    _id: 0,
    brandName: 1,
    brandSlug: 1,
    brandLogo: 1,
    category: 1,
    pageSlug: 1,    // ✅ added pageSlug
  })
  .limit(10)
  .toArray();

return NextResponse.json({
  mainBrand: mainBrand.brandName,
  category: category,
  similarBrands,
});

  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
