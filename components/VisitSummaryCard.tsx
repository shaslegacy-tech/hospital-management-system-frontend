"use client";

import { useState } from "react";
import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Alert } from "@/components/ui/Alert";
import { explainRecord, apiErrorMessage } from "@/lib/api";

export function VisitSummaryCard({
  recordId,
  initialSummary,
}: {
  recordId: number;
  initialSummary: string | null;
}) {
  const [summary, setSummary] = useState(initialSummary);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleExplain() {
    setError("");
    setLoading(true);
    try {
      const result = await explainRecord(recordId);
      setSummary(result);
    } catch (err) {
      setError(apiErrorMessage(err, "Couldn't generate an explanation right now."));
    } finally {
      setLoading(false);
    }
  }

  if (summary) {
    return (
      <div className="rounded-xl border border-brand-200 bg-brand-50/60 p-3.5">
        <p className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-brand-700">
          <Sparkles className="h-3.5 w-3.5" />
          In plain language
        </p>
        <p className="text-sm text-ink-700">{summary}</p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <Button size="sm" variant="secondary" onClick={handleExplain} loading={loading}>
        <Sparkles className="h-3.5 w-3.5" />
        Explain this in plain language
      </Button>
      {error && <Alert tone="error">{error}</Alert>}
    </div>
  );
}