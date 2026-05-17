"use client";

import { useEffect, useState } from "react";
import OfferCard from "@/components/OfferCard";
import CopyCode from "@/components/CopyToClipboard";
import { Modal } from "react-bootstrap";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

const CACHE_TTL = 24 * 60 * 60 * 1000; // 1 day in ms

export default function RecentCouponsClient({ coupons }) {
  const [openRc, setOpenRc] = useState(null);
  const [popupContent, setPopupContent] = useState(null);

  const searchParams = useSearchParams();
  const rc = searchParams.get("rc");

  // --- fetch with 1-day cache ---
  useEffect(() => {
    if (!rc) {
      setOpenRc(null);
      setPopupContent(null);
      return;
    }

    setOpenRc(rc);

    const cacheKey = `coupon_${rc}`;
    const cachedData = localStorage.getItem(cacheKey);

    if (cachedData) {
      const { data, expiry } = JSON.parse(cachedData);
      if (Date.now() < expiry) {
        setPopupContent(data);
        return; // use cached data
      } else {
        localStorage.removeItem(cacheKey); // expired
      }
    }

    // fetch from API
    fetch(`/api/offers/${rc}`)
      .then((res) => res.json())
      .then((data) => {
        const couponData = data?.[0] || null;
        setPopupContent(couponData);

        // store in cache with 1-day TTL
        localStorage.setItem(
          cacheKey,
          JSON.stringify({ data: couponData, expiry: Date.now() + CACHE_TTL })
        );
      })
      .catch(() => setPopupContent(null));
  }, [rc]);

  return (
    <>
      <link
        rel="canonical"
        href={`https://www.nativediscounts.com/recent-coupons`}
      />
      <section aria-labelledby="offers-heading">
        {coupons.length > 0 ? (
          coupons.map((coupon, idx) => (
            <OfferCard
              key={coupon.shortCode || idx}
              type={coupon.offerType}
              discountText={coupon.discount}
              title={coupon.title}
              badge={coupon.inputType}
              exclusive={coupon.inputType}
              expires={coupon.endDate}
              lastUsed={coupon.lastUsed}
              code={coupon.couponCode ? coupon.couponCode.slice(-3) : ""}
              addedBy={coupon.addedby}
              link={coupon.link}
              shortCode={coupon.shortCode}
              termsconditions={coupon.termsconditions}
              shortDescription={coupon.shortDescription}
              onClick={() => setOpenRc(coupon.shortCode)}
            />
          ))
        ) : (
          <p>No recent coupons available.</p>
        )}
      </section>

      <Modal
        show={!!openRc}
        onHide={() => {
          setOpenRc(null);
          setPopupContent(null);
        }}
        aria-labelledby="couponModalTitle"
        centered
      >
        <Modal.Header closeButton />
        <Modal.Body className="text-center">
          {popupContent ? (
            <>
              {popupContent.brandLogo && (
                <Image
                  src={popupContent.brandLogo}
                  alt={`${popupContent.brand} logo`}
                  width={120}
                  height={120}
                  className="mb-3"
                />
              )}
              <p className="fw-bold text-capitalize">{popupContent.brand}</p>
              <h2 className="h5 mb-3">{popupContent.title}</h2>

              <div
                className="small text-black mb-3"
                dangerouslySetInnerHTML={{
                  __html: popupContent.shortDescription || "",
                }}
              />

              <CopyCode couponCode={popupContent.couponCode} />

              <Link
                href={popupContent.link || "#"}
                className="btn btn-theme mt-3"
                target="_blank"
                rel="noopener noreferrer nofollow"
              >
                Continue to{" "}
                {popupContent.brand
                  ?.split(" ")
                  .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                  .join(" ")}{" "}
                Official Site
              </Link>
            </>
          ) : (
            <p>Loading coupon details…</p>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
}
