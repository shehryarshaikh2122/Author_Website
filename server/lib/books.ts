import { authors, books, reviews } from "../data/mockData";
import type { BookDetailResponse, BooksResponse } from "../../shared/api";

type QueryValue = string | string[] | undefined;

function queryString(value: QueryValue): string {
  if (Array.isArray(value)) return value[0] ?? "";
  return value ?? "";
}

export function listBooks(query: Record<string, QueryValue>): BooksResponse {
  const search = queryString(query.search).toLowerCase();
  const genre = queryString(query.genre).toLowerCase();
  const authorId = query.authorId ? parseInt(queryString(query.authorId)) : null;
  const featured = query.featured === "true";
  const trending = query.trending === "true";
  const categoryId = query.categoryId ? parseInt(queryString(query.categoryId)) : null;

  let filtered = [...books];

  if (search) {
    filtered = filtered.filter(
      (book) =>
        book.title.toLowerCase().includes(search) ||
        book.authorName.toLowerCase().includes(search) ||
        book.description.toLowerCase().includes(search),
    );
  }
  if (genre) {
    filtered = filtered.filter((book) => book.genre.toLowerCase().includes(genre));
  }
  if (authorId) {
    filtered = filtered.filter((book) => book.authorId === authorId);
  }
  if (featured) {
    filtered = filtered.filter((book) => book.featured);
  }
  if (trending) {
    filtered = filtered.filter((book) => book.trending);
  }
  if (categoryId) {
    filtered = filtered.filter((book) => book.categoryId === categoryId);
  }

  return { books: filtered, total: filtered.length };
}

export function getBookById(id: number): BookDetailResponse | null {
  const book = books.find((entry) => entry.id === id);
  if (!book) return null;

  const author = authors.find((entry) => entry.id === book.authorId);
  if (!author) return null;

  return {
    book,
    author,
    relatedBooks: books
      .filter((entry) => entry.authorId === book.authorId && entry.id !== book.id)
      .slice(0, 4),
    reviews: reviews.filter((review) => review.bookId === id),
  };
}
