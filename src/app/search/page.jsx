import { headers } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import OfferCard from "@/components/OfferCard";

export default async function SearchPage({ searchParams }) {
  const query = searchParams.q || "";

  // LOCAL API URL
  const API_URL = `http://localhost:3001/api/search?q=${encodeURIComponent(
    query
  )}`;

  const res = await fetch(API_URL, {
    cache: "no-store",
  });

  const result = await res.json();

  const brands = result?.data?.brands || [];
  const coupons = result?.data?.coupons || [];

  return (
    <main className="bg-light py-5 min-vh-100">
      <div className="container">
        <div className="mb-4">
          <h1 className="fw-bold mb-2">
            Search Results for:
            <span className="text-primary"> {query}</span>
          </h1>

          <p className="text-muted">
            Found {brands.length + coupons.length} results
          </p>
        </div>

        {/* BRANDS */}
        {brands.length > 0 && (
          <section className="mb-5">
            <div className="d-flex align-items-center justify-content-between mb-3">
              <h2 className="h4 fw-bold mb-0">Brands</h2>
            </div>

            <div className="row g-4">
              {brands.map((brand) => (
                <div
                  className="col-6 col-md-4 col-lg-3"
                  key={brand._id}
                >
                  <Link
                    href={`/${brand.pageSlug || brand.slug}`}
                    className="text-decoration-none"
                  >
                    <div className="card border-0 shadow-sm rounded-4 h-100 overflow-hidden brand-search-card">
                      <div className="bg-white p-4 text-center border-bottom">
                        <Image
                          src={
                            brand.brandLogo ||
                            "/placeholder.png"
                          }
                          alt={
                            brand.brandName ||
                            brand.name
                          }
                          width={100}
                          height={100}
                          className="img-fluid object-fit-contain"
                        />
                      </div>

                      <div className="card-body">
                        <h3 className="h6 fw-bold text-dark mb-2">
                          {brand.brandName ||
                            brand.name ||
                            brand.title}
                        </h3>

                        <p className="small text-muted mb-0">
                          {brand.aboutCompany
                            ? brand.aboutCompany.slice(0, 90)
                            : "Latest offers and promo codes available"}
                          ...
                        </p>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* COUPONS */}
        {coupons.length > 0 && (
          <section>
            <div className="d-flex align-items-center justify-content-between mb-3">
              <h2 className="h4 fw-bold mb-0">
                Coupons & Offers
              </h2>
            </div>

            <div className="d-flex flex-column gap-3">
              {coupons.map((coupon, idx) => (
                <OfferCard
                  key={
                    coupon.shortCode ||
                    coupon._id ||
                    idx
                  }
                  type={coupon.offerType}
                  discountText={coupon.discount}
                  title={coupon.title}
                  badge={coupon.inputType}
                  exclusive={coupon.inputType}
                  expires={coupon.endDate}
                  lastUsed={coupon.lastUsed}
                  code={
                    coupon.couponCode
                      ? coupon.couponCode.slice(-3)
                      : ""
                  }
                  addedBy={coupon.addedby}
                  link={coupon.link}
                  shortCode={coupon.shortCode}
                  termsconditions={
                    coupon.termsconditions
                  }
                  shortDescription={
                    coupon.shortDescription
                  }
                />
              ))}
            </div>
          </section>
        )}

        {/* EMPTY */}
        {brands.length === 0 &&
          coupons.length === 0 && (
            <div className="card border-0 shadow-sm rounded-4 p-5 text-center">
              <h2 className="h5 fw-bold">
                No results found
              </h2>

              <p className="text-muted mb-0">
                Try another search keyword.
              </p>
            </div>
          )}
      </div>
    </main>
  );
}