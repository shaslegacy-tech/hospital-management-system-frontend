"use client";

import { useState } from "react";
import { Star } from "lucide-react";
import { cn } from "@/lib/cn";

export function StarRating({
  value,
  onChange,
  size = "md",
  showValue = false,
  reviewCount,
}: {
  value: number | null;
  onChange?: (value: number) => void;
  size?: "sm" | "md" | "lg";
  showValue?: boolean;
  reviewCount?: number;
}) {
  const [hover, setHover] = useState<number | null>(null);
  const interactive = !!onChange;
  const displayValue = hover ?? value ?? 0;

  const sizeClasses = {
    sm: "h-3.5 w-3.5",
    md: "h-4.5 w-4.5",
    lg: "h-6 w-6",
  }[size];

  if (value === null && !interactive) {
    return <span className="text-xs text-ink-500">No ratings yet</span>;
  }

  return (
    <div className="flex items-center gap-1.5">
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            disabled={!interactive}
            onClick={() => onChange?.(star)}
            onMouseEnter={() => interactive && setHover(star)}
            onMouseLeave={() => interactive && setHover(null)}
            className={cn(interactive && "cursor-pointer")}
          >
            <Star
              className={cn(
                sizeClasses,
                star <= displayValue
                  ? "fill-amber-400 text-amber-400"
                  : "fill-transparent text-ink-300"
              )}
            />
          </button>
        ))}
      </div>
      {showValue && value !== null && (
        <span className="text-xs font-medium text-ink-700">
          {value?.toFixed(1)}
          {reviewCount !== undefined && (
            <span className="text-ink-500"> ({reviewCount})</span>
          )}
        </span>
      )}
    </div>
  );
}