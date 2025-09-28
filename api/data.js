import { kv } from "@vercel/kv";

export default async function handler(req, res) {
  console.log("API called", req.method);

  try {
    if (req.method === "GET") {
      const value = await kv.get("mm404:data");
      console.log("GET value:", value);
      return res.status(200).json(value || { counter: 0 });
    } else if (req.method === "POST") {
      const current = (await kv.get("mm404:data")) || { counter: 0 };
      const updated = { counter: current.counter + 1 };
      await kv.set("mm404:data", updated);
      console.log("POST updated:", updated);
      return res.status(200).json(updated);
    } else {
      return res.status(405).end();
    }
  } catch (err) {
    console.error("API error:", err);
    return res.status(500).json({ error: err.message });
  }
}
