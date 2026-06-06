import type { Request, Response } from "express";
import { categories } from "../data/mockData";
import type { CategoriesResponse } from "@shared/api";

export const getCategories = (_req: Request, res: Response): void => {
  const response: CategoriesResponse = { categories };
  res.json(response);
};
