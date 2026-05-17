import Link from "next/link";
import { Suspense } from "react";
import RecentCouponsClient from "./RecentCouponsClient";

// ✅ FORCE dynamic rendering (CRITICAL FIX)
export const dynamic = "force-dynamic";

// ✅ SEO metadata (App Router safe)
export async function generateMetadata() {
  return {
    title: "Recent Coupons | Native Discounts",
    description:
      "Discover the latest coupons and deals on Native Discounts. Save on your favorite brands with our up-to-date discount codes and offers.",
    keywords:
      "recent coupons, latest deals, discount codes, savings, Native Discounts",
    alternates: {
      canonical: "https://www.nativediscounts.com/recent-coupons",
    },
  };
}

// ✅ Fetch coupons (server-side, NO STATIC CACHE)
async function getCoupons() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SITE_URL}api/coupons`,
      {
        cache: "no-store", // ✅ IMPORTANT
      }
    );

    if (!res.ok) return [];

    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error("Failed to load coupons:", error);
    return [];
  }
}

// ✅ Server Component
export default async function RecentCoupons() {
  const coupons = await getCoupons();

  // Prioritize coupons
  const topInputType = coupons.filter((c) => c.inputType === "3");
  const topOfferType = coupons.filter(
    (c) => c.offerType === "1" && c.inputType !== "3"
  );
  const restOffers = coupons.filter(
    (c) => !(c.inputType === "3" || c.offerType === "1")
  );

  let finalCoupons = [...topInputType, ...topOfferType, ...restOffers];

  // Remove duplicate brands
  const seenBrands = new Set();
  finalCoupons = finalCoupons.filter((coupon) => {
    if (!coupon.brand) return true;
    if (seenBrands.has(coupon.brand)) return false;
    seenBrands.add(coupon.brand);
    return true;
  });

  // Limit results
  finalCoupons = finalCoupons.slice(0, 50);

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb mb-0">
            <li className="breadcrumb-item">
              <Link href="/">Home</Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Recent Coupons
            </li>
          </ol>
        </nav>
      </div>

      <h1 className="mb-3">Recent Coupons</h1>

      {/* ✅ Suspense REQUIRED for useSearchParams */}
      <Suspense fallback={<div>Loading coupons...</div>}>
        <RecentCouponsClient coupons={finalCoupons} />
      </Suspense>
    </div>
  );
}
