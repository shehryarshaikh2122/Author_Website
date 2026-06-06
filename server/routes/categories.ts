import type { Request, Response } from "express";
import { listCategories } from "../../shared/catalog";

export const getCategories = (_req: Request, res: Response): void => {
  res.json(listCategories());
};
