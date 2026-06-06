import type { VercelRequest, VercelResponse } from "@vercel/node";
import { createParamHandler } from "../../server/vercelAdapter";
import { getAuthorById } from "../../server/routes/authors";

export default function handler(req: VercelRequest, res: VercelResponse) {
  return createParamHandler(getAuthorById, "id", req.query)(req, res);
}
