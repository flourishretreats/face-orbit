import { getStore } from "@netlify/blobs";
import { checkKey, json } from "../lib/auth.mjs";

export default async (req) => {
  const denied = checkKey(req.headers.get("x-key"));
  if (denied) return denied;

  const store = getStore({ name: "scans", consistency: "strong" });
  const { blobs } = await store.list();

  const bySession = new Map();
  for (const { key } of blobs) {
    const slash = key.indexOf("/");
    if (slash < 0) continue;
    const id = key.slice(0, slash);
    if (!bySession.has(id)) bySession.set(id, []);
    bySession.get(id).push(key);
  }

  // Newest first: session ids carry a YYYYMMDD-HHMMSS stamp after the name
  const stamp = (id) => (id.match(/_(\d{8}-\d{6})_/) || [, ""])[1];
  const sessions = [...bySession.entries()]
    .map(([id, files]) => ({ id, files: files.sort() }))
    .sort((a, b) => stamp(b.id).localeCompare(stamp(a.id)));

  return json({ sessions });
};

export const config = { path: "/api/list" };
