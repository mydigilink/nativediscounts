"use client";

import useSWR from "swr";
import Link from "next/link";
import { useState } from "react";

const fetcher = (url) => fetch(url).then((res) => res.json());
const LIMIT = 10;

export default function BrandList() {
  const [page, setPage] = useState(1);
  const [letter, setLetter] = useState(""); // A-Z filter

  const { data, isLoading, error, mutate } = useSWR(
    `/api/admin/brands?page=${page}&limit=${LIMIT}&letter=${letter}`,
    fetcher,
    {
      keepPreviousData: true,
      revalidateOnFocus: false,
      dedupingInterval: 60000,
    }
  );

  const brands = data?.brands || [];
  const total = data?.total || 0;
  const totalPages = Math.ceil(total / LIMIT);

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this brand?")) return;

    await fetch(`/api/admin/brands/${id}`, { method: "DELETE" });

    mutate(
      {
        ...data,
        brands: brands.filter((b) => b._id !== id),
        total: total - 1,
      },
      false
    );
  };

  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

  if (isLoading) return <p>Loading brands...</p>;
  if (error) return <p>Failed to load brands</p>;

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Brand List</h2>
        <Link href="/admin/brand-editor" className="btn btn-primary">
          Add New Brand
        </Link>
      </div>

       {/* A-Z + 0-9 Filter */}
<div className="mb-3">
  <div className="d-flex flex-wrap gap-2">
    
    {/* All */}
    <button
      className={`btn btn-sm ${
        letter === "" ? "btn-dark" : "btn-outline-dark"
      }`}
      onClick={() => {
        setLetter("");
        setPage(1);
      }}
    >
      All
    </button>

    {/* 0-9 */}
    <button
      className={`btn btn-sm ${
        letter === "0-9" ? "btn-success" : "btn-outline-success"
      }`}
      onClick={() => {
        setLetter("0-9");
        setPage(1);
      }}
    >
      0-9
    </button>

    {/* A-Z */}
    {alphabet.map((char) => (
      <button
        key={char}
        className={`btn btn-sm ${
          letter === char ? "btn-primary" : "btn-outline-primary"
        }`}
        onClick={() => {
          setLetter(char);
          setPage(1);
        }}
      >
        {char}
      </button>
    ))}
  </div>
</div>


      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th>Brand Logo</th>
            <th>Brand Name</th>
            <th>Coupon Count</th>
            <th>Category</th>
            <th>Status</th>
            <th>Featured</th>
            <th>Popular</th>
            <th>Trending</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {brands.length ? (
            brands.map((brand) => (
              <tr key={brand._id}>
                <td>
                  {brand.brandLogo ? (
                    <img
                      src={brand.brandLogo}
                      alt={brand.brandName}
                      width="60"
                    />
                  ) : (
                    "N/A"
                  )}
                </td>
                <td>{brand.brandName}</td>
                <td>{brand.couponCount}</td>
                <td>{brand.categoryTitle}</td>
                <td>{brand.status}</td>
                <td>{brand.featuredBrand ? "Yes" : "No"}</td>
                <td>{brand.popularBrand ? "Yes" : "No"}</td>
                <td>{brand.trendingBrand ? "Yes" : "No"}</td>
                <td>
                  <Link
                    href={`/admin/brand-editor?id=${brand._id}`}
                    className="btn btn-sm btn-warning me-2"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(brand._id)}
                    className="btn btn-sm btn-danger"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="9" className="text-center">
                No brands found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination */}
      {totalPages > 1 && (
        <nav className="d-flex justify-content-center">
          <ul className="pagination">
            <li className={`page-item ${page === 1 ? "disabled" : ""}`}>
              <button
                className="page-link"
                onClick={() => setPage(page - 1)}
              >
                Prev
              </button>
            </li>

            {[...Array(totalPages)].map((_, i) => (
              <li
                key={i}
                className={`page-item ${page === i + 1 ? "active" : ""}`}
              >
                <button
                  className="page-link"
                  onClick={() => setPage(i + 1)}
                >
                  {i + 1}
                </button>
              </li>
            ))}

            <li
              className={`page-item ${
                page === totalPages ? "disabled" : ""
              }`}
            >
              <button
                className="page-link"
                onClick={() => setPage(page + 1)}
              >
                Next
              </button>
            </li>
          </ul>
        </nav>
      )}
    </div>
  );
}
