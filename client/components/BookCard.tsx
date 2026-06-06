import { Link } from "react-router-dom";
import type { Book } from "@shared/api";
import { Star, ShoppingCart } from "lucide-react";
import { formatPrice } from "@/lib/utils";
import { useCart } from "@/context/CartContext";

interface BookCardProps {
  book: Book;
}

export default function BookCard({ book }: BookCardProps) {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart({
      bookId: book.id,
      title: book.title,
      coverImage: book.coverImage,
      price: book.price,
      amazonLink: book.amazonLink,
    });
  };

  return (
    <div className="group card-literary flex flex-col overflow-hidden p-0 animate-fade-in">
      <Link to={`/books/${book.id}`} className="relative aspect-[2/3] overflow-hidden">
        <img
          src={book.coverImage}
          alt={book.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        {book.trending && (
          <span className="absolute left-2 top-2 rounded-full bg-literary-gold px-2.5 py-0.5 text-xs font-bold text-literary-ink">
            Trending
          </span>
        )}
      </Link>
      <div className="flex flex-1 flex-col p-4">
        <Link to={`/books/${book.id}`}>
          <h3 className="font-serif text-base font-semibold leading-tight text-foreground transition-colors group-hover:text-primary line-clamp-2">
            {book.title}
          </h3>
        </Link>
        <Link to={`/authors/${book.authorId}`} className="mt-1 text-sm text-muted-foreground hover:text-primary">
          {book.authorName}
        </Link>
        <div className="mt-2 flex items-center gap-1.5">
          <div className="flex items-center gap-0.5 text-literary-gold">
            <Star className="h-3.5 w-3.5 fill-current" />
            <span className="text-sm font-semibold text-foreground">{book.rating}</span>
          </div>
          <span className="text-xs text-muted-foreground">({book.reviewCount.toLocaleString()})</span>
        </div>
        <span className="mt-1 inline-block w-fit rounded-full bg-secondary px-2 py-0.5 text-xs text-secondary-foreground">
          {book.genre}
        </span>
        <div className="mt-auto flex items-center justify-between pt-4">
          <span className="font-serif text-lg font-bold text-primary">{formatPrice(book.price)}</span>
          <button
            onClick={handleAddToCart}
            className="flex items-center gap-1 rounded-md bg-primary/10 px-3 py-1.5 text-xs font-semibold text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
          >
            <ShoppingCart className="h-3.5 w-3.5" />
            Add
          </button>
        </div>
      </div>
    </div>
  );
}
