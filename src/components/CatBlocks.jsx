// src/components/CatBlocks.js
import Image from "next/image";

const deals = [
  {
    name: "Freemans",
    logo: "/images/freemans.jpeg", // place the logo in public folder
    tag: "EXCLUSIVE",
    offer: "15% off Orders Over £95 at Freemans",
    vip: false,
  },
  {
    name: "SHEIN",
    logo: "/images/freemans.jpeg", 
    tag: "EXCLUSIVE",
    offer: "15% off Orders Over £14 at SHEIN",
    vip: true,
  },
  {
    name: "Simply Be",
  logo: "/images/freemans.jpeg", 
    tag: "EXCLUSIVE",
    offer: "30% off Clothing and Footwear Orders Over £30 at Simply Be",
    vip: true,
  },
  {
    name: "Peacocks",
   logo: "/images/freemans.jpeg", 
    tag: "",
    offer: "Up to 70% off in the Peacocks Big Summer Sale",
    vip: true,
  },
];

export default function CatBlocks({catname }) {
 
  return (
    <section className="bg-light py-5">
      <div className="container">
        {/* Header */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="fw-bold">{catname}</h2>
          <a href="#" className="fw-semibold text-dark text-decoration-none">
            View All Womens Fashion
          </a>
        </div>

        {/* Row */}
        <div className="row g-4">
          {deals.map((deal, idx) => (
            <div key={idx} className="col-12 col-sm-6 col-md-3">
              <div className="card shadow-sm h-100 border-0 h-100 shadow-sm position-relative">
                {/* VIP Badge */}
                {deal.vip && (
                  <span className="badge bg-warning text-dark position-absolute top-0 start-50 translate-middle-x mt-2">
                    ⭐ VIP
                  </span>
                )}

                {/* Logo */}
                <div className="d-flex align-items-center justify-content-center bg-white border-bottom" style={{ height: "120px" }}>
                  <Image
                    src={deal.logo}
                    alt={deal.name}
                    width={150}
                    height={60}
                    style={{ objectFit: "contain", maxHeight: "80px" }}
                  />
                </div>

                {/* Card Body */}
                <div className="card-body">
                  <div className="text-muted small fw-normal mb-0">{deal.name}</div>
                 
                  <div className="text-sm card-text fw-normal mt-0"> {deal.tag && (
                    <span className="badge bg-danger text-white fw-normal mb-0">
                      {deal.tag}
                    </span>
                  )} {deal.offer}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );

}
