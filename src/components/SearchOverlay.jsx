"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SearchOverlay({ show, onClose }) {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState({
    coupons: [],
    brands: [],
    categories: [],
  });

  const pathname = usePathname();
  const overlayRef = useRef(null);

  // CLOSE ON ROUTE CHANGE
  useEffect(() => {
    onClose();
  }, [pathname]);

  // CLOSE ON OUTSIDE CLICK
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        overlayRef.current &&
        !overlayRef.current.contains(event.target)
      ) {
        onClose();
      }
    }

    if (show) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [show, onClose]);

  // SEARCH API
  useEffect(() => {
    if (!query.trim()) {
      setResult({
        coupons: [],
        brands: [],
        categories: [],
      });
      return;
    }

    const timer = setTimeout(async () => {
      try {
        const res = await fetch(
          `https://nativediscounts.com/api/search?q=${encodeURIComponent(query)}`
        );

        const data = await res.json();

        setResult({
          coupons: data?.data?.coupons || [],
          brands: data?.data?.brands || [],
          categories: data?.data?.categories || [],
        });
      } catch (err) {
        console.error(err);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  if (!show) return null;

  return (
    <div className="search-overlay">
      <div ref={overlayRef} className="search-box-wrap">
        <button className="search-close" onClick={onClose}>
          ×
        </button>

        <div className="search-top">
          <input
            autoFocus
            type="text"
            value={query}
            placeholder="Search deals, stores or coupons"
            onChange={(e) => setQuery(e.target.value)}
          />

          {query && (
            <button
              onClick={() => setQuery("")}
              className="clear-btn"
            >
              Clear
            </button>
          )}
        </div>

        <div className="search-grid">
          {/* OFFERS */}
          <div>
            <h4>OFFERS</h4>

            {result.coupons.map((coupon) => (
              <Link
                href={`/${coupon.brand}?rc=${coupon.shortCode}`}
                className="offer-row"
                key={coupon._id}
                onClick={onClose}
              >
                <Image
                  src={
                    coupon.brandLogo ||
                    coupon.logo ||
                    "/placeholder.png"
                  }
                  alt={coupon.brand || coupon.title}
                  width={78}
                  height={78}
                />

                <div>
                  <strong>
                    {coupon.brand || coupon.brandName}
                  </strong>
                  <p>{coupon.title}</p>
                  <small>Online</small>
                  <b>View more</b>
                </div>
              </Link>
            ))}
          </div>

          {/* BRANDS */}
          <div>
            <h4>BRANDS</h4>

            {result.brands.map((brand) => (
              <Link
                href={`/${brand.pageSlug || brand.slug}`}
                className="brand-row"
                key={brand._id}
                onClick={onClose}
              >
                <span>{brand.brandName || brand.name}</span>
                <b>View offers</b>
              </Link>
            ))}
          </div>

          {/* CATEGORIES */}
        <div>
  <h4>CATEGORIES</h4>

  {result.categories.map((cat) => (
    <Link
      href={`/category/${cat.pageSlug}`}
      className="cat-row"
      key={cat._id}
      onClick={onClose}
    >
      {cat.categoryTitle}
    </Link>
  ))}
</div>
        </div>
      </div>
    </div>
  );
}