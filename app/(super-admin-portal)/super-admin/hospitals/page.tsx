"use client";

import { useEffect, useState } from "react";
import { Building2, Ban } from "lucide-react";
import { Topbar } from "@/components/Topbar";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Select } from "@/components/ui/Select";
import { Skeleton } from "@/components/ui/Skeleton";
import { EmptyState } from "@/components/ui/EmptyState";
import { ConfirmDialog } from "@/components/ConfirmDialog";
import { useToast } from "@/lib/toast-context";
import { getAllHospitals, suspendHospital } from "@/lib/api";
import { HospitalResponse } from "@/lib/types";

const statusTone: Record<string, "teal" | "amber" | "coral" | "slate"> = {
  APPROVED: "teal",
  PENDING: "amber",
  REJECTED: "slate",
  SUSPENDED: "coral",
};

export default function SuperAdminHospitalsPage() {
  const { showToast } = useToast();
  const [hospitals, setHospitals] = useState<HospitalResponse[]>([]);
  const [statusFilter, setStatusFilter] = useState("");
  const [loading, setLoading] = useState(true);
  const [suspendTarget, setSuspendTarget] = useState<HospitalResponse | null>(null);
  const [suspending, setSuspending] = useState(false);

  async function load() {
    setLoading(true);
    try {
      const data = await getAllHospitals();
      setHospitals(data);
    } catch {
      setHospitals([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function handleSuspend() {
    if (!suspendTarget) return;
    setSuspending(true);
    try {
      await suspendHospital(suspendTarget.id);
      showToast("Hospital suspended.", "success");
      await load();
    } catch {
      showToast("Couldn't suspend this hospital.", "error");
    } finally {
      setSuspending(false);
      setSuspendTarget(null);
    }
  }

  const filtered = statusFilter
    ? hospitals.filter((h) => h.status === statusFilter)
    : hospitals;

  return (
    <>
      <Topbar
        title="Hospitals"
        subtitle={`${hospitals.length} registered on the platform`}
        profileHref="/super-admin/dashboard"
      />

      <div className="space-y-6 px-6 pb-10 lg:px-10">
        <Select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="max-w-xs"
        >
          <option value="">All statuses</option>
          <option value="APPROVED">Approved</option>
          <option value="PENDING">Pending</option>
          <option value="REJECTED">Rejected</option>
          <option value="SUSPENDED">Suspended</option>
        </Select>

        {loading ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-32 w-full" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <EmptyState
            icon={Building2}
            title="No hospitals found"
            description="Try a different status filter."
          />
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((h) => (
              <Card key={h.id} className="flex flex-col gap-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-brand-100 text-brand-700">
                    <Building2 className="h-5 w-5" />
                  </div>
                  <Badge tone={statusTone[h.status] || "slate"}>{h.status}</Badge>
                </div>
                <div>
                  <p className="text-sm font-semibold text-ink-900">{h.name}</p>
                  <p className="mt-0.5 text-xs text-ink-500">
                    {h.city}, {h.state}
                  </p>
                  <p className="mt-1 text-xs text-ink-500">{h.contactEmail}</p>
                </div>
                {h.status === "APPROVED" && (
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => setSuspendTarget(h)}
                    className="mt-auto"
                  >
                    <Ban className="h-3.5 w-3.5" />
                    Suspend
                  </Button>
                )}
              </Card>
            ))}
          </div>
        )}
      </div>

      <ConfirmDialog
        open={suspendTarget !== null}
        title="Suspend this hospital?"
        description={`"${suspendTarget?.name}" will be immediately removed from patient search and its staff will lose access. Use this for policy violations or non-payment.`}
        confirmLabel="Suspend"
        loading={suspending}
        onConfirm={handleSuspend}
        onClose={() => setSuspendTarget(null)}
      />
    </>
  );
}