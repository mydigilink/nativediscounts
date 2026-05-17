"use client";
import Link from "next/link";

export default function OffersSection() {
  const offers = [
    {
      id: 1,
      image: "/images/imagedemo.jpg",
      logo: "/images/imagedemo.jpg",
      title: "LOVEHONEY",
      badge: "EXCLUSIVE",
      desc: "Extra 22% off Orders Over £10 Plus Free Delivery at Lovehoney",
      vip: true,
    },
    {
      id: 2,
        image: "/images/imagedemo.jpg",
      logo: "/images/imagedemo.jpg",
      title: "AO.COM",
      badge: "EXCLUSIVE",
      desc: "£200 ASDA, M&S or Morrisons Voucher with Hotpoint Appliance Orders Over...",
      vip: true,
    },
    {
      id: 3,
         image: "/images/imagedemo.jpg",
      logo: "/images/imagedemo.jpg",
      title: "DISNEY STORE",
      badge: "EXCLUSIVE",
      desc: "15% off Orders Over £50 at Disney Store",
      vip: true,
    },
    {
      id: 4,
         image: "/images/imagedemo.jpg",
      logo: "/images/imagedemo.jpg",
      title: "BEAVERBROOKS",
      badge: "EXCLUSIVE",
      desc: "£20 Treat Yourself Voucher with Orders Over £200",
      vip: false,
    },
    {
      id: 5,
          image: "/images/imagedemo.jpg",
      logo: "/images/imagedemo.jpg",
      title: "DUNELM",
      badge: "EXCLUSIVE",
      desc: "£10 Amazon Voucher with Orders Over £100",
      vip: true,
    },
    {
      id: 6,
         image: "/images/imagedemo.jpg",
      logo: "/images/imagedemo.jpg",
      title: "ON THE BEACH",
      badge: "EXCLUSIVE",
      desc: "£100 Amazon Voucher with Selected Holiday Bookings",
      vip: true,
    },
  ];

  return (
    <section className="py-5 bg-light">
      <div className="container">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h3 className="fw-bold">Today's Top Offers</h3>
          <Link href="/offers" className="text-decoration-none fw-semibold">
            View All Top Offers
          </Link>
        </div>
        <div className="row g-4">
          {offers.map((offer) => (
            <div key={offer.id} className="col-12 col-md-4">
              <div className="card shadow-sm h-100 border-0">
                {/* Image with logo overlay */}
                <div className="position-relative">
                  <img
                    src={offer.image}
                    className="card-img-top"
                    alt={offer.title}
                    style={{ borderTopLeftRadius: "12px", borderTopRightRadius: "12px" }}
                  />
                  <img
                    src={offer.logo}
                    alt={`${offer.title} Logo`}
                    className="position-absolute"
                    style={{
                      bottom: "-20px",
                      left: "15px",
                      width: "60px",
                      height: "60px",
                      borderRadius: "8px",
                      background: "#fff",
                      padding: "8px",
                      boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                    }}
                  />
                  {offer.vip && (
                    <span className="badge bg-warning text-dark position-absolute" style={{ bottom: "10px", right: "15px" }}>
                      ⭐ VIP RETAILER
                    </span>
                  )}
                </div>

                {/* Card Body */}
                <div className="card-body mt-4">
                  <h6 className="fw-bold">{offer.title}</h6>
                  <p className="small mb-1">
                    <span className="badge bg-warning text-dark me-2">{offer.badge}</span>
                    {offer.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
