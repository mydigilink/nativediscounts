// app/api/signup/route.js
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
// import dbConnect from "@/lib/dbConnect";
//import User from "@/models/User";

// export async function POST(req) {
//   try {
//     const { name, email, password } = await req.json();

//     await dbConnect();

//     const existing = await User.findOne({ email });
//     if (existing) {
//       return NextResponse.json({ error: "User already exists" }, { status: 400 });
//     }

//     const hashed = await bcrypt.hash(password, 10);

//     const user = await User.create({
//       name,
//       email,
//       password: hashed,
//       provider: "credentials",
//     });

//     return NextResponse.json({ message: "User created", user });
//   } catch (err) {
//     return NextResponse.json({ error: err.message }, { status: 500 });
//   }
// }
