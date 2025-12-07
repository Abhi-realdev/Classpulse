// Edge Function with CORS headers
// NOTE: This won't fix your CORS issue with Supabase API!
// Your app calls Supabase API directly, which is blocked by CORS.
// You need to configure CORS in Supabase Dashboard instead.

export const handler = async (req: Request): Promise<Response> => {
  // Handle preflight (OPTIONS)
  if (req.method === "OPTIONS") {
    return new Response("ok", {
      status: 204,
      headers: {
        "Access-Control-Allow-Origin": "*",  // or your domain
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization, apikey",
      },
    });
  }

  // Your actual logic
  const result = { success: true };

  return new Response(JSON.stringify(result), {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",  // or your domain
    },
  });
};

