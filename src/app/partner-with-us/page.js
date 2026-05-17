import Head from 'next/head';
import Link from 'next/link';
const canonicalUrl = "https://www.nativediscounts.com/partner-with-us";
export async function generateMetadata({ params }) {

  return {  
 
    title: "Partner With Us | Native Discounts Affiliates & Brands",
    description:  "Collaborate with Native Discounts! Partner with us to boost your brand visibility, increase sales & reach US shoppers through coupons & promo deals.",
    keywords:"Partner With Us, Affiliate Program, Brand Partnerships, Collaborate, Boost Sales, Exclusive Deals, Promotions, Marketing Opportunities",
  
   alternates: {
        canonical: canonicalUrl,
      },
    };
}
export default function PartnerWithUs() {
  return (
     <>
     <section><link rel="canonical" href={canonicalUrl}/>
     <title>Partner With Us – Boost Your Brand with Native Discounts | Affiliates & Brands
</title>  
        <meta
          name="description"
          content="Collaborate with Native Discounts! Partner with us to boost your brand visibility, increase sales & reach US shoppers through coupons & promo deals."    />
    <div className="container py-4">
        {/* Breadcrumb Navigation */}
        <nav aria-label="breadcrumb">   


            <ol className="breadcrumb">
                <li className="breadcrumb-item">
                    <Link href="/">Home</Link>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  Partner With Us
                </li>
            </ol> 
        </nav>
        <h1>Partner With Us</h1>
        <p>

At Native Discounts, we are always looking to collaborate with brands and affiliates who share our passion for providing value to shoppers. By partnering with us, you can leverage our platform to reach a wider audience, increase your sales, and enhance your brand visibility.</p>
<h2>Why Partner With Native Discounts?</h2>
<ul>
<li><b>Wide Reach:</b> Access our extensive user base of savvy shoppers looking for the best deals and discounts.</li>
<li><b>Increased Sales:</b> Drive more traffic to your website and boost conversions through our targeted promotions.</li>
<li><b>Brand Visibility:</b> Enhance your brand presence by featuring your offers on our high-traffic platform.</li>
<li><b>Performance Tracking:</b> Monitor the success of your campaigns with our detailed analytics and reporting tools.</li>
</ul>
<h2>How to Get Started</h2>
<p>If you are interested in partnering with Native Discounts, please reach out to us at <a href="mailto:support@nativediscounts.com"> support@nativediscounts.com</a> with the following information:</p>
<ul>
<li>Your company name and website</li>
<li>A brief description of your brand and products/services</li>
<li>Your goals for the partnership</li>
<li>Any specific offers or promotions you would like to feature</li>
</ul>
<p>We look forward to collaborating with you and helping your brand grow!</p>
    </div>
    </section>    

              
     </>
  )}