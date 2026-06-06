import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Search, Filter } from "lucide-react";
import Layout from "@/components/layout/Layout";
import BookCard from "@/components/BookCard";
import type { Book } from "@shared/api";

export default function Books() {
  const [searchParams] = useSearchParams();
  const [books, setBooks] = useState<Book[]>([]);
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [genreFilter, setGenreFilter] = useState(searchParams.get("genre") || "");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    if (search) params.set("search", search);
    if (genreFilter) params.set("genre", genreFilter);

    setLoading(true);
    fetch(`/api/books?${params}`)
      .then((r) => r.json())
      .then((data) => {
        setBooks(data.books);
        setLoading(false);
      });
  }, [searchParams, search, genreFilter]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const pageTitle = searchParams.get("trending")
    ? "Trending Books"
    : searchParams.get("featured")
      ? "Featured Books"
      : "All Books";

  return (
    <Layout>
      <div className="hero-gradient border-b border-border">
        <div className="page-container py-12">
          <h1 className="section-title">{pageTitle}</h1>
          <p className="section-subtitle">Discover literary masterpieces from legendary authors</p>
        </div>
      </div>

      <div className="page-container py-8">
        <div className="mb-8 flex flex-col gap-4 lg:flex-row">
          <form onSubmit={handleSearch} className="flex flex-1 gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search books by title, author..."
                className="input-field pl-10"
              />
            </div>
            <button type="submit" className="btn-primary px-6">Search</button>
          </form>

          <div className="relative">
            <Filter className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <select
              value={genreFilter}
              onChange={(e) => setGenreFilter(e.target.value)}
              className="input-field appearance-none pl-10 pr-8"
            >
              <option value="">All Genres</option>
              <option value="fantasy">Fantasy</option>
              <option value="horror">Horror</option>
              <option value="mystery">Mystery</option>
              <option value="romance">Romance</option>
              <option value="fiction">Fiction</option>
              <option value="dystopian">Dystopian</option>
            </select>
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {Array.from({ length: 10 }).map((_, i) => (
              <div key={i} className="h-80 animate-pulse rounded-lg bg-secondary" />
            ))}
          </div>
        ) : books.length === 0 ? (
          <div className="py-20 text-center">
            <p className="text-lg text-muted-foreground">No books found matching your criteria.</p>
          </div>
        ) : (
          <>
            <p className="mb-6 text-sm text-muted-foreground">{books.length} book{books.length !== 1 ? "s" : ""} found</p>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
              {books.map((book) => (
                <BookCard key={book.id} book={book} />
              ))}
            </div>
          </>
        )}
      </div>
    </Layout>
  );
}
