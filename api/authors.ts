import type { VercelRequest, VercelResponse } from "@vercel/node";
import { listAuthors } from "../shared/catalog";

export default function handler(req: VercelRequest, res: VercelResponse) {
  return res.status(200).json(listAuthors(req.query));
}
