import clientPromise from "@/lib/mongodb";

export async function POST(req) {
  try {
    const { email, countryCode } = await req.json();
    if (!email) return new Response("Email is required", { status: 400 });

    const client = await clientPromise;
    const db = client.db(process.env.DB_NAME);

    // Save email to "newsletter_subscribers" collection
    await db.collection("newsletter_subscribers").insertOne({
      email,
      countryCode,
      subscribedAt: new Date()
    });

    return new Response(JSON.stringify({ message: "Subscribed successfully" }), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
