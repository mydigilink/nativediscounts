"use client";

import { useState, useEffect } from "react";
import useSWR from "swr";
import Link from "next/link";
import Image from "next/image";

const LIMIT = 18;
const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Stores({ params }) {
  const { country } = params;
  const [page, setPage] = useState(1);
  const [sortOption, setSortOption] = useState("all");
  const [brands, setBrands] = useState([]);
  const [hasMore, setHasMore] = useState(true);

  // --- stable SWR key ---
  const getApiUrl = (page) => {
    let orderParam = "";
    let orderNameParam = "";

    if (sortOption === "A-Z") {
      orderParam = "asc";
      orderNameParam = "brandName";
    } else if (sortOption === "Z-A") {
      orderParam = "desc";
      orderNameParam = "brandName";
    }

    return `/api/v1/brands?field=country&value=us&limit=${LIMIT}&page=${page}${
      orderParam && orderNameParam ? `&order=${orderParam}&ordername=${orderNameParam}` : ""
    }`;
  };

  const { data, error } = useSWR(getApiUrl(page), fetcher, {
    revalidateOnFocus: false,
    dedupingInterval: 60000,
    keepPreviousData: true,
  });

  // --- append new page data only ---
  useEffect(() => {
    if (!data) return;

    if (page === 1) setBrands(data);
    else setBrands((prev) => [...prev, ...data]);

    setHasMore(data.length >= LIMIT);
  }, [data, page]);

  // --- reset brands only when country or sortOption changes ---
  useEffect(() => {
    setPage(1);
    setBrands([]);       // clear previous brands
    setHasMore(true);    // reset hasMore
  }, [country, sortOption]);

  const handleLoadMore = () => {
    if (!hasMore) return;
    setPage((prev) => prev + 1);
  };

  if (error) return <p>Failed to load brands</p>;
  if (!data && page === 1) return <p>Loading...</p>;

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h1>All Stores</h1>
        <select
          className="form-select w-auto"
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
        >
          <option value="all">Default / All</option>
          <option value="A-Z">A - Z</option>
          <option value="Z-A">Z - A</option>
        </select>
      </div>

      <div className="row g-4">
        {brands.map((brand, idx) => (
          <div className="col-6 col-md-2" key={idx}>
            <Link href={`/${brand.pageSlug}`} className="text-decoration-none">
              <div className="card shadow-sm h-100 border-0">
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
                <div className="card-body">
                  <div className="text-muted small">{brand.brandName}</div>
                  <div className="text-sm mt-1">
                    {brand.exclusive && (
                      <span className="badge bg-danger text-white">EXCLUSIVE</span>
                    )}{" "}
                    {brand.offerDescription || `Check deals at ${brand.brandName}`}
                  </div>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>

      {hasMore && (
        <div className="mt-4 text-center">
          <button className="btn btn-theme" onClick={handleLoadMore}>
            Load More
          </button>
        </div>
      )}
    </div>
  );
}
