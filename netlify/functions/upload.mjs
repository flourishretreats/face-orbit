import { getStore } from "@netlify/blobs";

const json = (body, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { "content-type": "application/json" } });

export default async (req) => {
  if (req.method !== "POST") return json({ error: "Use POST" }, 405);

  const session = (req.headers.get("x-session") || "").replace(/[^a-z0-9_-]/gi, "").slice(0, 80);
  const index = Number.parseInt(req.headers.get("x-index") || "", 10);
  if (!session || !(index >= 0 && index < 400)) return json({ error: "Missing scan details" }, 400);

  const buf = await req.arrayBuffer();
  if (buf.byteLength < 1000) return json({ error: "Photo is empty" }, 400);
  if (buf.byteLength > 5_500_000) return json({ error: "Photo is too large" }, 413);
  const head = new Uint8Array(buf, 0, 2);
  if (head[0] !== 0xff || head[1] !== 0xd8) return json({ error: "Only JPEG photos are accepted" }, 415);

  const store = getStore({ name: "scans", consistency: "strong" });
  await store.set(`${session}/${String(index).padStart(3, "0")}.jpg`, buf);
  return json({ ok: true });
};

export const config = { path: "/api/upload" };
