// /app/api/data/route.js
export async function GET(request) {
  try {
    // Example data
    const data = {
      message: "Hello from the API!",
      timestamp: new Date().toISOString()
    };

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to fetch data' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
