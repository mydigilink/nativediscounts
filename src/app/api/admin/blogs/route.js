import clientPromise from "@/lib/mongodb";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db(process.env.DB_NAME);
    const blogs = await db.collection("blogs").find({}).toArray();
    return new Response(JSON.stringify(blogs), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}

export async function POST(req) {
  try {
    const body = await req.json();
    const client = await clientPromise;
    const db = client.db(process.env.DB_NAME);
    const result = await db.collection("blogs").insertOne({
  ...body,
  publishDate: new Date().toISOString().split("T")[0], // YYYY-MM-DD
});
    return new Response(JSON.stringify(result), { status: 201 });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
