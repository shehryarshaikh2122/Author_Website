import type { VercelRequest, VercelResponse } from "@vercel/node";
import { listAuthors } from "../server/lib/authors";

export default function handler(req: VercelRequest, res: VercelResponse) {
  return res.status(200).json(listAuthors(req.query));
}
