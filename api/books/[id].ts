import type { VercelRequest, VercelResponse } from "@vercel/node";
import { createParamHandler } from "../../server/vercelAdapter";
import { getBookById } from "../../server/routes/books";

export default function handler(req: VercelRequest, res: VercelResponse) {
  return createParamHandler(getBookById, "id", req.query)(req, res);
}
