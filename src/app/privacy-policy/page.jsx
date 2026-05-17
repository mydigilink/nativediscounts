import Head from 'next/head';
import Link from 'next/link';
export async function generateMetadata({ params }) {

  return {
    title: "Privacy Policy | Native Discounts",
    description:  "Read Native Discounts’ Privacy Policy to understand how we protect your data, ensure transparency, and maintain safe browsing for all users.",
    keywords:"",
  };
}


export default function PrivacyPolicy() {
  return (
     <>
    <link rel="canonical" href={`https://www.nativediscounts.com/privacy-policy`}/>
      <main className="container py-4">
        {/* Breadcrumb */}
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link href="/">Home</Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Privacy Policy
            </li>
          </ol>
        </nav>

        <h1>Privacy Policy</h1>
        <p><strong>Last Updated:</strong> 4-Oct-2025</p>
        <p>
          NativeDiscounts.com (“NativeDiscounts,” “we,” “our,” or “us”) values your privacy.
          This Privacy Policy explains how we collect, use, and protect your personal
          information when you visit our website, use our services, or interact with our
          content on associated platforms such as Facebook, Instagram, and YouTube.
        </p>
        <p>
          By using our website, you agree to the terms outlined below. If you do not agree,
          please discontinue use immediately.
        </p>

        <h2>1. Information We Collect</h2>
        <h3>a. Personal Information (Voluntarily Provided):</h3>
        <p>
          Name, email address, and other details you provide when signing up for our newsletter
          or contacting us.
        </p>

        <h3>b. Non-Personal Information (Automatically Collected):</h3>
        <p>
          IP address, browser type, device information, operating system, referring/exit pages,
          and click activity.
        </p>

        <h3>c. Cookies and Tracking Technologies:</h3>
        <p>
          We use cookies, pixels, and similar tools to improve user experience, track performance,
          and deliver targeted offers.
        </p>

        <h2>2. How We Use Your Information</h2>
        <ul>
          <li>Providing you with relevant coupons, deals, and promotions.</li>
          <li>Improving our website’s functionality and content.</li>
          <li>Sending newsletters or promotional emails (if you have opted in).</li>
          <li>Analyzing user trends and website usage for performance optimization.</li>
          <li>Ensuring compliance with applicable laws and regulations.</li>
        </ul>

        <h2>3. Affiliate Links & Tracking</h2>
        <ul>
          <li>
            When you click on certain links, a tracking cookie may be placed on your browser.
          </li>
          <li>
            If you make a qualifying purchase, we may earn a commission at no extra cost to you.
          </li>
          <li>
            These cookies are used solely for commission tracking and not for collecting
            sensitive personal data.
          </li>
        </ul>

        <h2>4. Sharing Your Information</h2>
        <ul>
          <li>
            With trusted service providers (e.g., email marketing tools, analytics services) who
            assist in operating our website.
          </li>
          <li>If required by law or to protect our legal rights.</li>
        </ul>

        <h2>5. Your Privacy Rights</h2>
        <p>Depending on your location, you may have rights under GDPR, CCPA, or similar laws, including:</p>
        <ul>
          <li>Accessing the personal data we hold about you.</li>
          <li>Requesting correction or deletion of your data.</li>
          <li>Opting out of marketing emails at any time.</li>
        </ul>
        <p>To exercise these rights, contact us at <strong>[Insert Email Address]</strong>.</p>

        <h2>6. Data Security</h2>
        <p>
          We take reasonable technical and organizational measures to protect your data against
          unauthorized access, loss, or misuse. However, no method of online transmission is
          100% secure.
        </p>

        <h2>7. Cookies & Opt-Out</h2>
        <p>
          You can manage cookies by adjusting your browser settings. Some features of our site
          may not function properly if cookies are disabled.
        </p>

        <h2>8. Third-Party Websites</h2>
        <p>
          Our site contains links to third-party merchants and platforms. We are not responsible
          for the privacy practices of these external sites. Please review their privacy policies
          before providing any personal information.
        </p>

        <h2>9. Policy Updates</h2>
        <p>
          We may update this Privacy Policy periodically. The revised version will be posted on
          this page with the updated date. Continued use of our site constitutes acceptance of
          any changes.
        </p>

        <h2>10. Contact Us</h2>
        <p>
          For privacy-related questions or requests:
          <br />
          Email: <strong>support@nativediscounts.com</strong>
          <br />
          Website Contact Form: <strong>contact@nativediscounts.com</strong>
        </p>
      </main>
    </>
  );
}
