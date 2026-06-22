import imageProxy from "../../server/imageProxy.cjs";

const { handleProxyRequest, jsonResponse } = imageProxy;

export default async (req) => {
  if (req.method === "OPTIONS") {
    const r = jsonResponse(204, {});
    return new Response(r.body, { status: r.statusCode, headers: r.headers });
  }

  if (req.method !== "POST") {
    const r = jsonResponse(405, { error: "只支持 POST 请求" });
    return new Response(r.body, { status: r.statusCode, headers: r.headers });
  }

  const body = await req.text();
  const r = await handleProxyRequest(body);
  return new Response(r.body, { status: r.statusCode, headers: r.headers });
};
