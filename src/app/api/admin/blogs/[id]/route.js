import clientPromise from "@/lib/mongodb";
import { ObjectId } from "bson";  // ✅ instead of "mongodb"

export async function PUT(req, { params }) {
  try {
    const body = await req.json();
    const client = await clientPromise;
    const db = client.db(process.env.DB_NAME);

    await db.collection("blogs").updateOne(
      { _id: new ObjectId(params.id), },
      {  $set: {
      ...body,
      lastUpdated: new Date(), // set current date & time
    } }
    );

    return new Response(JSON.stringify({ message: "Updated successfully" }), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
export async function GET(req, { params }) {
  const { slug } = await params; // ✅ await the params

  try {
    const client = await clientPromise;
    const db = client.db(process.env.DB_NAME);

    const blog = await db
      .collection("blogs")
      .findOne({  _id: new ObjectId(params.id) });

    if (!blog) {
      return new Response(JSON.stringify({ error: "Blog not found" }), {
        status: 404,
      });
    }

    return new Response(JSON.stringify(blog), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}

export async function DELETE(req, { params }) {
  try {
    const client = await clientPromise;
    const db = client.db(process.env.DB_NAME);

    await db.collection("blogs").deleteOne({ _id: new ObjectId(params.id) });

    return new Response(JSON.stringify({ message: "Deleted successfully" }), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
