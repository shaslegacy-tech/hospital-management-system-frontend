"use client";

import { useCallback, useEffect, useState } from "react";
import { History, ChevronLeft, ChevronRight } from "lucide-react";
import { Topbar } from "@/components/Topbar";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";
import { Skeleton } from "@/components/ui/Skeleton";
import { EmptyState } from "@/components/ui/EmptyState";
import { getAuditLogs } from "@/lib/api";
import { AuditLogItem } from "@/lib/types";
import { initials } from "@/lib/format";

const PAGE_SIZE = 25;

const actionOptions = [
  "APPOINTMENT_BOOKED",
  "APPOINTMENT_STATUS_CHANGED",
  "APPOINTMENT_CANCELLED",
  "BILL_CREATED",
  "BILL_PAID",
  "PATIENT_REGISTERED",
  "DOCTOR_ONBOARDED",
  "DOCTOR_DELETED",
  "RECORD_CREATED",
];

const actionTone: Record<string, "teal" | "amber" | "coral" | "slate" | "violet"> = {
  APPOINTMENT_BOOKED: "teal",
  APPOINTMENT_STATUS_CHANGED: "amber",
  APPOINTMENT_CANCELLED: "coral",
  BILL_CREATED: "amber",
  BILL_PAID: "teal",
  PATIENT_REGISTERED: "violet",
  DOCTOR_ONBOARDED: "violet",
  DOCTOR_DELETED: "coral",
  RECORD_CREATED: "slate",
};

function formatDateTime(iso: string) {
  return new Date(iso).toLocaleString("en-IN", {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function AuditLogPage() {
  const [logs, setLogs] = useState<AuditLogItem[]>([]);
  const [action, setAction] = useState("");
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async (nextAction: string, nextPage: number) => {
    setLoading(true);
    try {
      const data = await getAuditLogs({
        action: nextAction || undefined,
        page: nextPage,
        size: PAGE_SIZE,
      });
      setLogs(data.content);
      setTotalPages(data.totalPages || 1);
    } catch {
      setLogs([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      void load(action, page);
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, [action, page, load]);

  function handleFilterChange(value: string) {
    setAction(value);
    setPage(0);
  }

  return (
    <>
      <Topbar
        title="Audit Log"
        subtitle="Who did what, and when"
        profileHref="/admin/dashboard"
      />

      <div className="space-y-6 px-6 pb-10 lg:px-10">
        <Select
          value={action}
          onChange={(e) => handleFilterChange(e.target.value)}
          className="max-w-xs"
        >
          <option value="">All actions</option>
          {actionOptions.map((a) => (
            <option key={a} value={a}>
              {a.replace(/_/g, " ")}
            </option>
          ))}
        </Select>

        {loading ? (
          <div className="space-y-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-16 w-full" />
            ))}
          </div>
        ) : logs.length === 0 ? (
          <EmptyState
            icon={History}
            title="No activity found"
            description="Actions taken across the hospital will show up here."
          />
        ) : (
          <>
            <Card className="overflow-hidden p-0">
              <div className="divide-y divide-ink-100">
                {logs.map((log) => (
                  <div key={log.id} className="flex items-start gap-3 px-5 py-3.5">
                    <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-ink-100 text-xs font-semibold text-ink-600">
                      {initials(log.userName)}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-sm font-medium text-ink-900">
                          {log.userName}
                        </span>
                        {log.userRole && (
                          <span className="text-xs text-ink-500">({log.userRole})</span>
                        )}
                        <Badge tone={actionTone[log.action] || "slate"}>
                          {log.action.replace(/_/g, " ")}
                        </Badge>
                      </div>
                      <p className="mt-0.5 text-sm text-ink-700">{log.details}</p>
                    </div>
                    <span className="flex-shrink-0 text-xs text-ink-500">
                      {formatDateTime(log.createdAt)}
                    </span>
                  </div>
                ))}
              </div>
            </Card>

            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-3 pt-2">
                <Button
                  variant="secondary"
                  size="sm"
                  disabled={page === 0}
                  onClick={() => setPage((p) => p - 1)}
                >
                  <ChevronLeft className="h-4 w-4" />
                  Prev
                </Button>
                <span className="text-sm text-ink-500">
                  Page {page + 1} of {totalPages}
                </span>
                <Button
                  variant="secondary"
                  size="sm"
                  disabled={page >= totalPages - 1}
                  onClick={() => setPage((p) => p + 1)}
                >
                  Next
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
}