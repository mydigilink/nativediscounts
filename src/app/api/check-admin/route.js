import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export async function GET(req) {
  const token = req.cookies.get("admin_token")?.value;

  if (!token) {
    return NextResponse.json({ isAdmin: false }, { status: 401 });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return NextResponse.json({ isAdmin: true });
  } catch (err) {
    return NextResponse.json({ isAdmin: false }, { status: 401 });
  }
}
