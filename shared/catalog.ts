import { authors, books, categories, reviews } from "./mockData";
import type {
  AuthorDetailResponse,
  AuthorsResponse,
  BookDetailResponse,
  BooksResponse,
  CategoriesResponse,
} from "./api";

type QueryValue = string | string[] | undefined;
type QueryParams = Record<string, QueryValue>;

function queryString(value: QueryValue): string {
  if (Array.isArray(value)) return value[0] ?? "";
  return value ?? "";
}

export function listAuthors(query: QueryParams = {}): AuthorsResponse {
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

export function listBooks(query: QueryParams = {}): BooksResponse {
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

export function listCategories(): CategoriesResponse {
  return { categories };
}
