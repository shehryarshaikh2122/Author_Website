import type { VercelRequest, VercelResponse } from "@vercel/node";
import { listBooks } from "../server/lib/books";

export default function handler(req: VercelRequest, res: VercelResponse) {
  return res.status(200).json(listBooks(req.query));
}
