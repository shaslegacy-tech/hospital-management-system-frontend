"use client";

import { useState } from "react";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { Alert } from "@/components/ui/Alert";
import { StarRating } from "@/components/StarRating";
import { createReview, apiErrorMessage } from "@/lib/api";
import { AppointmentResponse } from "@/lib/types";

export function RateVisitModal({
  appointment,
  onClose,
  onSubmitted,
}: {
  appointment: AppointmentResponse | null;
  onClose: () => void;
  onSubmitted: () => void;
}) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function handleClose() {
    setRating(0);
    setComment("");
    setError("");
    onClose();
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!appointment || rating === 0) return;
    setError("");
    setLoading(true);
    try {
      await createReview({
        appointmentId: appointment.id,
        rating,
        comment: comment || undefined,
      });
      onSubmitted();
      handleClose();
    } catch (err) {
      setError(apiErrorMessage(err, "Couldn't submit your review. Try again."));
    } finally {
      setLoading(false);
    }
  }

  return (
    <Modal open={!!appointment} onClose={handleClose} title="Rate your visit">
      {appointment && (
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <p className="text-sm font-semibold text-ink-900">
              {appointment.doctorName}
            </p>
            <p className="text-xs text-ink-500">
              {appointment.departmentName} · {appointment.appointmentDate}
            </p>
          </div>

          <div className="flex flex-col items-center gap-2 rounded-2xl bg-brand-50 py-5">
            <p className="text-sm text-ink-700">How was your experience?</p>
            <StarRating value={rating} onChange={setRating} size="lg" />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-ink-700">
              Comments (optional)
            </label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={3}
              maxLength={1000}
              placeholder="Share details about your experience..."
              className="w-full rounded-xl border border-ink-100 bg-white px-3.5 py-2.5 text-sm text-ink-900 placeholder:text-ink-500/70 focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
          </div>

          {error && <Alert tone="error">{error}</Alert>}

          <Button type="submit" className="w-full" loading={loading} disabled={rating === 0}>
            Submit review
          </Button>
        </form>
      )}
    </Modal>
  );
}