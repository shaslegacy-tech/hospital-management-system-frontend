"use client";

import { useState } from "react";
import { Sparkles, AlertTriangle, ChevronDown, ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Alert } from "@/components/ui/Alert";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/cn";
import { checkSymptoms, apiErrorMessage } from "@/lib/api";
import { SymptomCheckResult } from "@/lib/types";
import { useTranslation } from "@/lib/i18n/LanguageContext";

const urgencyStyles: Record<SymptomCheckResult["urgencyLevel"], string> = {
  LOW: "bg-brand-100 text-brand-800",
  MEDIUM: "bg-amber-100 text-amber-800",
  HIGH: "bg-coral-100 text-coral-600",
};

export function SymptomChecker({
  onDepartmentSuggested,
}: {
  onDepartmentSuggested: (departmentName: string) => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const [symptoms, setSymptoms] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<SymptomCheckResult | null>(null);

  const { t } = useTranslation();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!symptoms.trim()) return;
    setError("");
    setLoading(true);
    setResult(null);
    try {
      const data = await checkSymptoms(symptoms);
      setResult(data);
    } catch (err) {
      setError(apiErrorMessage(err, "Couldn't process that right now. Try searching doctors directly."));
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card className="border-brand-200 bg-gradient-to-br from-brand-50/70 to-white">
      <button
        onClick={() => setExpanded((e) => !e)}
        className="flex w-full items-center justify-between gap-2 text-left"
      >
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-700 text-white">
            <Sparkles className="h-4.5 w-4.5" />
          </div>
          <div>
            <p className="font-display text-sm font-semibold text-ink-900">
              {t("ai.notSureWhoToSee")}
            </p>
            <p className="text-xs text-ink-500">
              {t("ai.describeSymptoms")}
            </p>
          </div>
        </div>
        <ChevronDown
          className={cn(
            "h-4 w-4 flex-shrink-0 text-ink-500 transition-transform",
            expanded && "rotate-180"
          )}
        />
      </button>

      {expanded && (
        <div className="mt-4 space-y-4">
          <form onSubmit={handleSubmit} className="space-y-3">
            <textarea
              value={symptoms}
              onChange={(e) => setSymptoms(e.target.value)}
              rows={3}
              maxLength={1000}
              placeholder={t("ai.symptomPlaceholder")}
              className="w-full rounded-xl border border-ink-100 bg-white px-3.5 py-2.5 text-sm text-ink-900 placeholder:text-ink-500/70 focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
            <Button type="submit" size="sm" loading={loading} disabled={!symptoms.trim()}>
              <Sparkles className="h-3.5 w-3.5" />
              {t("ai.getSuggestion")}
            </Button>
          </form>

          {error && <Alert tone="error">{error}</Alert>}

          {result && (
            <div className="space-y-3 rounded-xl border border-ink-100 bg-white p-4">
              {result.urgencyLevel === "HIGH" ? (
                <Alert tone="error">
                  <span className="flex items-start gap-1.5">
                    <AlertTriangle className="mt-0.5 h-4 w-4 flex-shrink-0" />
                    {result.explanation} {t("ai.emergencyCare")}
                  </span>
                </Alert>
              ) : (
                <>
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold text-ink-900">
                      {t("ai.suggested")}: {result.departmentName}
                    </p>
                    <Badge className={urgencyStyles[result.urgencyLevel]}>
                      {result.urgencyLevel} {t("ai.urgency")}
                    </Badge>
                  </div>
                  <p className="text-sm text-ink-700">{result.explanation}</p>
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => onDepartmentSuggested(result.departmentName)}
                  >
                    {t("ai.viewDoctors").replace(
                      "{department}",
                      result.departmentName
                    )}
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Button>
                </>
              )}
              <p className="text-[11px] text-ink-500">{result.disclaimer}</p>
            </div>
          )}
        </div>
      )}
    </Card>
  );
}