import type { Request, Response } from "express";
import { getBookById as findBook, listBooks } from "../lib/books";

export const getBooks = (req: Request, res: Response): void => {
  res.json(listBooks(req.query as Record<string, string | string[] | undefined>));
};

export const getBookById = (req: Request, res: Response): void => {
  const id = parseInt(String(req.params.id));
  const result = findBook(id);

  if (!result) {
    res.status(404).json({ error: "Book not found" });
    return;
  }

  res.json(result);
};
