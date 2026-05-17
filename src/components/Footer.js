"use client";
import Link from "next/link";
import Image from "next/image";
import SocialIcons from "./SocialIcons";
import BackToTop from "./BackToTop";
import FooterNewsletter from "./FooterNewsletter";

export default function Footer({ searchParms }) {
  const country = searchParms?.countryCode || "us";

  return (
    <>
      <footer className="bg-dark text-white pt-5 pb-4" role="contentinfo">
        <div className="container pt-5">
          <div className="row">
            {/* Savings */}
            {/* <div className="col-md-3 mb-4" role="navigation" aria-label="Savings">
              <h5 className="text-warning text-sm text-uppercase fw-bold">Savings</h5>
              <ul className="list-unstyled" role="list">
                <li><Link href={`/`} className="text-white text-decoration-none text-sm">Restaurant Vouchers</Link></li>
                <li><Link href={`/`} className="text-white text-decoration-none text-sm">Exclusive Savings</Link></li>
                <li><Link href={`/`} className="text-white text-decoration-none text-sm">Printable Vouchers</Link></li>
                <li><Link href={`/`} className="text-white text-decoration-none text-sm">Student Vouchers</Link></li>
                <li><Link href={`/`} className="text-white text-decoration-none text-sm">All Brands</Link></li>
                <li><Link href={`/`} className="text-white text-decoration-none text-sm">NHS Discounts</Link></li>
                <li><Link href={`/`} className="text-white text-decoration-none text-sm">Black Friday</Link></li>
                <li><Link href={`/`} className="text-white text-decoration-none text-sm">VoucherCodes VIP</Link></li>
              </ul>
            </div> */}

            {/* Help */}
            <div className="col-md-3 mb-4" role="navigation" aria-label="Help">
              <h5 className="text-warning text-sm text-uppercase fw-bold">Help</h5>
              <ul className="list-unstyled" role="list">
                {/* <li><Link href={`/`} className="text-white text-decoration-none text-sm">Support</Link></li>
                <li><Link href={`/`} className="text-white text-decoration-none text-sm">Reward FAQs</Link></li> */}
                  <li><Link href={`/affiliate-disclosure`} className="text-white text-decoration-none text-sm">Affiliate Disclosure</Link></li>
                  <li><Link href={`/anti-spam-policy`} className="text-white text-decoration-none text-sm">Anti Spam Policy</Link></li>
                  <li><Link href={`/how-to-use-coupon-code`} className="text-white text-decoration-none text-sm">How to Use Coupon Code</Link></li>
           
             
                <li><Link href={`/coupon-code-guarantee`} className="text-white text-decoration-none text-sm">Code Guarantee</Link></li>
             
                 </ul>
            </div>

            {/* About */}
            <div className="col-md-3 mb-4" role="navigation" aria-label="About">
              <h5 className="text-warning text-sm text-uppercase fw-bold">About</h5>
              <ul className="list-unstyled" role="list">
                <li><Link href={`/about-us`} className="text-white text-decoration-none text-sm">About Us</Link></li>
              
                <li><Link href={`/blog/`} className="text-white text-decoration-none text-sm">Blogs</Link></li>
                  <li><Link href={`/partner-with-us`} className="text-white text-decoration-none text-sm">Partner With Us</Link></li>
                     <li><Link href={`/contact-us`} className="text-white text-decoration-none text-sm">Contact Us</Link></li>
                {/* <li><Link href={`/`} className="text-white text-decoration-none text-sm">Careers</Link></li>
                <li><Link href={`/`} className="text-white text-decoration-none text-sm">Charity</Link></li>
                <li><Link href={`/`} className="text-white text-decoration-none text-sm">Community</Link></li>
                <li><Link href={`/`} className="text-white text-decoration-none text-sm">Tech Insights</Link></li>
          */}    </ul> 
            </div>

            {/* Browser Extension & Social */}
            <div className="col-md-3 mb-4">
              {/* <h5 className="text-warning text-sm text-uppercase fw-bold mt-3">Browser Extension</h5>
              <Image
                width={150}
                height={80}
                src="/icons/chrome-store.svg"
                alt="Install our Chrome Extension"
              /> */}

              <h5 className="text-warning text-sm text-uppercase fw-bold ">Join Us</h5>
              <SocialIcons />
            </div>
             <div className="col-md-3 mb-4">  <FooterNewsletter /></div>
          </div>

          {/* Social Icons (fallback) */}
         

          {/* TrustPilot Section */}
          {/* <div className="text-center small mb-3" aria-label="Trustpilot reviews">
            Our members say <span className="fw-bold">Excellent</span>
            <Image
              height={20}
              width={100}
              src="/icons/4.5-stars.svg"
              alt="Trustpilot rating: 4.4 out of 5"
              className="mx-2"
            />
            4.4 out of 5 based on <strong>23,048 reviews</strong>
          </div> */}
          <div className="text-center mt-3 mb-0" aria-label="Affiliate disclosure">
<small className="text-grey">We may earn a small commission when you shop through our links on NativeDiscounts.com or
our social platforms. See our Terms &amp; Conditions for details.
</small>
<nav
            className="text-center mt-1 mb-2"
            role="navigation"
            aria-label="Legal and Policies"
          >
            <Link href="/privacy-policy" className="text-white text-decoration-none text-xs mx-2">Privacy Notice</Link>
            <Link href="/partner-with-us" className="text-white text-decoration-none text-xs mx-2">Partner With Us</Link>
            <Link href="/terms-and-conditions" className="text-white text-decoration-none text-xs mx-2">Terms and Conditions</Link>
          </nav>
</div>
          {/* Legal */}
          <div className="text-center small text-white" aria-label="Legal information">
            © Copyright {new Date().getFullYear()} | All Rights Reserved - Designed & Developed by NativeDiscounts
          </div>

          {/* Bottom Links */}
          
        </div>
      </footer>

      {/* Back to top button */}
      <BackToTop />
    </>
  );
}
