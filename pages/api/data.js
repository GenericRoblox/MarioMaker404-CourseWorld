import { kv } from "@vercel/kv";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const value = await kv.get("mm404:data");  // get from KV
    res.status(200).json(value || { counter: 0 });
  } 
  else if (req.method === "POST") {
    const current = (await kv.get("mm404:data")) || { counter: 0 };
    const updated = { counter: current.counter + 1 };

    await kv.set("mm404:data", updated);  // save to KV
    res.status(200).json(updated);
  } 
  else {
    res.status(405).end();
  }
}
