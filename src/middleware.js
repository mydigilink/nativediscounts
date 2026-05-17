import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const PUBLIC_FILE = /\.(.*)$/;
const JWT_SECRET = process.env.JWT_SECRET || "your_secret_key";

// Country → Open Graph locale map
const localeMap = {
  US: "en_US",
  GB: "en_GB",
  IN: "en_IN",
  CA: "en_CA",
  AU: "en_AU",
  FR: "fr_FR",
  DE: "de_DE",
  ES: "es_ES",
  MX: "es_MX",
  BR: "pt_BR",
  PT: "pt_PT",
  IT: "it_IT",
  NL: "nl_NL",
  RU: "ru_RU",
  CN: "zh_CN",
  TW: "zh_TW",
  JP: "ja_JP",
  KR: "ko_KR",
  SA: "ar_SA",
  AE: "ar_AE",
};

export function middleware(req) {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get("admin_token")?.value;
  const author_token = req.cookies.get("author_token")?.value;

  // ✅ Detect country → map to OG locale
  const country =
    req.headers.get("x-vercel-ip-country") || // works on Vercel
    req.geo?.country ||                       // some providers (Cloudflare, etc.)
    "US";                                     // fallback

  const locale = localeMap[country] || "en_US";

  // ✅ Always create a response so we can attach the cookie
  const res = NextResponse.next();
  res.cookies.set("og_locale", locale, { path: "/" });

  // ==============================
  // 🔐 Admin Authentication Logic
  // ==============================
  if (token || author_token) {
    try {
      jwt.verify(token, JWT_SECRET); // optional validation

      if (pathname.startsWith("/admin/login")) {
        return NextResponse.redirect(new URL("/admin/dashboard", req.url));
      }

      return res; // ✅ allow access but keep og_locale cookie
    } catch {
      // Invalid token → redirect to login
      // return NextResponse.redirect(new URL("/admin/login", req.url));
    }
  } else if (!token && !author_token && !pathname.startsWith("/admin/login")) {
    // return NextResponse.redirect(new URL("/admin/login", req.url));
  }

  // ✅ Default allow + keep og_locale cookie
  return res;
}

export const config = {
  matcher: ["/:path*"], // Apply middleware globally (admin + frontend)
};
