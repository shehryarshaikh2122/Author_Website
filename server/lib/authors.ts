import { authors, books } from "../data/mockData";
import type { AuthorDetailResponse, AuthorsResponse } from "../../shared/api";

type QueryValue = string | string[] | undefined;

function queryString(value: QueryValue): string {
  if (Array.isArray(value)) return value[0] ?? "";
  return value ?? "";
}

export function listAuthors(query: Record<string, QueryValue>): AuthorsResponse {
  const search = queryString(query.search).toLowerCase();
  const genre = queryString(query.genre).toLowerCase();
  const nationality = queryString(query.nationality).toLowerCase();
  const featured = query.featured === "true";

  let filtered = [...authors];

  if (search) {
    filtered = filtered.filter(
      (author) =>
        author.name.toLowerCase().includes(search) ||
        author.biography.toLowerCase().includes(search) ||
        author.genres.some((g) => g.toLowerCase().includes(search)),
    );
  }
  if (genre) {
    filtered = filtered.filter((author) =>
      author.genres.some((g) => g.toLowerCase().includes(genre)),
    );
  }
  if (nationality) {
    filtered = filtered.filter((author) =>
      author.nationality.toLowerCase().includes(nationality),
    );
  }
  if (featured) {
    filtered = filtered.filter((author) => author.featured);
  }

  return { authors: filtered, total: filtered.length };
}

export function getAuthorById(id: number): AuthorDetailResponse | null {
  const author = authors.find((entry) => entry.id === id);
  if (!author) return null;

  return {
    author,
    books: books.filter((book) => book.authorId === id),
    reviews: [],
  };
}
