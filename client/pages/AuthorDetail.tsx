import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { MapPin, Calendar, Award, BookOpen, ExternalLink, ArrowLeft } from "lucide-react";
import Layout from "@/components/layout/Layout";
import BookCard from "@/components/BookCard";
import StarRating from "@/components/StarRating";
import type { Author, Book } from "@shared/api";
import { formatDate } from "@/lib/utils";

export default function AuthorDetail() {
  const { id } = useParams();
  const [author, setAuthor] = useState<Author | null>(null);
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/authors/${id}`)
      .then((r) => r.json())
      .then((data) => {
        setAuthor(data.author);
        setBooks(data.books);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <Layout>
        <div className="page-container py-12">
          <div className="h-96 animate-pulse rounded-lg bg-secondary" />
        </div>
      </Layout>
    );
  }

  if (!author) {
    return (
      <Layout>
        <div className="page-container py-20 text-center">
          <h1 className="font-serif text-2xl font-bold">Author Not Found</h1>
          <Link to="/authors" className="btn-primary mt-6 inline-flex">Back to Authors</Link>
        </div>
      </Layout>
    );
  }

  const avgRating = books.length
    ? books.reduce((sum, b) => sum + b.rating, 0) / books.length
    : 0;

  return (
    <Layout>
      <div className="hero-gradient border-b border-border">
        <div className="page-container py-8">
          <Link to="/authors" className="mb-6 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary">
            <ArrowLeft className="h-4 w-4" /> Back to Authors
          </Link>

          <div className="flex flex-col gap-8 md:flex-row">
            <div className="mx-auto w-64 shrink-0 md:mx-0">
              <img
                src={author.image}
                alt={author.name}
                className="w-full rounded-lg shadow-literary-lg"
              />
            </div>
            <div className="flex-1">
              <h1 className="font-serif text-3xl font-bold md:text-4xl">{author.name}</h1>
              <div className="mt-3 flex flex-wrap gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1"><MapPin className="h-4 w-4" /> {author.nationality}</span>
                <span className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {formatDate(author.birthDate)}
                  {author.deathDate && ` — ${formatDate(author.deathDate)}`}
                </span>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {author.genres.map((g) => (
                  <span key={g} className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">{g}</span>
                ))}
              </div>
              <p className="mt-6 leading-relaxed text-muted-foreground">{author.biography}</p>

              {author.awards.length > 0 && (
                <div className="mt-6">
                  <h3 className="flex items-center gap-2 font-serif text-lg font-semibold">
                    <Award className="h-5 w-5 text-literary-gold" /> Awards & Achievements
                  </h3>
                  <ul className="mt-2 space-y-1">
                    {author.awards.map((award) => (
                      <li key={award} className="text-sm text-muted-foreground">• {award}</li>
                    ))}
                  </ul>
                </div>
              )}

              {author.socialLinks && (
                <div className="mt-4 flex gap-3">
                  {author.socialLinks.website && (
                    <a href={author.socialLinks.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-sm text-primary hover:underline">
                      Website <ExternalLink className="h-3 w-3" />
                    </a>
                  )}
                  {author.socialLinks.wikipedia && (
                    <a href={author.socialLinks.wikipedia} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-sm text-primary hover:underline">
                      Wikipedia <ExternalLink className="h-3 w-3" />
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="border-b border-border bg-card">
        <div className="page-container py-6">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <BookOpen className="mx-auto h-6 w-6 text-primary" />
              <p className="mt-1 font-serif text-2xl font-bold">{books.length}</p>
              <p className="text-xs text-muted-foreground">Total Books</p>
            </div>
            <div>
              <p className="mt-1 font-serif text-2xl font-bold">{books.filter((b) => b.featured).length}</p>
              <p className="text-xs text-muted-foreground">Best Sellers</p>
            </div>
            <div>
              <StarRating rating={avgRating} size="sm" />
              <p className="text-xs text-muted-foreground">Reader Rating</p>
            </div>
          </div>
        </div>
      </div>

      {/* Books */}
      <div className="page-container py-12">
        <h2 className="section-title mb-8">Books by {author.name}</h2>
        {books.length === 0 ? (
          <p className="text-muted-foreground">No books available for this author yet.</p>
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {books.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}
