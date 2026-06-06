import type { Request, Response } from "express";
import { getAuthorById as findAuthor, listAuthors } from "../../shared/catalog";

export const getAuthors = (req: Request, res: Response): void => {
  res.json(listAuthors(req.query as Record<string, string | string[] | undefined>));
};

export const getAuthorById = (req: Request, res: Response): void => {
  const id = parseInt(String(req.params.id));
  const result = findAuthor(id);

  if (!result) {
    res.status(404).json({ error: "Author not found" });
    return;
  }

  res.json(result);
};
