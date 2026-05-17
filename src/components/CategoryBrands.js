// components/CategoryBrands.js
"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function CategoryBrands({ categoryId, country }) {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchBrands() {
    try {
      setLoading(true);
      const res = await fetch(
        `/api/v1/brands?field=category&value=${categoryId}&country=${country}`
      );
      if (!res.ok) throw new Error("Failed to load brands");
      const data = await res.json();
      setBrands(data);
    } catch (err) {
      console.error("Error loading category brands:", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (categoryId) fetchBrands();
  }, [categoryId, country]);

  if (loading) return <p>Loading brands...</p>;
  if (brands.length === 0)
    return <p className="text-muted">No brands found in this category.</p>;

  return (
    <div className="row g-4">
      {brands.map((brand, idx) => (
        <div className="col-6 col-md-2" key={idx}>
          <Link href={`/${brand.pageSlug}`} className="text-decoration-none">
            <div className="card border-0 shadow-sm h-100">
              <div
                className="d-flex align-items-center justify-content-center bg-white border-bottom"
                style={{ height: "150px" }}
              >
                <Image
                  src={brand.brandLogo}
                  alt={brand.brandName}
                  width={150}
                  height={150}
                  style={{ objectFit: "contain", maxHeight: "149px" }}
                />
              </div>
              <div className="card-body text-center">
                <div className="fw-semibold small">{brand.brandName}</div>
                {brand.exclusive && (
                  <span className="badge bg-danger text-white mt-1">
                    EXCLUSIVE
                  </span>
                )}
              </div>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
}
