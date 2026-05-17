import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function GET() {
  try {
    // const client = await clientPromise;
    // const db = client.db();
 const client = await clientPromise;
    const db = client.db(process.env.DB_NAME);

    // find all coupons for the brand
    // const coupons = await db
    //   .collection("coupons") 
    const activeDeals = await db.collection("coupons").countDocuments({
        enabled : true,
    });

    const featuredDeals = await db.collection("brands").countDocuments({
       featuredBrand: true,
    });
// console.log("Active Deals:", activeDeals);
// console.log("Featured Deals:", featuredDeals);
    const partnerStores = await db.collection("brands").countDocuments({
        
status:'Active'
    });

    return NextResponse.json({
      activeDeals,
      partnerStores,
      happySavers: activeDeals * 5,
      featuredDeals,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Failed to fetch stats",
      },
      {
        status: 500,
      }
    );
  }
}