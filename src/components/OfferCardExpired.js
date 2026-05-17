"use client";
import React, { useState, useEffect } from "react";
import Terms from "./Terms";
import Link from "next/link";

// In-memory cache for authors
let authorsCache = null;

export default function OfferCard({
  type,
  discountText,
  title,
  badge,
  exclusive = false,
  expires,
  lastUsed,
  code,
  addedBy,
  link,
  shortCode,
  forceOpen,
  termsconditions,
  shortDescription,
}) {
  const [authors, setAuthors] = useState({});

  const offerTypeMap = {
    1: "code",
    2: "sale",
    3: "discount",
    4: "mobile_app",
    5: "cashback",
    6: "giftcard",
  };

  const badgeTypeMap = { 1: "Exclusive", 2: "Event Deal", 3: "Popular" };

  const formatExpires = (dateString) => {
    if (!dateString) return null;
    const date = new Date(dateString);
    return `Ends ${date.getDate()} ${date.toLocaleString("en-US", {
      month: "short",
    })} ${date.getFullYear()}`;
  };

  const isExpired = (expiryDate) => {
    if (!expiryDate) return false;
    return new Date(expiryDate) < new Date();
  };

  const expired = isExpired(expires);

  const handleButtonClick = () => {
    if (!link || expired) return;

    const newUrl = `${window.location.origin}${window.location.pathname}?rc=${shortCode}`;
    window.open(newUrl, "_blank");
    window.location.href = link;
  };

  return (
    <article
      className={`couponlist card mb-3 shadow-sm ${
        expired ? "opacity-50 expired" : ""
      }`}
      id={`offer-${shortCode}`}
    >
      <div className="card-body d-flex justify-content-between align-items-center flex-wrap">
        <div className="d-flex flex-offer">
          <div className="w-22 text-center">
            {discountText && (
              <div className="h4 mb-1">
                <span className="font-black">{discountText}</span>
              </div>
            )}
            {type && (
              <div className="badge bg-black text-white me-1 uppercase">
                {offerTypeMap[type]}
              </div>
            )}
          </div>

          <div className="mx-3 shrink">
            <h3 className="mt-0 font-light text-lg md:text-xl leading-7 md:leading-8 text-liquorice">
              {exclusive && (
                <span className="badge bg-warning text-dark me-1 text-sm">
                  {badgeTypeMap[exclusive]}
                </span>
              )}
              {title}
            </h3>

            {shortDescription && (
              <div
                className="small text-muted"
                dangerouslySetInnerHTML={{ __html: shortDescription }}
              />
            )}

            {(expires || lastUsed) && (
              <div className="small text-muted mt-1">
                {expires && formatExpires(expires)}{" "}
                {expired && <span className="text-danger">(Expired)</span>}
              </div>
            )}
          </div>
        </div>

        <div
          className="mb-3 ms-auto d-flex flex-column"
          style={{ width: "12rem" }}
        >
          <button
            className="d-flex text-lg fw-bold btn p-0 border-0"
            onClick={handleButtonClick}
            disabled={expired}
          >
            {offerTypeMap[type] === "code" ? (
              <>
                <div
                  className={`flex-grow-1 d-flex align-items-center justify-content-around rounded-start px-4 py-3 ${
                    expired ? "bg-secondary text-light" : "bg-success text-light"
                  }`}
                >
                  <span>Get Code</span>
                </div>
                <span
                  className={`border border-2 border-dotted px-2 py-3 rounded-end text-uppercase ${
                    expired
                      ? "border-secondary bg-secondary-subtle"
                      : "border-success bg-success-subtle"
                  }`}
                >
                  {code}
                </span>
              </>
            ) : (
              <div
                className={`flex-grow-1 d-flex align-items-center justify-content-around rounded px-4 py-3 ${
                  expired ? "bg-secondary text-light" : "bg-success text-light"
                }`}
              >
                <span>Get Deal</span>
              </div>
            )}
          </button>
        </div>
      </div>

      <div className="card-footer text-muted small d-flex justify-content-between">
        <div>
          {termsconditions &&
            termsconditions.trim() !== "" && (
              <Terms termsconditions={termsconditions} />
            )}
        </div>
        <div>{addedBy || "Admin"}</div>
      </div>
    </article>
  );
}