"use client";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import Sidebars from "./Sidebars";

export default function Header({ searchParms }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const country = searchParms?.countryCode || "us";

  return (
    <header className="bg-light" role="banner">
      {/* Top Announcement Bar */}
      {/* <div
        className="bg-dark text-white text-center py-1 small"
        role="region"
        aria-label="Announcement"
      >
        <span>
          Want exclusives like £5 for 2 shops?{" "}
          <Link
            href="/vip"
            className="text-warning fw-bold"
            aria-label="Become a VIP member"
          >
            Become a VIP ⭐
          </Link>
        </span>
      </div> */}

      {/* Main Header Row */}
      <div className="shadow" style={{ background: "rgb(255 255 255)" }}>
        <div
          className="container d-flex align-items-center justify-content-between py-2"
          role="navigation"
          aria-label="Primary navigation"
        >
          {/* Logo */}
          <Link
            href={`/`}
            className="d-flex align-items-center text-decoration-none"
            aria-label="Homepage"
          >
            <Image
              src="/logo.png"
              alt="Company Logo"
              width={160}
              height={60}
              priority
              className="me-2"
            />
          </Link>

          {/* Search bar */}
          <form
            role="search"
            aria-label="Site search"
            className=" d-md-flex flex-grow-1 mx-4 bg-light dheader-search"
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
              />
            </div>
          </form>

          {/* Mobile Menu Toggle */}
          <button
            className="btn d-md-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            aria-label="Toggle mobile menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
              fill="currentColor"
              viewBox="0 0 16 16"
              aria-hidden="true"
              focusable="false"
            >
              <path
                fillRule="evenodd"
                d="M1.5 12.5a.75.75 0 0 1 0-1.5h13a.75.75 0 0 1 0 1.5h-13zm0-5a.75.75 0 0 1 0-1.5h13a.75.75 0 0 1 0 1.5h-13zm0-5a.75.75 0 0 1 0-1.5h13a.75.75 0 0 1 0 1.5h-13z"
              />
            </svg>
          </button>

          {/* Right Sidebar */}
          <div className="d-none d-md-flex align-items-center d-none">
            <Sidebars />
          </div>
        </div>
      </div>

      {/* Desktop Nav */}
      <nav
        className="bg-white border-top border-bottom  d-md-block dheader"
        role="navigation"
        aria-label="Secondary navigation"
      >
        <div className="container d-flex justify-content-center py-2 flex-wrap">
          <Link href={`/cats`} className="nav-link px-3 text-dark">
            Categories
          </Link>
          <Link href={`/stores`} className="nav-link px-3 text-dark">
            Stores
          </Link>
          <Link href={`/recent-coupons`} className="nav-link px-3 text-dark">
            Coupons
          </Link>
          <Link href={`/blog`} className="nav-link px-3 text-dark">
          Buyer's Guide
          </Link>
          {/* <Link href={`/`} className="nav-link px-3 text-dark">
            Back-to-School
          </Link> */}
        </div>
      </nav>

      {/* Mobile Nav */}
      {isMenuOpen && (
        <nav
          id="mobile-menu"
          className="bg-white border-top d-md-none"
          role="navigation"
          aria-label="Mobile navigation"
        >
          <div className="container d-flex flex-column py-2">
            <form className="mb-2" role="search" aria-label="Mobile search">
              <label htmlFor="mobile-search" className="visually-hidden">
                Search site
              </label>
              <input
                id="mobile-search"
                type="search"
                className="form-control"
                placeholder="Search deals, stores or coupons"
              />
            </form>
            <Link href={`/cats`} className="nav-link px-3 text-dark">
              Categories
            </Link>
            <Link href={`/stores`} className="nav-link px-3 text-dark">
              Stores
            </Link>
            <Link href={`/recent-coupons`} className="nav-link px-3 text-dark">
              Coupons
            </Link>
            <Link href={`/guides`} className="nav-link px-3 text-dark">
              Shopping Guide
            </Link>
            {/* <Link href={`/`} className="nav-link px-3 text-dark">
              Back-to-School
            </Link> */}
            <div className="py-2">
              <Sidebars />
            </div>
          </div>
        </nav>
      )}
    </header>
  );
}
