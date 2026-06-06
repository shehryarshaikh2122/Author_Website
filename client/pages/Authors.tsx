import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Search, Filter } from "lucide-react";
import Layout from "@/components/layout/Layout";
import AuthorCard from "@/components/AuthorCard";
import type { Author } from "@shared/api";

export default function Authors() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [authors, setAuthors] = useState<Author[]>([]);
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [genreFilter, setGenreFilter] = useState(searchParams.get("genre") || "");
  const [nationalityFilter, setNationalityFilter] = useState(searchParams.get("nationality") || "");
  const [loading, setLoading] = useState(true);

  const nationalities = ["English", "British", "American"];

  useEffect(() => {
    const params = new URLSearchParams();
    if (search) params.set("search", search);
    if (genreFilter) params.set("genre", genreFilter);
    if (nationalityFilter) params.set("nationality", nationalityFilter);

    setLoading(true);
    fetch(`/api/authors?${params}`)
      .then((r) => r.json())
      .then((data) => {
        setAuthors(data.authors);
        setLoading(false);
      });
  }, [search, genreFilter, nationalityFilter]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams);
    if (search) params.set("search", search);
    else params.delete("search");
    setSearchParams(params);
  };

  return (
    <Layout>
      <div className="hero-gradient border-b border-border">
        <div className="page-container py-12">
          <h1 className="section-title">Famous Authors</h1>
          <p className="section-subtitle">Explore the lives and works of literary legends from around the world</p>
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
                placeholder="Search authors by name, genre..."
                className="input-field pl-10"
              />
            </div>
            <button type="submit" className="btn-primary px-6">Search</button>
          </form>

          <div className="flex gap-3">
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <select
                value={genreFilter}
                onChange={(e) => setGenreFilter(e.target.value)}
                className="input-field appearance-none pl-10 pr-8"
              >
                <option value="">All Genres</option>
                <option value="fiction">Fiction</option>
                <option value="fantasy">Fantasy</option>
                <option value="horror">Horror</option>
                <option value="mystery">Mystery</option>
                <option value="romance">Romance</option>
                <option value="drama">Drama</option>
              </select>
            </div>
            <select
              value={nationalityFilter}
              onChange={(e) => setNationalityFilter(e.target.value)}
              className="input-field"
            >
              <option value="">All Nationalities</option>
              {nationalities.map((n) => (
                <option key={n} value={n}>{n}</option>
              ))}
            </select>
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="h-72 animate-pulse rounded-lg bg-secondary" />
            ))}
          </div>
        ) : authors.length === 0 ? (
          <div className="py-20 text-center">
            <p className="text-lg text-muted-foreground">No authors found matching your criteria.</p>
          </div>
        ) : (
          <>
            <p className="mb-6 text-sm text-muted-foreground">{authors.length} author{authors.length !== 1 ? "s" : ""} found</p>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {authors.map((author) => (
                <AuthorCard key={author.id} author={author} />
              ))}
            </div>
          </>
        )}
      </div>
    </Layout>
  );
}
