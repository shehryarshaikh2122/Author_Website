import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, ShoppingCart, ExternalLink, Calendar, Hash } from "lucide-react";
import Layout from "@/components/layout/Layout";
import BookCard from "@/components/BookCard";
import StarRating from "@/components/StarRating";
import type { Book, Author, Review } from "@shared/api";
import { getBookById } from "@shared/catalog";
import { formatPrice, formatDate } from "@/lib/utils";
import { useCart } from "@/context/CartContext";

export default function BookDetail() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [book, setBook] = useState<Book | null>(null);
  const [author, setAuthor] = useState<Author | null>(null);
  const [relatedBooks, setRelatedBooks] = useState<Book[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    const result = getBookById(parseInt(id || "0"));
    if (result) {
      setBook(result.book);
      setAuthor(result.author);
      setRelatedBooks(result.relatedBooks);
      setReviews(result.reviews);
    }
    setLoading(false);
  }, [id]);

  const handleAddToCart = () => {
    if (!book) return;
    addToCart({
      bookId: book.id,
      title: book.title,
      coverImage: book.coverImage,
      price: book.price,
      amazonLink: book.amazonLink,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  if (loading) {
    return (
      <Layout>
        <div className="page-container py-12">
          <div className="h-96 animate-pulse rounded-lg bg-secondary" />
        </div>
      </Layout>
    );
  }

  if (!book || !author) {
    return (
      <Layout>
        <div className="page-container py-20 text-center">
          <h1 className="font-serif text-2xl font-bold">Book Not Found</h1>
          <Link to="/books" className="btn-primary mt-6 inline-flex">Back to Books</Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="page-container py-8">
        <Link to="/books" className="mb-6 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary">
          <ArrowLeft className="h-4 w-4" /> Back to Books
        </Link>

        <div className="flex flex-col gap-8 lg:flex-row">
          <div className="mx-auto w-64 shrink-0 lg:mx-0 lg:w-80">
            <img src={book.coverImage} alt={book.title} className="w-full rounded-lg shadow-literary-lg" />
          </div>

          <div className="flex-1">
            <span className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground">
              {book.genre}
            </span>
            <h1 className="mt-3 font-serif text-3xl font-bold md:text-4xl">{book.title}</h1>
            <Link to={`/authors/${author.id}`} className="mt-2 inline-block text-lg text-primary hover:underline">
              by {author.name}
            </Link>

            <div className="mt-4 flex items-center gap-4">
              <StarRating rating={book.rating} size="lg" />
              <span className="text-sm text-muted-foreground">({book.reviewCount.toLocaleString()} reviews)</span>
            </div>

            <p className="mt-2 font-serif text-3xl font-bold text-primary">{formatPrice(book.price)}</p>

            <p className="mt-6 leading-relaxed text-muted-foreground">{book.description}</p>

            <div className="mt-6 grid grid-cols-2 gap-4 text-sm">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Calendar className="h-4 w-4" />
                Published: {formatDate(book.publicationDate)}
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Hash className="h-4 w-4" />
                ISBN: {book.isbn}
              </div>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <button onClick={handleAddToCart} className="btn-primary">
                <ShoppingCart className="h-4 w-4" />
                {added ? "Added to Cart!" : "Add to Cart"}
              </button>
              <a
                href={book.amazonLink}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-accent"
              >
                Buy on Amazon <ExternalLink className="h-4 w-4" />
              </a>
              <Link to="/checkout" className="btn-secondary">Checkout</Link>
            </div>
          </div>
        </div>

        {/* Reviews */}
        {reviews.length > 0 && (
          <section className="mt-16">
            <h2 className="section-title mb-6">Reader Reviews</h2>
            <div className="space-y-4">
              {reviews.map((review) => (
                <div key={review.id} className="card-literary">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold">{review.userName}</span>
                    <StarRating rating={review.rating} size="sm" showValue={false} />
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">{review.comment}</p>
                  <p className="mt-2 text-xs text-muted-foreground/60">{formatDate(review.createdAt)}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Related Books */}
        {relatedBooks.length > 0 && (
          <section className="mt-16">
            <h2 className="section-title mb-6">More by {author.name}</h2>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {relatedBooks.map((b) => (
                <BookCard key={b.id} book={b} />
              ))}
            </div>
          </section>
        )}
      </div>
    </Layout>
  );
}
