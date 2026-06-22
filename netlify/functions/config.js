const corsHeaders = {
  "Content-Type": "application/json; charset=utf-8",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
  "Access-Control-Allow-Methods": "GET, OPTIONS"
};

export default async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: corsHeaders });
  }

  if (req.method !== "GET") {
    return new Response(
      JSON.stringify({ error: "只支持 GET 请求" }),
      { status: 405, headers: corsHeaders }
    );
  }

  const gatewayUrl = process.env.NETLIFY_AI_GATEWAY_URL || "";
  const gatewayKey = process.env.NETLIFY_AI_GATEWAY_KEY || "";

  if (!gatewayUrl || !gatewayKey) {
    return new Response(
      JSON.stringify({ error: "AI Gateway not configured" }),
      { status: 500, headers: corsHeaders }
    );
  }

  return new Response(
    JSON.stringify({ gatewayUrl, gatewayKey }),
    { status: 200, headers: corsHeaders }
  );
};
