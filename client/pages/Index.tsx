import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, Users, Star, TrendingUp } from "lucide-react";
import Layout from "@/components/layout/Layout";
import AuthorCard from "@/components/AuthorCard";
import BookCard from "@/components/BookCard";
import SectionHeader from "@/components/SectionHeader";
import type { Author, Book, Category } from "@shared/api";
import { listAuthors, listBooks, listCategories } from "@shared/catalog";

export default function Index() {
  const [featuredAuthors, setFeaturedAuthors] = useState<Author[]>([]);
  const [featuredBooks, setFeaturedBooks] = useState<Book[]>([]);
  const [trendingBooks, setTrendingBooks] = useState<Book[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [latestAuthors, setLatestAuthors] = useState<Author[]>([]);

  useEffect(() => {
    setFeaturedAuthors(listAuthors({ featured: "true" }).authors);
    setFeaturedBooks(listBooks({ featured: "true" }).books);
    setTrendingBooks(listBooks({ trending: "true" }).books);
    setCategories(listCategories().categories);
    setLatestAuthors(listAuthors().authors.slice(-4).reverse());
  }, []);

  return (
    <Layout>
      {/* Hero */}
      <section className="hero-gradient relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute left-10 top-20 font-serif text-[200px] text-primary">"</div>
          <div className="absolute bottom-10 right-10 font-serif text-[200px] text-primary">"</div>
        </div>
        <div className="page-container relative py-16 md:py-24">
          <div className="mx-auto max-w-3xl text-center">
            <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-primary">
              Welcome to Literary Haven
            </p>
            <h1 className="font-serif text-4xl font-bold leading-tight text-foreground md:text-6xl">
              Discover Great <span className="text-gradient">Authors</span> & Their Masterpieces
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground md:text-xl">
              Explore biographies of legendary writers, browse their most celebrated books, and find your next literary adventure.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link to="/authors" className="btn-primary">
                Explore Authors <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/books" className="btn-secondary">
                Browse Books
              </Link>
            </div>
          </div>

          <div className="mx-auto mt-16 grid max-w-2xl grid-cols-3 gap-6 text-center">
            <div>
              <Users className="mx-auto h-8 w-8 text-primary" />
              <p className="mt-2 font-serif text-2xl font-bold">{featuredAuthors.length}+</p>
              <p className="text-sm text-muted-foreground">Famous Authors</p>
            </div>
            <div>
              <BookOpen className="mx-auto h-8 w-8 text-primary" />
              <p className="mt-2 font-serif text-2xl font-bold">{featuredBooks.length}+</p>
              <p className="text-sm text-muted-foreground">Great Books</p>
            </div>
            <div>
              <Star className="mx-auto h-8 w-8 text-primary" />
              <p className="mt-2 font-serif text-2xl font-bold">4.7</p>
              <p className="text-sm text-muted-foreground">Avg. Rating</p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="page-container py-12">
        <SectionHeader title="Browse by Genre" subtitle="Find books in your favorite categories" />
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-8">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              to={`/books?categoryId=${cat.id}`}
              className="rounded-lg border border-border bg-card px-3 py-4 text-center text-sm font-medium transition-all hover:border-primary hover:bg-primary/5 hover:shadow-literary"
            >
              {cat.name}
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Authors */}
      <section className="bg-secondary/30 py-12">
        <div className="page-container">
          <SectionHeader
            title="Featured Authors"
            subtitle="Legends who shaped the world of literature"
            linkTo="/authors"
          />
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {featuredAuthors.map((author) => (
              <AuthorCard key={author.id} author={author} />
            ))}
          </div>
        </div>
      </section>

      {/* Popular Books */}
      <section className="page-container py-12">
        <SectionHeader
          title="Popular Books"
          subtitle="Most loved reads from our collection"
          linkTo="/books?featured=true"
        />
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {featuredBooks.slice(0, 5).map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      </section>

      {/* Trending */}
      <section className="bg-secondary/30 py-12">
        <div className="page-container">
          <div className="mb-8 flex items-center gap-2">
            <TrendingUp className="h-6 w-6 text-primary" />
            <SectionHeader
              title="Trending Now"
              subtitle="Books everyone is talking about"
              linkTo="/books?trending=true"
            />
          </div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {trendingBooks.slice(0, 4).map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        </div>
      </section>

      {/* Latest Authors */}
      <section className="page-container py-12">
        <SectionHeader
          title="Recently Added Authors"
          subtitle="New voices in our literary collection"
          linkTo="/authors"
        />
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {latestAuthors.map((author) => (
            <AuthorCard key={author.id} author={author} />
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-literary-burgundy py-16 text-literary-cream">
        <div className="page-container text-center">
          <h2 className="font-serif text-3xl font-bold md:text-4xl">Start Your Literary Journey Today</h2>
          <p className="mx-auto mt-4 max-w-xl text-literary-parchment/80">
            Join thousands of readers discovering new authors and books every day. Create your free account to save favorites and track orders.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link to="/register" className="btn-accent">Create Free Account</Link>
            <Link to="/books" className="inline-flex items-center gap-2 rounded-md border-2 border-literary-cream px-6 py-2.5 text-sm font-semibold transition-all hover:bg-literary-cream hover:text-literary-burgundy">
              Browse All Books
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
