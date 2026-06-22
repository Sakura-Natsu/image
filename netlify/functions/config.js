const { jsonResponse } = require("../../server/imageProxy.cjs");

exports.handler = async function handler(event) {
  if (event.httpMethod === "OPTIONS") {
    return jsonResponse(204, {});
  }

  if (event.httpMethod !== "GET") {
    return jsonResponse(405, { error: "只支持 GET 请求" });
  }

  const gatewayUrl = process.env.NETLIFY_AI_GATEWAY_URL || "";
  const gatewayKey = process.env.NETLIFY_AI_GATEWAY_KEY || "";

  if (!gatewayUrl || !gatewayKey) {
    return jsonResponse(500, { error: "AI Gateway not configured" });
  }

  return jsonResponse(200, { gatewayUrl, gatewayKey });
};
