export async function POST(req) {
  try {
    const body = await req.json();

    const response = await fetch("http://145.79.6.38:9000/deploy", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body), // forward client payload
    });

    if (!response.ok) {
      return new Response("Failed to trigger deploy", { status: 500 });
    }

    return new Response("Deploy triggered successfully", { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response("Server error", { status: 500 });
  }
}
