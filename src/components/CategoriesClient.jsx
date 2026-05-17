"use client";

import useSWR from "swr";
import Link from "next/link";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function CategoriesClient() {
  const {
    data: categories,
    error,
    isLoading,
  } = useSWR("/api/v1/categories?limit=20", fetcher, {
    dedupingInterval: 24 * 60 * 60 * 1000,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    refreshInterval: 0,
  });

  if (isLoading)
    return <p className="text-center py-4">Loading categories...</p>;

  if (error)
    return (
      <p className="text-center py-4 text-red-500">
        Failed to load categories
      </p>
    );

  /* ✅ Dynamic Schema */
  const schemaData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://www.nativediscounts.com/#organization",
        name: "Native Discounts",
        url: "https://www.nativediscounts.com/",
      },
      {
        "@type": "WebSite",
        "@id": "https://www.nativediscounts.com/#website",
        url: "https://www.nativediscounts.com/",
        name: "Native Discounts",
        publisher: {
          "@id": "https://www.nativediscounts.com/#organization",
        },
      },
      {
        "@type": "WebPage",
        "@id":
          "https://www.nativediscounts.com/cats/#webpage",
        url: "https://www.nativediscounts.com/cats",
        name: "All Categories",
        description:
          "Browse all categories and discover deals, coupons and offers.",
        isPartOf: {
          "@id": "https://www.nativediscounts.com/#website",
        },
        breadcrumb: {
          "@id":
            "https://www.nativediscounts.com/cats/#breadcrumb",
        },
        inLanguage: "en",
      },
      {
        "@type": "BreadcrumbList",
        "@id":
          "https://www.nativediscounts.com/cats/#breadcrumb",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: "https://www.nativediscounts.com/",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Categories",
            item: "https://www.nativediscounts.com/cats",
          },
        ],
      },
      {
        "@type": "ItemList",
        "@id":
          "https://www.nativediscounts.com/cats/#itemlist",
        itemListElement: categories.slice(0, 10).map((cat, i) => ({
          "@type": "ListItem",
          position: i + 1,
          url: `https://www.nativediscounts.com/cats/${cat.pageSlug}`,
        })),
      },
    ],
  };

  return (
    <>
      {/* ✅ JSON-LD (works in client too) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schemaData),
        }}
      />

      <div className="container py-4">
        <h1 className="mb-4">All Categories</h1>

        <ul className="list-group list-group-flush">
          {categories.map((cat, idx) => (
            <li
              key={idx}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              <Link
                href={`/cats/${cat.pageSlug || "#"}`}
                className="text-decoration-none fw-semibold"
              >
                <img
                  height={25}
                  width={25}
                  className="m-2"
                  src={cat.categoryImage}
                />
                {cat.categoryTitle}
              </Link>
              <span>&#8250;</span>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}