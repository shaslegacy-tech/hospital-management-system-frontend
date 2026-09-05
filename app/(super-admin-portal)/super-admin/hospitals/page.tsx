"use client";

import { useEffect, useState } from "react";
import {
  Building2,
  Ban,
  ShieldCheck,
} from "lucide-react";

import { Topbar } from "@/components/Topbar";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Select } from "@/components/ui/Select";
import { Skeleton } from "@/components/ui/Skeleton";
import { EmptyState } from "@/components/ui/EmptyState";
import { ConfirmDialog } from "@/components/ConfirmDialog";

import { useToast } from "@/lib/toast-context";

import {
  getAllHospitals,
  suspendHospital,
  verifyHospital,
  unverifyHospital,
} from "@/lib/api";

import { HospitalResponse } from "@/lib/types";


const statusTone: Record<
  string,
  "teal" | "amber" | "coral" | "slate"
> = {
  APPROVED: "teal",
  PENDING: "amber",
  REJECTED: "slate",
  SUSPENDED: "coral",
};


export default function SuperAdminHospitalsPage() {
  const { showToast } = useToast();

  const [hospitals, setHospitals] =
    useState<HospitalResponse[]>([]);

  const [statusFilter, setStatusFilter] =
    useState("");

  const [loading, setLoading] =
    useState(true);

  const [suspendTarget, setSuspendTarget] =
    useState<HospitalResponse | null>(null);

  const [suspending, setSuspending] =
    useState(false);

  const [verifyingId, setVerifyingId] =
    useState<number | null>(null);


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


  // ============================================================
  // Suspend hospital
  // ============================================================

  async function handleSuspend() {
    if (!suspendTarget) return;

    setSuspending(true);

    try {
      await suspendHospital(suspendTarget.id);

      showToast(
        "Hospital suspended successfully.",
        "success"
      );

      await load();
    } catch {
      showToast(
        "Couldn't suspend this hospital.",
        "error"
      );
    } finally {
      setSuspending(false);
      setSuspendTarget(null);
    }
  }


  // ============================================================
  // Verify hospital
  // ============================================================

  async function handleVerify(id: number) {
    setVerifyingId(id);

    try {
      await verifyHospital(id);

      showToast(
        "Hospital verified successfully.",
        "success"
      );

      await load();
    } catch {
      showToast(
        "Couldn't verify this hospital.",
        "error"
      );
    } finally {
      setVerifyingId(null);
    }
  }


  // ============================================================
  // Unverify hospital
  // ============================================================

  async function handleUnverify(id: number) {
    setVerifyingId(id);

    try {
      await unverifyHospital(id);

      showToast(
        "Hospital verification removed.",
        "success"
      );

      await load();
    } catch {
      showToast(
        "Couldn't remove hospital verification.",
        "error"
      );
    } finally {
      setVerifyingId(null);
    }
  }


  const filtered = statusFilter
    ? hospitals.filter(
        (h) => h.status === statusFilter
      )
    : hospitals;


  return (
    <>
      <Topbar
        title="Hospitals"
        subtitle={`${hospitals.length} registered on the platform`}
        profileHref="/super-admin/dashboard"
      />

      <div className="space-y-6 px-6 pb-10 lg:px-10">

        {/* Status Filter */}

        <Select
          value={statusFilter}
          onChange={(e) =>
            setStatusFilter(e.target.value)
          }
          className="max-w-xs"
        >
          <option value="">
            All statuses
          </option>

          <option value="APPROVED">
            Approved
          </option>

          <option value="PENDING">
            Pending
          </option>

          <option value="REJECTED">
            Rejected
          </option>

          <option value="SUSPENDED">
            Suspended
          </option>
        </Select>


        {/* Loading */}

        {loading ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">

            {Array.from({
              length: 4,
            }).map((_, i) => (
              <Skeleton
                key={i}
                className="h-40 w-full"
              />
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

              <Card
                key={h.id}
                className="flex flex-col gap-3"
              >

                {/* Header */}

                <div className="flex items-start justify-between gap-2">

                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-brand-100 text-brand-700">
                    <Building2 className="h-5 w-5" />
                  </div>


                  {/* Status + Verification badges */}

                  <div className="flex flex-wrap justify-end gap-2">

                    <Badge
                      tone={
                        statusTone[h.status] ||
                        "slate"
                      }
                    >
                      {h.status}
                    </Badge>


                    {h.verified && (
                      <Badge tone="violet">
                        <ShieldCheck className="h-3 w-3" />
                        Verified
                      </Badge>
                    )}

                  </div>

                </div>


                {/* Hospital information */}

                <div>

                  <p className="text-sm font-semibold text-ink-900">
                    {h.name}
                  </p>

                  <p className="mt-0.5 text-xs text-ink-500">
                    {h.city}, {h.state}
                  </p>

                  <p className="mt-1 text-xs text-ink-500">
                    {h.contactEmail}
                  </p>

                </div>


                {/* Actions */}

                {h.status === "APPROVED" && (

                  <div className="mt-auto flex flex-wrap gap-2">

                    {/* Verify / Unverify */}

                    <Button
                      size="sm"
                      variant={
                        h.verified
                          ? "secondary"
                          : "primary"
                      }
                      onClick={() =>
                        h.verified
                          ? handleUnverify(h.id)
                          : handleVerify(h.id)
                      }
                      loading={
                        verifyingId === h.id
                      }
                    >
                      <ShieldCheck className="h-3.5 w-3.5" />

                      {h.verified
                        ? "Unverify"
                        : "Verify"}

                    </Button>

                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() =>
                        setSuspendTarget(h)
                      }
                      disabled={
                        verifyingId === h.id
                      }
                    >
                      <Ban className="h-3.5 w-3.5" />
                      Suspend
                    </Button>

                  </div>

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
        onClose={() =>
          setSuspendTarget(null)
        }
      />
    </>
  );
}