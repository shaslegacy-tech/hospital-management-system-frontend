"use client";
 
import { Clock } from "lucide-react";
import { useAuth } from "@/lib/auth-context";
 
export function HospitalPendingScreen() {
  const { logout } = useAuth();
 
  return (
    <div className="flex flex-1 items-center justify-center p-6">
      <div className="max-w-md rounded-3xl border border-ink-100 bg-white p-8 text-center shadow-card">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-100 text-amber-700">
          <Clock className="h-6 w-6" />
        </div>
        <h2 className="mt-4 font-display text-lg font-semibold text-ink-900">
          Your hospital is awaiting approval
        </h2>
        <p className="mt-2 text-sm text-ink-500">
          Thanks for registering! Our team is reviewing your hospital&apos;s
          details. You&apos;ll get full access to manage departments, doctors,
          and appointments as soon as it&apos;s approved — usually within
          1-2 business days.
        </p>
        <button
          onClick={logout}
          className="mt-5 text-sm font-medium text-ink-500 hover:text-ink-900"
        >
          Log out
        </button>
      </div>
    </div>
  );
}