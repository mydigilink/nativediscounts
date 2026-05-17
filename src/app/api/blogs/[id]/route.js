import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function GET(req, { params }) {
  const { id } = await params; // ✅ await the params

  try {
    const client = await clientPromise;
    const db = client.db(process.env.DB_NAME);

    const blog = await db
      .collection("blogs")
      .findOne({ slug: id });

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


export async function PUT(req, { params }) {
  try {
    const { id } = await params;
    const body = await req.json();

    const client = await clientPromise;
    const db = client.db(process.env.DB_NAME);

    // remove _id if present
    if (body._id) {
      delete body._id;
    }

    const result = await db
      .collection("blogs")
      .updateOne({ _id: new ObjectId(id) }, { $set: body });

    return new Response(
      JSON.stringify({ modified: result.modifiedCount }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}
// export async function PUT(req, { params }) {
//   const { id } = await params;
//   const body = await req.json();

//   try {
//     const client = await clientPromise;
//     const db = client.db(process.env.DB_NAME);

//     const result = await db
//       .collection("blogs")
//       .updateOne({ _id: new ObjectId(id) }, { $set: body });

//     return new Response(JSON.stringify({ modified: result.modifiedCount }), {
//       status: 200,
//     });
//   } catch (error) {
//     return new Response(JSON.stringify({ error: error.message }), {
//       status: 500,
//     });
//   }
// }
