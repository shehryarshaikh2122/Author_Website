import type { Request, Response } from "express";
import { listCategories } from "../lib/categories";

export const getCategories = (_req: Request, res: Response): void => {
  res.json(listCategories());
};
