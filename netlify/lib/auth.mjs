export const json = (body, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { "content-type": "application/json" } });

export function checkKey(given) {
  const expected = process.env.GALLERY_KEY;
  if (!expected) return json({ error: "Set GALLERY_KEY in Netlify (Site configuration → Environment variables), then redeploy." }, 503);
  if (!given || given !== expected) return json({ error: "Wrong password" }, 401);
  return null;
}
