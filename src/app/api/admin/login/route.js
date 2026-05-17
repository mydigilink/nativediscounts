export const runtime = "nodejs";

import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;
const STATIC_EMAIL = "admin@nativediscounts.com";
const STATIC_PASSWORD = "nDiscounts_?@123";

export async function POST(req) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { message: "Email and password are required" },
        { status: 400 }
      );
    }

    if (!JWT_SECRET || !STATIC_EMAIL || !STATIC_PASSWORD) {
      console.error("❌ Missing environment variables");
      return NextResponse.json(
        { message: "Server misconfiguration" },
        { status: 500 }
      );
    }

    // 🔐 STATIC LOGIN CHECK
    if (email !== STATIC_EMAIL || password !== STATIC_PASSWORD) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 }
      );
    }

    // ✅ Create token
    const token = jwt.sign(
      {
        id: "static-user",
        role: "admin",
        email,
      },
      JWT_SECRET,
      { expiresIn: "1d" }
    );

   
      const res = NextResponse.json({
        message: "Admin login successful",
        role: "admin",
      });

      res.cookies.set("admin_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
        maxAge: 60 * 60 * 24,
      });

      return res;
    
  } catch (error) {
    console.error("🔥 LOGIN ERROR", error);

    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    );
  }
}

// export const runtime = "nodejs"; // 🔴 REQUIRED for bcrypt, jwt, mongodb

// import clientPromise from "@/lib/mongodb";
// import { NextResponse } from "next/server";
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";

// const JWT_SECRET = process.env.JWT_SECRET;

// export async function POST(req) {
//   try {
//     // 1️⃣ Parse body
//     const body = await req.json();
//     const { email, password } = body;

//     if (!email || !password) {
//       return NextResponse.json(
//         { message: "Email/Username and password are required" },
//         { status: 400 }
//       );
//     }

//     // 2️⃣ Validate ENV
//     if (!JWT_SECRET) {
//       console.error("❌ JWT_SECRET missing");
//       return NextResponse.json(
//         { message: "Server misconfiguration" },
//         { status: 500 }
//       );
//     }

//     // 3️⃣ Connect DB
//     const client = await clientPromise;
//     const db = client.db(process.env.DB_NAME);

//     /* ============================
//        🔐 ADMIN LOGIN
//     ============================ */
//     const admin = await db.collection("admins").findOne({ email });

//     if (admin) {
//       const isMatch = await bcrypt.compare(password, admin.password);

//       if (!isMatch) {
//         return NextResponse.json(
//           { message: "Invalid credentials" },
//           { status: 401 }
//         );
//       }

//       const token = jwt.sign(
//         { id: admin._id.toString(), role: "admin", email: admin.email },
//         JWT_SECRET,
//         { expiresIn: "1d" }
//       );

//       const res = NextResponse.json({
//         message: "Admin login successful",
//         role: "admin",
//       });

//       res.cookies.set("admin_token", token, {
//         httpOnly: true,
//         secure: process.env.NODE_ENV === "production",
//         sameSite: "strict",
//         path: "/",
//         maxAge: 60 * 60 * 24,
//       });

//       return res;
//     }

//     /* ============================
//        👤 AUTHOR LOGIN
//     ============================ */
//     const author = await db
//       .collection("authors")
//       .findOne({ userEmail: email });

//     if (!author) {
//       return NextResponse.json(
//         { message: "Invalid credentials" },
//         { status: 401 }
//       );
//     }

//     const isAuthorMatch = await bcrypt.compare(password, author.password);

//     if (!isAuthorMatch) {
//       return NextResponse.json(
//         { message: "Invalid credentials" },
//         { status: 401 }
//       );
//     }

//     const userToken = jwt.sign(
//       {
//         id: author._id.toString(),
//         role: "author",
//         userEmail: author.userEmail,
//       },
//       JWT_SECRET,
//       { expiresIn: "1d" }
//     );

//     const res = NextResponse.json({
//       message: "User login successful",
//       role: "author",
//     });

//     res.cookies.set("author_token", userToken, {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === "production",
//       sameSite: "strict",
//       path: "/",
//       maxAge: 60 * 60 * 24,
//     });

//     return res;
//   } catch (error) {
//     console.error("🔥 LOGIN ERROR");
//     console.error(error.message);
//     console.error(error.stack);

//     return NextResponse.json(
//       {
//         message: "Server error",
//         error: error.message,
//       },
//       { status: 500 }
//     );
//   }
// }
