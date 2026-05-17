import { Nunito } from "next/font/google";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/globals.css";
export const dynamic = "force-dynamic";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Providers from "./providers";

import { headers } from "next/headers";
import Script from "next/script";

// ✅ Configure Google font
const nunito = Nunito({
  subsets: ["latin"],
  weight: ["400", "600", "700"], // add weights you need
});

export const metadata = {
  // title: "Best US Online Deals, Discount Codes & Offers | NativeDiscounts", // default title
  // description: "Get the best US online deals, verified discount codes and promo offers across top brands. Save more on every purchase with 100% working coupons on NativeDiscounts.", // optional
 
};

export default async function RootLayout({ children, params }) {
  // ✅ Safe header access
  // const pathname = headers().get("x-invoke-path") || "";
  // const isAdmin = pathname.includes("admin");

  // ✅ Handle country code from params
  const lang = params?.country || "en";
  const countryCode = params?.country || "us";

  return (
    <html lang={lang}>
      <head>
        {/* <meta name="robots" content="noindex, nofollow" /> */}

        {/* ✅ Inline script */}
        <Script id="custom-inline-script" strategy="afterInteractive">
          {`
            console.log("Custom JS loaded");
            document.body.classList.add("custom-loaded");
          `}
        </Script>
       
<Script  id="Gtag" strategy="afterInteractive">{
  `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-KQ7P6ZG');`}</Script>

      </head>
 {/* ${
          isAdmin ? "admin-body" : ""
        } */}
      <body
        className={`${nunito.className} bg-light`}
      >
          <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-KQ7P6ZG"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>
        <Providers>
            {/* Google Tag Manager (noscript) */}
     
          <Header countryCode={countryCode} />
          {children}
          <Footer searchParms={{ countryCode }} />
        </Providers>
      </body>
    </html>
  );
}
