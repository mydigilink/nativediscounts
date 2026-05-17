"use server";
// import nodemailer from "nodemailer";
import clientPromise from "@/lib/mongodb";
// import Contact from "@/models/Contact";

export async function POST(req) {
  try {
     const { name, email, subject, message } = await req.json();

    if (!name || !email || !subject || !message) {
      return new Response(JSON.stringify({ message: "All fields are required" }), { status: 400 });
    }



    const client = await clientPromise;
    const db = client.db(process.env.DB_NAME);

    // Save email to "newsletter_subscribers" collection
    await db.collection("contacts").insertOne({
      name,
      email,
      subject,
      message,
      createdAt: new Date()
    });

    return new Response(JSON.stringify({ message: "Inserted successfully" }), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}


