"use client";

import { useEffect, useState } from "react";
import { Building2, Clock, CheckCircle2, XCircle } from "lucide-react";
import { Topbar } from "@/components/Topbar";
import { StatCard } from "@/components/ui/StatCard";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Skeleton } from "@/components/ui/Skeleton";
import { EmptyState } from "@/components/ui/EmptyState";
import { ConfirmDialog } from "@/components/ConfirmDialog";
import { useToast } from "@/lib/toast-context";
import {
  getAllHospitals,
  getPendingHospitals,
  approveHospital,
  rejectHospital,
} from "@/lib/api";
import { HospitalResponse } from "@/lib/types";

export default function SuperAdminDashboardPage() {
  const { showToast } = useToast();
  const [pending, setPending] = useState<HospitalResponse[]>([]);
  const [allHospitals, setAllHospitals] = useState<HospitalResponse[]>([]);
  const [loading, setLoading] = useState(true);

  const [rejectTarget, setRejectTarget] = useState<HospitalResponse | null>(null);
  const [processingId, setProcessingId] = useState<number | null>(null);

  async function load() {
    setLoading(true);
    try {
      const [pendingData, allData] = await Promise.all([
        getPendingHospitals(),
        getAllHospitals(),
      ]);
      setPending(pendingData);
      setAllHospitals(allData);
    } catch {
      setPending([]);
      setAllHospitals([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function handleApprove(id: number) {
    setProcessingId(id);
    try {
      await approveHospital(id);
      showToast("Hospital approved — now live on the platform.", "success");
      await load();
    } catch {
      showToast("Couldn't approve this hospital.", "error");
    } finally {
      setProcessingId(null);
    }
  }

  async function handleReject() {
    if (!rejectTarget) return;
    setProcessingId(rejectTarget.id);
    try {
      await rejectHospital(rejectTarget.id);
      showToast("Hospital registration rejected.", "success");
      await load();
    } catch {
      showToast("Couldn't reject this hospital.", "error");
    } finally {
      setProcessingId(null);
      setRejectTarget(null);
    }
  }

  const approvedCount = allHospitals.filter((h) => h.status === "APPROVED").length;

  return (
    <>
      <Topbar
        title="Platform Dashboard"
        subtitle="Manage hospitals across the platform"
        profileHref="/super-admin/dashboard"
      />

      <div className="space-y-8 px-6 pb-10 lg:px-10">
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          <StatCard
            icon={Building2}
            label="Total hospitals"
            value={loading ? "—" : String(allHospitals.length)}
            tone="teal"
          />
          <StatCard
            icon={Clock}
            label="Pending approval"
            value={loading ? "—" : String(pending.length)}
            tone="amber"
          />
          <StatCard
            icon={CheckCircle2}
            label="Approved &amp; live"
            value={loading ? "—" : String(approvedCount)}
            tone="violet"
          />
        </div>

        <div>
          <h2 className="mb-3 font-display text-lg font-semibold text-ink-900">
            Pending approval
          </h2>

          {loading ? (
            <div className="space-y-3">
              {Array.from({ length: 2 }).map((_, i) => (
                <Skeleton key={i} className="h-24 w-full" />
              ))}
            </div>
          ) : pending.length === 0 ? (
            <EmptyState
              icon={CheckCircle2}
              title="All caught up"
              description="No hospitals are waiting for approval right now."
            />
          ) : (
            <div className="space-y-3">
              {pending.map((h) => (
                <Card key={h.id} className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm font-semibold text-ink-900">{h.name}</p>
                    <p className="text-xs text-ink-500">
                      {h.address}, {h.city}, {h.state} {h.pincode}
                    </p>
                    <p className="mt-1 text-xs text-ink-500">
                      {h.contactEmail} · {h.contactPhone}
                    </p>
                    {h.description && (
                      <p className="mt-1.5 text-xs text-ink-600">{h.description}</p>
                    )}
                  </div>
                  <div className="flex flex-shrink-0 gap-2">
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => setRejectTarget(h)}
                      disabled={processingId === h.id}
                    >
                      <XCircle className="h-3.5 w-3.5" />
                      Reject
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => handleApprove(h.id)}
                      loading={processingId === h.id}
                    >
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      Approve
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>

      <ConfirmDialog
        open={rejectTarget !== null}
        title="Reject this hospital?"
        description={`"${rejectTarget?.name}" won't be able to go live on the platform. You can revisit this later from the Hospitals page.`}
        confirmLabel="Reject"
        loading={processingId === rejectTarget?.id}
        onConfirm={handleReject}
        onClose={() => setRejectTarget(null)}
      />
    </>
  );
}