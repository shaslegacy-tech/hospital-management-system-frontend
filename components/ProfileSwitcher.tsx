"use client";

import { useState } from "react";
import { ChevronDown, User, Users, Check } from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { cn } from "@/lib/cn";
import { initials } from "@/lib/format";

export function ProfileSwitcher() {
  const {
    patient,
    managedPatients,
    activePatientId,
    activePatientName,
    isActingAsCaregiver,
    switchToOwnProfile,
    switchToManagedPatient,
  } = useAuth();
  const [open, setOpen] = useState(false);

  // Nothing to switch between — don't show the control at all
  if (!patient || managedPatients.length === 0) return null;

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className={cn(
          "flex h-10 items-center gap-2 rounded-2xl border px-3 text-xs font-medium shadow-soft",
          isActingAsCaregiver
            ? "border-amber-300 bg-amber-50 text-amber-800"
            : "border-ink-100 bg-white text-ink-700"
        )}
      >
        <Users className="h-4 w-4" />
        <span className="max-w-[110px] truncate">
          {isActingAsCaregiver ? `Viewing: ${activePatientName}` : "My profile"}
        </span>
        <ChevronDown className="h-3.5 w-3.5" />
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
          <div className="absolute right-0 z-20 mt-2 w-64 overflow-hidden rounded-2xl border border-ink-100 bg-white py-1.5 shadow-card">
            <p className="px-4 py-2 text-xs font-semibold uppercase tracking-wide text-ink-500">
              Managing care for
            </p>

            <button
              onClick={() => {
                switchToOwnProfile();
                setOpen(false);
              }}
              className="flex w-full items-center gap-2.5 px-4 py-2.5 text-left text-sm hover:bg-ink-100"
            >
              <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-brand-700 text-xs font-semibold text-white">
                {initials(patient.patientName)}
              </div>
              <div className="flex-1">
                <p className="font-medium text-ink-900">{patient.patientName}</p>
                <p className="text-xs text-ink-500">Yourself</p>
              </div>
              {activePatientId === patient.id && (
                <Check className="h-4 w-4 text-brand-700" />
              )}
            </button>

            {managedPatients.map((link) => (
              <button
                key={link.id}
                onClick={() => {
                  switchToManagedPatient(link);
                  setOpen(false);
                }}
                className="flex w-full items-center gap-2.5 px-4 py-2.5 text-left text-sm hover:bg-ink-100"
              >
                <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-amber-600 text-xs font-semibold text-white">
                  {initials(link.patientName)}
                </div>
                <div className="flex-1">
                  <p className="font-medium text-ink-900">{link.patientName}</p>
                  <p className="text-xs text-ink-500">{link.relationship}</p>
                </div>
                {activePatientId === link.patientId && (
                  <Check className="h-4 w-4 text-brand-700" />
                )}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}