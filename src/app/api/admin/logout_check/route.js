import { NextResponse } from "next/server";

export async function GET() {
  // Clear cookie by setting it to empty with expired date
  const response = NextResponse.redirect(new URL("/admin/login", process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"));
  response.cookies.set("admin_token", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    expires: new Date(0), // expired immediately
    path: "/"
  });
    response.cookies.set("author_token", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    expires: new Date(0), // expired immediately
    path: "/"
  });
  return response;
}
