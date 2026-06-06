import type { VercelRequest, VercelResponse } from "@vercel/node";
import { getBookById } from "../../server/lib/books";

export default function handler(req: VercelRequest, res: VercelResponse) {
  const id = parseInt(String(Array.isArray(req.query.id) ? req.query.id[0] : req.query.id));
  const result = getBookById(id);

  if (!result) {
    return res.status(404).json({ error: "Book not found" });
  }

  return res.status(200).json(result);
}
