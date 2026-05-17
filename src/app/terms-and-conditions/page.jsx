import Head from 'next/head';
import Link from 'next/link';
export async function generateMetadata({ params }) {

  return {  
 
    title: "Terms & Conditions | Native Discounts",
    description:  "Review the Terms & Conditions of using Native Discounts. Understand your rights, responsibilities & fair use of our coupon and promo code platform.",
    keywords:"Terms & Conditions, User Agreement, Coupon Use, Promo Codes, Fair Use Policy, Liability, Privacy, Intellectual Property, Affiliate Disclosure, Native Discounts",
  };
}
export default function TermsAndConditions() {
  return (
    <>
      <Head>
        <title>Terms & Conditions | NativeDiscounts</title>
        <meta name="description" content="Review the Terms & Conditions for using NativeDiscounts.com." />
        {/* Optional: Bootstrap CSS via CDN if not globally included */}
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"
          rel="stylesheet"
        />
      </Head>
<link rel="canonical" href={`https://www.nativediscounts.com/terms-and-conditions`}/>
      <main className="container py-4">
        {/* Breadcrumb */}
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link href="/">Home</Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Terms & Conditions
            </li>
          </ol>
        </nav>

        <h1>Terms & Conditions</h1>
        <p><strong>Last Updated:</strong> [Insert Date]</p>
        <p>
          Welcome to NativeDiscounts.com (“NativeDiscounts,” “we,” “our,” or “us”). These Terms & Conditions (“Terms”) govern your access to and use of our website, mobile versions, and any associated platforms (including but not limited to Facebook, Instagram, and YouTube). By using our website, you agree to these Terms in full. If you do not agree, please discontinue use immediately.
        </p>

        <h2>1. About NativeDiscounts</h2>
        <p>
          NativeDiscounts is a deals and coupon-sharing platform that connects users with special offers, discounts, and promotions from various brands and online stores. We are not the seller or provider of the products or services advertised. Purchases made through our website are processed by the respective brands or merchants.
        </p>

        <h2>2. Affiliate Disclosure</h2>
        <p>
          NativeDiscounts may earn a commission from qualifying purchases made through links on our website or affiliated platforms. These commissions come at no extra cost to you and help us maintain our services.
        </p>

        <h2>3. Use of the Website</h2>
        <p>By using NativeDiscounts.com, you agree to:</p>
        <ul>
          <li>Use the website only for lawful purposes.</li>
          <li>Not misuse or attempt to interfere with the proper functioning of the site.</li>
          <li>Not attempt to gain unauthorized access to any systems or networks connected to NativeDiscounts.</li>
        </ul>
        <p>We reserve the right to restrict or terminate access to any user who violates these terms.</p>

        <h2>4. Accuracy of Information</h2>
        <p>We strive to ensure that all coupon codes, discounts, and offers listed are accurate and up-to-date. However:</p>
        <ul>
          <li>Codes may expire or be withdrawn without notice by the respective brands.</li>
          <li>We do not guarantee the availability or effectiveness of any coupon, deal, or discount.</li>
          <li>It is your responsibility to check the merchant’s terms before completing a purchase.</li>
        </ul>

        <h2>5. Third-Party Websites</h2>
        <p>Our site contains links to third-party websites, products, and services. We are not responsible for:</p>
        <ul>
          <li>The content, accuracy, or reliability of these third-party sites.</li>
          <li>Any transactions, disputes, or issues arising from purchases made on third-party sites.</li>
        </ul>
        <p>You should review the Terms & Conditions and Privacy Policies of any third-party site before engaging with it.</p>

        <h2>6. Intellectual Property</h2>
        <p>
          All content on NativeDiscounts.com — including text, graphics, logos, images, and design — is owned by or licensed to us and protected by intellectual property laws.
        </p>
        <p>You may not copy, reproduce, distribute, or modify any content without prior written consent.</p>
        <p>Brands, logos, and trademarks displayed belong to their respective owners.</p>

        <h2>7. Limitation of Liability</h2>
        <p>To the fullest extent permitted by law:</p>
        <ul>
          <li>NativeDiscounts shall not be liable for any loss, damage, or inconvenience arising from the use or inability to use our website or offers listed.</li>
          <li>We make no warranties, express or implied, regarding the performance, merchantability, or fitness for a particular purpose of any product or service promoted.</li>
        </ul>

        <h2>8. Indemnification</h2>
        <p>
          You agree to indemnify and hold harmless NativeDiscounts, its affiliates, and team members from any claims, liabilities, damages, or expenses (including legal fees) arising out of your use of our website or violation of these Terms.
        </p>

        <h2>9. Modifications</h2>
        <p>
          We reserve the right to update or modify these Terms at any time without prior notice. The updated version will be posted on this page with the “Last Updated” date. Continued use of our website constitutes acceptance of the revised Terms.
        </p>

        <h2>10. Governing Law</h2>
        <p>
          These Terms are governed by and construed in accordance with the laws of [Insert Country/State]. Any disputes will be subject to the exclusive jurisdiction of the courts in [Insert Jurisdiction].
        </p>

        <h2>11. Contact Us</h2>
        <p>
          For any questions about these Terms & Conditions, you can reach us at:
          <br />
          Email: <strong>[Insert Email Address]</strong>
          <br />
          Website Contact Form: <strong>[Insert Link]</strong>
        </p>
      </main>
    </>
  );
}
