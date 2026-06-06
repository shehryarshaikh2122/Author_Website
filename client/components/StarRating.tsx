import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface StarRatingProps {
  rating: number;
  size?: "sm" | "md" | "lg";
  showValue?: boolean;
}

export default function StarRating({ rating, size = "md", showValue = true }: StarRatingProps) {
  const sizeClass = { sm: "h-3.5 w-3.5", md: "h-4 w-4", lg: "h-5 w-5" }[size];

  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={cn(
            sizeClass,
            i < Math.floor(rating)
              ? "fill-literary-gold text-literary-gold"
              : i < rating
                ? "fill-literary-gold/50 text-literary-gold"
                : "text-muted-foreground/30"
          )}
        />
      ))}
      {showValue && <span className="ml-1 text-sm font-semibold">{rating.toFixed(1)}</span>}
    </div>
  );
}
