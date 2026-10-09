import { getStore } from "@netlify/blobs";
import { checkKey } from "../lib/auth.mjs";

export default async (req) => {
  const url = new URL(req.url);
  const denied = checkKey(url.searchParams.get("key"));
  if (denied) return denied;

  const k = url.searchParams.get("k") || "";
  if (!/^[a-z0-9_-]+\/\d{3}\.jpg$/i.test(k)) return new Response("Not found", { status: 404 });

  const store = getStore({ name: "scans", consistency: "strong" });
  const data = await store.get(k, { type: "arrayBuffer" });
  if (!data) return new Response("Not found", { status: 404 });

  return new Response(data, {
    headers: { "content-type": "image/jpeg", "cache-control": "private, max-age=86400" },
  });
};

export const config = { path: "/api/photo" };
