"use client";

import { useEffect, useState } from "react";
import { MessageSquare } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Skeleton } from "@/components/ui/Skeleton";
import { EmptyState } from "@/components/ui/EmptyState";
import { StarRating } from "@/components/StarRating";
import { getDoctorReviews } from "@/lib/api";
import { ReviewItem } from "@/lib/types";
import { formatDate, initials } from "@/lib/format";

export function DoctorReviewsList({
  doctorId,
  averageRating,
  reviewCount,
}: {
  doctorId: number;
  averageRating: number | null;
  reviewCount: number;
}) {
  const [reviews, setReviews] = useState<ReviewItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDoctorReviews(doctorId)
      .then(setReviews)
      .catch(() => setReviews([]))
      .finally(() => setLoading(false));
  }, [doctorId]);

  return (
    <Card>
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-display text-base font-semibold text-ink-900">
          Patient reviews
        </h3>
        <StarRating value={averageRating} showValue reviewCount={reviewCount} />
      </div>

      {loading ? (
        <Skeleton className="h-20 w-full" />
      ) : reviews.length === 0 ? (
        <EmptyState
          icon={MessageSquare}
          title="No reviews yet"
          description="Reviews from patients will show up here after completed visits."
        />
      ) : (
        <div className="space-y-4">
          {reviews.map((r) => (
            <div key={r.id} className="border-b border-ink-100 pb-4 last:border-b-0 last:pb-0">
              <div className="flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-700 text-xs font-semibold text-white">
                  {initials(r.patientName)}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-ink-900">{r.patientName}</p>
                  <p className="text-xs text-ink-500">{formatDate(r.createdAt)}</p>
                </div>
                <StarRating value={r.rating} size="sm" />
              </div>
              {r.comment && (
                <p className="mt-2 text-sm text-ink-700">{r.comment}</p>
              )}
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}