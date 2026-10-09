import { getStore } from "@netlify/blobs";
import { checkKey, json } from "../lib/auth.mjs";

export default async (req) => {
  if (req.method !== "POST") return json({ error: "Use POST" }, 405);
  const denied = checkKey(req.headers.get("x-key"));
  if (denied) return denied;

  const { session } = await req.json().catch(() => ({}));
  if (!session || !/^[a-z0-9_-]+$/i.test(session)) return json({ error: "Missing scan id" }, 400);

  const store = getStore({ name: "scans", consistency: "strong" });
  const { blobs } = await store.list({ prefix: `${session}/` });
  await Promise.all(blobs.map((b) => store.delete(b.key)));
  return json({ ok: true, deleted: blobs.length });
};

export const config = { path: "/api/delete" };
