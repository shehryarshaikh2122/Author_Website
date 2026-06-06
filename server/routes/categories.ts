import { RequestHandler } from "express";
import { categories } from "../data/mockData";
import type { CategoriesResponse } from "@shared/api";

export const getCategories: RequestHandler = (_req, res) => {
  const response: CategoriesResponse = { categories };
  res.json(response);
};
