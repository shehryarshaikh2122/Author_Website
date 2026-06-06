import type { VercelRequest, VercelResponse } from "@vercel/node";
import { listCategories } from "../shared/catalog";

export default function handler(_req: VercelRequest, res: VercelResponse) {
  return res.status(200).json(listCategories());
}
