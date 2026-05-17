import clientPromise from "@/lib/mongodb";

export async function GET() {
  const client = await clientPromise;
  const db = client.db(process.env.DB_NAME);

  const brands = await db.collection("brands").find().toArray();
  return Response.json(brands);
}

