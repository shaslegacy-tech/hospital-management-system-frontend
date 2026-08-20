"use client";

import { useEffect, useMemo, useState } from "react";
import { CalendarDays } from "lucide-react";
import { Topbar } from "@/components/Topbar";
import { Skeleton } from "@/components/ui/Skeleton";
import { EmptyState } from "@/components/ui/EmptyState";
import { AppointmentTicket } from "@/components/AppointmentTicket";
import { ConfirmDialog } from "@/components/ConfirmDialog";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";
import { useAuth } from "@/lib/auth-context";
import { useToast } from "@/lib/toast-context";
import { useTranslation } from "@/lib/i18n/LanguageContext";
import { cancelAppointment, getPatientAppointments, checkReviewExists } from "@/lib/api";
import { AppointmentResponse } from "@/lib/types";
import Link from "next/link";
import { RateVisitModal } from "@/components/RateVisitModal";

type Tab = "upcoming" | "past" | "cancelled";

export default function AppointmentsPage() {
  const { patient, activePatientId } = useAuth();
  const { showToast } = useToast();
  const [appointments, setAppointments] = useState<AppointmentResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<Tab>("upcoming");
  const [cancelTarget, setCancelTarget] = useState<number | null>(null);
  const [cancelling, setCancelling] = useState(false);

  const [rateTarget, setRateTarget] = useState<AppointmentResponse | null>(null);
  const [reviewedIds, setReviewedIds] = useState<Set<number>>(new Set());

  const { t } = useTranslation();

  async function load() {
    if (!patient || !activePatientId) return;
    setLoading(true);
    const data = await getPatientAppointments(activePatientId ?? patient.id, 0, 100);
    setAppointments(data.content);

    const completed = data.content.filter((a) => a.status === "COMPLETED");
    const checks = await Promise.all(
     completed.map((a) => checkReviewExists(a.id).then((exists) => [a.id, exists] as const))
    );

    setReviewedIds(new Set(checks.filter(([, exists]) => exists).map(([id]) => id)));
    setLoading(false);
  }

  useEffect(() => {
    let isMounted = true;
    
    const fetchAppointments = async () => {
      if (!patient) return;
      setLoading(true);
      const data = await getPatientAppointments(patient.id, 0, 100);
      if (!isMounted) return;
      setAppointments(data.content);

      const completed = data.content.filter((a) => a.status === "COMPLETED");
      const checks = await Promise.all(
       completed.map((a) => checkReviewExists(a.id).then((exists) => [a.id, exists] as const))
      );

      if (!isMounted) return;
      setReviewedIds(new Set(checks.filter(([, exists]) => exists).map(([id]) => id)));
      setLoading(false);
    };

    fetchAppointments();

    return () => {
      isMounted = false;
    };
  }, [patient]);

  async function handleCancel() {
    if (!cancelTarget) return;
    setCancelling(true);
    try {
      await cancelAppointment(cancelTarget);
      showToast(t("appointments.cancelledSuccess") + " ✓", "success");
      await load();
    } catch {
      showToast(t("appointments.cancelError"), "error");
    } finally {
      setCancelling(false);
      setCancelTarget(null);
    }
  }

  const filtered = useMemo(() => {
    const sorted = [...appointments].sort(
      (a, b) =>
        new Date(b.appointmentDate).getTime() -
        new Date(a.appointmentDate).getTime()
    );
    if (tab === "upcoming")
      return sorted.filter(
        (a) => a.status === "PENDING" || a.status === "CONFIRMED"
      );
    if (tab === "past")
      return sorted.filter((a) => a.status === "COMPLETED");
    return sorted.filter((a) => a.status === "CANCELLED");
  }, [appointments, tab]);

  const tabs: { key: Tab; label: string }[] = [
    { key: "upcoming", label: t("appointments.upcoming") },
    { key: "past", label: t("appointments.past") },
    { key: "cancelled", label: t("appointments.cancelled") },
  ];

  return (
    <>
      <Topbar 
      title={t("appointments.title")}
      subtitle={t("appointments.subtitle")} />

      <div className="space-y-6 px-6 pb-10 lg:px-10">
        <div className="flex gap-1 rounded-2xl border border-ink-100 bg-white p-1.5 w-fit shadow-card">
          {tabs.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={cn(
                "rounded-xl px-4 py-2 text-sm font-medium transition-colors",
                tab === t.key
                  ? "bg-brand-700 text-white"
                  : "text-ink-500 hover:bg-ink-100"
              )}
            >
              {t.label}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="h-32 w-full" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <EmptyState
            icon={CalendarDays}
            title={
              tab === "upcoming"
                ? t("appointments.emptyUpcoming")
                : t("appointments.emptyTab")
            }
            description={
              tab === "upcoming"
                ? t("appointments.emptyUpcomingDesc")
                : t("appointments.emptyTab")
            }
            action={
              tab === "upcoming" ? (
                <Link href="/doctors">
                  <Button>{t("dashboard.findADoctor")}</Button>
                </Link>
              ) : undefined
            }
          />
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((a) => (
              <div key={a.id}>
                <AppointmentTicket
                  appointment={a}
                  onCancel={tab === "upcoming" ? () => setCancelTarget(a.id) : undefined}
                />
                {a.status === "COMPLETED" && !reviewedIds.has(a.id) && (
                  <button
                    onClick={() => setRateTarget(a)}
                    className="mt-2 text-xs font-medium text-brand-700 hover:text-brand-800"
                  >
                    {t("appointments.rateVisit")}
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      <ConfirmDialog
        open={cancelTarget !== null}
        title={t("appointments.cancelConfirmTitle")}
        description={t("appointments.cancelConfirmDescription")}
        confirmLabel={t("appointments.confirmCancel")}
        loading={cancelling}
        onConfirm={handleCancel}
        onClose={() => setCancelTarget(null)}
      />

      <RateVisitModal
        appointment={rateTarget}
        onClose={() => setRateTarget(null)}
        onSubmitted={() => {
          if (rateTarget) {
            setReviewedIds((prev) => new Set(prev).add(rateTarget.id));
          }
          showToast(
            t("appointments.feedbackThanks") + " ✓",
            "success"
          );
        }}
      />
    </>
  );
}