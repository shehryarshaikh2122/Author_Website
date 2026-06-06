import type { Request, Response } from "express";
import { authors, books, reviews } from "../data/mockData";
import type { BookDetailResponse, BooksResponse } from "@shared/api";

export const getBooks = (req: Request, res: Response): void => {
  const search = (req.query.search as string)?.toLowerCase() || "";
  const genre = (req.query.genre as string)?.toLowerCase() || "";
  const authorId = req.query.authorId ? parseInt(req.query.authorId as string) : null;
  const featured = req.query.featured === "true";
  const trending = req.query.trending === "true";
  const categoryId = req.query.categoryId ? parseInt(req.query.categoryId as string) : null;

  let filtered = [...books];

  if (search) {
    filtered = filtered.filter(
      (b) =>
        b.title.toLowerCase().includes(search) ||
        b.authorName.toLowerCase().includes(search) ||
        b.description.toLowerCase().includes(search)
    );
  }
  if (genre) {
    filtered = filtered.filter((b) => b.genre.toLowerCase().includes(genre));
  }
  if (authorId) {
    filtered = filtered.filter((b) => b.authorId === authorId);
  }
  if (featured) {
    filtered = filtered.filter((b) => b.featured);
  }
  if (trending) {
    filtered = filtered.filter((b) => b.trending);
  }
  if (categoryId) {
    filtered = filtered.filter((b) => b.categoryId === categoryId);
  }

  const response: BooksResponse = { books: filtered, total: filtered.length };
  res.json(response);
};

export const getBookById = (req: Request, res: Response): void => {
  const id = parseInt(String(req.params.id));
  const book = books.find((b) => b.id === id);

  if (!book) {
    res.status(404).json({ error: "Book not found" });
    return;
  }

  const author = authors.find((a) => a.id === book.authorId)!;
  const relatedBooks = books
    .filter((b) => b.authorId === book.authorId && b.id !== book.id)
    .slice(0, 4);
  const bookReviews = reviews.filter((r) => r.bookId === id);

  const response: BookDetailResponse = {
    book,
    author,
    relatedBooks,
    reviews: bookReviews,
  };
  res.json(response);
};
