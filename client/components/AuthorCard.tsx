import { Link } from "react-router-dom";
import type { Author } from "@shared/api";
import { MapPin, BookOpen } from "lucide-react";

interface AuthorCardProps {
  author: Author;
}

export default function AuthorCard({ author }: AuthorCardProps) {
  return (
    <Link
      to={`/authors/${author.id}`}
      className="group card-literary flex flex-col overflow-hidden p-0 animate-fade-in"
    >
      <div className="relative aspect-[4/5] overflow-hidden">
        <img
          src={author.image}
          alt={author.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-literary-ink/80 via-transparent to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h3 className="font-serif text-lg font-bold text-white">{author.name}</h3>
          <div className="mt-1 flex items-center gap-1 text-xs text-literary-parchment">
            <MapPin className="h-3 w-3" />
            {author.nationality}
          </div>
        </div>
      </div>
      <div className="p-4">
        <div className="flex flex-wrap gap-1.5">
          {author.genres.slice(0, 3).map((genre) => (
            <span
              key={genre}
              className="rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium text-secondary-foreground"
            >
              {genre}
            </span>
          ))}
        </div>
        <div className="mt-3 flex items-center gap-1.5 text-sm text-muted-foreground">
          <BookOpen className="h-4 w-4" />
          {author.totalBooks} books
        </div>
      </div>
    </Link>
  );
}
