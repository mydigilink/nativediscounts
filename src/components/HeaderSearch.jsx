"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function HeaderSearch() {
  const router = useRouter();
  const [search, setSearch] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();

    if (!search.trim()) return;

    // Redirect to search page
    router.push(`/search?q=${encodeURIComponent(search)}`);
  };

  return (
    <form
      role="search"
      aria-label="Site search"
      onSubmit={handleSearch}
      className="d-md-flex flex-grow-1 mx-4 bg-light dheader-search"
      style={{ maxWidth: "500px" }}
    >
      <div className="input-group border-0 shadow-sm bg-light rounded-pill w-100">
        <label htmlFor="desktop-search" className="visually-hidden">
          Search site
        </label>

        <span className="input-group-text bg-light border-0">
          <svg
            viewBox="0 0 18 18"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            focusable="false"
            width="20"
            height="20"
          >
            <path d="M17.641 15.91L14.03 12.3A7.753 7.753 0 0 0 2.27 2.27 7.752 7.752 0 0 0 12.3 14.03l3.612 3.611a1.22 1.22 0 0 0 1.73 0 1.224 1.224 0 0 0 0-1.73zM3.482 12.022a6.045 6.045 0 0 1 0-8.539 5.999 5.999 0 0 1 4.27-1.769c1.612 0 3.129.628 4.27 1.769a6.045 6.045 0 0 1 0 8.54 5.999 5.999 0 0 1-4.27 1.768 6 6 0 0 1-4.27-1.769z" />
          </svg>
        </span>

        <input
          id="desktop-search"
          type="search"
          className="form-control border-0 bg-light p-2"
          placeholder="Search deals, stores or coupons"
          aria-label="Search input"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <button
          type="submit"
          className="btn border-0 bg-transparent px-3"
        >
          Search
        </button>
      </div>
    </form>
  );
}