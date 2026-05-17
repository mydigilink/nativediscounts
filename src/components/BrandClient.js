"use client";

import { useEffect, useState } from "react";
import OfferCard from "@/components/OfferCard";
import CopyCode from "@/components/CopyToClipboard";
import Image from "next/image";
import Link from "next/link";
import { Modal } from "react-bootstrap";

export default function BrandClient({ brand, coupons, rc, country, similarBrands }) {
  const [openRc, setOpenRc] = useState(null);
  const [popupContent, setPopupContent] = useState(null);

  const [showActiveCount, setShowActiveCount] = useState(20);
  const [showExpiredCount, setShowExpiredCount] = useState(20);

  const now = new Date();
  const month = now.toLocaleString("default", { month: "long" });
  const year = now.getFullYear();

  const cleanHTML = (html) => {
    if (typeof window === "undefined") return html || "";

    const temp = document.createElement("div");
    temp.innerHTML = html || "";

    const isEmpty = (node) => {
      return (
        node.nodeType === 1 &&
        node.innerHTML.trim() === "" &&
        !["IMG", "BR", "HR", "INPUT"].includes(node.tagName)
      );
    };

    const walk = (node) => {
      if (node.nodeType === 1) {
        node.removeAttribute("style");
        node.removeAttribute("class");
        node.removeAttribute("id");

        [...node.childNodes].reverse().forEach((child) => {
          walk(child);
          if (isEmpty(child)) child.remove();
        });
      }
    };

    walk(temp);
    return temp.innerHTML;
  };

  const formatedTitle = (template, brand, country) => {
    return template
      .replace(/\[BRAND\]/g, brand.brandName)
      .replace(/\[COUNTRY\]/g, country.toUpperCase())
      .replace(/\[MONTH\]/g, month)
      .replace(/\[Offer Count\]/g, coupons.length)
      .replace(/\[YEAR\]/g, year);
  };

  useEffect(() => {
    if (rc) {
      setOpenRc(rc);
      fetch(`/api/offers/${rc}`)
        .then((res) => res.json())
        .then((data) => {
          setPopupContent(data[0]);
        });
    }
  }, [rc]);

  const isExpired = (date) => {
    if (!date) return false;
    return new Date(date) < new Date();
  };

  const topInputType = coupons.filter((c) => c.inputType === "3");

  const topOfferType = coupons.filter(
    (c) => c.offerType === "1" && c.inputType !== "3"
  );

  const restOffers = coupons.filter(
    (c) => !(c.inputType === "3" || c.offerType === "1")
  );

  const orderedCoupons = [...topInputType, ...topOfferType, ...restOffers];

  const activeCoupons = orderedCoupons.filter((c) => !isExpired(c.endDate));
  const expiredCoupons = orderedCoupons.filter((c) => isExpired(c.endDate));

  const renderOfferCard = (coupon, idx) => (
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
      forceOpen={openRc === coupon.shortCode}
      termsconditions={coupon.termsconditions}
      shortDescription={coupon.shortDescription}
    />
  );

  return (
    <>
      <header className="bg-white py-4 border-bottom">
        <div className="container">
          <div className="row align-items-start g-3">
            <div className="col-auto">
              <Link
                href={brand.brandUrl}
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="d-block border rounded overflow-hidden text-decoration-none"
                style={{ width: "86px" }}
                aria-label={`Visit ${brand.brandName} official website`}
              >
                <Image
                  src={brand.brandLogo}
                  alt={`${brand.brandName} official logo`}
                  width={86}
                  height={86}
                  className="img-fluid p-2"
                  priority
                />

                <div className="text-center bg-white border-top fw-bold small py-1">
                  Visit Site
                </div>
              </Link>
            </div>

            <div className="col">
              <h1 className="h1 fw-bold m-0">
                {formatedTitle(brand.brandTitle, brand, country)}
              </h1>
            </div>
          </div>
        </div>
      </header>

      <main className="bg-gray-200 py-4">
        <div className="container">
          <div className="row gy-4">
            <div className="col-lg-8">
              <section aria-labelledby="offers-heading">
                <h2 id="offers-heading" className="mt-0 h3 mb-3 fw-bold">
                  {brand?.brandh2Title?.trim()
                    ? formatedTitle(brand.brandh2Title, brand, country)
                    : `Latest ${brand?.brandName} Coupons & Offers`}
                </h2>

                {activeCoupons.slice(0, showActiveCount).map(renderOfferCard)}

                {activeCoupons.length > showActiveCount && (
                  <div className="text-center mt-4 mb-4">
                    <button
                      className="btn btn-theme px-4"
                      onClick={() => setShowActiveCount((prev) => prev + 20)}
                    >
                      Show More Offers
                    </button>
                  </div>
                )}

                {expiredCoupons.length > 0 && (
                  <>
                    <h3 className="mt-4 mb-3">
                      Recently Expired {brand?.brandName} Promo Codes
                    </h3>

                    {expiredCoupons
                      .slice(0, showExpiredCount)
                      .map(renderOfferCard)}

                    {expiredCoupons.length > showExpiredCount && (
                      <div className="text-center mt-4 mb-4">
                        <button
                          className="btn btn-outline-secondary px-4"
                          onClick={() =>
                            setShowExpiredCount((prev) => prev + 20)
                          }
                        >
                          Show More Expired Offers
                        </button>
                      </div>
                    )}
                  </>
                )}
              </section>

              {brand.brandEditor && brand.brandEditor.length > 0 && (
                <section className="mt-4">
                  {brand.brandEditor.map((editor, index) =>
                    editor.position === "right" ? null : (
                      <article key={index} className="card shadow-sm mb-3">
                        <div className="card-body">
                          <div
                            className="small text-black"
                            dangerouslySetInnerHTML={{
                              __html: cleanHTML(editor.content),
                            }}
                          />
                        </div>
                      </article>
                    )
                  )}
                </section>
              )}

              {brand.aboutCompany && (
                <article className="card shadow-sm mt-4">
                  <div className="card-body">
                    <h2 className="h4 fw-bold">About {brand.brandName}</h2>
                    <p className="small text-black">{brand.aboutCompany}</p>
                  </div>
                </article>
              )}

              {brand.faqs?.length > 0 && (
                <section className="card shadow-sm mt-4">
                  <div className="card-body">
                    <h2 className="fw-bold mt-0">
                      {brand.brandName} Promo Codes FAQ
                    </h2>

                    <div className="accordion" id="faqAccordion">
                      {brand.faqs.map((faq, i) => (
                        <div className="accordion-item" key={i}>
                          <div className="accordion-header" id={`heading${i}`}>
                            <button
                              className="accordion-button collapsed"
                              type="button"
                              data-bs-toggle="collapse"
                              data-bs-target={`#collapse${i}`}
                              aria-expanded="false"
                              aria-controls={`collapse${i}`}
                            >
                              <h3
                                className="h4 fw-semibold text-black mt-0"
                                dangerouslySetInnerHTML={{
                                  __html: cleanHTML(faq.question),
                                }}
                              />
                            </button>
                          </div>

                          <div
                            id={`collapse${i}`}
                            className="accordion-collapse collapse"
                            aria-labelledby={`heading${i}`}
                            data-bs-parent="#faqAccordion"
                          >
                            <div className="accordion-body small text-black">
                              <div
                                dangerouslySetInnerHTML={{
                                  __html: cleanHTML(faq.answer) || "",
                                }}
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>
              )}
            </div>

            <aside className="col-lg-4" aria-label="Helpful information">
              {brand.brandEditor && brand.brandEditor.length > 0 && (
                <section className="mt-0 mb-4">
                  {brand.brandEditor.map((editor, index) =>
                    editor.position === "default" ? null : (
                      <article key={index} className="card shadow-sm mb-3">
                        <div className="card-body">
                          <div
                            className="small text-black"
                            dangerouslySetInnerHTML={{
                              __html: cleanHTML(editor.content),
                            }}
                          />
                        </div>
                      </article>
                    )
                  )}
                </section>
              )}

              {similarBrands?.length > 0 && (
                <div className="card similar-brands shadow-sm mt-4">
                  <div className="card-body">
                    <h2 className="h5 fw-bold">Similar Brands</h2>

                    <ul className="list-unstyled small text-black mb-0">
                      {similarBrands.map((sb) => (
                        <li key={sb._id} className="d-flex align-items-center mb-3">
                          <Link
                            href={`/${sb.pageSlug}`}
                            className="d-flex align-items-center text-decoration-none"
                          >
                            <Image
                              src={sb.brandLogo}
                              alt={sb.brandName}
                              width={80}
                              height={80}
                              className="rounded me-2 border"
                            />
                            <span className="text-dark">{sb.brandName}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </aside>
          </div>
        </div>
      </main>

      <Modal
        show={!!openRc}
        onHide={() => setOpenRc(null)}
        aria-labelledby="couponModalTitle"
        role="dialog"
        aria-modal="true"
      >
        <Modal.Header closeButton />

        <Modal.Body className="text-center">
          {popupContent ? (
            <>
              <Image
                src={brand.brandLogo}
                alt={`${popupContent.brand} logo`}
                width={120}
                height={120}
                className="mb-3"
              />

              <p>
                {popupContent?.brand &&
                  popupContent.brand
                    .split(" ")
                    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(" ")}
              </p>

              <h2 className="h5 mb-3">{popupContent.title}</h2>

              <div
                className="small text-black"
                dangerouslySetInnerHTML={{
                  __html: cleanHTML(popupContent.shortDescription),
                }}
              />

              {popupContent.couponCode && (
                <div className="mt-3">
                  <CopyCode couponCode={popupContent.couponCode} />
                </div>
              )}

              <Link
                href={popupContent.link}
                className="btn btn-theme mt-3"
                target="_blank"
                rel="noopener noreferrer nofollow"
              >
                Continue to{" "}
                {popupContent?.brand &&
                  popupContent.brand
                    .split(" ")
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