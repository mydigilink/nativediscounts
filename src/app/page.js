import Image from "next/image";
import clientPromise from "@/lib/mongodb";
import { notFound } from "next/navigation";
import NewsletterModal from "@/components/NewsletterModal";
import BannerSlider from "@/components/BannerSlider";
import OffersSection from "@/components/OffersSection";
import CatBlocks from "@/components/CatBlocks";
import Link from "next/link";
import StatsSection from "@/components/StatsSection";

/* ================= SEO METADATA ================= */
export async function generateMetadata({ params }) {
  const { country: countryCode } = params;

  const client = await clientPromise;
  const db = client.db(process.env.DB_NAME);

  const country = await db.collection("countries").findOne({
    countryCode,
    activeStatus: true,
  });
 const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;

  if (!country) return {
  
     title:
     
      "NativeDiscounts® | Best US Coupon Codes, Promo Codes & Online Deals 2026",
    description:
     
      "Discover verified US coupon codes, promo codes, and online deals from top brands at NativeDiscounts. Save on fashion, travel, beauty, electronics, food, software, and more with updated offers and exclusive discounts.",
    keywords: "",
    alternates: {
      canonical: baseUrl,
    },
  
  };

   const pageUrl = `${baseUrl}${countryCode}`;

  return {
    title:
      country.seoTitle ||
      "Best US Online Deals, Discount Codes & Offers | NativeDiscounts",
    description:
      country.seoDescription ||
      "Get the best US online deals, verified discount codes and promo offers across top brands.",
    keywords: country.seoKeywords || "",
    alternates: {
      canonical: pageUrl,
    },
  };
}

/* ================= PAGE ================= */
export default async function CountryPage({ params }) {
  
  const country = params?.country || "us"; // fallback
//const { country } = params;

  const client = await clientPromise;
  const db = client.db(process.env.DB_NAME);

  const countryDoc = await db.collection("countries").findOne({
    countryCode: country,
    activeStatus: true,
  });

  if (!countryDoc) {
    notFound();
  }

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;
  const pageUrl = `${baseUrl}${country}`;

  /* ================= JSON-LD SCHEMA ================= */
  const schemaData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${baseUrl}#organization`,
        name: "NativeDiscounts",
        url: baseUrl,
        logo: {
          "@type": "ImageObject",
          "@id": `${baseUrl}#logo`,
          url: `${baseUrl}logo.jpeg`,
        },
      },
      {
        "@type": "WebSite",
        "@id": `${baseUrl}#website`,
        url: baseUrl,
        name: "Native Discounts",
        publisher: {
          "@id": `${baseUrl}#organization`,
        },
        potentialAction: {
          "@type": "SearchAction",
          target: `${baseUrl}search?q={search_term_string}`,
          "query-input": "required name=search_term_string",
        },
      },
      {
        "@type": "WebPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: countryDoc.seoTitle,
        description: countryDoc.seoDescription,
        isPartOf: {
          "@id": `${baseUrl}#website`,
        },
        inLanguage: "en",
      },
    ],
  };

  /* ================= API CALLS ================= */
  const cacheOptions = { next: { revalidate: 3600 } };

  const [featuredMerchantsRes, countryBrandsRes, allCategoriesRes] =
    await Promise.all([
      fetch(
        `${baseUrl}api/v1/brands?field=featuredBrand&value=true&limit=12`,
        cacheOptions
      ),
      fetch(
        `${baseUrl}api/v2/brands?filter={"country":"${country}","featuredBrand":true}`,
        cacheOptions
      ),
      fetch(`${baseUrl}api/v1/categories?limit=20`, cacheOptions),
    ]);

  const [featuredMerchants, countryBrands, categories] =
    await Promise.all([
      featuredMerchantsRes.json(),
      countryBrandsRes.json(),
      allCategoriesRes.json(),
    ]);

  const features = [
    {
      icon: "/icons/icon-verified.svg",
      title: "100% Verified Coupons",
      subtitle: "Zero Hassle",
    },
    {
      icon: "/icons/savings.svg",
      title: "Start your ultimate savings journey today!",
      subtitle: "",
    },
    {
      icon: "/icons/best-seller-icon.svg",
      title: "Shop Hundreds of Top Brands",
      subtitle: "",
    },
  ];

  return (
    <>
      {/* ✅ JSON-LD (SSR, best for SEO) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      <main>
        {/* Hero */}
        <section>
          <BannerSlider
            heroImages={countryDoc.heroImages || []}
            heroHeadline={countryDoc.heroHeadline}
            heroSubheadline={countryDoc.heroSubheadline}
          />
        </section>

        {/* Features */}
        <section className="bg-theme py-3">
          <div className="container">
            <div className="row text-center align-items-center">
              {features.map((item, idx) => (
                <div
                  key={idx}
                  className="col-12 col-md-4 col-6 mb-3 mb-md-0 d-flex justify-content-start justify-content-md-center"
                >
                  <div className="d-flex align-items-center">
                    <Image
                      src={item.icon}
                      alt={item.title}
                      width={50}
                      height={50}
                      className="me-3"
                      style={{
                        borderRadius: "50%",
                        background: "#fff",
                        padding: "5px",
                      }}
                    />
                    <div className="text-start">
                      <h2 className="fw-bold mb-0 h6">{item.title}</h2>
                      <small className="text-light">{item.subtitle}</small>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Merchants */}
        <section className="bg-light py-2">
          <div className="container">
            <div className="d-flex justify-content-between mb-4">
              <h3 className="fw-bold">Top Brands & Stores</h3>
              <Link href="/stores">View All</Link>
            </div>

            <div className="row g-4">
              {featuredMerchants.map((merchant, idx) => (
                <div className="col-6 col-md-2" key={idx}>
                  <Link href={`/${merchant.pageSlug}`}>
                    <div className="card shadow-sm h-100 border-0">
                      <div
                        className="d-flex align-items-center justify-content-center bg-white border-bottom"
                        style={{ height: "150px" }}
                      >
                        <Image
                          src={merchant.brandLogo}
                          alt={merchant.brandName}
                          width={150}
                          height={150}
                          style={{ objectFit: "cover" }}
                        />
                      </div>
                      <div className="card-body">
                        <div className="small">{merchant.brandName}</div>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-5">
          <StatsSection />
        </section>

        {/* Categories */}
        <section className="py-5 bg-white">
          <div className="container text-center">
            <h4 className="fw-bold mb-4">Categories</h4>
            <div className="row">
              {categories.map((cat, idx) => (
                <div className="col-6 col-md-3 mb-3" key={idx}>
                  <Link className="catlinks" href={`/cats/${cat.pageSlug}`}>
                    {cat.categoryTitle}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Latest Brands */}
        <section className="py-5 bg-light">
          <div className="container text-center">
            <h4 className="fw-bold mb-4">Latest Offers</h4>
            <div className="row">
              {countryBrands.map((brand, idx) => (
                <div className="col-6 col-md-3 mb-3" key={idx}>
                  <Link href={`/${brand.pageSlug}`}>
                    {brand.brandName}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}