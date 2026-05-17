// app/[country]/[slug]/page.js

import clientPromise from "@/lib/mongodb";
import { notFound } from "next/navigation";
import Link from "next/link";
import CategoryBrands from "@/components/CategoryBrands";

/* ================= SEO ================= */
export async function generateMetadata({ params }) {
  const { country, slug: pageSlug } = params;

  const client = await clientPromise;
  const db = client.db(process.env.DB_NAME);

  const category = await db.collection("categories").findOne({
    pageSlug,
    status: "Active",
  });

  if (!category) {
    return {
      title: "Categories | NativeDiscounts",
      description: "Browse all shopping categories on NativeDiscounts.",
    };
  }

  const baseUrl = "https://www.nativediscounts.com";
  const canonical = `${baseUrl}/cats/${pageSlug}`;

  const title = category.seoTitle || category.categoryTitle;
  const description =
    category.seoDescription || category.introText || "";
  const image =
    category.heroBannerImage ||
    `${baseUrl}/default-og.jpg`;

  return {
    title,
    description,
    keywords: category.seoKeywords || "",

    alternates: {
      canonical,
    },

    openGraph: {
      title,
      description,
      url: canonical,
      type: "website",
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },

    other: {
      "og:locale": country === "us" ? "en_US" : "en",
    },
  };
}

/* ================= PAGE ================= */
export default async function CategoryListingPage({ params }) {
  const { country, slug: pageSlug } = params;

  const client = await clientPromise;
  const db = client.db(process.env.DB_NAME);

  const CategoryDoc = await db.collection("categories").findOne({
    pageSlug,
    status: "Active",
  });

  if (!CategoryDoc) {
    notFound();
  }

  const baseUrl = "https://www.nativediscounts.com";
  const pageUrl = `${baseUrl}/cats/${pageSlug}`;

  /* ================= JSON-LD ================= */
  const jsonLd = {
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
        publisher: {
          "@id": `${baseUrl}/#organization`,
        },
      },
      {
        "@type": "WebPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: CategoryDoc.categoryTitle,
        description:
          CategoryDoc.seoDescription ||
          CategoryDoc.introText ||
          "",
        isPartOf: {
          "@id": `${baseUrl}/#website`,
        },
        breadcrumb: {
          "@id": `${pageUrl}#breadcrumb`,
        },
        inLanguage: "en",
      },
      {
        "@type": "CollectionPage",
        "@id": `${pageUrl}#collection`,
        name: CategoryDoc.categoryTitle,
        description:
          CategoryDoc.seoDescription ||
          CategoryDoc.introText ||
          "",
        url: pageUrl,
        image: CategoryDoc.heroBannerImage || "",
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${pageUrl}#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: baseUrl,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Categories",
            item: `${baseUrl}/cats`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: CategoryDoc.categoryTitle,
            item: pageUrl,
          },
        ],
      },
      {
        "@type": "ItemList",
        "@id": `${pageUrl}#itemlist`,
        itemListElement: (CategoryDoc?.topBrands || [])
          .slice(0, 10)
          .map((brand, index) => ({
            "@type": "ListItem",
            position: index + 1,
            url: `${baseUrl}/${brand.pageSlug}`,
          })),
      },
    ],
  };

  return (
    <main className="container py-4">
      {/* ✅ JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd),
        }}
      />

      {/* Breadcrumb UI */}
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link href="/">Home</Link>
          </li>
          <li className="breadcrumb-item">
            <Link href="/cats">All Categories</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            {CategoryDoc.categoryTitle}
          </li>
        </ol>
      </nav>

      {/* Title */}
      <h1>{CategoryDoc.categoryTitle}</h1>

      {/* Intro */}
      {CategoryDoc.introText && (
        <p className="text-muted">{CategoryDoc.introText}</p>
      )}

      {/* Banner */}
      {CategoryDoc.heroBannerImage && (
        <img
          src={CategoryDoc.heroBannerImage}
          alt={
            CategoryDoc.heroHeading ||
            CategoryDoc.categoryTitle
          }
          className="img-fluid my-3 rounded shadow-sm"
        />
      )}

      {/* Brands */}
      <section className="mt-5">
        <CategoryBrands
          categorySlug={pageSlug}
          categoryId={CategoryDoc._id.toString()}
          country={country}
        />
      </section>
    </main>
  );
}