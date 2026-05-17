"use server";

import { notFound } from "next/navigation";
import BrandClient from "@/components/BrandClient";

const now = new Date();
const month = now.toLocaleString("default", { month: "long" });
const year = now.getFullYear();

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.nativediscounts.com";

const locale = "en_US";

/* =========================
   Fetch Brand
========================= */
async function getBrand(country, slug) {
  try {
    const res = await fetch(
      `${BASE_URL}/api/brands/${slug}?country=${country}`,
      { next: { revalidate: 300 } }
    );

    let data = null;
    try {
      data = await res.json();
    } catch {
      return null;
    }

    if (!res.ok || data?.error) return null;
    return data;
  } catch {
    return null;
  }
}

/* =========================
   Fetch Coupons
========================= */
async function getCoupons(slug) {
  try {
    const res = await fetch(
      `${BASE_URL}/api/coupons/${slug}`, // ✅ FIXED URL
      { next: { revalidate: 300 } } // ✅ REMOVED no-store
    );

    let data = null;
    try {
      data = await res.json();
    } catch {
      return [];
    }

    if (!res.ok || data?.error) return [];
    return data;
  } catch {
    return [];
  }
}

/* =========================
   Fetch Similar Brands
========================= */
async function getSimilarBrands(slug) {
  try {
    const res = await fetch(
      `${BASE_URL}/api/similar-brands/${slug}`, // ✅ FIXED URL
      { next: { revalidate: 300 } }
    );

    let data = null;
    try {
      data = await res.json();
    } catch {
      return [];
    }

    if (!res.ok || data?.error) return [];
    return data.similarBrands || [];
  } catch {
    return [];
  }
}

/* =========================
   Metadata
========================= */
export async function generateMetadata({ params }) {
  const { brands } = params;
  const country = "us";

  const brand = await getBrand(country, brands);

  // ❌ Invalid page → noindex
  if (!brand) {
    return {
      title: "Brand Not Found",
      description: "This brand does not exist or is unavailable.",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const coupons = await getCoupons(brands);

  const isExpired = (date) => {
    if (!date) return false;
    return new Date(date) < new Date();
  };

  let selectedCoupon =
    coupons?.find(
      (c) =>
        String(c.inputType) === "3" &&
        c.discount &&
        c.discount.trim() !== "" &&
        !isExpired(c.endDate)
    ) ||
    coupons?.find(
      (c) =>
        c.discount &&
        c.discount.trim() !== "" &&
        !isExpired(c.endDate)
    );

  const discount = selectedCoupon?.discount?.trim() || "35% OFF";

  const seoTitle = brand.seoTitle
    ? brand.seoTitle
        .replace(/\[DISCOUNT\]/g, discount)
        .replace(/\[BRAND\]/g, brand.brandName)
        .replace(/\[COUNTRY\]/g, country.toUpperCase())
        .replace(/\[MONTH\]/g, month)
        .replace(/\[YEAR\]/g, year)
    : `${brand.brandName} ${discount} Discount Codes ${month} ${year}`;

  const seoDescription = brand.seoDescription
    ? brand.seoDescription
        .replace(/\[DISCOUNT\]/g, discount)
        .replace(/\[BRAND\]/g, brand.brandName)
        .replace(/\[COUNTRY\]/g, country.toUpperCase())
        .replace(/\[MONTH\]/g, month)
        .replace(/\[YEAR\]/g, year)
    : `Save with ${discount} ${brand.brandName} coupon codes and deals.`;

  const image = `https://www.nativediscounts.com${brand.brandLogo.replace(
    /\s/g,
    "%20"
  )}`;

  const baseUrl = "https://www.nativediscounts.com";

  return {
    title: seoTitle,
    description: seoDescription,

    // ✅ FORCE INDEXING
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
      },
    },

    alternates: {
      canonical: `${baseUrl}/${brands}`,
    },

    openGraph: {
      title: seoTitle,
      description: seoDescription,
      siteName: "NativeDiscounts",
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: `${brand.brandName} Logo`,
        },
      ],
      locale,
      type: "website",
    },

    twitter: {
      card: "summary_large_image",
      title: seoTitle,
      description: seoDescription,
      images: [image],
    },
  };
}

/* =========================
   Page
========================= */
export default async function BrandPage({ params, searchParams }) {
 try{ const country = "us";
  const { brands } = params;
  const rc = searchParams?.rc || null;

  const brand = await getBrand(country, brands);
  if (!brand) notFound();

  const coupons = await getCoupons(brands);
  const similarBrands = await getSimilarBrands(brands);

  const baseUrl = "https://www.nativediscounts.com";
  const pageUrl = `${baseUrl}/${brands}`;

  const schemaData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${baseUrl}/#organization`,
        name: "Native Discounts",
        url: baseUrl,
      },
      {
        "@type": "WebSite",
        "@id": `${baseUrl}/#website`,
        url: baseUrl,
        name: "Native Discounts",
      },
      {
        "@type": "WebPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: `${brand.brandName} Coupon Codes & Deals (${month} ${year})`,
        inLanguage: "en",
      },
    ],
  };

  return (
    <>
      <BrandClient
        brand={brand}
        coupons={coupons}
        rc={rc}
        country={country}
        similarBrands={similarBrands}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
    </>
  ); } catch (error) {
    console.error("PAGE ERROR:", error);

    return (
      <div style={{ padding: 20 }}>
        <h1>Page Error</h1>
        <p>Something went wrong</p>
      </div>
    );
  }
}