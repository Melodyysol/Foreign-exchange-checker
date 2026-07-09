Deno.serve(async (req) => {
  try {
    const url = new URL(req.url);
    const path = url.pathname.replace(/^\//, "") || "latest";
    const searchParams = url.searchParams;
    const amount = searchParams.get("amount");
    const from = searchParams.get("from");
    const to = searchParams.get("to");
    const startDate = searchParams.get("startDate");
    const endDate = searchParams.get("endDate");

    if (!from || !to) {
      return new Response(JSON.stringify({
        error: "Missing required query parameters. Expected 'from' and 'to'.",
      }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    let endPoint = "";

    if (path === "latest") {
      endPoint = `https://api.frankfurter.app/latest?amount=${amount ?? 1}&from=${from}&to=${to}`;
    } else if (path === "history") {
      if (!startDate || !endDate) {
        return new Response(JSON.stringify({
          error: "Missing required query parameters for history. Expected 'startDate' and 'endDate'.",
        }), {
          status: 400,
          headers: { "Content-Type": "application/json" },
        });
      }
      endPoint = `https://api.frankfurter.app/${startDate}..${endDate}?amount=${amount ?? 1}&from=${from}&to=${to}`;
    } else {
      return new Response(JSON.stringify({
        error: "Unsupported endpoint. Use /latest or /history.",
      }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    const response = await fetch(endPoint);
    const contentType = response.headers.get("content-type") || "application/json";
    const body = await response.text();

    return new Response(body, {
      status: response.status,
      headers: {
        "Content-Type": contentType,
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
});
