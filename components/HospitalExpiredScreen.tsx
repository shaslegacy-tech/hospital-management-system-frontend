"use client";

import Link from "next/link";
import {
  AlertTriangle,
  ArrowRight,
  CreditCard,
} from "lucide-react";

export function HospitalExpiredScreen() {
  return (
    <div className="flex min-h-[calc(100vh-2rem)] flex-1 items-center justify-center p-5">
      <div className="w-full max-w-xl rounded-3xl border border-amber-200 bg-white p-8 text-center shadow-sm md:p-10">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-50">
          <AlertTriangle className="h-8 w-8 text-amber-600" />
        </div>

        <h1 className="mt-6 text-2xl font-bold tracking-tight text-slate-900">
          Your subscription has expired
        </h1>

        <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-slate-500">
          Renew your subscription to continue using MedCare and regain
          access to your hospital management features.
        </p>

        <Link
          href="/admin/subscription"
          className="mt-7 inline-flex items-center justify-center gap-2 rounded-xl bg-brand-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-800"
        >
          <CreditCard className="h-4 w-4" />
          Renew subscription
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}