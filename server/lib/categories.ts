import { categories } from "../data/mockData";
import type { CategoriesResponse } from "../../shared/api";

export function listCategories(): CategoriesResponse {
  return { categories };
}
