import Head from 'next/head';
import Link from 'next/link';

export async function generateMetadata({ params }) {

  return {
    title: "Affiliate Disclosure | Native Discounts",
    description:  "Native Discounts may earn a commission when you use our coupon links. Read our affiliate disclosure to learn more about our partnerships & transparency.",
    keywords:"Affiliate Disclosure, Commission, Partnerships, Transparency, Coupon Links, Promo Codes, Native Discounts",
  };
}

export default function AffiliateDiscloser() {
  return (
    <><link rel="canonical" href="https://www.nativediscounts.com/affiliate-disclosure"/>
        <main className="container py-4">
        {/* Breadcrumb Navigation */}
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link href="/">Home</Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Affiliate Disclosure
            </li>
          </ol>
        </nav>
        <h1>Affiliate Disclosure</h1>
        <p>
        We may earn a small commission when you shop through our links on NativeDiscounts.com or
our social platforms. This helps us keep bringing you the best deals, at no extra cost to you. See
our Terms &amp; Conditions for details.
        </p>    

          </main>
    
    </>   

  );
}