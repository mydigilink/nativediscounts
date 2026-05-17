import Head from 'next/head';
import Link from 'next/link';

export async function generateMetadata({ params }) {

  return {
    title: "Coupon Code Guarantee | Native Discounts",
    description:  "At Native Discounts, we stand by our verified code guarantee. Find only active coupons, tested promo codes & deals that help you save without worry.",
    keywords:"",
  };
}

export default function CodeGuarantee() {
  return (
    <><link rel="canonical" href={`https://www.nativediscounts.com/code-guarantee`}/>
    <main className="container py-4">
        {/* Breadcrumb Navigation */}
        <nav aria-label="breadcrumb">   
            <ol className="breadcrumb">
                <li className="breadcrumb-item">
                    <Link href="/">Home</Link>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                    Code Guarantee
                </li>
            </ol>


        </nav>
        <h1>Coupon Code Guarantee</h1>
        <p>     
    At NativeDiscounts, we take pride in sharing only verified, working coupon codes. Our
team regularly tests each code to ensure your shopping experience with your favorite
stores and brands is smooth and frustration-free.</p>
<h2>
Important Terms &amp; Conditions:</h2>
<ul> 
    <li>We always post the most up-to-date terms for each coupon. Please review them
before use.</li><li>
● Click the &quot;Get Code&quot; button to ensure you are redirected to the correct brand’s
official website.</li><li>
● We value your feedback. If you encounter any issues or have suggestions,
please reach out to us at nativediscounts@gmail.com, and we’ll get back to you
soon.</li>
    </ul>
    </main>
    </>   

  );
}