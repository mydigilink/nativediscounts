import Head from 'next/head';
import Link from 'next/link';

export async function generateMetadata({ params }) {

  return {
    title: "About Native Discounts | Your Trusted US Coupon & Deals Platform",
    description:  "Learn more about Native Discounts – a trusted source for verified US coupons, promo codes & deals. Our mission is to help shoppers save smarter every day.",
    keywords:"",
  };
}

export default function AboutUs() {
  return (
    <>
    
<link rel="canonical" href="https://www.nativediscounts.com/about-us"/>
      <main className="container py-4">
        {/* Breadcrumb Navigation */}
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link href="/">Home</Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              About Us
            </li>
          </ol>
        </nav>

        <h1>About NativeDiscounts</h1>
        <p>
          NativeDiscounts is your one-stop destination for discovering verified deals, coupons,
          and helpful articles so you can save big on everything from fashion and food to travel,
          electronics, financial products, essential goods, and beyond. We’re dedicated to sharing
          only active, working offers with our members, ensuring you always have access to reliable savings.
        </p>

        <h2>Guaranteed Valid Coupons and Deals</h2>
        <p>
          Our experienced team works hard to hunt down the best offers from top brands and stores.
          Every code and deal is hand-tested by our staff before being published, so you can trust
          that only genuine, functioning discounts make it to our platform.
        </p>

        <h2>Save on Every Purchase</h2>
        <p>
          From sneakers, sunglasses, and pet supplies to holiday travel, credit cards, insurance,
          toys, beauty products, education, mobile phones, jewelry, vitamins, and more, we bring
          you coupons that help lower the cost of whatever you shop for online.
        </p>

        <h2>How to Save with NativeDiscounts</h2>
        <ol>
          <li>Search your favorite product or brand on NativeDiscounts.</li>
          <li>Click on the Coupon Code button to access your exclusive deal.</li>
          <li>Shop on the new page and enjoy the maximum available savings.</li>
        </ol>

        <p>
          With NativeDiscounts, saving money on your online purchases has never been easier or more reliable!
        </p>
      </main>
    </>
  );
}
