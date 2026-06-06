import type { VercelRequest, VercelResponse } from "@vercel/node";
import { listCategories } from "../server/lib/categories";

export default function handler(_req: VercelRequest, res: VercelResponse) {
  return res.status(200).json(listCategories());
}
