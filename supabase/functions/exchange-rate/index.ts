import { serve } from "https://deno.land/std@0.210.0/http/server.ts";

serve(async (req) => {
  try {
    const { amount, from, to } = await req.json();
    const response = await fetch(
      `https://api.frankfurter.app/latest?amount=${amount}&from=${from}&to=${to}`,
    );

    if (!response.ok) {
      return new Response(
        JSON.stringify({ error: "Failed to fetch exchange rates" }),
        {
          status: response.status,
          headers: { "Content-Type": "application/json" },
        },
      );
    }

    const data = await response.json();

    return new Response(JSON.stringify(data), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({
        error: error instanceof Error ? error.message : "Unknown error",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
});
