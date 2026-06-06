import type { Request, Response } from "express";
import { authors, books } from "../data/mockData";
import type { AuthorDetailResponse, AuthorsResponse } from "@shared/api";

export const getAuthors = (req: Request, res: Response): void => {
  const search = (req.query.search as string)?.toLowerCase() || "";
  const genre = (req.query.genre as string)?.toLowerCase() || "";
  const nationality = (req.query.nationality as string)?.toLowerCase() || "";
  const featured = req.query.featured === "true";

  let filtered = [...authors];

  if (search) {
    filtered = filtered.filter(
      (a) =>
        a.name.toLowerCase().includes(search) ||
        a.biography.toLowerCase().includes(search) ||
        a.genres.some((g) => g.toLowerCase().includes(search))
    );
  }
  if (genre) {
    filtered = filtered.filter((a) =>
      a.genres.some((g) => g.toLowerCase().includes(genre))
    );
  }
  if (nationality) {
    filtered = filtered.filter((a) =>
      a.nationality.toLowerCase().includes(nationality)
    );
  }
  if (featured) {
    filtered = filtered.filter((a) => a.featured);
  }

  const response: AuthorsResponse = { authors: filtered, total: filtered.length };
  res.json(response);
};

export const getAuthorById = (req: Request, res: Response): void => {
  const id = parseInt(String(req.params.id));
  const author = authors.find((a) => a.id === id);

  if (!author) {
    res.status(404).json({ error: "Author not found" });
    return;
  }

  const authorBooks = books.filter((b) => b.authorId === id);
  const response: AuthorDetailResponse = {
    author,
    books: authorBooks,
    reviews: [],
  };
  res.json(response);
};
