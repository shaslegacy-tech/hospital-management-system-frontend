"use client";

import { useState } from "react";
import { Sparkles, Save } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Alert } from "@/components/ui/Alert";
import { createMedicalRecord, draftClinicalNotes, apiErrorMessage } from "@/lib/api";

export function AddRecordCard({
  appointmentId,
  onCreated,
}: {
  appointmentId: number;
  onCreated: () => void;
}) {
  const [quickNotes, setQuickNotes] = useState("");
  const [diagnosis, setDiagnosis] = useState("");
  const [treatment, setTreatment] = useState("");
  const [notes, setNotes] = useState("");

  const [drafting, setDrafting] = useState(false);
  const [draftNotice, setDraftNotice] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function handleDraft() {
    if (!quickNotes.trim()) return;
    setError("");
    setDraftNotice("");
    setDrafting(true);
    try {
      const draft = await draftClinicalNotes(quickNotes);
      setDiagnosis(draft.diagnosis);
      setTreatment(draft.treatment);
      setDraftNotice(draft.notice);
    } catch (err) {
      setError(apiErrorMessage(err, "Couldn't generate a draft. Try writing it manually."));
    } finally {
      setDrafting(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSaving(true);
    try {
      await createMedicalRecord({ appointmentId, diagnosis, treatment, notes });
      onCreated();
    } catch (err) {
      setError(apiErrorMessage(err, "Couldn't save the record. Try again."));
    } finally {
      setSaving(false);
    }
  }

  return (
    <Card className="border-brand-200 bg-brand-50/40">
      <h3 className="mb-3 font-display text-sm font-semibold text-ink-900">
        Add medical record for this visit
      </h3>

      {/* AI-assisted quick notes */}
      <div className="mb-4 space-y-2 rounded-xl border border-dashed border-brand-300 bg-white p-3.5">
        <p className="flex items-center gap-1.5 text-xs font-semibold text-brand-700">
          <Sparkles className="h-3.5 w-3.5" />
          Optional — jot quick notes, let AI draft the write-up
        </p>
        <textarea
          value={quickNotes}
          onChange={(e) => setQuickNotes(e.target.value)}
          rows={2}
          maxLength={1000}
          placeholder="e.g. persistent dry cough 3 days, mild fever, chest clear on exam, advised rest/fluids, review in 5 days if not improving"
          className="w-full rounded-xl border border-ink-100 bg-white px-3.5 py-2.5 text-sm text-ink-900 placeholder:text-ink-500/70 focus:outline-none focus:ring-2 focus:ring-brand-500"
        />
        <Button
          type="button"
          size="sm"
          variant="secondary"
          onClick={handleDraft}
          loading={drafting}
          disabled={!quickNotes.trim()}
        >
          <Sparkles className="h-3.5 w-3.5" />
          Draft with AI
        </Button>
        {draftNotice && (
          <p className="text-[11px] text-ink-500">{draftNotice}</p>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-ink-700">Diagnosis</label>
          <input
            value={diagnosis}
            onChange={(e) => setDiagnosis(e.target.value)}
            required
            placeholder="e.g. Acute bronchitis"
            className="w-full rounded-xl border border-ink-100 bg-white px-3.5 py-2.5 text-sm text-ink-900 focus:outline-none focus:ring-2 focus:ring-brand-500"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-ink-700">Treatment</label>
          <textarea
            value={treatment}
            onChange={(e) => setTreatment(e.target.value)}
            required
            rows={2}
            placeholder="Describe the treatment plan"
            className="w-full rounded-xl border border-ink-100 bg-white px-3.5 py-2.5 text-sm text-ink-900 focus:outline-none focus:ring-2 focus:ring-brand-500"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-ink-700">Notes (optional)</label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={2}
            className="w-full rounded-xl border border-ink-100 bg-white px-3.5 py-2.5 text-sm text-ink-900 focus:outline-none focus:ring-2 focus:ring-brand-500"
          />
        </div>

        {error && <Alert tone="error">{error}</Alert>}

        <Button type="submit" loading={saving}>
          <Save className="h-4 w-4" />
          Save record
        </Button>
      </form>
    </Card>
  );
}