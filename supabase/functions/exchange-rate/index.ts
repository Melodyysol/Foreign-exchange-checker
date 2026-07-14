const corsHeaders = {
  "Access-Control-Allow-Origin": "*", // lock to your Vercel domain once confirmed working
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
};

Deno.serve(async (req) => {
  // Handle the preflight request — this was the missing piece
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    // Strip the function's own name from the path, not just the leading slash.
    // e.g. "/currency-proxy/latest" -> "latest", "/currency-proxy/2026-07-06..2026-07-13" -> "2026-07-06..2026-07-13"
    const segments = url.pathname.split("/").filter(Boolean);
    const path = segments[segments.length - 1] || "latest";

    const searchParams = url.searchParams;
    const amount = searchParams.get("amount");
    const from = searchParams.get("from");
    const to = searchParams.get("to");

    if (!from || !to) {
      return new Response(
        JSON.stringify({ error: "Missing required query parameters. Expected 'from' and 'to'." }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    let endpoint = "";

    if (path === "latest" || path === "currency-proxy") {
      endpoint = `https://api.frankfurter.app/latest?amount=${amount ?? 1}&from=${from}&to=${to}`;
    } else if (/^\d{4}-\d{2}-\d{2}\.\.\d{4}-\d{2}-\d{2}$/.test(path)) {
      // matches the "startDate..endDate" path your frontend already sends
      endpoint = `https://api.frankfurter.app/${path}?amount=${amount ?? 1}&from=${from}&to=${to}`;
    } else {
      return new Response(
        JSON.stringify({ error: "Unsupported endpoint. Use /latest or /{startDate}..{endDate}." }),
        { status: 404, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const response = await fetch(endpoint);
    const contentType = response.headers.get("content-type") || "application/json";
    const body = await response.text();

    return new Response(body, {
      status: response.status,
      headers: { ...corsHeaders, "Content-Type": contentType },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }
});